// Imports beforeEach, describe, expect, it, vi from vitest so this module can reuse that component, helper, or library.
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Stores the value in mocks so later lines can reuse this data or behavior for the current feature.
const mocks = vi.hoisted(() => ({
  // Sets the projectFindUnique field so the surrounding object or component receives this setting.
  projectFindUnique: vi.fn(),
  // Sets the dailyLogFindUnique field so the surrounding object or component receives this setting.
  dailyLogFindUnique: vi.fn(),
  // Sets the dailyLogFindFirst field so the surrounding object or component receives this setting.
  dailyLogFindFirst: vi.fn(),
  // Sets the dailyLogFindMany field so the surrounding object or component receives this setting.
  dailyLogFindMany: vi.fn(),
  // Sets the dailyLogCount field so the surrounding object or component receives this setting.
  dailyLogCount: vi.fn(),
  // Sets the dailyLogCreate field so the surrounding object or component receives this setting.
  dailyLogCreate: vi.fn(),
  // Sets the dailyLogUpdate field so the surrounding object or component receives this setting.
  dailyLogUpdate: vi.fn(),
  // Sets the dailyLogDelete field so the surrounding object or component receives this setting.
  dailyLogDelete: vi.fn(),
  // Sets the auditLogCreate field so the surrounding object or component receives this setting.
  auditLogCreate: vi.fn(),
  // Sets the labourDeleteMany field so the surrounding object or component receives this setting.
  labourDeleteMany: vi.fn(),
  // Sets the machineryDeleteMany field so the surrounding object or component receives this setting.
  machineryDeleteMany: vi.fn(),
  // Sets the transaction field so the surrounding object or component receives this setting.
  transaction: vi.fn(),
// Continues the component or data expression so its related values and behavior stay grouped together.
}))

// Calls this helper or component so the feature can perform the operation or render the control represented here.
vi.mock('../src/utils/prisma.js', () => ({
  // Sets the prisma field so the surrounding object or component receives this setting.
  prisma: {
    // Sets the project field so the surrounding object or component receives this setting.
    project: { findUnique: mocks.projectFindUnique },
    // Sets the dailyLog field so the surrounding object or component receives this setting.
    dailyLog: {
      // Sets the findUnique field so the surrounding object or component receives this setting.
      findUnique: mocks.dailyLogFindUnique,
      // Sets the findFirst field so the surrounding object or component receives this setting.
      findFirst: mocks.dailyLogFindFirst,
      // Sets the findMany field so the surrounding object or component receives this setting.
      findMany: mocks.dailyLogFindMany,
      // Sets the count field so the surrounding object or component receives this setting.
      count: mocks.dailyLogCount,
      // Sets the create field so the surrounding object or component receives this setting.
      create: mocks.dailyLogCreate,
      // Sets the update field so the surrounding object or component receives this setting.
      update: mocks.dailyLogUpdate,
      // Sets the delete field so the surrounding object or component receives this setting.
      delete: mocks.dailyLogDelete,
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the $transaction field so the surrounding object or component receives this setting.
    $transaction: mocks.transaction,
  // Closes the current block or object so the grouped statements or settings end here.
  },
// Continues the component or data expression so its related values and behavior stay grouped together.
}))

// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  createDailyLog,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  deleteDailyLog,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  getDailyLog,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  listDailyLogs,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  updateDailyLog,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from '../src/modules/daily-logs/daily-logs.service.js'
// Imports dailyLogListQuerySchema from ../src/modules/daily-logs/daily-logs.validator.js so this module can reuse that component, helper, or library.
import { dailyLogListQuerySchema } from '../src/modules/daily-logs/daily-logs.validator.js'

// Stores the value in admin so later lines can reuse this data or behavior for the current feature.
const admin = { id: 1, role: 'ADMIN' as const }
// Stores the value in pm so later lines can reuse this data or behavior for the current feature.
const pm = { id: 2, role: 'PM' as const }
// Stores the value in today so later lines can reuse this data or behavior for the current feature.
const today = new Date()
// Stores the value in date so later lines can reuse this data or behavior for the current feature.
const date = today.toISOString().slice(0, 10)
// Stores the value in yesterday so later lines can reuse this data or behavior for the current feature.
const yesterday = new Date(today.getTime() - 86_400_000).toISOString().slice(0, 10)
// Stores the value in tomorrow so later lines can reuse this data or behavior for the current feature.
const tomorrow = new Date(today.getTime() + 86_400_000).toISOString().slice(0, 10)

// Stores the value in input so later lines can reuse this data or behavior for the current feature.
const input = {
  // Sets the logDate field so the surrounding object or component receives this setting.
  logDate: date,
  // Sets the progressPercent field so the surrounding object or component receives this setting.
  progressPercent: 40,
  // Sets the workSummary field so the surrounding object or component receives this setting.
  workSummary: 'Concrete work completed.',
  // Sets the labourEntries field so the surrounding object or component receives this setting.
  labourEntries: [{ trade: 'Mason', headCount: 4, hoursWorked: 8 }],
  // Sets the machineryEntries field so the surrounding object or component receives this setting.
  machineryEntries: [{ machineName: 'Mixer', hoursUsed: 3, fuelLitres: 5 }],
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines decimal so this module can perform its named task when needed.
function decimal(value: number) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return { toNumber: () => value, toString: () => String(value) }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines configureTransaction so this module can perform its named task when needed.
function configureTransaction() {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.transaction.mockImplementation(async (operation: unknown) => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (typeof operation === 'function') {
      // Returns the result so the caller or React receives the value or interface this function provides.
      return operation({
        // Sets the dailyLog field so the surrounding object or component receives this setting.
        dailyLog: { create: mocks.dailyLogCreate, update: mocks.dailyLogUpdate, delete: mocks.dailyLogDelete },
        // Sets the labourEntry field so the surrounding object or component receives this setting.
        labourEntry: { deleteMany: mocks.labourDeleteMany },
        // Sets the machineryEntry field so the surrounding object or component receives this setting.
        machineryEntry: { deleteMany: mocks.machineryDeleteMany },
        // Sets the auditLog field so the surrounding object or component receives this setting.
        auditLog: { create: mocks.auditLogCreate },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      })
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Returns the result so the caller or React receives the value or interface this function provides.
    return Promise.all(operation as Array<Promise<unknown>>)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Calls this helper or component so the feature can perform the operation or render the control represented here.
beforeEach(() => {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  vi.clearAllMocks()
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  configureTransaction()
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.projectFindUnique.mockResolvedValue({ id: 3, status: 'ACTIVE', assignedPmId: pm.id })
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.dailyLogFindUnique.mockResolvedValue(null)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.dailyLogFindFirst.mockResolvedValue(null)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.dailyLogCreate.mockResolvedValue({
    // Sets the id field so the surrounding object or component receives this setting.
    id: 10,
    // Sets the projectId field so the surrounding object or component receives this setting.
    projectId: 3,
    // Sets the logDate field so the surrounding object or component receives this setting.
    logDate: new Date(`${date}T00:00:00.000Z`),
    // Sets the progressPercent field so the surrounding object or component receives this setting.
    progressPercent: decimal(input.progressPercent),
    // Sets the workSummary field so the surrounding object or component receives this setting.
    workSummary: input.workSummary,
    // Sets the weather field so the surrounding object or component receives this setting.
    weather: null,
    // Sets the issues field so the surrounding object or component receives this setting.
    issues: null,
    // Sets the createdById field so the surrounding object or component receives this setting.
    createdById: pm.id,
    // Sets the createdAt field so the surrounding object or component receives this setting.
    createdAt: new Date(),
    // Sets the updatedAt field so the surrounding object or component receives this setting.
    updatedAt: new Date(),
    // Sets the labourEntries field so the surrounding object or component receives this setting.
    labourEntries: [{ id: 1, trade: 'Mason', contractorName: null, headCount: 4, hoursWorked: decimal(8), remarks: null }],
    // Sets the machineryEntries field so the surrounding object or component receives this setting.
    machineryEntries: [{ id: 1, machineName: 'Mixer', operatorName: null, hoursUsed: decimal(3), fuelLitres: decimal(5), remarks: null }],
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.dailyLogUpdate.mockImplementation(async (args: { data: Record<string, unknown> }) => ({
    // Sets the id field so the surrounding object or component receives this setting.
    id: 10,
    // Sets the projectId field so the surrounding object or component receives this setting.
    projectId: 3,
    // Sets the logDate field so the surrounding object or component receives this setting.
    logDate: new Date(`${date}T00:00:00.000Z`),
    // Sets the progressPercent field so the surrounding object or component receives this setting.
    progressPercent: decimal(input.progressPercent),
    // Sets the workSummary field so the surrounding object or component receives this setting.
    workSummary: args.data.workSummary ?? input.workSummary,
    // Sets the weather field so the surrounding object or component receives this setting.
    weather: null,
    // Sets the issues field so the surrounding object or component receives this setting.
    issues: null,
    // Sets the createdById field so the surrounding object or component receives this setting.
    createdById: pm.id,
    // Sets the createdAt field so the surrounding object or component receives this setting.
    createdAt: new Date(),
    // Sets the updatedAt field so the surrounding object or component receives this setting.
    updatedAt: new Date(),
    // Sets the labourEntries field so the surrounding object or component receives this setting.
    labourEntries: args.data.labourEntries
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ? [{ id: 2, ...((args.data.labourEntries as { create: unknown[] }).create[0] as object), hoursWorked: decimal(6) }]
      // Continues the component or data expression so its related values and behavior stay grouped together.
      : [],
    // Sets the machineryEntries field so the surrounding object or component receives this setting.
    machineryEntries: args.data.machineryEntries
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ? [{ id: 2, ...((args.data.machineryEntries as { create: unknown[] }).create[0] as object), hoursUsed: decimal(4), fuelLitres: null }]
      // Continues the component or data expression so its related values and behavior stay grouped together.
      : [],
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }))
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.dailyLogDelete.mockResolvedValue({})
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.auditLogCreate.mockResolvedValue({ id: 100 })
// Continues the component or data expression so its related values and behavior stay grouped together.
})

// Calls this helper or component so the feature can perform the operation or render the control represented here.
describe('daily log authorization and creation rules', () => {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('allows ADMIN and assigned PM to list project logs', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.dailyLogFindMany.mockResolvedValue([])
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.dailyLogCount.mockResolvedValue(0)

    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(listDailyLogs(admin, 3, { page: 1, limit: 20 })).resolves.toMatchObject({ logs: [] })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(listDailyLogs(pm, 3, { page: 1, limit: 20 })).resolves.toMatchObject({ logs: [] })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.projectFindUnique).toHaveBeenCalledTimes(2)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('rejects PM access to an unassigned project', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.projectFindUnique.mockResolvedValue({ id: 3, status: 'ACTIVE', assignedPmId: 99 })

    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(listDailyLogs(pm, 3, { page: 1, limit: 20 })).rejects.toMatchObject({ code: 'FORBIDDEN', status: 403 })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('allows ADMIN and assigned PM to create logs with labour and machinery entries', async () => {
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await createDailyLog(admin, 3, input)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await createDailyLog(pm, 3, input)

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.dailyLogCreate).toHaveBeenCalledTimes(2)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.dailyLogCreate).toHaveBeenCalledWith(expect.objectContaining({
      // Sets the data field so the surrounding object or component receives this setting.
      data: expect.objectContaining({
        // Sets the labourEntries field so the surrounding object or component receives this setting.
        labourEntries: { create: [{ trade: 'Mason', contractorName: undefined, headCount: 4, hoursWorked: 8, remarks: undefined }] },
        // Sets the machineryEntries field so the surrounding object or component receives this setting.
        machineryEntries: { create: [{ machineName: 'Mixer', operatorName: undefined, hoursUsed: 3, fuelLitres: 5, remarks: undefined }] },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.auditLogCreate).toHaveBeenCalledTimes(2)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.auditLogCreate).toHaveBeenCalledWith(expect.objectContaining({
      // Sets the data field so the surrounding object or component receives this setting.
      data: expect.objectContaining({
        // Sets the userId field so the surrounding object or component receives this setting.
        userId: pm.id,
        // Sets the action field so the surrounding object or component receives this setting.
        action: 'CREATE',
        // Sets the entityType field so the surrounding object or component receives this setting.
        entityType: 'DailyLog',
        // Sets the entityId field so the surrounding object or component receives this setting.
        entityId: 10,
        // Sets the newValues field so the surrounding object or component receives this setting.
        newValues: expect.objectContaining({
          // Sets the labourEntries field so the surrounding object or component receives this setting.
          labourEntries: expect.arrayContaining([expect.objectContaining({ trade: 'Mason', headCount: 4 })]),
          // Sets the machineryEntries field so the surrounding object or component receives this setting.
          machineryEntries: expect.arrayContaining([expect.objectContaining({ machineName: 'Mixer', hoursUsed: '3' })]),
        // Continues the component or data expression so its related values and behavior stay grouped together.
        }),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('rejects creation for inactive projects and future dates', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.projectFindUnique.mockResolvedValue({ id: 3, status: 'PLANNING', assignedPmId: pm.id })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(createDailyLog(pm, 3, input)).rejects.toMatchObject({ code: 'BUSINESS_RULE_VIOLATION', status: 422 })

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.projectFindUnique.mockResolvedValue({ id: 3, status: 'ACTIVE', assignedPmId: pm.id })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(createDailyLog(pm, 3, { ...input, logDate: tomorrow })).rejects.toMatchObject({ code: 'BUSINESS_RULE_VIOLATION', status: 422 })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('rejects duplicate dates and progress that violates chronological order', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.dailyLogFindUnique.mockResolvedValue({ id: 20 })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(createDailyLog(pm, 3, input)).rejects.toMatchObject({ code: 'CONFLICT', status: 409 })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.auditLogCreate).not.toHaveBeenCalled()

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.dailyLogFindUnique.mockResolvedValue(null)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.dailyLogFindFirst.mockResolvedValueOnce({ progressPercent: decimal(50) }).mockResolvedValueOnce(null)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(createDailyLog(pm, 3, input)).rejects.toMatchObject({ code: 'BUSINESS_RULE_VIOLATION', status: 422 })

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.dailyLogFindFirst.mockResolvedValueOnce(null).mockResolvedValueOnce({ progressPercent: decimal(30) })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(createDailyLog(pm, 3, input)).rejects.toMatchObject({ code: 'BUSINESS_RULE_VIOLATION', status: 422 })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('does not create an audit entry when the log transaction fails', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.dailyLogCreate.mockRejectedValue(new Error('database failure'))

    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(createDailyLog(pm, 3, input)).rejects.toThrow('database failure')
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.auditLogCreate).not.toHaveBeenCalled()
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Continues the component or data expression so its related values and behavior stay grouped together.
})

// Calls this helper or component so the feature can perform the operation or render the control represented here.
describe('daily log editing and deletion rules', () => {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('allows PM edits within 48 hours and rejects older logs', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.dailyLogFindUnique.mockResolvedValue({
      // Sets the id field so the surrounding object or component receives this setting.
      id: 10,
      // Sets the projectId field so the surrounding object or component receives this setting.
      projectId: 3,
      // Sets the logDate field so the surrounding object or component receives this setting.
      logDate: new Date(`${date}T00:00:00.000Z`),
      // Sets the progressPercent field so the surrounding object or component receives this setting.
      progressPercent: decimal(30),
      // Sets the workSummary field so the surrounding object or component receives this setting.
      workSummary: 'Original.',
      // Sets the weather field so the surrounding object or component receives this setting.
      weather: null,
      // Sets the issues field so the surrounding object or component receives this setting.
      issues: null,
      // Sets the createdById field so the surrounding object or component receives this setting.
      createdById: pm.id,
      // Sets the createdAt field so the surrounding object or component receives this setting.
      createdAt: new Date(Date.now() - 47 * 3_600_000),
      // Sets the updatedAt field so the surrounding object or component receives this setting.
      updatedAt: new Date(),
      // Sets the labourEntries field so the surrounding object or component receives this setting.
      labourEntries: [],
      // Sets the machineryEntries field so the surrounding object or component receives this setting.
      machineryEntries: [],
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(updateDailyLog(pm, 10, { workSummary: 'Updated.' })).resolves.toBeDefined()
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.auditLogCreate).toHaveBeenCalledWith(expect.objectContaining({
      // Sets the data field so the surrounding object or component receives this setting.
      data: expect.objectContaining({
        // Sets the userId field so the surrounding object or component receives this setting.
        userId: pm.id,
        // Sets the action field so the surrounding object or component receives this setting.
        action: 'UPDATE',
        // Sets the oldValues field so the surrounding object or component receives this setting.
        oldValues: expect.objectContaining({ workSummary: 'Original.' }),
        // Sets the newValues field so the surrounding object or component receives this setting.
        newValues: expect.objectContaining({ workSummary: 'Updated.' }),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }))

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.dailyLogFindUnique.mockResolvedValue({
      // Sets the id field so the surrounding object or component receives this setting.
      id: 10,
      // Sets the projectId field so the surrounding object or component receives this setting.
      projectId: 3,
      // Sets the logDate field so the surrounding object or component receives this setting.
      logDate: new Date(`${date}T00:00:00.000Z`),
      // Sets the progressPercent field so the surrounding object or component receives this setting.
      progressPercent: decimal(30),
      // Sets the workSummary field so the surrounding object or component receives this setting.
      workSummary: 'Original.',
      // Sets the weather field so the surrounding object or component receives this setting.
      weather: null,
      // Sets the issues field so the surrounding object or component receives this setting.
      issues: null,
      // Sets the createdById field so the surrounding object or component receives this setting.
      createdById: pm.id,
      // Sets the createdAt field so the surrounding object or component receives this setting.
      createdAt: new Date(Date.now() - 49 * 3_600_000),
      // Sets the updatedAt field so the surrounding object or component receives this setting.
      updatedAt: new Date(),
      // Sets the labourEntries field so the surrounding object or component receives this setting.
      labourEntries: [],
      // Sets the machineryEntries field so the surrounding object or component receives this setting.
      machineryEntries: [],
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(updateDailyLog(pm, 10, { workSummary: 'Too late.' })).rejects.toMatchObject({ code: 'BUSINESS_RULE_VIOLATION', status: 422 })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.auditLogCreate).toHaveBeenCalledTimes(1)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('allows ADMIN to edit logs regardless of age', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.dailyLogFindUnique.mockResolvedValue({
      // Sets the id field so the surrounding object or component receives this setting.
      id: 10,
      // Sets the projectId field so the surrounding object or component receives this setting.
      projectId: 3,
      // Sets the logDate field so the surrounding object or component receives this setting.
      logDate: new Date(`${date}T00:00:00.000Z`),
      // Sets the progressPercent field so the surrounding object or component receives this setting.
      progressPercent: decimal(30),
      // Sets the workSummary field so the surrounding object or component receives this setting.
      workSummary: 'Original.',
      // Sets the weather field so the surrounding object or component receives this setting.
      weather: null,
      // Sets the issues field so the surrounding object or component receives this setting.
      issues: null,
      // Sets the createdById field so the surrounding object or component receives this setting.
      createdById: pm.id,
      // Sets the createdAt field so the surrounding object or component receives this setting.
      createdAt: new Date(Date.now() - 100 * 3_600_000),
      // Sets the updatedAt field so the surrounding object or component receives this setting.
      updatedAt: new Date(),
      // Sets the labourEntries field so the surrounding object or component receives this setting.
      labourEntries: [],
      // Sets the machineryEntries field so the surrounding object or component receives this setting.
      machineryEntries: [],
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })

    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(updateDailyLog(admin, 10, { workSummary: 'Admin correction.' })).resolves.toBeDefined()
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('replaces nested labour and machinery entries on update', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.dailyLogFindUnique.mockResolvedValue({
      // Sets the id field so the surrounding object or component receives this setting.
      id: 10,
      // Sets the projectId field so the surrounding object or component receives this setting.
      projectId: 3,
      // Sets the logDate field so the surrounding object or component receives this setting.
      logDate: new Date(`${date}T00:00:00.000Z`),
      // Sets the progressPercent field so the surrounding object or component receives this setting.
      progressPercent: decimal(30),
      // Sets the workSummary field so the surrounding object or component receives this setting.
      workSummary: 'Original.',
      // Sets the weather field so the surrounding object or component receives this setting.
      weather: null,
      // Sets the issues field so the surrounding object or component receives this setting.
      issues: null,
      // Sets the createdById field so the surrounding object or component receives this setting.
      createdById: pm.id,
      // Sets the createdAt field so the surrounding object or component receives this setting.
      createdAt: new Date(),
      // Sets the updatedAt field so the surrounding object or component receives this setting.
      updatedAt: new Date(),
      // Sets the labourEntries field so the surrounding object or component receives this setting.
      labourEntries: [{ id: 1, trade: 'Mason', contractorName: null, headCount: 4, hoursWorked: decimal(8), remarks: null }],
      // Sets the machineryEntries field so the surrounding object or component receives this setting.
      machineryEntries: [{ id: 1, machineName: 'Mixer', operatorName: null, hoursUsed: decimal(3), fuelLitres: decimal(5), remarks: null }],
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })

    // Waits for the asynchronous result before using it, so later work receives completed data.
    await updateDailyLog(pm, 10, {
      // Sets the labourEntries field so the surrounding object or component receives this setting.
      labourEntries: [{ trade: 'Helper', headCount: 2, hoursWorked: 6 }],
      // Sets the machineryEntries field so the surrounding object or component receives this setting.
      machineryEntries: [{ machineName: 'Crane', hoursUsed: 4 }],
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.labourDeleteMany).toHaveBeenCalledWith({ where: { dailyLogId: 10 } })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.machineryDeleteMany).toHaveBeenCalledWith({ where: { dailyLogId: 10 } })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.dailyLogUpdate).toHaveBeenCalledWith(expect.objectContaining({
      // Sets the data field so the surrounding object or component receives this setting.
      data: expect.objectContaining({
        // Sets the labourEntries field so the surrounding object or component receives this setting.
        labourEntries: { create: [{ trade: 'Helper', contractorName: undefined, headCount: 2, hoursWorked: 6, remarks: undefined }] },
        // Sets the machineryEntries field so the surrounding object or component receives this setting.
        machineryEntries: { create: [{ machineName: 'Crane', operatorName: undefined, hoursUsed: 4, fuelLitres: undefined, remarks: undefined }] },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.auditLogCreate).toHaveBeenCalledWith(expect.objectContaining({
      // Sets the data field so the surrounding object or component receives this setting.
      data: expect.objectContaining({
        // Sets the oldValues field so the surrounding object or component receives this setting.
        oldValues: expect.objectContaining({
          // Sets the labourEntries field so the surrounding object or component receives this setting.
          labourEntries: expect.arrayContaining([expect.objectContaining({ trade: 'Mason' })]),
          // Sets the machineryEntries field so the surrounding object or component receives this setting.
          machineryEntries: expect.arrayContaining([expect.objectContaining({ machineName: 'Mixer' })]),
        // Continues the component or data expression so its related values and behavior stay grouped together.
        }),
        // Sets the newValues field so the surrounding object or component receives this setting.
        newValues: expect.objectContaining({
          // Sets the labourEntries field so the surrounding object or component receives this setting.
          labourEntries: expect.arrayContaining([expect.objectContaining({ trade: 'Helper' })]),
          // Sets the machineryEntries field so the surrounding object or component receives this setting.
          machineryEntries: expect.arrayContaining([expect.objectContaining({ machineName: 'Crane' })]),
        // Continues the component or data expression so its related values and behavior stay grouped together.
        }),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('allows only ADMIN to delete daily logs', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.dailyLogFindUnique.mockResolvedValue({
      // Sets the id field so the surrounding object or component receives this setting.
      id: 10,
      // Sets the projectId field so the surrounding object or component receives this setting.
      projectId: 3,
      // Sets the logDate field so the surrounding object or component receives this setting.
      logDate: new Date(`${date}T00:00:00.000Z`),
      // Sets the progressPercent field so the surrounding object or component receives this setting.
      progressPercent: decimal(40),
      // Sets the workSummary field so the surrounding object or component receives this setting.
      workSummary: 'Deleted log.',
      // Sets the weather field so the surrounding object or component receives this setting.
      weather: null,
      // Sets the issues field so the surrounding object or component receives this setting.
      issues: 'None',
      // Sets the createdById field so the surrounding object or component receives this setting.
      createdById: pm.id,
      // Sets the createdAt field so the surrounding object or component receives this setting.
      createdAt: new Date(),
      // Sets the updatedAt field so the surrounding object or component receives this setting.
      updatedAt: new Date(),
      // Sets the labourEntries field so the surrounding object or component receives this setting.
      labourEntries: [{ id: 1, trade: 'Mason', contractorName: null, headCount: 4, hoursWorked: decimal(8), remarks: null }],
      // Sets the machineryEntries field so the surrounding object or component receives this setting.
      machineryEntries: [{ id: 1, machineName: 'Mixer', operatorName: null, hoursUsed: decimal(3), fuelLitres: null, remarks: null }],
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(deleteDailyLog(pm, 10)).rejects.toMatchObject({ code: 'FORBIDDEN', status: 403 })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(deleteDailyLog(admin, 10)).resolves.toBeUndefined()
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.dailyLogDelete).toHaveBeenCalledWith({ where: { id: 10 } })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.auditLogCreate).toHaveBeenCalledWith(expect.objectContaining({
      // Sets the data field so the surrounding object or component receives this setting.
      data: expect.objectContaining({
        // Sets the userId field so the surrounding object or component receives this setting.
        userId: admin.id,
        // Sets the action field so the surrounding object or component receives this setting.
        action: 'DELETE',
        // Sets the entityType field so the surrounding object or component receives this setting.
        entityType: 'DailyLog',
        // Sets the entityId field so the surrounding object or component receives this setting.
        entityId: 10,
        // Sets the oldValues field so the surrounding object or component receives this setting.
        oldValues: expect.objectContaining({
          // Sets the workSummary field so the surrounding object or component receives this setting.
          workSummary: 'Deleted log.',
          // Sets the labourEntries field so the surrounding object or component receives this setting.
          labourEntries: expect.any(Array),
          // Sets the machineryEntries field so the surrounding object or component receives this setting.
          machineryEntries: expect.any(Array),
        // Continues the component or data expression so its related values and behavior stay grouped together.
        }),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('rejects a historical update that exceeds the next log progress', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.dailyLogFindUnique.mockResolvedValue({
      // Sets the id field so the surrounding object or component receives this setting.
      id: 10,
      // Sets the projectId field so the surrounding object or component receives this setting.
      projectId: 3,
      // Sets the logDate field so the surrounding object or component receives this setting.
      logDate: new Date(`${yesterday}T00:00:00.000Z`),
      // Sets the createdAt field so the surrounding object or component receives this setting.
      createdAt: new Date(),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.dailyLogFindFirst.mockResolvedValueOnce(null).mockResolvedValueOnce({ progressPercent: decimal(60) })

    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(updateDailyLog(admin, 10, { progressPercent: 70 })).rejects.toMatchObject({
      // Sets the code field so the surrounding object or component receives this setting.
      code: 'BUSINESS_RULE_VIOLATION',
      // Sets the status field so the surrounding object or component receives this setting.
      status: 422,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Continues the component or data expression so its related values and behavior stay grouped together.
})

// Calls this helper or component so the feature can perform the operation or render the control represented here.
describe('daily log validation', () => {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('rejects inverted date filters', () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(dailyLogListQuerySchema.safeParse({ from: '2026-11-11', to: '2026-11-10' }).success).toBe(false)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(dailyLogListQuerySchema.safeParse({ from: '2026-11-10', to: '2026-11-11' }).success).toBe(true)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Continues the component or data expression so its related values and behavior stay grouped together.
})
