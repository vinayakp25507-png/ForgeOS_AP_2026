// Imports type  RequestHandler from express so this module can reuse that component, helper, or library.
import type { RequestHandler } from 'express'
// Imports type  ZodType from zod so this module can reuse that component, helper, or library.
import type { ZodType } from 'zod'
// Imports AppError from ../utils/errors.js so this module can reuse that component, helper, or library.
import { AppError } from '../utils/errors.js'

// Defines validateRequest so this module can perform its named task when needed.
export function validateRequest(
  // Sets the target field so the surrounding object or component receives this setting.
  target: 'body' | 'params' | 'query',
  // Sets the schema field so the surrounding object or component receives this setting.
  schema: ZodType,
// Continues the component or data expression so its related values and behavior stay grouped together.
): RequestHandler {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return (req, _res, next) => {
    // Stores the value in result so later lines can reuse this data or behavior for the current feature.
    const result = schema.safeParse(req[target])
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!result.success) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      next(new AppError(
        // Continues the component or data expression so its related values and behavior stay grouped together.
        'VALIDATION_ERROR',
        // Continues the component or data expression so its related values and behavior stay grouped together.
        'Validation failed.',
        // Continues the component or data expression so its related values and behavior stay grouped together.
        400,
        // Transforms each collection item so the corresponding values or interface elements can be produced.
        result.error.issues.map((issue) => ({
          // Sets the path field so the surrounding object or component receives this setting.
          path: issue.path.join('.'),
          // Sets the message field so the surrounding object or component receives this setting.
          message: issue.message,
        // Continues the component or data expression so its related values and behavior stay grouped together.
        })),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ))
      // Returns the result so the caller or React receives the value or interface this function provides.
      return
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    Object.defineProperty(req, target, {
      // Sets the value field so the surrounding object or component receives this setting.
      value: result.data,
      // Sets the configurable field so the surrounding object or component receives this setting.
      configurable: true,
      // Sets the enumerable field so the surrounding object or component receives this setting.
      enumerable: true,
      // Sets the writable field so the surrounding object or component receives this setting.
      writable: true,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    next()
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}
