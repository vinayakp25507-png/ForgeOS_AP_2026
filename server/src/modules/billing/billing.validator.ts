// Imports z from zod so this module can reuse that component, helper, or library.
import { z } from 'zod'

// Stores the value in dateOnly so later lines can reuse this data or behavior for the current feature.
const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must use YYYY-MM-DD format')
// Stores the value in billCategory so later lines can reuse this data or behavior for the current feature.
const billCategory = z.enum(['MATERIAL', 'LABOUR', 'MACHINERY', 'SERVICES', 'OTHER'])
// Stores the value in gstPercent so later lines can reuse this data or behavior for the current feature.
const gstPercent = z.union([z.literal(0), z.literal(5), z.literal(12), z.literal(18), z.literal(28)])
// Stores the value in billFields so later lines can reuse this data or behavior for the current feature.
const billFields = {
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: z.coerce.number().int().positive(),
  // Sets the vendorId field so the surrounding object or component receives this setting.
  vendorId: z.coerce.number().int().positive(),
  // Sets the billNumber field so the surrounding object or component receives this setting.
  billNumber: z.string().trim().min(1).max(100),
  // Sets the billDate field so the surrounding object or component receives this setting.
  billDate: dateOnly,
  // Sets the dueDate field so the surrounding object or component receives this setting.
  dueDate: dateOnly.optional().nullable(),
  // Sets the category field so the surrounding object or component receives this setting.
  category: billCategory,
  // Sets the description field so the surrounding object or component receives this setting.
  description: z.string().trim().max(5000).optional().nullable(),
  // Sets the baseAmount field so the surrounding object or component receives this setting.
  baseAmount: z.coerce.number().positive(),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  gstPercent,
// Closes the current block or object so the grouped statements or settings end here.
}
// Stores the value in dateRange so later lines can reuse this data or behavior for the current feature.
const dateRange = z.object({
  // Sets the from field so the surrounding object or component receives this setting.
  from: dateOnly.optional(),
  // Sets the to field so the surrounding object or component receives this setting.
  to: dateOnly.optional(),
// Continues the component or data expression so its related values and behavior stay grouped together.
}).refine((value) => !value.from || !value.to || value.from <= value.to, {
  // Sets the message field so the surrounding object or component receives this setting.
  message: 'The from date must be on or before the to date.',
  // Sets the path field so the surrounding object or component receives this setting.
  path: ['to'],
// Continues the component or data expression so its related values and behavior stay grouped together.
})

// Stores the value in billIdParamsSchema so later lines can reuse this data or behavior for the current feature.
export const billIdParamsSchema = z.object({ id: z.coerce.number().int().positive() })
// Stores the value in createBillSchema so later lines can reuse this data or behavior for the current feature.
export const createBillSchema = z.object(billFields).refine(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  (value) => !value.dueDate || value.dueDate >= value.billDate,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { message: 'Due date must be on or after bill date.', path: ['dueDate'] },
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Stores the value in updateBillSchema so later lines can reuse this data or behavior for the current feature.
export const updateBillSchema = z.object({ ...billFields }).omit({ projectId: true }).partial().refine(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  (value) => Object.keys(value).length > 0,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { message: 'At least one bill field is required.' },
// Continues the component or data expression so its related values and behavior stay grouped together.
).refine(
  // Continues the component or data expression so its related values and behavior stay grouped together.
  (value) => !value.billDate || !value.dueDate || value.dueDate >= value.billDate,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { message: 'Due date must be on or after bill date.', path: ['dueDate'] },
// Closes this function call or grouped expression so the surrounding code can continue.
)
// Stores the value in rejectBillSchema so later lines can reuse this data or behavior for the current feature.
export const rejectBillSchema = z.object({ reason: z.string().trim().min(5).max(1000) })
// Stores the value in paymentSchema so later lines can reuse this data or behavior for the current feature.
export const paymentSchema = z.object({
  // Sets the amount field so the surrounding object or component receives this setting.
  amount: z.coerce.number().positive(),
  // Sets the paymentDate field so the surrounding object or component receives this setting.
  paymentDate: dateOnly,
  // Sets the mode field so the surrounding object or component receives this setting.
  mode: z.enum(['CASH', 'BANK_TRANSFER', 'UPI', 'CHEQUE', 'OTHER']),
  // Sets the referenceNumber field so the surrounding object or component receives this setting.
  referenceNumber: z.string().trim().max(255).optional().nullable(),
  // Sets the remarks field so the surrounding object or component receives this setting.
  remarks: z.string().trim().max(1000).optional().nullable(),
// Continues the component or data expression so its related values and behavior stay grouped together.
})
// Stores the value in billListQuerySchema so later lines can reuse this data or behavior for the current feature.
export const billListQuerySchema = dateRange.extend({
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: z.coerce.number().int().positive().optional(),
  // Sets the vendorId field so the surrounding object or component receives this setting.
  vendorId: z.coerce.number().int().positive().optional(),
  // Sets the status field so the surrounding object or component receives this setting.
  status: z.string().trim().optional(),
  // Sets the category field so the surrounding object or component receives this setting.
  category: billCategory.optional(),
  // Sets the overdue field so the surrounding object or component receives this setting.
  overdue: z.coerce.boolean().optional(),
  // Sets the search field so the surrounding object or component receives this setting.
  search: z.string().trim().max(100).optional(),
  // Sets the page field so the surrounding object or component receives this setting.
  page: z.coerce.number().int().min(1).default(1),
  // Sets the pageSize field so the surrounding object or component receives this setting.
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
// Continues the component or data expression so its related values and behavior stay grouped together.
})
// Stores the value in paymentListQuerySchema so later lines can reuse this data or behavior for the current feature.
export const paymentListQuerySchema = dateRange
// Stores the value in reportDateQuerySchema so later lines can reuse this data or behavior for the current feature.
export const reportDateQuerySchema = dateRange
// Continues the component or data expression so its related values and behavior stay grouped together.
export type CreateBillInput = z.infer<typeof createBillSchema>
// Continues the component or data expression so its related values and behavior stay grouped together.
export type UpdateBillInput = z.infer<typeof updateBillSchema>
// Continues the component or data expression so its related values and behavior stay grouped together.
export type PaymentInput = z.infer<typeof paymentSchema>
// Continues the component or data expression so its related values and behavior stay grouped together.
export type BillListQuery = z.infer<typeof billListQuerySchema>
// Continues the component or data expression so its related values and behavior stay grouped together.
export type DateQuery = z.infer<typeof reportDateQuerySchema>
