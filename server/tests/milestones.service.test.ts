// Imports beforeEach, describe, expect, it, vi from vitest so this module can reuse that component, helper, or library.
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Stores the value in mocks so later lines can reuse this data or behavior for the current feature.
const mocks = vi.hoisted(() => ({
  // Sets the projectFindFirst field so the surrounding object or component receives this setting.
  projectFindFirst: vi.fn(),
  // Sets the milestoneFindUnique field so the surrounding object or component receives this setting.
  milestoneFindUnique: vi.fn(),
  // Sets the milestoneFindMany field so the surrounding object or component receives this setting.
  milestoneFindMany: vi.fn(),
  // Sets the milestoneCreate field so the surrounding object or component receives this setting.
  milestoneCreate: vi.fn(),
  // Sets the milestoneUpdate field so the surrounding object or component receives this setting.
  milestoneUpdate: vi.fn(),
  // Sets the milestoneDelete field so the surrounding object or component receives this setting.
  milestoneDelete: vi.fn(),
  // Sets the auditCreate field so the surrounding object or component receives this setting.
  auditCreate: vi.fn(),
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
    // Sets the projectMilestone field so the surrounding object or component receives this setting.
    projectMilestone: {
      // Sets the findUnique field so the surrounding object or component receives this setting.
      findUnique: mocks.milestoneFindUnique,
      // Sets the findMany field so the surrounding object or component receives this setting.
      findMany: mocks.milestoneFindMany,
      // Sets the create field so the surrounding object or component receives this setting.
      create: mocks.milestoneCreate,
      // Sets the update field so the surrounding object or component receives this setting.
      update: mocks.milestoneUpdate,
      // Sets the delete field so the surrounding object or component receives this setting.
      delete: mocks.milestoneDelete,
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the auditLog field so the surrounding object or component receives this setting.
    auditLog: { create: mocks.auditCreate },
    // Sets the $transaction field so the surrounding object or component receives this setting.
    $transaction: mocks.transaction,
  // Closes the current block or object so the grouped statements or settings end here.
  },
// Continues the component or data expression so its related values and behavior stay grouped together.
}))

// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  createMilestone,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  deleteMilestone,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  getMilestone,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  listMilestones,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  updateMilestone,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from '../src/modules/milestones/milestones.service.js'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  createMilestoneSchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  updateMilestoneSchema,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from '../src/modules/milestones/milestones.validator.js'

// Stores the value in admin so later lines can reuse this data or behavior for the current feature.
const admin = { id: 1, role: 'ADMIN' as const }
// Stores the value in pm so later lines can reuse this data or behavior for the current feature.
const pm = { id: 2, role: 'PM' as const }
// Stores the value in project so later lines can reuse this data or behavior for the current feature.
const project = { id: 3, code: 'DEV-001', name: 'Development Project' }

// Defines decimal so this module can perform its named task when needed.
function decimal(value: number) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return { toString: () => String(value) }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines milestone so this module can perform its named task when needed.
function milestone(overrides: Record<string, unknown> = {}) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 10,
    // Sets the projectId field so the surrounding object or component receives this setting.
    projectId: 3,
    // Sets the name field so the surrounding object or component receives this setting.
    name: 'Foundation',
    // Sets the description field so the surrounding object or component receives this setting.
    description: 'Complete foundation works',
    // Sets the sequence field so the surrounding object or component receives this setting.
    sequence: 1,
    // Sets the plannedStartDate field so the surrounding object or component receives this setting.
    plannedStartDate: new Date('2026-11-01T00:00:00.000Z'),
    // Sets the plannedEndDate field so the surrounding object or component receives this setting.
    plannedEndDate: new Date('2026-11-30T00:00:00.000Z'),
    // Sets the actualStartDate field so the surrounding object or component receives this setting.
    actualStartDate: null,
    // Sets the actualEndDate field so the surrounding object or component receives this setting.
    actualEndDate: null,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'PLANNED',
    // Sets the progressPercent field so the surrounding object or component receives this setting.
    progressPercent: decimal(0),
    // Sets the createdAt field so the surrounding object or component receives this setting.
    createdAt: new Date('2026-11-01T10:00:00.000Z'),
    // Sets the updatedAt field so the surrounding object or component receives this setting.
    updatedAt: new Date('2026-11-01T10:00:00.000Z'),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    project,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...overrides,
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Calls this helper or component so the feature can perform the operation or render the control represented here.
beforeEach(() => {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  vi.clearAllMocks()
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.projectFindFirst.mockResolvedValue(project)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.milestoneFindUnique.mockResolvedValue(milestone())
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.milestoneFindMany.mockResolvedValue([milestone(), milestone({ id: 11, sequence: 2, name: 'Structure' })])
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.milestoneCreate.mockResolvedValue(milestone())
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.milestoneUpdate.mockResolvedValue(milestone({ progressPercent: decimal(50), status: 'IN_PROGRESS' }))
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.milestoneDelete.mockResolvedValue(milestone())
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.auditCreate.mockResolvedValue({})
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  mocks.transaction.mockImplementation(async (callback: (tx: unknown) => Promise<unknown>) => callback({
    // Sets the projectMilestone field so the surrounding object or component receives this setting.
    projectMilestone: {
      // Sets the create field so the surrounding object or component receives this setting.
      create: mocks.milestoneCreate,
      // Sets the update field so the surrounding object or component receives this setting.
      update: mocks.milestoneUpdate,
      // Sets the delete field so the surrounding object or component receives this setting.
      delete: mocks.milestoneDelete,
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the auditLog field so the surrounding object or component receives this setting.
    auditLog: { create: mocks.auditCreate },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }))
// Continues the component or data expression so its related values and behavior stay grouped together.
})

// Calls this helper or component so the feature can perform the operation or render the control represented here.
describe('project milestones', () => {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('allows ADMIN and assigned PM to create and list project milestones', async () => {
    // Stores the value in input so later lines can reuse this data or behavior for the current feature.
    const input = {
      // Sets the name field so the surrounding object or component receives this setting.
      name: 'Foundation',
      // Sets the description field so the surrounding object or component receives this setting.
      description: 'Complete foundation works',
      // Sets the sequence field so the surrounding object or component receives this setting.
      sequence: 1,
      // Sets the plannedStartDate field so the surrounding object or component receives this setting.
      plannedStartDate: '2026-11-01',
      // Sets the plannedEndDate field so the surrounding object or component receives this setting.
      plannedEndDate: '2026-11-30',
      // Sets the status field so the surrounding object or component receives this setting.
      status: 'PLANNED' as const,
      // Sets the progressPercent field so the surrounding object or component receives this setting.
      progressPercent: 0,
    // Closes the current block or object so the grouped statements or settings end here.
    }

    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(createMilestone(admin, 3, input)).resolves.toEqual(expect.objectContaining({ id: 10 }))
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(listMilestones(pm, 3)).resolves.toHaveLength(2)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.milestoneFindMany).toHaveBeenCalledWith(expect.objectContaining({
      // Sets the where field so the surrounding object or component receives this setting.
      where: { projectId: 3 },
      // Sets the orderBy field so the surrounding object or component receives this setting.
      orderBy: [{ sequence: 'asc' }, { plannedStartDate: 'asc' }, { id: 'asc' }],
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.auditCreate).toHaveBeenCalledWith(expect.objectContaining({
      // Sets the data field so the surrounding object or component receives this setting.
      data: expect.objectContaining({
        // Sets the entityType field so the surrounding object or component receives this setting.
        entityType: 'ProjectMilestone',
        // Sets the newValues field so the surrounding object or component receives this setting.
        newValues: expect.objectContaining({ projectId: 3 }),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('denies unassigned PMs and nonexistent project milestones', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.projectFindFirst.mockResolvedValueOnce(null)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(listMilestones(pm, 3)).rejects.toMatchObject({ code: 'NOT_FOUND', status: 404 })

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.milestoneFindUnique.mockResolvedValueOnce(null)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(getMilestone(admin, 999)).rejects.toMatchObject({ code: 'NOT_FOUND', status: 404 })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('gets, updates, and deletes milestones with audit records', async () => {
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(getMilestone(pm, 10)).resolves.toEqual(expect.objectContaining({ id: 10 }))
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await updateMilestone(pm, 10, { progressPercent: 50, status: 'IN_PROGRESS' })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.auditCreate).toHaveBeenCalledWith(expect.objectContaining({
      // Sets the data field so the surrounding object or component receives this setting.
      data: expect.objectContaining({
        // Sets the action field so the surrounding object or component receives this setting.
        action: 'UPDATE',
        // Sets the oldValues field so the surrounding object or component receives this setting.
        oldValues: { projectId: 3, progressPercent: '0', status: 'PLANNED' },
        // Sets the newValues field so the surrounding object or component receives this setting.
        newValues: { projectId: 3, progressPercent: '50', status: 'IN_PROGRESS' },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }))

    // Waits for the asynchronous result before using it, so later work receives completed data.
    await deleteMilestone(admin, 10)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.milestoneDelete).toHaveBeenCalledWith({ where: { id: 10 } })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.auditCreate).toHaveBeenCalledWith(expect.objectContaining({
      // Sets the data field so the surrounding object or component receives this setting.
      data: expect.objectContaining({
        // Sets the action field so the surrounding object or component receives this setting.
        action: 'DELETE',
        // Sets the oldValues field so the surrounding object or component receives this setting.
        oldValues: expect.objectContaining({ id: 10, projectId: 3 }),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('validates progress, status, and date ranges', () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(createMilestoneSchema.safeParse({
      // Sets the name field so the surrounding object or component receives this setting.
      name: 'Bad',
      // Sets the sequence field so the surrounding object or component receives this setting.
      sequence: 1,
      // Sets the plannedStartDate field so the surrounding object or component receives this setting.
      plannedStartDate: '2026-12-01',
      // Sets the plannedEndDate field so the surrounding object or component receives this setting.
      plannedEndDate: '2026-11-01',
      // Sets the status field so the surrounding object or component receives this setting.
      status: 'PLANNED',
      // Sets the progressPercent field so the surrounding object or component receives this setting.
      progressPercent: 0,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }).success).toBe(false)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(updateMilestoneSchema.safeParse({ progressPercent: 101 }).success).toBe(false)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(updateMilestoneSchema.safeParse({ status: 'UNKNOWN' }).success).toBe(false)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  it('does not create an audit row when the milestone transaction fails', async () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    mocks.milestoneCreate.mockRejectedValueOnce(new Error('write failed'))
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await expect(createMilestone(admin, 3, {
      // Sets the name field so the surrounding object or component receives this setting.
      name: 'Foundation',
      // Sets the sequence field so the surrounding object or component receives this setting.
      sequence: 1,
      // Sets the status field so the surrounding object or component receives this setting.
      status: 'PLANNED',
      // Sets the progressPercent field so the surrounding object or component receives this setting.
      progressPercent: 0,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })).rejects.toThrow('write failed')
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    expect(mocks.auditCreate).not.toHaveBeenCalled()
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Continues the component or data expression so its related values and behavior stay grouped together.
})
