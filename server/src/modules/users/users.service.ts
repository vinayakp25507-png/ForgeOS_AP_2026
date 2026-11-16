// Imports type  Role from @prisma/client so this module can reuse that component, helper, or library.
import type { Role } from '@prisma/client'
// Imports prisma from ../../utils/prisma.js so this module can reuse that component, helper, or library.
import { prisma } from '../../utils/prisma.js'
// Imports AppError from ../../utils/errors.js so this module can reuse that component, helper, or library.
import { AppError } from '../../utils/errors.js'
// Imports hashPassword from ../../utils/password.js so this module can reuse that component, helper, or library.
import { hashPassword } from '../../utils/password.js'
// Imports safeUser from ../auth/auth.service.js so this module can reuse that component, helper, or library.
import { safeUser } from '../auth/auth.service.js'

// Continues the component or data expression so its related values and behavior stay grouped together.
type Actor = { id: number; role: Role }

// Defines listUsers so this module can perform its named task when needed.
export async function listUsers(page: number, pageSize: number, search?: string) {
  // Stores the value in where so later lines can reuse this data or behavior for the current feature.
  const where = search ? { OR: [{ name: { contains: search, mode: 'insensitive' as const } }, { email: { contains: search, mode: 'insensitive' as const } }] } : {}
  // Waits for the asynchronous result before using it, so later work receives completed data.
  const [users, total] = await prisma.$transaction([
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    prisma.user.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * pageSize, take: pageSize }),
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    prisma.user.count({ where }),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ])
  // Returns the result so the caller or React receives the value or interface this function provides.
  return { users: users.map(safeUser), meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) } }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getUser so this module can perform its named task when needed.
export async function getUser(id: number) {
  // Stores the value in user so later lines can reuse this data or behavior for the current feature.
  const user = await prisma.user.findUnique({ where: { id } })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!user) throw new AppError('NOT_FOUND', 'User not found.', 404)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return safeUser(user)
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines createUser so this module can perform its named task when needed.
export async function createUser(input: { name: string; email: string; password: string; role: Role; phone?: string | null }) {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  const { password, ...userData } = input
  // Returns the result so the caller or React receives the value or interface this function provides.
  return safeUser(await prisma.user.create({
    // Sets the data field so the surrounding object or component receives this setting.
    data: { ...userData, passwordHash: hashPassword(password), phone: input.phone ?? null },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }))
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines updateUser so this module can perform its named task when needed.
export async function updateUser(actor: Actor, id: number, input: { name?: string; email?: string; password?: string; role?: Role; phone?: string | null }) {
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (actor.id === id && input.role && input.role !== 'ADMIN') {
    // Stops the current operation with an error so the calling code can handle the failure.
    throw new AppError('BUSINESS_RULE_VIOLATION', 'You cannot remove your own administrator role.', 400)
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  const { password, ...rest } = input
  // Stores the value in data so later lines can reuse this data or behavior for the current feature.
  const data = password ? { ...rest, passwordHash: hashPassword(password) } : rest
  // Returns the result so the caller or React receives the value or interface this function provides.
  return safeUser(await prisma.user.update({ where: { id }, data }))
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines updateUserStatus so this module can perform its named task when needed.
export async function updateUserStatus(actor: Actor, id: number, isActive: boolean) {
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (actor.id === id && !isActive) throw new AppError('BUSINESS_RULE_VIOLATION', 'You cannot deactivate your own account.', 400)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return safeUser(await prisma.user.update({ where: { id }, data: { isActive } }))
// Closes the current block or object so the grouped statements or settings end here.
}
