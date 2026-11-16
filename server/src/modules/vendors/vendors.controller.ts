// Imports type  RequestHandler from express so this module can reuse that component, helper, or library.
import type { RequestHandler } from 'express'
// Imports sendSuccess from ../../utils/api-response.js so this module can reuse that component, helper, or library.
import { sendSuccess } from '../../utils/api-response.js'
// Imports * as service from ./vendors.service.js so this module can reuse that component, helper, or library.
import * as service from './vendors.service.js'

// Stores the value in actor so later lines can reuse this data or behavior for the current feature.
const actor = (req: Parameters<RequestHandler>[0]) => req.user!
// Stores the value in list so later lines can reuse this data or behavior for the current feature.
export const list: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.listVendors(actor(req), req.query as never), 'Vendors fetched successfully')
// Stores the value in detail so later lines can reuse this data or behavior for the current feature.
export const detail: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.getVendor(actor(req), Number(req.params.id)), 'Vendor fetched successfully')
// Stores the value in create so later lines can reuse this data or behavior for the current feature.
export const create: RequestHandler = async (req, res) => sendSuccess(res, 201, await service.createVendor(actor(req), req.body), 'Vendor created successfully')
// Stores the value in update so later lines can reuse this data or behavior for the current feature.
export const update: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.updateVendor(actor(req), Number(req.params.id), req.body), 'Vendor updated successfully')
// Stores the value in deactivate so later lines can reuse this data or behavior for the current feature.
export const deactivate: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.deactivateVendor(actor(req), Number(req.params.id)), 'Vendor deactivated successfully')
// Stores the value in projectList so later lines can reuse this data or behavior for the current feature.
export const projectList: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.listProjectVendors(actor(req), Number(req.params.projectId)), 'Project vendors fetched successfully')
// Stores the value in assign so later lines can reuse this data or behavior for the current feature.
export const assign: RequestHandler = async (req, res) => sendSuccess(res, 201, await service.assignVendor(actor(req), Number(req.params.projectId), Number(req.params.vendorId)), 'Vendor assigned successfully')
// Stores the value in unassign so later lines can reuse this data or behavior for the current feature.
export const unassign: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.unassignVendor(actor(req), Number(req.params.projectId), Number(req.params.vendorId)), 'Vendor unassigned successfully')
