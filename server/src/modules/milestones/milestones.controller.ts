// Imports type  RequestHandler from express so this module can reuse that component, helper, or library.
import type { RequestHandler } from 'express'
// Imports sendSuccess from ../../utils/api-response.js so this module can reuse that component, helper, or library.
import { sendSuccess } from '../../utils/api-response.js'
// Imports * as service from ./milestones.service.js so this module can reuse that component, helper, or library.
import * as service from './milestones.service.js'
// Imports type  CreateMilestoneInput, UpdateMilestoneInput from ./milestones.validator.js so this module can reuse that component, helper, or library.
import type { CreateMilestoneInput, UpdateMilestoneInput } from './milestones.validator.js'

// Defines actor so this module can perform its named task when needed.
function actor(req: Parameters<RequestHandler>[0]) {
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!req.user) throw new Error('Authenticated user missing after auth middleware')
  // Returns the result so the caller or React receives the value or interface this function provides.
  return req.user
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in create so later lines can reuse this data or behavior for the current feature.
export const create: RequestHandler = async (req, res) => sendSuccess(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  res,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  201,
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await service.createMilestone(actor(req), Number(req.params.projectId), req.body as CreateMilestoneInput),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Milestone created successfully',
// Closes this function call or grouped expression so the surrounding code can continue.
)

// Stores the value in list so later lines can reuse this data or behavior for the current feature.
export const list: RequestHandler = async (req, res) => sendSuccess(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  res,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  200,
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await service.listMilestones(actor(req), Number(req.params.projectId)),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Milestones fetched successfully',
// Closes this function call or grouped expression so the surrounding code can continue.
)

// Stores the value in detail so later lines can reuse this data or behavior for the current feature.
export const detail: RequestHandler = async (req, res) => sendSuccess(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  res,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  200,
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await service.getMilestone(actor(req), Number(req.params.id)),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Milestone fetched successfully',
// Closes this function call or grouped expression so the surrounding code can continue.
)

// Stores the value in update so later lines can reuse this data or behavior for the current feature.
export const update: RequestHandler = async (req, res) => sendSuccess(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  res,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  200,
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await service.updateMilestone(actor(req), Number(req.params.id), req.body as UpdateMilestoneInput),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Milestone updated successfully',
// Closes this function call or grouped expression so the surrounding code can continue.
)

// Stores the value in remove so later lines can reuse this data or behavior for the current feature.
export const remove: RequestHandler = async (req, res) => {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await service.deleteMilestone(actor(req), Number(req.params.id))
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  sendSuccess(res, 200, null, 'Milestone deleted successfully')
// Closes the current block or object so the grouped statements or settings end here.
}
