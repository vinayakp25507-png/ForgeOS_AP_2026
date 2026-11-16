-- ForgeOS application query documentation
-- These are SQL equivalents of the Prisma operations in server/src.
-- Parameters use PostgreSQL positional placeholders ($1, $2, ...).
-- READ and WRITE labels identify the operation type.

-- Q01 READ
-- Authenticate a user by its normalized unique email.
-- Chooses the values the query will return.
SELECT id, name, email, password_hash, role, phone, is_active,
       -- Continues the SQL statement so its clauses and values form one database operation.
       last_login_at, created_at, updated_at
-- Identifies the table or query that supplies rows for this statement.
FROM users
-- Filters the rows so only records matching this condition are used.
WHERE email = $1;

-- Q02 WRITE
-- Record the successful login timestamp for the authenticated user.
-- Chooses the table whose existing records will be changed.
UPDATE users
-- Continues the SQL statement so its clauses and values form one database operation.
SET last_login_at = CURRENT_TIMESTAMP,
    -- Continues the SQL statement so its clauses and values form one database operation.
    updated_at = CURRENT_TIMESTAMP
-- Filters the rows so only records matching this condition are used.
WHERE id = $1
-- Continues the SQL statement so its clauses and values form one database operation.
RETURNING id, name, email, role, phone, is_active, created_at, updated_at;

-- Q03 READ
-- Paginated user list used by the user-management service.
-- Chooses the values the query will return.
SELECT id, name, email, role, phone, is_active, created_at, updated_at
-- Identifies the table or query that supplies rows for this statement.
FROM users
-- Filters the rows so only records matching this condition are used.
WHERE ($1 IS NULL OR name ILIKE '%' || $1 || '%'
       -- Adds another condition to narrow or expand the matching rows.
       OR email ILIKE '%' || $1 || '%')
-- Sorts the returned rows by the selected columns.
ORDER BY created_at DESC
-- Continues the SQL statement so its clauses and values form one database operation.
LIMIT $2 OFFSET $3;

-- Q04 READ
-- List lands visible to a PM through assigned projects.
-- Chooses the values the query will return.
SELECT DISTINCT l.*
-- Identifies the table or query that supplies rows for this statement.
FROM lands AS l
-- Combines related rows from another table.
JOIN projects AS p ON p.land_id = l.id
-- Filters the rows so only records matching this condition are used.
WHERE p.assigned_pm_id = $1
-- Sorts the returned rows by the selected columns.
ORDER BY l.created_at DESC
-- Continues the SQL statement so its clauses and values form one database operation.
LIMIT $2 OFFSET $3;

-- Q05 READ
-- List projects with their land and assigned PM, scoped for a PM.
-- Chooses the values the query will return.
SELECT p.*, l.name AS land_name, l.city AS land_city,
       -- Continues the SQL statement so its clauses and values form one database operation.
       u.id AS pm_id, u.name AS pm_name, u.email AS pm_email
-- Identifies the table or query that supplies rows for this statement.
FROM projects AS p
-- Combines related rows from another table.
JOIN lands AS l ON l.id = p.land_id
-- Continues the SQL statement so its clauses and values form one database operation.
LEFT JOIN users AS u ON u.id = p.assigned_pm_id
-- Filters the rows so only records matching this condition are used.
WHERE p.assigned_pm_id = $1
-- Sorts the returned rows by the selected columns.
ORDER BY p.created_at DESC
-- Continues the SQL statement so its clauses and values form one database operation.
LIMIT $2 OFFSET $3;

-- Q06 WRITE
-- Create a project after the service has validated its land and assigned PM.
-- Chooses the table that will receive the new record.
INSERT INTO projects (
  -- Continues the SQL statement so its clauses and values form one database operation.
  land_id, code, name, description, status, start_date, expected_end_date,
  -- Continues the SQL statement so its clauses and values form one database operation.
  actual_end_date, total_budget, wastage_threshold_pct, assigned_pm_id,
  -- Continues the SQL statement so its clauses and values form one database operation.
  created_by_id, created_at, updated_at
-- Closes the current table or grouped SQL statement.
)
-- Supplies the values that will be inserted into the chosen columns.
VALUES ($1, $2, $3, $4, COALESCE($5, 'PLANNING'), $6, $7, $8, $9, $10,
        -- Continues the SQL statement so its clauses and values form one database operation.
        $11, $12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
-- Continues the SQL statement so its clauses and values form one database operation.
RETURNING *;

-- Q07 READ
-- Paginated daily logs for one project, including labour and machinery
-- aggregate values used by the application response.
-- Chooses the values the query will return.
SELECT dl.*,
       -- Continues the SQL statement so its clauses and values form one database operation.
       COALESCE(l.labour_head_count_total, 0) AS labour_head_count_total,
       -- Continues the SQL statement so its clauses and values form one database operation.
       COALESCE(m.machinery_hours_total, 0) AS machinery_hours_total
-- Identifies the table or query that supplies rows for this statement.
FROM daily_logs AS dl
-- Continues the SQL statement so its clauses and values form one database operation.
LEFT JOIN (
  -- Chooses the values the query will return.
  SELECT daily_log_id, SUM(head_count) AS labour_head_count_total
  -- Identifies the table or query that supplies rows for this statement.
  FROM labour_entries
  -- Groups rows with the same values for aggregate calculations.
  GROUP BY daily_log_id
-- Continues the SQL statement so its clauses and values form one database operation.
) AS l ON l.daily_log_id = dl.id
-- Continues the SQL statement so its clauses and values form one database operation.
LEFT JOIN (
  -- Chooses the values the query will return.
  SELECT daily_log_id, SUM(hours_used) AS machinery_hours_total
  -- Identifies the table or query that supplies rows for this statement.
  FROM machinery_entries
  -- Groups rows with the same values for aggregate calculations.
  GROUP BY daily_log_id
-- Continues the SQL statement so its clauses and values form one database operation.
) AS m ON m.daily_log_id = dl.id
-- Filters the rows so only records matching this condition are used.
WHERE dl.project_id = $1
  -- Adds another condition to narrow or expand the matching rows.
  AND ($2 IS NULL OR dl.log_date >= $2)
  -- Adds another condition to narrow or expand the matching rows.
  AND ($3 IS NULL OR dl.log_date <= $3)
-- Sorts the returned rows by the selected columns.
ORDER BY dl.log_date DESC
-- Continues the SQL statement so its clauses and values form one database operation.
LIMIT $4 OFFSET $5;

-- Q08 WRITE
-- Create a daily log and its nested labour and machinery rows atomically.
-- The application performs this as one Prisma transaction.
-- Continues the SQL statement so its clauses and values form one database operation.
WITH new_log AS (
  -- Chooses the table that will receive the new record.
  INSERT INTO daily_logs (
    -- Continues the SQL statement so its clauses and values form one database operation.
    project_id, log_date, progress_percent, work_summary, weather, issues,
    -- Continues the SQL statement so its clauses and values form one database operation.
    created_by_id, created_at, updated_at
  -- Closes the current table or grouped SQL statement.
  )
  -- Supplies the values that will be inserted into the chosen columns.
  VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  -- Continues the SQL statement so its clauses and values form one database operation.
  RETURNING id
-- Continues the SQL statement so its clauses and values form one database operation.
),
-- Continues the SQL statement so its clauses and values form one database operation.
new_labour AS (
  -- Chooses the table that will receive the new record.
  INSERT INTO labour_entries
    -- Continues the SQL statement so its clauses and values form one database operation.
    (daily_log_id, trade, contractor_name, head_count, hours_worked, remarks)
  -- Chooses the values the query will return.
  SELECT id, $8, $9, $10, $11, $12
  -- Identifies the table or query that supplies rows for this statement.
  FROM new_log
  -- Continues the SQL statement so its clauses and values form one database operation.
  RETURNING daily_log_id
-- Closes the current table or grouped SQL statement.
)
-- Chooses the table that will receive the new record.
INSERT INTO machinery_entries
  -- Continues the SQL statement so its clauses and values form one database operation.
  (daily_log_id, machine_name, operator_name, hours_used, fuel_litres, remarks)
-- Chooses the values the query will return.
SELECT id, $13, $14, $15, $16, $17
-- Identifies the table or query that supplies rows for this statement.
FROM new_log
-- Continues the SQL statement so its clauses and values form one database operation.
RETURNING *;

-- Q09 READ
-- Return a daily log with its labour, machinery, and linked stock rows.
-- Chooses the values the query will return.
SELECT dl.*, le.id AS labour_id, le.trade, le.head_count, le.hours_worked,
       -- Continues the SQL statement so its clauses and values form one database operation.
       me.id AS machinery_id, me.machine_name, me.hours_used, me.fuel_litres,
       -- Continues the SQL statement so its clauses and values form one database operation.
       st.id AS stock_transaction_id, st.txn_type, st.quantity, st.txn_date
-- Identifies the table or query that supplies rows for this statement.
FROM daily_logs AS dl
-- Continues the SQL statement so its clauses and values form one database operation.
LEFT JOIN labour_entries AS le ON le.daily_log_id = dl.id
-- Continues the SQL statement so its clauses and values form one database operation.
LEFT JOIN machinery_entries AS me ON me.daily_log_id = dl.id
-- Continues the SQL statement so its clauses and values form one database operation.
LEFT JOIN stock_transactions AS st ON st.daily_log_id = dl.id
-- Filters the rows so only records matching this condition are used.
WHERE dl.id = $1;

-- Q10 WRITE
-- Replace nested labour and machinery rows during a daily-log update.
-- The deletes and update/inserts are executed in one transaction.
-- Continues the SQL statement so its clauses and values form one database operation.
WITH deleted_labour AS (
  -- Chooses the table from which matching records will be removed.
  DELETE FROM labour_entries WHERE daily_log_id = $1 RETURNING id
-- Continues the SQL statement so its clauses and values form one database operation.
),
-- Continues the SQL statement so its clauses and values form one database operation.
deleted_machinery AS (
  -- Chooses the table from which matching records will be removed.
  DELETE FROM machinery_entries WHERE daily_log_id = $1 RETURNING id
-- Closes the current table or grouped SQL statement.
)
-- Chooses the table whose existing records will be changed.
UPDATE daily_logs
-- Continues the SQL statement so its clauses and values form one database operation.
SET progress_percent = COALESCE($2, progress_percent),
    -- Continues the SQL statement so its clauses and values form one database operation.
    work_summary = COALESCE($3, work_summary),
    -- Continues the SQL statement so its clauses and values form one database operation.
    weather = COALESCE($4, weather),
    -- Continues the SQL statement so its clauses and values form one database operation.
    issues = COALESCE($5, issues),
    -- Continues the SQL statement so its clauses and values form one database operation.
    updated_at = CURRENT_TIMESTAMP
-- Filters the rows so only records matching this condition are used.
WHERE id = $1
-- Continues the SQL statement so its clauses and values form one database operation.
RETURNING *;

-- Q11 WRITE
-- Delete an ADMIN-authorized daily log; child labour and machinery rows
-- cascade according to the foreign keys, while stock links are set NULL.
-- Chooses the table from which matching records will be removed.
DELETE FROM daily_logs
-- Filters the rows so only records matching this condition are used.
WHERE id = $1
-- Continues the SQL statement so its clauses and values form one database operation.
RETURNING id, project_id, log_date;

-- Q12 WRITE
-- Create a project milestone and its CREATE audit event atomically.
-- Continues the SQL statement so its clauses and values form one database operation.
WITH new_milestone AS (
  -- Chooses the table that will receive the new record.
  INSERT INTO project_milestones (
    -- Continues the SQL statement so its clauses and values form one database operation.
    project_id, name, description, sequence, planned_start_date,
    -- Continues the SQL statement so its clauses and values form one database operation.
    planned_end_date, actual_start_date, actual_end_date, status,
    -- Continues the SQL statement so its clauses and values form one database operation.
    progress_percent, created_at, updated_at
  -- Closes the current table or grouped SQL statement.
  )
  -- Supplies the values that will be inserted into the chosen columns.
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, COALESCE($9, 'PLANNED'),
          -- Continues the SQL statement so its clauses and values form one database operation.
          COALESCE($10, 0), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  -- Continues the SQL statement so its clauses and values form one database operation.
  RETURNING *
-- Closes the current table or grouped SQL statement.
)
-- Chooses the table that will receive the new record.
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, new_values)
-- Chooses the values the query will return.
SELECT $11, 'CREATE', 'ProjectMilestone', id,
       -- Continues the SQL statement so its clauses and values form one database operation.
       jsonb_build_object('id', id, 'projectId', project_id, 'name', name,
                          -- Continues the SQL statement so its clauses and values form one database operation.
                          'sequence', sequence, 'status', status,
                          -- Continues the SQL statement so its clauses and values form one database operation.
                          'progressPercent', progress_percent)
-- Identifies the table or query that supplies rows for this statement.
FROM new_milestone
-- Continues the SQL statement so its clauses and values form one database operation.
RETURNING *;

-- Q13 READ
-- List milestones for a project in sequence and planned-date order.
-- Chooses the values the query will return.
SELECT id, project_id, name, description, sequence, planned_start_date,
       -- Continues the SQL statement so its clauses and values form one database operation.
       planned_end_date, actual_start_date, actual_end_date, status,
       -- Continues the SQL statement so its clauses and values form one database operation.
       progress_percent, created_at, updated_at
-- Identifies the table or query that supplies rows for this statement.
FROM project_milestones
-- Filters the rows so only records matching this condition are used.
WHERE project_id = $1
-- Sorts the returned rows by the selected columns.
ORDER BY sequence ASC, planned_start_date ASC NULLS LAST, id ASC;

-- Q18 READ
-- List the project inventory balances derived from the project/material plan
-- and non-voided stock ledger.
-- Chooses the values the query will return.
SELECT pmp.material_id, m.name AS material_name, m.unit,
       -- Continues the SQL statement so its clauses and values form one database operation.
       pmp.opening_quantity,
       -- Continues the SQL statement so its clauses and values form one database operation.
       COALESCE(SUM(st.quantity) FILTER (WHERE st.txn_type = 'IN'), 0) AS total_in,
       -- Continues the SQL statement so its clauses and values form one database operation.
       COALESCE(SUM(st.quantity) FILTER (WHERE st.txn_type = 'OUT'), 0) AS total_out,
       -- Continues the SQL statement so its clauses and values form one database operation.
       COALESCE(SUM(st.quantity) FILTER (WHERE st.txn_type = 'ADJUSTMENT'
         -- Adds another condition to narrow or expand the matching rows.
         AND st.adjustment_direction = 'INCREASE'), 0) AS adjustment_in,
       -- Continues the SQL statement so its clauses and values form one database operation.
       COALESCE(SUM(st.quantity) FILTER (WHERE st.txn_type = 'ADJUSTMENT'
         -- Adds another condition to narrow or expand the matching rows.
         AND st.adjustment_direction = 'DECREASE'), 0) AS adjustment_out
-- Identifies the table or query that supplies rows for this statement.
FROM project_material_plans AS pmp
-- Combines related rows from another table.
JOIN materials AS m ON m.id = pmp.material_id
-- Continues the SQL statement so its clauses and values form one database operation.
LEFT JOIN stock_transactions AS st
  -- Continues the SQL statement so its clauses and values form one database operation.
  ON st.project_id = pmp.project_id AND st.material_id = pmp.material_id
 -- Adds another condition to narrow or expand the matching rows.
 AND st.is_voided = false
-- Filters the rows so only records matching this condition are used.
WHERE pmp.project_id = $1
-- Groups rows with the same values for aggregate calculations.
GROUP BY pmp.material_id, m.name, m.unit, pmp.opening_quantity
-- Sorts the returned rows by the selected columns.
ORDER BY m.name;

-- Q19 WRITE
-- Record a stock transaction and its audit event in one transaction. The
-- service obtains a project/material advisory lock and checks the balance
-- before executing this write.
-- Continues the SQL statement so its clauses and values form one database operation.
WITH new_transaction AS (
  -- Chooses the table that will receive the new record.
  INSERT INTO stock_transactions (
    -- Continues the SQL statement so its clauses and values form one database operation.
    project_id, material_id, txn_type, quantity, unit_rate, vendor_id, bill_id,
    -- Continues the SQL statement so its clauses and values form one database operation.
    challan_number, out_reason, adjustment_direction, txn_date, daily_log_id,
    -- Continues the SQL statement so its clauses and values form one database operation.
    remarks, created_by_id
  -- Closes the current table or grouped SQL statement.
  )
  -- Supplies the values that will be inserted into the chosen columns.
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  -- Continues the SQL statement so its clauses and values form one database operation.
  RETURNING *
-- Closes the current table or grouped SQL statement.
)
-- Chooses the table that will receive the new record.
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, new_values)
-- Chooses the values the query will return.
SELECT $14, 'CREATE', 'StockTransaction', id,
       -- Continues the SQL statement so its clauses and values form one database operation.
       jsonb_build_object('id', id, 'projectId', project_id,
                          -- Continues the SQL statement so its clauses and values form one database operation.
                          'materialId', material_id, 'txnType', txn_type,
                          -- Continues the SQL statement so its clauses and values form one database operation.
                          'quantity', quantity, 'txnDate', txn_date)
-- Identifies the table or query that supplies rows for this statement.
FROM new_transaction
-- Continues the SQL statement so its clauses and values form one database operation.
RETURNING *;

-- Q20 READ
-- Return wastage inputs from the project plans and non-voided OUT ledger.
-- Chooses the values the query will return.
SELECT pmp.material_id, m.name AS material_name, m.unit,
       -- Continues the SQL statement so its clauses and values form one database operation.
       pmp.planned_quantity, pmp.planned_unit_rate,
       -- Continues the SQL statement so its clauses and values form one database operation.
       COALESCE(SUM(st.quantity), 0) AS consumed_quantity,
       -- Continues the SQL statement so its clauses and values form one database operation.
       COALESCE(SUM(st.quantity) FILTER
         -- Continues the SQL statement so its clauses and values form one database operation.
         (WHERE st.out_reason IN ('DAMAGED', 'LOST')), 0) AS recorded_wastage_quantity
-- Identifies the table or query that supplies rows for this statement.
FROM project_material_plans AS pmp
-- Combines related rows from another table.
JOIN materials AS m ON m.id = pmp.material_id
-- Continues the SQL statement so its clauses and values form one database operation.
LEFT JOIN stock_transactions AS st
  -- Continues the SQL statement so its clauses and values form one database operation.
  ON st.project_id = pmp.project_id AND st.material_id = pmp.material_id
 -- Adds another condition to narrow or expand the matching rows.
 AND st.txn_type = 'OUT' AND st.is_voided = false
-- Filters the rows so only records matching this condition are used.
WHERE pmp.project_id = $1
-- Groups rows with the same values for aggregate calculations.
GROUP BY pmp.material_id, m.name, m.unit, pmp.planned_quantity,
         -- Continues the SQL statement so its clauses and values form one database operation.
         pmp.planned_unit_rate;

-- Q21 WRITE
-- Update milestone fields. The application records changed fields in its
-- surrounding audit transaction.
-- Chooses the table whose existing records will be changed.
UPDATE project_milestones
-- Continues the SQL statement so its clauses and values form one database operation.
SET name = COALESCE($2, name),
    -- Continues the SQL statement so its clauses and values form one database operation.
    description = COALESCE($3, description),
    -- Continues the SQL statement so its clauses and values form one database operation.
    sequence = COALESCE($4, sequence),
    -- Continues the SQL statement so its clauses and values form one database operation.
    status = COALESCE($5, status),
    -- Continues the SQL statement so its clauses and values form one database operation.
    progress_percent = COALESCE($6, progress_percent),
    -- Continues the SQL statement so its clauses and values form one database operation.
    updated_at = CURRENT_TIMESTAMP
-- Filters the rows so only records matching this condition are used.
WHERE id = $1
-- Continues the SQL statement so its clauses and values form one database operation.
RETURNING *;

-- Q22 WRITE
-- Delete a milestone. The application retains the old snapshot in its
-- surrounding audit transaction.
-- Chooses the table from which matching records will be removed.
DELETE FROM project_milestones
-- Filters the rows so only records matching this condition are used.
WHERE id = $1
-- Continues the SQL statement so its clauses and values form one database operation.
RETURNING *;

-- Q23 READ
-- List vendors visible to an actor. PM visibility is implemented by the
-- service through active assignments on projects assigned to that PM.
-- Chooses the values the query will return.
SELECT DISTINCT v.*
-- Identifies the table or query that supplies rows for this statement.
FROM vendors AS v
-- Continues the SQL statement so its clauses and values form one database operation.
LEFT JOIN project_vendor_assignments AS pva
  -- Continues the SQL statement so its clauses and values form one database operation.
  ON pva.vendor_id = v.id AND pva.unassigned_at IS NULL
-- Continues the SQL statement so its clauses and values form one database operation.
LEFT JOIN projects AS p ON p.id = pva.project_id
-- Filters the rows so only records matching this condition are used.
WHERE ($1 = 'ADMIN' OR p.assigned_pm_id = $2)
  -- Adds another condition to narrow or expand the matching rows.
  AND ($3 IS NULL OR v.is_active = $3)
  -- Adds another condition to narrow or expand the matching rows.
  AND ($4 IS NULL OR v.name ILIKE '%' || $4 || '%')
-- Sorts the returned rows by the selected columns.
ORDER BY v.name;

-- Q24 WRITE
-- Create a bill with server-computed GST and total, then audit it atomically.
-- Continues the SQL statement so its clauses and values form one database operation.
WITH new_bill AS (
  -- Chooses the table that will receive the new record.
  INSERT INTO bills (
    -- Continues the SQL statement so its clauses and values form one database operation.
    project_id, vendor_id, bill_number, bill_date, due_date, category,
    -- Continues the SQL statement so its clauses and values form one database operation.
    description, base_amount, gst_percent, gst_amount, total_amount,
    -- Continues the SQL statement so its clauses and values form one database operation.
    status, submitted_by_id, updated_at
  -- Closes the current table or grouped SQL statement.
  )
  -- Supplies the values that will be inserted into the chosen columns.
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,
          -- Continues the SQL statement so its clauses and values form one database operation.
          ROUND($8 * $9 / 100, 2),
          -- Continues the SQL statement so its clauses and values form one database operation.
          $8 + ROUND($8 * $9 / 100, 2),
          -- Continues the SQL statement so its clauses and values form one database operation.
          'PENDING', $10, CURRENT_TIMESTAMP)
  -- Continues the SQL statement so its clauses and values form one database operation.
  RETURNING *
-- Closes the current table or grouped SQL statement.
)
-- Chooses the table that will receive the new record.
INSERT INTO audit_logs (user_id, action, entity_type, entity_id, new_values)
-- Chooses the values the query will return.
SELECT $10, 'CREATE', 'Bill', id,
       -- Continues the SQL statement so its clauses and values form one database operation.
       jsonb_build_object('id', id, 'projectId', project_id,
                          -- Continues the SQL statement so its clauses and values form one database operation.
                          'vendorId', vendor_id, 'billNumber', bill_number,
                          -- Continues the SQL statement so its clauses and values form one database operation.
                          'totalAmount', total_amount, 'status', status)
-- Identifies the table or query that supplies rows for this statement.
FROM new_bill
-- Continues the SQL statement so its clauses and values form one database operation.
RETURNING *;

-- Q25 READ
-- Calculate paid and outstanding amounts without payment join fan-out.
-- Chooses the values the query will return.
SELECT b.id, b.bill_number, b.total_amount,
       -- Continues the SQL statement so its clauses and values form one database operation.
       COALESCE(p.paid_amount, 0) AS paid_amount,
       -- Continues the SQL statement so its clauses and values form one database operation.
       b.total_amount - COALESCE(p.paid_amount, 0) AS outstanding_amount
-- Identifies the table or query that supplies rows for this statement.
FROM bills AS b
-- Continues the SQL statement so its clauses and values form one database operation.
LEFT JOIN (
  -- Chooses the values the query will return.
  SELECT bill_id, SUM(amount) AS paid_amount
  -- Identifies the table or query that supplies rows for this statement.
  FROM payments
  -- Groups rows with the same values for aggregate calculations.
  GROUP BY bill_id
-- Continues the SQL statement so its clauses and values form one database operation.
) AS p ON p.bill_id = b.id
-- Filters the rows so only records matching this condition are used.
WHERE b.project_id = $1;

-- Q26 WRITE
-- Record a payment row. The application updates bill status and writes the
-- audit event in its surrounding transaction.
-- Chooses the table that will receive the new record.
INSERT INTO payments (
  -- Continues the SQL statement so its clauses and values form one database operation.
  bill_id, amount, payment_date, mode, reference_number, remarks, recorded_by_id
-- Closes the current table or grouped SQL statement.
)
-- Supplies the values that will be inserted into the chosen columns.
VALUES ($1, $2, $3, $4, $5, $6, $7)
-- Continues the SQL statement so its clauses and values form one database operation.
RETURNING *;

-- Q27 READ
-- Payment history with optional date filtering and project scoping.
-- Chooses the values the query will return.
SELECT pay.*, b.bill_number, b.project_id, v.name AS vendor_name
-- Identifies the table or query that supplies rows for this statement.
FROM payments AS pay
-- Combines related rows from another table.
JOIN bills AS b ON b.id = pay.bill_id
-- Combines related rows from another table.
JOIN vendors AS v ON v.id = b.vendor_id
-- Filters the rows so only records matching this condition are used.
WHERE ($1 IS NULL OR pay.payment_date >= $1)
  -- Adds another condition to narrow or expand the matching rows.
  AND ($2 IS NULL OR pay.payment_date <= $2)
-- Sorts the returned rows by the selected columns.
ORDER BY pay.payment_date DESC, pay.id DESC;
