// Imports randomBytes, scryptSync, timingSafeEqual from node:crypto so this module can reuse that component, helper, or library.
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

// Defines hashPassword so this module can perform its named task when needed.
export function hashPassword(password: string): string {
  // Stores the value in salt so later lines can reuse this data or behavior for the current feature.
  const salt = randomBytes(16).toString('hex')
  // Stores the value in hash so later lines can reuse this data or behavior for the current feature.
  const hash = scryptSync(password, salt, 64).toString('hex')
  // Returns the result so the caller or React receives the value or interface this function provides.
  return `scrypt$${salt}$${hash}`
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines verifyPassword so this module can perform its named task when needed.
export function verifyPassword(password: string, storedHash: string): boolean {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [algorithm, salt, expected] = storedHash.split('$')
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (algorithm !== 'scrypt' || !salt || !expected || expected.length % 2 !== 0) return false

  // Stores the value in actual so later lines can reuse this data or behavior for the current feature.
  const actual = scryptSync(password, salt, expected.length / 2)
  // Stores the value in expectedBuffer so later lines can reuse this data or behavior for the current feature.
  const expectedBuffer = Buffer.from(expected, 'hex')
  // Returns the result so the caller or React receives the value or interface this function provides.
  return actual.length === expectedBuffer.length && timingSafeEqual(actual, expectedBuffer)
// Closes the current block or object so the grouped statements or settings end here.
}
