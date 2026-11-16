// Imports type  RequestHandler from express so this module can reuse that component, helper, or library.
import type { RequestHandler } from 'express'
// Imports sendSuccess from ../../utils/api-response.js so this module can reuse that component, helper, or library.
import { sendSuccess } from '../../utils/api-response.js'
// Imports * as service from ./billing.service.js so this module can reuse that component, helper, or library.
import * as service from './billing.service.js'

// Stores the value in actor so later lines can reuse this data or behavior for the current feature.
const actor = (req: Parameters<RequestHandler>[0]) => req.user!
// Stores the value in list so later lines can reuse this data or behavior for the current feature.
export const list: RequestHandler = async (req, res) => {
  // Stores the value in result so later lines can reuse this data or behavior for the current feature.
  const result = await service.listBills(actor(req), req.query as never)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  sendSuccess(res, 200, result.bills, 'Bills fetched successfully', result.meta)
// Closes the current block or object so the grouped statements or settings end here.
}
// Stores the value in create so later lines can reuse this data or behavior for the current feature.
export const create: RequestHandler = async (req, res) => sendSuccess(res, 201, await service.createBill(actor(req), req.body), 'Bill created successfully')
// Stores the value in detail so later lines can reuse this data or behavior for the current feature.
export const detail: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.detail(actor(req), Number(req.params.id)), 'Bill fetched successfully')
// Stores the value in update so later lines can reuse this data or behavior for the current feature.
export const update: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.updateBill(actor(req), Number(req.params.id), req.body), 'Bill updated successfully')
// Stores the value in remove so later lines can reuse this data or behavior for the current feature.
export const remove: RequestHandler = async (req, res) => { await service.deleteBill(actor(req), Number(req.params.id)); sendSuccess(res, 200, null, 'Bill deleted successfully') }
// Stores the value in approve so later lines can reuse this data or behavior for the current feature.
export const approve: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.approveBill(actor(req), Number(req.params.id)), 'Bill approved successfully')
// Stores the value in reject so later lines can reuse this data or behavior for the current feature.
export const reject: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.rejectBill(actor(req), Number(req.params.id), req.body.reason), 'Bill rejected successfully')
// Stores the value in payments so later lines can reuse this data or behavior for the current feature.
export const payments: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.listPayments(actor(req), Number(req.params.id), req.query as never), 'Payments fetched successfully')
// Stores the value in createPayment so later lines can reuse this data or behavior for the current feature.
export const createPayment: RequestHandler = async (req, res) => sendSuccess(res, 201, await service.createPayment(actor(req), Number(req.params.id), req.body), 'Payment recorded successfully')
// Stores the value in projectExpenses so later lines can reuse this data or behavior for the current feature.
export const projectExpenses: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.projectExpenses(actor(req), Number(req.params.projectId), req.query as never), 'Project expenses fetched successfully')
// Stores the value in vendorOutstanding so later lines can reuse this data or behavior for the current feature.
export const vendorOutstanding: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.vendorOutstanding(actor(req), req.query as never), 'Vendor outstanding report fetched successfully')
// Stores the value in paymentHistory so later lines can reuse this data or behavior for the current feature.
export const paymentHistory: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.paymentHistory(actor(req), req.query as never), 'Payment history fetched successfully')
