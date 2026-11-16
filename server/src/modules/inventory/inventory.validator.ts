// Imports z from zod so this module can reuse that component, helper, or library.
import { z } from 'zod'

// Stores the value in dateOnly so later lines can reuse this data or behavior for the current feature.
const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must use YYYY-MM-DD format')
// Stores the value in transactionType so later lines can reuse this data or behavior for the current feature.
const transactionType = z.enum(['IN', 'OUT', 'ADJUSTMENT'])
// Stores the value in baseTransaction so later lines can reuse this data or behavior for the current feature.
const baseTransaction = {
  // Sets the materialId field so the surrounding object or component receives this setting.
  materialId: z.coerce.number().int().positive(),
  // Sets the txnType field so the surrounding object or component receives this setting.
  txnType: transactionType,
  // Sets the quantity field so the surrounding object or component receives this setting.
  quantity: z.coerce.number().positive(),
  // Sets the txnDate field so the surrounding object or component receives this setting.
  txnDate: dateOnly,
  // Sets the unitRate field so the surrounding object or component receives this setting.
  unitRate: z.coerce.number().nonnegative().optional(),
  // Sets the vendorId field so the surrounding object or component receives this setting.
  vendorId: z.coerce.number().int().positive().optional(),
  // Sets the billId field so the surrounding object or component receives this setting.
  billId: z.coerce.number().int().positive().optional(),
  // Sets the challanNumber field so the surrounding object or component receives this setting.
  challanNumber: z.string().trim().max(100).optional(),
  // Sets the outReason field so the surrounding object or component receives this setting.
  outReason: z.enum(['USED', 'DAMAGED', 'LOST']).optional(),
  // Sets the adjustmentDirection field so the surrounding object or component receives this setting.
  adjustmentDirection: z.enum(['INCREASE', 'DECREASE']).optional(),
  // Sets the dailyLogId field so the surrounding object or component receives this setting.
  dailyLogId: z.coerce.number().int().positive().optional(),
  // Sets the remarks field so the surrounding object or component receives this setting.
  remarks: z.string().trim().max(1000).optional(),
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in projectInventoryParamsSchema so later lines can reuse this data or behavior for the current feature.
export const projectInventoryParamsSchema = z.object({ projectId: z.coerce.number().int().positive() })
// Stores the value in createTransactionSchema so later lines can reuse this data or behavior for the current feature.
export const createTransactionSchema = z.object(baseTransaction).superRefine((value, context) => {
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (value.txnType === 'IN' && (value.outReason || value.adjustmentDirection)) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    context.addIssue({ code: 'custom', path: ['outReason'], message: 'IN transactions cannot include OUT or adjustment fields.' })
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (value.txnType === 'OUT' && (!value.outReason || value.vendorId || value.billId || value.unitRate || value.adjustmentDirection)) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    context.addIssue({ code: 'custom', path: ['outReason'], message: 'OUT requires outReason and cannot include IN or adjustment fields.' })
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (value.txnType === 'ADJUSTMENT' && (!value.adjustmentDirection || value.outReason || value.vendorId || value.billId || value.unitRate)) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    context.addIssue({ code: 'custom', path: ['adjustmentDirection'], message: 'ADJUSTMENT requires adjustmentDirection and cannot include IN or OUT fields.' })
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Continues the component or data expression so its related values and behavior stay grouped together.
})
// Stores the value in transactionListQuerySchema so later lines can reuse this data or behavior for the current feature.
export const transactionListQuerySchema = z.object({
  // Sets the materialId field so the surrounding object or component receives this setting.
  materialId: z.coerce.number().int().positive().optional(),
  // Sets the txnType field so the surrounding object or component receives this setting.
  txnType: transactionType.optional(),
  // Sets the from field so the surrounding object or component receives this setting.
  from: dateOnly.optional(),
  // Sets the to field so the surrounding object or component receives this setting.
  to: dateOnly.optional(),
  // Sets the includeVoided field so the surrounding object or component receives this setting.
  includeVoided: z.coerce.boolean().default(false),
// Continues the component or data expression so its related values and behavior stay grouped together.
}).refine((value) => !value.from || !value.to || value.from <= value.to, {
  // Sets the message field so the surrounding object or component receives this setting.
  message: 'The from date must be on or before the to date.',
  // Sets the path field so the surrounding object or component receives this setting.
  path: ['to'],
// Continues the component or data expression so its related values and behavior stay grouped together.
})
// Stores the value in wastageQuerySchema so later lines can reuse this data or behavior for the current feature.
export const wastageQuerySchema = z.object({}).strict()
// Continues the component or data expression so its related values and behavior stay grouped together.
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>
// Continues the component or data expression so its related values and behavior stay grouped together.
export type TransactionListQuery = z.infer<typeof transactionListQuerySchema>
