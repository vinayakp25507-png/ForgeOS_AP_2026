// Imports z from zod so this module can reuse that component, helper, or library.
import { z } from 'zod'

// Stores the value in landFields so later lines can reuse this data or behavior for the current feature.
const landFields = {
  // Sets the name field so the surrounding object or component receives this setting.
  name: z.string().trim().min(1).max(255),
  // Sets the addressLine field so the surrounding object or component receives this setting.
  addressLine: z.string().trim().max(500).nullable().optional(),
  // Sets the city field so the surrounding object or component receives this setting.
  city: z.string().trim().min(1).max(100),
  // Sets the state field so the surrounding object or component receives this setting.
  state: z.string().trim().min(1).max(100),
  // Sets the pincode field so the surrounding object or component receives this setting.
  pincode: z.string().trim().max(20).nullable().optional(),
  // Sets the areaValue field so the surrounding object or component receives this setting.
  areaValue: z.coerce.number().positive(),
  // Sets the areaUnit field so the surrounding object or component receives this setting.
  areaUnit: z.enum(['SQFT', 'SQYD', 'SQM', 'ACRE']),
  // Sets the surveyNumber field so the surrounding object or component receives this setting.
  surveyNumber: z.string().trim().max(100).nullable().optional(),
  // Sets the ownerName field so the surrounding object or component receives this setting.
  ownerName: z.string().trim().max(255).nullable().optional(),
  // Sets the purchaseDate field so the surrounding object or component receives this setting.
  purchaseDate: z.coerce.date().nullable().optional(),
  // Sets the purchaseCost field so the surrounding object or component receives this setting.
  purchaseCost: z.coerce.number().nonnegative().nullable().optional(),
  // Sets the notes field so the surrounding object or component receives this setting.
  notes: z.string().trim().max(2000).nullable().optional(),
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in landIdParamsSchema so later lines can reuse this data or behavior for the current feature.
export const landIdParamsSchema = z.object({ id: z.coerce.number().int().positive() })
// Stores the value in landListQuerySchema so later lines can reuse this data or behavior for the current feature.
export const landListQuerySchema = z.object({
  // Sets the page field so the surrounding object or component receives this setting.
  page: z.coerce.number().int().min(1).default(1),
  // Sets the pageSize field so the surrounding object or component receives this setting.
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  // Sets the search field so the surrounding object or component receives this setting.
  search: z.string().trim().max(100).optional(),
// Continues the component or data expression so its related values and behavior stay grouped together.
})
// Stores the value in createLandSchema so later lines can reuse this data or behavior for the current feature.
export const createLandSchema = z.object(landFields)
// Stores the value in updateLandSchema so later lines can reuse this data or behavior for the current feature.
export const updateLandSchema = z.object(landFields).partial()
