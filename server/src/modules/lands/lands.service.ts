// Imports type  Role from @prisma/client so this module can reuse that component, helper, or library.
import type { Role } from '@prisma/client'
// Imports prisma from ../../utils/prisma.js so this module can reuse that component, helper, or library.
import { prisma } from '../../utils/prisma.js'
// Imports AppError from ../../utils/errors.js so this module can reuse that component, helper, or library.
import { AppError } from '../../utils/errors.js'

// Continues the component or data expression so its related values and behavior stay grouped together.
type Actor = { id: number; role: Role }

// Defines access so this module can perform its named task when needed.
function access(actor: Actor) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return actor.role === 'ADMIN' ? {} : { projects: { some: { assignedPmId: actor.id } } }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines listLands so this module can perform its named task when needed.
export async function listLands(actor: Actor, page: number, pageSize: number, search?: string) {
  // Stores the value in where so later lines can reuse this data or behavior for the current feature.
  const where = {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...access(actor),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(search ? { OR: [{ name: { contains: search, mode: 'insensitive' as const } }, { city: { contains: search, mode: 'insensitive' as const } }] } : {}),
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Waits for the asynchronous result before using it, so later work receives completed data.
  const [lands, total] = await prisma.$transaction([
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    prisma.land.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * pageSize, take: pageSize }),
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    prisma.land.count({ where }),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ])
  // Returns the result so the caller or React receives the value or interface this function provides.
  return { lands, meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) } }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getLand so this module can perform its named task when needed.
export async function getLand(actor: Actor, id: number) {
  // Stores the value in land so later lines can reuse this data or behavior for the current feature.
  const land = await prisma.land.findFirst({ where: { id, ...access(actor) } })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!land) throw new AppError('NOT_FOUND', 'Land not found.', 404)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return land
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines createLand so this module can perform its named task when needed.
export async function createLand(actor: Actor, input: Record<string, unknown>) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.land.create({ data: { ...input, createdById: actor.id } as never })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines updateLand so this module can perform its named task when needed.
export async function updateLand(id: number, input: Record<string, unknown>) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.land.update({ where: { id }, data: input as never })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines deleteLand so this module can perform its named task when needed.
export async function deleteLand(id: number) {
  // Stores the value in land so later lines can reuse this data or behavior for the current feature.
  const land = await prisma.land.findUnique({ where: { id }, select: { id: true, _count: { select: { projects: true } } } })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!land) throw new AppError('NOT_FOUND', 'Land not found.', 404)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (land._count.projects > 0) throw new AppError('BUSINESS_RULE_VIOLATION', 'Land cannot be deleted while projects depend on it.', 409)
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await prisma.land.delete({ where: { id } })
// Closes the current block or object so the grouped statements or settings end here.
}
