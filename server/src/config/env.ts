// Continues the component or data expression so its related values and behavior stay grouped together.
import 'dotenv/config'
// Imports z from zod so this module can reuse that component, helper, or library.
import { z } from 'zod'

// Stores the value in envSchema so later lines can reuse this data or behavior for the current feature.
const envSchema = z.object({
  // Sets the NODE_ENV field so the surrounding object or component receives this setting.
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  // Sets the PORT field so the surrounding object or component receives this setting.
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  // Sets the DATABASE_URL field so the surrounding object or component receives this setting.
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  // Sets the CORS_ORIGIN field so the surrounding object or component receives this setting.
  CORS_ORIGIN: z.string().url().default('http://localhost:5173'),
  // Sets the LOG_LEVEL field so the surrounding object or component receives this setting.
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
// Continues the component or data expression so its related values and behavior stay grouped together.
})

// Stores the value in env so later lines can reuse this data or behavior for the current feature.
export const env = envSchema.parse(process.env)
