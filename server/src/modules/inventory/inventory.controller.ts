// Imports type  RequestHandler from express so this module can reuse that component, helper, or library.
import type { RequestHandler } from 'express'
// Imports sendSuccess from ../../utils/api-response.js so this module can reuse that component, helper, or library.
import { sendSuccess } from '../../utils/api-response.js'
// Imports * as service from ./inventory.service.js so this module can reuse that component, helper, or library.
import * as service from './inventory.service.js'

// Stores the value in inventory so later lines can reuse this data or behavior for the current feature.
export const inventory: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.listInventory(req.user!, Number(req.params.projectId)), 'Inventory fetched successfully')
// Stores the value in createTransaction so later lines can reuse this data or behavior for the current feature.
export const createTransaction: RequestHandler = async (req, res) => sendSuccess(res, 201, await service.createTransaction(req.user!, Number(req.params.projectId), req.body), 'Stock transaction recorded successfully')
// Stores the value in transactions so later lines can reuse this data or behavior for the current feature.
export const transactions: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.listTransactions(req.user!, Number(req.params.projectId), req.query as never), 'Stock transactions fetched successfully')
// Stores the value in summary so later lines can reuse this data or behavior for the current feature.
export const summary: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.getSummary(req.user!, Number(req.params.projectId)), 'Inventory summary fetched successfully')
// Stores the value in wastage so later lines can reuse this data or behavior for the current feature.
export const wastage: RequestHandler = async (req, res) => sendSuccess(res, 200, await service.getWastage(req.user!, Number(req.params.projectId)), 'Wastage report fetched successfully')
