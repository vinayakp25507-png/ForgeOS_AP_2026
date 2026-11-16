// Imports express from express so this module can reuse that component, helper, or library.
import express from 'express'
// Imports cors from cors so this module can reuse that component, helper, or library.
import cors from 'cors'
// Imports helmet from helmet so this module can reuse that component, helper, or library.
import helmet from 'helmet'
// Imports pinoHttp from pino-http so this module can reuse that component, helper, or library.
import pinoHttp from 'pino-http'
// Imports env from ./config/env.js so this module can reuse that component, helper, or library.
import { env } from './config/env.js'
// Imports logger from ./config/logger.js so this module can reuse that component, helper, or library.
import { logger } from './config/logger.js'
// Imports healthRoutes from ./routes/health-routes.js so this module can reuse that component, helper, or library.
import { healthRoutes } from './routes/health-routes.js'
// Imports errorHandler, notFoundHandler from ./middleware/error-handler.js so this module can reuse that component, helper, or library.
import { errorHandler, notFoundHandler } from './middleware/error-handler.js'

// Defines createApp so this module can perform its named task when needed.
export function createApp() {
  // Stores the value in app so later lines can reuse this data or behavior for the current feature.
  const app = express()

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  app.use(helmet())
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  app.use(cors({ origin: env.CORS_ORIGIN }))
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  app.use(express.json())
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  app.use(pinoHttp({ logger }))

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  app.use('/api/v1', healthRoutes)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  app.use(notFoundHandler)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  app.use(errorHandler)

  // Returns the result so the caller or React receives the value or interface this function provides.
  return app
// Closes the current block or object so the grouped statements or settings end here.
}
