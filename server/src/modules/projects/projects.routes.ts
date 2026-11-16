// Imports Router from express so this module can reuse that component, helper, or library.
import { Router } from 'express'
// Imports requireAuth, requireRole from ../../middleware/auth.middleware.js so this module can reuse that component, helper, or library.
import { requireAuth, requireRole } from '../../middleware/auth.middleware.js'
// Imports validateRequest from ../../middleware/validate.middleware.js so this module can reuse that component, helper, or library.
import { validateRequest } from '../../middleware/validate.middleware.js'
// Imports * as controller from ./projects.controller.js so this module can reuse that component, helper, or library.
import * as controller from './projects.controller.js'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  createProjectSchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  projectIdParamsSchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  projectActivityQuerySchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  projectListQuerySchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  projectProgressHistoryQuerySchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  projectDateRangeQuerySchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  projectScopedIdParamsSchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  updateProjectSchema,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from './projects.validator.js'

// Stores the value in projectsRoutes so later lines can reuse this data or behavior for the current feature.
export const projectsRoutes = Router()
// Calls this helper or component so the feature can perform the operation or render the control represented here.
projectsRoutes.use(requireAuth)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
projectsRoutes.get('/projects', validateRequest('query', projectListQuerySchema), controller.list)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
projectsRoutes.get(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  '/projects/:projectId/progress-history',
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('params', projectScopedIdParamsSchema),
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('query', projectProgressHistoryQuerySchema),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  controller.progressHistory,
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
projectsRoutes.get(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  '/projects/:projectId/summary',
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('params', projectScopedIdParamsSchema),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  controller.summary,
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
projectsRoutes.get(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  '/projects/:projectId/activity',
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('params', projectScopedIdParamsSchema),
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('query', projectActivityQuerySchema),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  controller.activity,
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
projectsRoutes.get(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  '/projects/:projectId/labour-summary',
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('params', projectScopedIdParamsSchema),
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('query', projectDateRangeQuerySchema),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  controller.labourSummary,
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
projectsRoutes.get(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  '/projects/:projectId/machinery-summary',
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('params', projectScopedIdParamsSchema),
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('query', projectDateRangeQuerySchema),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  controller.machinerySummary,
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
projectsRoutes.get(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  '/projects/:projectId/worker-count-history',
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('params', projectScopedIdParamsSchema),
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('query', projectDateRangeQuerySchema),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  controller.workerCountHistory,
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
projectsRoutes.get(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  '/projects/:projectId/machinery-usage-history',
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('params', projectScopedIdParamsSchema),
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('query', projectDateRangeQuerySchema),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  controller.machineryUsageHistory,
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
projectsRoutes.get('/projects/:id', validateRequest('params', projectIdParamsSchema), controller.detail)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
projectsRoutes.post('/projects', requireRole('ADMIN'), validateRequest('body', createProjectSchema), controller.create)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
projectsRoutes.patch('/projects/:id', validateRequest('params', projectIdParamsSchema), validateRequest('body', updateProjectSchema), controller.update)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
projectsRoutes.delete('/projects/:id', requireRole('ADMIN'), validateRequest('params', projectIdParamsSchema), controller.remove)
