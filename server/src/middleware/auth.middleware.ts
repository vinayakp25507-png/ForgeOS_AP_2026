// Imports type  RequestHandler from express so this module can reuse that component, helper, or library.
import type { RequestHandler } from 'express'
// Imports AppError from ../utils/errors.js so this module can reuse that component, helper, or library.
import { AppError } from '../utils/errors.js'
// Imports prisma from ../utils/prisma.js so this module can reuse that component, helper, or library.
import { prisma } from '../utils/prisma.js'
// Imports verifyAccessToken from ../utils/jwt.js so this module can reuse that component, helper, or library.
import { verifyAccessToken } from '../utils/jwt.js'

/**
 * Authentication is owned by the identity module. This contract lets feature
 * routes consume its verified request user without implementing JWT logic here.
 */
// Stores the value in requireAuth so later lines can reuse this data or behavior for the current feature.
export const requireAuth: RequestHandler = (req, _res, next) => {
  // Stores the value in header so later lines can reuse this data or behavior for the current feature.
  const header = req.header('authorization')
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!header?.startsWith('Bearer ')) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    next(new AppError('UNAUTHENTICATED', 'Authentication is required.', 401))
    // Returns the result so the caller or React receives the value or interface this function provides.
    return
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Starts an error-handling region so failures can be caught and handled safely.
  try {
    // Stores the value in payload so later lines can reuse this data or behavior for the current feature.
    const payload = verifyAccessToken(header.slice(7))
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    void prisma.user.findUnique({
      // Sets the where field so the surrounding object or component receives this setting.
      where: { id: Number(payload.sub) },
      // Sets the select field so the surrounding object or component receives this setting.
      select: { id: true, role: true, email: true, name: true, isActive: true },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }).then((user) => {
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (!user || !user.isActive) {
        // Calls this helper or component so the feature can perform the operation or render the control represented here.
        next(new AppError('UNAUTHENTICATED', 'Authentication is required.', 401))
        // Returns the result so the caller or React receives the value or interface this function provides.
        return
      // Closes the current block or object so the grouped statements or settings end here.
      }
      // Continues the component or data expression so its related values and behavior stay grouped together.
      req.user = { id: user.id, role: user.role, email: user.email, name: user.name }
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      next()
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }).catch(next)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } catch {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    next(new AppError('UNAUTHENTICATED', 'Invalid or expired authentication token.', 401))
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines requireRole so this module can perform its named task when needed.
export function requireRole(...roles: Array<'ADMIN' | 'PM'>): RequestHandler {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return (req, _res, next) => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!req.user) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      next(new AppError('UNAUTHENTICATED', 'Authentication is required.', 401))
    // Continues the component or data expression so its related values and behavior stay grouped together.
    } else if (!roles.includes(req.user.role)) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      next(new AppError('FORBIDDEN', 'You do not have permission to perform this action.', 403))
    // Continues the component or data expression so its related values and behavior stay grouped together.
    } else {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      next()
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}
