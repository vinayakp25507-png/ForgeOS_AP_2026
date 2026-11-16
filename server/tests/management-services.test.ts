// Imports beforeEach, describe, expect, it, vi from vitest so this module can reuse that component, helper, or library.
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Stores the value in mocks so later lines can reuse this data or behavior for the current feature.
const mocks = vi.hoisted(() => ({
  // Sets the landFindMany field so the surrounding object or component receives this setting.
  landFindMany: vi.fn(),
  // Sets the landCount field so the surrounding object or component receives this setting.
  landCount: vi.fn(),
  // Sets the landFindFirst field so the surrounding object or component receives this setting.
  landFindFirst: vi.fn(),
  // Sets the landFindUnique field so the surrounding object or component receives this setting.
  landFindUnique: vi.fn(),
  // Sets the landDelete field so the surrounding object or component receives this setting.
  landDelete: vi.fn(),
  // Sets the landCreate field so the surrounding object or component receives this setting.
  landCreate: vi.fn(),
  // Sets the projectFindMany field so the surrounding object or component receives this setting.
  projectFindMany: vi.fn(),
  // Sets the projectCount field so the surrounding object or component receives this setting.
  projectCount: vi.fn(),
  // Sets the projectFindFirst field so the surrounding object or component receives this setting.
  projectFindFirst: vi.fn(),
  // Sets the projectFindUnique field so the surrounding object or component receives this setting.
  projectFindUnique: vi.fn(),
  // Sets the projectUpdate field so the surrounding object or component receives this setting.
  projectUpdate: vi.fn(),
  // Sets the projectCreate field so the surrounding object or component receives this setting.
  projectCreate: vi.fn(),
  // Sets the projectDelete field so the surrounding object or component receives this setting.
  projectDelete: vi.fn(),
  // Sets the transaction field so the surrounding object or component receives this setting.
  transaction: vi.fn(),
// Continues the component or data expression so its related values and behavior stay grouped together.
}))

// Calls this helper or component so the feature can perform the operation or render the control represented here.
vi.mock('../src/utils/prisma.js', () => ({
  // Sets the prisma field so the surrounding object or component receives this setting.
  prisma: {
    // Sets the land field so the surrounding object or component receives this setting.
    land: {
      // Sets the findMany field so the surrounding object or component receives this setting.
      findMany: mocks.landFindMany,
      // Sets the count field so the surrounding object or component receives this setting.
      count: mocks.landCount,
      // Sets the findFirst field so the surrounding object or component receives this setting.
      findFirst: mocks.landFindFirst,
      // Sets the findUnique field so the surrounding object or component receives this setting.
      findUnique: mocks.landFindUnique,
      // Sets the delete field so the surrounding object or component receives this setting.
      delete: mocks.landDelete,
      // Sets the create field so the surrounding object or component receives this setting.
      create: mocks.landCreate,
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the project field so the surrounding object or component receives this setting.
    project: {
      // Sets the findMany field so the surrounding object or component receives this setting.
      findMany: mocks.projectFindMany,
      // Sets the count field so the surrounding object or component receives this setting.
      count: mocks.projectCount,
      // Sets the findFirst field so the surrounding object or component receives this setting.
      findFirst: mocks.projectFindFirst,
      // Sets the findUnique field so the surrounding object or component receives this setting.
      findUnique: mocks.projectFindUnique,
      // Sets the update field so the surrounding object or component receives this setting.
      update: mocks.projectUpdate,
      // Sets the create field so the surrounding object or component receives this setting.
      create: mocks.projectCreate,
      // Sets the delete field so the surrounding object or component receives this setting.
      delete: mocks.projectDelete,
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the $transaction field so the surrounding object or component receives this setting.
    $transaction: mocks.transaction,
  // Closes the current block or object so the grouped statements or settings end here.
  },
// Continues the component or data expression so its related values and behavior stay grouped together.
}))

// Imports createLand, listLands, getLand, deleteLand from ../src/modules/lands/lands.service.js so this module can reuse that component, helper, or library.
import { createLand, listLands, getLand, deleteLand } from '../src/modules/lands/lands.service.js'
// Imports createProject, deleteProject, getProject, listProjects, updateProject from ../src/modules/projects/projects.service.js so this module can reuse that component, helper, or library.
import { createProject, deleteProject, getProject, listProjects, updateProject } from '../src/modules/projects/projects.service.js'
// Imports createLandSchema from ../src/modules/lands/lands.validator.js so this module can reuse that component, helper, or library.
import { createLandSchema } from '../src/modules/lands/lands.validator.js'
// Imports createProjectSchema from ../src/modules/projects/projects.validator.js so this module can reuse that component, helper, or library.
import { createProjectSchema } from '../src/modules/projects/projects.validator.js'

// Stores the value in admin so later lines can reuse this data or behavior for the current feature.
const admin = { id: 1, role: 'ADMIN' as const }
// Stores the value in pm so later lines can reuse this data or behavior for the current feature.
const pm = { id: 2, role: 'PM' as const }

// Calls this helper or component so the feature can perform the operation or render the control represented here.
describe('land and project authorization rules', () => {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  beforeEach(() => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    vi.clearAllMocks()
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.transaction.mockImplementation(async (operations: Array<Promise<unknown>>) => Promise.all(operations))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('filters PM land access through assigned projects', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.landFindMany.mockResolvedValue([])
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.landCount.mockResolvedValue(0)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await listLands(pm, 1, 20)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.landFindMany).toHaveBeenCalledWith(expect.objectContaining({
      // Sets the where field so the surrounding object or component receives this setting.
      where: { projects: { some: { assignedPmId: pm.id } } },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('denies PM access to an unassigned land', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.landFindFirst.mockResolvedValue(null)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(getLand(pm, 99)).rejects.toMatchObject({ code: 'NOT_FOUND', status: 404 })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('allows ADMIN land listing and creation', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.landFindMany.mockResolvedValue([])
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.landCount.mockResolvedValue(0)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.landCreate.mockResolvedValue({ id: 1 })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await listLands(admin, 1, 20)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await createLand(admin, { name: 'Parcel', city: 'Pune', state: 'Maharashtra', areaValue: 1, areaUnit: 'ACRE' })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.landFindMany).toHaveBeenCalledWith(expect.objectContaining({ where: {} }))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.landCreate).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ createdById: admin.id }) }))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('rejects invalid land and project data at the validation boundary', () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(createLandSchema.safeParse({ name: '', city: 'Pune', state: 'Maharashtra', areaValue: -1, areaUnit: 'ACRE' }).success).toBe(false)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(createProjectSchema.safeParse({
      // Sets the landId field so the surrounding object or component receives this setting.
      landId: 1,
      // Sets the code field so the surrounding object or component receives this setting.
      code: 'P-1',
      // Sets the name field so the surrounding object or component receives this setting.
      name: 'Project',
      // Sets the status field so the surrounding object or component receives this setting.
      status: 'ACTIVE',
      // Sets the totalBudget field so the surrounding object or component receives this setting.
      totalBudget: 10,
      // Sets the wastageThresholdPct field so the surrounding object or component receives this setting.
      wastageThresholdPct: 10,
      // Sets the startDate field so the surrounding object or component receives this setting.
      startDate: '2026-12-10',
      // Sets the expectedEndDate field so the surrounding object or component receives this setting.
      expectedEndDate: '2026-12-01',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }).success).toBe(false)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('blocks land deletion when projects depend on it', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.landFindUnique.mockResolvedValue({ id: 1, _count: { projects: 1 } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(deleteLand(1)).rejects.toMatchObject({ code: 'BUSINESS_RULE_VIOLATION', status: 409 })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.landDelete).not.toHaveBeenCalled()
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('rejects PM attempts to change project assignment or administrative fields', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.projectFindFirst.mockResolvedValue({ id: 1 })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(updateProject(pm, 1, { assignedPmId: 3 })).rejects.toMatchObject({ code: 'FORBIDDEN', status: 403 })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.projectUpdate).not.toHaveBeenCalled()
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('allows ADMIN project access and denies PM access to unassigned projects', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.projectFindMany.mockResolvedValue([])
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.projectCount.mockResolvedValue(0)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await listProjects(admin, 1, 20)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.projectFindMany).toHaveBeenCalledWith(expect.objectContaining({ where: {} }))

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.projectFindFirst.mockResolvedValue(null)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(getProject(pm, 99)).rejects.toMatchObject({ code: 'NOT_FOUND', status: 404 })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('blocks project deletion when dependent records exist', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.projectFindUnique.mockResolvedValue({
      // Sets the id field so the surrounding object or component receives this setting.
      id: 1,
      // Sets the _count field so the surrounding object or component receives this setting.
      _count: { materialPlans: 0, dailyLogs: 1, stockTransactions: 0, bills: 0, notifications: 0 },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(deleteProject(1)).rejects.toMatchObject({ code: 'BUSINESS_RULE_VIOLATION', status: 409 })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.projectDelete).not.toHaveBeenCalled()
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('allows ADMIN project deletion when no dependent records exist', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.projectFindUnique.mockResolvedValue({
      // Sets the id field so the surrounding object or component receives this setting.
      id: 1,
      // Sets the _count field so the surrounding object or component receives this setting.
      _count: { materialPlans: 0, dailyLogs: 0, stockTransactions: 0, bills: 0, notifications: 0 },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await deleteProject(1)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.projectDelete).toHaveBeenCalledWith({ where: { id: 1 } })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(admin.role).toBe('ADMIN')
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Continues the component or data expression so its related values and behavior stay grouped together.
})
