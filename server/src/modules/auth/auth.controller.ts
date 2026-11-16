// Imports type  RequestHandler from express so this module can reuse that component, helper, or library.
import type { RequestHandler } from 'express'
// Imports sendSuccess from ../../utils/api-response.js so this module can reuse that component, helper, or library.
import { sendSuccess } from '../../utils/api-response.js'
// Imports getCurrentUser, login from ./auth.service.js so this module can reuse that component, helper, or library.
import { getCurrentUser, login } from './auth.service.js'

// Stores the value in signIn so later lines can reuse this data or behavior for the current feature.
export const signIn: RequestHandler = async (req, res) => {
  // Stores the value in result so later lines can reuse this data or behavior for the current feature.
  const result = await login(req.body.email, req.body.password)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  sendSuccess(res, 200, result, 'Login successful')
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in me so later lines can reuse this data or behavior for the current feature.
export const me: RequestHandler = async (req, res) => {
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!req.user) throw new Error('Authenticated user missing after auth middleware')
  // Stores the value in user so later lines can reuse this data or behavior for the current feature.
  const user = await getCurrentUser(req.user.id)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  sendSuccess(res, 200, user, 'Profile fetched successfully')
// Closes the current block or object so the grouped statements or settings end here.
}
