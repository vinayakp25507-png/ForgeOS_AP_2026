-- ============================================================================
-- ForgeOS: Construction ERP & Financial Management Platform
-- Relational Database DDL Schema for PostgreSQL 14+ / 16
-- Conforms to BCNF Normalization & Foreign Key Referential Integrity
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables in reverse-dependency order for idempotent execution
DROP TABLE IF EXISTS "AuditLog" CASCADE;
DROP TABLE IF EXISTS "Payment" CASCADE;
DROP TABLE IF EXISTS "Invoice" CASCADE;
DROP TABLE IF EXISTS "Milestone" CASCADE;
DROP TABLE IF EXISTS "MachineryEntry" CASCADE;
DROP TABLE IF EXISTS "LabourEntry" CASCADE;
DROP TABLE IF EXISTS "InventoryTransaction" CASCADE;
DROP TABLE IF EXISTS "DailyLog" CASCADE;
DROP TABLE IF EXISTS "MaterialPlan" CASCADE;
DROP TABLE IF EXISTS "Material" CASCADE;
DROP TABLE IF EXISTS "Supplier" CASCADE;
DROP TABLE IF EXISTS "Project" CASCADE;
DROP TABLE IF EXISTS "Land" CASCADE;
DROP TABLE IF EXISTS "OtpCode" CASCADE;
DROP TABLE IF EXISTS "OAuthAccount" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;

-- ============================================================================
-- 1. USER & AUTHENTICATION SUBSYSTEM
-- ============================================================================

CREATE TABLE "User" (
    "id" VARCHAR(36) PRIMARY KEY DEFAULT ('usr_' || substr(md5(random()::text || clock_timestamp()::text), 1, 24)),
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "passwordHash" VARCHAR(255) NOT NULL, -- Format: scrypt:<salt>:<hash>
    "role" VARCHAR(20) NOT NULL CHECK ("role" IN ('ADMIN', 'PM', 'VIEWER')),
    "phone" VARCHAR(20),
    "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "OAuthAccount" (
    "id" VARCHAR(36) PRIMARY KEY DEFAULT ('oa_' || substr(md5(random()::text || clock_timestamp()::text), 1, 24)),
    "provider" VARCHAR(50) NOT NULL, -- e.g. 'google'
    "providerAccountId" VARCHAR(255) NOT NULL,
    "userId" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_oauth_user" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    CONSTRAINT "uq_oauth_provider_account" UNIQUE ("provider", "providerAccountId")
);

CREATE TABLE "OtpCode" (
    "id" VARCHAR(36) PRIMARY KEY DEFAULT ('otp_' || substr(md5(random()::text || clock_timestamp()::text), 1, 24)),
    "email" VARCHAR(255) NOT NULL,
    "codeHash" VARCHAR(255) NOT NULL, -- scrypt hash of 6-digit verification code
    "purpose" VARCHAR(50) NOT NULL DEFAULT 'LOGIN',
    "expiresAt" TIMESTAMPTZ NOT NULL,
    "consumedAt" TIMESTAMPTZ,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "idx_otp_email" ON "OtpCode"("email");

-- ============================================================================
-- 2. LAND REGISTRY & REAL ESTATE ACQUISITION
-- ============================================================================

CREATE TABLE "Land" (
    "id" VARCHAR(36) PRIMARY KEY DEFAULT ('lnd_' || substr(md5(random()::text || clock_timestamp()::text), 1, 24)),
    "name" VARCHAR(150) NOT NULL,
    "addressLine" VARCHAR(255),
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "pincode" VARCHAR(20),
    "areaValue" DOUBLE PRECISION NOT NULL CHECK ("areaValue" > 0),
    "areaUnit" VARCHAR(20) NOT NULL CHECK ("areaUnit" IN ('SQFT', 'SQYD', 'SQM', 'ACRE')),
    "surveyNumber" VARCHAR(100),
    "ownerName" VARCHAR(150),
    "purchaseDate" TIMESTAMPTZ,
    "purchaseCost" DOUBLE PRECISION CHECK ("purchaseCost" >= 0),
    "notes" TEXT,
    "createdById" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_land_created_by" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT
);

-- ============================================================================
-- 3. PROJECT MASTER DATA & STATUS STATE MACHINE
-- ============================================================================

CREATE TABLE "Project" (
    "id" VARCHAR(36) PRIMARY KEY DEFAULT ('prj_' || substr(md5(random()::text || clock_timestamp()::text), 1, 24)),
    "code" VARCHAR(50) NOT NULL UNIQUE, -- e.g. 'FOS-001'
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "location" VARCHAR(255),
    "landId" VARCHAR(36) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'PLANNING' CHECK ("status" IN ('PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED')),
    "startDate" TIMESTAMPTZ NOT NULL,
    "expectedEndDate" TIMESTAMPTZ,
    "actualEndDate" TIMESTAMPTZ,
    "totalBudget" DOUBLE PRECISION NOT NULL DEFAULT 0 CHECK ("totalBudget" >= 0),
    "wastageThresholdPct" DOUBLE PRECISION NOT NULL DEFAULT 10.0 CHECK ("wastageThresholdPct" >= 0),
    "assignedPmId" VARCHAR(36),
    "createdById" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_project_land" FOREIGN KEY ("landId") REFERENCES "Land"("id") ON DELETE RESTRICT,
    CONSTRAINT "fk_project_assigned_pm" FOREIGN KEY ("assignedPmId") REFERENCES "User"("id") ON DELETE SET NULL,
    CONSTRAINT "fk_project_created_by" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT
);

CREATE INDEX "idx_project_assigned_pm" ON "Project"("assignedPmId");
CREATE INDEX "idx_project_status" ON "Project"("status");

-- ============================================================================
-- 4. VENDOR & MATERIAL CATALOG
-- ============================================================================

CREATE TABLE "Supplier" (
    "id" VARCHAR(36) PRIMARY KEY DEFAULT ('sup_' || substr(md5(random()::text || clock_timestamp()::text), 1, 24)),
    "name" VARCHAR(150) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255),
    "address" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Material" (
    "id" VARCHAR(36) PRIMARY KEY DEFAULT ('mat_' || substr(md5(random()::text || clock_timestamp()::text), 1, 24)),
    "name" VARCHAR(150) NOT NULL UNIQUE,
    "unit" VARCHAR(50) NOT NULL, -- 'BAGS', 'TONNES', 'CFT', etc.
    "category" VARCHAR(50) NOT NULL CHECK ("category" IN (
        'CEMENT', 'STEEL', 'SAND_AGGREGATE', 'BRICKS_BLOCKS', 'TIMBER',
        'ELECTRICAL', 'PLUMBING', 'PAINT_FINISH', 'OTHER'
    )),
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "idx_material_category" ON "Material"("category");

-- ============================================================================
-- 5. MATERIAL PLANNING & BUDGETING
-- ============================================================================

CREATE TABLE "MaterialPlan" (
    "id" VARCHAR(36) PRIMARY KEY DEFAULT ('pln_' || substr(md5(random()::text || clock_timestamp()::text), 1, 24)),
    "projectId" VARCHAR(36) NOT NULL,
    "materialId" VARCHAR(36) NOT NULL,
    "openingQuantity" DOUBLE PRECISION NOT NULL DEFAULT 0 CHECK ("openingQuantity" >= 0),
    "plannedQuantity" DOUBLE PRECISION NOT NULL CHECK ("plannedQuantity" > 0),
    "plannedUnitRate" DOUBLE PRECISION CHECK ("plannedUnitRate" >= 0),
    "lowStockThreshold" DOUBLE PRECISION CHECK ("lowStockThreshold" >= 0),
    "wastageThresholdPct" DOUBLE PRECISION CHECK ("wastageThresholdPct" >= 0),
    "status" VARCHAR(20) NOT NULL DEFAULT 'DRAFT' CHECK ("status" IN ('DRAFT', 'APPROVED', 'ARCHIVED')),
    "notes" TEXT,
    "createdById" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_plan_project" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE,
    CONSTRAINT "fk_plan_material" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT,
    CONSTRAINT "fk_plan_created_by" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT,
    CONSTRAINT "uq_project_material_plan" UNIQUE ("projectId", "materialId")
);

-- ============================================================================
-- 6. DAILY SITE LOGS & OPERATIONS REPORTING
-- ============================================================================

CREATE TABLE "DailyLog" (
    "id" VARCHAR(36) PRIMARY KEY DEFAULT ('log_' || substr(md5(random()::text || clock_timestamp()::text), 1, 24)),
    "projectId" VARCHAR(36) NOT NULL,
    "logDate" TIMESTAMPTZ NOT NULL,
    "progressPercent" DOUBLE PRECISION NOT NULL CHECK ("progressPercent" >= 0 AND "progressPercent" <= 100),
    "workSummary" TEXT NOT NULL,
    "weather" VARCHAR(100),
    "issues" TEXT,
    "createdById" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_log_project" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE,
    CONSTRAINT "fk_log_created_by" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT,
    CONSTRAINT "uq_project_daily_log_date" UNIQUE ("projectId", "logDate")
);

CREATE INDEX "idx_daily_log_project" ON "DailyLog"("projectId");

CREATE TABLE "LabourEntry" (
    "id" VARCHAR(36) PRIMARY KEY DEFAULT ('lab_' || substr(md5(random()::text || clock_timestamp()::text), 1, 24)),
    "dailyLogId" VARCHAR(36) NOT NULL,
    "trade" VARCHAR(100) NOT NULL, -- e.g. 'Mason', 'Helper', 'Carpenter'
    "contractorName" VARCHAR(150),
    "headCount" INTEGER NOT NULL CHECK ("headCount" > 0),
    "hoursWorked" DOUBLE PRECISION NOT NULL DEFAULT 8.0 CHECK ("hoursWorked" > 0),
    "remarks" TEXT,
    CONSTRAINT "fk_labour_daily_log" FOREIGN KEY ("dailyLogId") REFERENCES "DailyLog"("id") ON DELETE CASCADE
);

CREATE INDEX "idx_labour_daily_log" ON "LabourEntry"("dailyLogId");

CREATE TABLE "MachineryEntry" (
    "id" VARCHAR(36) PRIMARY KEY DEFAULT ('mac_' || substr(md5(random()::text || clock_timestamp()::text), 1, 24)),
    "dailyLogId" VARCHAR(36) NOT NULL,
    "machineName" VARCHAR(100) NOT NULL, -- e.g. 'JCB Excavator', 'Transit Concrete Mixer'
    "operatorName" VARCHAR(150),
    "hoursUsed" DOUBLE PRECISION NOT NULL CHECK ("hoursUsed" >= 0),
    "fuelLitres" DOUBLE PRECISION CHECK ("fuelLitres" >= 0),
    "remarks" TEXT,
    CONSTRAINT "fk_machinery_daily_log" FOREIGN KEY ("dailyLogId") REFERENCES "DailyLog"("id") ON DELETE CASCADE
);

CREATE INDEX "idx_machinery_daily_log" ON "MachineryEntry"("dailyLogId");

-- ============================================================================
-- 7. APPEND-ONLY INVENTORY LEDGER
-- ============================================================================

CREATE TABLE "InventoryTransaction" (
    "id" VARCHAR(36) PRIMARY KEY DEFAULT ('txn_' || substr(md5(random()::text || clock_timestamp()::text), 1, 24)),
    "projectId" VARCHAR(36) NOT NULL,
    "materialId" VARCHAR(36) NOT NULL,
    "vendorId" VARCHAR(36),
    "txnType" VARCHAR(20) NOT NULL CHECK ("txnType" IN ('IN', 'OUT', 'ADJUSTMENT')),
    "quantity" DOUBLE PRECISION NOT NULL, -- Positive for IN/OUT; signed (+/-) for ADJUSTMENT
    "unitRate" DOUBLE PRECISION CHECK ("unitRate" >= 0),
    "challanNumber" VARCHAR(100),
    "outReason" VARCHAR(20) CHECK ("outReason" IN ('USED', 'DAMAGED', 'LOST')),
    "txnDate" TIMESTAMPTZ NOT NULL,
    "dailyLogId" VARCHAR(36),
    "remarks" TEXT,
    "recordedById" VARCHAR(36) NOT NULL,
    "voidedAt" TIMESTAMPTZ,
    "voidReason" TEXT,
    "voidedById" VARCHAR(36),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_txn_project" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE,
    CONSTRAINT "fk_txn_material" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT,
    CONSTRAINT "fk_txn_vendor" FOREIGN KEY ("vendorId") REFERENCES "Supplier"("id") ON DELETE SET NULL,
    CONSTRAINT "fk_txn_daily_log" FOREIGN KEY ("dailyLogId") REFERENCES "DailyLog"("id") ON DELETE SET NULL,
    CONSTRAINT "fk_txn_recorded_by" FOREIGN KEY ("recordedById") REFERENCES "User"("id") ON DELETE RESTRICT,
    CONSTRAINT "fk_txn_voided_by" FOREIGN KEY ("voidedById") REFERENCES "User"("id") ON DELETE SET NULL
);

CREATE INDEX "idx_txn_project" ON "InventoryTransaction"("projectId");
CREATE INDEX "idx_txn_material" ON "InventoryTransaction"("materialId");
CREATE INDEX "idx_txn_date" ON "InventoryTransaction"("txnDate");
CREATE INDEX "idx_txn_active" ON "InventoryTransaction"("projectId", "materialId") WHERE "voidedAt" IS NULL;

-- ============================================================================
-- 8. PROJECT MILESTONES & SCHEDULE TRACKING
-- ============================================================================

CREATE TABLE "Milestone" (
    "id" VARCHAR(36) PRIMARY KEY DEFAULT ('mls_' || substr(md5(random()::text || clock_timestamp()::text), 1, 24)),
    "projectId" VARCHAR(36) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "sequence" INTEGER NOT NULL,
    "plannedStartDate" TIMESTAMPTZ,
    "plannedEndDate" TIMESTAMPTZ,
    "actualStartDate" TIMESTAMPTZ,
    "actualEndDate" TIMESTAMPTZ,
    "status" VARCHAR(20) NOT NULL DEFAULT 'PLANNED' CHECK ("status" IN (
        'PLANNED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'CANCELLED'
    )),
    "progressPercent" DOUBLE PRECISION NOT NULL DEFAULT 0 CHECK ("progressPercent" >= 0 AND "progressPercent" <= 100),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_milestone_project" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE
);

CREATE INDEX "idx_milestone_project_seq" ON "Milestone"("projectId", "sequence");

-- ============================================================================
-- 9. BILLING, GST INVOICES & PAYMENTS RECONCILIATION
-- ============================================================================

CREATE TABLE "Invoice" (
    "id" VARCHAR(36) PRIMARY KEY DEFAULT ('inv_' || substr(md5(random()::text || clock_timestamp()::text), 1, 24)),
    "invoiceNo" VARCHAR(50) NOT NULL UNIQUE, -- e.g. 'INV-2026-001'
    "projectId" VARCHAR(36) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL CHECK ("amount" >= 0),
    "gstPct" DOUBLE PRECISION NOT NULL DEFAULT 0 CHECK ("gstPct" IN (0, 5, 12, 18, 28)),
    "status" VARCHAR(20) NOT NULL DEFAULT 'DRAFT' CHECK ("status" IN (
        'DRAFT', 'SENT', 'PARTIALLY_PAID', 'PAID', 'VOID'
    )),
    "issueDate" TIMESTAMPTZ NOT NULL,
    "dueDate" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_invoice_project" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE
);

CREATE INDEX "idx_invoice_project" ON "Invoice"("projectId");
CREATE INDEX "idx_invoice_status" ON "Invoice"("status");

CREATE TABLE "Payment" (
    "id" VARCHAR(36) PRIMARY KEY DEFAULT ('pay_' || substr(md5(random()::text || clock_timestamp()::text), 1, 24)),
    "invoiceId" VARCHAR(36) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL CHECK ("amount" > 0),
    "method" VARCHAR(20) NOT NULL CHECK ("method" IN ('CASH', 'BANK', 'UPI', 'CHEQUE')),
    "reference" VARCHAR(100), -- UTR or Cheque number
    "paidAt" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_payment_invoice" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE
);

CREATE INDEX "idx_payment_invoice" ON "Payment"("invoiceId");

-- ============================================================================
-- 10. IMMUTABLE SECURITY AUDIT TRAIL
-- ============================================================================

CREATE TABLE "AuditLog" (
    "id" VARCHAR(36) PRIMARY KEY DEFAULT ('aud_' || substr(md5(random()::text || clock_timestamp()::text), 1, 24)),
    "actorId" VARCHAR(36),
    "actorName" VARCHAR(150),
    "action" VARCHAR(100) NOT NULL,
    "entityType" VARCHAR(100),
    "entityId" VARCHAR(100),
    "projectId" VARCHAR(36),
    "meta" TEXT, -- JSON string representation of change payload
    "ip" VARCHAR(50),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_audit_project" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL
);

CREATE INDEX "idx_audit_created_at" ON "AuditLog"("createdAt" DESC);
CREATE INDEX "idx_audit_action" ON "AuditLog"("action");
CREATE INDEX "idx_audit_project" ON "AuditLog"("projectId");
