// Imports Router from express so this module can reuse that component, helper, or library.
import { Router } from 'express'
// Imports requireAuth, requireRole from ../../middleware/auth.middleware.js so this module can reuse that component, helper, or library.
import { requireAuth, requireRole } from '../../middleware/auth.middleware.js'
// Imports validateRequest from ../../middleware/validate.middleware.js so this module can reuse that component, helper, or library.
import { validateRequest } from '../../middleware/validate.middleware.js'
// Imports * as controller from ./users.controller.js so this module can reuse that component, helper, or library.
import * as controller from './users.controller.js'
// Imports createUserSchema, updateUserSchema, userIdParamsSchema, userListQuerySchema, userStatusSchema from ./users.validator.js so this module can reuse that component, helper, or library.
import { createUserSchema, updateUserSchema, userIdParamsSchema, userListQuerySchema, userStatusSchema } from './users.validator.js'

// Stores the value in usersRoutes so later lines can reuse this data or behavior for the current feature.
export const usersRoutes = Router()
// Calls this helper or component so the feature can perform the operation or render the control represented here.
usersRoutes.use('/users', requireAuth, requireRole('ADMIN'))
// Calls this helper or component so the feature can perform the operation or render the control represented here.
usersRoutes.get('/users', validateRequest('query', userListQuerySchema), controller.list)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
usersRoutes.get('/users/:id', validateRequest('params', userIdParamsSchema), controller.detail)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
usersRoutes.post('/users', validateRequest('body', createUserSchema), controller.create)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
usersRoutes.patch('/users/:id', validateRequest('params', userIdParamsSchema), validateRequest('body', updateUserSchema), controller.update)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
usersRoutes.patch('/users/:id/status', validateRequest('params', userIdParamsSchema), validateRequest('body', userStatusSchema), controller.status)
