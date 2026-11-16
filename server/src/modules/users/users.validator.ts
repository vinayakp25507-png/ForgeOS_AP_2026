// Imports z from zod so this module can reuse that component, helper, or library.
import { z } from 'zod'

// Stores the value in role so later lines can reuse this data or behavior for the current feature.
const role = z.enum(['ADMIN', 'PM'])
// Stores the value in base so later lines can reuse this data or behavior for the current feature.
const base = z.object({
  // Sets the name field so the surrounding object or component receives this setting.
  name: z.string().trim().min(1).max(255),
  // Sets the email field so the surrounding object or component receives this setting.
  email: z.string().email().transform((value) => value.toLowerCase()),
  // Sets the password field so the surrounding object or component receives this setting.
  password: z.string().min(8).max(200),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  role,
  // Sets the phone field so the surrounding object or component receives this setting.
  phone: z.string().trim().max(50).nullable().optional(),
// Continues the component or data expression so its related values and behavior stay grouped together.
})

// Stores the value in userIdParamsSchema so later lines can reuse this data or behavior for the current feature.
export const userIdParamsSchema = z.object({ id: z.coerce.number().int().positive() })
// Stores the value in userListQuerySchema so later lines can reuse this data or behavior for the current feature.
export const userListQuerySchema = z.object({
  // Sets the page field so the surrounding object or component receives this setting.
  page: z.coerce.number().int().min(1).default(1),
  // Sets the pageSize field so the surrounding object or component receives this setting.
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  // Sets the search field so the surrounding object or component receives this setting.
  search: z.string().trim().max(100).optional(),
// Continues the component or data expression so its related values and behavior stay grouped together.
})
// Stores the value in createUserSchema so later lines can reuse this data or behavior for the current feature.
export const createUserSchema = base
// Stores the value in updateUserSchema so later lines can reuse this data or behavior for the current feature.
export const updateUserSchema = base.partial().omit({ password: true }).extend({
  // Sets the password field so the surrounding object or component receives this setting.
  password: z.string().min(8).max(200).optional(),
// Continues the component or data expression so its related values and behavior stay grouped together.
})
// Stores the value in userStatusSchema so later lines can reuse this data or behavior for the current feature.
export const userStatusSchema = z.object({ isActive: z.boolean() })
