# Change Impact Dashboard

Static dashboard for reviewing ServiceNow change records against incident and problem records raised after each change.

## How to use

1. Open `index.html` in a browser.
2. Upload a ServiceNow change dump as CSV or JSON.
3. Upload a ServiceNow incident/problem dump as CSV or JSON.
4. Use the filters for application, change date and time, month, year, incident/problem count, record type, search text, and impact window.

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
