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
const marker = `inventory-${Date.now()}`
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
// Stores the value in materialId so later lines can reuse this data or behavior for the current feature.
let materialId: number
// Stores the value in adminToken so later lines can reuse this data or behavior for the current feature.
let adminToken: string
// Stores the value in pmToken so later lines can reuse this data or behavior for the current feature.
let pmToken: string
// Stores the value in otherPmToken so later lines can reuse this data or behavior for the current feature.
let otherPmToken: string

// Stores the value in auth so later lines can reuse this data or behavior for the current feature.
const auth = (token: string) => ({ Authorization: `Bearer ${token}` })

// Calls this helper or component so the feature can perform the operation or render the control represented here.
describeIntegration('Material inventory PostgreSQL integration', () => {
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
    const land = await prisma.land.create({ data: { name: `${marker} Land`, city: 'Test City', state: 'Test State', areaValue: 1, areaUnit: 'ACRE', createdById: adminId } })
    // Continues the component or data expression so its related values and behavior stay grouped together.
    landId = land.id
    // Stores the value in project so later lines can reuse this data or behavior for the current feature.
    const project = await prisma.project.create({ data: { landId, code: `${marker}-A`, name: `${marker} Project`, status: 'ACTIVE', assignedPmId: pmId, createdById: adminId } })
    // Stores the value in otherProject so later lines can reuse this data or behavior for the current feature.
    const otherProject = await prisma.project.create({ data: { landId, code: `${marker}-B`, name: `${marker} Other Project`, status: 'ACTIVE', assignedPmId: otherPmId, createdById: adminId } })
    // Continues the component or data expression so its related values and behavior stay grouped together.
    projectId = project.id; otherProjectId = otherProject.id
    // Stores the value in material so later lines can reuse this data or behavior for the current feature.
    const material = await prisma.material.create({ data: { name: `${marker} Cement`, category: 'CEMENT', unit: 'BAG', description: 'Integration material' } })
    // Continues the component or data expression so its related values and behavior stay grouped together.
    materialId = material.id
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.projectMaterialPlan.create({ data: { projectId, materialId, plannedQuantity: 100, openingQuantity: 10, lowStockThreshold: 5, plannedUnitRate: 20 } })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  afterAll(async () => {
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.auditLog.deleteMany({ where: { userId: { in: [adminId, pmId, otherPmId] } } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.stockTransaction.deleteMany({ where: { projectId: { in: [projectId, otherProjectId] } } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.projectMaterialPlan.deleteMany({ where: { projectId: { in: [projectId, otherProjectId] } } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.material.delete({ where: { id: materialId } })
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
  it('supports material CRUD and project-scoped authorization', async () => {
    // Stores the value in created so later lines can reuse this data or behavior for the current feature.
    const created = await request(app).post('/api/v1/materials').set(auth(adminToken)).send({ name: `${marker} Steel`, category: 'STEEL', unit: 'KG' })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(created.status).toBe(201)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).get('/api/v1/materials').set(auth(pmToken))).status).toBe(200)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).patch(`/api/v1/materials/${created.body.data.id}`).set(auth(otherPmToken)).send({ description: 'no' })).status).toBe(403)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.material.delete({ where: { id: created.body.data.id } })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('records stock, calculates balances and wastage, and audits the write', async () => {
    // Stores the value in input so later lines can reuse this data or behavior for the current feature.
    const input = { materialId, txnType: 'IN', quantity: 20, txnDate: '2026-11-10', unitRate: 20 }
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).post(`/api/v1/projects/${projectId}/inventory/transactions`).set(auth(pmToken)).send(input)).status).toBe(201)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).post(`/api/v1/projects/${projectId}/inventory/transactions`).set(auth(pmToken)).send({
      // Continues the component or data expression so its related values and behavior stay grouped together.
      materialId, txnType: 'OUT', quantity: 5, txnDate: '2026-11-10', outReason: 'DAMAGED',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })).status).toBe(201)
    // Stores the value in inventory so later lines can reuse this data or behavior for the current feature.
    const inventory = await request(app).get(`/api/v1/projects/${projectId}/inventory`).set(auth(pmToken))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(inventory.body.data[0].availableStock).toBe(25)
    // Stores the value in wastage so later lines can reuse this data or behavior for the current feature.
    const wastage = await request(app).get(`/api/v1/projects/${projectId}/inventory/wastage`).set(auth(pmToken))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(wastage.body.data.items[0].recordedWastageQuantity).toBe(5)
    // Stores the value in audit so later lines can reuse this data or behavior for the current feature.
    const audit = await prisma.auditLog.findFirst({ where: { entityType: 'StockTransaction', userId: pmId }, orderBy: { id: 'desc' } })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(audit?.action).toBe('CREATE')
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('rejects insufficient stock, invalid ranges, and unassigned access', async () => {
    // Stores the value in denied so later lines can reuse this data or behavior for the current feature.
    const denied = await request(app).get(`/api/v1/projects/${projectId}/inventory`).set(auth(otherPmToken))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(denied.status).toBe(404)
    // Stores the value in inverted so later lines can reuse this data or behavior for the current feature.
    const inverted = await request(app).get(`/api/v1/projects/${projectId}/inventory/transactions?from=2026-11-10&to=2026-11-01`).set(auth(pmToken))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(inverted.status).toBe(400)
    // Stores the value in insufficient so later lines can reuse this data or behavior for the current feature.
    const insufficient = await request(app).post(`/api/v1/projects/${projectId}/inventory/transactions`).set(auth(pmToken)).send({
      // Continues the component or data expression so its related values and behavior stay grouped together.
      materialId, txnType: 'OUT', quantity: 1000, txnDate: '2026-11-10', outReason: 'USED',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(insufficient.status).toBe(422)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(insufficient.body.error.code).toBe('INSUFFICIENT_STOCK')
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('serializes concurrent stock-out attempts under the advisory lock', async () => {
    // Stores the value in results so later lines can reuse this data or behavior for the current feature.
    const results = await Promise.all([1, 2].map(() => request(app).post(`/api/v1/projects/${projectId}/inventory/transactions`).set(auth(adminToken)).send({
      // Continues the component or data expression so its related values and behavior stay grouped together.
      materialId, txnType: 'OUT', quantity: 20, txnDate: '2026-11-10', outReason: 'USED',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })))
    // Keeps only items matching this condition so the result contains relevant data.
    expect(results.filter((result) => result.status === 201)).toHaveLength(1)
    // Keeps only items matching this condition so the result contains relevant data.
    expect(results.filter((result) => result.status === 422)).toHaveLength(1)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Continues the component or data expression so its related values and behavior stay grouped together.
})
