// Imports Router from express so this module can reuse that component, helper, or library.
import { Router } from 'express'
// Imports requireAuth, requireRole from ../../middleware/auth.middleware.js so this module can reuse that component, helper, or library.
import { requireAuth, requireRole } from '../../middleware/auth.middleware.js'
// Imports validateRequest from ../../middleware/validate.middleware.js so this module can reuse that component, helper, or library.
import { validateRequest } from '../../middleware/validate.middleware.js'
// Imports * as controller from ./billing.controller.js so this module can reuse that component, helper, or library.
import * as controller from './billing.controller.js'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  billIdParamsSchema, billListQuerySchema, createBillSchema, paymentListQuerySchema,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  paymentSchema, rejectBillSchema, reportDateQuerySchema, updateBillSchema,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from './billing.validator.js'
// Imports projectScopedIdParamsSchema from ../projects/projects.validator.js so this module can reuse that component, helper, or library.
import { projectScopedIdParamsSchema } from '../projects/projects.validator.js'

// Stores the value in billingRoutes so later lines can reuse this data or behavior for the current feature.
export const billingRoutes = Router()
// Calls this helper or component so the feature can perform the operation or render the control represented here.
billingRoutes.use(requireAuth)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
billingRoutes.get('/bills', validateRequest('query', billListQuerySchema), controller.list)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
billingRoutes.post('/bills', validateRequest('body', createBillSchema), controller.create)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
billingRoutes.get('/bills/:id', validateRequest('params', billIdParamsSchema), controller.detail)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
billingRoutes.patch('/bills/:id', validateRequest('params', billIdParamsSchema), validateRequest('body', updateBillSchema), controller.update)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
billingRoutes.delete('/bills/:id', validateRequest('params', billIdParamsSchema), controller.remove)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
billingRoutes.post('/bills/:id/approve', requireRole('ADMIN'), validateRequest('params', billIdParamsSchema), controller.approve)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
billingRoutes.post('/bills/:id/reject', requireRole('ADMIN'), validateRequest('params', billIdParamsSchema), validateRequest('body', rejectBillSchema), controller.reject)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
billingRoutes.get('/bills/:id/payments', validateRequest('params', billIdParamsSchema), validateRequest('query', paymentListQuerySchema), controller.payments)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
billingRoutes.post('/bills/:id/payments', requireRole('ADMIN'), validateRequest('params', billIdParamsSchema), validateRequest('body', paymentSchema), controller.createPayment)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
billingRoutes.get('/projects/:projectId/expenses', validateRequest('params', projectScopedIdParamsSchema), validateRequest('query', reportDateQuerySchema), controller.projectExpenses)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
billingRoutes.get('/reports/vendor-outstanding', validateRequest('query', reportDateQuerySchema), controller.vendorOutstanding)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
billingRoutes.get('/reports/payment-history', validateRequest('query', reportDateQuerySchema), controller.paymentHistory)
