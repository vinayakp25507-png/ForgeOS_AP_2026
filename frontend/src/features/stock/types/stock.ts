// Continues the component or data expression so its related values and behavior stay grouped together.
export type StockMovementType = 'IN' | 'OUT'

// Continues the component or data expression so its related values and behavior stay grouped together.
export type StockOutReason = 'USED' | 'DAMAGED' | 'LOST'

// Continues the component or data expression so its related values and behavior stay grouped together.
export interface StockTransaction {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string
  // Sets the type field so the surrounding object or component receives this setting.
  type: StockMovementType
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: string
  // Sets the projectCode field so the surrounding object or component receives this setting.
  projectCode: string
  // Sets the projectName field so the surrounding object or component receives this setting.
  projectName: string
  // Sets the materialId field so the surrounding object or component receives this setting.
  materialId: string
  // Sets the materialName field so the surrounding object or component receives this setting.
  materialName: string
  // Sets the materialUnit field so the surrounding object or component receives this setting.
  materialUnit: string
  // Sets the quantity field so the surrounding object or component receives this setting.
  quantity: number
  // Sets the date field so the surrounding object or component receives this setting.
  date: string
  // Continues the component or data expression so its related values and behavior stay grouped together.
  vendorName?: string
  // Continues the component or data expression so its related values and behavior stay grouped together.
  challanNumber?: string
  // Continues the component or data expression so its related values and behavior stay grouped together.
  rate?: number
  // Continues the component or data expression so its related values and behavior stay grouped together.
  billReference?: string
  // Continues the component or data expression so its related values and behavior stay grouped together.
  reason?: StockOutReason
  // Continues the component or data expression so its related values and behavior stay grouped together.
  notes?: string
  // Sets the voided field so the surrounding object or component receives this setting.
  voided: boolean
  // Continues the component or data expression so its related values and behavior stay grouped together.
  voidReason?: string
  // Sets the recordedBy field so the surrounding object or component receives this setting.
  recordedBy: string
  // Sets the createdAt field so the surrounding object or component receives this setting.
  createdAt: string
// Closes the current block or object so the grouped statements or settings end here.
}

// Continues the component or data expression so its related values and behavior stay grouped together.
export interface MaterialBalanceRow {
  // Sets the materialId field so the surrounding object or component receives this setting.
  materialId: string
  // Sets the materialName field so the surrounding object or component receives this setting.
  materialName: string
  // Sets the materialUnit field so the surrounding object or component receives this setting.
  materialUnit: string
  // Sets the totalIn field so the surrounding object or component receives this setting.
  totalIn: number
  // Sets the totalOut field so the surrounding object or component receives this setting.
  totalOut: number
  // Sets the balance field so the surrounding object or component receives this setting.
  balance: number
  // Continues the component or data expression so its related values and behavior stay grouped together.
  plannedQty?: number
  // Continues the component or data expression so its related values and behavior stay grouped together.
  lowStockThreshold?: number
  // Sets the isLow field so the surrounding object or component receives this setting.
  isLow: boolean
// Closes the current block or object so the grouped statements or settings end here.
}

// Continues the component or data expression so its related values and behavior stay grouped together.
export type WastageStatus = 'OK' | 'OVERRUN' | 'NO_BASELINE'

// Continues the component or data expression so its related values and behavior stay grouped together.
export interface WastageRow {
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: string
  // Sets the projectCode field so the surrounding object or component receives this setting.
  projectCode: string
  // Sets the projectName field so the surrounding object or component receives this setting.
  projectName: string
  // Sets the materialId field so the surrounding object or component receives this setting.
  materialId: string
  // Sets the materialName field so the surrounding object or component receives this setting.
  materialName: string
  // Sets the materialUnit field so the surrounding object or component receives this setting.
  materialUnit: string
  // Sets the progressPercent field so the surrounding object or component receives this setting.
  progressPercent: number
  // Sets the plannedQty field so the surrounding object or component receives this setting.
  plannedQty: number
  // Sets the expectedToDate field so the surrounding object or component receives this setting.
  expectedToDate: number
  // Sets the consumed field so the surrounding object or component receives this setting.
  consumed: number
  // Sets the overrunQty field so the surrounding object or component receives this setting.
  overrunQty: number
  // Sets the overrunPercent field so the surrounding object or component receives this setting.
  overrunPercent: number
  // Sets the recordedWastageQty field so the surrounding object or component receives this setting.
  recordedWastageQty: number
  // Sets the estimatedLoss field so the surrounding object or component receives this setting.
  estimatedLoss: number
  // Sets the wastageThreshold field so the surrounding object or component receives this setting.
  wastageThreshold: number
  // Sets the status field so the surrounding object or component receives this setting.
  status: WastageStatus
// Closes the current block or object so the grouped statements or settings end here.
}
