// Imports z from zod so this module can reuse that component, helper, or library.
import { z } from 'zod'

// Stores the value in dateOnly so later lines can reuse this data or behavior for the current feature.
const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must use YYYY-MM-DD format')
// Stores the value in labourEntry so later lines can reuse this data or behavior for the current feature.
const labourEntry = z.object({
  // Sets the trade field so the surrounding object or component receives this setting.
  trade: z.string().trim().min(1).max(100),
  // Sets the contractorName field so the surrounding object or component receives this setting.
  contractorName: z.string().trim().max(150).optional(),
  // Sets the headCount field so the surrounding object or component receives this setting.
  headCount: z.number().int().positive(),
  // Sets the hoursWorked field so the surrounding object or component receives this setting.
  hoursWorked: z.number().min(0).max(24).default(8),
  // Sets the remarks field so the surrounding object or component receives this setting.
  remarks: z.string().trim().max(500).optional(),
// Continues the component or data expression so its related values and behavior stay grouped together.
})
// Stores the value in machineryEntry so later lines can reuse this data or behavior for the current feature.
const machineryEntry = z.object({
  // Sets the machineName field so the surrounding object or component receives this setting.
  machineName: z.string().trim().min(1).max(150),
  // Sets the operatorName field so the surrounding object or component receives this setting.
  operatorName: z.string().trim().max(150).optional(),
  // Sets the hoursUsed field so the surrounding object or component receives this setting.
  hoursUsed: z.number().min(0).max(24),
  // Sets the fuelLitres field so the surrounding object or component receives this setting.
  fuelLitres: z.number().min(0).optional(),
  // Sets the remarks field so the surrounding object or component receives this setting.
  remarks: z.string().trim().max(500).optional(),
// Continues the component or data expression so its related values and behavior stay grouped together.
})

// Stores the value in dailyLogBodySchema so later lines can reuse this data or behavior for the current feature.
export const dailyLogBodySchema = z.object({
  // Sets the logDate field so the surrounding object or component receives this setting.
  logDate: dateOnly,
  // Sets the progressPercent field so the surrounding object or component receives this setting.
  progressPercent: z.number().min(0).max(100),
  // Sets the workSummary field so the surrounding object or component receives this setting.
  workSummary: z.string().trim().min(1).max(5000),
  // Sets the weather field so the surrounding object or component receives this setting.
  weather: z.string().trim().max(150).optional(),
  // Sets the issues field so the surrounding object or component receives this setting.
  issues: z.string().trim().max(5000).optional(),
  // Sets the labourEntries field so the surrounding object or component receives this setting.
  labourEntries: z.array(labourEntry).optional(),
  // Sets the machineryEntries field so the surrounding object or component receives this setting.
  machineryEntries: z.array(machineryEntry).optional(),
// Continues the component or data expression so its related values and behavior stay grouped together.
})

// Stores the value in dailyLogPatchSchema so later lines can reuse this data or behavior for the current feature.
export const dailyLogPatchSchema = dailyLogBodySchema.partial()

// Stores the value in dailyLogListQuerySchema so later lines can reuse this data or behavior for the current feature.
export const dailyLogListQuerySchema = z.object({
  // Sets the from field so the surrounding object or component receives this setting.
  from: dateOnly.optional(),
  // Sets the to field so the surrounding object or component receives this setting.
  to: dateOnly.optional(),
  // Sets the page field so the surrounding object or component receives this setting.
  page: z.coerce.number().int().min(1).default(1),
  // Sets the limit field so the surrounding object or component receives this setting.
  limit: z.coerce.number().int().min(1).max(100).default(20),
// Continues the component or data expression so its related values and behavior stay grouped together.
}).refine(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  (value) => !value.from || !value.to || value.from <= value.to,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { message: 'The from date must be on or before the to date.', path: ['to'] },
// Closes this function call or grouped expression so the surrounding code can continue.
)

// Stores the value in projectIdParamsSchema so later lines can reuse this data or behavior for the current feature.
export const projectIdParamsSchema = z.object({
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: z.coerce.number().int().positive(),
// Continues the component or data expression so its related values and behavior stay grouped together.
})

// Stores the value in dailyLogIdParamsSchema so later lines can reuse this data or behavior for the current feature.
export const dailyLogIdParamsSchema = z.object({
  // Sets the id field so the surrounding object or component receives this setting.
  id: z.coerce.number().int().positive(),
// Continues the component or data expression so its related values and behavior stay grouped together.
})

// Continues the component or data expression so its related values and behavior stay grouped together.
export type DailyLogInput = z.infer<typeof dailyLogBodySchema>
// Continues the component or data expression so its related values and behavior stay grouped together.
export type DailyLogPatch = z.infer<typeof dailyLogPatchSchema>
// Continues the component or data expression so its related values and behavior stay grouped together.
export type DailyLogListQuery = z.infer<typeof dailyLogListQuerySchema>
