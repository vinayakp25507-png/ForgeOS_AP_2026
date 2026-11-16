// Imports type  RequestHandler from express so this module can reuse that component, helper, or library.
import type { RequestHandler } from 'express'
// Imports sendSuccess from ../../utils/api-response.js so this module can reuse that component, helper, or library.
import { sendSuccess } from '../../utils/api-response.js'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  createDailyLog,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  deleteDailyLog,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  getDailyLog,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  listDailyLogs,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  updateDailyLog,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from './daily-logs.service.js'
// Imports type  DailyLogListQuery from ./daily-logs.validator.js so this module can reuse that component, helper, or library.
import type { DailyLogListQuery } from './daily-logs.validator.js'

// Defines user so this module can perform its named task when needed.
function user(req: Parameters<RequestHandler>[0]) {
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!req.user) throw new Error('Authenticated user missing after auth middleware')
  // Returns the result so the caller or React receives the value or interface this function provides.
  return req.user
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in list so later lines can reuse this data or behavior for the current feature.
export const list: RequestHandler = async (req, res) => {
  // Stores the value in result so later lines can reuse this data or behavior for the current feature.
  const result = await listDailyLogs(user(req), Number(req.params.projectId), req.query as unknown as DailyLogListQuery)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  sendSuccess(res, 200, result.logs, 'Daily logs fetched successfully', result.meta)
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in create so later lines can reuse this data or behavior for the current feature.
export const create: RequestHandler = async (req, res) => {
  // Stores the value in log so later lines can reuse this data or behavior for the current feature.
  const log = await createDailyLog(user(req), Number(req.params.projectId), req.body)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  sendSuccess(res, 201, log, 'Daily log created successfully')
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in detail so later lines can reuse this data or behavior for the current feature.
export const detail: RequestHandler = async (req, res) => {
  // Stores the value in log so later lines can reuse this data or behavior for the current feature.
  const log = await getDailyLog(user(req), Number(req.params.id))
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  sendSuccess(res, 200, log, 'Daily log fetched successfully')
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in update so later lines can reuse this data or behavior for the current feature.
export const update: RequestHandler = async (req, res) => {
  // Stores the value in log so later lines can reuse this data or behavior for the current feature.
  const log = await updateDailyLog(user(req), Number(req.params.id), req.body)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  sendSuccess(res, 200, log, 'Daily log updated successfully')
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in remove so later lines can reuse this data or behavior for the current feature.
export const remove: RequestHandler = async (req, res) => {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await deleteDailyLog(user(req), Number(req.params.id))
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  sendSuccess(res, 200, null, 'Daily log deleted successfully')
// Closes the current block or object so the grouped statements or settings end here.
}
