// Imports z from zod so this module can reuse that component, helper, or library.
import { z } from 'zod'

// Stores the value in milestoneDate so later lines can reuse this data or behavior for the current feature.
const milestoneDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must use YYYY-MM-DD format')
// Stores the value in milestoneFields so later lines can reuse this data or behavior for the current feature.
const milestoneFields = {
  // Sets the name field so the surrounding object or component receives this setting.
  name: z.string().trim().min(1).max(255),
  // Sets the description field so the surrounding object or component receives this setting.
  description: z.string().trim().max(5000).nullable().optional(),
  // Sets the sequence field so the surrounding object or component receives this setting.
  sequence: z.coerce.number().int().positive(),
  // Sets the plannedStartDate field so the surrounding object or component receives this setting.
  plannedStartDate: milestoneDate.nullable().optional(),
  // Sets the plannedEndDate field so the surrounding object or component receives this setting.
  plannedEndDate: milestoneDate.nullable().optional(),
  // Sets the actualStartDate field so the surrounding object or component receives this setting.
  actualStartDate: milestoneDate.nullable().optional(),
  // Sets the actualEndDate field so the surrounding object or component receives this setting.
  actualEndDate: milestoneDate.nullable().optional(),
  // Sets the status field so the surrounding object or component receives this setting.
  status: z.enum(['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'CANCELLED']),
  // Sets the progressPercent field so the surrounding object or component receives this setting.
  progressPercent: z.coerce.number().min(0).max(100),
// Closes the current block or object so the grouped statements or settings end here.
}
// Stores the value in milestoneDateRules so later lines can reuse this data or behavior for the current feature.
const milestoneDateRules = (value: {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  plannedStartDate?: string | null
  // Continues the component or data expression so its related values and behavior stay grouped together.
  plannedEndDate?: string | null
  // Continues the component or data expression so its related values and behavior stay grouped together.
  actualStartDate?: string | null
  // Continues the component or data expression so its related values and behavior stay grouped together.
  actualEndDate?: string | null
// Continues the component or data expression so its related values and behavior stay grouped together.
}) => (
  // Continues the component or data expression so its related values and behavior stay grouped together.
  (!value.plannedStartDate || !value.plannedEndDate || value.plannedStartDate <= value.plannedEndDate)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  && (!value.actualStartDate || !value.actualEndDate || value.actualStartDate <= value.actualEndDate)
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Stores the value in milestoneDateMessage so later lines can reuse this data or behavior for the current feature.
const milestoneDateMessage = {
  // Sets the message field so the surrounding object or component receives this setting.
  message: 'Milestone end dates must be on or after their start dates.',
  // Sets the path field so the surrounding object or component receives this setting.
  path: ['plannedEndDate'],
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in createMilestoneSchema so later lines can reuse this data or behavior for the current feature.
export const createMilestoneSchema = z.object({
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ...milestoneFields,
  // Sets the status field so the surrounding object or component receives this setting.
  status: milestoneFields.status.default('PLANNED'),
  // Sets the progressPercent field so the surrounding object or component receives this setting.
  progressPercent: milestoneFields.progressPercent.default(0),
// Continues the component or data expression so its related values and behavior stay grouped together.
}).refine(milestoneDateRules, milestoneDateMessage)

// Stores the value in updateMilestoneSchema so later lines can reuse this data or behavior for the current feature.
export const updateMilestoneSchema = z.object(milestoneFields).partial()
  // Continues the component or data expression so its related values and behavior stay grouped together.
  .refine((value) => Object.keys(value).length > 0, { message: 'At least one milestone field is required.' })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  .refine(milestoneDateRules, milestoneDateMessage)

// Stores the value in milestoneIdParamsSchema so later lines can reuse this data or behavior for the current feature.
export const milestoneIdParamsSchema = z.object({ id: z.coerce.number().int().positive() })

// Continues the component or data expression so its related values and behavior stay grouped together.
export type CreateMilestoneInput = z.infer<typeof createMilestoneSchema>
// Continues the component or data expression so its related values and behavior stay grouped together.
export type UpdateMilestoneInput = z.infer<typeof updateMilestoneSchema>
