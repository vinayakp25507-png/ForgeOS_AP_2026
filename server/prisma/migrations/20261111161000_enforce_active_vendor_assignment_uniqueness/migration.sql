-- Creates an index so matching rows can be found more efficiently.
CREATE UNIQUE INDEX "project_vendor_assignments_active_unique"
  -- Continues the SQL statement so its clauses and values form one database operation.
  ON "project_vendor_assignments" ("project_id", "vendor_id")
  -- Filters the rows so only records matching this condition are used.
  WHERE "unassigned_at" IS NULL;
