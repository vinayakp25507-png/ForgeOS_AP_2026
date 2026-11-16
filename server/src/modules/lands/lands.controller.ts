// Imports type  RequestHandler from express so this module can reuse that component, helper, or library.
import type { RequestHandler } from 'express'
// Imports sendSuccess from ../../utils/api-response.js so this module can reuse that component, helper, or library.
import { sendSuccess } from '../../utils/api-response.js'
// Imports * as service from ./lands.service.js so this module can reuse that component, helper, or library.
import * as service from './lands.service.js'

// Defines actor so this module can perform its named task when needed.
function actor(req: Parameters<RequestHandler>[0]) {
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!req.user) throw new Error('Authenticated user missing after auth middleware')
  // Returns the result so the caller or React receives the value or interface this function provides.
  return req.user
// Closes the current block or object so the grouped statements or settings end here.
}
// Stores the value in list so later lines can reuse this data or behavior for the current feature.
export const list: RequestHandler = async (req, res) => {
  // Stores the value in result so later lines can reuse this data or behavior for the current feature.
  const result = await service.listLands(actor(req), req.query.page as unknown as number, req.query.pageSize as unknown as number, req.query.search as string | undefined)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  sendSuccess(res, 200, result.lands, 'Lands fetched successfully', result.meta)
// Closes the current block or object so the grouped statements or settings end here.
}
// Stores the value in detail so later lines can reuse this data or behavior for the current feature.
export const detail: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.getLand(actor(req), Number(req.params.id)), 'Land fetched successfully')
// Stores the value in create so later lines can reuse this data or behavior for the current feature.
export const create: RequestHandler = async (req, res) => sendSuccess(res, 201, await service.createLand(actor(req), req.body), 'Land created successfully')
// Stores the value in update so later lines can reuse this data or behavior for the current feature.
export const update: RequestHandler = async (req, res) => {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await service.getLand(actor(req), Number(req.params.id))
  // Waits for the asynchronous result before using it, so later work receives completed data.
  sendSuccess(res, 200, await service.updateLand(Number(req.params.id), req.body), 'Land updated successfully')
// Closes the current block or object so the grouped statements or settings end here.
}
// Stores the value in remove so later lines can reuse this data or behavior for the current feature.
export const remove: RequestHandler = async (req, res) => {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await service.getLand(actor(req), Number(req.params.id))
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await service.deleteLand(Number(req.params.id))
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  sendSuccess(res, 200, null, 'Land deleted successfully')
// Closes the current block or object so the grouped statements or settings end here.
}
