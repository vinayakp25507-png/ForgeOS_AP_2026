// Imports pino from pino so this module can reuse that component, helper, or library.
import pino from 'pino'
// Imports env from ./env.js so this module can reuse that component, helper, or library.
import { env } from './env.js'

// Stores the value in logger so later lines can reuse this data or behavior for the current feature.
export const logger = pino({
  // Sets the level field so the surrounding object or component receives this setting.
  level: env.LOG_LEVEL,
  // Sets the redact field so the surrounding object or component receives this setting.
  redact: ['req.headers.authorization', 'password', 'passwordHash'],
// Continues the component or data expression so its related values and behavior stay grouped together.
})
