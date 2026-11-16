// Imports type  Prisma, Role from @prisma/client so this module can reuse that component, helper, or library.
import type { Prisma, Role } from '@prisma/client'
// Imports prisma from ../../utils/prisma.js so this module can reuse that component, helper, or library.
import { prisma } from '../../utils/prisma.js'
// Imports AppError from ../../utils/errors.js so this module can reuse that component, helper, or library.
import { AppError } from '../../utils/errors.js'

// Continues the component or data expression so its related values and behavior stay grouped together.
export type ProjectActor = { id: number; role: Role }
// Continues the component or data expression so its related values and behavior stay grouped together.
type Actor = ProjectActor
// Continues the component or data expression so its related values and behavior stay grouped together.
type ProgressHistoryQuery = { from?: string; to?: string }
// Continues the component or data expression so its related values and behavior stay grouped together.
type ActivityQuery = { page: number; limit: number }
// Continues the component or data expression so its related values and behavior stay grouped together.
type DateRangeQuery = { from?: string; to?: string }

// Defines projectAccess so this module can perform its named task when needed.
export function projectAccess(actor: ProjectActor) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return actor.role === 'ADMIN' ? {} : { assignedPmId: actor.id }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines validateRelations so this module can perform its named task when needed.
async function validateRelations(input: { landId?: number; assignedPmId?: number | null }) {
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (input.landId !== undefined && !await prisma.land.findUnique({ where: { id: input.landId }, select: { id: true } })) {
    // Stops the current operation with an error so the calling code can handle the failure.
    throw new AppError('NOT_FOUND', 'Land not found.', 404)
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (input.assignedPmId !== undefined && input.assignedPmId !== null) {
    // Stores the value in user so later lines can reuse this data or behavior for the current feature.
    const user = await prisma.user.findUnique({ where: { id: input.assignedPmId }, select: { role: true, isActive: true } })
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!user || user.role !== 'PM' || !user.isActive) throw new AppError('VALIDATION_ERROR', 'assignedPmId must reference an active PM.', 400)
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines listProjects so this module can perform its named task when needed.
export async function listProjects(actor: Actor, page: number, pageSize: number, status?: string, search?: string) {
  // Stores the value in where so later lines can reuse this data or behavior for the current feature.
  const where = {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...projectAccess(actor),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(status ? { status: status as never } : {}),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(search ? { OR: [{ code: { contains: search, mode: 'insensitive' as const } }, { name: { contains: search, mode: 'insensitive' as const } }] } : {}),
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Waits for the asynchronous result before using it, so later work receives completed data.
  const [projects, total] = await prisma.$transaction([
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    prisma.project.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * pageSize, take: pageSize, include: { land: true, assignedPm: { select: { id: true, name: true, email: true } } } }),
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    prisma.project.count({ where }),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ])
  // Returns the result so the caller or React receives the value or interface this function provides.
  return { projects, meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) } }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getProject so this module can perform its named task when needed.
export async function getProject(actor: Actor, id: number) {
  // Stores the value in project so later lines can reuse this data or behavior for the current feature.
  const project = await prisma.project.findFirst({ where: { id, ...projectAccess(actor) }, include: { land: true, assignedPm: { select: { id: true, name: true, email: true } } } })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!project) throw new AppError('NOT_FOUND', 'Project not found.', 404)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return project
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines dateAtUtcMidnight so this module can perform its named task when needed.
function dateAtUtcMidnight(value: string) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return new Date(`${value}T00:00:00.000Z`)
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines logDateFilter so this module can perform its named task when needed.
function logDateFilter(query: DateRangeQuery) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return query.from || query.to
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ? {
        // Sets the logDate field so the surrounding object or component receives this setting.
        logDate: {
          // Continues the component or data expression so its related values and behavior stay grouped together.
          ...(query.from ? { gte: dateAtUtcMidnight(query.from) } : {}),
          // Continues the component or data expression so its related values and behavior stay grouped together.
          ...(query.to ? { lte: dateAtUtcMidnight(query.to) } : {}),
        // Closes the current block or object so the grouped statements or settings end here.
        },
      // Closes the current block or object so the grouped statements or settings end here.
      }
    // Continues the component or data expression so its related values and behavior stay grouped together.
    : {}
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getProjectLogsForReporting so this module can perform its named task when needed.
async function getProjectLogsForReporting(actor: Actor, projectId: number, query: DateRangeQuery) {
  // Stores the value in project so later lines can reuse this data or behavior for the current feature.
  const project = await prisma.project.findFirst({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { id: projectId, ...projectAccess(actor) },
    // Sets the select field so the surrounding object or component receives this setting.
    select: { id: true },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!project) throw new AppError('NOT_FOUND', 'Project not found.', 404)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.dailyLog.findMany({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { projectId, ...logDateFilter(query) },
    // Sets the orderBy field so the surrounding object or component receives this setting.
    orderBy: { logDate: 'asc' },
    // Sets the select field so the surrounding object or component receives this setting.
    select: {
      // Sets the id field so the surrounding object or component receives this setting.
      id: true,
      // Sets the logDate field so the surrounding object or component receives this setting.
      logDate: true,
      // Sets the labourEntries field so the surrounding object or component receives this setting.
      labourEntries: { select: { trade: true, headCount: true, hoursWorked: true } },
      // Sets the machineryEntries field so the surrounding object or component receives this setting.
      machineryEntries: { select: { machineName: true, operatorName: true, hoursUsed: true, fuelLitres: true } },
    // Closes the current block or object so the grouped statements or settings end here.
    },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Continues the component or data expression so its related values and behavior stay grouped together.
type LabourTotals = { workerCount: number; labourHours: number; entries: number }

// Defines aggregateLabour so this module can perform its named task when needed.
function aggregateLabour(logs: Awaited<ReturnType<typeof getProjectLogsForReporting>>) {
  // Stores the value in byTrade so later lines can reuse this data or behavior for the current feature.
  const byTrade = new Map<string, LabourTotals>()
  // Stores the value in totalWorkerCount so later lines can reuse this data or behavior for the current feature.
  let totalWorkerCount = 0
  // Stores the value in totalLabourHours so later lines can reuse this data or behavior for the current feature.
  let totalLabourHours = 0
  // Stores the value in totalLabourEntries so later lines can reuse this data or behavior for the current feature.
  let totalLabourEntries = 0
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  for (const log of logs) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    for (const entry of log.labourEntries) {
      // Stores the value in hours so later lines can reuse this data or behavior for the current feature.
      const hours = entry.hoursWorked.toNumber()
      // Continues the component or data expression so its related values and behavior stay grouped together.
      totalWorkerCount += entry.headCount
      // Continues the component or data expression so its related values and behavior stay grouped together.
      totalLabourHours += hours
      // Continues the component or data expression so its related values and behavior stay grouped together.
      totalLabourEntries += 1
      // Stores the value in current so later lines can reuse this data or behavior for the current feature.
      const current = byTrade.get(entry.trade) ?? { workerCount: 0, labourHours: 0, entries: 0 }
      // Continues the component or data expression so its related values and behavior stay grouped together.
      current.workerCount += entry.headCount
      // Continues the component or data expression so its related values and behavior stay grouped together.
      current.labourHours += hours
      // Continues the component or data expression so its related values and behavior stay grouped together.
      current.entries += 1
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      byTrade.set(entry.trade, current)
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Returns the result so the caller or React receives the value or interface this function provides.
  return {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    totalWorkerCount,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    totalLabourHours,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    totalLabourEntries,
    // Transforms each collection item so the corresponding values or interface elements can be produced.
    byTrade: [...byTrade.entries()].map(([trade, totals]) => ({ trade, ...totals })),
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Continues the component or data expression so its related values and behavior stay grouped together.
type MachineryTotals = { hoursUsed: number; fuelConsumption: number; entries: number }

// Defines aggregateMachinery so this module can perform its named task when needed.
function aggregateMachinery(logs: Awaited<ReturnType<typeof getProjectLogsForReporting>>) {
  // Stores the value in byMachine so later lines can reuse this data or behavior for the current feature.
  const byMachine = new Map<string, MachineryTotals>()
  // Stores the value in totalMachineryHours so later lines can reuse this data or behavior for the current feature.
  let totalMachineryHours = 0
  // Stores the value in totalFuelConsumption so later lines can reuse this data or behavior for the current feature.
  let totalFuelConsumption = 0
  // Stores the value in totalMachineryEntries so later lines can reuse this data or behavior for the current feature.
  let totalMachineryEntries = 0
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  for (const log of logs) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    for (const entry of log.machineryEntries) {
      // Stores the value in hours so later lines can reuse this data or behavior for the current feature.
      const hours = entry.hoursUsed.toNumber()
      // Stores the value in fuel so later lines can reuse this data or behavior for the current feature.
      const fuel = entry.fuelLitres?.toNumber() ?? 0
      // Continues the component or data expression so its related values and behavior stay grouped together.
      totalMachineryHours += hours
      // Continues the component or data expression so its related values and behavior stay grouped together.
      totalFuelConsumption += fuel
      // Continues the component or data expression so its related values and behavior stay grouped together.
      totalMachineryEntries += 1
      // Stores the value in current so later lines can reuse this data or behavior for the current feature.
      const current = byMachine.get(entry.machineName) ?? { hoursUsed: 0, fuelConsumption: 0, entries: 0 }
      // Continues the component or data expression so its related values and behavior stay grouped together.
      current.hoursUsed += hours
      // Continues the component or data expression so its related values and behavior stay grouped together.
      current.fuelConsumption += fuel
      // Continues the component or data expression so its related values and behavior stay grouped together.
      current.entries += 1
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      byMachine.set(entry.machineName, current)
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Returns the result so the caller or React receives the value or interface this function provides.
  return {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    totalMachineryHours,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    totalFuelConsumption,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    totalMachineryEntries,
    // Transforms each collection item so the corresponding values or interface elements can be produced.
    byMachine: [...byMachine.entries()].map(([machineName, totals]) => ({ machineName, ...totals })),
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getLabourSummary so this module can perform its named task when needed.
export async function getLabourSummary(actor: Actor, projectId: number, query: DateRangeQuery) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return aggregateLabour(await getProjectLogsForReporting(actor, projectId, query))
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getMachinerySummary so this module can perform its named task when needed.
export async function getMachinerySummary(actor: Actor, projectId: number, query: DateRangeQuery) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return aggregateMachinery(await getProjectLogsForReporting(actor, projectId, query))
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getWorkerCountHistory so this module can perform its named task when needed.
export async function getWorkerCountHistory(actor: Actor, projectId: number, query: DateRangeQuery) {
  // Stores the value in logs so later lines can reuse this data or behavior for the current feature.
  const logs = await getProjectLogsForReporting(actor, projectId, query)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return logs.map((log) => {
    // Stores the value in labour so later lines can reuse this data or behavior for the current feature.
    const labour = aggregateLabour([log])
    // Returns the result so the caller or React receives the value or interface this function provides.
    return {
      // Sets the dailyLogId field so the surrounding object or component receives this setting.
      dailyLogId: log.id,
      // Sets the logDate field so the surrounding object or component receives this setting.
      logDate: log.logDate,
      // Sets the totalWorkerCount field so the surrounding object or component receives this setting.
      totalWorkerCount: labour.totalWorkerCount,
      // Sets the labourHours field so the surrounding object or component receives this setting.
      labourHours: labour.totalLabourHours,
      // Sets the byTrade field so the surrounding object or component receives this setting.
      byTrade: labour.byTrade,
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getMachineryUsageHistory so this module can perform its named task when needed.
export async function getMachineryUsageHistory(actor: Actor, projectId: number, query: DateRangeQuery) {
  // Stores the value in logs so later lines can reuse this data or behavior for the current feature.
  const logs = await getProjectLogsForReporting(actor, projectId, query)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return logs.flatMap((log) => log.machineryEntries.map((entry) => ({
    // Sets the dailyLogId field so the surrounding object or component receives this setting.
    dailyLogId: log.id,
    // Sets the logDate field so the surrounding object or component receives this setting.
    logDate: log.logDate,
    // Sets the machineName field so the surrounding object or component receives this setting.
    machineName: entry.machineName,
    // Sets the hoursUsed field so the surrounding object or component receives this setting.
    hoursUsed: entry.hoursUsed.toNumber(),
    // Sets the fuelConsumption field so the surrounding object or component receives this setting.
    fuelConsumption: entry.fuelLitres?.toNumber() ?? 0,
    // Sets the operatorName field so the surrounding object or component receives this setting.
    operatorName: entry.operatorName,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })))
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getProjectProgressHistory so this module can perform its named task when needed.
export async function getProjectProgressHistory(actor: Actor, projectId: number, query: ProgressHistoryQuery) {
  // Stores the value in project so later lines can reuse this data or behavior for the current feature.
  const project = await prisma.project.findFirst({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { id: projectId, ...projectAccess(actor) },
    // Sets the select field so the surrounding object or component receives this setting.
    select: { id: true },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!project) throw new AppError('NOT_FOUND', 'Project not found.', 404)

  // Stores the value in logs so later lines can reuse this data or behavior for the current feature.
  const logs = await prisma.dailyLog.findMany({
    // Sets the where field so the surrounding object or component receives this setting.
    where: {
      // Continues the component or data expression so its related values and behavior stay grouped together.
      projectId,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ...(query.from || query.to ? {
        // Sets the logDate field so the surrounding object or component receives this setting.
        logDate: {
          // Continues the component or data expression so its related values and behavior stay grouped together.
          ...(query.from ? { gte: dateAtUtcMidnight(query.from) } : {}),
          // Continues the component or data expression so its related values and behavior stay grouped together.
          ...(query.to ? { lte: dateAtUtcMidnight(query.to) } : {}),
        // Closes the current block or object so the grouped statements or settings end here.
        },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      } : {}),
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the orderBy field so the surrounding object or component receives this setting.
    orderBy: { logDate: 'asc' },
    // Sets the select field so the surrounding object or component receives this setting.
    select: {
      // Sets the id field so the surrounding object or component receives this setting.
      id: true,
      // Sets the logDate field so the surrounding object or component receives this setting.
      logDate: true,
      // Sets the progressPercent field so the surrounding object or component receives this setting.
      progressPercent: true,
      // Sets the workSummary field so the surrounding object or component receives this setting.
      workSummary: true,
      // Sets the createdBy field so the surrounding object or component receives this setting.
      createdBy: { select: { id: true, name: true, email: true, role: true } },
      // Sets the createdAt field so the surrounding object or component receives this setting.
      createdAt: true,
      // Sets the updatedAt field so the surrounding object or component receives this setting.
      updatedAt: true,
    // Closes the current block or object so the grouped statements or settings end here.
    },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })

  // Returns the result so the caller or React receives the value or interface this function provides.
  return logs.map((log) => ({
    // Sets the id field so the surrounding object or component receives this setting.
    id: log.id,
    // Sets the logDate field so the surrounding object or component receives this setting.
    logDate: log.logDate,
    // Sets the progressPercent field so the surrounding object or component receives this setting.
    progressPercent: log.progressPercent,
    // Sets the workSummary field so the surrounding object or component receives this setting.
    workSummary: log.workSummary,
    // Sets the createdBy field so the surrounding object or component receives this setting.
    createdBy: log.createdBy,
    // Sets the createdAt field so the surrounding object or component receives this setting.
    createdAt: log.createdAt,
    // Sets the updatedAt field so the surrounding object or component receives this setting.
    updatedAt: log.updatedAt,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }))
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getProjectSummary so this module can perform its named task when needed.
export async function getProjectSummary(actor: Actor, projectId: number) {
  // Stores the value in project so later lines can reuse this data or behavior for the current feature.
  const project = await prisma.project.findFirst({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { id: projectId, ...projectAccess(actor) },
    // Sets the include field so the surrounding object or component receives this setting.
    include: {
      // Sets the land field so the surrounding object or component receives this setting.
      land: true,
      // Sets the assignedPm field so the surrounding object or component receives this setting.
      assignedPm: { select: { id: true, name: true, email: true } },
    // Closes the current block or object so the grouped statements or settings end here.
    },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!project) throw new AppError('NOT_FOUND', 'Project not found.', 404)

  // Stores the value in logs so later lines can reuse this data or behavior for the current feature.
  const logs = await prisma.dailyLog.findMany({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { projectId },
    // Sets the orderBy field so the surrounding object or component receives this setting.
    orderBy: { logDate: 'desc' },
    // Sets the select field so the surrounding object or component receives this setting.
    select: {
      // Sets the id field so the surrounding object or component receives this setting.
      id: true,
      // Sets the logDate field so the surrounding object or component receives this setting.
      logDate: true,
      // Sets the progressPercent field so the surrounding object or component receives this setting.
      progressPercent: true,
      // Sets the labourEntries field so the surrounding object or component receives this setting.
      labourEntries: { select: { headCount: true, hoursWorked: true } },
      // Sets the machineryEntries field so the surrounding object or component receives this setting.
      machineryEntries: { select: { hoursUsed: true, fuelLitres: true } },
    // Closes the current block or object so the grouped statements or settings end here.
    },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Stores the value in latest so later lines can reuse this data or behavior for the current feature.
  const latest = logs[0]
  // Returns the result so the caller or React receives the value or interface this function provides.
  return {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    project,
    // Sets the latestProgressPercent field so the surrounding object or component receives this setting.
    latestProgressPercent: latest?.progressPercent ?? 0,
    // Sets the latestLogDate field so the surrounding object or component receives this setting.
    latestLogDate: latest?.logDate ?? null,
    // Sets the totalDailyLogs field so the surrounding object or component receives this setting.
    totalDailyLogs: logs.length,
    // Sets the totalLabourHeadCount field so the surrounding object or component receives this setting.
    totalLabourHeadCount: logs.reduce(
      // Continues the component or data expression so its related values and behavior stay grouped together.
      (total, log) => total + log.labourEntries.reduce((sum, entry) => sum + entry.headCount, 0),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      0,
    // Closes this function call or grouped expression so the surrounding code can continue.
    ),
    // Sets the totalLabourHours field so the surrounding object or component receives this setting.
    totalLabourHours: logs.reduce(
      // Continues the component or data expression so its related values and behavior stay grouped together.
      (total, log) => total + log.labourEntries.reduce((sum, entry) => sum + entry.hoursWorked.toNumber(), 0),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      0,
    // Closes this function call or grouped expression so the surrounding code can continue.
    ),
    // Sets the totalMachineryHours field so the surrounding object or component receives this setting.
    totalMachineryHours: logs.reduce(
      // Continues the component or data expression so its related values and behavior stay grouped together.
      (total, log) => total + log.machineryEntries.reduce((sum, entry) => sum + entry.hoursUsed.toNumber(), 0),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      0,
    // Closes this function call or grouped expression so the surrounding code can continue.
    ),
    // Sets the totalMachineryFuel field so the surrounding object or component receives this setting.
    totalMachineryFuel: logs.reduce(
      // Continues the component or data expression so its related values and behavior stay grouped together.
      (total, log) => total + log.machineryEntries.reduce((sum, entry) => sum + (entry.fuelLitres?.toNumber() ?? 0), 0),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      0,
    // Closes this function call or grouped expression so the surrounding code can continue.
    ),
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getProjectActivity so this module can perform its named task when needed.
export async function getProjectActivity(actor: Actor, projectId: number, query: ActivityQuery) {
  // Stores the value in project so later lines can reuse this data or behavior for the current feature.
  const project = await prisma.project.findFirst({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { id: projectId, ...projectAccess(actor) },
    // Sets the select field so the surrounding object or component receives this setting.
    select: { id: true },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!project) throw new AppError('NOT_FOUND', 'Project not found.', 404)

  // Stores the value in scope so later lines can reuse this data or behavior for the current feature.
  const scope: Prisma.AuditLogWhereInput = {
    // Sets the OR field so the surrounding object or component receives this setting.
    OR: [
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { entityType: 'Project', entityId: projectId },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { oldValues: { path: ['projectId'], equals: projectId } },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { newValues: { path: ['projectId'], equals: projectId } },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Waits for the asynchronous result before using it, so later work receives completed data.
  const [activities, total] = await prisma.$transaction([
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    prisma.auditLog.findMany({
      // Sets the where field so the surrounding object or component receives this setting.
      where: scope,
      // Sets the orderBy field so the surrounding object or component receives this setting.
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      // Sets the skip field so the surrounding object or component receives this setting.
      skip: (query.page - 1) * query.limit,
      // Sets the take field so the surrounding object or component receives this setting.
      take: query.limit,
      // Sets the select field so the surrounding object or component receives this setting.
      select: {
        // Sets the id field so the surrounding object or component receives this setting.
        id: true,
        // Sets the action field so the surrounding object or component receives this setting.
        action: true,
        // Sets the entityType field so the surrounding object or component receives this setting.
        entityType: true,
        // Sets the entityId field so the surrounding object or component receives this setting.
        entityId: true,
        // Sets the oldValues field so the surrounding object or component receives this setting.
        oldValues: true,
        // Sets the newValues field so the surrounding object or component receives this setting.
        newValues: true,
        // Sets the createdAt field so the surrounding object or component receives this setting.
        createdAt: true,
        // Sets the user field so the surrounding object or component receives this setting.
        user: { select: { id: true, name: true } },
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }),
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    prisma.auditLog.count({ where: scope }),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ])
  // Returns the result so the caller or React receives the value or interface this function provides.
  return {
    // Transforms each collection item so the corresponding values or interface elements can be produced.
    activities: activities.map((activity) => ({
      // Sets the id field so the surrounding object or component receives this setting.
      id: activity.id,
      // Sets the action field so the surrounding object or component receives this setting.
      action: activity.action,
      // Sets the entityType field so the surrounding object or component receives this setting.
      entityType: activity.entityType,
      // Sets the entityId field so the surrounding object or component receives this setting.
      entityId: activity.entityId,
      // Sets the userId field so the surrounding object or component receives this setting.
      userId: activity.user?.id ?? null,
      // Sets the userName field so the surrounding object or component receives this setting.
      userName: activity.user?.name ?? null,
      // Sets the oldData field so the surrounding object or component receives this setting.
      oldData: activity.oldValues,
      // Sets the newData field so the surrounding object or component receives this setting.
      newData: activity.newValues,
      // Sets the createdAt field so the surrounding object or component receives this setting.
      createdAt: activity.createdAt,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })),
    // Sets the meta field so the surrounding object or component receives this setting.
    meta: {
      // Sets the page field so the surrounding object or component receives this setting.
      page: query.page,
      // Sets the limit field so the surrounding object or component receives this setting.
      limit: query.limit,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      total,
      // Sets the totalPages field so the surrounding object or component receives this setting.
      totalPages: Math.ceil(total / query.limit),
    // Closes the current block or object so the grouped statements or settings end here.
    },
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines createProject so this module can perform its named task when needed.
export async function createProject(actor: Actor, input: Record<string, unknown>) {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await validateRelations(input as { landId: number; assignedPmId?: number | null })
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.project.create({ data: { ...input, createdById: actor.id } as never, include: { land: true } })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines updateProject so this module can perform its named task when needed.
export async function updateProject(actor: Actor, id: number, input: Record<string, unknown>) {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await getProject(actor, id)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (actor.role !== 'ADMIN') {
    // Stores the value in administrativeFields so later lines can reuse this data or behavior for the current feature.
    const administrativeFields = ['landId', 'assignedPmId', 'createdById', 'totalBudget', 'wastageThresholdPct', 'startDate', 'expectedEndDate', 'actualEndDate']
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (administrativeFields.some((field) => field in input)) {
      // Stops the current operation with an error so the calling code can handle the failure.
      throw new AppError('FORBIDDEN', 'Project assignment and administrative fields can only be changed by an administrator.', 403)
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Stores the value in data so later lines can reuse this data or behavior for the current feature.
  const data = actor.role === 'ADMIN' ? input : Object.fromEntries(Object.entries(input).filter(([key]) => ['name', 'description', 'status'].includes(key)))
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (actor.role === 'ADMIN') await validateRelations(input as { landId?: number; assignedPmId?: number | null })
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.project.update({ where: { id }, data: data as never, include: { land: true, assignedPm: { select: { id: true, name: true, email: true } } } })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines deleteProject so this module can perform its named task when needed.
export async function deleteProject(id: number) {
  // Stores the value in project so later lines can reuse this data or behavior for the current feature.
  const project = await prisma.project.findUnique({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { id },
    // Sets the select field so the surrounding object or component receives this setting.
    select: { id: true, _count: { select: { materialPlans: true, milestones: true, dailyLogs: true, stockTransactions: true, bills: true, notifications: true } } },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!project) throw new AppError('NOT_FOUND', 'Project not found.', 404)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (Object.values(project._count).some((count) => count > 0)) throw new AppError('BUSINESS_RULE_VIOLATION', 'Project cannot be deleted while dependent records exist.', 409)
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await prisma.project.delete({ where: { id } })
// Closes the current block or object so the grouped statements or settings end here.
}
