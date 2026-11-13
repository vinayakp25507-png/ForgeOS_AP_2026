export type ErrorCode =
  | 'VALIDATION_ERROR'
<<<<<<< HEAD
  | 'NOT_FOUND'
  | 'INTERNAL_ERROR'
=======
  | 'UNAUTHENTICATED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'INSUFFICIENT_STOCK'
  | 'BUSINESS_RULE_VIOLATION'
  | 'INTERNAL_ERROR'
  | 'INVALID_CREDENTIALS'
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message: string,
    public readonly status = 400,
    public readonly details?: unknown,
  ) {
    super(message)
    this.name = 'AppError'
  }
}
