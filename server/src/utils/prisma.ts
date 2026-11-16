// Imports PrismaClient from @prisma/client so this module can reuse that component, helper, or library.
import { PrismaClient } from '@prisma/client'
// Imports env from ../config/env.js so this module can reuse that component, helper, or library.
import { env } from '../config/env.js'

// Stores the value in prisma so later lines can reuse this data or behavior for the current feature.
export const prisma = new PrismaClient({
  // Sets the log field so the surrounding object or component receives this setting.
  log: env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
// Continues the component or data expression so its related values and behavior stay grouped together.
})
