// Continues the component or data expression so its related values and behavior stay grouped together.
import type {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  MaterialBalanceRow,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  StockOutReason,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  StockTransaction,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  WastageRow,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  WastageStatus,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from '../types/stock'
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  getProjectProgress,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  getStoredMaterials,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  getStoredPlans,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from '../../materials/data/materialStore'

// Stores the value in STORAGE_KEY so later lines can reuse this data or behavior for the current feature.
const STORAGE_KEY = 'forgeos_stock_transactions'
// Stores the value in DEFAULT_WASTAGE_THRESHOLD so later lines can reuse this data or behavior for the current feature.
const DEFAULT_WASTAGE_THRESHOLD = 10

// Stores the value in initialTransactions so later lines can reuse this data or behavior for the current feature.
export const initialTransactions: StockTransaction[] = [
  // Green Valley Residency — Stock IN
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-001', type: 'IN', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-001', materialName: 'OPC 53 Grade Cement', materialUnit: 'Bag', quantity: 3200, date: '2026-09-12', vendorName: 'UltraTech Cement Ltd', challanNumber: 'CH-8821', rate: 395, recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-09-12T10:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-002', type: 'IN', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-001', materialName: 'OPC 53 Grade Cement', materialUnit: 'Bag', quantity: 2800, date: '2026-10-18', vendorName: 'UltraTech Cement Ltd', challanNumber: 'CH-9034', rate: 392, billReference: 'BILL-001', recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-10-18T09:30:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-003', type: 'IN', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-003', materialName: 'TMT Rebar Fe 550D 12mm', materialUnit: 'Tonne', quantity: 42, date: '2026-09-20', vendorName: 'Kamdhenu Steel Traders', challanNumber: 'CH-4910', rate: 58500, billReference: 'BILL-002', recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-09-20T11:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-004', type: 'IN', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-004', materialName: 'TMT Rebar Fe 500D 8mm', materialUnit: 'Tonne', quantity: 21, date: '2026-10-02', vendorName: 'Kamdhenu Steel Traders', challanNumber: 'CH-5011', rate: 56000, recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-10-02T10:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-005', type: 'IN', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-005', materialName: 'M25 Ready Mix Concrete', materialUnit: 'Cum', quantity: 385, date: '2026-10-15', vendorName: 'Shree Ram RMC Plant', challanNumber: 'RMC-CH-092', rate: 4650, billReference: 'BILL-003', recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-10-15T14:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-006', type: 'IN', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-006', materialName: 'River Sand', materialUnit: 'Cum', quantity: 610, date: '2026-09-15', vendorName: 'Yamuna Sand Suppliers', rate: 1450, recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-09-15T08:30:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-007', type: 'IN', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-007', materialName: 'Aggregate 20mm', materialUnit: 'Cum', quantity: 480, date: '2026-09-16', vendorName: 'Aravalli Aggregates', rate: 1150, recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-09-16T08:45:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-008', type: 'IN', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-008', materialName: 'Red Clay Bricks', materialUnit: 'Nos', quantity: 72000, date: '2026-10-05', vendorName: 'Jaipur Bricks & Aggregates', challanNumber: 'JBA-CH-09', rate: 9, recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-10-05T12:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-009', type: 'IN', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-010', materialName: 'Binding Wire', materialUnit: 'Kg', quantity: 640, date: '2026-10-08', rate: 85, recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-10-08T09:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-010', type: 'IN', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-011', materialName: 'Shuttering Ply 12mm', materialUnit: 'Nos', quantity: 520, date: '2026-09-28', rate: 1150, recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-09-28T10:30:00Z', voided: false },
  // Green Valley Residency — Stock OUT
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-011', type: 'OUT', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-001', materialName: 'OPC 53 Grade Cement', materialUnit: 'Bag', quantity: 2450, date: '2026-09-30', reason: 'USED', recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-09-30T18:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-012', type: 'OUT', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-001', materialName: 'OPC 53 Grade Cement', materialUnit: 'Bag', quantity: 2180, date: '2026-10-25', reason: 'USED', recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-10-25T18:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-013', type: 'OUT', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-001', materialName: 'OPC 53 Grade Cement', materialUnit: 'Bag', quantity: 96, date: '2026-10-26', reason: 'DAMAGED', notes: 'Bags soaked in unexpected rain at ground floor storage', recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-10-26T09:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-014', type: 'OUT', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-003', materialName: 'TMT Rebar Fe 550D 12mm', materialUnit: 'Tonne', quantity: 36.5, date: '2026-10-10', reason: 'USED', recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-10-10T18:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-015', type: 'OUT', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-004', materialName: 'TMT Rebar Fe 500D 8mm', materialUnit: 'Tonne', quantity: 17.2, date: '2026-10-12', reason: 'USED', recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-10-12T18:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-016', type: 'OUT', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-005', materialName: 'M25 Ready Mix Concrete', materialUnit: 'Cum', quantity: 361, date: '2026-10-15', reason: 'USED', recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-10-15T19:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-017', type: 'OUT', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-006', materialName: 'River Sand', materialUnit: 'Cum', quantity: 488, date: '2026-10-20', reason: 'USED', recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-10-20T18:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-018', type: 'OUT', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-007', materialName: 'Aggregate 20mm', materialUnit: 'Cum', quantity: 402, date: '2026-10-22', reason: 'USED', recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-10-22T18:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-019', type: 'OUT', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-008', materialName: 'Red Clay Bricks', materialUnit: 'Nos', quantity: 55400, date: '2026-10-18', reason: 'USED', recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-10-18T18:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-020', type: 'OUT', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-010', materialName: 'Binding Wire', materialUnit: 'Kg', quantity: 512, date: '2026-10-28', reason: 'USED', recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-10-28T18:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-021', type: 'OUT', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-011', materialName: 'Shuttering Ply 12mm', materialUnit: 'Nos', quantity: 318, date: '2026-10-30', reason: 'USED', recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-10-30T18:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-022', type: 'OUT', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-011', materialName: 'Shuttering Ply 12mm', materialUnit: 'Nos', quantity: 14, date: '2026-10-30', reason: 'DAMAGED', notes: 'Edges delaminated during deshuttering', recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-10-30T18:15:00Z', voided: false },
  // Voided duplicate entry example
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-030', type: 'IN', projectId: '1', projectCode: 'PRJ-001', projectName: 'Green Valley Residency', materialId: 'MAT-008', materialName: 'Red Clay Bricks', materialUnit: 'Nos', quantity: 5000, date: '2026-10-11', vendorName: 'Jaipur Bricks & Aggregates', challanNumber: 'JBA-CH-11', rate: 9, recordedBy: 'Aarav Sharma (PM)', createdAt: '2026-10-11T11:00:00Z', voided: true, voidReason: 'Duplicate challan entry — same delivery recorded under JBA-CH-09' },
  // Skyline Commercial Hub — Stock IN
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-101', type: 'IN', projectId: '2', projectCode: 'PRJ-002', projectName: 'Skyline Commercial Hub', materialId: 'MAT-001', materialName: 'OPC 53 Grade Cement', materialUnit: 'Bag', quantity: 5200, date: '2026-10-04', vendorName: 'UltraTech Cement Ltd', challanNumber: 'CH-9180', rate: 396, recordedBy: 'Priya Mehta (PM)', createdAt: '2026-10-04T10:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-102', type: 'IN', projectId: '2', projectCode: 'PRJ-002', projectName: 'Skyline Commercial Hub', materialId: 'MAT-001', materialName: 'OPC 53 Grade Cement', materialUnit: 'Bag', quantity: 3600, date: '2026-11-02', vendorName: 'UltraTech Cement Ltd', challanNumber: 'CH-9422', rate: 398, recordedBy: 'Priya Mehta (PM)', createdAt: '2026-11-02T10:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-103', type: 'IN', projectId: '2', projectCode: 'PRJ-002', projectName: 'Skyline Commercial Hub', materialId: 'MAT-003', materialName: 'TMT Rebar Fe 550D 12mm', materialUnit: 'Tonne', quantity: 58, date: '2026-10-09', vendorName: 'Jindal Steel & Power', challanNumber: 'CH-2210', rate: 58800, recordedBy: 'Priya Mehta (PM)', createdAt: '2026-10-09T11:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-104', type: 'IN', projectId: '2', projectCode: 'PRJ-002', projectName: 'Skyline Commercial Hub', materialId: 'MAT-005', materialName: 'M25 Ready Mix Concrete', materialUnit: 'Cum', quantity: 420, date: '2026-10-19', vendorName: 'Shree Ram RMC Plant', rate: 4680, recordedBy: 'Priya Mehta (PM)', createdAt: '2026-10-19T15:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-105', type: 'IN', projectId: '2', projectCode: 'PRJ-002', projectName: 'Skyline Commercial Hub', materialId: 'MAT-007', materialName: 'Aggregate 20mm', materialUnit: 'Cum', quantity: 540, date: '2026-10-06', vendorName: 'Aravalli Aggregates', rate: 1180, recordedBy: 'Priya Mehta (PM)', createdAt: '2026-10-06T09:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-106', type: 'IN', projectId: '2', projectCode: 'PRJ-002', projectName: 'Skyline Commercial Hub', materialId: 'MAT-006', materialName: 'River Sand', materialUnit: 'Cum', quantity: 660, date: '2026-10-07', vendorName: 'Yamuna Sand Suppliers', rate: 1480, recordedBy: 'Priya Mehta (PM)', createdAt: '2026-10-07T09:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-107', type: 'IN', projectId: '2', projectCode: 'PRJ-002', projectName: 'Skyline Commercial Hub', materialId: 'MAT-009', materialName: 'AAC Block 200mm', materialUnit: 'Nos', quantity: 18500, date: '2026-10-24', vendorName: 'UltraTech Blocks', rate: 68, recordedBy: 'Priya Mehta (PM)', createdAt: '2026-10-24T12:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-117', type: 'IN', projectId: '2', projectCode: 'PRJ-002', projectName: 'Skyline Commercial Hub', materialId: 'MAT-010', materialName: 'Binding Wire', materialUnit: 'Kg', quantity: 90, date: '2026-10-20', rate: 85, recordedBy: 'Priya Mehta (PM)', createdAt: '2026-10-20T10:00:00Z', voided: false },
  // Skyline Commercial Hub — Stock OUT
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-108', type: 'OUT', projectId: '2', projectCode: 'PRJ-002', projectName: 'Skyline Commercial Hub', materialId: 'MAT-001', materialName: 'OPC 53 Grade Cement', materialUnit: 'Bag', quantity: 4350, date: '2026-10-28', reason: 'USED', recordedBy: 'Priya Mehta (PM)', createdAt: '2026-10-28T18:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-109', type: 'OUT', projectId: '2', projectCode: 'PRJ-002', projectName: 'Skyline Commercial Hub', materialId: 'MAT-001', materialName: 'OPC 53 Grade Cement', materialUnit: 'Bag', quantity: 1980, date: '2026-11-06', reason: 'USED', recordedBy: 'Priya Mehta (PM)', createdAt: '2026-11-06T18:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-110', type: 'OUT', projectId: '2', projectCode: 'PRJ-002', projectName: 'Skyline Commercial Hub', materialId: 'MAT-001', materialName: 'OPC 53 Grade Cement', materialUnit: 'Bag', quantity: 140, date: '2026-11-07', reason: 'DAMAGED', notes: 'Hardened lumps found in 140 bags from last consignment', recordedBy: 'Priya Mehta (PM)', createdAt: '2026-11-07T09:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-111', type: 'OUT', projectId: '2', projectCode: 'PRJ-002', projectName: 'Skyline Commercial Hub', materialId: 'MAT-003', materialName: 'TMT Rebar Fe 550D 12mm', materialUnit: 'Tonne', quantity: 44.5, date: '2026-10-30', reason: 'USED', recordedBy: 'Priya Mehta (PM)', createdAt: '2026-10-30T18:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-112', type: 'OUT', projectId: '2', projectCode: 'PRJ-002', projectName: 'Skyline Commercial Hub', materialId: 'MAT-005', materialName: 'M25 Ready Mix Concrete', materialUnit: 'Cum', quantity: 402, date: '2026-10-19', reason: 'USED', recordedBy: 'Priya Mehta (PM)', createdAt: '2026-10-19T19:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-113', type: 'OUT', projectId: '2', projectCode: 'PRJ-002', projectName: 'Skyline Commercial Hub', materialId: 'MAT-007', materialName: 'Aggregate 20mm', materialUnit: 'Cum', quantity: 470, date: '2026-10-27', reason: 'USED', recordedBy: 'Priya Mehta (PM)', createdAt: '2026-10-27T18:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-114', type: 'OUT', projectId: '2', projectCode: 'PRJ-002', projectName: 'Skyline Commercial Hub', materialId: 'MAT-007', materialName: 'Aggregate 20mm', materialUnit: 'Cum', quantity: 46, date: '2026-10-28', reason: 'LOST', notes: 'Stock count shortfall at basement storage bay', recordedBy: 'Priya Mehta (PM)', createdAt: '2026-10-28T18:10:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-115', type: 'OUT', projectId: '2', projectCode: 'PRJ-002', projectName: 'Skyline Commercial Hub', materialId: 'MAT-006', materialName: 'River Sand', materialUnit: 'Cum', quantity: 528, date: '2026-10-29', reason: 'USED', recordedBy: 'Priya Mehta (PM)', createdAt: '2026-10-29T18:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-116', type: 'OUT', projectId: '2', projectCode: 'PRJ-002', projectName: 'Skyline Commercial Hub', materialId: 'MAT-009', materialName: 'AAC Block 200mm', materialUnit: 'Nos', quantity: 9200, date: '2026-11-03', reason: 'USED', recordedBy: 'Priya Mehta (PM)', createdAt: '2026-11-03T18:00:00Z', voided: false },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: 'STK-118', type: 'OUT', projectId: '2', projectCode: 'PRJ-002', projectName: 'Skyline Commercial Hub', materialId: 'MAT-010', materialName: 'Binding Wire', materialUnit: 'Kg', quantity: 74, date: '2026-10-31', reason: 'USED', recordedBy: 'Priya Mehta (PM)', createdAt: '2026-10-31T18:00:00Z', voided: false },
// Continues the component or data expression so its related values and behavior stay grouped together.
]

// Defines getStoredStockTransactions so this module can perform its named task when needed.
export function getStoredStockTransactions(): StockTransaction[] {
  // Starts an error-handling region so failures can be caught and handled safely.
  try {
    // Stores the value in data so later lines can reuse this data or behavior for the current feature.
    const data = localStorage.getItem(STORAGE_KEY)
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!data) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTransactions))
      // Returns the result so the caller or React receives the value or interface this function provides.
      return initialTransactions
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Returns the result so the caller or React receives the value or interface this function provides.
    return JSON.parse(data) as StockTransaction[]
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } catch {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return initialTransactions
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines saveStoredStockTransactions so this module can perform its named task when needed.
export function saveStoredStockTransactions(transactions: StockTransaction[]): void {
  // Starts an error-handling region so failures can be caught and handled safely.
  try {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } catch (error) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    console.error('Failed to save stock transactions in localStorage', error)
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines activeTransactions so this module can perform its named task when needed.
function activeTransactions(transactions: StockTransaction[]): StockTransaction[] {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return transactions.filter((tx) => !tx.voided)
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getAvailableBalance so this module can perform its named task when needed.
export function getAvailableBalance(
  // Sets the transactions field so the surrounding object or component receives this setting.
  transactions: StockTransaction[],
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: string,
  // Sets the materialId field so the surrounding object or component receives this setting.
  materialId: string
// Continues the component or data expression so its related values and behavior stay grouped together.
): number {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return activeTransactions(transactions)
    // Keeps only items matching this condition so the result contains relevant data.
    .filter((tx) => tx.projectId === projectId && tx.materialId === materialId)
    // Continues the component or data expression so its related values and behavior stay grouped together.
    .reduce((balance, tx) => balance + (tx.type === 'IN' ? tx.quantity : -tx.quantity), 0)
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines addStockIn so this module can perform its named task when needed.
export function addStockIn(
  // Sets the data field so the surrounding object or component receives this setting.
  data: Omit<StockTransaction, 'id' | 'type' | 'voided' | 'createdAt' | 'recordedBy'> & { recordedBy?: string }
// Continues the component or data expression so its related values and behavior stay grouped together.
): StockTransaction {
  // Stores the value in transactions so later lines can reuse this data or behavior for the current feature.
  const transactions = getStoredStockTransactions()
  // Stores the value in transaction so later lines can reuse this data or behavior for the current feature.
  const transaction: StockTransaction = {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...data,
    // Sets the id field so the surrounding object or component receives this setting.
    id: `STK-${Date.now().toString().slice(-6)}`,
    // Sets the type field so the surrounding object or component receives this setting.
    type: 'IN',
    // Sets the voided field so the surrounding object or component receives this setting.
    voided: false,
    // Sets the recordedBy field so the surrounding object or component receives this setting.
    recordedBy: data.recordedBy || 'System',
    // Sets the createdAt field so the surrounding object or component receives this setting.
    createdAt: new Date().toISOString(),
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  saveStoredStockTransactions([transaction, ...transactions])
  // Returns the result so the caller or React receives the value or interface this function provides.
  return transaction
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines addStockOut so this module can perform its named task when needed.
export function addStockOut(
  // Sets the data field so the surrounding object or component receives this setting.
  data: Omit<StockTransaction, 'id' | 'type' | 'voided' | 'createdAt' | 'recordedBy'> & {
    // Sets the reason field so the surrounding object or component receives this setting.
    reason: StockOutReason
    // Continues the component or data expression so its related values and behavior stay grouped together.
    recordedBy?: string
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Continues the component or data expression so its related values and behavior stay grouped together.
): { ok: true; transaction: StockTransaction } | { ok: false; error: string } {
  // Stores the value in transactions so later lines can reuse this data or behavior for the current feature.
  const transactions = getStoredStockTransactions()
  // Stores the value in balance so later lines can reuse this data or behavior for the current feature.
  const balance = getAvailableBalance(transactions, data.projectId, data.materialId)

  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (data.quantity > balance) {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return {
      // Sets the ok field so the surrounding object or component receives this setting.
      ok: false,
      // Sets the error field so the surrounding object or component receives this setting.
      error: `Rejected: requested ${data.quantity} ${data.materialUnit} exceeds available balance of ${balance} ${data.materialUnit}.`,
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in transaction so later lines can reuse this data or behavior for the current feature.
  const transaction: StockTransaction = {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...data,
    // Sets the id field so the surrounding object or component receives this setting.
    id: `STK-${Date.now().toString().slice(-6)}`,
    // Sets the type field so the surrounding object or component receives this setting.
    type: 'OUT',
    // Sets the voided field so the surrounding object or component receives this setting.
    voided: false,
    // Sets the recordedBy field so the surrounding object or component receives this setting.
    recordedBy: data.recordedBy || 'System',
    // Sets the createdAt field so the surrounding object or component receives this setting.
    createdAt: new Date().toISOString(),
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  saveStoredStockTransactions([transaction, ...transactions])
  // Returns the result so the caller or React receives the value or interface this function provides.
  return { ok: true, transaction }
// Closes the current block or object so the grouped statements or settings end here.
}

// Stores the value in EDIT_WINDOW_MS so later lines can reuse this data or behavior for the current feature.
const EDIT_WINDOW_MS = 48 * 60 * 60 * 1000

// Defines voidStockTransaction so this module can perform its named task when needed.
export function voidStockTransaction(
  // Sets the id field so the surrounding object or component receives this setting.
  id: string,
  // Sets the reason field so the surrounding object or component receives this setting.
  reason: string,
  // Sets the allowOldEntries field so the surrounding object or component receives this setting.
  allowOldEntries: boolean
// Continues the component or data expression so its related values and behavior stay grouped together.
): { ok: true } | { ok: false; error: string } {
  // Stores the value in transactions so later lines can reuse this data or behavior for the current feature.
  const transactions = getStoredStockTransactions()
  // Stores the value in index so later lines can reuse this data or behavior for the current feature.
  const index = transactions.findIndex((tx) => tx.id === id)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (index === -1) return { ok: false, error: 'Transaction not found.' }

  // Stores the value in transaction so later lines can reuse this data or behavior for the current feature.
  const transaction = transactions[index]
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (transaction.voided) return { ok: false, error: 'Transaction is already void.' }

  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!allowOldEntries) {
    // Stores the value in age so later lines can reuse this data or behavior for the current feature.
    const age = Date.now() - new Date(transaction.createdAt).getTime()
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (age > EDIT_WINDOW_MS) {
      // Returns the result so the caller or React receives the value or interface this function provides.
      return { ok: false, error: 'PM entries can only be voided within 48 hours of creation. Ask an Admin to void this entry.' }
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (transaction.type === 'IN') {
    // Stores the value in balanceAfter so later lines can reuse this data or behavior for the current feature.
    const balanceAfter = getAvailableBalance(transactions, transaction.projectId, transaction.materialId) - transaction.quantity
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (balanceAfter < 0) {
      // Returns the result so the caller or React receives the value or interface this function provides.
      return { ok: false, error: 'Cannot void: stock has already been consumed. The balance would go negative.' }
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Continues the component or data expression so its related values and behavior stay grouped together.
  transactions[index] = { ...transaction, voided: true, voidReason: reason }
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  saveStoredStockTransactions(transactions)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return { ok: true }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines computeBalances so this module can perform its named task when needed.
export function computeBalances(projectId?: string): MaterialBalanceRow[] {
  // Stores the value in transactions so later lines can reuse this data or behavior for the current feature.
  const transactions = activeTransactions(getStoredStockTransactions()).filter(
    // Continues the component or data expression so its related values and behavior stay grouped together.
    (tx) => !projectId || tx.projectId === projectId
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
  // Stores the value in materials so later lines can reuse this data or behavior for the current feature.
  const materials = getStoredMaterials()
  // Stores the value in plans so later lines can reuse this data or behavior for the current feature.
  const plans = getStoredPlans().filter((p) => !projectId || p.projectId === projectId)

  // Stores the value in byMaterial so later lines can reuse this data or behavior for the current feature.
  const byMaterial = new Map<string, MaterialBalanceRow>()
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  for (const tx of transactions) {
    // Stores the value in row so later lines can reuse this data or behavior for the current feature.
    const row =
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      byMaterial.get(tx.materialId) ??
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ({
        // Sets the materialId field so the surrounding object or component receives this setting.
        materialId: tx.materialId,
        // Sets the materialName field so the surrounding object or component receives this setting.
        materialName: tx.materialName,
        // Sets the materialUnit field so the surrounding object or component receives this setting.
        materialUnit: tx.materialUnit,
        // Sets the totalIn field so the surrounding object or component receives this setting.
        totalIn: 0,
        // Sets the totalOut field so the surrounding object or component receives this setting.
        totalOut: 0,
        // Sets the balance field so the surrounding object or component receives this setting.
        balance: 0,
        // Sets the isLow field so the surrounding object or component receives this setting.
        isLow: false,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      } as MaterialBalanceRow)
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (tx.type === 'IN') row.totalIn += tx.quantity
    // Handles the alternative branch when the preceding condition was not met.
    else row.totalOut += tx.quantity
    // Continues the component or data expression so its related values and behavior stay grouped together.
    row.balance = row.totalIn - row.totalOut
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    byMaterial.set(tx.materialId, row)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  for (const plan of plans) {
    // Stores the value in material so later lines can reuse this data or behavior for the current feature.
    const material = materials.find((m) => m.id === plan.materialId)
    // Stores the value in row so later lines can reuse this data or behavior for the current feature.
    const row =
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      byMaterial.get(plan.materialId) ??
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ({
        // Sets the materialId field so the surrounding object or component receives this setting.
        materialId: plan.materialId,
        // Sets the materialName field so the surrounding object or component receives this setting.
        materialName: material?.name ?? plan.materialId,
        // Sets the materialUnit field so the surrounding object or component receives this setting.
        materialUnit: material?.unit ?? '',
        // Sets the totalIn field so the surrounding object or component receives this setting.
        totalIn: 0,
        // Sets the totalOut field so the surrounding object or component receives this setting.
        totalOut: 0,
        // Sets the balance field so the surrounding object or component receives this setting.
        balance: 0,
        // Sets the isLow field so the surrounding object or component receives this setting.
        isLow: false,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      } as MaterialBalanceRow)
    // Continues the component or data expression so its related values and behavior stay grouped together.
    row.plannedQty = plan.plannedQty
    // Continues the component or data expression so its related values and behavior stay grouped together.
    row.lowStockThreshold = plan.lowStockThreshold
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    byMaterial.set(plan.materialId, row)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in rows so later lines can reuse this data or behavior for the current feature.
  const rows = [...byMaterial.values()]
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  for (const row of rows) {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    row.isLow =
      // Continues the component or data expression so its related values and behavior stay grouped together.
      row.lowStockThreshold !== undefined &&
      // Continues the component or data expression so its related values and behavior stay grouped together.
      row.lowStockThreshold > 0 &&
      // Continues the component or data expression so its related values and behavior stay grouped together.
      row.balance <= row.lowStockThreshold
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Returns the result so the caller or React receives the value or interface this function provides.
  return rows.sort((a, b) => a.materialName.localeCompare(b.materialName))
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines computeWastage so this module can perform its named task when needed.
export function computeWastage(projectId?: string): WastageRow[] {
  // Stores the value in transactions so later lines can reuse this data or behavior for the current feature.
  const transactions = activeTransactions(getStoredStockTransactions()).filter(
    // Continues the component or data expression so its related values and behavior stay grouped together.
    (tx) => !projectId || tx.projectId === projectId
  // Closes this function call or grouped expression so the surrounding code can continue.
  )
  // Stores the value in materials so later lines can reuse this data or behavior for the current feature.
  const materials = getStoredMaterials()
  // Stores the value in plans so later lines can reuse this data or behavior for the current feature.
  const plans = getStoredPlans().filter((p) => !projectId || p.projectId === projectId)

  // Stores the value in projectsSeen so later lines can reuse this data or behavior for the current feature.
  const projectsSeen = new Map<string, { code: string; name: string }>()
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  for (const tx of transactions) {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!projectsSeen.has(tx.projectId)) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      projectsSeen.set(tx.projectId, { code: tx.projectCode, name: tx.projectName })
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Continues the component or data expression so its related values and behavior stay grouped together.
  interface Accumulator {
    // Sets the consumed field so the surrounding object or component receives this setting.
    consumed: number
    // Sets the recordedWastage field so the surrounding object or component receives this setting.
    recordedWastage: number
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Stores the value in consumedByProjectMaterial so later lines can reuse this data or behavior for the current feature.
  const consumedByProjectMaterial = new Map<string, Accumulator>()
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  for (const tx of transactions) {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (tx.type !== 'OUT') continue
    // Stores the value in key so later lines can reuse this data or behavior for the current feature.
    const key = `${tx.projectId}::${tx.materialId}`
    // Stores the value in acc so later lines can reuse this data or behavior for the current feature.
    const acc =
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      consumedByProjectMaterial.get(key) ?? { consumed: 0, recordedWastage: 0 }
    // Continues the component or data expression so its related values and behavior stay grouped together.
    acc.consumed += tx.quantity
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (tx.reason === 'DAMAGED' || tx.reason === 'LOST') acc.recordedWastage += tx.quantity
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    consumedByProjectMaterial.set(key, acc)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in rows so later lines can reuse this data or behavior for the current feature.
  const rows: WastageRow[] = []

  // Stores the value in buildRow so later lines can reuse this data or behavior for the current feature.
  const buildRow = (
    // Sets the projectIdValue field so the surrounding object or component receives this setting.
    projectIdValue: string,
    // Sets the materialId field so the surrounding object or component receives this setting.
    materialId: string,
    // Sets the plan field so the surrounding object or component receives this setting.
    plan: (typeof plans)[number] | undefined,
    // Sets the acc field so the surrounding object or component receives this setting.
    acc: Accumulator | undefined
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ) => {
    // Stores the value in material so later lines can reuse this data or behavior for the current feature.
    const material = materials.find((m) => m.id === materialId)
    // Stores the value in meta so later lines can reuse this data or behavior for the current feature.
    const meta = projectsSeen.get(projectIdValue)
    // Stores the value in progressPercent so later lines can reuse this data or behavior for the current feature.
    const progressPercent = getProjectProgress(projectIdValue)
    // Stores the value in plannedQty so later lines can reuse this data or behavior for the current feature.
    const plannedQty = plan?.plannedQty ?? 0
    // Stores the value in plannedRate so later lines can reuse this data or behavior for the current feature.
    const plannedRate = plan?.plannedRate ?? material?.referenceRate
    // Stores the value in expectedToDate so later lines can reuse this data or behavior for the current feature.
    const expectedToDate = (plannedQty * progressPercent) / 100
    // Stores the value in consumed so later lines can reuse this data or behavior for the current feature.
    const consumed = acc?.consumed ?? 0
    // Stores the value in overrunQty so later lines can reuse this data or behavior for the current feature.
    const overrunQty = Math.max(0, consumed - expectedToDate)
    // Stores the value in overrunPercent so later lines can reuse this data or behavior for the current feature.
    const overrunPercent = expectedToDate > 0 ? (overrunQty / expectedToDate) * 100 : consumed > 0 ? 100 : 0
    // Stores the value in wastageThreshold so later lines can reuse this data or behavior for the current feature.
    const wastageThreshold = plan?.wastageThreshold ?? DEFAULT_WASTAGE_THRESHOLD

    // Stores the value in status so later lines can reuse this data or behavior for the current feature.
    let status: WastageStatus = 'OK'
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!plan) status = 'NO_BASELINE'
    // Handles the alternative branch when the preceding condition was not met.
    else if (overrunPercent >= wastageThreshold) status = 'OVERRUN'

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    rows.push({
      // Sets the projectId field so the surrounding object or component receives this setting.
      projectId: projectIdValue,
      // Sets the projectCode field so the surrounding object or component receives this setting.
      projectCode: meta?.code ?? '',
      // Sets the projectName field so the surrounding object or component receives this setting.
      projectName: meta?.name ?? '',
      // Continues the component or data expression so its related values and behavior stay grouped together.
      materialId,
      // Sets the materialName field so the surrounding object or component receives this setting.
      materialName: material?.name ?? materialId,
      // Sets the materialUnit field so the surrounding object or component receives this setting.
      materialUnit: material?.unit ?? '',
      // Continues the component or data expression so its related values and behavior stay grouped together.
      progressPercent,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      plannedQty,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      expectedToDate,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      consumed,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      overrunQty,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      overrunPercent,
      // Sets the recordedWastageQty field so the surrounding object or component receives this setting.
      recordedWastageQty: acc?.recordedWastage ?? 0,
      // Sets the estimatedLoss field so the surrounding object or component receives this setting.
      estimatedLoss: overrunQty > 0 && plannedRate ? overrunQty * plannedRate : 0,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      wastageThreshold,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      status,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Stores the value in seenPairs so later lines can reuse this data or behavior for the current feature.
  const seenPairs = new Set<string>()
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  for (const plan of plans) {
    // Stores the value in key so later lines can reuse this data or behavior for the current feature.
    const key = `${plan.projectId}::${plan.materialId}`
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    seenPairs.add(key)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    buildRow(plan.projectId, plan.materialId, plan, consumedByProjectMaterial.get(key))
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  for (const [key, acc] of consumedByProjectMaterial) {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (seenPairs.has(key)) continue
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    const [pid, mid] = key.split('::')
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    buildRow(pid, mid, undefined, acc)
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Returns the result so the caller or React receives the value or interface this function provides.
  return rows.sort((a, b) => b.estimatedLoss - a.estimatedLoss || b.overrunPercent - a.overrunPercent)
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines formatINR so this module can perform its named task when needed.
export function formatINR(value: number): string {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return new Intl.NumberFormat('en-IN', {
    // Sets the style field so the surrounding object or component receives this setting.
    style: 'currency',
    // Sets the currency field so the surrounding object or component receives this setting.
    currency: 'INR',
    // Sets the maximumFractionDigits field so the surrounding object or component receives this setting.
    maximumFractionDigits: 0,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }).format(value)
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines formatQty so this module can perform its named task when needed.
export function formatQty(value: number): string {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(value)
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines formatDate so this module can perform its named task when needed.
export function formatDate(value: string): string {
  // Stores the value in parsed so later lines can reuse this data or behavior for the current feature.
  const parsed = new Date(value)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (Number.isNaN(parsed.getTime())) return value
  // Returns the result so the caller or React receives the value or interface this function provides.
  return parsed.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines todayISO so this module can perform its named task when needed.
export function todayISO(): string {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return new Date().toISOString().slice(0, 10)
// Closes the current block or object so the grouped statements or settings end here.
}
