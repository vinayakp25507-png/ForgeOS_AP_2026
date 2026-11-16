// Imports type  RequestHandler from express so this module can reuse that component, helper, or library.
import type { RequestHandler } from 'express'
// Imports sendSuccess from ../../utils/api-response.js so this module can reuse that component, helper, or library.
import { sendSuccess } from '../../utils/api-response.js'
// Imports * as service from ./projects.service.js so this module can reuse that component, helper, or library.
import * as service from './projects.service.js'
// Continues the component or data expression so its related values and behavior stay grouped together.
import type {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ProjectActivityQuery,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ProjectDateRangeQuery,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ProjectProgressHistoryQuery,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from './projects.validator.js'

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
  const result = await service.listProjects(actor(req), req.query.page as unknown as number, req.query.pageSize as unknown as number, req.query.status as string | undefined, req.query.search as string | undefined)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  sendSuccess(res, 200, result.projects, 'Projects fetched successfully', result.meta)
// Closes the current block or object so the grouped statements or settings end here.
}
// Stores the value in detail so later lines can reuse this data or behavior for the current feature.
export const detail: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.getProject(actor(req), Number(req.params.id)), 'Project fetched successfully')
// Stores the value in progressHistory so later lines can reuse this data or behavior for the current feature.
export const progressHistory: RequestHandler = async (req, res) => sendSuccess(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  res,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  200,
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await service.getProjectProgressHistory(actor(req), Number(req.params.projectId), req.query as unknown as ProjectProgressHistoryQuery),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Project progress history fetched successfully',
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Stores the value in summary so later lines can reuse this data or behavior for the current feature.
export const summary: RequestHandler = async (req, res) => sendSuccess(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  res,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  200,
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await service.getProjectSummary(actor(req), Number(req.params.projectId)),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Project summary fetched successfully',
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Stores the value in activity so later lines can reuse this data or behavior for the current feature.
export const activity: RequestHandler = async (req, res) => {
  // Stores the value in result so later lines can reuse this data or behavior for the current feature.
  const result = await service.getProjectActivity(
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    actor(req),
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    Number(req.params.projectId),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    req.query as unknown as ProjectActivityQuery,
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  sendSuccess(res, 200, result.activities, 'Project activity fetched successfully', result.meta)
// Closes the current block or object so the grouped statements or settings end here.
}
// Stores the value in labourSummary so later lines can reuse this data or behavior for the current feature.
export const labourSummary: RequestHandler = async (req, res) => sendSuccess(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  res,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  200,
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await service.getLabourSummary(actor(req), Number(req.params.projectId), req.query as unknown as ProjectDateRangeQuery),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Labour summary fetched successfully',
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Stores the value in machinerySummary so later lines can reuse this data or behavior for the current feature.
export const machinerySummary: RequestHandler = async (req, res) => sendSuccess(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  res,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  200,
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await service.getMachinerySummary(actor(req), Number(req.params.projectId), req.query as unknown as ProjectDateRangeQuery),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Machinery summary fetched successfully',
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Stores the value in workerCountHistory so later lines can reuse this data or behavior for the current feature.
export const workerCountHistory: RequestHandler = async (req, res) => sendSuccess(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  res,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  200,
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await service.getWorkerCountHistory(actor(req), Number(req.params.projectId), req.query as unknown as ProjectDateRangeQuery),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Worker count history fetched successfully',
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Stores the value in machineryUsageHistory so later lines can reuse this data or behavior for the current feature.
export const machineryUsageHistory: RequestHandler = async (req, res) => sendSuccess(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  res,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  200,
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await service.getMachineryUsageHistory(actor(req), Number(req.params.projectId), req.query as unknown as ProjectDateRangeQuery),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Machinery usage history fetched successfully',
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Stores the value in create so later lines can reuse this data or behavior for the current feature.
export const create: RequestHandler = async (req, res) => sendSuccess(res, 201, await service.createProject(actor(req), req.body), 'Project created successfully')
// Stores the value in update so later lines can reuse this data or behavior for the current feature.
export const update: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.updateProject(actor(req), Number(req.params.id), req.body), 'Project updated successfully')
// Stores the value in remove so later lines can reuse this data or behavior for the current feature.
export const remove: RequestHandler = async (req, res) => {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await service.getProject(actor(req), Number(req.params.id))
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await service.deleteProject(Number(req.params.id))
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  sendSuccess(res, 200, null, 'Project deleted successfully')
// Closes the current block or object so the grouped statements or settings end here.
}
