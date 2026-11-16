-- ========================================================================
-- ForgeOS - Centralized Construction Management Platform
-- Full Relational Database Schema (PostgreSQL 16+)
-- ========================================================================

-- Enable standard UUID / crypto extensions if needed
-- Enables a PostgreSQL extension that provides additional database functions.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Enables a PostgreSQL extension that provides additional database functions.
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ========================================================================
-- 1. ENUMS
-- ========================================================================

-- Starts a PostgreSQL block for running the enclosed setup statements.
DO $$ BEGIN
    -- Defines an enum so the database accepts only the listed values.
    CREATE TYPE "Role" AS ENUM ('ADMIN', 'PM');
-- Begins recovery logic for an error raised by the preceding database operation.
EXCEPTION
    -- Handles the named database condition so setup can continue safely.
    WHEN duplicate_object THEN null;
-- Closes the current database block.
END $$;

-- Starts a PostgreSQL block for running the enclosed setup statements.
DO $$ BEGIN
    -- Defines an enum so the database accepts only the listed values.
    CREATE TYPE "AreaUnit" AS ENUM ('SQFT', 'SQYD', 'SQM', 'ACRE');
-- Begins recovery logic for an error raised by the preceding database operation.
EXCEPTION
    -- Handles the named database condition so setup can continue safely.
    WHEN duplicate_object THEN null;
-- Closes the current database block.
END $$;

-- Starts a PostgreSQL block for running the enclosed setup statements.
DO $$ BEGIN
    -- Defines an enum so the database accepts only the listed values.
    CREATE TYPE "ProjectStatus" AS ENUM ('PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED');
-- Begins recovery logic for an error raised by the preceding database operation.
EXCEPTION
    -- Handles the named database condition so setup can continue safely.
    WHEN duplicate_object THEN null;
-- Closes the current database block.
END $$;

-- Starts a PostgreSQL block for running the enclosed setup statements.
DO $$ BEGIN
    -- Defines an enum so the database accepts only the listed values.
    CREATE TYPE "MaterialCategory" AS ENUM (
        -- Continues the SQL statement so its clauses and values form one database operation.
        'CEMENT',
        -- Continues the SQL statement so its clauses and values form one database operation.
        'STEEL',
        -- Continues the SQL statement so its clauses and values form one database operation.
        'SAND_AGGREGATE',
        -- Continues the SQL statement so its clauses and values form one database operation.
        'BRICKS_BLOCKS',
        -- Continues the SQL statement so its clauses and values form one database operation.
        'TIMBER',
        -- Continues the SQL statement so its clauses and values form one database operation.
        'ELECTRICAL',
        -- Continues the SQL statement so its clauses and values form one database operation.
        'PLUMBING',
        -- Continues the SQL statement so its clauses and values form one database operation.
        'PAINT_FINISH',
        -- Continues the SQL statement so its clauses and values form one database operation.
        'OTHER'
    -- Closes the current table or grouped SQL statement.
    );
-- Begins recovery logic for an error raised by the preceding database operation.
EXCEPTION
    -- Handles the named database condition so setup can continue safely.
    WHEN duplicate_object THEN null;
-- Closes the current database block.
END $$;

-- Starts a PostgreSQL block for running the enclosed setup statements.
DO $$ BEGIN
    -- Defines an enum so the database accepts only the listed values.
    CREATE TYPE "StockTxnType" AS ENUM ('IN', 'OUT');
-- Begins recovery logic for an error raised by the preceding database operation.
EXCEPTION
    -- Handles the named database condition so setup can continue safely.
    WHEN duplicate_object THEN null;
-- Closes the current database block.
END $$;

-- Starts a PostgreSQL block for running the enclosed setup statements.
DO $$ BEGIN
    -- Defines an enum so the database accepts only the listed values.
    CREATE TYPE "OutReason" AS ENUM ('USED', 'DAMAGED', 'LOST');
-- Begins recovery logic for an error raised by the preceding database operation.
EXCEPTION
    -- Handles the named database condition so setup can continue safely.
    WHEN duplicate_object THEN null;
-- Closes the current database block.
END $$;

-- Starts a PostgreSQL block for running the enclosed setup statements.
DO $$ BEGIN
    -- Defines an enum so the database accepts only the listed values.
    CREATE TYPE "BillCategory" AS ENUM ('MATERIAL', 'LABOUR', 'MACHINERY', 'SERVICES', 'OTHER');
-- Begins recovery logic for an error raised by the preceding database operation.
EXCEPTION
    -- Handles the named database condition so setup can continue safely.
    WHEN duplicate_object THEN null;
-- Closes the current database block.
END $$;

-- Starts a PostgreSQL block for running the enclosed setup statements.
DO $$ BEGIN
    -- Defines an enum so the database accepts only the listed values.
    CREATE TYPE "BillStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'PARTIALLY_PAID', 'PAID');
-- Begins recovery logic for an error raised by the preceding database operation.
EXCEPTION
    -- Handles the named database condition so setup can continue safely.
    WHEN duplicate_object THEN null;
-- Closes the current database block.
END $$;

-- Starts a PostgreSQL block for running the enclosed setup statements.
DO $$ BEGIN
    -- Defines an enum so the database accepts only the listed values.
    CREATE TYPE "PaymentMode" AS ENUM ('CASH', 'BANK_TRANSFER', 'UPI', 'CHEQUE', 'OTHER');
-- Begins recovery logic for an error raised by the preceding database operation.
EXCEPTION
    -- Handles the named database condition so setup can continue safely.
    WHEN duplicate_object THEN null;
-- Closes the current database block.
END $$;

-- Starts a PostgreSQL block for running the enclosed setup statements.
DO $$ BEGIN
    -- Defines an enum so the database accepts only the listed values.
    CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'APPROVE', 'REJECT', 'VOID', 'LOGIN');
-- Begins recovery logic for an error raised by the preceding database operation.
EXCEPTION
    -- Handles the named database condition so setup can continue safely.
    WHEN duplicate_object THEN null;
-- Closes the current database block.
END $$;

-- Starts a PostgreSQL block for running the enclosed setup statements.
DO $$ BEGIN
    -- Defines an enum so the database accepts only the listed values.
    CREATE TYPE "NotificationType" AS ENUM (
        -- Continues the SQL statement so its clauses and values form one database operation.
        'LOW_STOCK',
        -- Continues the SQL statement so its clauses and values form one database operation.
        'WASTAGE_ALERT',
        -- Continues the SQL statement so its clauses and values form one database operation.
        'BILL_OVERDUE',
        -- Continues the SQL statement so its clauses and values form one database operation.
        'BILL_SUBMITTED',
        -- Continues the SQL statement so its clauses and values form one database operation.
        'BILL_APPROVED',
        -- Continues the SQL statement so its clauses and values form one database operation.
        'BILL_REJECTED',
        -- Continues the SQL statement so its clauses and values form one database operation.
        'BUDGET_ALERT'
    -- Closes the current table or grouped SQL statement.
    );
-- Begins recovery logic for an error raised by the preceding database operation.
EXCEPTION
    -- Handles the named database condition so setup can continue safely.
    WHEN duplicate_object THEN null;
-- Closes the current database block.
END $$;

-- ========================================================================
-- 2. CORE TABLES
-- ========================================================================

-- Users (Admins and Project Managers)
-- Starts a table definition for storing related records.
CREATE TABLE IF NOT EXISTS users (
    -- Defines the id field in users and sets its database type or constraint.
    id SERIAL PRIMARY KEY,
    -- Defines the name field in users and sets its database type or constraint.
    name VARCHAR(255) NOT NULL,
    -- Defines the email field in users and sets its database type or constraint.
    email VARCHAR(255) NOT NULL UNIQUE,
    -- Defines the password_hash field in users and sets its database type or constraint.
    password_hash VARCHAR(255) NOT NULL,
    -- Continues the SQL statement so its clauses and values form one database operation.
    role "Role" NOT NULL DEFAULT 'PM',
    -- Defines the phone field in users and sets its database type or constraint.
    phone VARCHAR(50),
    -- Defines the is_active field in users and sets its database type or constraint.
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    -- Defines the last_login_at field in users and sets its database type or constraint.
    last_login_at TIMESTAMPTZ,
    -- Defines the created_at field in users and sets its database type or constraint.
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Defines the updated_at field in users and sets its database type or constraint.
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
-- Closes the current table or grouped SQL statement.
);

-- Lands (Land Parcels)
-- Starts a table definition for storing related records.
CREATE TABLE IF NOT EXISTS lands (
    -- Defines the id field in lands and sets its database type or constraint.
    id SERIAL PRIMARY KEY,
    -- Defines the name field in lands and sets its database type or constraint.
    name VARCHAR(255) NOT NULL,
    -- Defines the address_line field in lands and sets its database type or constraint.
    address_line TEXT,
    -- Defines the city field in lands and sets its database type or constraint.
    city VARCHAR(100) NOT NULL,
    -- Defines the state field in lands and sets its database type or constraint.
    state VARCHAR(100) NOT NULL,
    -- Defines the pincode field in lands and sets its database type or constraint.
    pincode VARCHAR(20),
    -- Defines the area_value field in lands and sets its database type or constraint.
    area_value NUMERIC(14, 2) NOT NULL,
    -- Continues the SQL statement so its clauses and values form one database operation.
    area_unit "AreaUnit" NOT NULL,
    -- Defines the survey_number field in lands and sets its database type or constraint.
    survey_number VARCHAR(100),
    -- Defines the owner_name field in lands and sets its database type or constraint.
    owner_name VARCHAR(255),
    -- Defines the purchase_date field in lands and sets its database type or constraint.
    purchase_date DATE,
    -- Defines the purchase_cost field in lands and sets its database type or constraint.
    purchase_cost NUMERIC(16, 2),
    -- Defines the notes field in lands and sets its database type or constraint.
    notes TEXT,
    -- Defines the created_by_id field in lands and sets its database type or constraint.
    created_by_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    -- Defines the created_at field in lands and sets its database type or constraint.
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Defines the updated_at field in lands and sets its database type or constraint.
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
-- Closes the current table or grouped SQL statement.
);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_lands_city_state ON lands(city, state);

-- Projects (Construction Sites)
-- Starts a table definition for storing related records.
CREATE TABLE IF NOT EXISTS projects (
    -- Defines the id field in projects and sets its database type or constraint.
    id SERIAL PRIMARY KEY,
    -- Defines the land_id field in projects and sets its database type or constraint.
    land_id INT NOT NULL REFERENCES lands(id) ON DELETE RESTRICT,
    -- Defines the code field in projects and sets its database type or constraint.
    code VARCHAR(50) NOT NULL UNIQUE,
    -- Defines the name field in projects and sets its database type or constraint.
    name VARCHAR(255) NOT NULL,
    -- Defines the description field in projects and sets its database type or constraint.
    description TEXT,
    -- Continues the SQL statement so its clauses and values form one database operation.
    status "ProjectStatus" NOT NULL DEFAULT 'PLANNING',
    -- Defines the start_date field in projects and sets its database type or constraint.
    start_date DATE,
    -- Defines the expected_end_date field in projects and sets its database type or constraint.
    expected_end_date DATE,
    -- Defines the actual_end_date field in projects and sets its database type or constraint.
    actual_end_date DATE,
    -- Defines the total_budget field in projects and sets its database type or constraint.
    total_budget NUMERIC(16, 2) NOT NULL DEFAULT 0,
    -- Defines the wastage_threshold_pct field in projects and sets its database type or constraint.
    wastage_threshold_pct NUMERIC(5, 2) NOT NULL DEFAULT 10.00,
    -- Defines the assigned_pm_id field in projects and sets its database type or constraint.
    assigned_pm_id INT REFERENCES users(id) ON DELETE SET NULL,
    -- Defines the created_by_id field in projects and sets its database type or constraint.
    created_by_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    -- Defines the created_at field in projects and sets its database type or constraint.
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Defines the updated_at field in projects and sets its database type or constraint.
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT chk_projects_budget CHECK (total_budget >= 0),
    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT chk_projects_threshold CHECK (wastage_threshold_pct BETWEEN 0 AND 100)
-- Closes the current table or grouped SQL statement.
);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_projects_land_id ON projects(land_id);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_projects_assigned_pm_id ON projects(assigned_pm_id);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

-- Materials (Master Catalog)
-- Starts a table definition for storing related records.
CREATE TABLE IF NOT EXISTS materials (
    -- Defines the id field in materials and sets its database type or constraint.
    id SERIAL PRIMARY KEY,
    -- Defines the name field in materials and sets its database type or constraint.
    name VARCHAR(255) NOT NULL,
    -- Continues the SQL statement so its clauses and values form one database operation.
    category "MaterialCategory" NOT NULL,
    -- Defines the unit field in materials and sets its database type or constraint.
    unit VARCHAR(50) NOT NULL,
    -- Defines the is_active field in materials and sets its database type or constraint.
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    -- Defines the created_at field in materials and sets its database type or constraint.
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Defines the updated_at field in materials and sets its database type or constraint.
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
-- Closes the current table or grouped SQL statement.
);
-- Creates an index so matching rows can be found more efficiently.
CREATE UNIQUE INDEX IF NOT EXISTS uq_materials_name_ci ON materials (lower(name));

-- Vendors (Suppliers & Contractors)
-- Starts a table definition for storing related records.
CREATE TABLE IF NOT EXISTS vendors (
    -- Defines the id field in vendors and sets its database type or constraint.
    id SERIAL PRIMARY KEY,
    -- Defines the name field in vendors and sets its database type or constraint.
    name VARCHAR(255) NOT NULL,
    -- Defines the contact_person field in vendors and sets its database type or constraint.
    contact_person VARCHAR(255),
    -- Defines the phone field in vendors and sets its database type or constraint.
    phone VARCHAR(50),
    -- Defines the email field in vendors and sets its database type or constraint.
    email VARCHAR(255),
    -- Defines the gstin field in vendors and sets its database type or constraint.
    gstin VARCHAR(20) UNIQUE,
    -- Defines the address field in vendors and sets its database type or constraint.
    address TEXT,
    -- Defines the is_active field in vendors and sets its database type or constraint.
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    -- Defines the created_at field in vendors and sets its database type or constraint.
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Defines the updated_at field in vendors and sets its database type or constraint.
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
-- Closes the current table or grouped SQL statement.
);
-- Creates an index so matching rows can be found more efficiently.
CREATE UNIQUE INDEX IF NOT EXISTS uq_vendors_name_ci ON vendors (lower(name));

-- Project Material Plans (Budgeted BOM per Project)
-- Starts a table definition for storing related records.
CREATE TABLE IF NOT EXISTS project_material_plans (
    -- Defines the id field in project_material_plans and sets its database type or constraint.
    id SERIAL PRIMARY KEY,
    -- Defines the project_id field in project_material_plans and sets its database type or constraint.
    project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    -- Defines the material_id field in project_material_plans and sets its database type or constraint.
    material_id INT NOT NULL REFERENCES materials(id) ON DELETE RESTRICT,
    -- Defines the planned_quantity field in project_material_plans and sets its database type or constraint.
    planned_quantity NUMERIC(14, 3) NOT NULL,
    -- Defines the planned_unit_rate field in project_material_plans and sets its database type or constraint.
    planned_unit_rate NUMERIC(12, 2),
    -- Defines the low_stock_threshold field in project_material_plans and sets its database type or constraint.
    low_stock_threshold NUMERIC(14, 3),
    -- Defines the wastage_threshold_pct field in project_material_plans and sets its database type or constraint.
    wastage_threshold_pct NUMERIC(5, 2),
    -- Defines the created_at field in project_material_plans and sets its database type or constraint.
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Defines the updated_at field in project_material_plans and sets its database type or constraint.
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT uq_project_material UNIQUE (project_id, material_id),
    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT chk_plan_qty CHECK (planned_quantity > 0)
-- Closes the current table or grouped SQL statement.
);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_pmp_project_id ON project_material_plans(project_id);

-- Daily Logs (One record per project per day)
-- Starts a table definition for storing related records.
CREATE TABLE IF NOT EXISTS daily_logs (
    -- Defines the id field in daily_logs and sets its database type or constraint.
    id SERIAL PRIMARY KEY,
    -- Defines the project_id field in daily_logs and sets its database type or constraint.
    project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    -- Defines the log_date field in daily_logs and sets its database type or constraint.
    log_date DATE NOT NULL,
    -- Defines the progress_percent field in daily_logs and sets its database type or constraint.
    progress_percent NUMERIC(5, 2) NOT NULL DEFAULT 0,
    -- Defines the work_summary field in daily_logs and sets its database type or constraint.
    work_summary TEXT NOT NULL,
    -- Defines the weather field in daily_logs and sets its database type or constraint.
    weather VARCHAR(100),
    -- Defines the issues field in daily_logs and sets its database type or constraint.
    issues TEXT,
    -- Defines the created_by_id field in daily_logs and sets its database type or constraint.
    created_by_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    -- Defines the created_at field in daily_logs and sets its database type or constraint.
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Defines the updated_at field in daily_logs and sets its database type or constraint.
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT uq_project_log_date UNIQUE (project_id, log_date),
    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT chk_log_progress CHECK (progress_percent BETWEEN 0 AND 100)
-- Closes the current table or grouped SQL statement.
);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_daily_logs_project_date ON daily_logs(project_id, log_date DESC);

-- Labour Entries (Breakdown of workers per trade on a daily log)
-- Starts a table definition for storing related records.
CREATE TABLE IF NOT EXISTS labour_entries (
    -- Defines the id field in labour_entries and sets its database type or constraint.
    id SERIAL PRIMARY KEY,
    -- Defines the daily_log_id field in labour_entries and sets its database type or constraint.
    daily_log_id INT NOT NULL REFERENCES daily_logs(id) ON DELETE CASCADE,
    -- Defines the trade field in labour_entries and sets its database type or constraint.
    trade VARCHAR(100) NOT NULL,
    -- Defines the contractor_name field in labour_entries and sets its database type or constraint.
    contractor_name VARCHAR(255),
    -- Defines the head_count field in labour_entries and sets its database type or constraint.
    head_count INT NOT NULL,
    -- Defines the hours_worked field in labour_entries and sets its database type or constraint.
    hours_worked NUMERIC(4, 1) NOT NULL DEFAULT 8.0,
    -- Defines the remarks field in labour_entries and sets its database type or constraint.
    remarks TEXT,
    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT chk_labour_headcount CHECK (head_count > 0),
    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT chk_labour_hours CHECK (hours_worked >= 0 AND hours_worked <= 24)
-- Closes the current table or grouped SQL statement.
);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_labour_entries_daily_log_id ON labour_entries(daily_log_id);

-- Machinery Entries (Equipment deployed on site)
-- Starts a table definition for storing related records.
CREATE TABLE IF NOT EXISTS machinery_entries (
    -- Defines the id field in machinery_entries and sets its database type or constraint.
    id SERIAL PRIMARY KEY,
    -- Defines the daily_log_id field in machinery_entries and sets its database type or constraint.
    daily_log_id INT NOT NULL REFERENCES daily_logs(id) ON DELETE CASCADE,
    -- Defines the machine_name field in machinery_entries and sets its database type or constraint.
    machine_name VARCHAR(100) NOT NULL,
    -- Defines the operator_name field in machinery_entries and sets its database type or constraint.
    operator_name VARCHAR(255),
    -- Defines the hours_used field in machinery_entries and sets its database type or constraint.
    hours_used NUMERIC(5, 2) NOT NULL,
    -- Defines the fuel_litres field in machinery_entries and sets its database type or constraint.
    fuel_litres NUMERIC(8, 2),
    -- Defines the remarks field in machinery_entries and sets its database type or constraint.
    remarks TEXT,
    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT chk_machinery_hours CHECK (hours_used >= 0 AND hours_used <= 24)
-- Closes the current table or grouped SQL statement.
);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_machinery_entries_daily_log_id ON machinery_entries(daily_log_id);

-- Bills (Invoices from Vendors & Contractors)
-- Starts a table definition for storing related records.
CREATE TABLE IF NOT EXISTS bills (
    -- Defines the id field in bills and sets its database type or constraint.
    id SERIAL PRIMARY KEY,
    -- Defines the project_id field in bills and sets its database type or constraint.
    project_id INT NOT NULL REFERENCES projects(id) ON DELETE RESTRICT,
    -- Defines the vendor_id field in bills and sets its database type or constraint.
    vendor_id INT NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
    -- Defines the bill_number field in bills and sets its database type or constraint.
    bill_number VARCHAR(100) NOT NULL,
    -- Defines the bill_date field in bills and sets its database type or constraint.
    bill_date DATE NOT NULL,
    -- Defines the due_date field in bills and sets its database type or constraint.
    due_date DATE,
    -- Continues the SQL statement so its clauses and values form one database operation.
    category "BillCategory" NOT NULL,
    -- Defines the description field in bills and sets its database type or constraint.
    description TEXT,
    -- Defines the base_amount field in bills and sets its database type or constraint.
    base_amount NUMERIC(14, 2) NOT NULL,
    -- Defines the gst_percent field in bills and sets its database type or constraint.
    gst_percent NUMERIC(5, 2) NOT NULL DEFAULT 0,
    -- Defines the gst_amount field in bills and sets its database type or constraint.
    gst_amount NUMERIC(14, 2) NOT NULL,
    -- Defines the total_amount field in bills and sets its database type or constraint.
    total_amount NUMERIC(14, 2) NOT NULL,
    -- Continues the SQL statement so its clauses and values form one database operation.
    status "BillStatus" NOT NULL DEFAULT 'PENDING',
    -- Defines the submitted_by_id field in bills and sets its database type or constraint.
    submitted_by_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    -- Defines the approved_by_id field in bills and sets its database type or constraint.
    approved_by_id INT REFERENCES users(id) ON DELETE SET NULL,
    -- Defines the approved_at field in bills and sets its database type or constraint.
    approved_at TIMESTAMPTZ,
    -- Defines the rejection_reason field in bills and sets its database type or constraint.
    rejection_reason TEXT,
    -- Defines the created_at field in bills and sets its database type or constraint.
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Defines the updated_at field in bills and sets its database type or constraint.
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT uq_vendor_bill_number UNIQUE (vendor_id, bill_number),
    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT chk_bill_amounts CHECK (
        -- Continues the SQL statement so its clauses and values form one database operation.
        base_amount >= 0 AND gst_percent BETWEEN 0 AND 100
        -- Adds another condition to narrow or expand the matching rows.
        AND gst_amount >= 0 AND total_amount = base_amount + gst_amount
    -- Continues the SQL statement so its clauses and values form one database operation.
    ),
    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT chk_bill_due CHECK (due_date IS NULL OR due_date >= bill_date),
    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT chk_bill_approval CHECK (
        -- Defines the status field in bills and sets its database type or constraint.
        status NOT IN ('APPROVED','PARTIALLY_PAID','PAID') OR (approved_by_id IS NOT NULL AND approved_at IS NOT NULL)
    -- Closes the current table or grouped SQL statement.
    )
-- Closes the current table or grouped SQL statement.
);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_bills_project_status ON bills(project_id, status);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_bills_status_due ON bills(status, due_date);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_bills_open_due ON bills (due_date) WHERE status IN ('APPROVED', 'PARTIALLY_PAID');

-- Stock Transactions (IN/OUT Inventory Movement Ledger)
-- Starts a table definition for storing related records.
CREATE TABLE IF NOT EXISTS stock_transactions (
    -- Defines the id field in stock_transactions and sets its database type or constraint.
    id SERIAL PRIMARY KEY,
    -- Defines the project_id field in stock_transactions and sets its database type or constraint.
    project_id INT NOT NULL REFERENCES projects(id) ON DELETE RESTRICT,
    -- Defines the material_id field in stock_transactions and sets its database type or constraint.
    material_id INT NOT NULL REFERENCES materials(id) ON DELETE RESTRICT,
    -- Continues the SQL statement so its clauses and values form one database operation.
    txn_type "StockTxnType" NOT NULL,
    -- Defines the quantity field in stock_transactions and sets its database type or constraint.
    quantity NUMERIC(14, 3) NOT NULL,
    -- Defines the unit_rate field in stock_transactions and sets its database type or constraint.
    unit_rate NUMERIC(12, 2), -- Informational, IN only
    -- Defines the vendor_id field in stock_transactions and sets its database type or constraint.
    vendor_id INT REFERENCES vendors(id) ON DELETE SET NULL, -- IN only
    -- Defines the bill_id field in stock_transactions and sets its database type or constraint.
    bill_id INT REFERENCES bills(id) ON DELETE SET NULL,     -- IN only
    -- Defines the challan_number field in stock_transactions and sets its database type or constraint.
    challan_number VARCHAR(100),
    -- Continues the SQL statement so its clauses and values form one database operation.
    out_reason "OutReason",                                  -- OUT only
    -- Defines the txn_date field in stock_transactions and sets its database type or constraint.
    txn_date DATE NOT NULL,
    -- Defines the daily_log_id field in stock_transactions and sets its database type or constraint.
    daily_log_id INT REFERENCES daily_logs(id) ON DELETE SET NULL,
    -- Defines the remarks field in stock_transactions and sets its database type or constraint.
    remarks TEXT,
    -- Defines the created_by_id field in stock_transactions and sets its database type or constraint.
    created_by_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    -- Defines the is_voided field in stock_transactions and sets its database type or constraint.
    is_voided BOOLEAN NOT NULL DEFAULT FALSE,
    -- Defines the voided_by_id field in stock_transactions and sets its database type or constraint.
    voided_by_id INT REFERENCES users(id) ON DELETE SET NULL,
    -- Defines the voided_at field in stock_transactions and sets its database type or constraint.
    voided_at TIMESTAMPTZ,
    -- Defines the void_reason field in stock_transactions and sets its database type or constraint.
    void_reason TEXT,
    -- Defines the created_at field in stock_transactions and sets its database type or constraint.
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT chk_stock_qty_positive CHECK (quantity > 0),
    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT chk_stock_reason CHECK (
        -- Continues the SQL statement so its clauses and values form one database operation.
        (txn_type = 'IN'  AND out_reason IS NULL) OR
        -- Continues the SQL statement so its clauses and values form one database operation.
        (txn_type = 'OUT' AND out_reason IS NOT NULL)
    -- Continues the SQL statement so its clauses and values form one database operation.
    ),
    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT chk_stock_in_only_links CHECK (
        -- Continues the SQL statement so its clauses and values form one database operation.
        txn_type = 'IN' OR (vendor_id IS NULL AND bill_id IS NULL AND unit_rate IS NULL)
    -- Continues the SQL statement so its clauses and values form one database operation.
    ),
    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT chk_stock_void_fields CHECK (
        -- Continues the SQL statement so its clauses and values form one database operation.
        is_voided = TRUE OR (voided_by_id IS NULL AND voided_at IS NULL AND void_reason IS NULL)
    -- Closes the current table or grouped SQL statement.
    )
-- Closes the current table or grouped SQL statement.
);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_stock_txns_lookup ON stock_transactions(project_id, material_id, txn_date);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_stock_txns_vendor_id ON stock_transactions(vendor_id);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_stock_txns_bill_id ON stock_transactions(bill_id);

-- Payments (Cash / Cheque / Bank Payouts recorded against bills)
-- Starts a table definition for storing related records.
CREATE TABLE IF NOT EXISTS payments (
    -- Defines the id field in payments and sets its database type or constraint.
    id SERIAL PRIMARY KEY,
    -- Defines the bill_id field in payments and sets its database type or constraint.
    bill_id INT NOT NULL REFERENCES bills(id) ON DELETE RESTRICT,
    -- Defines the amount field in payments and sets its database type or constraint.
    amount NUMERIC(14, 2) NOT NULL,
    -- Defines the payment_date field in payments and sets its database type or constraint.
    payment_date DATE NOT NULL,
    -- Continues the SQL statement so its clauses and values form one database operation.
    mode "PaymentMode" NOT NULL,
    -- Defines the reference_number field in payments and sets its database type or constraint.
    reference_number VARCHAR(100),
    -- Defines the remarks field in payments and sets its database type or constraint.
    remarks TEXT,
    -- Defines the recorded_by_id field in payments and sets its database type or constraint.
    recorded_by_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    -- Defines the created_at field in payments and sets its database type or constraint.
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT chk_payment_amount CHECK (amount > 0)
-- Closes the current table or grouped SQL statement.
);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_payments_bill_id ON payments(bill_id);

-- Audit Logs (Tamper-evident system activity log)
-- Starts a table definition for storing related records.
CREATE TABLE IF NOT EXISTS audit_logs (
    -- Defines the id field in audit_logs and sets its database type or constraint.
    id SERIAL PRIMARY KEY,
    -- Defines the user_id field in audit_logs and sets its database type or constraint.
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    -- Continues the SQL statement so its clauses and values form one database operation.
    action "AuditAction" NOT NULL,
    -- Defines the entity_type field in audit_logs and sets its database type or constraint.
    entity_type VARCHAR(100) NOT NULL,
    -- Defines the entity_id field in audit_logs and sets its database type or constraint.
    entity_id INT,
    -- Defines the old_values field in audit_logs and sets its database type or constraint.
    old_values JSONB,
    -- Defines the new_values field in audit_logs and sets its database type or constraint.
    new_values JSONB,
    -- Defines the ip_address field in audit_logs and sets its database type or constraint.
    ip_address VARCHAR(50),
    -- Defines the created_at field in audit_logs and sets its database type or constraint.
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
-- Closes the current table or grouped SQL statement.
);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_date ON audit_logs(user_id, created_at);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- Notifications (In-app notifications for alerts)
-- Starts a table definition for storing related records.
CREATE TABLE IF NOT EXISTS notifications (
    -- Defines the id field in notifications and sets its database type or constraint.
    id SERIAL PRIMARY KEY,
    -- Defines the user_id field in notifications and sets its database type or constraint.
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    -- Continues the SQL statement so its clauses and values form one database operation.
    type "NotificationType" NOT NULL,
    -- Defines the title field in notifications and sets its database type or constraint.
    title VARCHAR(255) NOT NULL,
    -- Defines the message field in notifications and sets its database type or constraint.
    message TEXT NOT NULL,
    -- Defines the project_id field in notifications and sets its database type or constraint.
    project_id INT REFERENCES projects(id) ON DELETE SET NULL,
    -- Defines the link field in notifications and sets its database type or constraint.
    link VARCHAR(255),
    -- Defines the is_read field in notifications and sets its database type or constraint.
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    -- Defines the dedupe_key field in notifications and sets its database type or constraint.
    dedupe_key VARCHAR(255) UNIQUE,
    -- Defines the created_at field in notifications and sets its database type or constraint.
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
-- Closes the current table or grouped SQL statement.
);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON notifications(user_id, is_read, created_at);

-- Attachments (Uploaded challans, site photos, test certs)
-- Starts a table definition for storing related records.
CREATE TABLE IF NOT EXISTS attachments (
    -- Defines the id field in attachments and sets its database type or constraint.
    id SERIAL PRIMARY KEY,
    -- Defines the daily_log_id field in attachments and sets its database type or constraint.
    daily_log_id INT REFERENCES daily_logs(id) ON DELETE CASCADE,
    -- Defines the bill_id field in attachments and sets its database type or constraint.
    bill_id INT REFERENCES bills(id) ON DELETE CASCADE,
    -- Defines the file_name field in attachments and sets its database type or constraint.
    file_name VARCHAR(255) NOT NULL,
    -- Defines the stored_path field in attachments and sets its database type or constraint.
    stored_path VARCHAR(500) NOT NULL,
    -- Defines the mime_type field in attachments and sets its database type or constraint.
    mime_type VARCHAR(100) NOT NULL,
    -- Defines the size_bytes field in attachments and sets its database type or constraint.
    size_bytes INT NOT NULL,
    -- Defines the uploaded_by_id field in attachments and sets its database type or constraint.
    uploaded_by_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    -- Defines the created_at field in attachments and sets its database type or constraint.
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- Names a database rule that protects the table from invalid data.
    CONSTRAINT chk_attachment_target CHECK (
        -- Continues the SQL statement so its clauses and values form one database operation.
        (daily_log_id IS NOT NULL)::int + (bill_id IS NOT NULL)::int = 1
    -- Closes the current table or grouped SQL statement.
    )
-- Closes the current table or grouped SQL statement.
);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_attachments_daily_log ON attachments(daily_log_id);
-- Creates an index so matching rows can be found more efficiently.
CREATE INDEX IF NOT EXISTS idx_attachments_bill ON attachments(bill_id);

-- ========================================================================
-- 3. ANALYTICS & INVENTORY VIEWS
-- ========================================================================

-- Current Stock Balance View (per Project, per Material)
-- Continues the SQL statement so its clauses and values form one database operation.
CREATE OR REPLACE VIEW v_stock_balance AS
-- Chooses the values the query will return.
SELECT
    -- Continues the SQL statement so its clauses and values form one database operation.
    t.project_id,
    -- Continues the SQL statement so its clauses and values form one database operation.
    t.material_id,
    -- Continues the SQL statement so its clauses and values form one database operation.
    COALESCE(SUM(t.quantity) FILTER (WHERE t.txn_type = 'IN'),  0) AS total_in,
    -- Continues the SQL statement so its clauses and values form one database operation.
    COALESCE(SUM(t.quantity) FILTER (WHERE t.txn_type = 'OUT'), 0) AS total_out,
    -- Continues the SQL statement so its clauses and values form one database operation.
    COALESCE(SUM(CASE WHEN t.txn_type = 'IN' THEN t.quantity ELSE -t.quantity END), 0) AS balance
-- Identifies the table or query that supplies rows for this statement.
FROM stock_transactions t
-- Filters the rows so only records matching this condition are used.
WHERE t.is_voided = FALSE
-- Groups rows with the same values for aggregate calculations.
GROUP BY t.project_id, t.material_id;

-- Material Wastage & Overrun Analysis View
-- Continues the SQL statement so its clauses and values form one database operation.
CREATE OR REPLACE VIEW v_wastage_status AS
-- Continues the SQL statement so its clauses and values form one database operation.
WITH latest_progress AS (
    -- Chooses the values the query will return.
    SELECT DISTINCT ON (project_id) project_id, progress_percent
    -- Identifies the table or query that supplies rows for this statement.
    FROM daily_logs
    -- Sorts the returned rows by the selected columns.
    ORDER BY project_id, log_date DESC
-- Continues the SQL statement so its clauses and values form one database operation.
),
-- Continues the SQL statement so its clauses and values form one database operation.
usage AS (
    -- Chooses the values the query will return.
    SELECT
        -- Continues the SQL statement so its clauses and values form one database operation.
        project_id,
        -- Continues the SQL statement so its clauses and values form one database operation.
        material_id,
        -- Continues the SQL statement so its clauses and values form one database operation.
        COALESCE(SUM(quantity) FILTER (WHERE txn_type = 'OUT'), 0) AS consumed_qty,
        -- Continues the SQL statement so its clauses and values form one database operation.
        COALESCE(SUM(quantity) FILTER (WHERE txn_type = 'OUT' AND out_reason IN ('DAMAGED','LOST')), 0) AS recorded_wastage_qty
    -- Identifies the table or query that supplies rows for this statement.
    FROM stock_transactions
    -- Filters the rows so only records matching this condition are used.
    WHERE is_voided = FALSE
    -- Groups rows with the same values for aggregate calculations.
    GROUP BY project_id, material_id
-- Closes the current table or grouped SQL statement.
)
-- Chooses the values the query will return.
SELECT
    -- Continues the SQL statement so its clauses and values form one database operation.
    pl.project_id,
    -- Continues the SQL statement so its clauses and values form one database operation.
    pl.material_id,
    -- Continues the SQL statement so its clauses and values form one database operation.
    pl.planned_quantity,
    -- Continues the SQL statement so its clauses and values form one database operation.
    pl.planned_unit_rate,
    -- Continues the SQL statement so its clauses and values form one database operation.
    COALESCE(lp.progress_percent, 0) AS progress_percent,
    -- Continues the SQL statement so its clauses and values form one database operation.
    ROUND(pl.planned_quantity * COALESCE(lp.progress_percent, 0) / 100, 3) AS expected_qty,
    -- Continues the SQL statement so its clauses and values form one database operation.
    COALESCE(u.consumed_qty, 0) AS consumed_qty,
    -- Continues the SQL statement so its clauses and values form one database operation.
    COALESCE(u.recorded_wastage_qty, 0) AS recorded_wastage_qty,
    -- Continues the SQL statement so its clauses and values form one database operation.
    GREATEST(COALESCE(u.consumed_qty, 0) - ROUND(pl.planned_quantity * COALESCE(lp.progress_percent, 0) / 100, 3), 0) AS overrun_qty,
    -- Continues the SQL statement so its clauses and values form one database operation.
    COALESCE(pl.wastage_threshold_pct, p.wastage_threshold_pct) AS threshold_pct
-- Identifies the table or query that supplies rows for this statement.
FROM project_material_plans pl
-- Combines related rows from another table.
JOIN projects p ON p.id = pl.project_id
-- Continues the SQL statement so its clauses and values form one database operation.
LEFT JOIN latest_progress lp ON lp.project_id = pl.project_id
-- Continues the SQL statement so its clauses and values form one database operation.
LEFT JOIN usage u ON u.project_id = pl.project_id AND u.material_id = pl.material_id;

-- Project Financials Summary View
-- Continues the SQL statement so its clauses and values form one database operation.
CREATE OR REPLACE VIEW v_project_financials AS
-- Continues the SQL statement so its clauses and values form one database operation.
WITH bill_totals AS (
    -- Chooses the values the query will return.
    SELECT
        -- Continues the SQL statement so its clauses and values form one database operation.
        project_id,
        -- Continues the SQL statement so its clauses and values form one database operation.
        COALESCE(SUM(total_amount) FILTER (WHERE status IN ('APPROVED','PARTIALLY_PAID','PAID')), 0) AS committed_amount,
        -- Continues the SQL statement so its clauses and values form one database operation.
        COALESCE(SUM(total_amount) FILTER (WHERE status = 'PENDING'), 0) AS pending_exposure,
        -- Continues the SQL statement so its clauses and values form one database operation.
        COUNT(*) AS total_bills_count
    -- Identifies the table or query that supplies rows for this statement.
    FROM bills
    -- Groups rows with the same values for aggregate calculations.
    GROUP BY project_id
-- Continues the SQL statement so its clauses and values form one database operation.
),
-- Continues the SQL statement so its clauses and values form one database operation.
payment_totals AS (
    -- Chooses the values the query will return.
    SELECT
        -- Continues the SQL statement so its clauses and values form one database operation.
        b.project_id,
        -- Continues the SQL statement so its clauses and values form one database operation.
        COALESCE(SUM(p.amount), 0) AS total_paid
    -- Identifies the table or query that supplies rows for this statement.
    FROM payments p
    -- Combines related rows from another table.
    JOIN bills b ON b.id = p.bill_id
    -- Groups rows with the same values for aggregate calculations.
    GROUP BY b.project_id
-- Closes the current table or grouped SQL statement.
)
-- Chooses the values the query will return.
SELECT
    -- Continues the SQL statement so its clauses and values form one database operation.
    p.id AS project_id,
    -- Continues the SQL statement so its clauses and values form one database operation.
    p.code AS project_code,
    -- Continues the SQL statement so its clauses and values form one database operation.
    p.name AS project_name,
    -- Continues the SQL statement so its clauses and values form one database operation.
    p.total_budget,
    -- Continues the SQL statement so its clauses and values form one database operation.
    COALESCE(bt.committed_amount, 0) AS committed_amount,
    -- Continues the SQL statement so its clauses and values form one database operation.
    COALESCE(bt.pending_exposure, 0) AS pending_exposure,
    -- Continues the SQL statement so its clauses and values form one database operation.
    COALESCE(pt.total_paid, 0) AS total_paid,
    -- Continues the SQL statement so its clauses and values form one database operation.
    (p.total_budget - COALESCE(bt.committed_amount, 0)) AS remaining_budget,
    -- Continues the SQL statement so its clauses and values form one database operation.
    COALESCE(bt.total_bills_count, 0) AS total_bills_count
-- Identifies the table or query that supplies rows for this statement.
FROM projects p
-- Continues the SQL statement so its clauses and values form one database operation.
LEFT JOIN bill_totals bt ON bt.project_id = p.id
-- Continues the SQL statement so its clauses and values form one database operation.
LEFT JOIN payment_totals pt ON pt.project_id = p.id;
