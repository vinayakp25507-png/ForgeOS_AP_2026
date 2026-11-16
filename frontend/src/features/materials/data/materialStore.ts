// Imports type  Material, MaterialPlan, MaterialStatus from ../types/material so this module can reuse that component, helper, or library.
import type { Material, MaterialPlan, MaterialStatus } from '../types/material'

// Stores the value in MATERIALS_KEY so later lines can reuse this data or behavior for the current feature.
const MATERIALS_KEY = 'forgeos_materials'
// Stores the value in PLANS_KEY so later lines can reuse this data or behavior for the current feature.
const PLANS_KEY = 'forgeos_material_plans'
// Stores the value in PROGRESS_KEY so later lines can reuse this data or behavior for the current feature.
const PROGRESS_KEY = 'forgeos_material_progress'

// Stores the value in initialMaterials so later lines can reuse this data or behavior for the current feature.
export const initialMaterials: Material[] = [
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'MAT-001', name: 'OPC 53 Grade Cement', category: 'Cement', unit: 'Bag', referenceRate: 395, status: 'Active', createdAt: '2026-09-01T09:00:00Z' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'MAT-002', name: 'PPC Cement', category: 'Cement', unit: 'Bag', referenceRate: 370, status: 'Active', createdAt: '2026-09-01T09:05:00Z' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'MAT-003', name: 'TMT Rebar Fe 550D 12mm', category: 'Steel', unit: 'Tonne', referenceRate: 58500, status: 'Active', createdAt: '2026-09-01T09:10:00Z' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'MAT-004', name: 'TMT Rebar Fe 500D 8mm', category: 'Steel', unit: 'Tonne', referenceRate: 56000, status: 'Active', createdAt: '2026-09-01T09:15:00Z' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'MAT-005', name: 'M25 Ready Mix Concrete', category: 'Ready Mix Concrete', unit: 'Cum', referenceRate: 4650, status: 'Active', createdAt: '2026-09-01T09:20:00Z' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'MAT-006', name: 'River Sand', category: 'Aggregates & Sand', unit: 'Cum', referenceRate: 1450, status: 'Active', createdAt: '2026-09-01T09:25:00Z' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'MAT-007', name: 'Aggregate 20mm', category: 'Aggregates & Sand', unit: 'Cum', referenceRate: 1150, status: 'Active', createdAt: '2026-09-01T09:30:00Z' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'MAT-008', name: 'Red Clay Bricks', category: 'Bricks & Blocks', unit: 'Nos', referenceRate: 9, status: 'Active', createdAt: '2026-09-01T09:35:00Z' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'MAT-009', name: 'AAC Block 200mm', category: 'Bricks & Blocks', unit: 'Nos', referenceRate: 68, status: 'Active', createdAt: '2026-09-01T09:40:00Z' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'MAT-010', name: 'Binding Wire', category: 'Hardware', unit: 'Kg', referenceRate: 85, status: 'Active', createdAt: '2026-09-01T09:45:00Z' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'MAT-011', name: 'Shuttering Ply 12mm', category: 'Consumables', unit: 'Nos', referenceRate: 1150, status: 'Active', createdAt: '2026-09-01T09:50:00Z' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'MAT-012', name: 'Emulsion Paint', category: 'Paint & Finishing', unit: 'Litre', referenceRate: 310, status: 'Inactive', createdAt: '2026-09-01T09:55:00Z' },
// Continues the component or data expression so its related values and behavior stay grouped together.
]

// Stores the value in initialPlans so later lines can reuse this data or behavior for the current feature.
export const initialPlans: MaterialPlan[] = [
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PLN-001', projectId: '1', materialId: 'MAT-001', plannedQty: 8000, plannedRate: 395, lowStockThreshold: 800, wastageThreshold: 8 },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PLN-002', projectId: '1', materialId: 'MAT-003', plannedQty: 85, plannedRate: 58500, lowStockThreshold: 8 },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PLN-003', projectId: '1', materialId: 'MAT-004', plannedQty: 45, plannedRate: 56000, lowStockThreshold: 5 },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PLN-004', projectId: '1', materialId: 'MAT-005', plannedQty: 620, plannedRate: 4650, lowStockThreshold: 50 },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PLN-005', projectId: '1', materialId: 'MAT-006', plannedQty: 950, plannedRate: 1450 },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PLN-006', projectId: '1', materialId: 'MAT-007', plannedQty: 700, plannedRate: 1150 },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PLN-007', projectId: '1', materialId: 'MAT-008', plannedQty: 120000, plannedRate: 9 },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PLN-008', projectId: '1', materialId: 'MAT-010', plannedQty: 1200, plannedRate: 85, lowStockThreshold: 100 },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PLN-009', projectId: '1', materialId: 'MAT-011', plannedQty: 900, plannedRate: 1150 },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PLN-010', projectId: '2', materialId: 'MAT-001', plannedQty: 12000, plannedRate: 395, lowStockThreshold: 1000 },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PLN-011', projectId: '2', materialId: 'MAT-003', plannedQty: 150, plannedRate: 58500, lowStockThreshold: 12 },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PLN-012', projectId: '2', materialId: 'MAT-005', plannedQty: 1400, plannedRate: 4650, lowStockThreshold: 40 },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PLN-013', projectId: '2', materialId: 'MAT-006', plannedQty: 1800, plannedRate: 1450 },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PLN-014', projectId: '2', materialId: 'MAT-007', plannedQty: 1500, plannedRate: 1150, lowStockThreshold: 100 },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'PLN-015', projectId: '2', materialId: 'MAT-009', plannedQty: 45000, plannedRate: 68 },
// Continues the component or data expression so its related values and behavior stay grouped together.
]

// Stores the value in initialProgress so later lines can reuse this data or behavior for the current feature.
const initialProgress: Record<string, number> = { '1': 58, '2': 34 }

// Defines readJson so this module can perform its named task when needed.
function readJson<T>(key: string, fallback: T, seed = true): T {
  // Starts an error-handling region so failures can be caught and handled safely.
  try {
    // Stores the value in data so later lines can reuse this data or behavior for the current feature.
    const data = localStorage.getItem(key)
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!data) {
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (seed) localStorage.setItem(key, JSON.stringify(fallback))
      // Returns the result so the caller or React receives the value or interface this function provides.
      return fallback
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Returns the result so the caller or React receives the value or interface this function provides.
    return JSON.parse(data) as T
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } catch {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return fallback
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getStoredMaterials so this module can perform its named task when needed.
export function getStoredMaterials(): Material[] {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return readJson<Material[]>(MATERIALS_KEY, initialMaterials)
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines saveStoredMaterials so this module can perform its named task when needed.
export function saveStoredMaterials(materials: Material[]): void {
  // Starts an error-handling region so failures can be caught and handled safely.
  try {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    localStorage.setItem(MATERIALS_KEY, JSON.stringify(materials))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } catch (error) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    console.error('Failed to save materials in localStorage', error)
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines addMaterial so this module can perform its named task when needed.
export function addMaterial(
  // Sets the data field so the surrounding object or component receives this setting.
  data: Omit<Material, 'id' | 'status' | 'createdAt'>
// Continues the component or data expression so its related values and behavior stay grouped together.
): Material | null {
  // Stores the value in materials so later lines can reuse this data or behavior for the current feature.
  const materials = getStoredMaterials()
  // Stores the value in nameTaken so later lines can reuse this data or behavior for the current feature.
  const nameTaken = materials.some(
    // Continues the component or data expression so its related values and behavior stay grouped together.
    (m) => m.name.trim().toLowerCase() === data.name.trim().toLowerCase()
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (nameTaken) return null

  // Stores the value in material so later lines can reuse this data or behavior for the current feature.
  const material: Material = {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...data,
    // Sets the name field so the surrounding object or component receives this setting.
    name: data.name.trim(),
    // Sets the id field so the surrounding object or component receives this setting.
    id: `MAT-${Date.now().toString().slice(-6)}`,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'Active',
    // Sets the createdAt field so the surrounding object or component receives this setting.
    createdAt: new Date().toISOString(),
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  saveStoredMaterials([material, ...materials])
  // Returns the result so the caller or React receives the value or interface this function provides.
  return material
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines updateMaterial so this module can perform its named task when needed.
export function updateMaterial(
  // Sets the id field so the surrounding object or component receives this setting.
  id: string,
  // Sets the changes field so the surrounding object or component receives this setting.
  changes: Partial<Omit<Material, 'id' | 'createdAt'>>
// Continues the component or data expression so its related values and behavior stay grouped together.
): Material | null {
  // Stores the value in materials so later lines can reuse this data or behavior for the current feature.
  const materials = getStoredMaterials()
  // Stores the value in index so later lines can reuse this data or behavior for the current feature.
  const index = materials.findIndex((m) => m.id === id)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (index === -1) return null

  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (changes.name) {
    // Stores the value in nameTaken so later lines can reuse this data or behavior for the current feature.
    const nameTaken = materials.some(
      // Continues the component or data expression so its related values and behavior stay grouped together.
      (m) => m.id !== id && m.name.trim().toLowerCase() === changes.name!.trim().toLowerCase()
    // Closes this function call or grouped expression so the surrounding code can continue.
    )
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (nameTaken) return null
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in updated so later lines can reuse this data or behavior for the current feature.
  const updated: Material = { ...materials[index], ...changes }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  materials[index] = updated
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  saveStoredMaterials(materials)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return updated
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines setMaterialStatus so this module can perform its named task when needed.
export function setMaterialStatus(id: string, status: MaterialStatus): Material | null {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return updateMaterial(id, { status })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getStoredPlans so this module can perform its named task when needed.
export function getStoredPlans(): MaterialPlan[] {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return readJson<MaterialPlan[]>(PLANS_KEY, initialPlans)
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines saveStoredPlans so this module can perform its named task when needed.
export function saveStoredPlans(plans: MaterialPlan[]): void {
  // Starts an error-handling region so failures can be caught and handled safely.
  try {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    localStorage.setItem(PLANS_KEY, JSON.stringify(plans))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } catch (error) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    console.error('Failed to save material plans in localStorage', error)
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines upsertPlan so this module can perform its named task when needed.
export function upsertPlan(
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: string,
  // Sets the materialId field so the surrounding object or component receives this setting.
  materialId: string,
  // Sets the data field so the surrounding object or component receives this setting.
  data: Omit<MaterialPlan, 'id' | 'projectId' | 'materialId'>
// Continues the component or data expression so its related values and behavior stay grouped together.
): MaterialPlan {
  // Stores the value in plans so later lines can reuse this data or behavior for the current feature.
  const plans = getStoredPlans()
  // Stores the value in index so later lines can reuse this data or behavior for the current feature.
  const index = plans.findIndex(
    // Continues the component or data expression so its related values and behavior stay grouped together.
    (p) => p.projectId === projectId && p.materialId === materialId
  // Closes this function call or grouped expression so the surrounding code can continue.
  )

  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (index === -1) {
    // Stores the value in plan so later lines can reuse this data or behavior for the current feature.
    const plan: MaterialPlan = {
      // Sets the id field so the surrounding object or component receives this setting.
      id: `PLN-${Date.now().toString().slice(-6)}`,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      projectId,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      materialId,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ...data,
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    saveStoredPlans([...plans, plan])
    // Returns the result so the caller or React receives the value or interface this function provides.
    return plan
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in updated so later lines can reuse this data or behavior for the current feature.
  const updated: MaterialPlan = { ...plans[index], ...data }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  plans[index] = updated
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  saveStoredPlans(plans)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return updated
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines removePlan so this module can perform its named task when needed.
export function removePlan(planId: string): void {
  // Keeps only items matching this condition so the result contains relevant data.
  saveStoredPlans(getStoredPlans().filter((p) => p.id !== planId))
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getProjectProgress so this module can perform its named task when needed.
export function getProjectProgress(projectId: string): number {
  // Stores the value in progress so later lines can reuse this data or behavior for the current feature.
  const progress = readJson<Record<string, number>>(PROGRESS_KEY, initialProgress)
  // Stores the value in value so later lines can reuse this data or behavior for the current feature.
  const value = progress[projectId]
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (typeof value !== 'number' || Number.isNaN(value)) return 0
  // Returns the result so the caller or React receives the value or interface this function provides.
  return Math.min(100, Math.max(0, value))
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines setProjectProgress so this module can perform its named task when needed.
export function setProjectProgress(projectId: string, percent: number): void {
  // Stores the value in progress so later lines can reuse this data or behavior for the current feature.
  const progress = readJson<Record<string, number>>(PROGRESS_KEY, initialProgress)
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  progress[projectId] = Math.min(100, Math.max(0, Math.round(percent)))
  // Starts an error-handling region so failures can be caught and handled safely.
  try {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } catch (error) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    console.error('Failed to save project progress in localStorage', error)
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}
