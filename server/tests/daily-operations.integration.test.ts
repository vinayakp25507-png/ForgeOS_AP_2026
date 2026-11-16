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

// Stores the value in integrationEnabled so later lines can reuse this data or behavior for the current feature.
const integrationEnabled = (process.env.DATABASE_URL ?? '').includes(':55432/')
// Stores the value in describeIntegration so later lines can reuse this data or behavior for the current feature.
const describeIntegration = describe.skipIf(!integrationEnabled)
// Stores the value in prisma so later lines can reuse this data or behavior for the current feature.
const prisma = new PrismaClient()
// Stores the value in app so later lines can reuse this data or behavior for the current feature.
const app = createApp()
// Stores the value in marker so later lines can reuse this data or behavior for the current feature.
const marker = `integration-${Date.now()}`

// Stores the value in adminId so later lines can reuse this data or behavior for the current feature.
let adminId: number
// Stores the value in pmId so later lines can reuse this data or behavior for the current feature.
let pmId: number
// Stores the value in unassignedPmId so later lines can reuse this data or behavior for the current feature.
let unassignedPmId: number
// Stores the value in landId so later lines can reuse this data or behavior for the current feature.
let landId: number
// Stores the value in projectId so later lines can reuse this data or behavior for the current feature.
let projectId: number
// Stores the value in unassignedProjectId so later lines can reuse this data or behavior for the current feature.
let unassignedProjectId: number
// Stores the value in adminToken so later lines can reuse this data or behavior for the current feature.
let adminToken: string
// Stores the value in pmToken so later lines can reuse this data or behavior for the current feature.
let pmToken: string
// Stores the value in unassignedPmToken so later lines can reuse this data or behavior for the current feature.
let unassignedPmToken: string

// Defines auth so this module can perform its named task when needed.
function auth(token: string) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return { Authorization: `Bearer ${token}` }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines numberValue so this module can perform its named task when needed.
function numberValue(value: unknown) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return Number(value)
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines createUser so this module can perform its named task when needed.
async function createUser(name: string, role: Role) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.user.create({
    // Sets the data field so the surrounding object or component receives this setting.
    data: {
      // Continues the component or data expression so its related values and behavior stay grouped together.
      name,
      // Sets the email field so the surrounding object or component receives this setting.
      email: `${name.toLowerCase().replaceAll(' ', '.')}@${marker}.test`,
      // Sets the passwordHash field so the surrounding object or component receives this setting.
      passwordHash: 'integration-only',
      // Continues the component or data expression so its related values and behavior stay grouped together.
      role,
    // Closes the current block or object so the grouped statements or settings end here.
    },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Calls this helper or component so the feature can perform the operation or render the control represented here.
describeIntegration('Daily Site Operations PostgreSQL integration', () => {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  beforeAll(async () => {
    // Stores the value in admin so later lines can reuse this data or behavior for the current feature.
    const admin = await createUser('Integration Admin', Role.ADMIN)
    // Stores the value in pm so later lines can reuse this data or behavior for the current feature.
    const pm = await createUser('Integration PM', Role.PM)
    // Stores the value in unassignedPm so later lines can reuse this data or behavior for the current feature.
    const unassignedPm = await createUser('Integration Unassigned PM', Role.PM)
    // Continues the component or data expression so its related values and behavior stay grouped together.
    adminId = admin.id
    // Continues the component or data expression so its related values and behavior stay grouped together.
    pmId = pm.id
    // Continues the component or data expression so its related values and behavior stay grouped together.
    unassignedPmId = unassignedPm.id
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    adminToken = createAccessToken(admin)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    pmToken = createAccessToken(pm)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    unassignedPmToken = createAccessToken(unassignedPm)

    // Stores the value in land so later lines can reuse this data or behavior for the current feature.
    const land = await prisma.land.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Sets the name field so the surrounding object or component receives this setting.
        name: `${marker} Land`,
        // Sets the city field so the surrounding object or component receives this setting.
        city: 'Integration City',
        // Sets the state field so the surrounding object or component receives this setting.
        state: 'Integration State',
        // Sets the areaValue field so the surrounding object or component receives this setting.
        areaValue: 1,
        // Sets the areaUnit field so the surrounding object or component receives this setting.
        areaUnit: 'ACRE',
        // Sets the createdById field so the surrounding object or component receives this setting.
        createdById: adminId,
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Continues the component or data expression so its related values and behavior stay grouped together.
    landId = land.id

    // Stores the value in project so later lines can reuse this data or behavior for the current feature.
    const project = await prisma.project.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Continues the component or data expression so its related values and behavior stay grouped together.
        landId,
        // Sets the code field so the surrounding object or component receives this setting.
        code: `${marker}-A`,
        // Sets the name field so the surrounding object or component receives this setting.
        name: `${marker} Assigned Project`,
        // Sets the status field so the surrounding object or component receives this setting.
        status: 'ACTIVE',
        // Sets the assignedPmId field so the surrounding object or component receives this setting.
        assignedPmId: pmId,
        // Sets the createdById field so the surrounding object or component receives this setting.
        createdById: adminId,
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Continues the component or data expression so its related values and behavior stay grouped together.
    projectId = project.id

    // Stores the value in unassignedProject so later lines can reuse this data or behavior for the current feature.
    const unassignedProject = await prisma.project.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Continues the component or data expression so its related values and behavior stay grouped together.
        landId,
        // Sets the code field so the surrounding object or component receives this setting.
        code: `${marker}-U`,
        // Sets the name field so the surrounding object or component receives this setting.
        name: `${marker} Unassigned Project`,
        // Sets the status field so the surrounding object or component receives this setting.
        status: 'ACTIVE',
        // Sets the assignedPmId field so the surrounding object or component receives this setting.
        assignedPmId: unassignedPmId,
        // Sets the createdById field so the surrounding object or component receives this setting.
        createdById: adminId,
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Continues the component or data expression so its related values and behavior stay grouped together.
    unassignedProjectId = unassignedProject.id
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  afterAll(async () => {
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.$executeRawUnsafe('DROP TRIGGER IF EXISTS test_daily_log_labour_failure ON labour_entries')
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.$executeRawUnsafe('DROP FUNCTION IF EXISTS test_fail_daily_log_labour()')
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.$executeRawUnsafe('DROP TRIGGER IF EXISTS test_milestone_audit_failure ON audit_logs')
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.$executeRawUnsafe('DROP FUNCTION IF EXISTS test_fail_milestone_audit()')
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.auditLog.deleteMany({ where: { userId: { in: [adminId, pmId, unassignedPmId] } } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.projectMilestone.deleteMany({ where: { projectId: { in: [projectId, unassignedProjectId] } } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.dailyLog.deleteMany({ where: { projectId: { in: [projectId, unassignedProjectId] } } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.project.deleteMany({ where: { id: { in: [projectId, unassignedProjectId] } } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.land.delete({ where: { id: landId } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.user.deleteMany({ where: { id: { in: [adminId, pmId, unassignedPmId] } } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.$disconnect()
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('creates, reads, updates, and deletes daily logs with nested entries', async () => {
    // Stores the value in create so later lines can reuse this data or behavior for the current feature.
    const create = await request(app)
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .post(`/api/v1/projects/${projectId}/daily-logs`)
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .set(auth(pmToken))
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .send({
        // Sets the logDate field so the surrounding object or component receives this setting.
        logDate: '2026-11-09',
        // Sets the progressPercent field so the surrounding object or component receives this setting.
        progressPercent: 20,
        // Sets the workSummary field so the surrounding object or component receives this setting.
        workSummary: 'Foundation work',
        // Sets the labourEntries field so the surrounding object or component receives this setting.
        labourEntries: [{ trade: 'Mason', headCount: 4, hoursWorked: 8 }],
        // Sets the machineryEntries field so the surrounding object or component receives this setting.
        machineryEntries: [{ machineName: 'Mixer', operatorName: 'Operator', hoursUsed: 3, fuelLitres: 5 }],
      // Continues the component or data expression so its related values and behavior stay grouped together.
      })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(create.status).toBe(201)
    // Stores the value in logId so later lines can reuse this data or behavior for the current feature.
    const logId = create.body.data.id

    // Stores the value in detail so later lines can reuse this data or behavior for the current feature.
    const detail = await request(app).get(`/api/v1/daily-logs/${logId}`).set(auth(pmToken))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(detail.status).toBe(200)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(detail.body.data.labourEntries).toHaveLength(1)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(detail.body.data.machineryEntries).toHaveLength(1)

    // Stores the value in update so later lines can reuse this data or behavior for the current feature.
    const update = await request(app)
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .patch(`/api/v1/daily-logs/${logId}`)
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .set(auth(pmToken))
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .send({
        // Sets the progressPercent field so the surrounding object or component receives this setting.
        progressPercent: 25,
        // Sets the workSummary field so the surrounding object or component receives this setting.
        workSummary: 'Foundation updated',
        // Sets the labourEntries field so the surrounding object or component receives this setting.
        labourEntries: [{ trade: 'Helper', headCount: 6, hoursWorked: 7 }],
        // Sets the machineryEntries field so the surrounding object or component receives this setting.
        machineryEntries: [{ machineName: 'Crane', hoursUsed: 4, fuelLitres: 2 }],
      // Continues the component or data expression so its related values and behavior stay grouped together.
      })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(update.status).toBe(200)

    // Stores the value in list so later lines can reuse this data or behavior for the current feature.
    const list = await request(app).get(`/api/v1/projects/${projectId}/daily-logs`).set(auth(pmToken))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(list.status).toBe(200)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(list.body.data[0].labourHeadCountTotal).toBe(6)

    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).delete(`/api/v1/daily-logs/${logId}`).set(auth(pmToken))).status).toBe(403)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).delete(`/api/v1/daily-logs/${logId}`).set(auth(adminToken))).status).toBe(200)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('enforces access, date rules, duplicate dates, progress rules, and reporting APIs', async () => {
    // Stores the value in first so later lines can reuse this data or behavior for the current feature.
    const first = await request(app)
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .post(`/api/v1/projects/${projectId}/daily-logs`)
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .set(auth(adminToken))
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .send({
        // Sets the logDate field so the surrounding object or component receives this setting.
        logDate: '2026-11-08',
        // Sets the progressPercent field so the surrounding object or component receives this setting.
        progressPercent: 10,
        // Sets the workSummary field so the surrounding object or component receives this setting.
        workSummary: 'Initial work',
        // Sets the labourEntries field so the surrounding object or component receives this setting.
        labourEntries: [
          // Continues the component or data expression so its related values and behavior stay grouped together.
          { trade: 'Mason', headCount: 3, hoursWorked: 8 },
          // Continues the component or data expression so its related values and behavior stay grouped together.
          { trade: 'Helper', headCount: 2, hoursWorked: 6 },
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ],
        // Sets the machineryEntries field so the surrounding object or component receives this setting.
        machineryEntries: [{ machineName: 'Mixer', hoursUsed: 2, fuelLitres: 4 }],
      // Continues the component or data expression so its related values and behavior stay grouped together.
      })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(first.status).toBe(201)
    // Stores the value in logId so later lines can reuse this data or behavior for the current feature.
    const logId = first.body.data.id

    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).post(`/api/v1/projects/${projectId}/daily-logs`).set(auth(pmToken)).send({
      // Sets the logDate field so the surrounding object or component receives this setting.
      logDate: '2026-11-08', progressPercent: 11, workSummary: 'Duplicate',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })).status).toBe(409)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).post(`/api/v1/projects/${projectId}/daily-logs`).set(auth(pmToken)).send({
      // Sets the logDate field so the surrounding object or component receives this setting.
      logDate: '2026-11-12', progressPercent: 12, workSummary: 'Future',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })).status).toBe(422)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).post(`/api/v1/projects/${projectId}/daily-logs`).set(auth(pmToken)).send({
      // Sets the logDate field so the surrounding object or component receives this setting.
      logDate: '2026-11-09', progressPercent: 5, workSummary: 'Regressing',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })).status).toBe(422)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).get(`/api/v1/projects/${unassignedProjectId}/daily-logs`).set(auth(pmToken))).status).toBe(403)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).get(`/api/v1/projects/${projectId}/summary`).set(auth(unassignedPmToken))).status).toBe(404)

    // Stores the value in history so later lines can reuse this data or behavior for the current feature.
    const history = await request(app).get(`/api/v1/projects/${projectId}/progress-history`).set(auth(pmToken))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(history.status).toBe(200)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(history.body.data).toEqual(expect.arrayContaining([expect.objectContaining({ id: logId })]))

    // Stores the value in summary so later lines can reuse this data or behavior for the current feature.
    const summary = await request(app).get(`/api/v1/projects/${projectId}/summary`).set(auth(adminToken))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(summary.status).toBe(200)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(summary.body.data.totalLabourHeadCount).toBe(5)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(numberValue(summary.body.data.totalMachineryHours)).toBe(2)

    // Stores the value in labour so later lines can reuse this data or behavior for the current feature.
    const labour = await request(app).get(`/api/v1/projects/${projectId}/labour-summary`).set(auth(pmToken))
    // Stores the value in machinery so later lines can reuse this data or behavior for the current feature.
    const machinery = await request(app).get(`/api/v1/projects/${projectId}/machinery-summary`).set(auth(pmToken))
    // Stores the value in workerHistory so later lines can reuse this data or behavior for the current feature.
    const workerHistory = await request(app).get(`/api/v1/projects/${projectId}/worker-count-history`).set(auth(pmToken))
    // Stores the value in machineryHistory so later lines can reuse this data or behavior for the current feature.
    const machineryHistory = await request(app).get(`/api/v1/projects/${projectId}/machinery-usage-history`).set(auth(pmToken))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(labour.status).toBe(200)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(labour.body.data.totalWorkerCount).toBe(5)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(machinery.status).toBe(200)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(numberValue(machinery.body.data.totalMachineryHours)).toBe(2)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(workerHistory.status).toBe(200)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(workerHistory.body.data[0].totalWorkerCount).toBe(5)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(machineryHistory.status).toBe(200)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(machineryHistory.body.data[0].machineName).toBe('Mixer')

    // Stores the value in activity so later lines can reuse this data or behavior for the current feature.
    const activity = await request(app).get(`/api/v1/projects/${projectId}/activity`).set(auth(adminToken))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(activity.status).toBe(200)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(activity.body.data).toEqual(expect.arrayContaining([
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      expect.objectContaining({ entityType: 'DailyLog', entityId: logId }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ]))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('enforces the PM 48-hour edit restriction', async () => {
    // Stores the value in created so later lines can reuse this data or behavior for the current feature.
    const created = await prisma.dailyLog.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Continues the component or data expression so its related values and behavior stay grouped together.
        projectId,
        // Sets the logDate field so the surrounding object or component receives this setting.
        logDate: new Date('2026-11-06T00:00:00.000Z'),
        // Sets the progressPercent field so the surrounding object or component receives this setting.
        progressPercent: 15,
        // Sets the workSummary field so the surrounding object or component receives this setting.
        workSummary: 'Old log',
        // Sets the createdById field so the surrounding object or component receives this setting.
        createdById: adminId,
        // Sets the createdAt field so the surrounding object or component receives this setting.
        createdAt: new Date(Date.now() - 49 * 60 * 60 * 1000),
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Stores the value in response so later lines can reuse this data or behavior for the current feature.
    const response = await request(app)
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .patch(`/api/v1/daily-logs/${created.id}`)
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .set(auth(pmToken))
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .send({ workSummary: 'Too late' })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(response.status).toBe(422)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('supports milestone CRUD, project scoping, and audit logging', async () => {
    // Stores the value in create so later lines can reuse this data or behavior for the current feature.
    const create = await request(app)
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .post(`/api/v1/projects/${projectId}/milestones`)
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .set(auth(pmToken))
      // Continues the component or data expression so its related values and behavior stay grouped together.
      .send({
        // Sets the name field so the surrounding object or component receives this setting.
        name: 'Foundation',
        // Sets the sequence field so the surrounding object or component receives this setting.
        sequence: 1,
        // Sets the plannedStartDate field so the surrounding object or component receives this setting.
        plannedStartDate: '2026-11-01',
        // Sets the plannedEndDate field so the surrounding object or component receives this setting.
        plannedEndDate: '2026-11-30',
        // Sets the progressPercent field so the surrounding object or component receives this setting.
        progressPercent: 0,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(create.status).toBe(201)
    // Stores the value in milestoneId so later lines can reuse this data or behavior for the current feature.
    const milestoneId = create.body.data.id

    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).get(`/api/v1/projects/${projectId}/milestones`).set(auth(adminToken))).status).toBe(200)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).get(`/api/v1/milestones/${milestoneId}`).set(auth(pmToken))).status).toBe(200)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).patch(`/api/v1/milestones/${milestoneId}`).set(auth(pmToken)).send({
      // Sets the progressPercent field so the surrounding object or component receives this setting.
      progressPercent: 50, status: 'IN_PROGRESS',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })).status).toBe(200)
    // Stores the value in activity so later lines can reuse this data or behavior for the current feature.
    const activity = await request(app).get(`/api/v1/projects/${projectId}/activity`).set(auth(pmToken))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(activity.body.data).toEqual(expect.arrayContaining([
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      expect.objectContaining({ entityType: 'ProjectMilestone', entityId: milestoneId }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ]))
    // Waits for the asynchronous result before using it, so later work receives completed data.
    expect((await request(app).delete(`/api/v1/milestones/${milestoneId}`).set(auth(adminToken))).status).toBe(200)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('rolls back nested daily-log writes when a child insert fails', async () => {
    await prisma.$executeRawUnsafe(`CREATE OR REPLACE FUNCTION test_fail_daily_log_labour()
      RETURNS trigger LANGUAGE plpgsql AS $$
      BEGIN RAISE EXCEPTION 'integration child failure'; END;
      $$`)
    await prisma.$executeRawUnsafe(`CREATE TRIGGER test_daily_log_labour_failure
      AFTER INSERT ON labour_entries
      FOR EACH ROW EXECUTE FUNCTION test_fail_daily_log_labour()`)
    // Starts an error-handling region so failures can be caught and handled safely.
    try {
      // Stores the value in beforeAuditCount so later lines can reuse this data or behavior for the current feature.
      const beforeAuditCount = await prisma.auditLog.count({ where: { userId: adminId, entityType: 'DailyLog' } })
      // Stores the value in response so later lines can reuse this data or behavior for the current feature.
      const response = await request(app)
        // Continues the component or data expression so its related values and behavior stay grouped together.
        .post(`/api/v1/projects/${projectId}/daily-logs`)
        // Continues the component or data expression so its related values and behavior stay grouped together.
        .set(auth(adminToken))
        // Continues the component or data expression so its related values and behavior stay grouped together.
        .send({
          // Sets the logDate field so the surrounding object or component receives this setting.
          logDate: '2026-11-05',
          // Sets the progressPercent field so the surrounding object or component receives this setting.
          progressPercent: 5,
          // Sets the workSummary field so the surrounding object or component receives this setting.
          workSummary: 'Should roll back',
          // Sets the labourEntries field so the surrounding object or component receives this setting.
          labourEntries: [{ trade: 'Mason', headCount: 1, hoursWorked: 1 }],
        // Continues the component or data expression so its related values and behavior stay grouped together.
        })
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      expect(response.status).toBe(500)
      // Waits for the asynchronous result before using it, so later work receives completed data.
      expect(await prisma.dailyLog.count({ where: { projectId, logDate: new Date('2026-11-05T00:00:00.000Z') } })).toBe(0)
      // Waits for the asynchronous result before using it, so later work receives completed data.
      expect(await prisma.auditLog.count({ where: { userId: adminId, entityType: 'DailyLog' } })).toBe(beforeAuditCount)
    // Continues the component or data expression so its related values and behavior stay grouped together.
    } finally {
      // Waits for the asynchronous result before using it, so later work receives completed data.
      await prisma.$executeRawUnsafe('DROP TRIGGER IF EXISTS test_daily_log_labour_failure ON labour_entries')
      // Waits for the asynchronous result before using it, so later work receives completed data.
      await prisma.$executeRawUnsafe('DROP FUNCTION IF EXISTS test_fail_daily_log_labour()')
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('rolls back milestone creation when audit logging fails', async () => {
    await prisma.$executeRawUnsafe(`CREATE OR REPLACE FUNCTION test_fail_milestone_audit()
      RETURNS trigger LANGUAGE plpgsql AS $$
      BEGIN
        IF NEW.entity_type = 'ProjectMilestone' THEN RAISE EXCEPTION 'integration audit failure'; END IF;
        RETURN NEW;
      END;
      $$`)
    await prisma.$executeRawUnsafe(`CREATE TRIGGER test_milestone_audit_failure
      BEFORE INSERT ON audit_logs
      FOR EACH ROW EXECUTE FUNCTION test_fail_milestone_audit()`)
    // Starts an error-handling region so failures can be caught and handled safely.
    try {
      // Stores the value in response so later lines can reuse this data or behavior for the current feature.
      const response = await request(app)
        // Continues the component or data expression so its related values and behavior stay grouped together.
        .post(`/api/v1/projects/${projectId}/milestones`)
        // Continues the component or data expression so its related values and behavior stay grouped together.
        .set(auth(adminToken))
        // Continues the component or data expression so its related values and behavior stay grouped together.
        .send({ name: 'Rollback milestone', sequence: 99 })
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      expect(response.status).toBe(500)
      // Waits for the asynchronous result before using it, so later work receives completed data.
      expect(await prisma.projectMilestone.count({ where: { projectId, sequence: 99 } })).toBe(0)
    // Continues the component or data expression so its related values and behavior stay grouped together.
    } finally {
      // Waits for the asynchronous result before using it, so later work receives completed data.
      await prisma.$executeRawUnsafe('DROP TRIGGER IF EXISTS test_milestone_audit_failure ON audit_logs')
      // Waits for the asynchronous result before using it, so later work receives completed data.
      await prisma.$executeRawUnsafe('DROP FUNCTION IF EXISTS test_fail_milestone_audit()')
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Continues the component or data expression so its related values and behavior stay grouped together.
})
