-- CreateEnum
-- Defines an enum so the database accepts only the listed values.
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PM');

-- CreateEnum
-- Defines an enum so the database accepts only the listed values.
CREATE TYPE "AreaUnit" AS ENUM ('SQFT', 'SQYD', 'SQM', 'ACRE');

-- CreateEnum
-- Defines an enum so the database accepts only the listed values.
CREATE TYPE "ProjectStatus" AS ENUM ('PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED');

-- CreateEnum
-- Defines an enum so the database accepts only the listed values.
CREATE TYPE "MaterialCategory" AS ENUM ('CEMENT', 'STEEL', 'SAND_AGGREGATE', 'BRICKS_BLOCKS', 'TIMBER', 'ELECTRICAL', 'PLUMBING', 'PAINT_FINISH', 'OTHER');

-- CreateEnum
-- Defines an enum so the database accepts only the listed values.
CREATE TYPE "StockTxnType" AS ENUM ('IN', 'OUT');

-- CreateEnum
-- Defines an enum so the database accepts only the listed values.
CREATE TYPE "OutReason" AS ENUM ('USED', 'DAMAGED', 'LOST');

-- CreateEnum
-- Defines an enum so the database accepts only the listed values.
CREATE TYPE "BillCategory" AS ENUM ('MATERIAL', 'LABOUR', 'MACHINERY', 'SERVICES', 'OTHER');

-- CreateEnum
-- Defines an enum so the database accepts only the listed values.
CREATE TYPE "BillStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'PARTIALLY_PAID', 'PAID');

-- CreateEnum
-- Defines an enum so the database accepts only the listed values.
CREATE TYPE "PaymentMode" AS ENUM ('CASH', 'BANK_TRANSFER', 'UPI', 'CHEQUE', 'OTHER');

-- CreateEnum
-- Defines an enum so the database accepts only the listed values.
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'APPROVE', 'REJECT', 'VOID', 'LOGIN');

-- CreateEnum
-- Defines an enum so the database accepts only the listed values.
CREATE TYPE "NotificationType" AS ENUM ('LOW_STOCK', 'WASTAGE_ALERT', 'BILL_OVERDUE', 'BILL_SUBMITTED', 'BILL_APPROVED', 'BILL_REJECTED', 'BUDGET_ALERT');

-- CreateTable
-- Starts a table definition for storing related records.
CREATE TABLE "users" (
    -- Defines the id field in users and sets its database type or constraint.
    "id" SERIAL NOT NULL,
    -- Defines the name field in users and sets its database type or constraint.
    "name" TEXT NOT NULL,
    -- Defines the email field in users and sets its database type or constraint.
    "email" TEXT NOT NULL,
    -- Defines the password_hash field in users and sets its database type or constraint.
    "password_hash" TEXT NOT NULL,
    -- Continues the SQL statement so its clauses and values form one database operation.
    "role" "Role" NOT NULL DEFAULT 'PM',
    -- Defines the phone field in users and sets its database type or constraint.
    "phone" TEXT,
    -- Defines the is_active field in users and sets its database type or constraint.
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    -- Defines the last_login_at field in users and sets its database type or constraint.
    "last_login_at" TIMESTAMP(3),
    -- Defines the created_at field in users and sets its database type or constraint.
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Defines the updated_at field in users and sets its database type or constraint.
    "updated_at" TIMESTAMP(3) NOT NULL,

    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
-- Closes the current table or grouped SQL statement.
);

-- CreateTable
-- Starts a table definition for storing related records.
CREATE TABLE "lands" (
    -- Defines the id field in lands and sets its database type or constraint.
    "id" SERIAL NOT NULL,
    -- Defines the name field in lands and sets its database type or constraint.
    "name" TEXT NOT NULL,
    -- Defines the address_line field in lands and sets its database type or constraint.
    "address_line" TEXT,
    -- Defines the city field in lands and sets its database type or constraint.
    "city" TEXT NOT NULL,
    -- Defines the state field in lands and sets its database type or constraint.
    "state" TEXT NOT NULL,
    -- Defines the pincode field in lands and sets its database type or constraint.
    "pincode" TEXT,
    -- Defines the area_value field in lands and sets its database type or constraint.
    "area_value" DECIMAL(14,2) NOT NULL,
    -- Continues the SQL statement so its clauses and values form one database operation.
    "area_unit" "AreaUnit" NOT NULL,
    -- Defines the survey_number field in lands and sets its database type or constraint.
    "survey_number" TEXT,
    -- Defines the owner_name field in lands and sets its database type or constraint.
    "owner_name" TEXT,
    -- Defines the purchase_date field in lands and sets its database type or constraint.
    "purchase_date" DATE,
    -- Defines the purchase_cost field in lands and sets its database type or constraint.
    "purchase_cost" DECIMAL(16,2),
    -- Defines the notes field in lands and sets its database type or constraint.
    "notes" TEXT,
    -- Defines the created_by_id field in lands and sets its database type or constraint.
    "created_by_id" INTEGER NOT NULL,
    -- Defines the created_at field in lands and sets its database type or constraint.
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Defines the updated_at field in lands and sets its database type or constraint.
    "updated_at" TIMESTAMP(3) NOT NULL,

    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT "lands_pkey" PRIMARY KEY ("id")
-- Closes the current table or grouped SQL statement.
);

-- CreateTable
-- Starts a table definition for storing related records.
CREATE TABLE "projects" (
    -- Defines the id field in projects and sets its database type or constraint.
    "id" SERIAL NOT NULL,
    -- Defines the land_id field in projects and sets its database type or constraint.
    "land_id" INTEGER NOT NULL,
    -- Defines the code field in projects and sets its database type or constraint.
    "code" TEXT NOT NULL,
    -- Defines the name field in projects and sets its database type or constraint.
    "name" TEXT NOT NULL,
    -- Defines the description field in projects and sets its database type or constraint.
    "description" TEXT,
    -- Continues the SQL statement so its clauses and values form one database operation.
    "status" "ProjectStatus" NOT NULL DEFAULT 'PLANNING',
    -- Defines the start_date field in projects and sets its database type or constraint.
    "start_date" DATE,
    -- Defines the expected_end_date field in projects and sets its database type or constraint.
    "expected_end_date" DATE,
    -- Defines the actual_end_date field in projects and sets its database type or constraint.
    "actual_end_date" DATE,
    -- Defines the total_budget field in projects and sets its database type or constraint.
    "total_budget" DECIMAL(16,2) NOT NULL DEFAULT 0,
    -- Defines the wastage_threshold_pct field in projects and sets its database type or constraint.
    "wastage_threshold_pct" DECIMAL(5,2) NOT NULL DEFAULT 10,
    -- Defines the assigned_pm_id field in projects and sets its database type or constraint.
    "assigned_pm_id" INTEGER,
    -- Defines the created_by_id field in projects and sets its database type or constraint.
    "created_by_id" INTEGER NOT NULL,
    -- Defines the created_at field in projects and sets its database type or constraint.
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Defines the updated_at field in projects and sets its database type or constraint.
    "updated_at" TIMESTAMP(3) NOT NULL,

    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
-- Closes the current table or grouped SQL statement.
);

-- CreateTable
-- Starts a table definition for storing related records.
CREATE TABLE "materials" (
    -- Defines the id field in materials and sets its database type or constraint.
    "id" SERIAL NOT NULL,
    -- Defines the name field in materials and sets its database type or constraint.
    "name" TEXT NOT NULL,
    -- Continues the SQL statement so its clauses and values form one database operation.
    "category" "MaterialCategory" NOT NULL,
    -- Defines the unit field in materials and sets its database type or constraint.
    "unit" TEXT NOT NULL,
    -- Defines the is_active field in materials and sets its database type or constraint.
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    -- Defines the created_at field in materials and sets its database type or constraint.
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Defines the updated_at field in materials and sets its database type or constraint.
    "updated_at" TIMESTAMP(3) NOT NULL,

    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT "materials_pkey" PRIMARY KEY ("id")
-- Closes the current table or grouped SQL statement.
);

-- CreateTable
-- Starts a table definition for storing related records.
CREATE TABLE "vendors" (
    -- Defines the id field in vendors and sets its database type or constraint.
    "id" SERIAL NOT NULL,
    -- Defines the name field in vendors and sets its database type or constraint.
    "name" TEXT NOT NULL,
    -- Defines the contact_person field in vendors and sets its database type or constraint.
    "contact_person" TEXT,
    -- Defines the phone field in vendors and sets its database type or constraint.
    "phone" TEXT,
    -- Defines the email field in vendors and sets its database type or constraint.
    "email" TEXT,
    -- Defines the gstin field in vendors and sets its database type or constraint.
    "gstin" TEXT,
    -- Defines the address field in vendors and sets its database type or constraint.
    "address" TEXT,
    -- Defines the is_active field in vendors and sets its database type or constraint.
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    -- Defines the created_at field in vendors and sets its database type or constraint.
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Defines the updated_at field in vendors and sets its database type or constraint.
    "updated_at" TIMESTAMP(3) NOT NULL,

    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT "vendors_pkey" PRIMARY KEY ("id")
-- Closes the current table or grouped SQL statement.
);

-- CreateTable
-- Starts a table definition for storing related records.
CREATE TABLE "project_material_plans" (
    -- Defines the id field in project_material_plans and sets its database type or constraint.
    "id" SERIAL NOT NULL,
    -- Defines the project_id field in project_material_plans and sets its database type or constraint.
    "project_id" INTEGER NOT NULL,
    -- Defines the material_id field in project_material_plans and sets its database type or constraint.
    "material_id" INTEGER NOT NULL,
    -- Defines the planned_quantity field in project_material_plans and sets its database type or constraint.
    "planned_quantity" DECIMAL(14,3) NOT NULL,
    -- Defines the planned_unit_rate field in project_material_plans and sets its database type or constraint.
    "planned_unit_rate" DECIMAL(12,2),
    -- Defines the low_stock_threshold field in project_material_plans and sets its database type or constraint.
    "low_stock_threshold" DECIMAL(14,3),
    -- Defines the wastage_threshold_pct field in project_material_plans and sets its database type or constraint.
    "wastage_threshold_pct" DECIMAL(5,2),
    -- Defines the created_at field in project_material_plans and sets its database type or constraint.
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Defines the updated_at field in project_material_plans and sets its database type or constraint.
    "updated_at" TIMESTAMP(3) NOT NULL,

    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT "project_material_plans_pkey" PRIMARY KEY ("id")
-- Closes the current table or grouped SQL statement.
);

-- CreateTable
-- Starts a table definition for storing related records.
CREATE TABLE "daily_logs" (
    -- Defines the id field in daily_logs and sets its database type or constraint.
    "id" SERIAL NOT NULL,
    -- Defines the project_id field in daily_logs and sets its database type or constraint.
    "project_id" INTEGER NOT NULL,
    -- Defines the log_date field in daily_logs and sets its database type or constraint.
    "log_date" DATE NOT NULL,
    -- Defines the progress_percent field in daily_logs and sets its database type or constraint.
    "progress_percent" DECIMAL(5,2) NOT NULL,
    -- Defines the work_summary field in daily_logs and sets its database type or constraint.
    "work_summary" TEXT NOT NULL,
    -- Defines the weather field in daily_logs and sets its database type or constraint.
    "weather" TEXT,
    -- Defines the issues field in daily_logs and sets its database type or constraint.
    "issues" TEXT,
    -- Defines the created_by_id field in daily_logs and sets its database type or constraint.
    "created_by_id" INTEGER NOT NULL,
    -- Defines the created_at field in daily_logs and sets its database type or constraint.
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Defines the updated_at field in daily_logs and sets its database type or constraint.
    "updated_at" TIMESTAMP(3) NOT NULL,

    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT "daily_logs_pkey" PRIMARY KEY ("id")
-- Closes the current table or grouped SQL statement.
);

-- CreateTable
-- Starts a table definition for storing related records.
CREATE TABLE "labour_entries" (
    -- Defines the id field in labour_entries and sets its database type or constraint.
    "id" SERIAL NOT NULL,
    -- Defines the daily_log_id field in labour_entries and sets its database type or constraint.
    "daily_log_id" INTEGER NOT NULL,
    -- Defines the trade field in labour_entries and sets its database type or constraint.
    "trade" TEXT NOT NULL,
    -- Defines the contractor_name field in labour_entries and sets its database type or constraint.
    "contractor_name" TEXT,
    -- Defines the head_count field in labour_entries and sets its database type or constraint.
    "head_count" INTEGER NOT NULL,
    -- Defines the hours_worked field in labour_entries and sets its database type or constraint.
    "hours_worked" DECIMAL(4,1) NOT NULL DEFAULT 8,
    -- Defines the remarks field in labour_entries and sets its database type or constraint.
    "remarks" TEXT,

    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT "labour_entries_pkey" PRIMARY KEY ("id")
-- Closes the current table or grouped SQL statement.
);

-- CreateTable
-- Starts a table definition for storing related records.
CREATE TABLE "machinery_entries" (
    -- Defines the id field in machinery_entries and sets its database type or constraint.
    "id" SERIAL NOT NULL,
    -- Defines the daily_log_id field in machinery_entries and sets its database type or constraint.
    "daily_log_id" INTEGER NOT NULL,
    -- Defines the machine_name field in machinery_entries and sets its database type or constraint.
    "machine_name" TEXT NOT NULL,
    -- Defines the operator_name field in machinery_entries and sets its database type or constraint.
    "operator_name" TEXT,
    -- Defines the hours_used field in machinery_entries and sets its database type or constraint.
    "hours_used" DECIMAL(5,2) NOT NULL,
    -- Defines the fuel_litres field in machinery_entries and sets its database type or constraint.
    "fuel_litres" DECIMAL(8,2),
    -- Defines the remarks field in machinery_entries and sets its database type or constraint.
    "remarks" TEXT,

    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT "machinery_entries_pkey" PRIMARY KEY ("id")
-- Closes the current table or grouped SQL statement.
);

-- CreateTable
-- Starts a table definition for storing related records.
CREATE TABLE "stock_transactions" (
    -- Defines the id field in stock_transactions and sets its database type or constraint.
    "id" SERIAL NOT NULL,
    -- Defines the project_id field in stock_transactions and sets its database type or constraint.
    "project_id" INTEGER NOT NULL,
    -- Defines the material_id field in stock_transactions and sets its database type or constraint.
    "material_id" INTEGER NOT NULL,
    -- Continues the SQL statement so its clauses and values form one database operation.
    "txn_type" "StockTxnType" NOT NULL,
    -- Defines the quantity field in stock_transactions and sets its database type or constraint.
    "quantity" DECIMAL(14,3) NOT NULL,
    -- Defines the unit_rate field in stock_transactions and sets its database type or constraint.
    "unit_rate" DECIMAL(12,2),
    -- Defines the vendor_id field in stock_transactions and sets its database type or constraint.
    "vendor_id" INTEGER,
    -- Defines the bill_id field in stock_transactions and sets its database type or constraint.
    "bill_id" INTEGER,
    -- Defines the challan_number field in stock_transactions and sets its database type or constraint.
    "challan_number" TEXT,
    -- Continues the SQL statement so its clauses and values form one database operation.
    "out_reason" "OutReason",
    -- Defines the txn_date field in stock_transactions and sets its database type or constraint.
    "txn_date" DATE NOT NULL,
    -- Defines the daily_log_id field in stock_transactions and sets its database type or constraint.
    "daily_log_id" INTEGER,
    -- Defines the remarks field in stock_transactions and sets its database type or constraint.
    "remarks" TEXT,
    -- Defines the created_by_id field in stock_transactions and sets its database type or constraint.
    "created_by_id" INTEGER NOT NULL,
    -- Defines the created_at field in stock_transactions and sets its database type or constraint.
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Defines the is_voided field in stock_transactions and sets its database type or constraint.
    "is_voided" BOOLEAN NOT NULL DEFAULT false,
    -- Defines the voided_by_id field in stock_transactions and sets its database type or constraint.
    "voided_by_id" INTEGER,
    -- Defines the voided_at field in stock_transactions and sets its database type or constraint.
    "voided_at" TIMESTAMP(3),
    -- Defines the void_reason field in stock_transactions and sets its database type or constraint.
    "void_reason" TEXT,

    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT "stock_transactions_pkey" PRIMARY KEY ("id")
-- Closes the current table or grouped SQL statement.
);

-- CreateTable
-- Starts a table definition for storing related records.
CREATE TABLE "bills" (
    -- Defines the id field in bills and sets its database type or constraint.
    "id" SERIAL NOT NULL,
    -- Defines the project_id field in bills and sets its database type or constraint.
    "project_id" INTEGER NOT NULL,
    -- Defines the vendor_id field in bills and sets its database type or constraint.
    "vendor_id" INTEGER NOT NULL,
    -- Defines the bill_number field in bills and sets its database type or constraint.
    "bill_number" TEXT NOT NULL,
    -- Defines the bill_date field in bills and sets its database type or constraint.
    "bill_date" DATE NOT NULL,
    -- Defines the due_date field in bills and sets its database type or constraint.
    "due_date" DATE,
    -- Continues the SQL statement so its clauses and values form one database operation.
    "category" "BillCategory" NOT NULL,
    -- Defines the description field in bills and sets its database type or constraint.
    "description" TEXT,
    -- Defines the base_amount field in bills and sets its database type or constraint.
    "base_amount" DECIMAL(14,2) NOT NULL,
    -- Defines the gst_percent field in bills and sets its database type or constraint.
    "gst_percent" DECIMAL(5,2) NOT NULL DEFAULT 0,
    -- Defines the gst_amount field in bills and sets its database type or constraint.
    "gst_amount" DECIMAL(14,2) NOT NULL,
    -- Defines the total_amount field in bills and sets its database type or constraint.
    "total_amount" DECIMAL(14,2) NOT NULL,
    -- Continues the SQL statement so its clauses and values form one database operation.
    "status" "BillStatus" NOT NULL DEFAULT 'PENDING',
    -- Defines the submitted_by_id field in bills and sets its database type or constraint.
    "submitted_by_id" INTEGER NOT NULL,
    -- Defines the approved_by_id field in bills and sets its database type or constraint.
    "approved_by_id" INTEGER,
    -- Defines the approved_at field in bills and sets its database type or constraint.
    "approved_at" TIMESTAMP(3),
    -- Defines the rejection_reason field in bills and sets its database type or constraint.
    "rejection_reason" TEXT,
    -- Defines the created_at field in bills and sets its database type or constraint.
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Defines the updated_at field in bills and sets its database type or constraint.
    "updated_at" TIMESTAMP(3) NOT NULL,

    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT "bills_pkey" PRIMARY KEY ("id")
-- Closes the current table or grouped SQL statement.
);

-- CreateTable
-- Starts a table definition for storing related records.
CREATE TABLE "payments" (
    -- Defines the id field in payments and sets its database type or constraint.
    "id" SERIAL NOT NULL,
    -- Defines the bill_id field in payments and sets its database type or constraint.
    "bill_id" INTEGER NOT NULL,
    -- Defines the amount field in payments and sets its database type or constraint.
    "amount" DECIMAL(14,2) NOT NULL,
    -- Defines the payment_date field in payments and sets its database type or constraint.
    "payment_date" DATE NOT NULL,
    -- Continues the SQL statement so its clauses and values form one database operation.
    "mode" "PaymentMode" NOT NULL,
    -- Defines the reference_number field in payments and sets its database type or constraint.
    "reference_number" TEXT,
    -- Defines the remarks field in payments and sets its database type or constraint.
    "remarks" TEXT,
    -- Defines the recorded_by_id field in payments and sets its database type or constraint.
    "recorded_by_id" INTEGER NOT NULL,
    -- Defines the created_at field in payments and sets its database type or constraint.
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
-- Closes the current table or grouped SQL statement.
);

-- CreateTable
-- Starts a table definition for storing related records.
CREATE TABLE "audit_logs" (
    -- Defines the id field in audit_logs and sets its database type or constraint.
    "id" SERIAL NOT NULL,
    -- Defines the user_id field in audit_logs and sets its database type or constraint.
    "user_id" INTEGER,
    -- Continues the SQL statement so its clauses and values form one database operation.
    "action" "AuditAction" NOT NULL,
    -- Defines the entity_type field in audit_logs and sets its database type or constraint.
    "entity_type" TEXT NOT NULL,
    -- Defines the entity_id field in audit_logs and sets its database type or constraint.
    "entity_id" INTEGER,
    -- Defines the old_values field in audit_logs and sets its database type or constraint.
    "old_values" JSONB,
    -- Defines the new_values field in audit_logs and sets its database type or constraint.
    "new_values" JSONB,
    -- Defines the ip_address field in audit_logs and sets its database type or constraint.
    "ip_address" TEXT,
    -- Defines the created_at field in audit_logs and sets its database type or constraint.
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
-- Closes the current table or grouped SQL statement.
);

-- CreateTable
-- Starts a table definition for storing related records.
CREATE TABLE "notifications" (
    -- Defines the id field in notifications and sets its database type or constraint.
    "id" SERIAL NOT NULL,
    -- Defines the user_id field in notifications and sets its database type or constraint.
    "user_id" INTEGER NOT NULL,
    -- Continues the SQL statement so its clauses and values form one database operation.
    "type" "NotificationType" NOT NULL,
    -- Defines the title field in notifications and sets its database type or constraint.
    "title" TEXT NOT NULL,
    -- Defines the message field in notifications and sets its database type or constraint.
    "message" TEXT NOT NULL,
    -- Defines the project_id field in notifications and sets its database type or constraint.
    "project_id" INTEGER,
    -- Defines the link field in notifications and sets its database type or constraint.
    "link" TEXT,
    -- Defines the is_read field in notifications and sets its database type or constraint.
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    -- Defines the dedupe_key field in notifications and sets its database type or constraint.
    "dedupe_key" TEXT,
    -- Defines the created_at field in notifications and sets its database type or constraint.
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
-- Closes the current table or grouped SQL statement.
);

-- CreateTable
-- Starts a table definition for storing related records.
CREATE TABLE "attachments" (
    -- Defines the id field in attachments and sets its database type or constraint.
    "id" SERIAL NOT NULL,
    -- Defines the daily_log_id field in attachments and sets its database type or constraint.
    "daily_log_id" INTEGER,
    -- Defines the bill_id field in attachments and sets its database type or constraint.
    "bill_id" INTEGER,
    -- Defines the file_name field in attachments and sets its database type or constraint.
    "file_name" TEXT NOT NULL,
    -- Defines the stored_path field in attachments and sets its database type or constraint.
    "stored_path" TEXT NOT NULL,
    -- Defines the mime_type field in attachments and sets its database type or constraint.
    "mime_type" TEXT NOT NULL,
    -- Defines the size_bytes field in attachments and sets its database type or constraint.
    "size_bytes" INTEGER NOT NULL,
    -- Defines the uploaded_by_id field in attachments and sets its database type or constraint.
    "uploaded_by_id" INTEGER NOT NULL,
    -- Defines the created_at field in attachments and sets its database type or constraint.
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
-- Closes the current table or grouped SQL statement.
);

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "lands_city_state_idx" ON "lands"("city", "state");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE UNIQUE INDEX "projects_code_key" ON "projects"("code");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "projects_land_id_idx" ON "projects"("land_id");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "projects_assigned_pm_id_idx" ON "projects"("assigned_pm_id");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "projects_status_idx" ON "projects"("status");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE UNIQUE INDEX "materials_name_key" ON "materials"("name");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE UNIQUE INDEX "vendors_name_key" ON "vendors"("name");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE UNIQUE INDEX "vendors_gstin_key" ON "vendors"("gstin");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE UNIQUE INDEX "project_material_plans_project_id_material_id_key" ON "project_material_plans"("project_id", "material_id");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "daily_logs_project_id_log_date_idx" ON "daily_logs"("project_id", "log_date" DESC);

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE UNIQUE INDEX "daily_logs_project_id_log_date_key" ON "daily_logs"("project_id", "log_date");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "labour_entries_daily_log_id_idx" ON "labour_entries"("daily_log_id");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "machinery_entries_daily_log_id_idx" ON "machinery_entries"("daily_log_id");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "stock_transactions_project_id_material_id_txn_date_idx" ON "stock_transactions"("project_id", "material_id", "txn_date");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "stock_transactions_vendor_id_idx" ON "stock_transactions"("vendor_id");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "stock_transactions_bill_id_idx" ON "stock_transactions"("bill_id");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "bills_project_id_status_idx" ON "bills"("project_id", "status");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "bills_status_due_date_idx" ON "bills"("status", "due_date");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE UNIQUE INDEX "bills_vendor_id_bill_number_key" ON "bills"("vendor_id", "bill_number");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "payments_bill_id_idx" ON "payments"("bill_id");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "audit_logs_entity_type_entity_id_idx" ON "audit_logs"("entity_type", "entity_id");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "audit_logs_user_id_created_at_idx" ON "audit_logs"("user_id", "created_at");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs"("created_at");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE UNIQUE INDEX "notifications_dedupe_key_key" ON "notifications"("dedupe_key");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "notifications_user_id_is_read_created_at_idx" ON "notifications"("user_id", "is_read", "created_at");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "attachments_daily_log_id_idx" ON "attachments"("daily_log_id");

-- CreateIndex
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "attachments_bill_id_idx" ON "attachments"("bill_id");

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "lands" ADD CONSTRAINT "lands_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "projects" ADD CONSTRAINT "projects_land_id_fkey" FOREIGN KEY ("land_id") REFERENCES "lands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "projects" ADD CONSTRAINT "projects_assigned_pm_id_fkey" FOREIGN KEY ("assigned_pm_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "projects" ADD CONSTRAINT "projects_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "project_material_plans" ADD CONSTRAINT "project_material_plans_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "project_material_plans" ADD CONSTRAINT "project_material_plans_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "daily_logs" ADD CONSTRAINT "daily_logs_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "daily_logs" ADD CONSTRAINT "daily_logs_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "labour_entries" ADD CONSTRAINT "labour_entries_daily_log_id_fkey" FOREIGN KEY ("daily_log_id") REFERENCES "daily_logs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "machinery_entries" ADD CONSTRAINT "machinery_entries_daily_log_id_fkey" FOREIGN KEY ("daily_log_id") REFERENCES "daily_logs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "stock_transactions" ADD CONSTRAINT "stock_transactions_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "stock_transactions" ADD CONSTRAINT "stock_transactions_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "stock_transactions" ADD CONSTRAINT "stock_transactions_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "stock_transactions" ADD CONSTRAINT "stock_transactions_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "bills"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "stock_transactions" ADD CONSTRAINT "stock_transactions_daily_log_id_fkey" FOREIGN KEY ("daily_log_id") REFERENCES "daily_logs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "stock_transactions" ADD CONSTRAINT "stock_transactions_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "stock_transactions" ADD CONSTRAINT "stock_transactions_voided_by_id_fkey" FOREIGN KEY ("voided_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "bills" ADD CONSTRAINT "bills_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "bills" ADD CONSTRAINT "bills_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "bills" ADD CONSTRAINT "bills_submitted_by_id_fkey" FOREIGN KEY ("submitted_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "bills" ADD CONSTRAINT "bills_approved_by_id_fkey" FOREIGN KEY ("approved_by_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "payments" ADD CONSTRAINT "payments_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "payments" ADD CONSTRAINT "payments_recorded_by_id_fkey" FOREIGN KEY ("recorded_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_daily_log_id_fkey" FOREIGN KEY ("daily_log_id") REFERENCES "daily_logs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "bills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- PostgreSQL integrity constraints not expressible in Prisma schema syntax.
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "projects"
  -- Continues the SQL statement so its clauses and values form one database operation.
  ADD CONSTRAINT "chk_projects_budget" CHECK ("total_budget" >= 0),
  -- Continues the SQL statement so its clauses and values form one database operation.
  ADD CONSTRAINT "chk_projects_threshold" CHECK ("wastage_threshold_pct" BETWEEN 0 AND 100);
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "project_material_plans"
  -- Continues the SQL statement so its clauses and values form one database operation.
  ADD CONSTRAINT "chk_plan_qty" CHECK ("planned_quantity" > 0);
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "daily_logs"
  -- Continues the SQL statement so its clauses and values form one database operation.
  ADD CONSTRAINT "chk_log_progress" CHECK ("progress_percent" BETWEEN 0 AND 100);
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "labour_entries"
  -- Continues the SQL statement so its clauses and values form one database operation.
  ADD CONSTRAINT "chk_labour_headcount" CHECK ("head_count" > 0),
  -- Continues the SQL statement so its clauses and values form one database operation.
  ADD CONSTRAINT "chk_labour_hours" CHECK ("hours_worked" BETWEEN 0 AND 24);
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "machinery_entries"
  -- Continues the SQL statement so its clauses and values form one database operation.
  ADD CONSTRAINT "chk_machinery_hours" CHECK ("hours_used" BETWEEN 0 AND 24);
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "bills"
  -- Continues the SQL statement so its clauses and values form one database operation.
  ADD CONSTRAINT "chk_bill_amounts" CHECK (
    -- Continues the SQL statement so its clauses and values form one database operation.
    "base_amount" >= 0 AND "gst_percent" BETWEEN 0 AND 100
    -- Adds another condition to narrow or expand the matching rows.
    AND "gst_amount" >= 0 AND "total_amount" = "base_amount" + "gst_amount"
  -- Continues the SQL statement so its clauses and values form one database operation.
  ),
  -- Continues the SQL statement so its clauses and values form one database operation.
  ADD CONSTRAINT "chk_bill_due" CHECK ("due_date" IS NULL OR "due_date" >= "bill_date"),
  -- Continues the SQL statement so its clauses and values form one database operation.
  ADD CONSTRAINT "chk_bill_approval" CHECK (
    -- Continues the SQL statement so its clauses and values form one database operation.
    "status" NOT IN ('APPROVED', 'PARTIALLY_PAID', 'PAID')
    -- Adds another condition to narrow or expand the matching rows.
    OR ("approved_by_id" IS NOT NULL AND "approved_at" IS NOT NULL)
  -- Closes the current table or grouped SQL statement.
  );
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "stock_transactions"
  -- Continues the SQL statement so its clauses and values form one database operation.
  ADD CONSTRAINT "chk_stock_qty_positive" CHECK ("quantity" > 0),
  -- Continues the SQL statement so its clauses and values form one database operation.
  ADD CONSTRAINT "chk_stock_reason" CHECK (
    -- Continues the SQL statement so its clauses and values form one database operation.
    ("txn_type" = 'IN' AND "out_reason" IS NULL)
    -- Adds another condition to narrow or expand the matching rows.
    OR ("txn_type" = 'OUT' AND "out_reason" IS NOT NULL)
  -- Continues the SQL statement so its clauses and values form one database operation.
  ),
  -- Continues the SQL statement so its clauses and values form one database operation.
  ADD CONSTRAINT "chk_stock_in_only_links" CHECK (
    -- Continues the SQL statement so its clauses and values form one database operation.
    "txn_type" = 'IN'
    -- Adds another condition to narrow or expand the matching rows.
    OR ("vendor_id" IS NULL AND "bill_id" IS NULL AND "unit_rate" IS NULL)
  -- Continues the SQL statement so its clauses and values form one database operation.
  ),
  -- Continues the SQL statement so its clauses and values form one database operation.
  ADD CONSTRAINT "chk_stock_void_fields" CHECK (
    -- Continues the SQL statement so its clauses and values form one database operation.
    "is_voided" = true
    -- Adds another condition to narrow or expand the matching rows.
    OR ("voided_by_id" IS NULL AND "voided_at" IS NULL AND "void_reason" IS NULL)
  -- Closes the current table or grouped SQL statement.
  );
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "payments"
  -- Continues the SQL statement so its clauses and values form one database operation.
  ADD CONSTRAINT "chk_payment_amount" CHECK ("amount" > 0);
-- Changes an existing table by adding or updating a database rule.
ALTER TABLE "attachments"
  -- Continues the SQL statement so its clauses and values form one database operation.
  ADD CONSTRAINT "chk_attachment_target" CHECK (
    -- Continues the SQL statement so its clauses and values form one database operation.
    (CASE WHEN "daily_log_id" IS NOT NULL THEN 1 ELSE 0 END)
    -- Continues the SQL statement so its clauses and values form one database operation.
    + (CASE WHEN "bill_id" IS NOT NULL THEN 1 ELSE 0 END) = 1
  -- Closes the current table or grouped SQL statement.
  );

-- Preserve the SQL schema's case-insensitive uniqueness guarantees.
-- Creates an index so matching rows can be found more efficiently.
CREATE UNIQUE INDEX "materials_name_ci_key" ON "materials" (lower("name"));
-- Creates an index so matching rows can be found more efficiently.
CREATE UNIQUE INDEX "vendors_name_ci_key" ON "vendors" (lower("name"));
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX "bills_open_due_date_idx"
  -- Continues the SQL statement so its clauses and values form one database operation.
  ON "bills" ("due_date")
  -- Filters the rows so only records matching this condition are used.
  WHERE "status" IN ('APPROVED', 'PARTIALLY_PAID');

-- Analytics views retained as database-level read models.
-- Continues the SQL statement so its clauses and values form one database operation.
CREATE VIEW "v_stock_balance" AS
-- Chooses the values the query will return.
SELECT
  -- Continues the SQL statement so its clauses and values form one database operation.
  t."project_id",
  -- Continues the SQL statement so its clauses and values form one database operation.
  t."material_id",
  -- Continues the SQL statement so its clauses and values form one database operation.
  COALESCE(SUM(t."quantity") FILTER (WHERE t."txn_type" = 'IN'), 0) AS "total_in",
  -- Continues the SQL statement so its clauses and values form one database operation.
  COALESCE(SUM(t."quantity") FILTER (WHERE t."txn_type" = 'OUT'), 0) AS "total_out",
  -- Continues the SQL statement so its clauses and values form one database operation.
  COALESCE(SUM(CASE WHEN t."txn_type" = 'IN' THEN t."quantity" ELSE -t."quantity" END), 0) AS "balance"
-- Identifies the table or query that supplies rows for this statement.
FROM "stock_transactions" t
-- Filters the rows so only records matching this condition are used.
WHERE t."is_voided" = false
-- Groups rows with the same values for aggregate calculations.
GROUP BY t."project_id", t."material_id";

-- Continues the SQL statement so its clauses and values form one database operation.
CREATE VIEW "v_wastage_status" AS
-- Continues the SQL statement so its clauses and values form one database operation.
WITH "latest_progress" AS (
  -- Chooses the values the query will return.
  SELECT DISTINCT ON ("project_id") "project_id", "progress_percent"
  -- Identifies the table or query that supplies rows for this statement.
  FROM "daily_logs"
  -- Sorts the returned rows by the selected columns.
  ORDER BY "project_id", "log_date" DESC
-- Continues the SQL statement so its clauses and values form one database operation.
),
-- Continues the SQL statement so its clauses and values form one database operation.
"usage" AS (
  -- Chooses the values the query will return.
  SELECT
    -- Continues the SQL statement so its clauses and values form one database operation.
    "project_id",
    -- Continues the SQL statement so its clauses and values form one database operation.
    "material_id",
    -- Continues the SQL statement so its clauses and values form one database operation.
    COALESCE(SUM("quantity") FILTER (WHERE "txn_type" = 'OUT'), 0) AS "consumed_qty",
    -- Continues the SQL statement so its clauses and values form one database operation.
    COALESCE(SUM("quantity") FILTER (WHERE "txn_type" = 'OUT' AND "out_reason" IN ('DAMAGED', 'LOST')), 0) AS "recorded_wastage_qty"
  -- Identifies the table or query that supplies rows for this statement.
  FROM "stock_transactions"
  -- Filters the rows so only records matching this condition are used.
  WHERE "is_voided" = false
  -- Groups rows with the same values for aggregate calculations.
  GROUP BY "project_id", "material_id"
-- Closes the current table or grouped SQL statement.
)
-- Chooses the values the query will return.
SELECT
  -- Continues the SQL statement so its clauses and values form one database operation.
  pl."project_id",
  -- Continues the SQL statement so its clauses and values form one database operation.
  pl."material_id",
  -- Continues the SQL statement so its clauses and values form one database operation.
  pl."planned_quantity",
  -- Continues the SQL statement so its clauses and values form one database operation.
  pl."planned_unit_rate",
  -- Continues the SQL statement so its clauses and values form one database operation.
  COALESCE(lp."progress_percent", 0) AS "progress_percent",
  -- Continues the SQL statement so its clauses and values form one database operation.
  ROUND(pl."planned_quantity" * COALESCE(lp."progress_percent", 0) / 100, 3) AS "expected_qty",
  -- Continues the SQL statement so its clauses and values form one database operation.
  COALESCE(u."consumed_qty", 0) AS "consumed_qty",
  -- Continues the SQL statement so its clauses and values form one database operation.
  COALESCE(u."recorded_wastage_qty", 0) AS "recorded_wastage_qty",
  -- Continues the SQL statement so its clauses and values form one database operation.
  GREATEST(COALESCE(u."consumed_qty", 0) - ROUND(pl."planned_quantity" * COALESCE(lp."progress_percent", 0) / 100, 3), 0) AS "overrun_qty",
  -- Continues the SQL statement so its clauses and values form one database operation.
  COALESCE(pl."wastage_threshold_pct", p."wastage_threshold_pct") AS "threshold_pct"
-- Identifies the table or query that supplies rows for this statement.
FROM "project_material_plans" pl
-- Combines related rows from another table.
JOIN "projects" p ON p."id" = pl."project_id"
-- Continues the SQL statement so its clauses and values form one database operation.
LEFT JOIN "latest_progress" lp ON lp."project_id" = pl."project_id"
-- Continues the SQL statement so its clauses and values form one database operation.
LEFT JOIN "usage" u ON u."project_id" = pl."project_id" AND u."material_id" = pl."material_id";

-- Continues the SQL statement so its clauses and values form one database operation.
CREATE VIEW "v_project_financials" AS
-- Continues the SQL statement so its clauses and values form one database operation.
WITH "bill_totals" AS (
  -- Chooses the values the query will return.
  SELECT
    -- Continues the SQL statement so its clauses and values form one database operation.
    "project_id",
    -- Continues the SQL statement so its clauses and values form one database operation.
    COALESCE(SUM("total_amount") FILTER (WHERE "status" IN ('APPROVED', 'PARTIALLY_PAID', 'PAID')), 0) AS "committed_amount",
    -- Continues the SQL statement so its clauses and values form one database operation.
    COALESCE(SUM("total_amount") FILTER (WHERE "status" = 'PENDING'), 0) AS "pending_exposure",
    -- Continues the SQL statement so its clauses and values form one database operation.
    COUNT(*) AS "total_bills_count"
  -- Identifies the table or query that supplies rows for this statement.
  FROM "bills"
  -- Groups rows with the same values for aggregate calculations.
  GROUP BY "project_id"
-- Continues the SQL statement so its clauses and values form one database operation.
),
-- Continues the SQL statement so its clauses and values form one database operation.
"payment_totals" AS (
  -- Chooses the values the query will return.
  SELECT b."project_id", COALESCE(SUM(p."amount"), 0) AS "total_paid"
  -- Identifies the table or query that supplies rows for this statement.
  FROM "payments" p
  -- Combines related rows from another table.
  JOIN "bills" b ON b."id" = p."bill_id"
  -- Groups rows with the same values for aggregate calculations.
  GROUP BY b."project_id"
-- Closes the current table or grouped SQL statement.
)
-- Chooses the values the query will return.
SELECT
  -- Continues the SQL statement so its clauses and values form one database operation.
  p."id" AS "project_id",
  -- Continues the SQL statement so its clauses and values form one database operation.
  p."code" AS "project_code",
  -- Continues the SQL statement so its clauses and values form one database operation.
  p."name" AS "project_name",
  -- Continues the SQL statement so its clauses and values form one database operation.
  p."total_budget",
  -- Continues the SQL statement so its clauses and values form one database operation.
  COALESCE(bt."committed_amount", 0) AS "committed_amount",
  -- Continues the SQL statement so its clauses and values form one database operation.
  COALESCE(bt."pending_exposure", 0) AS "pending_exposure",
  -- Continues the SQL statement so its clauses and values form one database operation.
  COALESCE(pt."total_paid", 0) AS "total_paid",
  -- Continues the SQL statement so its clauses and values form one database operation.
  (p."total_budget" - COALESCE(bt."committed_amount", 0)) AS "remaining_budget",
  -- Continues the SQL statement so its clauses and values form one database operation.
  COALESCE(bt."total_bills_count", 0) AS "total_bills_count"
-- Identifies the table or query that supplies rows for this statement.
FROM "projects" p
-- Continues the SQL statement so its clauses and values form one database operation.
LEFT JOIN "bill_totals" bt ON bt."project_id" = p."id"
-- Continues the SQL statement so its clauses and values form one database operation.
LEFT JOIN "payment_totals" pt ON pt."project_id" = p."id";
