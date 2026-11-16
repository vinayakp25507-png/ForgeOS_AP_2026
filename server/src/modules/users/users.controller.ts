// Imports type  RequestHandler from express so this module can reuse that component, helper, or library.
import type { RequestHandler } from 'express'
// Imports sendSuccess from ../../utils/api-response.js so this module can reuse that component, helper, or library.
import { sendSuccess } from '../../utils/api-response.js'
// Imports * as service from ./users.service.js so this module can reuse that component, helper, or library.
import * as service from './users.service.js'

// Stores the value in list so later lines can reuse this data or behavior for the current feature.
export const list: RequestHandler = async (req, res) => {
  // Stores the value in result so later lines can reuse this data or behavior for the current feature.
  const result = await service.listUsers(req.query.page as unknown as number, req.query.pageSize as unknown as number, req.query.search as string | undefined)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  sendSuccess(res, 200, result.users, 'Users fetched successfully', result.meta)
// Closes the current block or object so the grouped statements or settings end here.
}
// Stores the value in detail so later lines can reuse this data or behavior for the current feature.
export const detail: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.getUser(Number(req.params.id)), 'User fetched successfully')
// Stores the value in create so later lines can reuse this data or behavior for the current feature.
export const create: RequestHandler = async (req, res) => sendSuccess(res, 201, await service.createUser(req.body), 'User created successfully')
// Stores the value in update so later lines can reuse this data or behavior for the current feature.
export const update: RequestHandler = async (req, res) => {
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!req.user) throw new Error('Authenticated user missing after auth middleware')
  // Waits for the asynchronous result before using it, so later work receives completed data.
  sendSuccess(res, 200, await service.updateUser(req.user, Number(req.params.id), req.body), 'User updated successfully')
// Closes the current block or object so the grouped statements or settings end here.
}
// Stores the value in status so later lines can reuse this data or behavior for the current feature.
export const status: RequestHandler = async (req, res) => {
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!req.user) throw new Error('Authenticated user missing after auth middleware')
  // Waits for the asynchronous result before using it, so later work receives completed data.
  sendSuccess(res, 200, await service.updateUserStatus(req.user, Number(req.params.id), req.body.isActive), 'User status updated successfully')
// Closes the current block or object so the grouped statements or settings end here.
}
