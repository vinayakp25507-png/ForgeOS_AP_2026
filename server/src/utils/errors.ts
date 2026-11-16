// Continues the component or data expression so its related values and behavior stay grouped together.
export type ErrorCode =
  // Continues the component or data expression so its related values and behavior stay grouped together.
  | 'VALIDATION_ERROR'
  // Continues the component or data expression so its related values and behavior stay grouped together.
  | 'NOT_FOUND'
  // Continues the component or data expression so its related values and behavior stay grouped together.
  | 'INTERNAL_ERROR'

// Continues the component or data expression so its related values and behavior stay grouped together.
export class AppError extends Error {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  constructor(
    // Continues the component or data expression so its related values and behavior stay grouped together.
    public readonly code: ErrorCode,
    // Sets the message field so the surrounding object or component receives this setting.
    message: string,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    public readonly status = 400,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    public readonly details?: unknown,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    super(message)
    // Continues the component or data expression so its related values and behavior stay grouped together.
    this.name = 'AppError'
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}
