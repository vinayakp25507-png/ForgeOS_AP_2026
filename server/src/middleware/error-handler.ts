// Imports type  ErrorRequestHandler, RequestHandler from express so this module can reuse that component, helper, or library.
import type { ErrorRequestHandler, RequestHandler } from 'express'
// Imports Prisma from @prisma/client so this module can reuse that component, helper, or library.
import { Prisma } from '@prisma/client'
// Imports logger from ../config/logger.js so this module can reuse that component, helper, or library.
import { logger } from '../config/logger.js'
// Imports AppError from ../utils/errors.js so this module can reuse that component, helper, or library.
import { AppError } from '../utils/errors.js'

// Stores the value in notFoundHandler so later lines can reuse this data or behavior for the current feature.
export const notFoundHandler: RequestHandler = (req, _res, next) => {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  next(new AppError('NOT_FOUND', `Route not found: ${req.method} ${req.originalUrl}`, 404))
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in errorHandler so later lines can reuse this data or behavior for the current feature.
export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (error instanceof AppError) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    res.status(error.status).json({
      // Sets the success field so the surrounding object or component receives this setting.
      success: false,
      // Sets the error field so the surrounding object or component receives this setting.
      error: { code: error.code, message: error.message, details: error.details },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Returns the result so the caller or React receives the value or interface this function provides.
    return
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    res.status(500).json({
      // Sets the success field so the surrounding object or component receives this setting.
      success: false,
      // Sets the error field so the surrounding object or component receives this setting.
      error: { code: 'INTERNAL_ERROR', message: 'A database error occurred.' },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    logger.error({ err: error, method: req.method, path: req.originalUrl }, 'Database request failed')
    // Returns the result so the caller or React receives the value or interface this function provides.
    return
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  logger.error({ err: error, method: req.method, path: req.originalUrl }, 'Unhandled request error')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  res.status(500).json({
    // Sets the success field so the surrounding object or component receives this setting.
    success: false,
    // Sets the error field so the surrounding object or component receives this setting.
    error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred.' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}
