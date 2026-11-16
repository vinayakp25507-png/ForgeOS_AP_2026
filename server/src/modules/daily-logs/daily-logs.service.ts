// Imports AuditAction, Role, type Prisma from @prisma/client so this module can reuse that component, helper, or library.
import { AuditAction, Role, type Prisma } from '@prisma/client'
// Imports prisma from ../../utils/prisma.js so this module can reuse that component, helper, or library.
import { prisma } from '../../utils/prisma.js'
// Imports AppError from ../../utils/errors.js so this module can reuse that component, helper, or library.
import { AppError } from '../../utils/errors.js'
// Continues the component or data expression so its related values and behavior stay grouped together.
import type {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  DailyLogInput,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  DailyLogListQuery,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  DailyLogPatch,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from './daily-logs.validator.js'

// Continues the component or data expression so its related values and behavior stay grouped together.
type AuthUser = { id: number; role: Role }
// Continues the component or data expression so its related values and behavior stay grouped together.
type DailyLogWithEntries = Prisma.DailyLogGetPayload<{
  // Sets the include field so the surrounding object or component receives this setting.
  include: { labourEntries: true; machineryEntries: true }
// Continues the component or data expression so its related values and behavior stay grouped together.
}>
// Stores the value in EDIT_WINDOW_HOURS so later lines can reuse this data or behavior for the current feature.
const EDIT_WINDOW_HOURS = 48

// Defines dateAtUtcMidnight so this module can perform its named task when needed.
function dateAtUtcMidnight(value: string) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return new Date(`${value}T00:00:00.000Z`)
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines todayAtUtcMidnight so this module can perform its named task when needed.
function todayAtUtcMidnight() {
  // Stores the value in now so later lines can reuse this data or behavior for the current feature.
  const now = new Date()
  // Returns the result so the caller or React receives the value or interface this function provides.
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines assertProgressOrder so this module can perform its named task when needed.
function assertProgressOrder(
  // Sets the progress field so the surrounding object or component receives this setting.
  progress: number,
  // Sets the previous field so the surrounding object or component receives this setting.
  previous: { progressPercent: Prisma.Decimal } | null,
  // Sets the next field so the surrounding object or component receives this setting.
  next: { progressPercent: Prisma.Decimal } | null,
// Continues the component or data expression so its related values and behavior stay grouped together.
) {
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (previous && progress < previous.progressPercent.toNumber()) {
    // Stops the current operation with an error so the calling code can handle the failure.
    throw new AppError('BUSINESS_RULE_VIOLATION', 'Progress cannot decrease from the previous log.', 422)
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (next && progress > next.progressPercent.toNumber()) {
    // Stops the current operation with an error so the calling code can handle the failure.
    throw new AppError('BUSINESS_RULE_VIOLATION', 'Progress cannot exceed the following log.', 422)
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines assertProjectAccess so this module can perform its named task when needed.
async function assertProjectAccess(user: AuthUser, projectId: number) {
  // Stores the value in project so later lines can reuse this data or behavior for the current feature.
  const project = await prisma.project.findUnique({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { id: projectId },
    // Sets the select field so the surrounding object or component receives this setting.
    select: { id: true, status: true, assignedPmId: true },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!project) {
    // Stops the current operation with an error so the calling code can handle the failure.
    throw new AppError('NOT_FOUND', 'Project not found.', 404)
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (user.role !== Role.ADMIN && project.assignedPmId !== user.id) {
    // Stops the current operation with an error so the calling code can handle the failure.
    throw new AppError('FORBIDDEN', 'You are not assigned to this project.', 403)
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Returns the result so the caller or React receives the value or interface this function provides.
  return project
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines assertDateAvailable so this module can perform its named task when needed.
async function assertDateAvailable(projectId: number, logDate: Date, id?: number) {
  // Stores the value in existing so later lines can reuse this data or behavior for the current feature.
  const existing = await prisma.dailyLog.findUnique({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { projectId_logDate: { projectId, logDate } },
    // Sets the select field so the surrounding object or component receives this setting.
    select: { id: true },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (existing && existing.id !== id) {
    // Stops the current operation with an error so the calling code can handle the failure.
    throw new AppError('CONFLICT', 'A daily log already exists for this project and date.', 409)
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines assertLogAccess so this module can perform its named task when needed.
async function assertLogAccess(user: AuthUser, id: number) {
  // Stores the value in log so later lines can reuse this data or behavior for the current feature.
  const log = await prisma.dailyLog.findUnique({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { id },
    // Sets the include field so the surrounding object or component receives this setting.
    include: { labourEntries: true, machineryEntries: true },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!log) {
    // Stops the current operation with an error so the calling code can handle the failure.
    throw new AppError('NOT_FOUND', 'Daily log not found.', 404)
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await assertProjectAccess(user, log.projectId)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (user.role === Role.PM) {
    // Stores the value in ageHours so later lines can reuse this data or behavior for the current feature.
    const ageHours = (Date.now() - log.createdAt.getTime()) / 3_600_000
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (ageHours > EDIT_WINDOW_HOURS) {
      // Stops the current operation with an error so the calling code can handle the failure.
      throw new AppError('BUSINESS_RULE_VIOLATION', 'Project Managers can edit logs only within 48 hours of creation.', 422)
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Returns the result so the caller or React receives the value or interface this function provides.
  return log
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines auditSnapshot so this module can perform its named task when needed.
function auditSnapshot(log: DailyLogWithEntries): Prisma.InputJsonValue {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return {
    // Sets the id field so the surrounding object or component receives this setting.
    id: log.id,
    // Sets the projectId field so the surrounding object or component receives this setting.
    projectId: log.projectId,
    // Sets the logDate field so the surrounding object or component receives this setting.
    logDate: log.logDate.toISOString(),
    // Sets the progressPercent field so the surrounding object or component receives this setting.
    progressPercent: log.progressPercent.toString(),
    // Sets the workSummary field so the surrounding object or component receives this setting.
    workSummary: log.workSummary,
    // Sets the weather field so the surrounding object or component receives this setting.
    weather: log.weather,
    // Sets the issues field so the surrounding object or component receives this setting.
    issues: log.issues,
    // Sets the createdById field so the surrounding object or component receives this setting.
    createdById: log.createdById,
    // Sets the createdAt field so the surrounding object or component receives this setting.
    createdAt: log.createdAt.toISOString(),
    // Sets the updatedAt field so the surrounding object or component receives this setting.
    updatedAt: log.updatedAt.toISOString(),
    // Transforms each collection item so the corresponding values or interface elements can be produced.
    labourEntries: log.labourEntries.map((entry) => ({
      // Sets the id field so the surrounding object or component receives this setting.
      id: entry.id,
      // Sets the trade field so the surrounding object or component receives this setting.
      trade: entry.trade,
      // Sets the contractorName field so the surrounding object or component receives this setting.
      contractorName: entry.contractorName,
      // Sets the headCount field so the surrounding object or component receives this setting.
      headCount: entry.headCount,
      // Sets the hoursWorked field so the surrounding object or component receives this setting.
      hoursWorked: entry.hoursWorked.toString(),
      // Sets the remarks field so the surrounding object or component receives this setting.
      remarks: entry.remarks,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })),
    // Transforms each collection item so the corresponding values or interface elements can be produced.
    machineryEntries: log.machineryEntries.map((entry) => ({
      // Sets the id field so the surrounding object or component receives this setting.
      id: entry.id,
      // Sets the machineName field so the surrounding object or component receives this setting.
      machineName: entry.machineName,
      // Sets the operatorName field so the surrounding object or component receives this setting.
      operatorName: entry.operatorName,
      // Sets the hoursUsed field so the surrounding object or component receives this setting.
      hoursUsed: entry.hoursUsed.toString(),
      // Sets the fuelLitres field so the surrounding object or component receives this setting.
      fuelLitres: entry.fuelLitres?.toString() ?? null,
      // Sets the remarks field so the surrounding object or component receives this setting.
      remarks: entry.remarks,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })),
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines childCreateData so this module can perform its named task when needed.
function childCreateData(input: DailyLogInput | DailyLogPatch) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return {
    // Transforms each collection item so the corresponding values or interface elements can be produced.
    labour: input.labourEntries?.map((entry) => ({
      // Sets the trade field so the surrounding object or component receives this setting.
      trade: entry.trade,
      // Sets the contractorName field so the surrounding object or component receives this setting.
      contractorName: entry.contractorName,
      // Sets the headCount field so the surrounding object or component receives this setting.
      headCount: entry.headCount,
      // Sets the hoursWorked field so the surrounding object or component receives this setting.
      hoursWorked: entry.hoursWorked,
      // Sets the remarks field so the surrounding object or component receives this setting.
      remarks: entry.remarks,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })),
    // Transforms each collection item so the corresponding values or interface elements can be produced.
    machinery: input.machineryEntries?.map((entry) => ({
      // Sets the machineName field so the surrounding object or component receives this setting.
      machineName: entry.machineName,
      // Sets the operatorName field so the surrounding object or component receives this setting.
      operatorName: entry.operatorName,
      // Sets the hoursUsed field so the surrounding object or component receives this setting.
      hoursUsed: entry.hoursUsed,
      // Sets the fuelLitres field so the surrounding object or component receives this setting.
      fuelLitres: entry.fuelLitres,
      // Sets the remarks field so the surrounding object or component receives this setting.
      remarks: entry.remarks,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })),
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines listDailyLogs so this module can perform its named task when needed.
export async function listDailyLogs(
  // Sets the user field so the surrounding object or component receives this setting.
  user: AuthUser,
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: number,
  // Sets the query field so the surrounding object or component receives this setting.
  query: DailyLogListQuery,
// Continues the component or data expression so its related values and behavior stay grouped together.
) {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await assertProjectAccess(user, projectId)
  // Stores the value in where so later lines can reuse this data or behavior for the current feature.
  const where: Prisma.DailyLogWhereInput = {
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
  }
  // Waits for the asynchronous result before using it, so later work receives completed data.
  const [logs, total] = await prisma.$transaction([
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    prisma.dailyLog.findMany({
      // Continues the component or data expression so its related values and behavior stay grouped together.
      where,
      // Sets the orderBy field so the surrounding object or component receives this setting.
      orderBy: { logDate: 'desc' },
      // Sets the skip field so the surrounding object or component receives this setting.
      skip: (query.page - 1) * query.limit,
      // Sets the take field so the surrounding object or component receives this setting.
      take: query.limit,
      // Sets the include field so the surrounding object or component receives this setting.
      include: {
        // Sets the labourEntries field so the surrounding object or component receives this setting.
        labourEntries: { select: { headCount: true } },
        // Sets the machineryEntries field so the surrounding object or component receives this setting.
        machineryEntries: { select: { hoursUsed: true } },
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }),
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    prisma.dailyLog.count({ where }),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ])
  // Returns the result so the caller or React receives the value or interface this function provides.
  return {
    // Transforms each collection item so the corresponding values or interface elements can be produced.
    logs: logs.map((log) => ({
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ...log,
      // Sets the labourHeadCountTotal field so the surrounding object or component receives this setting.
      labourHeadCountTotal: log.labourEntries.reduce((total, entry) => total + entry.headCount, 0),
      // Sets the machineryHoursTotal field so the surrounding object or component receives this setting.
      machineryHoursTotal: log.machineryEntries.reduce((total, entry) => total + entry.hoursUsed.toNumber(), 0),
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

// Defines getDailyLog so this module can perform its named task when needed.
export async function getDailyLog(user: AuthUser, id: number) {
  // Stores the value in log so later lines can reuse this data or behavior for the current feature.
  const log = await prisma.dailyLog.findUnique({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { id },
    // Sets the include field so the surrounding object or component receives this setting.
    include: {
      // Sets the labourEntries field so the surrounding object or component receives this setting.
      labourEntries: true,
      // Sets the machineryEntries field so the surrounding object or component receives this setting.
      machineryEntries: true,
      // Sets the stockTransactions field so the surrounding object or component receives this setting.
      stockTransactions: true,
    // Closes the current block or object so the grouped statements or settings end here.
    },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!log) throw new AppError('NOT_FOUND', 'Daily log not found.', 404)
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await assertProjectAccess(user, log.projectId)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return log
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines createDailyLog so this module can perform its named task when needed.
export async function createDailyLog(user: AuthUser, projectId: number, input: DailyLogInput) {
  // Stores the value in project so later lines can reuse this data or behavior for the current feature.
  const project = await assertProjectAccess(user, projectId)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (project.status !== 'ACTIVE') {
    // Stops the current operation with an error so the calling code can handle the failure.
    throw new AppError('BUSINESS_RULE_VIOLATION', 'Daily logs can only be created for ACTIVE projects.', 422)
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Stores the value in logDate so later lines can reuse this data or behavior for the current feature.
  const logDate = dateAtUtcMidnight(input.logDate)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (logDate > todayAtUtcMidnight()) {
    // Stops the current operation with an error so the calling code can handle the failure.
    throw new AppError('BUSINESS_RULE_VIOLATION', 'Log date cannot be in the future.', 422)
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await assertDateAvailable(projectId, logDate)
  // Waits for the asynchronous result before using it, so later work receives completed data.
  const [previous, next] = await Promise.all([
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    prisma.dailyLog.findFirst({
      // Sets the where field so the surrounding object or component receives this setting.
      where: { projectId, logDate: { lt: logDate } },
      // Sets the orderBy field so the surrounding object or component receives this setting.
      orderBy: { logDate: 'desc' },
      // Sets the select field so the surrounding object or component receives this setting.
      select: { progressPercent: true },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }),
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    prisma.dailyLog.findFirst({
      // Sets the where field so the surrounding object or component receives this setting.
      where: { projectId, logDate: { gt: logDate } },
      // Sets the orderBy field so the surrounding object or component receives this setting.
      orderBy: { logDate: 'asc' },
      // Sets the select field so the surrounding object or component receives this setting.
      select: { progressPercent: true },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ])
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  assertProgressOrder(input.progressPercent, previous, next)
  // Stores the value in children so later lines can reuse this data or behavior for the current feature.
  const children = childCreateData(input)

  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.$transaction(async (tx) => {
    // Stores the value in created so later lines can reuse this data or behavior for the current feature.
    const created = await tx.dailyLog.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Continues the component or data expression so its related values and behavior stay grouped together.
        projectId,
        // Continues the component or data expression so its related values and behavior stay grouped together.
        logDate,
        // Sets the progressPercent field so the surrounding object or component receives this setting.
        progressPercent: input.progressPercent,
        // Sets the workSummary field so the surrounding object or component receives this setting.
        workSummary: input.workSummary,
        // Sets the weather field so the surrounding object or component receives this setting.
        weather: input.weather,
        // Sets the issues field so the surrounding object or component receives this setting.
        issues: input.issues,
        // Sets the createdById field so the surrounding object or component receives this setting.
        createdById: user.id,
        // Sets the labourEntries field so the surrounding object or component receives this setting.
        labourEntries: children.labour ? { create: children.labour } : undefined,
        // Sets the machineryEntries field so the surrounding object or component receives this setting.
        machineryEntries: children.machinery ? { create: children.machinery } : undefined,
      // Closes the current block or object so the grouped statements or settings end here.
      },
      // Sets the include field so the surrounding object or component receives this setting.
      include: { labourEntries: true, machineryEntries: true },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.auditLog.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Sets the userId field so the surrounding object or component receives this setting.
        userId: user.id,
        // Sets the action field so the surrounding object or component receives this setting.
        action: AuditAction.CREATE,
        // Sets the entityType field so the surrounding object or component receives this setting.
        entityType: 'DailyLog',
        // Sets the entityId field so the surrounding object or component receives this setting.
        entityId: created.id,
        // Sets the newValues field so the surrounding object or component receives this setting.
        newValues: auditSnapshot(created),
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Returns the result so the caller or React receives the value or interface this function provides.
    return created
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines updateDailyLog so this module can perform its named task when needed.
export async function updateDailyLog(user: AuthUser, id: number, input: DailyLogPatch) {
  // Stores the value in existing so later lines can reuse this data or behavior for the current feature.
  const existing = await assertLogAccess(user, id)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (input.logDate && dateAtUtcMidnight(input.logDate) > todayAtUtcMidnight()) {
    // Stops the current operation with an error so the calling code can handle the failure.
    throw new AppError('BUSINESS_RULE_VIOLATION', 'Log date cannot be in the future.', 422)
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Stores the value in nextDate so later lines can reuse this data or behavior for the current feature.
  const nextDate = input.logDate ? dateAtUtcMidnight(input.logDate) : existing.logDate
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await assertDateAvailable(existing.projectId, nextDate, id)
  // Stores the value in previous so later lines can reuse this data or behavior for the current feature.
  const previous = await prisma.dailyLog.findFirst({
    // Sets the where field so the surrounding object or component receives this setting.
    where: {
      // Sets the projectId field so the surrounding object or component receives this setting.
      projectId: existing.projectId,
      // Sets the id field so the surrounding object or component receives this setting.
      id: { not: id },
      // Sets the logDate field so the surrounding object or component receives this setting.
      logDate: { lt: nextDate },
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the orderBy field so the surrounding object or component receives this setting.
    orderBy: { logDate: 'desc' },
    // Sets the select field so the surrounding object or component receives this setting.
    select: { progressPercent: true },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Stores the value in next so later lines can reuse this data or behavior for the current feature.
  const next = await prisma.dailyLog.findFirst({
    // Sets the where field so the surrounding object or component receives this setting.
    where: {
      // Sets the projectId field so the surrounding object or component receives this setting.
      projectId: existing.projectId,
      // Sets the id field so the surrounding object or component receives this setting.
      id: { not: id },
      // Sets the logDate field so the surrounding object or component receives this setting.
      logDate: { gt: nextDate },
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the orderBy field so the surrounding object or component receives this setting.
    orderBy: { logDate: 'asc' },
    // Sets the select field so the surrounding object or component receives this setting.
    select: { progressPercent: true },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (input.progressPercent !== undefined) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    assertProgressOrder(input.progressPercent, previous, next)
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Stores the value in children so later lines can reuse this data or behavior for the current feature.
  const children = childCreateData(input)

  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.$transaction(async (tx) => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (input.labourEntries) {
      // Waits for the asynchronous result before using it, so later work receives completed data.
      await tx.labourEntry.deleteMany({ where: { dailyLogId: id } })
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (input.machineryEntries) {
      // Waits for the asynchronous result before using it, so later work receives completed data.
      await tx.machineryEntry.deleteMany({ where: { dailyLogId: id } })
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Stores the value in updated so later lines can reuse this data or behavior for the current feature.
    const updated = await tx.dailyLog.update({
      // Sets the where field so the surrounding object or component receives this setting.
      where: { id },
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ...(input.logDate ? { logDate: nextDate } : {}),
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ...(input.progressPercent !== undefined ? { progressPercent: input.progressPercent } : {}),
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ...(input.workSummary !== undefined ? { workSummary: input.workSummary } : {}),
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ...(input.weather !== undefined ? { weather: input.weather } : {}),
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ...(input.issues !== undefined ? { issues: input.issues } : {}),
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ...(children.labour ? { labourEntries: { create: children.labour } } : {}),
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ...(children.machinery ? { machineryEntries: { create: children.machinery } } : {}),
      // Closes the current block or object so the grouped statements or settings end here.
      },
      // Sets the include field so the surrounding object or component receives this setting.
      include: { labourEntries: true, machineryEntries: true },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.auditLog.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Sets the userId field so the surrounding object or component receives this setting.
        userId: user.id,
        // Sets the action field so the surrounding object or component receives this setting.
        action: AuditAction.UPDATE,
        // Sets the entityType field so the surrounding object or component receives this setting.
        entityType: 'DailyLog',
        // Sets the entityId field so the surrounding object or component receives this setting.
        entityId: updated.id,
        // Sets the oldValues field so the surrounding object or component receives this setting.
        oldValues: auditSnapshot(existing),
        // Sets the newValues field so the surrounding object or component receives this setting.
        newValues: auditSnapshot(updated),
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Returns the result so the caller or React receives the value or interface this function provides.
    return updated
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines deleteDailyLog so this module can perform its named task when needed.
export async function deleteDailyLog(user: AuthUser, id: number) {
  // Stores the value in existing so later lines can reuse this data or behavior for the current feature.
  const existing = await prisma.dailyLog.findUnique({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { id },
    // Sets the include field so the surrounding object or component receives this setting.
    include: { labourEntries: true, machineryEntries: true },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!existing) throw new AppError('NOT_FOUND', 'Daily log not found.', 404)
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await assertProjectAccess(user, existing.projectId)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (user.role !== Role.ADMIN) {
    // Stops the current operation with an error so the calling code can handle the failure.
    throw new AppError('FORBIDDEN', 'Only Administrators can delete daily logs.', 403)
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await prisma.$transaction(async (tx) => {
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.dailyLog.delete({ where: { id } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.auditLog.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Sets the userId field so the surrounding object or component receives this setting.
        userId: user.id,
        // Sets the action field so the surrounding object or component receives this setting.
        action: AuditAction.DELETE,
        // Sets the entityType field so the surrounding object or component receives this setting.
        entityType: 'DailyLog',
        // Sets the entityId field so the surrounding object or component receives this setting.
        entityId: id,
        // Sets the oldValues field so the surrounding object or component receives this setting.
        oldValues: auditSnapshot(existing),
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}
