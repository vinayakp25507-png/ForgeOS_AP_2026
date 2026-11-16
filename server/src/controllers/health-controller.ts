// Imports type  RequestHandler from express so this module can reuse that component, helper, or library.
import type { RequestHandler } from 'express'
// Imports getHealthStatus from ../services/health-service.js so this module can reuse that component, helper, or library.
import { getHealthStatus } from '../services/health-service.js'

// Stores the value in getHealth so later lines can reuse this data or behavior for the current feature.
export const getHealth: RequestHandler = async (_req, res) => {
  // Stores the value in status so later lines can reuse this data or behavior for the current feature.
  const status = await getHealthStatus()
  // Stores the value in healthy so later lines can reuse this data or behavior for the current feature.
  const healthy = status.database === 'connected'

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  res.status(healthy ? 200 : 503).json({
    // Sets the success field so the surrounding object or component receives this setting.
    success: healthy,
    // Sets the data field so the surrounding object or component receives this setting.
    data: {
      // Sets the status field so the surrounding object or component receives this setting.
      status: healthy ? 'ok' : 'degraded',
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ...status,
    // Closes the current block or object so the grouped statements or settings end here.
    },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}
