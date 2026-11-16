-- CreateEnum
-- Defines an enum so the database accepts only the listed values.
CREATE TYPE "MilestoneStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'CANCELLED');

-- CreateTable
-- Starts a table definition for storing related records.
CREATE TABLE "project_milestones" (
    -- Defines the id field in project_milestones and sets its database type or constraint.
    "id" SERIAL NOT NULL,
    -- Defines the project_id field in project_milestones and sets its database type or constraint.
    "project_id" INTEGER NOT NULL,
    -- Defines the name field in project_milestones and sets its database type or constraint.
    "name" TEXT NOT NULL,
    -- Defines the description field in project_milestones and sets its database type or constraint.
    "description" TEXT,
    -- Defines the sequence field in project_milestones and sets its database type or constraint.
    "sequence" INTEGER NOT NULL,
    -- Defines the planned_start_date field in project_milestones and sets its database type or constraint.
    "planned_start_date" DATE,
    -- Defines the planned_end_date field in project_milestones and sets its database type or constraint.
    "planned_end_date" DATE,
    -- Defines the actual_start_date field in project_milestones and sets its database type or constraint.
    "actual_start_date" DATE,
    -- Defines the actual_end_date field in project_milestones and sets its database type or constraint.
    "actual_end_date" DATE,
    -- Continues the SQL statement so its clauses and values form one database operation.
    "status" "MilestoneStatus" NOT NULL DEFAULT 'PLANNED',
    -- Defines the progress_percent field in project_milestones and sets its database type or constraint.
    "progress_percent" DECIMAL(5,2) NOT NULL DEFAULT 0,
    -- Defines the created_at field in project_milestones and sets its database type or constraint.
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Defines the updated_at field in project_milestones and sets its database type or constraint.
    "updated_at" TIMESTAMP(3) NOT NULL,

    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT "project_milestones_pkey" PRIMARY KEY ("id")
-- Closes the current table or grouped SQL statement.
);

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "project_milestones_project_id_sequence_idx" ON "project_milestones"("project_id", "sequence");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "project_milestones_project_id_status_idx" ON "project_milestones"("project_id", "status");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE UNIQUE INDEX "project_milestones_project_id_sequence_key" ON "project_milestones"("project_id", "sequence");

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "project_milestones" ADD CONSTRAINT "project_milestones_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
