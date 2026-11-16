// Imports Router from express so this module can reuse that component, helper, or library.
import { Router } from 'express'
// Imports requireAuth from ../../middleware/auth.middleware.js so this module can reuse that component, helper, or library.
import { requireAuth } from '../../middleware/auth.middleware.js'
// Imports validateRequest from ../../middleware/validate.middleware.js so this module can reuse that component, helper, or library.
import { validateRequest } from '../../middleware/validate.middleware.js'
// Imports * as controller from ./inventory.controller.js so this module can reuse that component, helper, or library.
import * as controller from './inventory.controller.js'
// Imports createTransactionSchema, projectInventoryParamsSchema, transactionListQuerySchema, wastageQuerySchema from ./inventory.validator.js so this module can reuse that component, helper, or library.
import { createTransactionSchema, projectInventoryParamsSchema, transactionListQuerySchema, wastageQuerySchema } from './inventory.validator.js'

// Stores the value in inventoryRoutes so later lines can reuse this data or behavior for the current feature.
export const inventoryRoutes = Router()
// Calls this helper or component so the feature can perform the operation or render the control represented here.
inventoryRoutes.use(requireAuth)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
inventoryRoutes.get('/projects/:projectId/inventory', validateRequest('params', projectInventoryParamsSchema), controller.inventory)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
inventoryRoutes.post('/projects/:projectId/inventory/transactions', validateRequest('params', projectInventoryParamsSchema), validateRequest('body', createTransactionSchema), controller.createTransaction)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
inventoryRoutes.get('/projects/:projectId/inventory/transactions', validateRequest('params', projectInventoryParamsSchema), validateRequest('query', transactionListQuerySchema), controller.transactions)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
inventoryRoutes.get('/projects/:projectId/inventory/summary', validateRequest('params', projectInventoryParamsSchema), controller.summary)
// Calls this helper or component so the feature can perform the operation or render the control represented here.
inventoryRoutes.get('/projects/:projectId/inventory/wastage', validateRequest('params', projectInventoryParamsSchema), validateRequest('query', wastageQuerySchema), controller.wastage)
