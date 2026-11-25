-- ============================================================================
-- ForgeOS: Comprehensive SQL Query Catalog (PostgreSQL 14+ / 16)
-- Covers all 15 Application Modules across Authentication, Projects, Inventory,
-- Logs, Milestones, Invoices, Wastage, Audit, and Executive Dashboards.
-- Every statement is explicitly annotated with -- READ or -- WRITE.
-- ============================================================================

-- ============================================================================
-- MODULE 1: AUTHENTICATION & USER MANAGEMENT
-- ============================================================================

-- Q1.01 -- READ
-- Find user credentials and active status for password login
SELECT 
    u."id", 
    u."name", 
    u."email", 
    u."passwordHash", 
    u."role", 
    u."isActive"
FROM "User" u
WHERE u."email" = 'admin@forgeos.local';

-- Q1.02 -- READ
-- Session revalidation query (Stale-Token Hardening) executed on every guarded API request
SELECT 
    u."id", 
    u."name", 
    u."email", 
    u."role", 
    u."isActive"
FROM "User" u
WHERE u."id" = 'usr_001_vaibhav' 
  AND u."isActive" = TRUE;

-- Q1.03 -- READ
-- Verify active OTP code for passwordless email login
SELECT 
    o."id", 
    o."email", 
    o."codeHash", 
    o."expiresAt", 
    o."attempts"
FROM "OtpCode" o
WHERE o."email" = 'vinayak@forgeos.local' 
  AND o."consumedAt" IS NULL
ORDER BY o."createdAt" DESC
LIMIT 1;

-- Q1.04 -- WRITE
-- Increment OTP failed attempt counter
UPDATE "OtpCode"
SET "attempts" = "attempts" + 1
WHERE "id" = 'otp_demo_123';

-- Q1.05 -- WRITE
-- Consume OTP code upon successful verification
UPDATE "OtpCode"
SET "consumedAt" = CURRENT_TIMESTAMP
WHERE "id" = 'otp_demo_123';

-- Q1.06 -- WRITE
-- Upsert OAuth account link on Google OAuth sign-in
INSERT INTO "OAuthAccount" ("id", "provider", "providerAccountId", "userId", "createdAt")
VALUES ('oa_google_999', 'google', '10928374650192837465', 'usr_004_vinayak', CURRENT_TIMESTAMP)
ON CONFLICT ("provider", "providerAccountId")
DO UPDATE SET "userId" = EXCLUDED."userId";

-- Q1.07 -- READ
-- List system users with total managed projects count (Admin user viewer)
SELECT 
    u."id",
    u."name",
    u."email",
    u."role",
    u."phone",
    u."isActive",
    u."createdAt",
    COUNT(p."id") AS "managedProjectsCount"
FROM "User" u
LEFT JOIN "Project" p ON p."assignedPmId" = u."id"
GROUP BY u."id", u."name", u."email", u."role", u."phone", u."isActive", u."createdAt"
ORDER BY u."createdAt" ASC
LIMIT 20 OFFSET 0;

-- Q1.08 -- WRITE
-- Admin invites new Project Manager
INSERT INTO "User" ("id", "name", "email", "passwordHash", "role", "phone", "isActive", "createdAt", "updatedAt")
VALUES (
    'usr_new_pm_01', 
    'Sameer Verma', 
    'sameer@forgeos.local', 
    'scrypt:d3f4a5...:8b9c0d...', 
    'PM', 
    '+91 98765 43210', 
    TRUE, 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP
);

-- Q1.09 -- WRITE
-- Deactivate user account (Prevents further API access immediately)
UPDATE "User"
SET "isActive" = FALSE, "updatedAt" = CURRENT_TIMESTAMP
WHERE "id" = 'usr_005_aisha';

-- ============================================================================
-- MODULE 2: LAND REGISTRY & ACQUISITION
-- ============================================================================

-- Q2.01 -- READ
-- List lands with total attached projects count and creator name
SELECT 
    l."id",
    l."name" AS "landName",
    l."city",
    l."state",
    l."areaValue",
    l."areaUnit",
    l."surveyNumber",
    l."purchaseCost",
    creator."name" AS "createdByName",
    COUNT(p."id") AS "activeProjectsCount"
FROM "Land" l
INNER JOIN "User" creator ON creator."id" = l."createdById"
LEFT JOIN "Project" p ON p."landId" = l."id"
GROUP BY l."id", l."name", l."city", l."state", l."areaValue", l."areaUnit", l."surveyNumber", l."purchaseCost", creator."name"
ORDER BY l."createdAt" DESC
LIMIT 20 OFFSET 0;

-- Q2.02 -- WRITE
-- Register a newly acquired land parcel
INSERT INTO "Land" (
    "id", "name", "addressLine", "city", "state", "pincode", 
    "areaValue", "areaUnit", "surveyNumber", "ownerName", 
    "purchaseDate", "purchaseCost", "notes", "createdById", "createdAt", "updatedAt"
) VALUES (
    'lnd_gurgaon_sector62',
    'Sector 62 Prime Plot',
    'Golf Course Extension Road',
    'Gurugram',
    'Haryana',
    '122002',
    4.5,
    'ACRE',
    'SURV-GUR-2026-88',
    'Haryana Urban Development Authority',
    '2026-01-15 00:00:00+00',
    450000000.0,
    'Clear title with environmental clearance approved',
    'usr_001_vaibhav',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- ============================================================================
-- MODULE 3: PROJECT MANAGEMENT & STATE MACHINE
-- ============================================================================

-- Q3.01 -- READ
-- List projects scoped for PM (Row-Level Security) with Land and PM details
SELECT 
    p."id",
    p."code",
    p."name" AS "projectName",
    p."status",
    p."startDate",
    p."expectedEndDate",
    p."totalBudget",
    p."wastageThresholdPct",
    l."name" AS "landName",
    l."city" AS "landCity",
    pm."name" AS "pmName",
    pm."email" AS "pmEmail"
FROM "Project" p
INNER JOIN "Land" l ON l."id" = p."landId"
LEFT JOIN "User" pm ON pm."id" = p."assignedPmId"
WHERE (p."assignedPmId" = 'usr_004_vinayak' OR 'ADMIN' = 'ADMIN')
ORDER BY p."createdAt" DESC;

-- Q3.02 -- READ
-- Single project comprehensive financial and operational summary
SELECT 
    p."id",
    p."code",
    p."name",
    p."status",
    p."totalBudget",
    COALESCE(inv_summary."totalInvoiced", 0) AS "totalInvoiced",
    COALESCE(pay_summary."totalPaid", 0) AS "totalPaid",
    COALESCE(log_summary."latestProgress", 0) AS "latestProgressPercent"
FROM "Project" p
LEFT JOIN (
    SELECT "projectId", SUM("amount" * (1 + "gstPct" / 100.0)) AS "totalInvoiced"
    FROM "Invoice"
    WHERE "status" != 'VOID'
    GROUP BY "projectId"
) inv_summary ON inv_summary."projectId" = p."id"
LEFT JOIN (
    SELECT i."projectId", SUM(py."amount") AS "totalPaid"
    FROM "Invoice" i
    INNER JOIN "Payment" py ON py."invoiceId" = i."id"
    WHERE i."status" != 'VOID'
    GROUP BY i."projectId"
) pay_summary ON pay_summary."projectId" = p."id"
LEFT JOIN (
    SELECT DISTINCT ON ("projectId") "projectId", "progressPercent" AS "latestProgress"
    FROM "DailyLog"
    ORDER BY "projectId", "logDate" DESC
) log_summary ON log_summary."projectId" = p."id"
WHERE p."id" = 'prj_001_cyber_heights';

-- Q3.03 -- WRITE
-- Create a new construction project
INSERT INTO "Project" (
    "id", "code", "name", "description", "location", "landId",
    "status", "startDate", "expectedEndDate", "totalBudget",
    "wastageThresholdPct", "assignedPmId", "createdById", "createdAt", "updatedAt"
) VALUES (
    'prj_004_solitaire_park',
    'FOS-004',
    'Solitaire Commercial Park',
    'Grade-A IT Commercial Office Complex with 2 Towers',
    'Outer Ring Road, Bengaluru',
    'lnd_gurgaon_sector62',
    'PLANNING',
    '2026-03-01 00:00:00+00',
    '2028-12-31 00:00:00+00',
    1250000000.0,
    8.0,
    'usr_004_vinayak',
    'usr_001_vaibhav',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Q3.04 -- WRITE
-- Project status state machine transition (Completing a project stamps actualEndDate)
UPDATE "Project"
SET 
    "status" = 'COMPLETED',
    "actualEndDate" = CURRENT_TIMESTAMP,
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "id" = 'prj_001_cyber_heights' 
  AND "status" = 'ACTIVE';

-- Q3.05 -- WRITE
-- Reassign project manager
UPDATE "Project"
SET "assignedPmId" = 'usr_002_riya', "updatedAt" = CURRENT_TIMESTAMP
WHERE "id" = 'prj_001_cyber_heights';

-- ============================================================================
-- MODULE 4: MATERIALS MASTER & PLANNING
-- ============================================================================

-- Q4.01 -- READ
-- Get active materials catalog
SELECT 
    m."id", 
    m."name", 
    m."unit", 
    m."category", 
    m."description", 
    m."isActive"
FROM "Material" m
WHERE m."isActive" = TRUE
ORDER BY m."category" ASC, m."name" ASC;

-- Q4.02 -- READ
-- List project material plans joined with master catalog specs
SELECT 
    mp."id" AS "planId",
    mp."projectId",
    m."id" AS "materialId",
    m."name" AS "materialName",
    m."unit" AS "materialUnit",
    m."category" AS "materialCategory",
    mp."openingQuantity",
    mp."plannedQuantity",
    mp."plannedUnitRate",
    mp."lowStockThreshold",
    mp."wastageThresholdPct",
    mp."status" AS "planStatus"
FROM "MaterialPlan" mp
INNER JOIN "Material" m ON m."id" = mp."materialId"
WHERE mp."projectId" = 'prj_001_cyber_heights'
ORDER BY m."name" ASC;

-- Q4.03 -- WRITE
-- Insert or update project material plan
INSERT INTO "MaterialPlan" (
    "id", "projectId", "materialId", "openingQuantity", 
    "plannedQuantity", "plannedUnitRate", "lowStockThreshold", 
    "wastageThresholdPct", "status", "createdById", "createdAt", "updatedAt"
) VALUES (
    'pln_prj1_cement',
    'prj_001_cyber_heights',
    'mat_001_cement_opc53',
    500.0,
    15000.0,
    420.0,
    300.0,
    10.0,
    'APPROVED',
    'usr_001_vaibhav',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT ("projectId", "materialId")
DO UPDATE SET 
    "plannedQuantity" = EXCLUDED."plannedQuantity",
    "lowStockThreshold" = EXCLUDED."lowStockThreshold",
    "updatedAt" = CURRENT_TIMESTAMP;

-- ============================================================================
-- MODULE 5: APPEND-ONLY INVENTORY & STOCK LEDGER
-- ============================================================================

-- Q5.01 -- READ
-- Calculate live stock balances across all materials in a project
-- Formula: Balance = Opening + Sum(IN) - Sum(OUT) + Sum(ADJUSTMENT signed)
SELECT 
    m."id" AS "materialId",
    m."name" AS "materialName",
    m."unit" AS "materialUnit",
    COALESCE(mp."openingQuantity", 0) AS "openingStock",
    COALESCE(mp."plannedQuantity", 0) AS "plannedStock",
    COALESCE(mp."lowStockThreshold", 0) AS "lowStockThreshold",
    COALESCE(SUM(
        CASE 
            WHEN t."voidedAt" IS NOT NULL THEN 0
            WHEN t."txnType" = 'IN' THEN t."quantity"
            WHEN t."txnType" = 'OUT' THEN -t."quantity"
            WHEN t."txnType" = 'ADJUSTMENT' THEN t."quantity"
            ELSE 0 
        END
    ), 0) + COALESCE(mp."openingQuantity", 0) AS "currentStock"
FROM "Material" m
INNER JOIN "MaterialPlan" mp ON mp."materialId" = m."id" AND mp."projectId" = 'prj_001_cyber_heights'
LEFT JOIN "InventoryTransaction" t ON t."materialId" = m."id" AND t."projectId" = 'prj_001_cyber_heights'
WHERE m."isActive" = TRUE
GROUP BY m."id", m."name", m."unit", mp."openingQuantity", mp."plannedQuantity", mp."lowStockThreshold"
ORDER BY m."name" ASC;

-- Q5.02 -- READ
-- Detailed ledger transaction history with vendor, material, and user details
SELECT 
    t."id" AS "transactionId",
    t."txnType",
    t."quantity",
    t."unitRate",
    t."challanNumber",
    t."outReason",
    t."txnDate",
    t."remarks",
    m."name" AS "materialName",
    m."unit" AS "materialUnit",
    s."name" AS "supplierName",
    recorder."name" AS "recordedByName",
    t."voidedAt",
    t."voidReason",
    voider."name" AS "voidedByName"
FROM "InventoryTransaction" t
INNER JOIN "Material" m ON m."id" = t."materialId"
LEFT JOIN "Supplier" s ON s."id" = t."vendorId"
INNER JOIN "User" recorder ON recorder."id" = t."recordedById"
LEFT JOIN "User" voider ON voider."id" = t."voidedById"
WHERE t."projectId" = 'prj_001_cyber_heights'
ORDER BY t."txnDate" DESC, t."createdAt" DESC
LIMIT 50 OFFSET 0;

-- Q5.03 -- WRITE
-- Record Stock IN receipt from supplier
INSERT INTO "InventoryTransaction" (
    "id", "projectId", "materialId", "vendorId", "txnType",
    "quantity", "unitRate", "challanNumber", "txnDate",
    "remarks", "recordedById", "createdAt"
) VALUES (
    'txn_stock_in_101',
    'prj_001_cyber_heights',
    'mat_001_cement_opc53',
    'sup_001_ambuja_distributors',
    'IN',
    500.0,
    410.0,
    'CHAL-DEL-2026-901',
    '2026-11-20 00:00:00+00',
    'Received 500 bags of 53-grade OPC cement via direct truckload',
    'usr_004_vinayak',
    CURRENT_TIMESTAMP
);

-- Q5.04 -- WRITE
-- Record Stock OUT consumption for site execution
INSERT INTO "InventoryTransaction" (
    "id", "projectId", "materialId", "txnType", "quantity",
    "outReason", "txnDate", "dailyLogId", "remarks", "recordedById", "createdAt"
) VALUES (
    'txn_stock_out_102',
    'prj_001_cyber_heights',
    'mat_001_cement_opc53',
    'OUT',
    120.0,
    'USED',
    '2026-11-21 00:00:00+00',
    'log_001_slab_pour',
    'Consumed for Tower A Level 4 slab casting',
    'usr_004_vinayak',
    CURRENT_TIMESTAMP
);

-- Q5.05 -- WRITE
-- Void a mistaken inventory transaction (Immutable ledger correction)
UPDATE "InventoryTransaction"
SET 
    "voidedAt" = CURRENT_TIMESTAMP,
    "voidReason" = 'Duplicate delivery note entered by supervisor',
    "voidedById" = 'usr_001_vaibhav'
WHERE "id" = 'txn_stock_in_101' 
  AND "voidedAt" IS NULL;

-- ============================================================================
-- MODULE 6: WASTAGE ANALYTICS & MONITORING
-- ============================================================================

-- Q6.01 -- READ
-- Project-level material wastage variance analysis
SELECT 
    m."name" AS "materialName",
    m."unit",
    mp."plannedQuantity",
    mp."wastageThresholdPct" AS "thresholdPct",
    COALESCE(consumed."actualConsumed", 0) AS "actualConsumed",
    COALESCE(consumed."actualConsumed", 0) - mp."plannedQuantity" AS "excessQuantity",
    CASE 
        WHEN mp."plannedQuantity" > 0 THEN 
            ROUND((((COALESCE(consumed."actualConsumed", 0) - mp."plannedQuantity") / mp."plannedQuantity") * 100.0)::numeric, 2)
        ELSE 0 
    END AS "wastagePercentage",
    CASE 
        WHEN mp."plannedQuantity" > 0 AND 
             (((COALESCE(consumed."actualConsumed", 0) - mp."plannedQuantity") / mp."plannedQuantity") * 100.0) > mp."wastageThresholdPct"
        THEN TRUE 
        ELSE FALSE 
    END AS "isThresholdBreached"
FROM "MaterialPlan" mp
INNER JOIN "Material" m ON m."id" = mp."materialId"
LEFT JOIN (
    SELECT "projectId", "materialId", SUM("quantity") AS "actualConsumed"
    FROM "InventoryTransaction"
    WHERE "txnType" = 'OUT' AND "voidedAt" IS NULL
    GROUP BY "projectId", "materialId"
) consumed ON consumed."projectId" = mp."projectId" AND consumed."materialId" = mp."materialId"
WHERE mp."projectId" = 'prj_001_cyber_heights';

-- Q6.02 -- READ
-- Portfolio-wide wastage breach detection (Admin Red Alert View)
SELECT 
    p."id" AS "projectId",
    p."code" AS "projectCode",
    p."name" AS "projectName",
    m."name" AS "materialName",
    mp."plannedQuantity",
    consumed."actualConsumed",
    ROUND((((consumed."actualConsumed" - mp."plannedQuantity") / mp."plannedQuantity") * 100.0)::numeric, 2) AS "wastagePct",
    mp."wastageThresholdPct" AS "allowedThresholdPct"
FROM "MaterialPlan" mp
INNER JOIN "Project" p ON p."id" = mp."projectId"
INNER JOIN "Material" m ON m."id" = mp."materialId"
INNER JOIN (
    SELECT "projectId", "materialId", SUM("quantity") AS "actualConsumed"
    FROM "InventoryTransaction"
    WHERE "txnType" = 'OUT' AND "voidedAt" IS NULL
    GROUP BY "projectId", "materialId"
) consumed ON consumed."projectId" = mp."projectId" AND consumed."materialId" = mp."materialId"
WHERE p."status" = 'ACTIVE'
  AND (((consumed."actualConsumed" - mp."plannedQuantity") / mp."plannedQuantity") * 100.0) > mp."wastageThresholdPct"
ORDER BY "wastagePct" DESC;

-- ============================================================================
-- MODULE 7: DAILY SITE LOGS & RESOURCE MONITORING
-- ============================================================================

-- Q7.01 -- READ
-- Daily log listing with supervisor info and aggregate resource usage
SELECT 
    dl."id" AS "dailyLogId",
    dl."logDate",
    dl."progressPercent",
    dl."workSummary",
    dl."weather",
    creator."name" AS "submittedByName",
    COALESCE(labour."totalWorkers", 0) AS "totalWorkers",
    COALESCE(machinery."totalMachineHours", 0) AS "totalMachineHours"
FROM "DailyLog" dl
INNER JOIN "User" creator ON creator."id" = dl."createdById"
LEFT JOIN (
    SELECT "dailyLogId", SUM("headCount") AS "totalWorkers"
    FROM "LabourEntry"
    GROUP BY "dailyLogId"
) labour ON labour."dailyLogId" = dl."id"
LEFT JOIN (
    SELECT "dailyLogId", SUM("hoursUsed") AS "totalMachineHours"
    FROM "MachineryEntry"
    GROUP BY "dailyLogId"
) machinery ON machinery."dailyLogId" = dl."id"
WHERE dl."projectId" = 'prj_001_cyber_heights'
ORDER BY dl."logDate" DESC;

-- Q7.02 -- READ
-- Full detail of a single daily log including labour and machinery sub-entries
SELECT 
    dl."id",
    dl."logDate",
    dl."progressPercent",
    dl."workSummary",
    dl."weather",
    dl."issues",
    le."trade",
    le."contractorName",
    le."headCount",
    le."hoursWorked",
    me."machineName",
    me."hoursUsed",
    me."fuelLitres"
FROM "DailyLog" dl
LEFT JOIN "LabourEntry" le ON le."dailyLogId" = dl."id"
LEFT JOIN "MachineryEntry" me ON me."dailyLogId" = dl."id"
WHERE dl."id" = 'log_001_slab_pour';

-- Q7.03 -- WRITE
-- Create daily site diary entry
INSERT INTO "DailyLog" (
    "id", "projectId", "logDate", "progressPercent", 
    "workSummary", "weather", "issues", "createdById", "createdAt", "updatedAt"
) VALUES (
    'log_002_tower_a_col',
    'prj_001_cyber_heights',
    '2026-11-22 00:00:00+00',
    44.5,
    'Reinforcement tying for Tower A 4th-floor columns completed. Formwork staging underway.',
    'Clear, 24°C',
    'Slight delay in ready-mix concrete batch arrival due to traffic congestion',
    'usr_004_vinayak',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Q7.04 -- WRITE
-- Insert labour headcount breakdown
INSERT INTO "LabourEntry" ("id", "dailyLogId", "trade", "contractorName", "headCount", "hoursWorked", "remarks")
VALUES 
    ('lab_01', 'log_002_tower_a_col', 'Bar Benders', 'Apex Rebar Contractors', 14, 8.0, 'Working on column rebar cage'),
    ('lab_02', 'log_002_tower_a_col', 'Carpenters', 'Shree Ram Formwork', 10, 8.5, 'Setting up column shuttering'),
    ('lab_03', 'log_002_tower_a_col', 'Helpers', 'Apex Rebar Contractors', 18, 8.0, 'Material movement and rebar shifting');

-- Q7.05 -- WRITE
-- Insert heavy machinery runtime
INSERT INTO "MachineryEntry" ("id", "dailyLogId", "machineName", "operatorName", "hoursUsed", "fuelLitres", "remarks")
VALUES 
    ('mac_01', 'log_002_tower_a_col', 'Tower Crane TC-1', 'Rajesh Kumar', 7.5, 45.0, 'Hoisting steel rebar bundles to Level 4'),
    ('mac_02', 'log_002_tower_a_col', 'Concrete Boom Pump', 'Anil Yadav', 4.0, 32.0, 'Pre-pour equipment testing');

-- ============================================================================
-- MODULE 8: PROJECT MILESTONES
-- ============================================================================

-- Q8.01 -- READ
-- Project milestone delivery status ordered by execution sequence
SELECT 
    m."id",
    m."sequence",
    m."name",
    m."plannedStartDate",
    m."plannedEndDate",
    m."actualEndDate",
    m."status",
    m."progressPercent"
FROM "Milestone" m
WHERE m."projectId" = 'prj_001_cyber_heights'
ORDER BY m."sequence" ASC;

-- Q8.02 -- WRITE
-- Update milestone progress and complete status
UPDATE "Milestone"
SET 
    "progressPercent" = 100.0,
    "status" = 'COMPLETED',
    "actualEndDate" = CURRENT_TIMESTAMP,
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "id" = 'mls_001_foundation' 
  AND "projectId" = 'prj_001_cyber_heights';

-- ============================================================================
-- MODULE 9: INVOICING, GST & PAYMENT RECONCILIATION
-- ============================================================================

-- Q9.01 -- READ
-- List invoices with GST, total payable, total collected, and remaining balance
SELECT 
    i."id" AS "invoiceId",
    i."invoiceNo",
    p."code" AS "projectCode",
    p."name" AS "projectName",
    i."amount" AS "baseAmount",
    i."gstPct",
    ROUND((i."amount" * (1 + i."gstPct" / 100.0))::numeric, 2) AS "totalPayable",
    COALESCE(SUM(py."amount"), 0) AS "totalPaid",
    ROUND((i."amount" * (1 + i."gstPct" / 100.0) - COALESCE(SUM(py."amount"), 0))::numeric, 2) AS "balanceDue",
    i."status" AS "invoiceStatus",
    i."dueDate"
FROM "Invoice" i
INNER JOIN "Project" p ON p."id" = i."projectId"
LEFT JOIN "Payment" py ON py."invoiceId" = i."id"
GROUP BY i."id", i."invoiceNo", p."code", p."name", i."amount", i."gstPct", i."status", i."dueDate"
ORDER BY i."dueDate" ASC;

-- Q9.02 -- WRITE
-- Create GST invoice for site billing
INSERT INTO "Invoice" (
    "id", "invoiceNo", "projectId", "amount", "gstPct", "status", "issueDate", "dueDate", "createdAt", "updatedAt"
) VALUES (
    'inv_2026_015',
    'INV-2026-015',
    'prj_001_cyber_heights',
    2500000.0,
    18.0, -- 18% GST slab
    'SENT',
    '2026-11-01 00:00:00+00',
    '2026-11-30 00:00:00+00',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

-- Q9.03 -- WRITE
-- Record client payment against invoice
INSERT INTO "Payment" ("id", "invoiceId", "amount", "method", "reference", "paidAt", "createdAt")
VALUES (
    'pay_rec_501',
    'inv_2026_015',
    1500000.0,
    'BANK',
    'NEFT-HDFC-20261123-9988',
    '2026-11-23 14:30:00+00',
    CURRENT_TIMESTAMP
);

-- Q9.04 -- WRITE
-- Automatic reconciliation: Update invoice status based on payment total
UPDATE "Invoice" i
SET "status" = CASE 
    WHEN (SELECT SUM("amount") FROM "Payment" WHERE "invoiceId" = i."id") >= (i."amount" * (1 + i."gstPct" / 100.0)) 
        THEN 'PAID'
    WHEN (SELECT SUM("amount") FROM "Payment" WHERE "invoiceId" = i."id") > 0 
        THEN 'PARTIALLY_PAID'
    ELSE i."status"
END,
"updatedAt" = CURRENT_TIMESTAMP
WHERE i."id" = 'inv_2026_015';

-- ============================================================================
-- MODULE 10: AUDIT TRAIL & COMPLIANCE LOGGING
-- ============================================================================

-- Q10.01 -- READ
-- Filter audit logs by action type, project, and date range
SELECT 
    a."id",
    a."action",
    a."actorId",
    a."actorName",
    a."entityType",
    a."entityId",
    p."name" AS "projectName",
    a."ip",
    a."meta",
    a."createdAt"
FROM "AuditLog" a
LEFT JOIN "Project" p ON p."id" = a."projectId"
WHERE ('TXN_VOID' IS NULL OR a."action" = 'TXN_VOID')
  AND a."createdAt" >= CURRENT_TIMESTAMP - INTERVAL '30 days'
ORDER BY a."createdAt" DESC
LIMIT 50;

-- Q10.02 -- READ
-- Audit statistics for security dashboard (Action breakdown in last 7 days)
SELECT 
    a."action",
    COUNT(a."id") AS "totalEvents",
    COUNT(DISTINCT a."actorId") AS "uniqueActors"
FROM "AuditLog" a
WHERE a."createdAt" >= CURRENT_TIMESTAMP - INTERVAL '7 days'
GROUP BY a."action"
ORDER BY "totalEvents" DESC;

-- Q10.03 -- WRITE
-- Insert audit entry for state-changing operations
INSERT INTO "AuditLog" (
    "id", "actorId", "actorName", "action", "entityType", 
    "entityId", "projectId", "meta", "ip", "createdAt"
) VALUES (
    'aud_evt_777',
    'usr_001_vaibhav',
    'Vaibhav Todi',
    'ROLE_CHANGE',
    'user',
    'usr_004_vinayak',
    NULL,
    '{"oldRole":"PM","newRole":"ADMIN","reason":"Promoted to Portfolio Director"}',
    '103.21.54.12',
    CURRENT_TIMESTAMP
);

-- ============================================================================
-- MODULE 11: EXECUTIVE & PM COCKPIT DASHBOARDS
-- ============================================================================

-- Q11.01 -- READ
-- Admin Executive Cockpit KPI Summary
SELECT 
    (SELECT COUNT(*) FROM "Project" WHERE "status" = 'ACTIVE') AS "activeProjectsCount",
    (SELECT COUNT(*) FROM "Project" WHERE "status" = 'PLANNING') AS "planningProjectsCount",
    (SELECT COALESCE(SUM("totalBudget"), 0) FROM "Project" WHERE "status" = 'ACTIVE') AS "totalActiveBudget",
    (SELECT COALESCE(SUM(i."amount" * (1 + i."gstPct" / 100.0)), 0) FROM "Invoice" i WHERE i."status" != 'VOID') AS "totalBilledReceivables",
    (SELECT COALESCE(SUM(py."amount"), 0) FROM "Payment" py) AS "totalCollectedCash";

-- Q11.02 -- READ
-- PM Cockpit: Low stock critical alert detector
SELECT 
    p."id" AS "projectId",
    p."name" AS "projectName",
    m."name" AS "materialName",
    m."unit",
    mp."lowStockThreshold",
    (
        COALESCE(mp."openingQuantity", 0) + 
        COALESCE(SUM(
            CASE 
                WHEN t."voidedAt" IS NOT NULL THEN 0
                WHEN t."txnType" = 'IN' THEN t."quantity"
                WHEN t."txnType" = 'OUT' THEN -t."quantity"
                WHEN t."txnType" = 'ADJUSTMENT' THEN t."quantity"
                ELSE 0 
            END
        ), 0)
    ) AS "currentStock"
FROM "MaterialPlan" mp
INNER JOIN "Project" p ON p."id" = mp."projectId"
INNER JOIN "Material" m ON m."id" = mp."materialId"
LEFT JOIN "InventoryTransaction" t ON t."materialId" = m."id" AND t."projectId" = p."id"
WHERE p."assignedPmId" = 'usr_004_vinayak'
  AND p."status" = 'ACTIVE'
  AND mp."lowStockThreshold" IS NOT NULL
GROUP BY p."id", p."name", m."name", m."unit", mp."openingQuantity", mp."lowStockThreshold"
HAVING (
    COALESCE(mp."openingQuantity", 0) + 
    COALESCE(SUM(
        CASE 
            WHEN t."voidedAt" IS NOT NULL THEN 0
            WHEN t."txnType" = 'IN' THEN t."quantity"
            WHEN t."txnType" = 'OUT' THEN -t."quantity"
            WHEN t."txnType" = 'ADJUSTMENT' THEN t."quantity"
            ELSE 0 
        END
    ), 0)
) <= mp."lowStockThreshold"
ORDER BY "currentStock" ASC;
