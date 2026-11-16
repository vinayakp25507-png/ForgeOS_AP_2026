// Imports Prisma, type BillCategory, type BillStatus, type PaymentMode, type Role from @prisma/client so this module can reuse that component, helper, or library.
import { Prisma, type BillCategory, type BillStatus, type PaymentMode, type Role } from '@prisma/client'
// Imports prisma from ../../utils/prisma.js so this module can reuse that component, helper, or library.
import { prisma } from '../../utils/prisma.js'
// Imports AppError from ../../utils/errors.js so this module can reuse that component, helper, or library.
import { AppError } from '../../utils/errors.js'
// Imports projectAccess, type ProjectActor from ../projects/projects.service.js so this module can reuse that component, helper, or library.
import { projectAccess, type ProjectActor } from '../projects/projects.service.js'
// Imports type  BillListQuery, CreateBillInput, DateQuery, PaymentInput, UpdateBillInput from ./billing.validator.js so this module can reuse that component, helper, or library.
import type { BillListQuery, CreateBillInput, DateQuery, PaymentInput, UpdateBillInput } from './billing.validator.js'

// Continues the component or data expression so its related values and behavior stay grouped together.
type Actor = ProjectActor
// Stores the value in day so later lines can reuse this data or behavior for the current feature.
const day = (value: string) => new Date(`${value}T00:00:00.000Z`)
// Stores the value in today so later lines can reuse this data or behavior for the current feature.
const today = () => new Date(new Date().toISOString().slice(0, 10))
// Stores the value in n so later lines can reuse this data or behavior for the current feature.
const n = (value: Prisma.Decimal | number | null | undefined) => Number(value ?? 0)
// Stores the value in money so later lines can reuse this data or behavior for the current feature.
const money = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100

// Defines jsonSnapshot so this module can perform its named task when needed.
function jsonSnapshot(value: {
  // Sets the id field so the surrounding object or component receives this setting.
  id: number
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: number
  // Sets the vendorId field so the surrounding object or component receives this setting.
  vendorId: number
  // Sets the billNumber field so the surrounding object or component receives this setting.
  billNumber: string
  // Sets the billDate field so the surrounding object or component receives this setting.
  billDate: Date
  // Sets the dueDate field so the surrounding object or component receives this setting.
  dueDate: Date | null
  // Sets the category field so the surrounding object or component receives this setting.
  category: string
  // Sets the description field so the surrounding object or component receives this setting.
  description: string | null
  // Sets the baseAmount field so the surrounding object or component receives this setting.
  baseAmount: Prisma.Decimal
  // Sets the gstPercent field so the surrounding object or component receives this setting.
  gstPercent: Prisma.Decimal
  // Sets the gstAmount field so the surrounding object or component receives this setting.
  gstAmount: Prisma.Decimal
  // Sets the totalAmount field so the surrounding object or component receives this setting.
  totalAmount: Prisma.Decimal
  // Sets the status field so the surrounding object or component receives this setting.
  status: string
  // Sets the submittedById field so the surrounding object or component receives this setting.
  submittedById: number
  // Sets the approvedById field so the surrounding object or component receives this setting.
  approvedById: number | null
  // Sets the approvedAt field so the surrounding object or component receives this setting.
  approvedAt: Date | null
  // Sets the rejectionReason field so the surrounding object or component receives this setting.
  rejectionReason: string | null
// Continues the component or data expression so its related values and behavior stay grouped together.
}): Prisma.InputJsonValue {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return {
    // Sets the id field so the surrounding object or component receives this setting.
    id: value.id, projectId: value.projectId, vendorId: value.vendorId, billNumber: value.billNumber,
    // Sets the billDate field so the surrounding object or component receives this setting.
    billDate: value.billDate.toISOString().slice(0, 10), dueDate: value.dueDate?.toISOString().slice(0, 10) ?? null,
    // Sets the category field so the surrounding object or component receives this setting.
    category: value.category, description: value.description, baseAmount: value.baseAmount.toString(),
    // Sets the gstPercent field so the surrounding object or component receives this setting.
    gstPercent: value.gstPercent.toString(), gstAmount: value.gstAmount.toString(), totalAmount: value.totalAmount.toString(),
    // Sets the status field so the surrounding object or component receives this setting.
    status: value.status, submittedById: value.submittedById, approvedById: value.approvedById,
    // Sets the approvedAt field so the surrounding object or component receives this setting.
    approvedAt: value.approvedAt?.toISOString() ?? null, rejectionReason: value.rejectionReason,
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines assertProject so this module can perform its named task when needed.
async function assertProject(actor: Actor, projectId: number, allowCompleted = false) {
  // Stores the value in project so later lines can reuse this data or behavior for the current feature.
  const project = await prisma.project.findFirst({ where: { id: projectId, ...projectAccess(actor) }, select: { id: true, status: true } })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!project) throw new AppError('NOT_FOUND', 'Project not found.', 404)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!allowCompleted && project.status === 'COMPLETED') throw new AppError('BUSINESS_RULE_VIOLATION', 'Completed projects cannot receive new bills.', 422)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return project
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines getBill so this module can perform its named task when needed.
async function getBill(actor: Actor, id: number) {
  // Stores the value in bill so later lines can reuse this data or behavior for the current feature.
  const bill = await prisma.bill.findUnique({
    // Sets the where field so the surrounding object or component receives this setting.
    where: { id },
    // Sets the include field so the surrounding object or component receives this setting.
    include: {
      // Sets the vendor field so the surrounding object or component receives this setting.
      vendor: true,
      // Sets the project field so the surrounding object or component receives this setting.
      project: { select: { id: true, code: true, name: true, assignedPmId: true } },
      // Sets the submittedBy field so the surrounding object or component receives this setting.
      submittedBy: { select: { id: true, name: true, email: true } },
      // Sets the approvedBy field so the surrounding object or component receives this setting.
      approvedBy: { select: { id: true, name: true, email: true } },
      // Sets the payments field so the surrounding object or component receives this setting.
      payments: { include: { recordedBy: { select: { id: true, name: true } } }, orderBy: { paymentDate: 'asc' } },
    // Closes the current block or object so the grouped statements or settings end here.
    },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!bill || (actor.role === 'PM' && bill.project.assignedPmId !== actor.id)) throw new AppError('NOT_FOUND', 'Bill not found.', 404)
  // Stores the value in paidAmount so later lines can reuse this data or behavior for the current feature.
  const paidAmount = bill.payments.reduce((sum, payment) => sum + n(payment.amount), 0)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return { ...bill, paidAmount: money(paidAmount), outstandingAmount: money(n(bill.totalAmount) - paidAmount) }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines outputBill so this module can perform its named task when needed.
function outputBill<T extends { totalAmount: Prisma.Decimal; payments?: Array<{ amount: Prisma.Decimal }> }>(bill: T) {
  // Stores the value in paidAmount so later lines can reuse this data or behavior for the current feature.
  const paidAmount = bill.payments?.reduce((sum, payment) => sum + n(payment.amount), 0) ?? 0
  // Returns the result so the caller or React receives the value or interface this function provides.
  return { ...bill, paidAmount: money(paidAmount), outstandingAmount: money(n(bill.totalAmount) - paidAmount) }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines createBill so this module can perform its named task when needed.
export async function createBill(actor: Actor, input: CreateBillInput) {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await assertProject(actor, input.projectId)
  // Stores the value in vendor so later lines can reuse this data or behavior for the current feature.
  const vendor = await prisma.vendor.findUnique({ where: { id: input.vendorId }, select: { id: true, isActive: true } })
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!vendor || !vendor.isActive) throw new AppError('NOT_FOUND', 'Active vendor not found.', 404)
  // Stores the value in billDate so later lines can reuse this data or behavior for the current feature.
  const billDate = day(input.billDate)
  // Stores the value in dueDate so later lines can reuse this data or behavior for the current feature.
  const dueDate = input.dueDate ? day(input.dueDate) : null
  // Stores the value in gstAmount so later lines can reuse this data or behavior for the current feature.
  const gstAmount = money(input.baseAmount * input.gstPercent / 100)
  // Stores the value in totalAmount so later lines can reuse this data or behavior for the current feature.
  const totalAmount = money(input.baseAmount + gstAmount)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.$transaction(async (tx) => {
    // Stores the value in bill so later lines can reuse this data or behavior for the current feature.
    const bill = await tx.bill.create({
      // Sets the data field so the surrounding object or component receives this setting.
      data: {
        // Sets the projectId field so the surrounding object or component receives this setting.
        projectId: input.projectId, vendorId: input.vendorId, billNumber: input.billNumber,
        // Continues the component or data expression so its related values and behavior stay grouped together.
        billDate, dueDate, category: input.category as BillCategory, description: input.description ?? null,
        // Sets the baseAmount field so the surrounding object or component receives this setting.
        baseAmount: input.baseAmount, gstPercent: input.gstPercent, gstAmount, totalAmount, submittedById: actor.id,
      // Closes the current block or object so the grouped statements or settings end here.
      },
      // Sets the include field so the surrounding object or component receives this setting.
      include: { payments: true },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.auditLog.create({ data: { userId: actor.id, action: 'CREATE', entityType: 'Bill', entityId: bill.id, newValues: jsonSnapshot(bill) } })
    // Returns the result so the caller or React receives the value or interface this function provides.
    return outputBill(bill)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines listBills so this module can perform its named task when needed.
export async function listBills(actor: Actor, query: BillListQuery) {
  // Stores the value in statuses so later lines can reuse this data or behavior for the current feature.
  const statuses = query.status?.split(',').filter(Boolean) as BillStatus[] | undefined
  // Stores the value in where so later lines can reuse this data or behavior for the current feature.
  const where: Prisma.BillWhereInput = {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(query.projectId ? { projectId: query.projectId } : {}),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(query.vendorId ? { vendorId: query.vendorId } : {}),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(statuses?.length ? { status: { in: statuses } } : {}),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(query.category ? { category: query.category } : {}),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(query.from || query.to ? { billDate: { ...(query.from ? { gte: day(query.from) } : {}), ...(query.to ? { lte: day(query.to) } : {}) } } : {}),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(query.search ? { OR: [
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { billNumber: { contains: query.search, mode: 'insensitive' } },
      // Continues the component or data expression so its related values and behavior stay grouped together.
      { vendor: { name: { contains: query.search, mode: 'insensitive' } } },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ] } : {}),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(actor.role === 'PM' ? { project: { assignedPmId: actor.id } } : {}),
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (query.overdue) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    where.dueDate = { lt: today() }
    // Continues the component or data expression so its related values and behavior stay grouped together.
    where.status = { in: ['APPROVED', 'PARTIALLY_PAID'] }
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Waits for the asynchronous result before using it, so later work receives completed data.
  const [bills, total] = await prisma.$transaction([
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    prisma.bill.findMany({
      // Continues the component or data expression so its related values and behavior stay grouped together.
      where, orderBy: [{ billDate: 'desc' }, { id: 'desc' }],
      // Sets the skip field so the surrounding object or component receives this setting.
      skip: (query.page - 1) * query.pageSize, take: query.pageSize,
      // Sets the include field so the surrounding object or component receives this setting.
      include: { vendor: true, project: { select: { id: true, code: true, name: true } }, payments: true },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    }),
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    prisma.bill.count({ where }),
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ])
  // Stores the value in rows so later lines can reuse this data or behavior for the current feature.
  const rows = bills.map(outputBill)
  // Stores the value in totals so later lines can reuse this data or behavior for the current feature.
  const totals = rows.reduce((acc, bill) => ({
    // Sets the totalAmount field so the surrounding object or component receives this setting.
    totalAmount: acc.totalAmount + n(bill.totalAmount),
    // Sets the paidAmount field so the surrounding object or component receives this setting.
    paidAmount: acc.paidAmount + bill.paidAmount,
    // Sets the outstandingAmount field so the surrounding object or component receives this setting.
    outstandingAmount: acc.outstandingAmount + bill.outstandingAmount,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }), { totalAmount: 0, paidAmount: 0, outstandingAmount: 0 })
  // Returns the result so the caller or React receives the value or interface this function provides.
  return { bills: rows, meta: { page: query.page, pageSize: query.pageSize, total, totalPages: Math.ceil(total / query.pageSize), totals: { totalAmount: money(totals.totalAmount), paidAmount: money(totals.paidAmount), outstandingAmount: money(totals.outstandingAmount) } } }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines detail so this module can perform its named task when needed.
export async function detail(actor: Actor, id: number) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return getBill(actor, id)
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines updateBill so this module can perform its named task when needed.
export async function updateBill(actor: Actor, id: number, input: UpdateBillInput) {
  // Stores the value in existing so later lines can reuse this data or behavior for the current feature.
  const existing = await getBill(actor, id)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!['PENDING', 'REJECTED'].includes(existing.status)) throw new AppError('BUSINESS_RULE_VIOLATION', 'Only pending or rejected bills can be edited.', 422)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (actor.role === 'PM' && existing.submittedById !== actor.id) throw new AppError('NOT_FOUND', 'Bill not found.', 404)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (input.vendorId !== undefined) {
    // Stores the value in vendor so later lines can reuse this data or behavior for the current feature.
    const vendor = await prisma.vendor.findUnique({ where: { id: input.vendorId }, select: { id: true, isActive: true } })
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!vendor || !vendor.isActive) throw new AppError('NOT_FOUND', 'Active vendor not found.', 404)
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Stores the value in baseAmount so later lines can reuse this data or behavior for the current feature.
  const baseAmount = input.baseAmount ?? n(existing.baseAmount)
  // Stores the value in gstPercent so later lines can reuse this data or behavior for the current feature.
  const gstPercent = input.gstPercent ?? n(existing.gstPercent)
  // Stores the value in billDate so later lines can reuse this data or behavior for the current feature.
  const billDate = input.billDate === undefined ? existing.billDate : day(input.billDate)
  // Stores the value in dueDate so later lines can reuse this data or behavior for the current feature.
  const dueDate = input.dueDate === undefined ? existing.dueDate : input.dueDate ? day(input.dueDate) : null
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (dueDate && dueDate < billDate) {
    // Stops the current operation with an error so the calling code can handle the failure.
    throw new AppError('VALIDATION_ERROR', 'Due date must be on or after bill date.', 400)
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Stores the value in data so later lines can reuse this data or behavior for the current feature.
  const data = {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(input.vendorId === undefined ? {} : { vendorId: input.vendorId }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(input.billNumber === undefined ? {} : { billNumber: input.billNumber }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(input.billDate === undefined ? {} : { billDate }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(input.dueDate === undefined ? {} : { dueDate }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(input.category === undefined ? {} : { category: input.category as BillCategory }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(input.description === undefined ? {} : { description: input.description }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(input.baseAmount === undefined ? {} : { baseAmount }),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(input.gstPercent === undefined ? {} : { gstPercent }),
    // Sets the gstAmount field so the surrounding object or component receives this setting.
    gstAmount: money(baseAmount * gstPercent / 100),
    // Sets the totalAmount field so the surrounding object or component receives this setting.
    totalAmount: money(baseAmount + money(baseAmount * gstPercent / 100)),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(existing.status === 'REJECTED' ? { status: 'PENDING' as const, rejectionReason: null } : {}),
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Stores the value in updated so later lines can reuse this data or behavior for the current feature.
  const updated = await prisma.$transaction(async (tx) => {
    // Stores the value in bill so later lines can reuse this data or behavior for the current feature.
    const bill = await tx.bill.update({ where: { id }, data, include: { payments: true } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.auditLog.create({ data: { userId: actor.id, action: 'UPDATE', entityType: 'Bill', entityId: id, oldValues: jsonSnapshot(existing), newValues: jsonSnapshot(bill) } })
    // Returns the result so the caller or React receives the value or interface this function provides.
    return bill
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
  // Returns the result so the caller or React receives the value or interface this function provides.
  return outputBill(updated)
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines deleteBill so this module can perform its named task when needed.
export async function deleteBill(actor: Actor, id: number) {
  // Stores the value in existing so later lines can reuse this data or behavior for the current feature.
  const existing = await getBill(actor, id)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (existing.status !== 'PENDING' || existing.payments.length > 0) throw new AppError('BUSINESS_RULE_VIOLATION', 'Only pending bills without payments can be deleted.', 422)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (actor.role === 'PM' && existing.submittedById !== actor.id) throw new AppError('NOT_FOUND', 'Bill not found.', 404)
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await prisma.$transaction(async (tx) => {
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.bill.delete({ where: { id } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.auditLog.create({ data: { userId: actor.id, action: 'DELETE', entityType: 'Bill', entityId: id, oldValues: jsonSnapshot(existing) } })
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines approveBill so this module can perform its named task when needed.
export async function approveBill(actor: Actor, id: number) {
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (actor.role !== 'ADMIN') throw new AppError('FORBIDDEN', 'Only administrators can approve bills.', 403)
  // Stores the value in existing so later lines can reuse this data or behavior for the current feature.
  const existing = await getBill(actor, id)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (existing.status !== 'PENDING') throw new AppError('BUSINESS_RULE_VIOLATION', 'Only pending bills can be approved.', 422)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.$transaction(async (tx) => {
    // Stores the value in bill so later lines can reuse this data or behavior for the current feature.
    const bill = await tx.bill.update({ where: { id }, data: { status: 'APPROVED', approvedById: actor.id, approvedAt: new Date() }, include: { payments: true } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.auditLog.create({ data: { userId: actor.id, action: 'APPROVE', entityType: 'Bill', entityId: id, oldValues: jsonSnapshot(existing), newValues: jsonSnapshot(bill) } })
    // Returns the result so the caller or React receives the value or interface this function provides.
    return outputBill(bill)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines rejectBill so this module can perform its named task when needed.
export async function rejectBill(actor: Actor, id: number, reason: string) {
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (actor.role !== 'ADMIN') throw new AppError('FORBIDDEN', 'Only administrators can reject bills.', 403)
  // Stores the value in existing so later lines can reuse this data or behavior for the current feature.
  const existing = await getBill(actor, id)
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (existing.status !== 'PENDING') throw new AppError('BUSINESS_RULE_VIOLATION', 'Only pending bills can be rejected.', 422)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.$transaction(async (tx) => {
    // Stores the value in bill so later lines can reuse this data or behavior for the current feature.
    const bill = await tx.bill.update({ where: { id }, data: { status: 'REJECTED', rejectionReason: reason }, include: { payments: true } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.auditLog.create({ data: { userId: actor.id, action: 'REJECT', entityType: 'Bill', entityId: id, oldValues: jsonSnapshot(existing), newValues: jsonSnapshot(bill) } })
    // Returns the result so the caller or React receives the value or interface this function provides.
    return outputBill(bill)
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines listPayments so this module can perform its named task when needed.
export async function listPayments(actor: Actor, id: number, query: DateQuery) {
  // Stores the value in bill so later lines can reuse this data or behavior for the current feature.
  const bill = await getBill(actor, id)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return bill.payments.filter((payment) => (!query.from || payment.paymentDate >= day(query.from)) && (!query.to || payment.paymentDate <= day(query.to)))
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines createPayment so this module can perform its named task when needed.
export async function createPayment(actor: Actor, id: number, input: PaymentInput) {
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (actor.role !== 'ADMIN') throw new AppError('FORBIDDEN', 'Only administrators can record payments.', 403)
  // Stores the value in existing so later lines can reuse this data or behavior for the current feature.
  const existing = await getBill(actor, id)
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.$transaction(async (tx) => {
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(${id}::int)`
    // Stores the value in current so later lines can reuse this data or behavior for the current feature.
    const current = await tx.bill.findUnique({ where: { id }, include: { payments: true } })
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!current || !['APPROVED', 'PARTIALLY_PAID'].includes(current.status)) {
      // Stops the current operation with an error so the calling code can handle the failure.
      throw new AppError('BUSINESS_RULE_VIOLATION', 'This bill is not payable.', 422)
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Stores the value in currentPaid so later lines can reuse this data or behavior for the current feature.
    const currentPaid = current.payments.reduce((sum, payment) => sum + n(payment.amount), 0)
    // Stores the value in outstanding so later lines can reuse this data or behavior for the current feature.
    const outstanding = money(n(current.totalAmount) - currentPaid)
    // Stores the value in paymentDate so later lines can reuse this data or behavior for the current feature.
    const paymentDate = day(input.paymentDate)
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (paymentDate > today() || paymentDate < current.billDate) {
      // Stops the current operation with an error so the calling code can handle the failure.
      throw new AppError('VALIDATION_ERROR', 'Payment date must be between bill date and today.', 422)
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (input.amount > outstanding) {
      // Stops the current operation with an error so the calling code can handle the failure.
      throw new AppError('BUSINESS_RULE_VIOLATION', 'Payment exceeds the outstanding balance.', 422, { outstanding, requested: input.amount })
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Stores the value in payment so later lines can reuse this data or behavior for the current feature.
    const payment = await tx.payment.create({ data: { billId: id, amount: input.amount, paymentDate, mode: input.mode as PaymentMode, referenceNumber: input.referenceNumber ?? null, remarks: input.remarks ?? null, recordedById: actor.id } })
    // Stores the value in paid so later lines can reuse this data or behavior for the current feature.
    const paid = currentPaid + input.amount
    // Stores the value in status so later lines can reuse this data or behavior for the current feature.
    const status = money(paid) === money(n(current.totalAmount)) ? 'PAID' : 'PARTIALLY_PAID'
    // Stores the value in bill so later lines can reuse this data or behavior for the current feature.
    const bill = await tx.bill.update({ where: { id }, data: { status }, include: { payments: true } })
    // Waits for the asynchronous result before using it, so later work receives completed data.
    await tx.auditLog.create({ data: { userId: actor.id, action: 'CREATE', entityType: 'Payment', entityId: payment.id, newValues: { billId: id, amount: input.amount, paymentDate: input.paymentDate, mode: input.mode, status } } })
    // Returns the result so the caller or React receives the value or interface this function provides.
    return { payment, bill: outputBill(bill) }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines projectExpenses so this module can perform its named task when needed.
export async function projectExpenses(actor: Actor, projectId: number, query: DateQuery) {
  // Waits for the asynchronous result before using it, so later work receives completed data.
  await assertProject(actor, projectId, true)
  // Stores the value in bills so later lines can reuse this data or behavior for the current feature.
  const bills = await prisma.bill.findMany({ where: { projectId, ...(query.from || query.to ? { billDate: { ...(query.from ? { gte: day(query.from) } : {}), ...(query.to ? { lte: day(query.to) } : {}) } } : {}) }, include: { payments: true, vendor: true }, orderBy: { billDate: 'desc' } })
  // Returns the result so the caller or React receives the value or interface this function provides.
  return bills.map(outputBill)
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines vendorOutstanding so this module can perform its named task when needed.
export async function vendorOutstanding(actor: Actor, query: DateQuery) {
  // Stores the value in where so later lines can reuse this data or behavior for the current feature.
  const where: Prisma.BillWhereInput = {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(query.from || query.to ? { billDate: { ...(query.from ? { gte: day(query.from) } : {}), ...(query.to ? { lte: day(query.to) } : {}) } } : {}),
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...(actor.role === 'PM' ? { project: { assignedPmId: actor.id } } : {}),
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Stores the value in bills so later lines can reuse this data or behavior for the current feature.
  const bills = await prisma.bill.findMany({ where, include: { vendor: true, payments: true } })
  // Stores the value in grouped so later lines can reuse this data or behavior for the current feature.
  const grouped = new Map<number, { vendorId: number; vendorName: string; totalAmount: number; paidAmount: number; outstandingAmount: number }>()
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  for (const bill of bills) {
    // Stores the value in row so later lines can reuse this data or behavior for the current feature.
    const row = grouped.get(bill.vendorId) ?? { vendorId: bill.vendorId, vendorName: bill.vendor.name, totalAmount: 0, paidAmount: 0, outstandingAmount: 0 }
    // Stores the value in item so later lines can reuse this data or behavior for the current feature.
    const item = outputBill(bill)
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    row.totalAmount += n(item.totalAmount); row.paidAmount += item.paidAmount; row.outstandingAmount += item.outstandingAmount
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    grouped.set(bill.vendorId, row)
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Returns the result so the caller or React receives the value or interface this function provides.
  return [...grouped.values()].map((row) => ({ ...row, totalAmount: money(row.totalAmount), paidAmount: money(row.paidAmount), outstandingAmount: money(row.outstandingAmount) }))
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines paymentHistory so this module can perform its named task when needed.
export async function paymentHistory(actor: Actor, query: DateQuery) {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return prisma.payment.findMany({
    // Sets the where field so the surrounding object or component receives this setting.
    where: {
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ...(query.from || query.to ? { paymentDate: { ...(query.from ? { gte: day(query.from) } : {}), ...(query.to ? { lte: day(query.to) } : {}) } } : {}),
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ...(actor.role === 'PM' ? { bill: { project: { assignedPmId: actor.id } } } : {}),
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the include field so the surrounding object or component receives this setting.
    include: { bill: { select: { id: true, billNumber: true, projectId: true, vendor: { select: { id: true, name: true } } } }, recordedBy: { select: { id: true, name: true } } },
    // Sets the orderBy field so the surrounding object or component receives this setting.
    orderBy: [{ paymentDate: 'desc' }, { id: 'desc' }],
  // Continues the component or data expression so its related values and behavior stay grouped together.
  })
// Closes the current block or object so the grouped statements or settings end here.
}
