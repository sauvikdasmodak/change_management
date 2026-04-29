const fs = require("fs");
const http = require("http");
const path = require("path");
const zlib = require("zlib");

const root = __dirname;
const port = Number(process.env.PORT || 8060);
const workbookPath = path.join(root, "SN_Data.xlsx");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml"
};

const server = http.createServer(async (request, response) => {
  const requestPath = decodeURIComponent(request.url.split("?")[0]);

  if (requestPath === "/api/sn-data") {
    await handleWorkbookRequest(request, response);
    return;
  }

  serveStaticFile(requestPath, response);
});

async function handleWorkbookRequest(request, response) {
  try {
    let workbookBuffer;
    let source;

    if (request.method === "GET") {
      workbookBuffer = fs.readFileSync(workbookPath);
      source = workbookPath;
    } else if (request.method === "POST") {
      workbookBuffer = await readRequestBody(request);
      source = "Uploaded workbook";
    } else {
      writeJson(response, 405, { error: "Method not allowed" });
      return;
    }

    const workbook = parseWorkbook(workbookBuffer);
    const payload = serviceNowPayload(workbook, source);
    writeJson(response, 200, payload);
  } catch (error) {
    writeJson(response, 500, { error: error.message });
  }
}

function serveStaticFile(requestPath, response) {
  const targetPath = requestPath === "/" ? "index.html" : requestPath;
  const safePath = path
    .normalize(targetPath)
    .replace(/^(\.\.[/\\])+/g, "")
    .replace(/^[/\\]+/, "");
  const filePath = path.join(root, safePath === "/" ? "index.html" : safePath);

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream"
    });
    response.end(data);
  });
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", reject);
  });
}

function writeJson(response, statusCode, payload) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

function serviceNowPayload(workbook, source) {
  const changes = sheetRows(workbook, ["change_request", "change", "changes"]);
  const incidents = sheetRows(workbook, ["incident", "incidents"]).map((row) => ({
    ...row,
    type: row.type || row.Type || "Incident"
  }));
  const problems = sheetRows(workbook, ["problem", "problems"]).map((row) => ({
    ...row,
    type: row.type || row.Type || "Problem"
  }));

  return {
    source,
    sheets: workbook.sheets.map((sheet) => ({ name: sheet.name, rows: sheet.rows.length })),
    changes,
    tickets: [...incidents, ...problems]
  };
}

function sheetRows(workbook, names) {
  const normalizedNames = names.map(normalizeName);
  const sheet = workbook.sheets.find((candidate) =>
    normalizedNames.some((name) => normalizeName(candidate.name).includes(name))
  );

  return sheet ? sheet.rows : [];
}

function parseWorkbook(buffer) {
  const entries = unzip(buffer);
  const workbookXml = readEntry(entries, "xl/workbook.xml");
  const relationshipXml = readEntry(entries, "xl/_rels/workbook.xml.rels");
  const sharedStrings = parseSharedStrings(entries.get("xl/sharedStrings.xml"));
  const relationships = parseRelationships(relationshipXml);
  const sheetDefinitions = parseSheetDefinitions(workbookXml);

  const sheets = sheetDefinitions.map((sheet) => {
    const target = relationships.get(sheet.relationshipId);
    const entryName = normalizeWorkbookTarget(target);
    const worksheetXml = readEntry(entries, entryName);

    return {
      name: sheet.name,
      rows: worksheetRows(worksheetXml, sharedStrings)
    };
  });

  return { sheets };
}

function unzip(buffer) {
  const endOffset = findEndOfCentralDirectory(buffer);
  const centralDirectorySize = buffer.readUInt32LE(endOffset + 12);
  const centralDirectoryOffset = buffer.readUInt32LE(endOffset + 16);
  const entries = new Map();
  let offset = centralDirectoryOffset;
  const end = centralDirectoryOffset + centralDirectorySize;

  while (offset < end) {
    if (buffer.readUInt32LE(offset) !== 0x02014b50) {
      throw new Error("Invalid XLSX central directory");
    }

    const compressionMethod = buffer.readUInt16LE(offset + 10);
    const compressedSize = buffer.readUInt32LE(offset + 20);
    const fileNameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const localHeaderOffset = buffer.readUInt32LE(offset + 42);
    const fileName = buffer.toString("utf8", offset + 46, offset + 46 + fileNameLength);
    const data = readZipEntry(buffer, localHeaderOffset, compressedSize, compressionMethod);

    entries.set(fileName, data);
    offset += 46 + fileNameLength + extraLength + commentLength;
  }

  return entries;
}

function findEndOfCentralDirectory(buffer) {
  for (let offset = buffer.length - 22; offset >= 0; offset -= 1) {
    if (buffer.readUInt32LE(offset) === 0x06054b50) {
      return offset;
    }
  }

  throw new Error("Invalid XLSX file");
}

function readZipEntry(buffer, localHeaderOffset, compressedSize, compressionMethod) {
  if (buffer.readUInt32LE(localHeaderOffset) !== 0x04034b50) {
    throw new Error("Invalid XLSX local file header");
  }

  const fileNameLength = buffer.readUInt16LE(localHeaderOffset + 26);
  const extraLength = buffer.readUInt16LE(localHeaderOffset + 28);
  const dataStart = localHeaderOffset + 30 + fileNameLength + extraLength;
  const compressed = buffer.subarray(dataStart, dataStart + compressedSize);

  if (compressionMethod === 0) {
    return compressed;
  }

  if (compressionMethod === 8) {
    return zlib.inflateRawSync(compressed);
  }

  throw new Error(`Unsupported XLSX compression method ${compressionMethod}`);
}

function readEntry(entries, name) {
  const value = entries.get(name);

  if (!value) {
    throw new Error(`Workbook entry not found: ${name}`);
  }

  return value.toString("utf8");
}

function parseRelationships(xml) {
  const relationships = new Map();

  for (const tag of xml.match(/<Relationship\b[^>]*>/g) || []) {
    const attributes = parseAttributes(tag);
    relationships.set(attributes.Id, attributes.Target);
  }

  return relationships;
}

function parseSheetDefinitions(xml) {
  return (xml.match(/<sheet\b[^>]*>/g) || []).map((tag) => {
    const attributes = parseAttributes(tag);

    return {
      name: attributes.name,
      relationshipId: attributes["r:id"]
    };
  });
}

function parseSharedStrings(buffer) {
  if (!buffer) {
    return [];
  }

  const xml = buffer.toString("utf8");

  return (xml.match(/<si\b[\s\S]*?<\/si>/g) || []).map((item) => textFromXml(item));
}

function worksheetRows(xml, sharedStrings) {
  const rawRows = [];

  for (const rowMatch of xml.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
    const rowXml = rowMatch[1];
    const row = [];

    for (const cellMatch of rowXml.matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
      const attributes = parseAttributes(cellMatch[0]);
      const columnIndex = cellReferenceToIndex(attributes.r);
      row[columnIndex] = cellValue(attributes, cellMatch[2], sharedStrings);
    }

    rawRows.push(row.map((value) => value ?? ""));
  }

  if (!rawRows.length) {
    return [];
  }

  const headers = rawRows[0].map((header, index) => String(header || `Column ${index + 1}`).trim());

  return rawRows
    .slice(1)
    .filter((row) => row.some((value) => String(value).trim() !== ""))
    .map((row) =>
      headers.reduce((record, header, index) => {
        record[header] = row[index] ?? "";
        return record;
      }, {})
    );
}

function cellValue(attributes, body, sharedStrings) {
  if (attributes.t === "inlineStr") {
    return textFromXml(body);
  }

  const rawValue = firstTagValue(body, "v");

  if (attributes.t === "s") {
    return sharedStrings[Number(rawValue)] || "";
  }

  if (attributes.t === "b") {
    return rawValue === "1" ? "TRUE" : "FALSE";
  }

  return rawValue;
}

function textFromXml(xml) {
  let value = "";

  for (const match of xml.matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)) {
    value += unescapeXml(match[1]);
  }

  return value;
}

function firstTagValue(xml, tagName) {
  const match = xml.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`));
  return match ? unescapeXml(match[1]) : "";
}

function parseAttributes(tag) {
  const attributes = {};

  for (const match of tag.matchAll(/([\w:]+)="([^"]*)"/g)) {
    attributes[match[1]] = unescapeXml(match[2]);
  }

  return attributes;
}

function cellReferenceToIndex(reference = "A") {
  const letters = reference.replace(/[^A-Z]/gi, "").toUpperCase();
  let index = 0;

  for (const letter of letters) {
    index = index * 26 + letter.charCodeAt(0) - 64;
  }

  return Math.max(0, index - 1);
}

function normalizeWorkbookTarget(target = "") {
  const cleanTarget = target.replace(/\\/g, "/").replace(/^\/+/, "");
  return cleanTarget.startsWith("xl/") ? cleanTarget : `xl/${cleanTarget}`;
}

function normalizeName(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function unescapeXml(value) {
  return String(value || "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}

server.listen(port, "127.0.0.1", () => {
  console.log(`Change Management dashboard running at http://127.0.0.1:${port}/`);
});
