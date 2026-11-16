// Imports Router from express so this module can reuse that component, helper, or library.
import { Router } from 'express'
// Imports requireAuth from ../../middleware/auth.middleware.js so this module can reuse that component, helper, or library.
import { requireAuth } from '../../middleware/auth.middleware.js'
// Imports validateRequest from ../../middleware/validate.middleware.js so this module can reuse that component, helper, or library.
import { validateRequest } from '../../middleware/validate.middleware.js'
// Imports * as controller from ./milestones.controller.js so this module can reuse that component, helper, or library.
import * as controller from './milestones.controller.js'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  createMilestoneSchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  milestoneIdParamsSchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  updateMilestoneSchema,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from './milestones.validator.js'
// Imports projectScopedIdParamsSchema from ../projects/projects.validator.js so this module can reuse that component, helper, or library.
import { projectScopedIdParamsSchema } from '../projects/projects.validator.js'

// Stores the value in milestonesRoutes so later lines can reuse this data or behavior for the current feature.
export const milestonesRoutes = Router()
// Calls this helper or component so the feature can perform the operation or render the control represented here.
milestonesRoutes.use(requireAuth)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
milestonesRoutes.post(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  '/projects/:projectId/milestones',
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('params', projectScopedIdParamsSchema),
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('body', createMilestoneSchema),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  controller.create,
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
milestonesRoutes.get(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  '/projects/:projectId/milestones',
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('params', projectScopedIdParamsSchema),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  controller.list,
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
milestonesRoutes.get(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  '/milestones/:id',
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('params', milestoneIdParamsSchema),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  controller.detail,
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
milestonesRoutes.patch(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  '/milestones/:id',
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('params', milestoneIdParamsSchema),
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('body', updateMilestoneSchema),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  controller.update,
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
milestonesRoutes.delete(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  '/milestones/:id',
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  validateRequest('params', milestoneIdParamsSchema),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  controller.remove,
// Closes this function call or grouped expression so the surrounding code can continue.
)
