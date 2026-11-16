// Imports AuditAction, MilestoneStatus, type Prisma from @prisma/client so this module can reuse that component, helper, or library.
import { AuditAction, MilestoneStatus, type Prisma } from '@prisma/client'
// Imports prisma from ../../utils/prisma.js so this module can reuse that component, helper, or library.
import { prisma } from '../../utils/prisma.js'
// Imports AppError from ../../utils/errors.js so this module can reuse that component, helper, or library.
import { AppError } from '../../utils/errors.js'
// Imports projectAccess, type ProjectActor from ../projects/projects.service.js so this module can reuse that component, helper, or library.
import { projectAccess, type ProjectActor } from '../projects/projects.service.js'
// Imports type  CreateMilestoneInput, UpdateMilestoneInput from ./milestones.validator.js so this module can reuse that component, helper, or library.
import type { CreateMilestoneInput, UpdateMilestoneInput } from './milestones.validator.js'

// Continues the component or data expression so its related values and behavior stay grouped together.
type MilestoneInput = CreateMilestoneInput | UpdateMilestoneInput

// Defines dateAtUtcMidnight so this module can perform its named task when needed.
function dateAtUtcMidnight(value: string) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return new Date(`${value}T00:00:00.000Z`)
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines assertProjectAccess so this module can perform its named task when needed.
async function assertProjectAccess(actor: ProjectActor, projectId: number) {
  // Stores the value in project so later lines can reuse this data or behavior for the current feature.
  const project = await prisma.project.findFirst({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { id: projectId, ...projectAccess(actor) },
    // Sets the select field so the surrounding object or component receives this setting.
    select: { id: true },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!project) throw new AppError('NOT_FOUND', 'Project not found.', 404)
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getMilestoneForActor so this module can perform its named task when needed.
async function getMilestoneForActor(actor: ProjectActor, id: number) {
  // Stores the value in milestone so later lines can reuse this data or behavior for the current feature.
  const milestone = await prisma.projectMilestone.findUnique({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { id },
    // Sets the include field so the surrounding object or component receives this setting.
    include: { project: { select: { id: true, code: true, name: true } } },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!milestone) throw new AppError('NOT_FOUND', 'Milestone not found.', 404)
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await assertProjectAccess(actor, milestone.projectId)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return milestone
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines validateDateRanges so this module can perform its named task when needed.
function validateDateRanges(input: {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  plannedStartDate?: Date | null
  // Continues the component or data expression so its related values and behavior stay grouped together.
  plannedEndDate?: Date | null
  // Continues the component or data expression so its related values and behavior stay grouped together.
  actualStartDate?: Date | null
  // Continues the component or data expression so its related values and behavior stay grouped together.
  actualEndDate?: Date | null
// Continues the component or data expression so its related values and behavior stay grouped together.
}) {
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (input.plannedStartDate && input.plannedEndDate && input.plannedEndDate < input.plannedStartDate) {
    // Stops the current operation with an error so the calling code can handle the failure.
    throw new AppError('VALIDATION_ERROR', 'Planned end date must be on or after planned start date.', 400)
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (input.actualStartDate && input.actualEndDate && input.actualEndDate < input.actualStartDate) {
    // Stops the current operation with an error so the calling code can handle the failure.
    throw new AppError('VALIDATION_ERROR', 'Actual end date must be on or after actual start date.', 400)
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines dateValue so this module can perform its named task when needed.
function dateValue(value: string | null | undefined) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return value === undefined || value === null ? value : dateAtUtcMidnight(value)
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines createData so this module can perform its named task when needed.
function createData(input: CreateMilestoneInput) {
  // Stores the value in data so later lines can reuse this data or behavior for the current feature.
  const data = {
    // Sets the name field so the surrounding object or component receives this setting.
    name: input.name,
    // Sets the description field so the surrounding object or component receives this setting.
    description: input.description,
    // Sets the sequence field so the surrounding object or component receives this setting.
    sequence: input.sequence,
    // Sets the plannedStartDate field so the surrounding object or component receives this setting.
    plannedStartDate: dateValue(input.plannedStartDate),
    // Sets the plannedEndDate field so the surrounding object or component receives this setting.
    plannedEndDate: dateValue(input.plannedEndDate),
    // Sets the actualStartDate field so the surrounding object or component receives this setting.
    actualStartDate: dateValue(input.actualStartDate),
    // Sets the actualEndDate field so the surrounding object or component receives this setting.
    actualEndDate: dateValue(input.actualEndDate),
    // Sets the status field so the surrounding object or component receives this setting.
    status: input.status as MilestoneStatus,
    // Sets the progressPercent field so the surrounding object or component receives this setting.
    progressPercent: input.progressPercent,
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateDateRanges(data)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return data
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines snapshot so this module can perform its named task when needed.
function snapshot(milestone: {
  // Sets the id field so the surrounding object or component receives this setting.
  id: number
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: number
  // Sets the name field so the surrounding object or component receives this setting.
  name: string
  // Sets the description field so the surrounding object or component receives this setting.
  description: string | null
  // Sets the sequence field so the surrounding object or component receives this setting.
  sequence: number
  // Sets the plannedStartDate field so the surrounding object or component receives this setting.
  plannedStartDate: Date | null
  // Sets the plannedEndDate field so the surrounding object or component receives this setting.
  plannedEndDate: Date | null
  // Sets the actualStartDate field so the surrounding object or component receives this setting.
  actualStartDate: Date | null
  // Sets the actualEndDate field so the surrounding object or component receives this setting.
  actualEndDate: Date | null
  // Sets the status field so the surrounding object or component receives this setting.
  status: MilestoneStatus
  // Sets the progressPercent field so the surrounding object or component receives this setting.
  progressPercent: Prisma.Decimal
  // Sets the createdAt field so the surrounding object or component receives this setting.
  createdAt: Date
  // Sets the updatedAt field so the surrounding object or component receives this setting.
  updatedAt: Date
// Continues the component or data expression so its related values and behavior stay grouped together.
}): Prisma.InputJsonValue {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return {
    // Sets the id field so the surrounding object or component receives this setting.
    id: milestone.id,
    // Sets the projectId field so the surrounding object or component receives this setting.
    projectId: milestone.projectId,
    // Sets the name field so the surrounding object or component receives this setting.
    name: milestone.name,
    // Sets the description field so the surrounding object or component receives this setting.
    description: milestone.description,
    // Sets the sequence field so the surrounding object or component receives this setting.
    sequence: milestone.sequence,
    // Sets the plannedStartDate field so the surrounding object or component receives this setting.
    plannedStartDate: milestone.plannedStartDate?.toISOString() ?? null,
    // Sets the plannedEndDate field so the surrounding object or component receives this setting.
    plannedEndDate: milestone.plannedEndDate?.toISOString() ?? null,
    // Sets the actualStartDate field so the surrounding object or component receives this setting.
    actualStartDate: milestone.actualStartDate?.toISOString() ?? null,
    // Sets the actualEndDate field so the surrounding object or component receives this setting.
    actualEndDate: milestone.actualEndDate?.toISOString() ?? null,
    // Sets the status field so the surrounding object or component receives this setting.
    status: milestone.status,
    // Sets the progressPercent field so the surrounding object or component receives this setting.
    progressPercent: milestone.progressPercent.toString(),
    // Sets the createdAt field so the surrounding object or component receives this setting.
    createdAt: milestone.createdAt.toISOString(),
    // Sets the updatedAt field so the surrounding object or component receives this setting.
    updatedAt: milestone.updatedAt.toISOString(),
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines changedSnapshot so this module can perform its named task when needed.
function changedSnapshot(
  // Sets the existing field so the surrounding object or component receives this setting.
  existing: Awaited<ReturnType<typeof getMilestoneForActor>>,
  // Sets the input field so the surrounding object or component receives this setting.
  input: UpdateMilestoneInput,
  // Sets the updated field so the surrounding object or component receives this setting.
  updated: Awaited<ReturnType<typeof getMilestoneForActor>>,
// Continues the component or data expression so its related values and behavior stay grouped together.
) {
  // Stores the value in oldData so later lines can reuse this data or behavior for the current feature.
  const oldData: Record<string, unknown> = { projectId: existing.projectId }
  // Stores the value in newData so later lines can reuse this data or behavior for the current feature.
  const newData: Record<string, unknown> = { projectId: updated.projectId }
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  for (const key of Object.keys(input) as (keyof UpdateMilestoneInput)[]) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    oldData[key] = (snapshot(existing) as Record<string, unknown>)[key]
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    newData[key] = (snapshot(updated) as Record<string, unknown>)[key]
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Returns the result so the caller or React receives the value or interface this function provides.
  return { oldData: oldData as Prisma.InputJsonValue, newData: newData as Prisma.InputJsonValue }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines createMilestone so this module can perform its named task when needed.
export async function createMilestone(actor: ProjectActor, projectId: number, input: CreateMilestoneInput) {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await assertProjectAccess(actor, projectId)
  // Stores the value in data so later lines can reuse this data or behavior for the current feature.
  const data = createData(input)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.$transaction(async (tx) => {
    // Stores the value in milestone so later lines can reuse this data or behavior for the current feature.
    const milestone = await tx.projectMilestone.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: { ...data, projectId },
      // Sets the include field so the surrounding object or component receives this setting.
      include: { project: { select: { id: true, code: true, name: true } } },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.auditLog.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Sets the userId field so the surrounding object or component receives this setting.
        userId: actor.id,
        // Sets the action field so the surrounding object or component receives this setting.
        action: AuditAction.CREATE,
        // Sets the entityType field so the surrounding object or component receives this setting.
        entityType: 'ProjectMilestone',
        // Sets the entityId field so the surrounding object or component receives this setting.
        entityId: milestone.id,
        // Sets the newValues field so the surrounding object or component receives this setting.
        newValues: snapshot(milestone),
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Returns the result so the caller or React receives the value or interface this function provides.
    return milestone
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines listMilestones so this module can perform its named task when needed.
export async function listMilestones(actor: ProjectActor, projectId: number) {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await assertProjectAccess(actor, projectId)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.projectMilestone.findMany({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { projectId },
    // Sets the orderBy field so the surrounding object or component receives this setting.
    orderBy: [{ sequence: 'asc' }, { plannedStartDate: 'asc' }, { id: 'asc' }],
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getMilestone so this module can perform its named task when needed.
export async function getMilestone(actor: ProjectActor, id: number) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return getMilestoneForActor(actor, id)
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines updateMilestone so this module can perform its named task when needed.
export async function updateMilestone(actor: ProjectActor, id: number, input: UpdateMilestoneInput) {
  // Stores the value in existing so later lines can reuse this data or behavior for the current feature.
  const existing = await getMilestoneForActor(actor, id)
  // Stores the value in data so later lines can reuse this data or behavior for the current feature.
  const data = Object.fromEntries(Object.entries(input).map(([key, value]) => [
    // Continues the component or data expression so its related values and behavior stay grouped together.
    key,
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    key.endsWith('Date') ? dateValue(value as string | null | undefined) : value,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ]))
  // Stores the value in merged so later lines can reuse this data or behavior for the current feature.
  const merged: {
    // Sets the plannedStartDate field so the surrounding object or component receives this setting.
    plannedStartDate: Date | null
    // Sets the plannedEndDate field so the surrounding object or component receives this setting.
    plannedEndDate: Date | null
    // Sets the actualStartDate field so the surrounding object or component receives this setting.
    actualStartDate: Date | null
    // Sets the actualEndDate field so the surrounding object or component receives this setting.
    actualEndDate: Date | null
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } = {
    // Sets the plannedStartDate field so the surrounding object or component receives this setting.
    plannedStartDate: data.plannedStartDate === undefined ? existing.plannedStartDate : data.plannedStartDate as Date | null,
    // Sets the plannedEndDate field so the surrounding object or component receives this setting.
    plannedEndDate: data.plannedEndDate === undefined ? existing.plannedEndDate : data.plannedEndDate as Date | null,
    // Sets the actualStartDate field so the surrounding object or component receives this setting.
    actualStartDate: data.actualStartDate === undefined ? existing.actualStartDate : data.actualStartDate as Date | null,
    // Sets the actualEndDate field so the surrounding object or component receives this setting.
    actualEndDate: data.actualEndDate === undefined ? existing.actualEndDate : data.actualEndDate as Date | null,
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateDateRanges(merged)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.$transaction(async (tx) => {
    // Stores the value in updated so later lines can reuse this data or behavior for the current feature.
    const updated = await tx.projectMilestone.update({
      // Sets the where field so the surrounding object or component receives this setting.
      where: { id },
      // Sets the data field so the surrounding object or component receives this setting.
      data: data as Prisma.ProjectMilestoneUpdateInput,
      // Sets the include field so the surrounding object or component receives this setting.
      include: { project: { select: { id: true, code: true, name: true } } },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Stores the value in changes so later lines can reuse this data or behavior for the current feature.
    const changes = changedSnapshot(existing, input, updated)
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.auditLog.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Sets the userId field so the surrounding object or component receives this setting.
        userId: actor.id,
        // Sets the action field so the surrounding object or component receives this setting.
        action: AuditAction.UPDATE,
        // Sets the entityType field so the surrounding object or component receives this setting.
        entityType: 'ProjectMilestone',
        // Sets the entityId field so the surrounding object or component receives this setting.
        entityId: id,
        // Sets the oldValues field so the surrounding object or component receives this setting.
        oldValues: changes.oldData,
        // Sets the newValues field so the surrounding object or component receives this setting.
        newValues: changes.newData,
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Returns the result so the caller or React receives the value or interface this function provides.
    return updated
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines deleteMilestone so this module can perform its named task when needed.
export async function deleteMilestone(actor: ProjectActor, id: number) {
  // Stores the value in existing so later lines can reuse this data or behavior for the current feature.
  const existing = await getMilestoneForActor(actor, id)
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await prisma.$transaction(async (tx) => {
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.projectMilestone.delete({ where: { id } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.auditLog.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Sets the userId field so the surrounding object or component receives this setting.
        userId: actor.id,
        // Sets the action field so the surrounding object or component receives this setting.
        action: AuditAction.DELETE,
        // Sets the entityType field so the surrounding object or component receives this setting.
        entityType: 'ProjectMilestone',
        // Sets the entityId field so the surrounding object or component receives this setting.
        entityId: id,
        // Sets the oldValues field so the surrounding object or component receives this setting.
        oldValues: snapshot(existing),
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}
