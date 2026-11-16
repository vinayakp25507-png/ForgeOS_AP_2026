// Imports Router from express so this module can reuse that component, helper, or library.
import { Router } from 'express'
// Imports requireAuth from ../../middleware/auth.middleware.js so this module can reuse that component, helper, or library.
import { requireAuth } from '../../middleware/auth.middleware.js'
// Imports validateRequest from ../../middleware/validate.middleware.js so this module can reuse that component, helper, or library.
import { validateRequest } from '../../middleware/validate.middleware.js'
// Imports * as controller from ./auth.controller.js so this module can reuse that component, helper, or library.
import * as controller from './auth.controller.js'
// Imports loginSchema from ./auth.validator.js so this module can reuse that component, helper, or library.
import { loginSchema } from './auth.validator.js'

// Stores the value in authRoutes so later lines can reuse this data or behavior for the current feature.
export const authRoutes = Router()
// Calls this helper or component so the feature can perform the operation or render the control represented here.
authRoutes.post('/auth/login', validateRequest('body', loginSchema), controller.signIn)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
authRoutes.get('/auth/me', requireAuth, controller.me)
