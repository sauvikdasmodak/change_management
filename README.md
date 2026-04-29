# Change Impact Dashboard

Static dashboard for reviewing ServiceNow change records against incident and problem records raised after each change.

## How to use

1. Start the local server with `node server.js`.
2. Open `http://127.0.0.1:8060/` in a browser.
3. The dashboard automatically loads `SN_Data.xlsx` from this project folder.
4. Optionally upload another `.xlsx` workbook with the same sheet pattern.
5. Use the filters for application, change date and time, month, year, incident/problem count, record type, search text, and impact window.

## XLSX workbook format

The default workbook path is:

`C:\Users\sauvi\Documents\Project\change_management\SN_Data.xlsx`

The workbook can contain these sheets:

- `change_request`
- `incident`
- `problem`
- `applications`

The dashboard reads `change_request` as changes, then combines `incident` and `problem` into the raised-record feed.

## Expected data fields

The dashboard recognizes common ServiceNow export column names. It accepts these examples and similar variants:

- Application: `application`, `business_service`, `cmdb_ci`, `configuration_item`, `service`, `u_application`
- Change number: `number`, `change_number`, `change_id`, `change_request`
- Change time: `planned_start_date`, `planned_end_date`, `start_date`, `end_date`, `work_start`, `work_end`
- Ticket number: `number`, `ticket_number`, `record_number`
- Ticket type: `type`, `record_type`, `task_type`, or ticket numbers beginning with `INC` / `PRB`
- Ticket opened date: `opened_at`, `opened`, `created_on`, `sys_created_on`
- Related change: `change_request`, `related_change`, `caused_by_change`, `parent_change`

If a ticket has a related change number, it is matched to that change. Otherwise, it is matched to the latest prior change for the same application within the selected impact window.
