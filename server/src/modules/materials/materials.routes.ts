// Imports Router from express so this module can reuse that component, helper, or library.
import { Router } from 'express'
// Imports requireAuth, requireRole from ../../middleware/auth.middleware.js so this module can reuse that component, helper, or library.
import { requireAuth, requireRole } from '../../middleware/auth.middleware.js'
// Imports validateRequest from ../../middleware/validate.middleware.js so this module can reuse that component, helper, or library.
import { validateRequest } from '../../middleware/validate.middleware.js'
// Imports * as controller from ./materials.controller.js so this module can reuse that component, helper, or library.
import * as controller from './materials.controller.js'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  createMaterialSchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  materialIdParamsSchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  materialListQuerySchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  updateMaterialSchema,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from './materials.validator.js'

// Stores the value in materialsRoutes so later lines can reuse this data or behavior for the current feature.
export const materialsRoutes = Router()
// Calls this helper or component so the feature can perform the operation or render the control represented here.
materialsRoutes.use(requireAuth)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
materialsRoutes.get('/materials', validateRequest('query', materialListQuerySchema), controller.list)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
materialsRoutes.get('/materials/:id', validateRequest('params', materialIdParamsSchema), controller.detail)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
materialsRoutes.post('/materials', requireRole('ADMIN'), validateRequest('body', createMaterialSchema), controller.create)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
materialsRoutes.patch('/materials/:id', requireRole('ADMIN'), validateRequest('params', materialIdParamsSchema), validateRequest('body', updateMaterialSchema), controller.update)
