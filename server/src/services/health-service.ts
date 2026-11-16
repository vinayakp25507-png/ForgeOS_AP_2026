// Imports prisma from ../utils/prisma.js so this module can reuse that component, helper, or library.
import { prisma } from '../utils/prisma.js'
// Imports logger from ../config/logger.js so this module can reuse that component, helper, or library.
import { logger } from '../config/logger.js'

// Defines getHealthStatus so this module can perform its named task when needed.
export async function getHealthStatus() {
  // Starts an error-handling region so failures can be caught and handled safely.
  try {
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.$queryRaw`SELECT 1`
    // Returns the result so the caller or React receives the value or interface this function provides.
    return {
      // Sets the api field so the surrounding object or component receives this setting.
      api: 'ok' as const,
      // Sets the server field so the surrounding object or component receives this setting.
      server: 'ok' as const,
      // Sets the database field so the surrounding object or component receives this setting.
      database: 'connected' as const,
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } catch (error) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    logger.warn({ err: error }, 'Database health check failed')
    // Returns the result so the caller or React receives the value or interface this function provides.
    return {
      // Sets the api field so the surrounding object or component receives this setting.
      api: 'ok' as const,
      // Sets the server field so the surrounding object or component receives this setting.
      server: 'ok' as const,
      // Sets the database field so the surrounding object or component receives this setting.
      database: 'disconnected' as const,
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}
