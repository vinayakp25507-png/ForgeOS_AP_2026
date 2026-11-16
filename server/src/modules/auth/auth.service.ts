// Imports prisma from ../../utils/prisma.js so this module can reuse that component, helper, or library.
import { prisma } from '../../utils/prisma.js'
// Imports AppError from ../../utils/errors.js so this module can reuse that component, helper, or library.
import { AppError } from '../../utils/errors.js'
// Imports verifyPassword from ../../utils/password.js so this module can reuse that component, helper, or library.
import { verifyPassword } from '../../utils/password.js'
// Imports createAccessToken from ../../utils/jwt.js so this module can reuse that component, helper, or library.
import { createAccessToken } from '../../utils/jwt.js'

// Defines safeUser so this module can perform its named task when needed.
export function safeUser(user: { id: number; name: string; email: string; role: 'ADMIN' | 'PM'; phone: string | null; isActive: boolean; createdAt: Date; updatedAt: Date }) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return {
    // Sets the id field so the surrounding object or component receives this setting.
    id: user.id,
    // Sets the name field so the surrounding object or component receives this setting.
    name: user.name,
    // Sets the email field so the surrounding object or component receives this setting.
    email: user.email,
    // Sets the role field so the surrounding object or component receives this setting.
    role: user.role,
    // Sets the phone field so the surrounding object or component receives this setting.
    phone: user.phone,
    // Sets the isActive field so the surrounding object or component receives this setting.
    isActive: user.isActive,
    // Sets the createdAt field so the surrounding object or component receives this setting.
    createdAt: user.createdAt,
    // Sets the updatedAt field so the surrounding object or component receives this setting.
    updatedAt: user.updatedAt,
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines login so this module can perform its named task when needed.
export async function login(email: string, password: string) {
  // Stores the value in user so later lines can reuse this data or behavior for the current feature.
  const user = await prisma.user.findUnique({ where: { email } })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!user || !user.isActive || !verifyPassword(password, user.passwordHash)) {
    // Stops the current operation with an error so the calling code can handle the failure.
    throw new AppError('INVALID_CREDENTIALS', 'Invalid email or password.', 401)
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Stores the value in updated so later lines can reuse this data or behavior for the current feature.
  const updated = await prisma.user.update({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { id: user.id },
    // Sets the data field so the surrounding object or component receives this setting.
    data: { lastLoginAt: new Date() },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Returns the result so the caller or React receives the value or interface this function provides.
  return { token: createAccessToken(user), user: safeUser(updated) }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getCurrentUser so this module can perform its named task when needed.
export async function getCurrentUser(id: number) {
  // Stores the value in user so later lines can reuse this data or behavior for the current feature.
  const user = await prisma.user.findUnique({ where: { id } })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!user || !user.isActive) throw new AppError('UNAUTHENTICATED', 'Authentication is required.', 401)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return safeUser(user)
// Closes the current block or object so the grouped statements or settings end here.
}
