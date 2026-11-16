// Imports Prisma, type VendorType from @prisma/client so this module can reuse that component, helper, or library.
import { Prisma, type VendorType } from '@prisma/client'
// Imports prisma from ../../utils/prisma.js so this module can reuse that component, helper, or library.
import { prisma } from '../../utils/prisma.js'
// Imports AppError from ../../utils/errors.js so this module can reuse that component, helper, or library.
import { AppError } from '../../utils/errors.js'
// Imports projectAccess, type ProjectActor from ../projects/projects.service.js so this module can reuse that component, helper, or library.
import { projectAccess, type ProjectActor } from '../projects/projects.service.js'
// Imports type  VendorInput, VendorListQuery, VendorUpdateInput from ./vendors.validator.js so this module can reuse that component, helper, or library.
import type { VendorInput, VendorListQuery, VendorUpdateInput } from './vendors.validator.js'

// Continues the component or data expression so its related values and behavior stay grouped together.
export type VendorActor = ProjectActor

// Defines listVendors so this module can perform its named task when needed.
export async function listVendors(actor: VendorActor, query: VendorListQuery) {
  // Stores the value in where so later lines can reuse this data or behavior for the current feature.
  const where = {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(query.isActive === undefined ? {} : { isActive: query.isActive }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(query.search ? { OR: [
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { name: { contains: query.search, mode: 'insensitive' as const } },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { gstin: { contains: query.search, mode: 'insensitive' as const } },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ] } : {}),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(actor.role === 'PM' ? {
      // Sets the projectAssignments field so the surrounding object or component receives this setting.
      projectAssignments: { some: { unassignedAt: null, project: { assignedPmId: actor.id } } },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    } : {}),
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.vendor.findMany({
    // Continues the component or data expression so its related values and behavior stay grouped together.
    where,
    // Sets the include field so the surrounding object or component receives this setting.
    include: { projectAssignments: { where: { unassignedAt: null }, select: { projectId: true } } },
    // Sets the orderBy field so the surrounding object or component receives this setting.
    orderBy: { name: 'asc' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getVendor so this module can perform its named task when needed.
export async function getVendor(actor: VendorActor, id: number) {
  // Stores the value in vendor so later lines can reuse this data or behavior for the current feature.
  const vendor = await prisma.vendor.findFirst({
    // Sets the where field so the surrounding object or component receives this setting.
    where: {
      // Continues the component or data expression so its related values and behavior stay grouped together.
      id,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ...(actor.role === 'PM' ? { projectAssignments: { some: { unassignedAt: null, project: { assignedPmId: actor.id } } } } : {}),
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the include field so the surrounding object or component receives this setting.
    include: { projectAssignments: { include: { project: { select: { id: true, code: true, name: true } } }, orderBy: { assignedAt: 'desc' } } },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!vendor) throw new AppError('NOT_FOUND', 'Vendor not found.', 404)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return vendor
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines createVendor so this module can perform its named task when needed.
export async function createVendor(actor: VendorActor, input: VendorInput) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.$transaction(async (tx) => {
    // Stores the value in vendor so later lines can reuse this data or behavior for the current feature.
    const vendor = await tx.vendor.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Sets the name field so the surrounding object or component receives this setting.
        name: input.name,
        // Sets the vendorType field so the surrounding object or component receives this setting.
        vendorType: input.vendorType as VendorType,
        // Sets the gstin field so the surrounding object or component receives this setting.
        gstin: input.gstin ?? null,
        // Sets the phone field so the surrounding object or component receives this setting.
        phone: input.phone ?? null,
        // Sets the email field so the surrounding object or component receives this setting.
        email: input.email ?? null,
        // Sets the contactPerson field so the surrounding object or component receives this setting.
        contactPerson: input.contactPerson ?? null,
        // Sets the address field so the surrounding object or component receives this setting.
        address: input.address ?? null,
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.auditLog.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Sets the userId field so the surrounding object or component receives this setting.
        userId: actor.id,
        // Sets the action field so the surrounding object or component receives this setting.
        action: 'CREATE',
        // Sets the entityType field so the surrounding object or component receives this setting.
        entityType: 'Vendor',
        // Sets the entityId field so the surrounding object or component receives this setting.
        entityId: vendor.id,
        // Sets the newValues field so the surrounding object or component receives this setting.
        newValues: {
          // Sets the id field so the surrounding object or component receives this setting.
          id: vendor.id,
          // Sets the name field so the surrounding object or component receives this setting.
          name: vendor.name,
          // Sets the vendorType field so the surrounding object or component receives this setting.
          vendorType: vendor.vendorType,
          // Sets the gstin field so the surrounding object or component receives this setting.
          gstin: vendor.gstin,
          // Sets the isActive field so the surrounding object or component receives this setting.
          isActive: vendor.isActive,
        // Continues the component or data expression so its related values and behavior stay grouped together.
        } satisfies Prisma.InputJsonValue,
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Returns the result so the caller or React receives the value or interface this function provides.
    return vendor
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines updateVendor so this module can perform its named task when needed.
export async function updateVendor(actor: VendorActor, id: number, input: VendorUpdateInput) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.$transaction(async (tx) => {
    // Stores the value in existing so later lines can reuse this data or behavior for the current feature.
    const existing = await tx.vendor.findUnique({ where: { id } })
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!existing) throw new AppError('NOT_FOUND', 'Vendor not found.', 404)
    // Stores the value in vendor so later lines can reuse this data or behavior for the current feature.
    const vendor = await tx.vendor.update({
      // Sets the where field so the surrounding object or component receives this setting.
      where: { id },
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ...(input.name === undefined ? {} : { name: input.name }),
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ...(input.vendorType === undefined ? {} : { vendorType: input.vendorType as VendorType }),
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ...(input.gstin === undefined ? {} : { gstin: input.gstin }),
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ...(input.phone === undefined ? {} : { phone: input.phone }),
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ...(input.email === undefined ? {} : { email: input.email }),
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ...(input.contactPerson === undefined ? {} : { contactPerson: input.contactPerson }),
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ...(input.address === undefined ? {} : { address: input.address }),
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.auditLog.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Sets the userId field so the surrounding object or component receives this setting.
        userId: actor.id,
        // Sets the action field so the surrounding object or component receives this setting.
        action: 'UPDATE',
        // Sets the entityType field so the surrounding object or component receives this setting.
        entityType: 'Vendor',
        // Sets the entityId field so the surrounding object or component receives this setting.
        entityId: id,
        // Sets the oldValues field so the surrounding object or component receives this setting.
        oldValues: { id: existing.id, name: existing.name, vendorType: existing.vendorType, isActive: existing.isActive },
        // Sets the newValues field so the surrounding object or component receives this setting.
        newValues: { id: vendor.id, name: vendor.name, vendorType: vendor.vendorType, isActive: vendor.isActive },
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Returns the result so the caller or React receives the value or interface this function provides.
    return vendor
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines deactivateVendor so this module can perform its named task when needed.
export async function deactivateVendor(actor: VendorActor, id: number) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.$transaction(async (tx) => {
    // Stores the value in existing so later lines can reuse this data or behavior for the current feature.
    const existing = await tx.vendor.findUnique({ where: { id } })
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!existing) throw new AppError('NOT_FOUND', 'Vendor not found.', 404)
    // Stores the value in vendor so later lines can reuse this data or behavior for the current feature.
    const vendor = await tx.vendor.update({ where: { id }, data: { isActive: false } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.auditLog.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Sets the userId field so the surrounding object or component receives this setting.
        userId: actor.id,
        // Sets the action field so the surrounding object or component receives this setting.
        action: 'UPDATE',
        // Sets the entityType field so the surrounding object or component receives this setting.
        entityType: 'Vendor',
        // Sets the entityId field so the surrounding object or component receives this setting.
        entityId: id,
        // Sets the oldValues field so the surrounding object or component receives this setting.
        oldValues: { id: existing.id, name: existing.name, isActive: existing.isActive },
        // Sets the newValues field so the surrounding object or component receives this setting.
        newValues: { id: vendor.id, name: vendor.name, isActive: vendor.isActive },
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Returns the result so the caller or React receives the value or interface this function provides.
    return vendor
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines assertProject so this module can perform its named task when needed.
async function assertProject(actor: VendorActor, projectId: number) {
  // Stores the value in project so later lines can reuse this data or behavior for the current feature.
  const project = await prisma.project.findFirst({ where: { id: projectId, ...projectAccess(actor) }, select: { id: true } })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!project) throw new AppError('NOT_FOUND', 'Project not found.', 404)
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines listProjectVendors so this module can perform its named task when needed.
export async function listProjectVendors(actor: VendorActor, projectId: number) {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await assertProject(actor, projectId)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.projectVendorAssignment.findMany({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { projectId, unassignedAt: null },
    // Sets the include field so the surrounding object or component receives this setting.
    include: { vendor: true },
    // Sets the orderBy field so the surrounding object or component receives this setting.
    orderBy: { assignedAt: 'desc' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines assignVendor so this module can perform its named task when needed.
export async function assignVendor(actor: VendorActor, projectId: number, vendorId: number) {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await assertProject(actor, projectId)
  // Stores the value in vendor so later lines can reuse this data or behavior for the current feature.
  const vendor = await prisma.vendor.findUnique({ where: { id: vendorId } })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!vendor) throw new AppError('NOT_FOUND', 'Vendor not found.', 404)
  // Stores the value in active so later lines can reuse this data or behavior for the current feature.
  const active = await prisma.projectVendorAssignment.findFirst({ where: { projectId, vendorId, unassignedAt: null } })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (active) throw new AppError('CONFLICT', 'Vendor is already assigned to this project.', 409)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.$transaction(async (tx) => {
    // Stores the value in assignment so later lines can reuse this data or behavior for the current feature.
    const assignment = await tx.projectVendorAssignment.create({ data: { projectId, vendorId, assignedById: actor.id }, include: { vendor: true } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.auditLog.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: { userId: actor.id, action: 'CREATE', entityType: 'ProjectVendorAssignment', entityId: assignment.id, newValues: { projectId, vendorId, assignedAt: assignment.assignedAt.toISOString() } },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Returns the result so the caller or React receives the value or interface this function provides.
    return assignment
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines unassignVendor so this module can perform its named task when needed.
export async function unassignVendor(actor: VendorActor, projectId: number, vendorId: number) {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await assertProject(actor, projectId)
  // Stores the value in assignment so later lines can reuse this data or behavior for the current feature.
  const assignment = await prisma.projectVendorAssignment.findFirst({ where: { projectId, vendorId, unassignedAt: null } })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!assignment) throw new AppError('NOT_FOUND', 'Active vendor assignment not found.', 404)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.$transaction(async (tx) => {
    // Stores the value in updated so later lines can reuse this data or behavior for the current feature.
    const updated = await tx.projectVendorAssignment.update({ where: { id: assignment.id }, data: { unassignedAt: new Date() } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.auditLog.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: { userId: actor.id, action: 'UPDATE', entityType: 'ProjectVendorAssignment', entityId: updated.id, oldValues: { projectId, vendorId, unassignedAt: null }, newValues: { projectId, vendorId, unassignedAt: updated.unassignedAt?.toISOString() } },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Returns the result so the caller or React receives the value or interface this function provides.
    return updated
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}
