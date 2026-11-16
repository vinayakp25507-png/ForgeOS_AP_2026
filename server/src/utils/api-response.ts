// Imports type  Response from express so this module can reuse that component, helper, or library.
import type { Response } from 'express'

// Defines sendSuccess so this module can perform its named task when needed.
export function sendSuccess<T>(
  // Sets the response field so the surrounding object or component receives this setting.
  response: Response,
  // Sets the status field so the surrounding object or component receives this setting.
  status: number,
  // Sets the data field so the surrounding object or component receives this setting.
  data: T,
  // Sets the message field so the surrounding object or component receives this setting.
  message: string,
  // Sets the meta field so the surrounding object or component receives this setting.
  meta: unknown = null,
// Continues the component or data expression so its related values and behavior stay grouped together.
) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return response.status(status).json({
    // Sets the success field so the surrounding object or component receives this setting.
    success: true,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    message,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    data,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    meta,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}
