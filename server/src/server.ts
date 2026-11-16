// Imports createApp from ./app.js so this module can reuse that component, helper, or library.
import { createApp } from './app.js'
// Imports env from ./config/env.js so this module can reuse that component, helper, or library.
import { env } from './config/env.js'
// Imports logger from ./config/logger.js so this module can reuse that component, helper, or library.
import { logger } from './config/logger.js'
// Imports prisma from ./utils/prisma.js so this module can reuse that component, helper, or library.
import { prisma } from './utils/prisma.js'

// Stores the value in app so later lines can reuse this data or behavior for the current feature.
const app = createApp()
// Stores the value in server so later lines can reuse this data or behavior for the current feature.
const server = app.listen(env.PORT, () => {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  logger.info({ port: env.PORT }, 'ForgeOS API listening')
// Continues the component or data expression so its related values and behavior stay grouped together.
})

// Defines shutdown so this module can perform its named task when needed.
async function shutdown(signal: string) {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  logger.info({ signal }, 'Shutting down ForgeOS API')
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  server.close(async () => {
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await prisma.$disconnect()
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    process.exit(0)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Calls this helper or component so the feature can perform the operation or render the control represented here.
process.once('SIGINT', () => void shutdown('SIGINT'))
// Calls this helper or component so the feature can perform the operation or render the control represented here.
process.once('SIGTERM', () => void shutdown('SIGTERM'))
