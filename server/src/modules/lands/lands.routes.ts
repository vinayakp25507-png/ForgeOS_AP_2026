// Imports Router from express so this module can reuse that component, helper, or library.
import { Router } from 'express'
// Imports requireAuth, requireRole from ../../middleware/auth.middleware.js so this module can reuse that component, helper, or library.
import { requireAuth, requireRole } from '../../middleware/auth.middleware.js'
// Imports validateRequest from ../../middleware/validate.middleware.js so this module can reuse that component, helper, or library.
import { validateRequest } from '../../middleware/validate.middleware.js'
// Imports * as controller from ./lands.controller.js so this module can reuse that component, helper, or library.
import * as controller from './lands.controller.js'
// Imports createLandSchema, landIdParamsSchema, landListQuerySchema, updateLandSchema from ./lands.validator.js so this module can reuse that component, helper, or library.
import { createLandSchema, landIdParamsSchema, landListQuerySchema, updateLandSchema } from './lands.validator.js'

// Stores the value in landsRoutes so later lines can reuse this data or behavior for the current feature.
export const landsRoutes = Router()
// Calls this helper or component so the feature can perform the operation or render the control represented here.
landsRoutes.use(requireAuth)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
landsRoutes.get('/lands', validateRequest('query', landListQuerySchema), controller.list)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
landsRoutes.get('/lands/:id', validateRequest('params', landIdParamsSchema), controller.detail)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
landsRoutes.post('/lands', requireRole('ADMIN'), validateRequest('body', createLandSchema), controller.create)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
landsRoutes.patch('/lands/:id', requireRole('ADMIN'), validateRequest('params', landIdParamsSchema), validateRequest('body', updateLandSchema), controller.update)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
landsRoutes.delete('/lands/:id', requireRole('ADMIN'), validateRequest('params', landIdParamsSchema), controller.remove)
