// Imports createHmac, timingSafeEqual from node:crypto so this module can reuse that component, helper, or library.
import { createHmac, timingSafeEqual } from 'node:crypto'
// Imports type  Role from @prisma/client so this module can reuse that component, helper, or library.
import type { Role } from '@prisma/client'
// Imports env from ../config/env.js so this module can reuse that component, helper, or library.
import { env } from '../config/env.js'

// Continues the component or data expression so its related values and behavior stay grouped together.
type JwtPayload = {
  // Sets the sub field so the surrounding object or component receives this setting.
  sub: string
  // Sets the role field so the surrounding object or component receives this setting.
  role: Role
  // Sets the iat field so the surrounding object or component receives this setting.
  iat: number
  // Sets the exp field so the surrounding object or component receives this setting.
  exp: number
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines encode so this module can perform its named task when needed.
function encode(value: unknown): string {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return Buffer.from(JSON.stringify(value)).toString('base64url')
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines sign so this module can perform its named task when needed.
function sign(input: string): string {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return createHmac('sha256', env.JWT_SECRET).update(input).digest('base64url')
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines expirySeconds so this module can perform its named task when needed.
function expirySeconds(value: string): number {
  // Stores the value in match so later lines can reuse this data or behavior for the current feature.
  const match = /^(\d+)([smhd])$/.exec(value)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!match) throw new Error('JWT_EXPIRES_IN must use a duration such as 15m or 1h')
  // Stores the value in units so later lines can reuse this data or behavior for the current feature.
  const units = { s: 1, m: 60, h: 3600, d: 86400 } as const
  // Returns the result so the caller or React receives the value or interface this function provides.
  return Number(match[1]) * units[match[2] as keyof typeof units]
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines createAccessToken so this module can perform its named task when needed.
export function createAccessToken(user: { id: number; role: Role }): string {
  // Stores the value in now so later lines can reuse this data or behavior for the current feature.
  const now = Math.floor(Date.now() / 1000)
  // Stores the value in payload so later lines can reuse this data or behavior for the current feature.
  const payload: JwtPayload = {
    // Sets the sub field so the surrounding object or component receives this setting.
    sub: String(user.id),
    // Sets the role field so the surrounding object or component receives this setting.
    role: user.role,
    // Sets the iat field so the surrounding object or component receives this setting.
    iat: now,
    // Sets the exp field so the surrounding object or component receives this setting.
    exp: now + expirySeconds(env.JWT_EXPIRES_IN),
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Stores the value in header so later lines can reuse this data or behavior for the current feature.
  const header = encode({ alg: 'HS256', typ: 'JWT' })
  // Stores the value in body so later lines can reuse this data or behavior for the current feature.
  const body = encode(payload)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return `${header}.${body}.${sign(`${header}.${body}`)}`
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines verifyAccessToken so this module can perform its named task when needed.
export function verifyAccessToken(token: string): JwtPayload {
  // Stores the value in parts so later lines can reuse this data or behavior for the current feature.
  const parts = token.split('.')
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (parts.length !== 3) throw new Error('Invalid token')
  // Continues the component or data expression so its related values and behavior stay grouped together.
  const [header, body, signature] = parts
  // Stores the value in expected so later lines can reuse this data or behavior for the current feature.
  const expected = Buffer.from(sign(`${header}.${body}`))
  // Stores the value in actual so later lines can reuse this data or behavior for the current feature.
  const actual = Buffer.from(signature)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) throw new Error('Invalid token')

  // Stores the value in payload so later lines can reuse this data or behavior for the current feature.
  let payload: JwtPayload
  // Starts an error-handling region so failures can be caught and handled safely.
  try {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as JwtPayload
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } catch {
    // Stops the current operation with an error so the calling code can handle the failure.
    throw new Error('Invalid token')
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (payload.sub === undefined || !Number.isInteger(Number(payload.sub)) || !payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) {
    // Stops the current operation with an error so the calling code can handle the failure.
    throw new Error('Expired or invalid token')
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (payload.role !== 'ADMIN' && payload.role !== 'PM') throw new Error('Invalid token')
  // Returns the result so the caller or React receives the value or interface this function provides.
  return payload
// Closes the current block or object so the grouped statements or settings end here.
}
