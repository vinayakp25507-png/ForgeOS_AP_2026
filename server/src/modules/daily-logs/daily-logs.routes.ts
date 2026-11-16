// Imports Router from express so this module can reuse that component, helper, or library.
import { Router } from 'express'
// Imports requireAuth from ../../middleware/auth.middleware.js so this module can reuse that component, helper, or library.
import { requireAuth } from '../../middleware/auth.middleware.js'
// Imports validateRequest from ../../middleware/validate.middleware.js so this module can reuse that component, helper, or library.
import { validateRequest } from '../../middleware/validate.middleware.js'
// Imports * as controller from ./daily-logs.controller.js so this module can reuse that component, helper, or library.
import * as controller from './daily-logs.controller.js'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  dailyLogBodySchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  dailyLogIdParamsSchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  dailyLogListQuerySchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  dailyLogPatchSchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  projectIdParamsSchema,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from './daily-logs.validator.js'

// Stores the value in dailyLogsRoutes so later lines can reuse this data or behavior for the current feature.
export const dailyLogsRoutes = Router()
// Calls this helper or component so the feature can perform the operation or render the control represented here.
dailyLogsRoutes.use(requireAuth)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
dailyLogsRoutes.get(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  '/projects/:projectId/daily-logs',
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('params', projectIdParamsSchema),
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('query', dailyLogListQuerySchema),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  controller.list,
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
dailyLogsRoutes.post(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  '/projects/:projectId/daily-logs',
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('params', projectIdParamsSchema),
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('body', dailyLogBodySchema),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  controller.create,
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
dailyLogsRoutes.get(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  '/daily-logs/:id',
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('params', dailyLogIdParamsSchema),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  controller.detail,
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
dailyLogsRoutes.patch(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  '/daily-logs/:id',
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('params', dailyLogIdParamsSchema),
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('body', dailyLogPatchSchema),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  controller.update,
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
dailyLogsRoutes.delete(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  '/daily-logs/:id',
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('params', dailyLogIdParamsSchema),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  controller.remove,
// Closes this function call or grouped expression so the surrounding code can continue.
)
