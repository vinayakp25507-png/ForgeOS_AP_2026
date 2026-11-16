// Imports afterAll, beforeAll, describe, expect, it from vitest so this module can reuse that component, helper, or library.
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
// Imports request from supertest so this module can reuse that component, helper, or library.
import request from 'supertest'
// Imports PrismaClient, Role from @prisma/client so this module can reuse that component, helper, or library.
import { PrismaClient, Role } from '@prisma/client'
// Imports createApp from ../src/app.js so this module can reuse that component, helper, or library.
import { createApp } from '../src/app.js'
// Imports createAccessToken from ../src/utils/jwt.js so this module can reuse that component, helper, or library.
import { createAccessToken } from '../src/utils/jwt.js'

// Stores the value in enabled so later lines can reuse this data or behavior for the current feature.
const enabled = (process.env.DATABASE_URL ?? '').includes(':55432/')
// Stores the value in describeIntegration so later lines can reuse this data or behavior for the current feature.
const describeIntegration = describe.skipIf(!enabled)
// Stores the value in prisma so later lines can reuse this data or behavior for the current feature.
const prisma = new PrismaClient()
// Stores the value in app so later lines can reuse this data or behavior for the current feature.
const app = createApp()
// Stores the value in marker so later lines can reuse this data or behavior for the current feature.
const marker = `billing-${Date.now()}`
// Stores the value in adminId so later lines can reuse this data or behavior for the current feature.
let adminId: number
// Stores the value in pmId so later lines can reuse this data or behavior for the current feature.
let pmId: number
// Stores the value in otherPmId so later lines can reuse this data or behavior for the current feature.
let otherPmId: number
// Stores the value in landId so later lines can reuse this data or behavior for the current feature.
let landId: number
// Stores the value in projectId so later lines can reuse this data or behavior for the current feature.
let projectId: number
// Stores the value in otherProjectId so later lines can reuse this data or behavior for the current feature.
let otherProjectId: number
// Stores the value in vendorId so later lines can reuse this data or behavior for the current feature.
let vendorId: number
// Stores the value in billId so later lines can reuse this data or behavior for the current feature.
let billId: number
// Stores the value in adminToken so later lines can reuse this data or behavior for the current feature.
let adminToken: string
// Stores the value in pmToken so later lines can reuse this data or behavior for the current feature.
let pmToken: string
// Stores the value in otherPmToken so later lines can reuse this data or behavior for the current feature.
let otherPmToken: string

// Stores the value in auth so later lines can reuse this data or behavior for the current feature.
const auth = (token: string) => ({ Authorization: `Bearer ${token}` })

// Calls this helper or component so the feature can perform the operation or render the control represented here.
describeIntegration('Vendors, billing and payments PostgreSQL integration', () => {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  beforeAll(async () => {
    // Waits for the asynchronous result before using it, so later work receives completed data.
    const [admin, pm, otherPm] = await Promise.all([
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      prisma.user.create({ data: { name: `${marker} Admin`, email: `admin@${marker}.test`, passwordHash: 'test', role: Role.ADMIN } }),
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      prisma.user.create({ data: { name: `${marker} PM`, email: `pm@${marker}.test`, passwordHash: 'test', role: Role.PM } }),
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      prisma.user.create({ data: { name: `${marker} Other`, email: `other@${marker}.test`, passwordHash: 'test', role: Role.PM } }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ])
    // Continues the component or data expression so its related values and behavior stay grouped together.
    adminId = admin.id; pmId = pm.id; otherPmId = otherPm.id
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    adminToken = createAccessToken(admin); pmToken = createAccessToken(pm); otherPmToken = createAccessToken(otherPm)
    // Stores the value in land so later lines can reuse this data or behavior for the current feature.
    const land = await prisma.land.create({ data: { name: `${marker} Land`, city: 'Billing City', state: 'Billing State', areaValue: 1, areaUnit: 'ACRE', createdById: adminId } })
    // Continues the component or data expression so its related values and behavior stay grouped together.
    landId = land.id
    // Stores the value in project so later lines can reuse this data or behavior for the current feature.
    const project = await prisma.project.create({ data: { landId, code: `${marker}-A`, name: `${marker} Project`, status: 'ACTIVE', assignedPmId: pmId, createdById: adminId } })
    // Stores the value in otherProject so later lines can reuse this data or behavior for the current feature.
    const otherProject = await prisma.project.create({ data: { landId, code: `${marker}-B`, name: `${marker} Other`, status: 'ACTIVE', assignedPmId: otherPmId, createdById: adminId } })
    // Continues the component or data expression so its related values and behavior stay grouped together.
    projectId = project.id; otherProjectId = otherProject.id
    // Stores the value in vendor so later lines can reuse this data or behavior for the current feature.
    const vendor = await prisma.vendor.create({ data: { name: `${marker} Vendor`, vendorType: 'MATERIAL_SUPPLIER', gstin: '06ABCDE1234F1Z5', contactPerson: 'Test Contact' } })
    // Continues the component or data expression so its related values and behavior stay grouped together.
    vendorId = vendor.id
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  afterAll(async () => {
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.$executeRawUnsafe('DROP TRIGGER IF EXISTS test_bill_audit_failure ON audit_logs')
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.$executeRawUnsafe('DROP FUNCTION IF EXISTS test_fail_bill_audit()')
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (billId) await prisma.payment.deleteMany({ where: { billId } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.payment.deleteMany({ where: { bill: { projectId: { in: [projectId, otherProjectId] } } } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.auditLog.deleteMany({ where: { userId: { in: [adminId, pmId, otherPmId] } } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.bill.deleteMany({ where: { projectId: { in: [projectId, otherProjectId] } } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.projectVendorAssignment.deleteMany({ where: { projectId: { in: [projectId, otherProjectId] } } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.vendor.delete({ where: { id: vendorId } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.project.deleteMany({ where: { id: { in: [projectId, otherProjectId] } } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.land.delete({ where: { id: landId } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.user.deleteMany({ where: { id: { in: [adminId, pmId, otherPmId] } } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.$disconnect()
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('manages vendors and historical project assignments', async () => {
    // Stores the value in created so later lines can reuse this data or behavior for the current feature.
    const created = await request(app).post('/api/v1/vendors').set(auth(adminToken)).send({
      // Sets the name field so the surrounding object or component receives this setting.
      name: `${marker} Service Vendor`, vendorType: 'SERVICE_PROVIDER',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(created.status).toBe(201)
    // Stores the value in createdId so later lines can reuse this data or behavior for the current feature.
    const createdId = created.body.data.id
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).patch(`/api/v1/vendors/${createdId}`).set(auth(adminToken)).send({ phone: '123' })).status).toBe(200)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).get(`/api/v1/vendors/${createdId}`).set(auth(adminToken))).status).toBe(200)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).delete(`/api/v1/vendors/${createdId}`).set(auth(adminToken))).status).toBe(200)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).post(`/api/v1/projects/${projectId}/vendors/${vendorId}`).set(auth(pmToken))).status).toBe(201)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).post(`/api/v1/projects/${projectId}/vendors/${vendorId}`).set(auth(pmToken))).status).toBe(409)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).get(`/api/v1/projects/${projectId}/vendors`).set(auth(pmToken))).body.data).toHaveLength(1)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).delete(`/api/v1/projects/${projectId}/vendors/${vendorId}`).set(auth(pmToken))).status).toBe(200)
    // Stores the value in vendorAudit so later lines can reuse this data or behavior for the current feature.
    const vendorAudit = await prisma.auditLog.findFirst({ where: { entityType: 'Vendor', entityId: createdId, userId: adminId, action: 'CREATE' } })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(vendorAudit?.action).toBe('CREATE')
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.vendor.delete({ where: { id: createdId } })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('creates bills, rejects duplicate invoices, and enforces project access', async () => {
    // Stores the value in payload so later lines can reuse this data or behavior for the current feature.
    const payload = {
      // Continues the component or data expression so its related values and behavior stay grouped together.
      projectId, vendorId, billNumber: `${marker}-INV-1`, billDate: '2026-11-01',
      // Sets the dueDate field so the surrounding object or component receives this setting.
      dueDate: '2026-11-30', category: 'MATERIAL', description: 'Cement', baseAmount: 100, gstPercent: 18,
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Stores the value in created so later lines can reuse this data or behavior for the current feature.
    const created = await request(app).post('/api/v1/bills').set(auth(pmToken)).send(payload)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(created.status).toBe(201)
    // Continues the component or data expression so its related values and behavior stay grouped together.
    billId = created.body.data.id
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(created.body.data.totalAmount).toBe('118')
    // Stores the value in dateBill so later lines can reuse this data or behavior for the current feature.
    const dateBill = await request(app).post('/api/v1/bills').set(auth(pmToken)).send({
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ...payload,
      // Sets the billNumber field so the surrounding object or component receives this setting.
      billNumber: `${marker}-INV-DATE`,
      // Sets the billDate field so the surrounding object or component receives this setting.
      billDate: '2026-11-05',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(dateBill.status).toBe(201)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).patch(`/api/v1/bills/${dateBill.body.data.id}`).set(auth(pmToken)).send({
      // Sets the dueDate field so the surrounding object or component receives this setting.
      dueDate: '2026-11-04',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })).status).toBe(400)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).post('/api/v1/bills').set(auth(pmToken)).send(payload)).status).toBe(409)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).get(`/api/v1/bills/${billId}`).set(auth(otherPmToken))).status).toBe(404)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).get('/api/v1/bills').set(auth(pmToken))).body.data[0].paidAmount).toBe(0)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('approves bills, records partial and final payments, and prevents overpayment', async () => {
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).post(`/api/v1/bills/${billId}/approve`).set(auth(adminToken))).status).toBe(200)
    // Stores the value in partial so later lines can reuse this data or behavior for the current feature.
    const partial = await request(app).post(`/api/v1/bills/${billId}/payments`).set(auth(adminToken)).send({
      // Sets the amount field so the surrounding object or component receives this setting.
      amount: 50, paymentDate: '2026-11-02', mode: 'BANK_TRANSFER', referenceNumber: 'UTR-1',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(partial.status).toBe(201)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(partial.body.data.bill.status).toBe('PARTIALLY_PAID')
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(partial.body.data.bill.outstandingAmount).toBe(68)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).post(`/api/v1/bills/${billId}/payments`).set(auth(adminToken)).send({
      // Sets the amount field so the surrounding object or component receives this setting.
      amount: 69, paymentDate: '2026-11-02', mode: 'BANK_TRANSFER',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })).status).toBe(422)
    // Stores the value in final so later lines can reuse this data or behavior for the current feature.
    const final = await request(app).post(`/api/v1/bills/${billId}/payments`).set(auth(adminToken)).send({
      // Sets the amount field so the surrounding object or component receives this setting.
      amount: 68, paymentDate: '2026-11-03', mode: 'BANK_TRANSFER',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(final.status).toBe(201)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(final.body.data.bill.status).toBe('PAID')
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(final.body.data.bill.outstandingAmount).toBe(0)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).get(`/api/v1/bills/${billId}/payments?from=2026-11-02&to=2026-11-02`).set(auth(pmToken))).body.data).toHaveLength(1)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('serializes concurrent payments against the same outstanding balance', async () => {
    // Stores the value in created so later lines can reuse this data or behavior for the current feature.
    const created = await request(app).post('/api/v1/bills').set(auth(pmToken)).send({
      // Continues the component or data expression so its related values and behavior stay grouped together.
      projectId, vendorId, billNumber: `${marker}-INV-RACE`, billDate: '2026-11-01',
      // Sets the category field so the surrounding object or component receives this setting.
      category: 'SERVICES', baseAmount: 100, gstPercent: 0,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(created.status).toBe(201)
    // Stores the value in raceId so later lines can reuse this data or behavior for the current feature.
    const raceId = created.body.data.id
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).post(`/api/v1/bills/${raceId}/approve`).set(auth(adminToken))).status).toBe(200)
    // Stores the value in results so later lines can reuse this data or behavior for the current feature.
    const results = await Promise.all([1, 2].map(() => request(app).post(`/api/v1/bills/${raceId}/payments`).set(auth(adminToken)).send({
      // Sets the amount field so the surrounding object or component receives this setting.
      amount: 70, paymentDate: '2026-11-04', mode: 'BANK_TRANSFER',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })))
    // Keeps only items matching this condition so the result contains relevant data.
    expect(results.filter((result) => result.status === 201)).toHaveLength(1)
    // Keeps only items matching this condition so the result contains relevant data.
    expect(results.filter((result) => result.status === 422)).toHaveLength(1)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('returns expense and outstanding reports scoped to the PM project', async () => {
    // Stores the value in expenses so later lines can reuse this data or behavior for the current feature.
    const expenses = await request(app).get(`/api/v1/projects/${projectId}/expenses?from=2026-11-01&to=2026-11-30`).set(auth(pmToken))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(expenses.status).toBe(200)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(expenses.body.data).toEqual(expect.arrayContaining([
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      expect.objectContaining({ id: billId }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ]))
    // Stores the value in outstanding so later lines can reuse this data or behavior for the current feature.
    const outstanding = await request(app).get('/api/v1/reports/vendor-outstanding').set(auth(pmToken))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(outstanding.status).toBe(200)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(outstanding.body.data).toEqual(expect.arrayContaining([expect.objectContaining({ vendorId })]))
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).get(`/api/v1/projects/${otherProjectId}/expenses`).set(auth(pmToken))).status).toBe(404)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('rolls back bill creation when the audit write fails', async () => {
    await prisma.$executeRawUnsafe(`
      CREATE OR REPLACE FUNCTION test_fail_bill_audit() RETURNS trigger AS $$
      BEGIN
        IF NEW.entity_type = 'Bill' THEN RAISE EXCEPTION 'forced bill audit failure'; END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql
    `)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.$executeRawUnsafe('CREATE TRIGGER test_bill_audit_failure BEFORE INSERT ON audit_logs FOR EACH ROW EXECUTE FUNCTION test_fail_bill_audit()')
    // Stores the value in number so later lines can reuse this data or behavior for the current feature.
    const number = `${marker}-ROLLBACK`
    // Stores the value in result so later lines can reuse this data or behavior for the current feature.
    const result = await request(app).post('/api/v1/bills').set(auth(pmToken)).send({
      // Continues the component or data expression so its related values and behavior stay grouped together.
      projectId, vendorId, billNumber: number, billDate: '2026-11-04', category: 'SERVICES', baseAmount: 10, gstPercent: 0,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(result.status).toBe(500)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect(await prisma.bill.findUnique({ where: { vendorId_billNumber: { vendorId, billNumber: number } } })).toBeNull()
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Continues the component or data expression so its related values and behavior stay grouped together.
})
