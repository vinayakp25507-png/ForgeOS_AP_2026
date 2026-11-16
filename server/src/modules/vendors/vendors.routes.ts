// Imports Router from express so this module can reuse that component, helper, or library.
import { Router } from 'express'
// Imports requireAuth, requireRole from ../../middleware/auth.middleware.js so this module can reuse that component, helper, or library.
import { requireAuth, requireRole } from '../../middleware/auth.middleware.js'
// Imports validateRequest from ../../middleware/validate.middleware.js so this module can reuse that component, helper, or library.
import { validateRequest } from '../../middleware/validate.middleware.js'
// Imports * as controller from ./vendors.controller.js so this module can reuse that component, helper, or library.
import * as controller from './vendors.controller.js'
// Imports createVendorSchema, projectVendorParamsSchema, updateVendorSchema, vendorIdParamsSchema, vendorListQuerySchema from ./vendors.validator.js so this module can reuse that component, helper, or library.
import { createVendorSchema, projectVendorParamsSchema, updateVendorSchema, vendorIdParamsSchema, vendorListQuerySchema } from './vendors.validator.js'
// Imports projectScopedIdParamsSchema from ../projects/projects.validator.js so this module can reuse that component, helper, or library.
import { projectScopedIdParamsSchema } from '../projects/projects.validator.js'

// Stores the value in vendorsRoutes so later lines can reuse this data or behavior for the current feature.
export const vendorsRoutes = Router()
// Calls this helper or component so the feature can perform the operation or render the control represented here.
vendorsRoutes.use(requireAuth)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
vendorsRoutes.get('/vendors', validateRequest('query', vendorListQuerySchema), controller.list)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
vendorsRoutes.post('/vendors', validateRequest('body', createVendorSchema), controller.create)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
vendorsRoutes.get('/vendors/:id', validateRequest('params', vendorIdParamsSchema), controller.detail)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
vendorsRoutes.patch('/vendors/:id', requireRole('ADMIN'), validateRequest('params', vendorIdParamsSchema), validateRequest('body', updateVendorSchema), controller.update)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
vendorsRoutes.delete('/vendors/:id', requireRole('ADMIN'), validateRequest('params', vendorIdParamsSchema), controller.deactivate)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
vendorsRoutes.get('/projects/:projectId/vendors', validateRequest('params', projectScopedIdParamsSchema), controller.projectList)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
vendorsRoutes.post('/projects/:projectId/vendors/:vendorId', validateRequest('params', projectVendorParamsSchema), controller.assign)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
vendorsRoutes.delete('/projects/:projectId/vendors/:vendorId', validateRequest('params', projectVendorParamsSchema), controller.unassign)
