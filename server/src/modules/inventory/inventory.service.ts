// Imports Prisma, type Role from @prisma/client so this module can reuse that component, helper, or library.
import { Prisma, type Role } from '@prisma/client'
// Imports prisma from ../../utils/prisma.js so this module can reuse that component, helper, or library.
import { prisma } from '../../utils/prisma.js'
// Imports AppError from ../../utils/errors.js so this module can reuse that component, helper, or library.
import { AppError } from '../../utils/errors.js'
// Imports projectAccess from ../projects/projects.service.js so this module can reuse that component, helper, or library.
import { projectAccess } from '../projects/projects.service.js'
// Imports type  CreateTransactionInput, TransactionListQuery from ./inventory.validator.js so this module can reuse that component, helper, or library.
import type { CreateTransactionInput, TransactionListQuery } from './inventory.validator.js'

// Continues the component or data expression so its related values and behavior stay grouped together.
type Actor = { id: number; role: Role }
// Stores the value in dateAtUtcMidnight so later lines can reuse this data or behavior for the current feature.
const dateAtUtcMidnight = (value: string) => new Date(`${value}T00:00:00.000Z`)
// Stores the value in todayUtc so later lines can reuse this data or behavior for the current feature.
const todayUtc = () => new Date(new Date().toISOString().slice(0, 10))
// Stores the value in decimal so later lines can reuse this data or behavior for the current feature.
const decimal = (value: Prisma.Decimal | number | string | null | undefined) => Number(value ?? 0)

// Defines assertProject so this module can perform its named task when needed.
async function assertProject(actor: Actor, projectId: number, requireActive = false) {
  // Stores the value in project so later lines can reuse this data or behavior for the current feature.
  const project = await prisma.project.findFirst({ where: { id: projectId, ...projectAccess(actor) }, select: { id: true, status: true } })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!project) throw new AppError('NOT_FOUND', 'Project not found.', 404)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (requireActive && project.status !== 'ACTIVE') {
    // Stops the current operation with an error so the calling code can handle the failure.
    throw new AppError('BUSINESS_RULE_VIOLATION', 'Stock can only be posted to an active project.', 422)
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Returns the result so the caller or React receives the value or interface this function provides.
  return project
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines transactionSnapshot so this module can perform its named task when needed.
function transactionSnapshot(transaction: {
  // Sets the id field so the surrounding object or component receives this setting.
  id: number
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: number
  // Sets the materialId field so the surrounding object or component receives this setting.
  materialId: number
  // Sets the txnType field so the surrounding object or component receives this setting.
  txnType: string
  // Sets the quantity field so the surrounding object or component receives this setting.
  quantity: Prisma.Decimal
  // Sets the txnDate field so the surrounding object or component receives this setting.
  txnDate: Date
  // Sets the unitRate field so the surrounding object or component receives this setting.
  unitRate: Prisma.Decimal | null
  // Sets the outReason field so the surrounding object or component receives this setting.
  outReason: string | null
  // Sets the adjustmentDirection field so the surrounding object or component receives this setting.
  adjustmentDirection: string | null
  // Sets the dailyLogId field so the surrounding object or component receives this setting.
  dailyLogId: number | null
  // Sets the remarks field so the surrounding object or component receives this setting.
  remarks: string | null
// Continues the component or data expression so its related values and behavior stay grouped together.
}) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return {
    // Sets the id field so the surrounding object or component receives this setting.
    id: transaction.id,
    // Sets the projectId field so the surrounding object or component receives this setting.
    projectId: transaction.projectId,
    // Sets the materialId field so the surrounding object or component receives this setting.
    materialId: transaction.materialId,
    // Sets the txnType field so the surrounding object or component receives this setting.
    txnType: transaction.txnType,
    // Sets the quantity field so the surrounding object or component receives this setting.
    quantity: transaction.quantity.toString(),
    // Sets the txnDate field so the surrounding object or component receives this setting.
    txnDate: transaction.txnDate.toISOString().slice(0, 10),
    // Sets the unitRate field so the surrounding object or component receives this setting.
    unitRate: transaction.unitRate?.toString() ?? null,
    // Sets the outReason field so the surrounding object or component receives this setting.
    outReason: transaction.outReason,
    // Sets the adjustmentDirection field so the surrounding object or component receives this setting.
    adjustmentDirection: transaction.adjustmentDirection,
    // Sets the dailyLogId field so the surrounding object or component receives this setting.
    dailyLogId: transaction.dailyLogId,
    // Sets the remarks field so the surrounding object or component receives this setting.
    remarks: transaction.remarks,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } satisfies Prisma.InputJsonValue
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getBalance so this module can perform its named task when needed.
async function getBalance(tx: Prisma.TransactionClient, projectId: number, materialId: number, openingQuantity: Prisma.Decimal) {
  // Stores the value in rows so later lines can reuse this data or behavior for the current feature.
  const rows = await tx.stockTransaction.findMany({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { projectId, materialId, isVoided: false },
    // Sets the select field so the surrounding object or component receives this setting.
    select: { txnType: true, quantity: true, adjustmentDirection: true },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Returns the result so the caller or React receives the value or interface this function provides.
  return rows.reduce((balance, row) => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (row.txnType === 'IN' || (row.txnType === 'ADJUSTMENT' && row.adjustmentDirection === 'INCREASE')) return balance + decimal(row.quantity)
    // Returns the result so the caller or React receives the value or interface this function provides.
    return balance - decimal(row.quantity)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, decimal(openingQuantity))
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines listInventory so this module can perform its named task when needed.
export async function listInventory(actor: Actor, projectId: number) {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await assertProject(actor, projectId)
  // Stores the value in plans so later lines can reuse this data or behavior for the current feature.
  const plans = await prisma.projectMaterialPlan.findMany({ where: { projectId }, include: { material: true }, orderBy: { material: { name: 'asc' } } })
  // Stores the value in transactions so later lines can reuse this data or behavior for the current feature.
  const transactions = await prisma.stockTransaction.findMany({ where: { projectId, isVoided: false }, select: { materialId: true, txnType: true, quantity: true, adjustmentDirection: true } })
  // Returns the result so the caller or React receives the value or interface this function provides.
  return plans.map((plan) => {
    // Stores the value in materialTxns so later lines can reuse this data or behavior for the current feature.
    const materialTxns = transactions.filter((item) => item.materialId === plan.materialId)
    // Stores the value in totalIn so later lines can reuse this data or behavior for the current feature.
    const totalIn = materialTxns.filter((item) => item.txnType === 'IN').reduce((sum, item) => sum + decimal(item.quantity), 0)
    // Stores the value in totalOut so later lines can reuse this data or behavior for the current feature.
    const totalOut = materialTxns.filter((item) => item.txnType === 'OUT').reduce((sum, item) => sum + decimal(item.quantity), 0)
    // Stores the value in adjustmentsIn so later lines can reuse this data or behavior for the current feature.
    const adjustmentsIn = materialTxns.filter((item) => item.txnType === 'ADJUSTMENT' && item.adjustmentDirection === 'INCREASE').reduce((sum, item) => sum + decimal(item.quantity), 0)
    // Stores the value in adjustmentsOut so later lines can reuse this data or behavior for the current feature.
    const adjustmentsOut = materialTxns.filter((item) => item.txnType === 'ADJUSTMENT' && item.adjustmentDirection === 'DECREASE').reduce((sum, item) => sum + decimal(item.quantity), 0)
    // Stores the value in available so later lines can reuse this data or behavior for the current feature.
    const available = decimal(plan.openingQuantity) + totalIn - totalOut + adjustmentsIn - adjustmentsOut
    // Returns the result so the caller or React receives the value or interface this function provides.
    return {
      // Sets the materialId field so the surrounding object or component receives this setting.
      materialId: plan.materialId, materialName: plan.material.name, category: plan.material.category, unit: plan.material.unit,
      // Sets the openingStock field so the surrounding object or component receives this setting.
      openingStock: decimal(plan.openingQuantity), totalIn, totalOut, adjustmentIn: adjustmentsIn, adjustmentOut: adjustmentsOut,
      // Sets the availableStock field so the surrounding object or component receives this setting.
      availableStock: available, plannedQuantity: decimal(plan.plannedQuantity), lowStockThreshold: decimal(plan.lowStockThreshold),
      // Sets the isLowStock field so the surrounding object or component receives this setting.
      isLowStock: plan.lowStockThreshold !== null && available <= decimal(plan.lowStockThreshold),
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines createTransaction so this module can perform its named task when needed.
export async function createTransaction(actor: Actor, projectId: number, input: CreateTransactionInput) {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await assertProject(actor, projectId, true)
  // Stores the value in txnDate so later lines can reuse this data or behavior for the current feature.
  const txnDate = dateAtUtcMidnight(input.txnDate)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (txnDate > todayUtc()) throw new AppError('VALIDATION_ERROR', 'Transaction date cannot be in the future.', 422)

  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.$transaction(async (tx) => {
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(${projectId}::int, ${input.materialId}::int)`
    // Stores the value in plan so later lines can reuse this data or behavior for the current feature.
    const plan = await tx.projectMaterialPlan.findUnique({ where: { projectId_materialId: { projectId, materialId: input.materialId } }, include: { material: true } })
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!plan) throw new AppError('BUSINESS_RULE_VIOLATION', 'A project material plan is required before posting stock.', 422)
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!plan.material.isActive) throw new AppError('BUSINESS_RULE_VIOLATION', 'The material is inactive.', 422)
    // Stores the value in available so later lines can reuse this data or behavior for the current feature.
    const available = await getBalance(tx, projectId, input.materialId, plan.openingQuantity)
    // Stores the value in decreases so later lines can reuse this data or behavior for the current feature.
    const decreases = input.txnType === 'OUT' || (input.txnType === 'ADJUSTMENT' && input.adjustmentDirection === 'DECREASE')
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (decreases && input.quantity > available) {
      // Stops the current operation with an error so the calling code can handle the failure.
      throw new AppError('INSUFFICIENT_STOCK', 'Insufficient stock available.', 422, { available, requested: input.quantity })
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Stores the value in transaction so later lines can reuse this data or behavior for the current feature.
    const transaction = await tx.stockTransaction.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Continues the component or data expression so its related values and behavior stay grouped together.
        projectId, materialId: input.materialId, txnType: input.txnType,
        // Sets the quantity field so the surrounding object or component receives this setting.
        quantity: input.quantity, txnDate, unitRate: input.unitRate ?? null, vendorId: input.vendorId ?? null,
        // Sets the billId field so the surrounding object or component receives this setting.
        billId: input.billId ?? null, challanNumber: input.challanNumber ?? null, outReason: input.outReason ?? null,
        // Sets the adjustmentDirection field so the surrounding object or component receives this setting.
        adjustmentDirection: input.adjustmentDirection ?? null, dailyLogId: input.dailyLogId ?? null,
        // Sets the remarks field so the surrounding object or component receives this setting.
        remarks: input.remarks ?? null, createdById: actor.id,
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.auditLog.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: { userId: actor.id, action: 'CREATE', entityType: 'StockTransaction', entityId: transaction.id, newValues: transactionSnapshot(transaction) },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Returns the result so the caller or React receives the value or interface this function provides.
    return transaction
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines listTransactions so this module can perform its named task when needed.
export async function listTransactions(actor: Actor, projectId: number, query: TransactionListQuery) {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await assertProject(actor, projectId)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.stockTransaction.findMany({
    // Sets the where field so the surrounding object or component receives this setting.
    where: {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      projectId, ...(query.materialId ? { materialId: query.materialId } : {}),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ...(query.txnType ? { txnType: query.txnType } : {}), ...(query.includeVoided ? {} : { isVoided: false }),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ...(query.from || query.to ? { txnDate: { ...(query.from ? { gte: dateAtUtcMidnight(query.from) } : {}), ...(query.to ? { lte: dateAtUtcMidnight(query.to) } : {}) } } : {}),
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the include field so the surrounding object or component receives this setting.
    include: { material: { select: { name: true, unit: true } }, createdBy: { select: { id: true, name: true } } },
    // Sets the orderBy field so the surrounding object or component receives this setting.
    orderBy: [{ txnDate: 'desc' }, { id: 'desc' }],
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getSummary so this module can perform its named task when needed.
export async function getSummary(actor: Actor, projectId: number) {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await assertProject(actor, projectId)
  // Stores the value in plans so later lines can reuse this data or behavior for the current feature.
  const plans = await prisma.projectMaterialPlan.findMany({ where: { projectId }, include: { material: true } })
  // Stores the value in transactions so later lines can reuse this data or behavior for the current feature.
  const transactions = await prisma.stockTransaction.findMany({ where: { projectId, isVoided: false }, select: { materialId: true, txnType: true, quantity: true, adjustmentDirection: true } })
  // Returns the result so the caller or React receives the value or interface this function provides.
  return plans.map((plan) => {
    // Stores the value in rows so later lines can reuse this data or behavior for the current feature.
    const rows = transactions.filter((row) => row.materialId === plan.materialId)
    // Stores the value in totalIn so later lines can reuse this data or behavior for the current feature.
    const totalIn = rows.filter((row) => row.txnType === 'IN').reduce((sum, row) => sum + decimal(row.quantity), 0)
    // Stores the value in totalOut so later lines can reuse this data or behavior for the current feature.
    const totalOut = rows.filter((row) => row.txnType === 'OUT').reduce((sum, row) => sum + decimal(row.quantity), 0)
    // Stores the value in adjustmentIn so later lines can reuse this data or behavior for the current feature.
    const adjustmentIn = rows.filter((row) => row.txnType === 'ADJUSTMENT' && row.adjustmentDirection === 'INCREASE').reduce((sum, row) => sum + decimal(row.quantity), 0)
    // Stores the value in adjustmentOut so later lines can reuse this data or behavior for the current feature.
    const adjustmentOut = rows.filter((row) => row.txnType === 'ADJUSTMENT' && row.adjustmentDirection === 'DECREASE').reduce((sum, row) => sum + decimal(row.quantity), 0)
    // Returns the result so the caller or React receives the value or interface this function provides.
    return { materialId: plan.materialId, materialName: plan.material.name, unit: plan.material.unit, openingStock: decimal(plan.openingQuantity), totalReceived: totalIn, totalConsumed: totalOut, adjustmentIn, adjustmentOut, availableStock: decimal(plan.openingQuantity) + totalIn - totalOut + adjustmentIn - adjustmentOut, transactionCount: rows.length }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getWastage so this module can perform its named task when needed.
export async function getWastage(actor: Actor, projectId: number) {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await assertProject(actor, projectId)
  // Waits for the asynchronous result before using it, so later work receives completed data.
  const [plans, latestLog, transactions] = await Promise.all([
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    prisma.projectMaterialPlan.findMany({ where: { projectId }, include: { material: true } }),
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    prisma.dailyLog.findFirst({ where: { projectId }, orderBy: { logDate: 'desc' }, select: { progressPercent: true } }),
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    prisma.stockTransaction.findMany({ where: { projectId, isVoided: false }, select: { materialId: true, txnType: true, quantity: true, outReason: true } }),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ])
  // Stores the value in progressPercent so later lines can reuse this data or behavior for the current feature.
  const progressPercent = decimal(latestLog?.progressPercent)
  // Stores the value in items so later lines can reuse this data or behavior for the current feature.
  const items = plans.map((plan) => {
    // Stores the value in rows so later lines can reuse this data or behavior for the current feature.
    const rows = transactions.filter((row) => row.materialId === plan.materialId && row.txnType === 'OUT')
    // Stores the value in consumed so later lines can reuse this data or behavior for the current feature.
    const consumed = rows.reduce((sum, row) => sum + decimal(row.quantity), 0)
    // Stores the value in recordedWastage so later lines can reuse this data or behavior for the current feature.
    const recordedWastage = rows.filter((row) => row.outReason === 'DAMAGED' || row.outReason === 'LOST').reduce((sum, row) => sum + decimal(row.quantity), 0)
    // Stores the value in expected so later lines can reuse this data or behavior for the current feature.
    const expected = decimal(plan.plannedQuantity) * progressPercent / 100
    // Stores the value in overrun so later lines can reuse this data or behavior for the current feature.
    const overrun = Math.max(consumed - expected, 0)
    // Stores the value in overrunPercent so later lines can reuse this data or behavior for the current feature.
    const overrunPercent = expected > 0 ? overrun / expected * 100 : 0
    // Stores the value in threshold so later lines can reuse this data or behavior for the current feature.
    const threshold = decimal(plan.wastageThresholdPct)
    // Stores the value in status so later lines can reuse this data or behavior for the current feature.
    const status = progressPercent === 0 && consumed > 0 ? 'NO_BASELINE' : overrunPercent > threshold ? 'OVERRUN' : 'OK'
    // Returns the result so the caller or React receives the value or interface this function provides.
    return { materialId: plan.materialId, materialName: plan.material.name, unit: plan.material.unit, plannedQuantity: decimal(plan.plannedQuantity), expectedQuantity: expected, consumedQuantity: consumed, overrunQuantity: overrun, overrunPercent, thresholdPercent: threshold, recordedWastageQuantity: recordedWastage, estimatedLoss: recordedWastage * decimal(plan.plannedUnitRate), status }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }).sort((a, b) => (a.status === b.status ? b.estimatedLoss - a.estimatedLoss : a.status === 'OVERRUN' ? -1 : b.status === 'OVERRUN' ? 1 : 0))
  // Returns the result so the caller or React receives the value or interface this function provides.
  return { progressPercent, items }
// Closes the current block or object so the grouped statements or settings end here.
}
