// Imports type  RequestHandler from express so this module can reuse that component, helper, or library.
import type { RequestHandler } from 'express'
// Imports sendSuccess from ../../utils/api-response.js so this module can reuse that component, helper, or library.
import { sendSuccess } from '../../utils/api-response.js'
// Imports * as service from ./materials.service.js so this module can reuse that component, helper, or library.
import * as service from './materials.service.js'

// Stores the value in list so later lines can reuse this data or behavior for the current feature.
export const list: RequestHandler = async (req, res) => sendSuccess(
  // Waits for the asynchronous result before using it, so later work receives completed data.
  res, 200, await service.listMaterials(req.query as never), 'Materials fetched successfully',
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Stores the value in detail so later lines can reuse this data or behavior for the current feature.
export const detail: RequestHandler = async (req, res) => sendSuccess(
  // Waits for the asynchronous result before using it, so later work receives completed data.
  res, 200, await service.getMaterial(Number(req.params.id)), 'Material fetched successfully',
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Stores the value in create so later lines can reuse this data or behavior for the current feature.
export const create: RequestHandler = async (req, res) => sendSuccess(
  // Waits for the asynchronous result before using it, so later work receives completed data.
  res, 201, await service.createMaterial(req.body), 'Material created successfully',
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Stores the value in update so later lines can reuse this data or behavior for the current feature.
export const update: RequestHandler = async (req, res) => sendSuccess(
  // Waits for the asynchronous result before using it, so later work receives completed data.
  res, 200, await service.updateMaterial(Number(req.params.id), req.body), 'Material updated successfully',
// Closes this function call or grouped expression so the surrounding code can continue.
)
