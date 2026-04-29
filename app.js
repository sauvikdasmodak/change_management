(() => {
  const dashboard = document.querySelector("[data-dashboard]");

  if (!dashboard) {
    return;
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const sampleChanges = [
    {
      number: "CHG0041821",
      application: "Payments API",
      planned_start_date: "2026-01-09 22:30:00",
      planned_end_date: "2026-01-09 23:25:00",
      state: "Closed",
      type: "Release",
      assigned_to: "Platform Ops",
      short_description: "Upgrade payment routing rules"
    },
    {
      number: "CHG0042194",
      application: "Claims Portal",
      planned_start_date: "2026-02-14 20:00:00",
      planned_end_date: "2026-02-14 22:15:00",
      state: "Closed",
      type: "Normal",
      assigned_to: "Digital Claims",
      short_description: "Deploy document upload flow"
    },
    {
      number: "CHG0042608",
      application: "Customer Identity",
      planned_start_date: "2026-03-07 01:00:00",
      planned_end_date: "2026-03-07 02:10:00",
      state: "Closed",
      type: "Emergency",
      assigned_to: "IAM Engineering",
      short_description: "Patch OAuth token signing service"
    },
    {
      number: "CHG0043188",
      application: "Billing Hub",
      planned_start_date: "2026-03-29 21:30:00",
      planned_end_date: "2026-03-29 22:05:00",
      state: "Closed",
      type: "Release",
      assigned_to: "Finance Tech",
      short_description: "Invoice calculation service update"
    },
    {
      number: "CHG0043551",
      application: "Payments API",
      planned_start_date: "2026-04-12 23:00:00",
      planned_end_date: "2026-04-12 23:55:00",
      state: "Closed",
      type: "Normal",
      assigned_to: "Platform Ops",
      short_description: "Database connection pool tuning"
    },
    {
      number: "CHG0043710",
      application: "Policy Admin",
      planned_start_date: "2026-04-20 19:30:00",
      planned_end_date: "2026-04-20 20:15:00",
      state: "Closed",
      type: "Standard",
      assigned_to: "Policy Systems",
      short_description: "Rules engine configuration refresh"
    }
  ];

  const sampleTickets = [
    {
      number: "INC0102441",
      type: "Incident",
      application: "Payments API",
      opened_at: "2026-01-10 01:18:00",
      priority: "P2",
      state: "Resolved",
      change_request: "CHG0041821",
      short_description: "Payment authorization latency spike"
    },
    {
      number: "INC0102447",
      type: "Incident",
      application: "Payments API",
      opened_at: "2026-01-10 08:40:00",
      priority: "P3",
      state: "Closed",
      short_description: "Intermittent checkout failure for card payments"
    },
    {
      number: "PRB0004412",
      type: "Problem",
      application: "Payments API",
      opened_at: "2026-01-11 09:15:00",
      priority: "P2",
      state: "Root cause analysis",
      change_request: "CHG0041821",
      short_description: "Payment routing timeout after rules release"
    },
    {
      number: "INC0102991",
      type: "Incident",
      application: "Claims Portal",
      opened_at: "2026-02-15 09:12:00",
      priority: "P3",
      state: "Resolved",
      short_description: "Claim document upload returns validation error"
    },
    {
      number: "PRB0004520",
      type: "Problem",
      application: "Customer Identity",
      opened_at: "2026-03-07 10:35:00",
      priority: "P1",
      state: "Known error",
      short_description: "Token refresh failures after signer patch"
    },
    {
      number: "INC0103378",
      type: "Incident",
      application: "Customer Identity",
      opened_at: "2026-03-07 03:05:00",
      priority: "P1",
      state: "Resolved",
      short_description: "SSO login failures for internal users"
    },
    {
      number: "INC0103385",
      type: "Incident",
      application: "Customer Identity",
      opened_at: "2026-03-08 11:40:00",
      priority: "P2",
      state: "Resolved",
      short_description: "Mobile app session renewal error"
    },
    {
      number: "INC0103664",
      type: "Incident",
      application: "Billing Hub",
      opened_at: "2026-03-30 02:20:00",
      priority: "P3",
      state: "Resolved",
      short_description: "Invoice preview mismatch for annual policies"
    },
    {
      number: "INC0104112",
      type: "Incident",
      application: "Payments API",
      opened_at: "2026-04-13 00:50:00",
      priority: "P2",
      state: "Resolved",
      short_description: "Payment API connection saturation"
    },
    {
      number: "INC0104126",
      type: "Incident",
      application: "Payments API",
      opened_at: "2026-04-13 03:22:00",
      priority: "P3",
      state: "Resolved",
      short_description: "Checkout retries elevated after pool tuning"
    },
    {
      number: "PRB0004633",
      type: "Problem",
      application: "Payments API",
      opened_at: "2026-04-14 08:30:00",
      priority: "P2",
      state: "Investigating",
      change_request: "CHG0043551",
      short_description: "Database pool exhaustion in payment calls"
    }
  ];

  const aliases = {
    app: [
      "application",
      "app",
      "business_service",
      "business service",
      "cmdb_ci",
      "configuration_item",
      "configuration item",
      "service",
      "service_offering",
      "u_application"
    ],
    changeNumber: [
      "number",
      "change",
      "change_number",
      "change number",
      "change_id",
      "change id",
      "sys_id",
      "change_request"
    ],
    ticketNumber: [
      "number",
      "incident",
      "incident number",
      "problem",
      "problem number",
      "ticket",
      "ticket_number",
      "record_number",
      "sys_id"
    ],
    relatedChange: [
      "change_request",
      "change request",
      "related_change",
      "related change",
      "caused_by_change",
      "caused by change",
      "caused_by",
      "caused by",
      "parent_change",
      "parent change"
    ],
    startDate: [
      "planned_start_date",
      "planned start date",
      "start_date",
      "start date",
      "start",
      "implementation_start",
      "implementation start",
      "scheduled_start",
      "scheduled start",
      "work_start",
      "work start",
      "sys_created_on",
      "created",
      "opened_at"
    ],
    endDate: [
      "planned_end_date",
      "planned end date",
      "end_date",
      "end date",
      "end",
      "implementation_end",
      "implementation end",
      "scheduled_end",
      "scheduled end",
      "work_end",
      "work end",
      "implemented",
      "resolved",
      "closed_at",
      "closed"
    ],
    openedDate: [
      "opened_at",
      "opened at",
      "opened",
      "opened_on",
      "opened on",
      "created",
      "created_on",
      "created on",
      "sys_created_on"
    ],
    summary: ["short_description", "short description", "description", "summary", "title", "root cause", "category"],
    status: ["state", "status", "phase"],
    type: ["type", "category", "record_type", "record type", "task_type", "task type"],
    owner: ["assigned_to", "assigned to", "owner", "assignment_group", "assignment group"],
    priority: ["priority", "severity", "impact"]
  };

  const elements = {
    appFilter: document.getElementById("appFilter"),
    fromDateFilter: document.getElementById("fromDateFilter"),
    toDateFilter: document.getElementById("toDateFilter"),
    monthFilter: document.getElementById("monthFilter"),
    yearFilter: document.getElementById("yearFilter"),
    minImpactFilter: document.getElementById("minImpactFilter"),
    maxImpactFilter: document.getElementById("maxImpactFilter"),
    windowFilter: document.getElementById("windowFilter"),
    searchFilter: document.getElementById("searchFilter"),
    showIncidents: document.getElementById("showIncidents"),
    showProblems: document.getElementById("showProblems"),
    workbookFile: document.getElementById("workbookFile"),
    changeFile: document.getElementById("changeFile"),
    ticketFile: document.getElementById("ticketFile"),
    xlsxFileName: document.getElementById("xlsxFileName"),
    changeFileName: document.getElementById("changeFileName"),
    ticketFileName: document.getElementById("ticketFileName"),
    dataStatus: document.getElementById("dataStatus"),
    sampleDataButton: document.getElementById("sampleDataButton"),
    resetFiltersButton: document.getElementById("resetFiltersButton"),
    changesMetric: document.getElementById("changesMetric"),
    incidentsMetric: document.getElementById("incidentsMetric"),
    problemsMetric: document.getElementById("problemsMetric"),
    appsMetric: document.getElementById("appsMetric"),
    highestMetric: document.getElementById("highestMetric"),
    activeScope: document.getElementById("activeScope"),
    timelineScope: document.getElementById("timelineScope"),
    resultCount: document.getElementById("resultCount"),
    appImpactList: document.getElementById("appImpactList"),
    timelineList: document.getElementById("timelineList"),
    changeTable: document.getElementById("changeTable"),
    detailPanel: document.getElementById("detailPanel"),
    detailTitle: document.getElementById("detailTitle"),
    detailContent: document.getElementById("detailContent"),
    closeDetailButton: document.getElementById("closeDetailButton")
  };

  let rawChanges = [...sampleChanges];
  let rawTickets = [...sampleTickets];
  let normalizedChanges = [];
  let normalizedTickets = [];
  let lastRenderedRecords = [];

  initialize();

  function initialize() {
    populateMonthFilter();
    normalizeData();
    populateFilterOptions();
    wireEvents();
    render();
    loadWorkbookFromServer();
  }

  function wireEvents() {
    [
      elements.appFilter,
      elements.fromDateFilter,
      elements.toDateFilter,
      elements.monthFilter,
      elements.yearFilter,
      elements.minImpactFilter,
      elements.maxImpactFilter,
      elements.windowFilter,
      elements.searchFilter,
      elements.showIncidents,
      elements.showProblems
    ].forEach((element) => {
      element.addEventListener("input", render);
      element.addEventListener("change", render);
    });

    elements.workbookFile.addEventListener("change", handleWorkbookUpload);
    elements.changeFile.addEventListener("change", () => handleFileUpload("changes"));
    elements.ticketFile.addEventListener("change", () => handleFileUpload("tickets"));
    elements.sampleDataButton.addEventListener("click", loadSampleData);
    elements.resetFiltersButton.addEventListener("click", resetFilters);
    elements.closeDetailButton.addEventListener("click", () => {
      elements.detailPanel.hidden = true;
    });
  }

  function loadSampleData() {
    rawChanges = [...sampleChanges];
    rawTickets = [...sampleTickets];
    elements.changeFile.value = "";
    elements.ticketFile.value = "";
    elements.workbookFile.value = "";
    elements.xlsxFileName.textContent = "Sample data selected";
    elements.changeFileName.textContent = "Sample change records loaded";
    elements.ticketFileName.textContent = "Sample incident and problem records loaded";
    elements.dataStatus.textContent = "Sample data";
    normalizeData();
    populateFilterOptions();
    render();
  }

  async function loadWorkbookFromServer() {
    try {
      elements.dataStatus.textContent = "Loading XLSX";
      const response = await fetch("/api/sn-data", { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`Workbook load failed (${response.status})`);
      }

      const payload = await response.json();
      applyWorkbookPayload(payload, "SN_Data.xlsx from project folder");
    } catch (error) {
      elements.dataStatus.textContent = "Sample data";
    }
  }

  async function handleWorkbookUpload() {
    const file = elements.workbookFile.files[0];

    if (!file) {
      return;
    }

    try {
      elements.dataStatus.textContent = "Loading XLSX";
      const response = await fetch("/api/sn-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        },
        body: file
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        throw new Error(errorPayload.error || `Workbook load failed (${response.status})`);
      }

      const payload = await response.json();
      applyWorkbookPayload(payload, `${file.name} uploaded`);
    } catch (error) {
      elements.dataStatus.textContent = "XLSX error";
      elements.xlsxFileName.textContent = error.message;
    }
  }

  function applyWorkbookPayload(payload, label) {
    rawChanges = Array.isArray(payload.changes) ? payload.changes : [];
    rawTickets = Array.isArray(payload.tickets) ? payload.tickets : [];

    elements.xlsxFileName.textContent = `${label} (${formatNumber(rawChanges.length)} changes, ${formatNumber(rawTickets.length)} raised records)`;
    elements.changeFileName.textContent = `${formatNumber(rawChanges.length)} change records from workbook`;
    elements.ticketFileName.textContent = `${formatNumber(rawTickets.length)} incident/problem records from workbook`;
    elements.dataStatus.textContent = "XLSX loaded";

    normalizeData();
    populateFilterOptions();
    render();
  }

  function resetFilters() {
    elements.appFilter.value = "";
    elements.fromDateFilter.value = "";
    elements.toDateFilter.value = "";
    elements.monthFilter.value = "";
    elements.yearFilter.value = "";
    elements.minImpactFilter.value = "0";
    elements.maxImpactFilter.value = "";
    elements.windowFilter.value = "72";
    elements.searchFilter.value = "";
    elements.showIncidents.checked = true;
    elements.showProblems.checked = true;
    elements.detailPanel.hidden = true;
    render();
  }

  function populateMonthFilter() {
    elements.monthFilter.innerHTML = `<option value="">All months</option>${months
      .map((month, index) => `<option value="${index}">${month}</option>`)
      .join("")}`;
  }

  function populateFilterOptions() {
    const selectedApp = elements.appFilter.value;
    const selectedYear = elements.yearFilter.value;
    const apps = [...new Set(normalizedChanges.map((change) => change.app))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
    const years = [...new Set(normalizedChanges.map((change) => change.anchor.getFullYear()))].sort((a, b) => b - a);

    elements.appFilter.innerHTML = `<option value="">All applications</option>${apps
      .map((app) => `<option value="${escapeHtml(app)}">${escapeHtml(app)}</option>`)
      .join("")}`;

    elements.yearFilter.innerHTML = `<option value="">All years</option>${years
      .map((year) => `<option value="${year}">${year}</option>`)
      .join("")}`;

    if (apps.includes(selectedApp)) {
      elements.appFilter.value = selectedApp;
    }

    if (years.map(String).includes(selectedYear)) {
      elements.yearFilter.value = selectedYear;
    }
  }

  function handleFileUpload(kind) {
    const input = kind === "changes" ? elements.changeFile : elements.ticketFile;
    const nameTarget = kind === "changes" ? elements.changeFileName : elements.ticketFileName;
    const file = input.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const rows = parseDump(String(reader.result || ""), file.name);

        if (!rows.length) {
          throw new Error("No records found");
        }

        if (kind === "changes") {
          rawChanges = rows;
        } else {
          rawTickets = rows;
        }

        nameTarget.textContent = `${file.name} (${rows.length} records)`;
        elements.dataStatus.textContent = "Loaded";
        normalizeData();
        populateFilterOptions();
        render();
      } catch (error) {
        elements.dataStatus.textContent = "File error";
        nameTarget.textContent = error.message;
      }
    };

    reader.onerror = () => {
      elements.dataStatus.textContent = "File error";
      nameTarget.textContent = "Could not read file";
    };

    reader.readAsText(file);
  }

  function parseDump(text, fileName) {
    const trimmed = text.trim();
    const lowerFileName = fileName.toLowerCase();
    const looksLikeJson = lowerFileName.endsWith(".json") || trimmed.startsWith("{") || trimmed.startsWith("[");

    if (looksLikeJson) {
      return extractRows(JSON.parse(trimmed));
    }

    return parseCsv(trimmed);
  }

  function extractRows(value) {
    if (Array.isArray(value)) {
      return value;
    }

    if (!value || typeof value !== "object") {
      return [];
    }

    const commonKeys = ["result", "results", "records", "data", "items", "changes", "tickets", "incidents", "problems"];

    for (const key of commonKeys) {
      if (Array.isArray(value[key])) {
        return value[key];
      }
    }

    const nestedArray = Object.values(value).find(Array.isArray);
    return nestedArray || [];
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = "";
    let inQuotes = false;

    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];
      const next = text[index + 1];

      if (char === '"' && inQuotes && next === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        row.push(field);
        field = "";
      } else if ((char === "\n" || char === "\r") && !inQuotes) {
        if (char === "\r" && next === "\n") {
          index += 1;
        }

        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else {
        field += char;
      }
    }

    row.push(field);
    rows.push(row);

    const headers = (rows.shift() || []).map((header) => header.trim());

    return rows
      .filter((values) => values.some((value) => String(value).trim() !== ""))
      .map((values) =>
        headers.reduce((record, header, index) => {
          record[header || `column_${index + 1}`] = values[index] || "";
          return record;
        }, {})
      );
  }

  function normalizeData() {
    normalizedChanges = rawChanges
      .map(normalizeChange)
      .filter((change) => change.anchor instanceof Date && !Number.isNaN(change.anchor.getTime()));
    normalizedTickets = rawTickets
      .map(normalizeTicket)
      .filter((ticket) => ticket.opened instanceof Date && !Number.isNaN(ticket.opened.getTime()));
  }

  function normalizeChange(row, index) {
    const number = valueFrom(row, aliases.changeNumber) || `CHG-${index + 1}`;
    const start = parseDate(valueFrom(row, aliases.startDate));
    const end = parseDate(valueFrom(row, aliases.endDate));
    const anchor = end || start;
    const app = valueFrom(row, aliases.app) || "Unassigned application";

    return {
      id: `${normalizeText(number)}-${index}`,
      number: String(number).trim(),
      numberKey: normalizeText(number),
      app: String(app).trim(),
      appKey: normalizeText(app),
      start,
      end,
      anchor,
      status: valueFrom(row, aliases.status) || "Unknown",
      type: valueFrom(row, aliases.type) || "Change",
      owner: valueFrom(row, aliases.owner) || "Unassigned",
      summary: valueFrom(row, aliases.summary) || "No summary available",
      raw: row
    };
  }

  function normalizeTicket(row, index) {
    const number = valueFrom(row, aliases.ticketNumber) || `TASK-${index + 1}`;
    const type = getTicketType(row, number);
    const app = valueFrom(row, aliases.app) || "Unassigned application";
    const relatedChange = valueFrom(row, aliases.relatedChange);

    return {
      id: `${normalizeText(number)}-${index}`,
      number: String(number).trim(),
      numberKey: normalizeText(number),
      relatedChangeKey: normalizeText(relatedChange),
      type,
      app: String(app).trim(),
      appKey: normalizeText(app),
      opened: parseDate(valueFrom(row, aliases.openedDate)),
      status: valueFrom(row, aliases.status) || "Unknown",
      priority: valueFrom(row, aliases.priority) || "Unrated",
      summary: valueFrom(row, aliases.summary) || "No summary available",
      raw: row
    };
  }

  function getTicketType(row, number) {
    const typeText = `${valueFrom(row, aliases.type)} ${number}`.toLowerCase();
    return typeText.includes("problem") || String(number).toUpperCase().startsWith("PRB") ? "problem" : "incident";
  }

  function valueFrom(row, fieldAliases) {
    if (!row || typeof row !== "object") {
      return "";
    }

    const rowMap = Object.keys(row).reduce((map, key) => {
      map[normalizeText(key)] = row[key];
      return map;
    }, {});

    for (const fieldAlias of fieldAliases) {
      const value = rowMap[normalizeText(fieldAlias)];

      if (value !== undefined && value !== null && String(value).trim() !== "") {
        return value;
      }
    }

    return "";
  }

  function normalizeText(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  }

  function parseDate(value) {
    if (value instanceof Date) {
      return Number.isNaN(value.getTime()) ? null : value;
    }

    if (typeof value === "number" && value > 25569) {
      return new Date((value - 25569) * 86400 * 1000);
    }

    const text = String(value || "").trim();

    if (!text) {
      return null;
    }

    const serialNumber = Number(text);

    if (!Number.isNaN(serialNumber) && serialNumber > 25569) {
      return new Date((serialNumber - 25569) * 86400 * 1000);
    }

    const serviceNowDate = text.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?/);

    if (serviceNowDate) {
      const [, year, month, day, hour, minute, second = "0"] = serviceNowDate;
      return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
    }

    const parsed = new Date(text);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  function correlate(changes, tickets, windowHours) {
    const sortedChanges = [...changes].sort((a, b) => a.anchor - b.anchor);
    const byNumber = new Map(sortedChanges.map((change) => [change.numberKey, change]));
    const matches = new Map(sortedChanges.map((change) => [change.id, []]));

    tickets.forEach((ticket) => {
      let matchedChange = null;

      if (ticket.relatedChangeKey && byNumber.has(ticket.relatedChangeKey)) {
        const explicitChange = byNumber.get(ticket.relatedChangeKey);

        if (isTicketAfterChange(explicitChange, ticket, windowHours)) {
          matchedChange = explicitChange;
        }
      }

      if (!matchedChange) {
        matchedChange = [...sortedChanges]
          .reverse()
          .find((change) => change.appKey === ticket.appKey && isTicketAfterChange(change, ticket, windowHours));
      }

      if (matchedChange) {
        matches.get(matchedChange.id).push(ticket);
      }
    });

    return sortedChanges.map((change) => {
      const ticketsForChange = [...(matches.get(change.id) || [])].sort((a, b) => a.opened - b.opened);
      const incidentCount = ticketsForChange.filter((ticket) => ticket.type === "incident").length;
      const problemCount = ticketsForChange.filter((ticket) => ticket.type === "problem").length;

      return {
        ...change,
        tickets: ticketsForChange,
        incidentCount,
        problemCount,
        totalRaised: incidentCount + problemCount
      };
    });
  }

  function isTicketAfterChange(change, ticket, windowHours) {
    if (!change.anchor || !ticket.opened || ticket.opened < change.anchor) {
      return false;
    }

    if (windowHours === "all") {
      return true;
    }

    const windowEnd = new Date(change.anchor.getTime() + Number(windowHours) * 60 * 60 * 1000);
    return ticket.opened <= windowEnd;
  }

  function getFilters() {
    return {
      app: elements.appFilter.value,
      from: elements.fromDateFilter.value ? new Date(elements.fromDateFilter.value) : null,
      to: elements.toDateFilter.value ? new Date(elements.toDateFilter.value) : null,
      month: elements.monthFilter.value,
      year: elements.yearFilter.value,
      minImpact: Number(elements.minImpactFilter.value || 0),
      maxImpact: elements.maxImpactFilter.value === "" ? null : Number(elements.maxImpactFilter.value),
      windowHours: elements.windowFilter.value,
      query: elements.searchFilter.value.trim().toLowerCase(),
      showIncidents: elements.showIncidents.checked,
      showProblems: elements.showProblems.checked
    };
  }

  function render() {
    const filters = getFilters();
    const correlatedRecords = correlate(normalizedChanges, normalizedTickets, filters.windowHours);
    const filteredRecords = correlatedRecords
      .map((record) => withVisibleTickets(record, filters))
      .filter((record) => recordMatchesFilters(record, filters))
      .sort((a, b) => b.visibleTotal - a.visibleTotal || b.anchor - a.anchor);

    lastRenderedRecords = filteredRecords;

    renderMetrics(filteredRecords);
    renderAppImpact(filteredRecords);
    renderTimeline(filteredRecords);
    renderTable(filteredRecords);
    updateScopeText(filteredRecords, filters);
  }

  function withVisibleTickets(record, filters) {
    const visibleTickets = record.tickets.filter(
      (ticket) =>
        (ticket.type === "incident" && filters.showIncidents) ||
        (ticket.type === "problem" && filters.showProblems)
    );
    const visibleIncidents = visibleTickets.filter((ticket) => ticket.type === "incident").length;
    const visibleProblems = visibleTickets.filter((ticket) => ticket.type === "problem").length;

    return {
      ...record,
      visibleTickets,
      visibleIncidents,
      visibleProblems,
      visibleTotal: visibleIncidents + visibleProblems
    };
  }

  function recordMatchesFilters(record, filters) {
    if (filters.app && record.app !== filters.app) {
      return false;
    }

    if (filters.from && record.anchor < filters.from) {
      return false;
    }

    if (filters.to && record.anchor > filters.to) {
      return false;
    }

    if (filters.month !== "" && record.anchor.getMonth() !== Number(filters.month)) {
      return false;
    }

    if (filters.year !== "" && record.anchor.getFullYear() !== Number(filters.year)) {
      return false;
    }

    if (record.visibleTotal < filters.minImpact) {
      return false;
    }

    if (filters.maxImpact !== null && record.visibleTotal > filters.maxImpact) {
      return false;
    }

    if (!filters.query) {
      return true;
    }

    const ticketText = record.visibleTickets
      .map((ticket) => `${ticket.number} ${ticket.summary} ${ticket.priority} ${ticket.status}`)
      .join(" ");
    const searchable = `${record.number} ${record.app} ${record.status} ${record.type} ${record.owner} ${record.summary} ${ticketText}`.toLowerCase();

    return searchable.includes(filters.query);
  }

  function renderMetrics(records) {
    const incidents = records.reduce((sum, record) => sum + record.visibleIncidents, 0);
    const problems = records.reduce((sum, record) => sum + record.visibleProblems, 0);
    const apps = new Set(records.map((record) => record.app)).size;
    const highest = records.reduce((max, record) => Math.max(max, record.visibleTotal), 0);

    elements.changesMetric.textContent = formatNumber(records.length);
    elements.incidentsMetric.textContent = formatNumber(incidents);
    elements.problemsMetric.textContent = formatNumber(problems);
    elements.appsMetric.textContent = formatNumber(apps);
    elements.highestMetric.textContent = formatNumber(highest);
  }

  function renderAppImpact(records) {
    if (!records.length) {
      elements.appImpactList.innerHTML = `<div class="empty-state">No application impact found for the selected filters.</div>`;
      return;
    }

    const grouped = [
      ...records
        .reduce((map, record) => {
          const current = map.get(record.app) || { app: record.app, changes: 0, total: 0 };
          current.changes += 1;
          current.total += record.visibleTotal;
          map.set(record.app, current);
          return map;
        }, new Map())
        .values()
    ].sort((a, b) => b.total - a.total || a.app.localeCompare(b.app));

    const maxTotal = Math.max(...grouped.map((item) => item.total), 1);

    elements.appImpactList.innerHTML = grouped
      .map((item) => {
        const width = Math.max(4, Math.round((item.total / maxTotal) * 100));
        return `
          <div class="bar-row">
            <div class="bar-label">
              <strong title="${escapeHtml(item.app)}">${escapeHtml(item.app)}</strong>
              <span>${formatNumber(item.changes)} changes</span>
            </div>
            <div class="bar-track" aria-hidden="true">
              <div class="bar-fill" style="width: ${width}%"></div>
            </div>
            <div class="bar-value">${formatNumber(item.total)}</div>
          </div>
        `;
      })
      .join("");
  }

  function renderTimeline(records) {
    if (!records.length) {
      elements.timelineList.innerHTML = `<div class="empty-state">No changes match the selected filters.</div>`;
      return;
    }

    elements.timelineList.innerHTML = [...records]
      .sort((a, b) => b.anchor - a.anchor)
      .slice(0, 8)
      .map(
        (record) => `
          <button class="timeline-item" type="button" data-record-id="${escapeHtml(record.id)}">
            <div class="timeline-date">${formatShortDate(record.anchor)}</div>
            <div>
              <strong title="${escapeHtml(record.number)}">${escapeHtml(record.number)}</strong>
              <span>${escapeHtml(record.app)}</span>
            </div>
            ${impactPill(record.visibleTotal)}
          </button>
        `
      )
      .join("");

    elements.timelineList.querySelectorAll("[data-record-id]").forEach((button) => {
      button.addEventListener("click", () => showDetail(button.dataset.recordId));
    });
  }

  function renderTable(records) {
    elements.resultCount.textContent = `${formatNumber(records.length)} records`;

    if (!records.length) {
      elements.changeTable.innerHTML = `
        <tr>
          <td class="empty-state" colspan="9">No changes match the selected filters.</td>
        </tr>
      `;
      return;
    }

    elements.changeTable.innerHTML = records
      .map(
        (record) => `
          <tr data-record-id="${escapeHtml(record.id)}">
            <td><span class="change-link">${escapeHtml(record.number)}</span></td>
            <td>${escapeHtml(record.app)}</td>
            <td>${formatDate(record.anchor)}</td>
            <td><span class="status-pill">${escapeHtml(record.status)}</span></td>
            <td class="count-cell">${formatNumber(record.visibleIncidents)}</td>
            <td class="count-cell">${formatNumber(record.visibleProblems)}</td>
            <td>${impactPill(record.visibleTotal)}</td>
            <td>${firstRaisedText(record)}</td>
            <td class="summary-cell">${escapeHtml(record.summary)}</td>
          </tr>
        `
      )
      .join("");

    elements.changeTable.querySelectorAll("[data-record-id]").forEach((row) => {
      row.addEventListener("click", () => showDetail(row.dataset.recordId));
    });
  }

  function showDetail(recordId) {
    const record = lastRenderedRecords.find((item) => item.id === recordId);

    if (!record) {
      return;
    }

    elements.detailTitle.textContent = `${record.number} - ${record.app}`;
    elements.detailContent.innerHTML = `
      <div class="detail-grid">
        <div class="detail-stat">
          <span>Change date</span>
          <strong>${formatDate(record.anchor)}</strong>
        </div>
        <div class="detail-stat">
          <span>Status</span>
          <strong>${escapeHtml(record.status)}</strong>
        </div>
        <div class="detail-stat">
          <span>Owner</span>
          <strong>${escapeHtml(record.owner)}</strong>
        </div>
        <div class="detail-stat">
          <span>Total raised</span>
          <strong>${formatNumber(record.visibleTotal)}</strong>
        </div>
      </div>
      <div class="ticket-list">
        ${renderTicketList(record)}
      </div>
    `;
    elements.detailPanel.hidden = false;
    elements.detailPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function renderTicketList(record) {
    if (!record.visibleTickets.length) {
      return `<div class="empty-state">No incident or problem records matched this change.</div>`;
    }

    return record.visibleTickets
      .map(
        (ticket) => `
          <div class="ticket-row">
            <span class="ticket-pill ${ticket.type}">${ticket.type === "incident" ? "Incident" : "Problem"}</span>
            <div class="ticket-summary">
              <strong>${escapeHtml(ticket.number)} - ${escapeHtml(ticket.summary)}</strong>
              <div class="ticket-meta">${escapeHtml(ticket.priority)} | ${escapeHtml(ticket.status)} | ${formatDate(ticket.opened)}</div>
            </div>
            <span class="ticket-meta">${durationAfter(record.anchor, ticket.opened)} after</span>
          </div>
        `
      )
      .join("");
  }

  function updateScopeText(records, filters) {
    const appScope = filters.app || "All apps";
    const monthScope = filters.month === "" ? "" : months[Number(filters.month)];
    const yearScope = filters.year || "";
    const dateScope = [monthScope, yearScope].filter(Boolean).join(" ");
    const windowLabel = filters.windowHours === "all" ? "All after" : `${filters.windowHours}h window`;

    elements.activeScope.textContent = appScope;
    elements.timelineScope.textContent = [dateScope, windowLabel].filter(Boolean).join(" | ");

    if (!records.length && !normalizedChanges.length) {
      elements.dataStatus.textContent = "No changes";
    }
  }

  function impactPill(total) {
    const level = total >= 4 ? "critical" : total >= 2 ? "high" : "";
    return `<span class="impact-pill ${level}">${formatNumber(total)}</span>`;
  }

  function firstRaisedText(record) {
    const firstTicket = record.visibleTickets[0];

    if (!firstTicket) {
      return "None";
    }

    return `${escapeHtml(firstTicket.number)} (${durationAfter(record.anchor, firstTicket.opened)})`;
  }

  function durationAfter(start, end) {
    const totalMinutes = Math.max(0, Math.round((end - start) / 60000));
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;

    if (days > 0) {
      return `${days}d ${hours}h`;
    }

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }

    return `${minutes}m`;
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }

  function formatShortDate(date) {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }

  function formatNumber(value) {
    return new Intl.NumberFormat().format(value);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
