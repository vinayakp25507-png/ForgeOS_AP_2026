// Imports beforeEach, describe, expect, it, vi from vitest so this module can reuse that component, helper, or library.
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Stores the value in mocks so later lines can reuse this data or behavior for the current feature.
const mocks = vi.hoisted(() => ({
  // Sets the projectFindFirst field so the surrounding object or component receives this setting.
  projectFindFirst: vi.fn(),
  // Sets the dailyLogFindMany field so the surrounding object or component receives this setting.
  dailyLogFindMany: vi.fn(),
  // Sets the auditLogFindMany field so the surrounding object or component receives this setting.
  auditLogFindMany: vi.fn(),
  // Sets the auditLogCount field so the surrounding object or component receives this setting.
  auditLogCount: vi.fn(),
  // Sets the transaction field so the surrounding object or component receives this setting.
  transaction: vi.fn(),
// Continues the component or data expression so its related values and behavior stay grouped together.
}))

// Calls this helper or component so the feature can perform the operation or render the control represented here.
vi.mock('../src/utils/prisma.js', () => ({
  // Sets the prisma field so the surrounding object or component receives this setting.
  prisma: {
    // Sets the project field so the surrounding object or component receives this setting.
    project: { findFirst: mocks.projectFindFirst },
    // Sets the dailyLog field so the surrounding object or component receives this setting.
    dailyLog: { findMany: mocks.dailyLogFindMany },
    // Sets the auditLog field so the surrounding object or component receives this setting.
    auditLog: { findMany: mocks.auditLogFindMany, count: mocks.auditLogCount },
    // Sets the $transaction field so the surrounding object or component receives this setting.
    $transaction: mocks.transaction,
  // Closes the current block or object so the grouped statements or settings end here.
  },
// Continues the component or data expression so its related values and behavior stay grouped together.
}))

// Imports getProjectActivity, getProjectProgressHistory, getProjectSummary from ../src/modules/projects/projects.service.js so this module can reuse that component, helper, or library.
import { getProjectActivity, getProjectProgressHistory, getProjectSummary } from '../src/modules/projects/projects.service.js'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  projectActivityQuerySchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  projectDateRangeQuerySchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  projectProgressHistoryQuerySchema,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from '../src/modules/projects/projects.validator.js'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  getLabourSummary,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  getMachinerySummary,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  getMachineryUsageHistory,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  getWorkerCountHistory,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from '../src/modules/projects/projects.service.js'

// Stores the value in admin so later lines can reuse this data or behavior for the current feature.
const admin = { id: 1, role: 'ADMIN' as const }
// Stores the value in pm so later lines can reuse this data or behavior for the current feature.
const pm = { id: 2, role: 'PM' as const }
// Stores the value in project so later lines can reuse this data or behavior for the current feature.
const project = {
  // Sets the id field so the surrounding object or component receives this setting.
  id: 3,
  // Sets the code field so the surrounding object or component receives this setting.
  code: 'DEV-001',
  // Sets the name field so the surrounding object or component receives this setting.
  name: 'Development Project',
  // Sets the status field so the surrounding object or component receives this setting.
  status: 'ACTIVE',
  // Sets the land field so the surrounding object or component receives this setting.
  land: { id: 1, name: 'Parcel' },
  // Sets the assignedPm field so the surrounding object or component receives this setting.
  assignedPm: { id: 2, name: 'PM', email: 'pm@example.test' },
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines decimal so this module can perform its named task when needed.
function decimal(value: number) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return { toNumber: () => value }
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in logs so later lines can reuse this data or behavior for the current feature.
const logs = [
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 10,
    // Sets the logDate field so the surrounding object or component receives this setting.
    logDate: new Date('2026-11-09T00:00:00.000Z'),
    // Sets the progressPercent field so the surrounding object or component receives this setting.
    progressPercent: decimal(20),
    // Sets the workSummary field so the surrounding object or component receives this setting.
    workSummary: 'Foundation work.',
    // Sets the createdBy field so the surrounding object or component receives this setting.
    createdBy: { id: 2, name: 'PM', email: 'pm@example.test', role: 'PM' },
    // Sets the createdAt field so the surrounding object or component receives this setting.
    createdAt: new Date('2026-11-09T10:00:00.000Z'),
    // Sets the updatedAt field so the surrounding object or component receives this setting.
    updatedAt: new Date('2026-11-09T10:00:00.000Z'),
    // Sets the labourEntries field so the surrounding object or component receives this setting.
    labourEntries: [{ trade: 'Mason', headCount: 4, hoursWorked: decimal(8) }],
    // Sets the machineryEntries field so the surrounding object or component receives this setting.
    machineryEntries: [{ machineName: 'Mixer', operatorName: null, hoursUsed: decimal(3), fuelLitres: decimal(5) }],
  // Closes the current block or object so the grouped statements or settings end here.
  },
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 11,
    // Sets the logDate field so the surrounding object or component receives this setting.
    logDate: new Date('2026-11-10T00:00:00.000Z'),
    // Sets the progressPercent field so the surrounding object or component receives this setting.
    progressPercent: decimal(35),
    // Sets the workSummary field so the surrounding object or component receives this setting.
    workSummary: 'Slab work.',
    // Sets the createdBy field so the surrounding object or component receives this setting.
    createdBy: { id: 1, name: 'Admin', email: 'admin@example.test', role: 'ADMIN' },
    // Sets the createdAt field so the surrounding object or component receives this setting.
    createdAt: new Date('2026-11-10T10:00:00.000Z'),
    // Sets the updatedAt field so the surrounding object or component receives this setting.
    updatedAt: new Date('2026-11-10T10:00:00.000Z'),
    // Sets the labourEntries field so the surrounding object or component receives this setting.
    labourEntries: [{ trade: 'Mason', headCount: 6, hoursWorked: decimal(7.5) }],
    // Sets the machineryEntries field so the surrounding object or component receives this setting.
    machineryEntries: [{ machineName: 'Mixer', operatorName: 'Operator', hoursUsed: decimal(4), fuelLitres: null }],
  // Closes the current block or object so the grouped statements or settings end here.
  },
// Continues the component or data expression so its related values and behavior stay grouped together.
]

// Calls this helper or component so the feature can perform the operation or render the control represented here.
beforeEach(() => {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  vi.clearAllMocks()
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.transaction.mockImplementation(async (operations: Array<Promise<unknown>>) => Promise.all(operations))
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.projectFindFirst.mockResolvedValue(project)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.dailyLogFindMany.mockResolvedValue(logs)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.auditLogFindMany.mockResolvedValue([])
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.auditLogCount.mockResolvedValue(0)
// Continues the component or data expression so its related values and behavior stay grouped together.
})

// Calls this helper or component so the feature can perform the operation or render the control represented here.
describe('project progress history and summary', () => {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('allows ADMIN and assigned PM to read chronological progress history', async () => {
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(getProjectProgressHistory(admin, 3, {})).resolves.toEqual(
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      expect.arrayContaining([expect.objectContaining({ id: 10 }), expect.objectContaining({ id: 11 })]),
    // Closes this function call or grouped expression so the surrounding code can continue.
    )
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(getProjectProgressHistory(pm, 3, {})).resolves.toHaveLength(2)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.projectFindFirst).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 3, assignedPmId: pm.id } }))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.dailyLogFindMany).toHaveBeenCalledWith(expect.objectContaining({ orderBy: { logDate: 'asc' } }))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('rejects an unassigned PM and nonexistent project', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.projectFindFirst.mockResolvedValueOnce(null).mockResolvedValueOnce(null)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(getProjectProgressHistory(pm, 3, {})).rejects.toMatchObject({ code: 'NOT_FOUND', status: 404 })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(getProjectSummary(pm, 99)).rejects.toMatchObject({ code: 'NOT_FOUND', status: 404 })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('returns a safe empty summary when a project has no daily logs', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.dailyLogFindMany.mockResolvedValue([])
    // Stores the value in result so later lines can reuse this data or behavior for the current feature.
    const result = await getProjectSummary(admin, 3)

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(result).toMatchObject({
      // Continues the component or data expression so its related values and behavior stay grouped together.
      project,
      // Sets the latestProgressPercent field so the surrounding object or component receives this setting.
      latestProgressPercent: 0,
      // Sets the latestLogDate field so the surrounding object or component receives this setting.
      latestLogDate: null,
      // Sets the totalDailyLogs field so the surrounding object or component receives this setting.
      totalDailyLogs: 0,
      // Sets the totalLabourHeadCount field so the surrounding object or component receives this setting.
      totalLabourHeadCount: 0,
      // Sets the totalLabourHours field so the surrounding object or component receives this setting.
      totalLabourHours: 0,
      // Sets the totalMachineryHours field so the surrounding object or component receives this setting.
      totalMachineryHours: 0,
      // Sets the totalMachineryFuel field so the surrounding object or component receives this setting.
      totalMachineryFuel: 0,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('calculates latest progress and labour/machinery totals', async () => {
    // Stores the value in result so later lines can reuse this data or behavior for the current feature.
    const result = await getProjectSummary(admin, 3)

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(result.latestProgressPercent).toBe(logs[0].progressPercent)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(result.latestLogDate).toEqual(logs[0].logDate)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(result.totalDailyLogs).toBe(2)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(result.totalLabourHeadCount).toBe(10)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(result.totalLabourHours).toBe(15.5)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(result.totalMachineryHours).toBe(7)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(result.totalMachineryFuel).toBe(5)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('validates optional progress-history date filters', () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(projectProgressHistoryQuerySchema.safeParse({}).success).toBe(true)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(projectProgressHistoryQuerySchema.safeParse({ from: '2026-11-10', to: '2026-11-09' }).success).toBe(false)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(projectProgressHistoryQuerySchema.safeParse({ from: 'bad-date' }).success).toBe(false)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Continues the component or data expression so its related values and behavior stay grouped together.
})

// Calls this helper or component so the feature can perform the operation or render the control represented here.
describe('project activity timeline', () => {
  // Stores the value in activities so later lines can reuse this data or behavior for the current feature.
  const activities = [
    // Opens a block or object so its related statements or settings can be grouped together.
    {
      // Sets the id field so the surrounding object or component receives this setting.
      id: 2,
      // Sets the action field so the surrounding object or component receives this setting.
      action: 'UPDATE',
      // Sets the entityType field so the surrounding object or component receives this setting.
      entityType: 'DailyLog',
      // Sets the entityId field so the surrounding object or component receives this setting.
      entityId: 11,
      // Sets the oldValues field so the surrounding object or component receives this setting.
      oldValues: { projectId: 3, workSummary: 'Old' },
      // Sets the newValues field so the surrounding object or component receives this setting.
      newValues: { projectId: 3, workSummary: 'New' },
      // Sets the createdAt field so the surrounding object or component receives this setting.
      createdAt: new Date('2026-11-11T12:00:00.000Z'),
      // Sets the user field so the surrounding object or component receives this setting.
      user: { id: 2, name: 'PM' },
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Opens a block or object so its related statements or settings can be grouped together.
    {
      // Sets the id field so the surrounding object or component receives this setting.
      id: 1,
      // Sets the action field so the surrounding object or component receives this setting.
      action: 'CREATE',
      // Sets the entityType field so the surrounding object or component receives this setting.
      entityType: 'Project',
      // Sets the entityId field so the surrounding object or component receives this setting.
      entityId: 3,
      // Sets the oldValues field so the surrounding object or component receives this setting.
      oldValues: null,
      // Sets the newValues field so the surrounding object or component receives this setting.
      newValues: { name: 'Development Project' },
      // Sets the createdAt field so the surrounding object or component receives this setting.
      createdAt: new Date('2026-11-10T12:00:00.000Z'),
      // Sets the user field so the surrounding object or component receives this setting.
      user: { id: 1, name: 'Admin' },
    // Closes the current block or object so the grouped statements or settings end here.
    },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ]

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('allows ADMIN and assigned PM, scopes multiple entity types, and paginates', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.auditLogFindMany.mockResolvedValue(activities)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.auditLogCount.mockResolvedValue(3)

    // Stores the value in result so later lines can reuse this data or behavior for the current feature.
    const result = await getProjectActivity(admin, 3, { page: 1, limit: 2 })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(result.activities).toEqual([
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      expect.objectContaining({ id: 2, userId: 2, userName: 'PM', oldData: activities[0].oldValues }),
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      expect.objectContaining({ id: 1, entityType: 'Project', newData: activities[1].newValues }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ])
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(result.meta).toEqual({ page: 1, limit: 2, total: 3, totalPages: 2 })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.auditLogFindMany).toHaveBeenCalledWith(expect.objectContaining({
      // Sets the where field so the surrounding object or component receives this setting.
      where: expect.objectContaining({
        // Sets the OR field so the surrounding object or component receives this setting.
        OR: expect.arrayContaining([
          // Continues the component or data expression so its related values and behavior stay grouped together.
          { entityType: 'Project', entityId: 3 },
          // Continues the component or data expression so its related values and behavior stay grouped together.
          { oldValues: { path: ['projectId'], equals: 3 } },
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ]),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      }),
      // Sets the orderBy field so the surrounding object or component receives this setting.
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      // Sets the skip field so the surrounding object or component receives this setting.
      skip: 0,
      // Sets the take field so the surrounding object or component receives this setting.
      take: 2,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }))

    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(getProjectActivity(pm, 3, { page: 2, limit: 1 })).resolves.toMatchObject({
      // Sets the meta field so the surrounding object or component receives this setting.
      meta: { page: 2, limit: 1 },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.projectFindFirst).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 3, assignedPmId: pm.id } }))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('returns 404 for unassigned or nonexistent projects and handles empty history', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.projectFindFirst.mockResolvedValueOnce(null).mockResolvedValueOnce(null).mockResolvedValueOnce(project)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(getProjectActivity(pm, 3, { page: 1, limit: 20 })).rejects.toMatchObject({ code: 'NOT_FOUND', status: 404 })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(getProjectActivity(admin, 99, { page: 1, limit: 20 })).rejects.toMatchObject({ code: 'NOT_FOUND', status: 404 })

    // Stores the value in result so later lines can reuse this data or behavior for the current feature.
    const result = await getProjectActivity(admin, 3, { page: 1, limit: 20 })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(result).toMatchObject({ activities: [], meta: { total: 0, totalPages: 0 } })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('validates activity pagination parameters', () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(projectActivityQuerySchema.parse({})).toEqual({ page: 1, limit: 20 })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(projectActivityQuerySchema.safeParse({ page: 0 }).success).toBe(false)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(projectActivityQuerySchema.safeParse({ limit: 101 }).success).toBe(false)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(projectActivityQuerySchema.safeParse({ page: 'bad' }).success).toBe(false)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Continues the component or data expression so its related values and behavior stay grouped together.
})

// Calls this helper or component so the feature can perform the operation or render the control represented here.
describe('labour and machinery reporting', () => {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('calculates labour totals and trade grouping for ADMIN and assigned PM', async () => {
    // Stores the value in adminResult so later lines can reuse this data or behavior for the current feature.
    const adminResult = await getLabourSummary(admin, 3, {})
    // Stores the value in pmResult so later lines can reuse this data or behavior for the current feature.
    const pmResult = await getLabourSummary(pm, 3, { from: '2026-11-09', to: '2026-11-10' })

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(adminResult).toMatchObject({
      // Sets the totalWorkerCount field so the surrounding object or component receives this setting.
      totalWorkerCount: 10,
      // Sets the totalLabourHours field so the surrounding object or component receives this setting.
      totalLabourHours: 15.5,
      // Sets the totalLabourEntries field so the surrounding object or component receives this setting.
      totalLabourEntries: 2,
      // Sets the byTrade field so the surrounding object or component receives this setting.
      byTrade: [
        // Continues the component or data expression so its related values and behavior stay grouped together.
        { trade: 'Mason', workerCount: 10, labourHours: 15.5, entries: 2 },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ],
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(pmResult.totalWorkerCount).toBe(10)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.dailyLogFindMany).toHaveBeenCalledWith(expect.objectContaining({
      // Sets the where field so the surrounding object or component receives this setting.
      where: expect.objectContaining({ projectId: 3, logDate: expect.any(Object) }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('calculates machinery totals and machine grouping', async () => {
    // Stores the value in result so later lines can reuse this data or behavior for the current feature.
    const result = await getMachinerySummary(admin, 3, {})

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(result).toMatchObject({
      // Sets the totalMachineryHours field so the surrounding object or component receives this setting.
      totalMachineryHours: 7,
      // Sets the totalFuelConsumption field so the surrounding object or component receives this setting.
      totalFuelConsumption: 5,
      // Sets the totalMachineryEntries field so the surrounding object or component receives this setting.
      totalMachineryEntries: 2,
      // Sets the byMachine field so the surrounding object or component receives this setting.
      byMachine: [
        // Continues the component or data expression so its related values and behavior stay grouped together.
        { machineName: 'Mixer', hoursUsed: 7, fuelConsumption: 5, entries: 2 },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ],
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('returns chronological worker and machinery histories', async () => {
    // Stores the value in workerHistory so later lines can reuse this data or behavior for the current feature.
    const workerHistory = await getWorkerCountHistory(admin, 3, {})
    // Stores the value in machineryHistory so later lines can reuse this data or behavior for the current feature.
    const machineryHistory = await getMachineryUsageHistory(admin, 3, {})

    // Transforms each collection item so the corresponding values or interface elements can be produced.
    expect(workerHistory.map((entry) => entry.dailyLogId)).toEqual([10, 11])
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(workerHistory[0]).toMatchObject({ totalWorkerCount: 4, labourHours: 8 })
    // Transforms each collection item so the corresponding values or interface elements can be produced.
    expect(machineryHistory.map((entry) => entry.dailyLogId)).toEqual([10, 11])
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(machineryHistory[0]).toMatchObject({
      // Sets the machineName field so the surrounding object or component receives this setting.
      machineName: 'Mixer',
      // Sets the hoursUsed field so the surrounding object or component receives this setting.
      hoursUsed: 3,
      // Sets the fuelConsumption field so the surrounding object or component receives this setting.
      fuelConsumption: 5,
      // Sets the operatorName field so the surrounding object or component receives this setting.
      operatorName: null,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('handles empty reporting history and validates date ranges', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.dailyLogFindMany.mockResolvedValue([])
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(getLabourSummary(admin, 3, {})).resolves.toMatchObject({
      // Sets the totalWorkerCount field so the surrounding object or component receives this setting.
      totalWorkerCount: 0,
      // Sets the totalLabourHours field so the surrounding object or component receives this setting.
      totalLabourHours: 0,
      // Sets the totalLabourEntries field so the surrounding object or component receives this setting.
      totalLabourEntries: 0,
      // Sets the byTrade field so the surrounding object or component receives this setting.
      byTrade: [],
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(getMachinerySummary(admin, 3, {})).resolves.toMatchObject({
      // Sets the totalMachineryHours field so the surrounding object or component receives this setting.
      totalMachineryHours: 0,
      // Sets the totalFuelConsumption field so the surrounding object or component receives this setting.
      totalFuelConsumption: 0,
      // Sets the totalMachineryEntries field so the surrounding object or component receives this setting.
      totalMachineryEntries: 0,
      // Sets the byMachine field so the surrounding object or component receives this setting.
      byMachine: [],
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(projectDateRangeQuerySchema.safeParse({ from: '2026-11-10', to: '2026-11-09' }).success).toBe(false)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(projectDateRangeQuerySchema.safeParse({ from: 'invalid' }).success).toBe(false)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('denies unassigned PMs and nonexistent projects', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.projectFindFirst.mockResolvedValueOnce(null).mockResolvedValueOnce(null)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(getWorkerCountHistory(pm, 3, {})).rejects.toMatchObject({ code: 'NOT_FOUND', status: 404 })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(getMachineryUsageHistory(admin, 999, {})).rejects.toMatchObject({ code: 'NOT_FOUND', status: 404 })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Continues the component or data expression so its related values and behavior stay grouped together.
})
