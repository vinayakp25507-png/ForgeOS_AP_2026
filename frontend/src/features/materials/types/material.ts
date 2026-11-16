// Continues the component or data expression so its related values and behavior stay grouped together.
export type MaterialUnit = 'Bag' | 'Tonne' | 'Kg' | 'Cum' | 'Sqm' | 'Rmt' | 'Nos' | 'Litre' | 'Box'

// Continues the component or data expression so its related values and behavior stay grouped together.
export type MaterialStatus = 'Active' | 'Inactive'

// Continues the component or data expression so its related values and behavior stay grouped together.
export interface Material {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string
  // Sets the name field so the surrounding object or component receives this setting.
  name: string
  // Sets the category field so the surrounding object or component receives this setting.
  category: string
  // Sets the unit field so the surrounding object or component receives this setting.
  unit: MaterialUnit
  // Continues the component or data expression so its related values and behavior stay grouped together.
  referenceRate?: number
  // Sets the status field so the surrounding object or component receives this setting.
  status: MaterialStatus
  // Sets the createdAt field so the surrounding object or component receives this setting.
  createdAt: string
// Closes the current block or object so the grouped statements or settings end here.
}

// Continues the component or data expression so its related values and behavior stay grouped together.
export interface MaterialPlan {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: string
  // Sets the materialId field so the surrounding object or component receives this setting.
  materialId: string
  // Sets the plannedQty field so the surrounding object or component receives this setting.
  plannedQty: number
  // Continues the component or data expression so its related values and behavior stay grouped together.
  plannedRate?: number
  // Continues the component or data expression so its related values and behavior stay grouped together.
  lowStockThreshold?: number
  // Continues the component or data expression so its related values and behavior stay grouped together.
  wastageThreshold?: number
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in MATERIAL_CATEGORIES so later lines can reuse this data or behavior for the current feature.
export const MATERIAL_CATEGORIES = [
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Cement',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Steel',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Ready Mix Concrete',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Aggregates & Sand',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Bricks & Blocks',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Electrical',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Plumbing',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Paint & Finishing',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Waterproofing',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Tiles & Stone',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Doors & Windows',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Hardware',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Consumables',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Other',
// Continues the component or data expression so its related values and behavior stay grouped together.
]

// Stores the value in MATERIAL_UNITS so later lines can reuse this data or behavior for the current feature.
export const MATERIAL_UNITS: MaterialUnit[] = [
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Bag',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Tonne',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Kg',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Cum',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Sqm',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Rmt',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Nos',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Litre',
  // Continues the component or data expression so its related values and behavior stay grouped together.
  'Box',
// Continues the component or data expression so its related values and behavior stay grouped together.
]
