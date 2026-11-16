-- CreateEnum
-- Defines an enum so the database accepts only the listed values.
CREATE TYPE "AdjustmentDirection" AS ENUM ('INCREASE', 'DECREASE');

-- AlterEnum
-- Continues the SQL statement so its clauses and values form one database operation.
ALTER TYPE "StockTxnType" ADD VALUE 'ADJUSTMENT';

-- AlterTable
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "materials" ADD COLUMN     "description" TEXT;

-- AlterTable
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "project_material_plans" ADD COLUMN     "opening_quantity" DECIMAL(14,3) NOT NULL DEFAULT 0;

-- AlterTable
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "stock_transactions" ADD COLUMN     "adjustment_direction" "AdjustmentDirection";
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "project_material_plans"
  -- Continues the SQL statement so its clauses and values form one database operation.
  ADD CONSTRAINT "chk_plan_opening_quantity" CHECK ("opening_quantity" >= 0);
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "stock_transactions"
  -- Continues the SQL statement so its clauses and values form one database operation.
  DROP CONSTRAINT "chk_stock_reason",
  -- Continues the SQL statement so its clauses and values form one database operation.
  ADD CONSTRAINT "chk_stock_reason" CHECK (
    -- Continues the SQL statement so its clauses and values form one database operation.
    ("txn_type" = 'IN' AND "out_reason" IS NULL AND "adjustment_direction" IS NULL)
    -- Adds another condition to narrow or expand the matching rows.
    OR ("txn_type" = 'OUT' AND "out_reason" IS NOT NULL AND "adjustment_direction" IS NULL)
    -- Adds another condition to narrow or expand the matching rows.
    OR ("txn_type"::text = 'ADJUSTMENT' AND "out_reason" IS NULL AND "adjustment_direction" IS NOT NULL
      -- Adds another condition to narrow or expand the matching rows.
      AND "vendor_id" IS NULL AND "bill_id" IS NULL AND "unit_rate" IS NULL)
  -- Closes the current table or grouped SQL statement.
  );
