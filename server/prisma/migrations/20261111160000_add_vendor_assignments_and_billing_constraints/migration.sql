-- CreateEnum
-- Defines an enum so the database accepts only the listed values.
CREATE TYPE "VendorType" AS ENUM ('MATERIAL_SUPPLIER', 'LABOUR_CONTRACTOR', 'MACHINERY_RENTAL', 'SERVICE_PROVIDER', 'OTHER');

-- AlterTable
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "vendors" ADD COLUMN     "vendor_type" "VendorType" NOT NULL DEFAULT 'OTHER';

-- CreateTable
-- Starts a table definition for storing related records.
CREATE TABLE "project_vendor_assignments" (
    -- Defines the id field in project_vendor_assignments and sets its database type or constraint.
    "id" SERIAL NOT NULL,
    -- Defines the project_id field in project_vendor_assignments and sets its database type or constraint.
    "project_id" INTEGER NOT NULL,
    -- Defines the vendor_id field in project_vendor_assignments and sets its database type or constraint.
    "vendor_id" INTEGER NOT NULL,
    -- Defines the assigned_by_id field in project_vendor_assignments and sets its database type or constraint.
    "assigned_by_id" INTEGER NOT NULL,
    -- Defines the assigned_at field in project_vendor_assignments and sets its database type or constraint.
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Defines the unassigned_at field in project_vendor_assignments and sets its database type or constraint.
    "unassigned_at" TIMESTAMP(3),

    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT "project_vendor_assignments_pkey" PRIMARY KEY ("id")
-- Closes the current table or grouped SQL statement.
);

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "project_vendor_assignments_project_id_vendor_id_unassigned__idx" ON "project_vendor_assignments"("project_id", "vendor_id", "unassigned_at");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "project_vendor_assignments_vendor_id_assigned_at_idx" ON "project_vendor_assignments"("vendor_id", "assigned_at");

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "project_vendor_assignments" ADD CONSTRAINT "project_vendor_assignments_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "project_vendor_assignments" ADD CONSTRAINT "project_vendor_assignments_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "project_vendor_assignments" ADD CONSTRAINT "project_vendor_assignments_assigned_by_id_fkey" FOREIGN KEY ("assigned_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

