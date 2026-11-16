// Imports z from zod so this module can reuse that component, helper, or library.
import { z } from 'zod'

// Stores the value in materialFields so later lines can reuse this data or behavior for the current feature.
const materialFields = {
  // Sets the name field so the surrounding object or component receives this setting.
  name: z.string().trim().min(1).max(255),
  // Sets the category field so the surrounding object or component receives this setting.
  category: z.enum(['CEMENT', 'STEEL', 'SAND_AGGREGATE', 'BRICKS_BLOCKS', 'TIMBER', 'ELECTRICAL', 'PLUMBING', 'PAINT_FINISH', 'OTHER']),
  // Sets the unit field so the surrounding object or component receives this setting.
  unit: z.string().trim().min(1).max(30),
  // Sets the description field so the surrounding object or component receives this setting.
  description: z.string().trim().max(1000).nullable().optional(),
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in materialIdParamsSchema so later lines can reuse this data or behavior for the current feature.
export const materialIdParamsSchema = z.object({ id: z.coerce.number().int().positive() })
// Stores the value in createMaterialSchema so later lines can reuse this data or behavior for the current feature.
export const createMaterialSchema = z.object(materialFields)
// Stores the value in updateMaterialSchema so later lines can reuse this data or behavior for the current feature.
export const updateMaterialSchema = z.object(materialFields).partial().refine(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  (value) => Object.keys(value).length > 0,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { message: 'At least one material field is required.' },
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Stores the value in materialListQuerySchema so later lines can reuse this data or behavior for the current feature.
export const materialListQuerySchema = z.object({
  // Sets the search field so the surrounding object or component receives this setting.
  search: z.string().trim().max(100).optional(),
  // Sets the category field so the surrounding object or component receives this setting.
  category: materialFields.category.optional(),
  // Sets the isActive field so the surrounding object or component receives this setting.
  isActive: z.coerce.boolean().optional(),
// Continues the component or data expression so its related values and behavior stay grouped together.
})

// Continues the component or data expression so its related values and behavior stay grouped together.
export type CreateMaterialInput = z.infer<typeof createMaterialSchema>
// Continues the component or data expression so its related values and behavior stay grouped together.
export type UpdateMaterialInput = z.infer<typeof updateMaterialSchema>
// Continues the component or data expression so its related values and behavior stay grouped together.
export type MaterialListQuery = z.infer<typeof materialListQuerySchema>
