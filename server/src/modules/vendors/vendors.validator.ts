// Imports z from zod so this module can reuse that component, helper, or library.
import { z } from 'zod'

// Stores the value in vendorType so later lines can reuse this data or behavior for the current feature.
const vendorType = z.enum(['MATERIAL_SUPPLIER', 'LABOUR_CONTRACTOR', 'MACHINERY_RENTAL', 'SERVICE_PROVIDER', 'OTHER'])
// Stores the value in gstin so later lines can reuse this data or behavior for the current feature.
const gstin = z.string().regex(/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/, 'Invalid GSTIN format').optional().nullable()

// Stores the value in vendorIdParamsSchema so later lines can reuse this data or behavior for the current feature.
export const vendorIdParamsSchema = z.object({ id: z.coerce.number().int().positive() })
// Stores the value in projectVendorParamsSchema so later lines can reuse this data or behavior for the current feature.
export const projectVendorParamsSchema = z.object({
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: z.coerce.number().int().positive(),
  // Sets the vendorId field so the surrounding object or component receives this setting.
  vendorId: z.coerce.number().int().positive(),
// Continues the component or data expression so its related values and behavior stay grouped together.
})
// Stores the value in vendorSchema so later lines can reuse this data or behavior for the current feature.
export const vendorSchema = z.object({
  // Sets the name field so the surrounding object or component receives this setting.
  name: z.string().trim().min(1).max(255),
  // Sets the vendorType field so the surrounding object or component receives this setting.
  vendorType: vendorType.default('OTHER'),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  gstin,
  // Sets the phone field so the surrounding object or component receives this setting.
  phone: z.string().trim().max(30).optional().nullable(),
  // Sets the email field so the surrounding object or component receives this setting.
  email: z.string().trim().email().max(255).optional().nullable(),
  // Sets the contactPerson field so the surrounding object or component receives this setting.
  contactPerson: z.string().trim().max(255).optional().nullable(),
  // Sets the address field so the surrounding object or component receives this setting.
  address: z.string().trim().max(2000).optional().nullable(),
// Continues the component or data expression so its related values and behavior stay grouped together.
})
// Stores the value in createVendorSchema so later lines can reuse this data or behavior for the current feature.
export const createVendorSchema = vendorSchema
// Stores the value in updateVendorSchema so later lines can reuse this data or behavior for the current feature.
export const updateVendorSchema = vendorSchema.partial().refine((value) => Object.keys(value).length > 0, {
  // Sets the message field so the surrounding object or component receives this setting.
  message: 'At least one vendor field is required.',
// Continues the component or data expression so its related values and behavior stay grouped together.
})
// Stores the value in vendorListQuerySchema so later lines can reuse this data or behavior for the current feature.
export const vendorListQuerySchema = z.object({
  // Sets the search field so the surrounding object or component receives this setting.
  search: z.string().trim().max(100).optional(),
  // Sets the isActive field so the surrounding object or component receives this setting.
  isActive: z.coerce.boolean().optional(),
// Continues the component or data expression so its related values and behavior stay grouped together.
})

// Continues the component or data expression so its related values and behavior stay grouped together.
export type VendorInput = z.infer<typeof vendorSchema>
// Continues the component or data expression so its related values and behavior stay grouped together.
export type VendorUpdateInput = z.infer<typeof updateVendorSchema>
// Continues the component or data expression so its related values and behavior stay grouped together.
export type VendorListQuery = z.infer<typeof vendorListQuerySchema>
