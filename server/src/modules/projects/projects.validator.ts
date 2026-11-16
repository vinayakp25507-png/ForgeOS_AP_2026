// Imports z from zod so this module can reuse that component, helper, or library.
import { z } from 'zod'

// Stores the value in projectFields so later lines can reuse this data or behavior for the current feature.
const projectFields = {
  // Sets the landId field so the surrounding object or component receives this setting.
  landId: z.coerce.number().int().positive(),
  // Sets the code field so the surrounding object or component receives this setting.
  code: z.string().trim().min(1).max(50),
  // Sets the name field so the surrounding object or component receives this setting.
  name: z.string().trim().min(1).max(255),
  // Sets the description field so the surrounding object or component receives this setting.
  description: z.string().trim().max(5000).nullable().optional(),
  // Sets the status field so the surrounding object or component receives this setting.
  status: z.enum(['PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED']),
  // Sets the startDate field so the surrounding object or component receives this setting.
  startDate: z.coerce.date().nullable().optional(),
  // Sets the expectedEndDate field so the surrounding object or component receives this setting.
  expectedEndDate: z.coerce.date().nullable().optional(),
  // Sets the actualEndDate field so the surrounding object or component receives this setting.
  actualEndDate: z.coerce.date().nullable().optional(),
  // Sets the totalBudget field so the surrounding object or component receives this setting.
  totalBudget: z.coerce.number().nonnegative(),
  // Sets the wastageThresholdPct field so the surrounding object or component receives this setting.
  wastageThresholdPct: z.coerce.number().min(0).max(100),
  // Sets the assignedPmId field so the surrounding object or component receives this setting.
  assignedPmId: z.coerce.number().int().positive().nullable().optional(),
// Closes the current block or object so the grouped statements or settings end here.
}
// Stores the value in projectSchema so later lines can reuse this data or behavior for the current feature.
const projectSchema = z.object(projectFields)
// Stores the value in dates so later lines can reuse this data or behavior for the current feature.
const dates = projectSchema.refine((value) => !value.startDate || !value.expectedEndDate || value.expectedEndDate >= value.startDate, { message: 'Expected end date must be on or after start date.', path: ['expectedEndDate'] })
// Stores the value in dateOnly so later lines can reuse this data or behavior for the current feature.
const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must use YYYY-MM-DD format')
// Stores the value in projectIdParamsSchema so later lines can reuse this data or behavior for the current feature.
export const projectIdParamsSchema = z.object({ id: z.coerce.number().int().positive() })
// Stores the value in projectScopedIdParamsSchema so later lines can reuse this data or behavior for the current feature.
export const projectScopedIdParamsSchema = z.object({ projectId: z.coerce.number().int().positive() })
// Stores the value in projectActivityQuerySchema so later lines can reuse this data or behavior for the current feature.
export const projectActivityQuerySchema = z.object({
  // Sets the page field so the surrounding object or component receives this setting.
  page: z.coerce.number().int().min(1).default(1),
  // Sets the limit field so the surrounding object or component receives this setting.
  limit: z.coerce.number().int().min(1).max(100).default(20),
// Continues the component or data expression so its related values and behavior stay grouped together.
})
// Stores the value in projectDateRangeQuerySchema so later lines can reuse this data or behavior for the current feature.
export const projectDateRangeQuerySchema = z.object({
  // Sets the from field so the surrounding object or component receives this setting.
  from: dateOnly.optional(),
  // Sets the to field so the surrounding object or component receives this setting.
  to: dateOnly.optional(),
// Continues the component or data expression so its related values and behavior stay grouped together.
}).refine(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  (value) => !value.from || !value.to || value.from <= value.to,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { message: 'The from date must be on or before the to date.', path: ['to'] },
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Stores the value in projectListQuerySchema so later lines can reuse this data or behavior for the current feature.
export const projectListQuerySchema = z.object({
  // Sets the page field so the surrounding object or component receives this setting.
  page: z.coerce.number().int().min(1).default(1),
  // Sets the pageSize field so the surrounding object or component receives this setting.
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  // Sets the status field so the surrounding object or component receives this setting.
  status: z.enum(['PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED']).optional(),
  // Sets the search field so the surrounding object or component receives this setting.
  search: z.string().trim().max(100).optional(),
// Continues the component or data expression so its related values and behavior stay grouped together.
})
// Stores the value in projectProgressHistoryQuerySchema so later lines can reuse this data or behavior for the current feature.
export const projectProgressHistoryQuerySchema = z.object({
  // Sets the from field so the surrounding object or component receives this setting.
  from: dateOnly.optional(),
  // Sets the to field so the surrounding object or component receives this setting.
  to: dateOnly.optional(),
// Continues the component or data expression so its related values and behavior stay grouped together.
}).refine(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  (value) => !value.from || !value.to || value.from <= value.to,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { message: 'The from date must be on or before the to date.', path: ['to'] },
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Stores the value in createProjectSchema so later lines can reuse this data or behavior for the current feature.
export const createProjectSchema = dates
// Stores the value in updateProjectSchema so later lines can reuse this data or behavior for the current feature.
export const updateProjectSchema = projectSchema.partial().refine((value) => !value.startDate || !value.expectedEndDate || value.expectedEndDate >= value.startDate, { message: 'Expected end date must be on or after start date.', path: ['expectedEndDate'] })
// Continues the component or data expression so its related values and behavior stay grouped together.
export type ProjectProgressHistoryQuery = z.infer<typeof projectProgressHistoryQuerySchema>
// Continues the component or data expression so its related values and behavior stay grouped together.
export type ProjectActivityQuery = z.infer<typeof projectActivityQuerySchema>
// Continues the component or data expression so its related values and behavior stay grouped together.
export type ProjectDateRangeQuery = z.infer<typeof projectDateRangeQuerySchema>
