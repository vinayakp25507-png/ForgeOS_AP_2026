// Imports Router from express so this module can reuse that component, helper, or library.
import { Router } from 'express'
// Imports getHealth from ../controllers/health-controller.js so this module can reuse that component, helper, or library.
import { getHealth } from '../controllers/health-controller.js'

// Stores the value in healthRoutes so later lines can reuse this data or behavior for the current feature.
export const healthRoutes = Router()
// Calls this helper or component so the feature can perform the operation or render the control represented here.
healthRoutes.get('/health', getHealth)
