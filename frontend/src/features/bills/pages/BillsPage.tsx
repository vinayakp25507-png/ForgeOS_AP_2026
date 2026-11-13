<<<<<<< HEAD
import { useState, useMemo, useEffect } from 'react';
import {
  Plus,
  Search,
  XCircle,
  AlertTriangle,
  Building2,
  FileText,
  Eye,
  Check,
  X,
  Receipt,
} from 'lucide-react';
import { AppShell } from '../../app-shell/components/AppShell';
import { isAdmin, getCurrentUser, getCurrentRole } from '../../authentication/utils/permissions';
import {
  getStoredBills,
  approveBill,
  rejectBill,
  recordBillPayment,
  addBill,
} from '../data/billStore';
import type { Bill, BillCategory, PaymentMode } from '../types/bill';

const GST_RATES = [0, 5, 12, 18, 28] as const;

const CATEGORIES: BillCategory[] = ['MATERIAL', 'LABOUR', 'MACHINERY', 'SERVICES', 'OTHER'];

function formatINR(val: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function isBillOverdue(bill: Bill): boolean {
  if (!bill.dueDate) return false;
  if (bill.status !== 'APPROVED' && bill.status !== 'PARTIALLY_PAID') return false;
  const today = new Date().toISOString().split('T')[0];
  return bill.dueDate < today;
}

export function BillsPage({ openUpload = false }: { openUpload?: boolean }) {
  const [bills, setBills] = useState<Bill[]>(() => getStoredBills());
  const admin = isAdmin();
  const currentUser = getCurrentUser();

  // Filters state
  const [selectedProjectId, setSelectedProjectId] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [overdueOnly, setOverdueOnly] = useState<boolean>(false);

  // Modals state
  const [activeModal, setActiveModal] = useState<
    'VIEW' | 'APPROVE' | 'REJECT' | 'PAYMENT' | 'CREATE' | null
  >(null);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  // Reject Form
  const [rejectReason, setRejectReason] = useState('');
  const [rejectError, setRejectError] = useState('');

  // Payment Form
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('BANK_TRANSFER');
  const [paymentRef, setPaymentRef] = useState('');
  const [paymentDate, setPaymentDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [paymentRemarks, setPaymentRemarks] = useState('');
  const [paymentError, setPaymentError] = useState('');

  // Create/Upload Bill Form
  const [newProjectId, setNewProjectId] = useState('1');
  const [newVendorName, setNewVendorName] = useState('');
  const [newVendorGstin, setNewVendorGstin] = useState('');
  const [newBillNumber, setNewBillNumber] = useState('');
  const [newBillDate, setNewBillDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [newDueDate, setNewDueDate] = useState('');
  const [newCategory, setNewCategory] = useState<BillCategory>('MATERIAL');
  const [newBaseAmount, setNewBaseAmount] = useState<number>(0);
  const [newGstPercent, setNewGstPercent] = useState<number>(18);
  const [newDescription, setNewDescription] = useState('');
  const [newChallan, setNewChallan] = useState('');
  const [createError, setCreateError] = useState('');

  // Distinct projects list
  const projectList = useMemo(() => {
    const map = new Map<string, { id: string; code: string; name: string }>();
    bills.forEach((b) => {
      if (!map.has(b.projectId)) {
        map.set(b.projectId, { id: b.projectId, code: b.projectCode, name: b.projectName });
      }
    });
    return Array.from(map.values());
  }, [bills]);

  // Scoped bills: If user is PM, only show bills for their project or created by them
  const scopedBills = useMemo(() => {
    if (admin) return bills;
    const pmName = currentUser?.name?.toLowerCase().trim() ?? '';
    return bills.filter(
      (b) =>
        b.submittedBy.toLowerCase().includes(pmName) ||
        b.projectName.toLowerCase().includes(pmName)
    );
  }, [bills, admin, currentUser]);

  // Filtered bills
  const filteredBills = useMemo(() => {
    return scopedBills.filter((bill) => {
      if (selectedProjectId !== 'ALL' && bill.projectId !== selectedProjectId) return false;
      if (statusFilter !== 'ALL' && bill.status !== statusFilter) return false;
      if (categoryFilter !== 'ALL' && bill.category !== categoryFilter) return false;
      if (overdueOnly && !isBillOverdue(bill)) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesNo = bill.billNumber.toLowerCase().includes(q);
        const matchesVendor = bill.vendorName.toLowerCase().includes(q);
        const matchesProject = bill.projectName.toLowerCase().includes(q);
        const matchesChallan = bill.challanNumber?.toLowerCase().includes(q);
        if (!matchesNo && !matchesVendor && !matchesProject && !matchesChallan) return false;
      }
      return true;
    });
  }, [scopedBills, selectedProjectId, statusFilter, categoryFilter, overdueOnly, searchQuery]);

  // Overall Financial KPIs
  const kpis = useMemo(() => {
    let totalInvoiced = 0;
    let committed = 0;
    let totalPaid = 0;
    let totalOutstanding = 0;
    let pendingCount = 0;
    let pendingAmount = 0;
    let overdueCount = 0;
    let overdueAmount = 0;

    filteredBills.forEach((b) => {
      totalInvoiced += b.totalAmount;

      if (b.status === 'APPROVED' || b.status === 'PARTIALLY_PAID' || b.status === 'PAID') {
        committed += b.totalAmount;
      }
      totalPaid += b.paidAmount;
      totalOutstanding += b.outstandingAmount;

      if (b.status === 'PENDING') {
        pendingCount += 1;
        pendingAmount += b.totalAmount;
      }

      if (isBillOverdue(b)) {
        overdueCount += 1;
        overdueAmount += b.outstandingAmount;
      }
    });

    return {
      totalInvoiced,
      committed,
      totalPaid,
      totalOutstanding,
      pendingCount,
      pendingAmount,
      overdueCount,
      overdueAmount,
    };
  }, [filteredBills]);

  // Project-wise summary chips
  const projectSummaries = useMemo(() => {
    return projectList.map((p) => {
      const pBills = scopedBills.filter((b) => b.projectId === p.id);
      const totalAmount = pBills.reduce((acc, b) => acc + b.totalAmount, 0);
      const paid = pBills.reduce((acc, b) => acc + b.paidAmount, 0);
      const outstanding = pBills.reduce((acc, b) => acc + b.outstandingAmount, 0);
      const pendingApprovals = pBills.filter((b) => b.status === 'PENDING').length;
      return {
        ...p,
        count: pBills.length,
        totalAmount,
        paid,
        outstanding,
        pendingApprovals,
      };
    });
  }, [projectList, scopedBills]);

  // Action Handlers
  const handleOpenApprove = (bill: Bill) => {
    setSelectedBill(bill);
    setActiveModal('APPROVE');
  };

  const handleConfirmApprove = () => {
    if (!selectedBill) return;
    const adminName = currentUser?.name || 'Rakesh Verma (Admin)';
    approveBill(selectedBill.id, adminName);
    setBills(getStoredBills());
    setActiveModal(null);
    setSelectedBill(null);
  };

  const handleOpenReject = (bill: Bill) => {
    setSelectedBill(bill);
    setRejectReason('');
    setRejectError('');
    setActiveModal('REJECT');
  };

  const handleConfirmReject = () => {
    if (!selectedBill) return;
    if (rejectReason.trim().length < 5) {
      setRejectError('Please provide a specific rejection reason (min 5 characters).');
      return;
    }
    const adminName = currentUser?.name || 'Rakesh Verma (Admin)';
    rejectBill(selectedBill.id, adminName, rejectReason.trim());
    setBills(getStoredBills());
    setActiveModal(null);
    setSelectedBill(null);
  };

  const handleOpenPayment = (bill: Bill) => {
    setSelectedBill(bill);
    setPaymentAmount(bill.outstandingAmount);
    setPaymentMode('BANK_TRANSFER');
    setPaymentRef('');
    setPaymentRemarks('');
    setPaymentDate(new Date().toISOString().split('T')[0]);
    setPaymentError('');
    setActiveModal('PAYMENT');
  };

  const handleConfirmPayment = () => {
    if (!selectedBill) return;
    if (paymentAmount <= 0) {
      setPaymentError('Payment amount must be greater than zero.');
      return;
    }
    if (paymentAmount > selectedBill.outstandingAmount) {
      setPaymentError(`Amount cannot exceed outstanding balance of ${formatINR(selectedBill.outstandingAmount)}.`);
      return;
    }
    const adminName = currentUser?.name || 'Rakesh Verma (Admin)';
    recordBillPayment(selectedBill.id, {
      amount: paymentAmount,
      paymentDate,
      mode: paymentMode,
      referenceNumber: paymentRef.trim() || undefined,
      remarks: paymentRemarks.trim() || undefined,
      recordedBy: adminName,
    });
    setBills(getStoredBills());
    setActiveModal(null);
    setSelectedBill(null);
  };

  const handleOpenCreate = () => {
    setNewProjectId(projectList[0]?.id || '1');
    setNewVendorName('');
    setNewVendorGstin('');
    setNewBillNumber(`INV-${Date.now().toString().slice(-4)}`);
    setNewBillDate(new Date().toISOString().split('T')[0]);
    setNewDueDate('');
    setNewCategory('MATERIAL');
    setNewBaseAmount(0);
    setNewGstPercent(18);
    setNewDescription('');
    setNewChallan('');
    setCreateError('');
    setActiveModal('CREATE');
  };

  useEffect(() => {
    if (openUpload) {
      setActiveModal('CREATE');
    }
  }, [openUpload]);

  const handleConfirmCreate = () => {
    if (!newVendorName.trim()) {
      setCreateError('Vendor name is required.');
      return;
    }
    if (!newBillNumber.trim()) {
      setCreateError('Bill / Invoice number is required.');
      return;
    }
    if (newBaseAmount <= 0) {
      setCreateError('Base amount must be greater than zero.');
      return;
    }

    const matchedProject = projectList.find((p) => p.id === newProjectId) || {
      id: newProjectId,
      code: 'PRJ-NEW',
      name: 'Project Site',
    };

    const submitter = currentUser?.name
      ? `${currentUser.name} (${getCurrentRole() === 'Admin' ? 'Admin' : 'PM'})`
      : 'Site Manager';

    addBill({
      projectId: matchedProject.id,
      projectCode: matchedProject.code,
      projectName: matchedProject.name,
      vendorName: newVendorName.trim(),
      vendorGstin: newVendorGstin.trim() || undefined,
      billNumber: newBillNumber.trim(),
      billDate: newBillDate,
      dueDate: newDueDate || undefined,
      category: newCategory,
      baseAmount: newBaseAmount,
      gstPercent: newGstPercent,
      description: newDescription.trim() || undefined,
      challanNumber: newChallan.trim() || undefined,
      submittedBy: submitter,
      fileAttachmentName: `${newVendorName.replace(/\s+/g, '_')}_Challan.pdf`,
    });

    setBills(getStoredBills());
    setActiveModal(null);
  };

  return (
    <AppShell currentPath="/app/bills">
      <div className="mx-auto max-w-[1600px] space-y-6 p-5 sm:p-7 lg:p-8">
        {/* Page Header */}
        <div>
          <p className="text-sm text-[#8E827A]">Workspace / Bills & Invoices</p>
          <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#323232] sm:text-3xl">
                Project Billing & Invoices
              </h1>
              <p className="text-sm text-[#8E827A] mt-1 font-light">
                Centralized invoice audit, GST reconciliation, approval workflows, and payment records across all sites.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenCreate}
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-[#323232] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F7F3EE] hover:bg-[#1E1E1E] transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Upload / Submit Bill
              </button>
            </div>
          </div>
        </div>

        {/* Financial KPI Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E827A]">Total Invoiced</span>
            <p className="text-lg font-bold text-[#323232] mt-1">{formatINR(kpis.totalInvoiced)}</p>
            <span className="text-[10px] text-[#8E827A]">{filteredBills.length} Bills in scope</span>
          </div>

          <div className="rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E827A]">Committed</span>
            <p className="text-lg font-bold text-[#323232] mt-1">{formatINR(kpis.committed)}</p>
            <span className="text-[10px] text-emerald-600 font-medium">Approved & Paid</span>
          </div>

          <div className="rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E827A]">Total Paid</span>
            <p className="text-lg font-bold text-emerald-700 mt-1">{formatINR(kpis.totalPaid)}</p>
            <span className="text-[10px] text-[#8E827A]">Released to vendors</span>
          </div>

          <div className="rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E827A]">Outstanding</span>
            <p className="text-lg font-bold text-amber-700 mt-1">{formatINR(kpis.totalOutstanding)}</p>
            <span className="text-[10px] text-[#8E827A]">Remaining balance</span>
          </div>

          <div className="rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E827A]">Pending Approvals</span>
              {kpis.pendingCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              )}
            </div>
            <p className="text-lg font-bold text-[#323232] mt-1">{kpis.pendingCount} Bills</p>
            <span className="text-[10px] text-amber-700 font-medium">{formatINR(kpis.pendingAmount)} awaiting</span>
          </div>

          <div className={`rounded-2xl border p-4 ${kpis.overdueCount > 0 ? 'border-rose-300 bg-rose-50/50' : 'border-[#E8E0DA] bg-[#FBF9F7]'}`}>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-700">Overdue</span>
            <p className="text-lg font-bold text-rose-700 mt-1">{kpis.overdueCount} Bills</p>
            <span className="text-[10px] text-rose-600 font-medium">{formatINR(kpis.overdueAmount)} due</span>
          </div>
        </div>

        {/* Project-Wise Filter Bar */}
        <div className="rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#323232] flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#8E827A]" />
              Project-Wise View
            </span>
            <span className="text-xs text-[#8E827A] font-light">
              Select a project to audit site invoices
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedProjectId('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedProjectId === 'ALL'
                  ? 'bg-[#323232] text-[#F7F3EE] shadow-xs'
                  : 'bg-[#F2ECE6] text-[#595552] hover:bg-[#E8E0DA]'
              }`}
            >
              All Projects ({scopedBills.length})
            </button>

            {projectSummaries.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  selectedProjectId === p.id
                    ? 'bg-[#323232] text-[#F7F3EE] shadow-xs'
                    : 'bg-[#F2ECE6] text-[#595552] hover:bg-[#E8E0DA]'
                }`}
              >
                <span>{p.name}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${selectedProjectId === p.id ? 'bg-[#595552] text-white' : 'bg-[#E0D7D0] text-[#323232]'}`}>
                  {p.count}
                </span>
                {p.pendingApprovals > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title={`${p.pendingApprovals} pending approvals`} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E827A]" />
              <input
                type="text"
                placeholder="Search by Bill #, Vendor, or Challan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E8E0DA] bg-white text-xs text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E827A] hover:text-[#323232]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Overdue Toggle */}
            <button
              onClick={() => setOverdueOnly(!overdueOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
                overdueOnly
                  ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold'
                  : 'bg-white border-[#E8E0DA] text-[#595552] hover:bg-[#FBF9F7]'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Overdue Only</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#E8E0DA] bg-white text-xs text-[#323232] focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0) + cat.slice(1).toLowerCase()}
                </option>
              ))}
            </select>

            {/* Status Pills */}
            <div className="inline-flex p-1 rounded-xl bg-[#F2ECE6] border border-[#E8E0DA] text-xs">
              {(['ALL', 'PENDING', 'APPROVED', 'PARTIALLY_PAID', 'PAID', 'REJECTED'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    statusFilter === st
                      ? 'bg-white text-[#323232] font-bold shadow-xs'
                      : 'text-[#8E827A] hover:text-[#323232]'
                  }`}
                >
                  {st === 'ALL'
                    ? 'All'
                    : st === 'PENDING'
                    ? 'Pending'
                    : st === 'APPROVED'
                    ? 'Approved'
                    : st === 'PARTIALLY_PAID'
                    ? 'Part-Paid'
                    : st === 'PAID'
                    ? 'Paid'
                    : 'Rejected'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bills Table */}
        <div className="rounded-2xl border border-[#E8E0DA] bg-white overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FBF9F7] border-b border-[#E8E0DA] text-[#8E827A] font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Bill # / Date</th>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Vendor</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4 text-right">Amount (₹)</th>
                  <th className="py-3 px-4">Payment Progress</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E0DA]">
                {filteredBills.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-[#8E827A]">
                      <Receipt className="w-8 h-8 mx-auto text-[#C8BCB4] mb-2" />
                      <p className="font-medium text-sm text-[#323232]">No bills found</p>
                      <p className="text-xs text-[#8E827A] mt-1">Try clearing filters or search query.</p>
                    </td>
                  </tr>
                ) : (
                  filteredBills.map((bill) => {
                    const overdue = isBillOverdue(bill);
                    return (
                      <tr key={bill.id} className="hover:bg-[#FBF9F7]/70 transition-colors">
                        {/* Bill Number & Category */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#323232] flex items-center gap-1.5">
                            <span>{bill.billNumber}</span>
                          </div>
                          <div className="text-[11px] text-[#8E827A] flex items-center gap-2 mt-0.5">
                            <span>{formatDate(bill.billDate)}</span>
                            <span>•</span>
                            <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-[#F2ECE6] text-[#595552]">
                              {bill.category}
                            </span>
                          </div>
                        </td>

                        {/* Project */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-[#323232]">{bill.projectName}</div>
                          <div className="text-[10px] font-mono text-[#8E827A]">{bill.projectCode}</div>
                        </td>

                        {/* Vendor */}
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-[#323232]">{bill.vendorName}</div>
                          {bill.vendorGstin && (
                            <div className="text-[10px] font-mono text-[#8E827A]">GST: {bill.vendorGstin}</div>
                          )}
                          {bill.challanNumber && (
                            <div className="text-[10px] text-emerald-700 font-mono mt-0.5">Challan: {bill.challanNumber}</div>
                          )}
                        </td>

                        {/* Due Date */}
                        <td className="py-3.5 px-4">
                          <div className={`font-medium ${overdue ? 'text-rose-600 font-bold flex items-center gap-1' : 'text-[#595552]'}`}>
                            {overdue && <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                            <span>{formatDate(bill.dueDate || '')}</span>
                          </div>
                          {overdue && (
                            <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-1.5 rounded mt-0.5">
                              Overdue
                            </span>
                          )}
                        </td>

                        {/* Amount */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="font-bold text-[#323232]">{formatINR(bill.totalAmount)}</div>
                          <div className="text-[10px] text-[#8E827A]">
                            Base {formatINR(bill.baseAmount)} + {bill.gstPercent}% GST
                          </div>
                        </td>

                        {/* Payment Progress */}
                        <td className="py-3.5 px-4 min-w-[140px]">
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-emerald-700 font-medium">Paid: {formatINR(bill.paidAmount)}</span>
                            <span className="text-[#8E827A]">Bal: {formatINR(bill.outstandingAmount)}</span>
                          </div>
                          <div className="w-full bg-[#F2ECE6] rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-emerald-600 h-full rounded-full transition-all"
                              style={{
                                width: `${Math.min(100, (bill.paidAmount / bill.totalAmount) * 100)}%`,
                              }}
                            />
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              bill.status === 'PENDING'
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                : bill.status === 'APPROVED'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : bill.status === 'PARTIALLY_PAID'
                                ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                : bill.status === 'PAID'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : 'bg-rose-100 text-rose-800 border border-rose-200'
                            }`}
                          >
                            {bill.status.replace('_', ' ')}
                          </span>
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedBill(bill);
                                setActiveModal('VIEW');
                              }}
                              className="p-1.5 rounded-lg text-[#595552] hover:text-[#323232] hover:bg-[#F2ECE6] transition-colors"
                              title="View Invoice Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Admin-only Workflow Controls */}
                            {admin && bill.status === 'PENDING' && (
                              <>
                                <button
                                  onClick={() => handleOpenApprove(bill)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-semibold text-[11px] hover:bg-emerald-700 transition-colors shadow-xs"
                                  title="Approve Bill"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleOpenReject(bill)}
                                  className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 font-semibold text-[11px] hover:bg-rose-100 transition-colors"
                                  title="Reject Bill"
                                >
                                  Reject
                                </button>
                              </>
                            )}

                            {admin &&
                              (bill.status === 'APPROVED' || bill.status === 'PARTIALLY_PAID') && (
                                <button
                                  onClick={() => handleOpenPayment(bill)}
                                  className="px-2.5 py-1 rounded-lg bg-[#323232] text-[#F7F3EE] font-semibold text-[11px] hover:bg-[#1E1E1E] transition-colors shadow-xs"
                                  title="Record Payment"
                                >
                                  Pay
                                </button>
                              )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===================== MODALS ===================== */}

      {/* 1. VIEW BILL DETAILS MODAL */}
      {activeModal === 'VIEW' && selectedBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#323232]/40 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E0DA] max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E0DA]">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8E827A] font-semibold">
                  Invoice Overview
                </span>
                <h3 className="text-xl font-bold text-[#323232] mt-0.5">
                  {selectedBill.billNumber}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-full hover:bg-[#F2ECE6] text-[#8E827A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rejection Banner if rejected */}
            {selectedBill.status === 'REJECTED' && selectedBill.rejectionReason && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                <span className="font-bold flex items-center gap-1.5 mb-1">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  Bill Rejected by Admin
                </span>
                <p>{selectedBill.rejectionReason}</p>
                {selectedBill.approvedBy && (
                  <p className="text-[10px] text-rose-600/80 mt-1">
                    By {selectedBill.approvedBy} on {formatDate(selectedBill.approvedAt || '')}
                  </p>
                )}
              </div>
            )}

            {/* Grid Breakdown */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FBF9F7] border border-[#E8E0DA]">
                <span className="text-[#8E827A] font-medium block">Project</span>
                <span className="font-bold text-[#323232] text-sm mt-0.5 block">
                  {selectedBill.projectName}
                </span>
                <span className="text-[11px] font-mono text-[#8E827A]">{selectedBill.projectCode}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FBF9F7] border border-[#E8E0DA]">
                <span className="text-[#8E827A] font-medium block">Vendor</span>
                <span className="font-bold text-[#323232] text-sm mt-0.5 block">
                  {selectedBill.vendorName}
                </span>
                <span className="text-[11px] font-mono text-[#8E827A]">
                  GST: {selectedBill.vendorGstin || 'Not registered'}
                </span>
              </div>
            </div>

            {/* Amount details */}
            <div className="p-4 rounded-2xl bg-[#FBF9F7] border border-[#E8E0DA] space-y-2 text-xs">
              <div className="flex justify-between text-[#595552]">
                <span>Base Amount</span>
                <span className="font-semibold text-[#323232]">{formatINR(selectedBill.baseAmount)}</span>
              </div>
              <div className="flex justify-between text-[#595552]">
                <span>GST ({selectedBill.gstPercent}%)</span>
                <span className="font-semibold text-[#323232]">{formatINR(selectedBill.gstAmount)}</span>
              </div>
              <div className="pt-2 border-t border-[#E8E0DA] flex justify-between text-sm font-bold text-[#323232]">
                <span>Total Invoice Value</span>
                <span>{formatINR(selectedBill.totalAmount)}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold pt-1">
                <span>Total Amount Paid</span>
                <span>{formatINR(selectedBill.paidAmount)}</span>
              </div>
              <div className="flex justify-between text-amber-700 font-semibold">
                <span>Remaining Outstanding</span>
                <span>{formatINR(selectedBill.outstandingAmount)}</span>
              </div>
            </div>

            {/* Description & Challan */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-[#323232]">Description / Line Items</span>
              <p className="text-[#595552] p-3 rounded-xl bg-[#FBF9F7] border border-[#E8E0DA]">
                {selectedBill.description || 'No description provided.'}
              </p>
              {selectedBill.challanNumber && (
                <div className="flex items-center gap-2 text-[#595552] text-xs pt-1">
                  <FileText className="w-4 h-4 text-[#8E827A]" />
                  <span>Verified Delivery Challan: <strong>{selectedBill.challanNumber}</strong></span>
                </div>
              )}
            </div>

            {/* Payment History Log */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-[#323232] block">Payment History ({selectedBill.payments.length})</span>
              {selectedBill.payments.length === 0 ? (
                <p className="text-[#8E827A] italic">No payments recorded yet.</p>
              ) : (
                <div className="divide-y divide-[#E8E0DA] border border-[#E8E0DA] rounded-xl overflow-hidden">
                  {selectedBill.payments.map((pay) => (
                    <div key={pay.id} className="p-3 bg-white flex justify-between items-center text-xs">
                      <div>
                        <div className="font-bold text-emerald-800">{formatINR(pay.amount)}</div>
                        <div className="text-[10px] text-[#8E827A]">
                          {pay.mode} • Ref: {pay.referenceNumber || 'N/A'} • {formatDate(pay.paymentDate)}
                        </div>
                      </div>
                      <span className="text-[10px] text-[#8E827A]">Recorded by {pay.recordedBy}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t border-[#E8E0DA] gap-3">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 rounded-full border border-[#E8E0DA] text-xs font-semibold text-[#595552] hover:bg-[#F2ECE6]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. APPROVE MODAL */}
      {activeModal === 'APPROVE' && selectedBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#323232]/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E0DA] space-y-4">
            <div className="flex items-center gap-3 text-emerald-700">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold">
                <Check className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#323232]">Approve Invoice</h3>
                <span className="text-xs text-[#8E827A]">{selectedBill.billNumber}</span>
              </div>
            </div>

            <p className="text-xs text-[#595552] leading-relaxed">
              Are you sure you want to approve this invoice from <strong>{selectedBill.vendorName}</strong> for{' '}
              <strong>{formatINR(selectedBill.totalAmount)}</strong> on{' '}
              <strong>{selectedBill.projectName}</strong>?
            </p>
            <p className="text-[11px] text-[#8E827A]">
              Approving this bill will add it to the project's committed spend and allow payments to be released.
            </p>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#E8E0DA]">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-full border border-[#E8E0DA] text-xs font-semibold text-[#595552] hover:bg-[#F2ECE6]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmApprove}
                className="px-5 py-2 rounded-full bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-xs"
              >
                Confirm Approval
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. REJECT MODAL */}
      {activeModal === 'REJECT' && selectedBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#323232]/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E0DA] space-y-4">
            <div className="flex items-center gap-3 text-rose-700">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center font-bold">
                <X className="w-5 h-5 text-rose-700" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#323232]">Reject Invoice</h3>
                <span className="text-xs text-[#8E827A]">{selectedBill.billNumber}</span>
              </div>
            </div>

            <p className="text-xs text-[#595552]">
              Please state why this bill is being rejected. The submitting Project Manager will be notified with this reason.
            </p>

            <div>
              <label className="block text-xs font-semibold text-[#323232] mb-1">
                Rejection Reason *
              </label>
              <textarea
                rows={3}
                value={rejectReason}
                onChange={(e) => {
                  setRejectReason(e.target.value);
                  setRejectError('');
                }}
                placeholder="e.g. Quantity mismatch with site challan, wrong GSTIN, or unauthorized rate."
                className="w-full p-3 rounded-xl border border-[#E8E0DA] text-xs text-[#323232] focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              {rejectError && <p className="text-xs text-rose-600 mt-1">{rejectError}</p>}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#E8E0DA]">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-full border border-[#E8E0DA] text-xs font-semibold text-[#595552] hover:bg-[#F2ECE6]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-5 py-2 rounded-full bg-rose-700 text-white text-xs font-semibold hover:bg-rose-800 transition-colors shadow-xs"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. RECORD PAYMENT MODAL */}
      {activeModal === 'PAYMENT' && selectedBill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#323232]/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E0DA] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E0DA]">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8E827A] font-semibold">
                  Record Payout
                </span>
                <h3 className="font-bold text-base text-[#323232] mt-0.5">
                  {selectedBill.billNumber} — {selectedBill.vendorName}
                </h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-[#8E827A] hover:text-[#323232]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#FBF9F7] text-xs flex justify-between">
              <span className="text-[#8E827A]">Outstanding Balance</span>
              <span className="font-bold text-[#323232]">{formatINR(selectedBill.outstandingAmount)}</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#323232] mb-1">Payment Amount (₹) *</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => {
                    setPaymentAmount(Number(e.target.value));
                    setPaymentError('');
                  }}
                  className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs font-bold text-[#323232]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#323232] mb-1">Payment Mode</label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value as PaymentMode)}
                  className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                >
                  <option value="BANK_TRANSFER">Bank Transfer (NEFT / RTGS / IMPS)</option>
                  <option value="CHEQUE">Cheque</option>
                  <option value="UPI">UPI</option>
                  <option value="CASH">Cash</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#323232] mb-1">Reference / UTR / Cheque Number</label>
                <input
                  type="text"
                  placeholder="e.g. UTR-HDFC-991204"
                  value={paymentRef}
                  onChange={(e) => setPaymentRef(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#323232] mb-1">Payment Date</label>
                <input
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#323232] mb-1">Remarks (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Part payment against 800 bags cement delivery"
                  value={paymentRemarks}
                  onChange={(e) => setPaymentRemarks(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                />
              </div>

              {paymentError && <p className="text-xs text-rose-600 mt-1">{paymentError}</p>}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#E8E0DA]">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-full border border-[#E8E0DA] text-xs font-semibold text-[#595552] hover:bg-[#F2ECE6]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                className="px-5 py-2 rounded-full bg-[#323232] text-[#F7F3EE] text-xs font-semibold hover:bg-[#1E1E1E] transition-colors shadow-xs"
              >
                Record Payout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. CREATE / UPLOAD BILL MODAL */}
      {activeModal === 'CREATE' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#323232]/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E0DA] max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E0DA]">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8E827A] font-semibold">
                  Invoice Submission
                </span>
                <h3 className="font-bold text-base text-[#323232] mt-0.5">
                  Upload / Submit New Bill
                </h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-[#8E827A] hover:text-[#323232]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#323232] mb-1">Target Project *</label>
                <select
                  value={newProjectId}
                  onChange={(e) => setNewProjectId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                >
                  {projectList.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#323232] mb-1">Vendor Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. UltraTech Cement"
                    value={newVendorName}
                    onChange={(e) => {
                      setNewVendorName(e.target.value);
                      setCreateError('');
                    }}
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#323232] mb-1">Vendor GSTIN (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 07AAACU8044B1Z5"
                    value={newVendorGstin}
                    onChange={(e) => setNewVendorGstin(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#323232] mb-1">Bill / Invoice # *</label>
                  <input
                    type="text"
                    value={newBillNumber}
                    onChange={(e) => {
                      setNewBillNumber(e.target.value);
                      setCreateError('');
                    }}
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#323232] mb-1">Expense Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as BillCategory)}
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#323232] mb-1">Bill Date</label>
                  <input
                    type="date"
                    value={newBillDate}
                    onChange={(e) => setNewBillDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#323232] mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                  />
                </div>
              </div>

              {/* Amounts & GST Calculation */}
              <div className="p-3 rounded-2xl bg-[#FBF9F7] border border-[#E8E0DA] space-y-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#323232] mb-1">Base Amount (₹) *</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={newBaseAmount || ''}
                      onChange={(e) => {
                        setNewBaseAmount(Number(e.target.value));
                        setCreateError('');
                      }}
                      className="w-full p-2 rounded-lg border border-[#E8E0DA] text-xs font-bold text-[#323232]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#323232] mb-1">GST Rate (%)</label>
                    <select
                      value={newGstPercent}
                      onChange={(e) => setNewGstPercent(Number(e.target.value))}
                      className="w-full p-2 rounded-lg border border-[#E8E0DA] text-xs text-[#323232]"
                    >
                      {GST_RATES.map((rate) => (
                        <option key={rate} value={rate}>
                          {rate}% GST
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-[#595552] pt-2 border-t border-[#E8E0DA]">
                  <span>GST Amount:</span>
                  <span className="font-bold text-[#323232]">
                    {formatINR(Math.round(newBaseAmount * (newGstPercent / 100)))}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-[#323232] font-bold">
                  <span>Computed Total:</span>
                  <span className="text-emerald-700">
                    {formatINR(Math.round(newBaseAmount * (1 + newGstPercent / 100)))}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#323232] mb-1">Delivery Challan / GRN Ref (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. CH-8812"
                  value={newChallan}
                  onChange={(e) => setNewChallan(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#323232] mb-1">Description / Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Cement bags for 5th floor beam casting"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                />
              </div>

              {createError && <p className="text-xs text-rose-600 mt-1">{createError}</p>}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#E8E0DA]">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-full border border-[#E8E0DA] text-xs font-semibold text-[#595552] hover:bg-[#F2ECE6]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmCreate}
                className="px-5 py-2 rounded-full bg-[#323232] text-[#F7F3EE] text-xs font-semibold hover:bg-[#1E1E1E] transition-colors shadow-xs"
              >
                Submit for Approval
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
export default BillsPage;
=======
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { AppShell } from '../../app-shell/components/AppShell'
import { useAuth } from '../../authentication/auth/useAuth'
import { useProjects } from '../../projects/useProjects'
import { ApiError } from '../../../lib/api'
import {
  approveBill,
  assignVendor,
  createBill,
  createVendor,
  deleteBill,
  listBillPayments,
  listBills,
  listVendors,
  paymentHistory,
  projectExpenses,
  recordPayment,
  rejectBill,
  updateBill,
  vendorOutstanding,
  type Bill,
  type BillCategory,
  type BillInput,
  type Payment,
  type PaymentHistoryEntry,
  type PaymentMode,
  type Vendor,
  type VendorOutstanding,
} from '../data/vendorBillingApi'

type View = 'bills' | 'expenses' | 'outstanding' | 'payments'
const categories: BillCategory[] = ['MATERIAL', 'LABOUR', 'MACHINERY', 'SERVICES', 'OTHER']
const modes: PaymentMode[] = ['CASH', 'BANK_TRANSFER', 'UPI', 'CHEQUE', 'OTHER']
const statuses = ['PENDING', 'APPROVED', 'REJECTED', 'PARTIALLY_PAID', 'PAID']
const today = new Date().toISOString().slice(0, 10)

function messageOf(error: unknown) {
  return error instanceof ApiError ? error.message : error instanceof Error ? error.message : 'Something went wrong. Please try again.'
}
function amount(value: number | string | null | undefined) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(Number(value ?? 0))
}
function dateLabel(value?: string | null) {
  if (!value) return '—'
  const date = new Date(`${value.slice(0, 10)}T00:00:00`)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function BillsPage({ openUpload = false }: { openUpload?: boolean }) {
  const { user } = useAuth()
  const { projects, selectedProject, selectedProjectId, selectProject } = useProjects()
  const isAdmin = user?.role === 'ADMIN'
  const [view, setView] = useState<View>('bills')
  const [bills, setBills] = useState<Bill[]>([])
  const [billPage, setBillPage] = useState(1)
  const [totalBillPages, setTotalBillPages] = useState(1)
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [expenses, setExpenses] = useState<Bill[]>([])
  const [outstanding, setOutstanding] = useState<VendorOutstanding[]>([])
  const [history, setHistory] = useState<PaymentHistoryEntry[]>([])
  const [billPayments, setBillPayments] = useState<Payment[]>([])
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null)
  const [rejecting, setRejecting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [search, setSearch] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [overdue, setOverdue] = useState(false)
  const [formOpen, setFormOpen] = useState(openUpload)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [paymentTarget, setPaymentTarget] = useState<Bill | null>(null)
  const [paymentAmount, setPaymentAmount] = useState('')
  const [paymentDate, setPaymentDate] = useState(today)
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('BANK_TRANSFER')
  const [paymentReference, setPaymentReference] = useState('')
  const [paymentRemarks, setPaymentRemarks] = useState('')
  const [vendorFormOpen, setVendorFormOpen] = useState(false)
  const [newVendorName, setNewVendorName] = useState('')
  const [form, setForm] = useState<BillInput>({
    projectId: Number(selectedProjectId) || 0,
    vendorId: 0,
    billNumber: '',
    billDate: today,
    dueDate: '',
    category: 'MATERIAL',
    description: '',
    baseAmount: 0,
    gstPercent: 18,
  })

  useEffect(() => {
    if (selectedProjectId) setForm((current) => ({ ...current, projectId: Number(selectedProjectId) }))
  }, [selectedProjectId])

  const loadVendors = useCallback(async () => {
    try {
      setVendors(await listVendors({ isActive: true }))
    } catch (loadError) {
      setError(messageOf(loadError))
    }
  }, [])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const filters = {
        projectId: selectedProjectId ? Number(selectedProjectId) : undefined,
        status: statusFilter || undefined,
        category: (categoryFilter || undefined) as BillCategory | undefined,
        search: search.trim() || undefined,
        overdue: overdue || undefined,
        from: from || undefined,
        to: to || undefined,
        page: billPage,
        pageSize: 20,
      }
      const requests = await Promise.all([
        listBills(filters),
        selectedProjectId ? projectExpenses(selectedProjectId, from || undefined, to || undefined) : Promise.resolve([]),
        vendorOutstanding(from || undefined, to || undefined),
        paymentHistory(from || undefined, to || undefined),
      ])
      setBills(requests[0].bills)
      setTotalBillPages(requests[0].meta.totalPages)
      setExpenses(requests[1])
      setOutstanding(requests[2])
      setHistory(requests[3])
    } catch (loadError) {
      setError(messageOf(loadError))
    } finally {
      setLoading(false)
    }
  }, [selectedProjectId, statusFilter, categoryFilter, search, overdue, from, to, billPage])

  useEffect(() => { setBillPage(1) }, [selectedProjectId, statusFilter, categoryFilter, search, overdue, from, to])

  useEffect(() => { void load() }, [load])
  useEffect(() => { void loadVendors() }, [loadVendors])

  const totals = useMemo(() => bills.reduce((sum, bill) => ({
    total: sum.total + Number(bill.totalAmount),
    paid: sum.paid + Number(bill.paidAmount ?? 0),
    outstanding: sum.outstanding + Number(bill.outstandingAmount ?? 0),
  }), { total: 0, paid: 0, outstanding: 0 }), [bills])
  const expenseTotals = useMemo(() => expenses.reduce((sum, bill) => ({
    total: sum.total + Number(bill.totalAmount),
    paid: sum.paid + Number(bill.paidAmount ?? 0),
    outstanding: sum.outstanding + Number(bill.outstandingAmount ?? 0),
  }), { total: 0, paid: 0, outstanding: 0 }), [expenses])

  const resetBillForm = () => {
    setForm({ projectId: Number(selectedProjectId) || 0, vendorId: 0, billNumber: '', billDate: today, dueDate: '', category: 'MATERIAL', description: '', baseAmount: 0, gstPercent: 18 })
    setEditingId(null)
    setFormOpen(false)
  }

  const submitBill = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaving(true); setError(null); setSuccess(null)
    try {
      const input: BillInput = { ...form, dueDate: form.dueDate || null, description: form.description?.trim() || null }
      if (editingId !== null) {
        await updateBill(editingId, input)
        setSuccess('Bill updated.')
      } else {
        await createBill(input)
        setSuccess('Bill submitted for review.')
      }
      resetBillForm()
      await load()
    } catch (submitError) {
      setError(messageOf(submitError))
    } finally {
      setSaving(false)
    }
  }

  const beginEdit = (bill: Bill) => {
    setForm({
      projectId: bill.projectId,
      vendorId: bill.vendorId,
      billNumber: bill.billNumber,
      billDate: bill.billDate.slice(0, 10),
      dueDate: bill.dueDate?.slice(0, 10) ?? '',
      category: bill.category,
      description: bill.description ?? '',
      baseAmount: Number(bill.baseAmount),
      gstPercent: Number(bill.gstPercent) as BillInput['gstPercent'],
    })
    setEditingId(bill.id)
    setFormOpen(true)
  }

  const chooseBill = async (bill: Bill) => {
    setRejecting(false)
    setSelectedBill(bill)
    setError(null)
    try {
      setBillPayments(await listBillPayments(bill.id))
    } catch (detailError) {
      setError(messageOf(detailError))
      setBillPayments([])
    }
  }

  const action = async (run: () => Promise<unknown>, message: string) => {
    setSaving(true); setError(null); setSuccess(null)
    try {
      await run()
      setSuccess(message)
      setSelectedBill(null)
      await load()
    } catch (actionError) {
      setError(messageOf(actionError))
    } finally {
      setSaving(false)
    }
  }

  const submitPayment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!paymentTarget) return
    await action(() => recordPayment(paymentTarget.id, {
      amount: Number(paymentAmount),
      paymentDate,
      mode: paymentMode,
      referenceNumber: paymentReference.trim() || null,
      remarks: paymentRemarks.trim() || null,
    }), 'Payment recorded.')
    setPaymentTarget(null)
    setPaymentAmount('')
    setPaymentReference('')
    setPaymentRemarks('')
  }

  const createQuickVendor = async () => {
    if (!isAdmin && !selectedProjectId) {
      setError('Select a project before creating a vendor.')
      return
    }
    setSaving(true); setError(null)
    try {
      const vendor = await createVendor({ name: newVendorName.trim(), vendorType: 'OTHER' })
      if (!isAdmin && selectedProjectId) {
        try {
          await assignVendor(selectedProjectId, vendor.id)
        } catch (assignError) {
          setError(`Vendor created, but assignment failed: ${messageOf(assignError)}`)
          setVendors((current) => [...current, vendor])
          setForm((current) => ({ ...current, vendorId: vendor.id }))
          setNewVendorName('')
          setVendorFormOpen(false)
          return
        }
      }
      setVendors((current) => [...current, vendor])
      setForm((current) => ({ ...current, vendorId: vendor.id }))
      setNewVendorName('')
      setVendorFormOpen(false)
      setSuccess('Vendor created. It is now available for this bill.')
    } catch (createError) {
      setError(messageOf(createError))
    } finally {
      setSaving(false)
    }
  }

  const tableBills = view === 'expenses' ? expenses : bills

  return (
    <AppShell currentPath="/app/bills">
      <div className="min-h-screen bg-[#F7F3EE] px-4 py-8 text-[#323232] sm:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-sm font-medium uppercase tracking-wide text-[#8A6F52]">Finance</p><h1 className="text-3xl font-semibold">Bills & Payments</h1><p className="mt-1 text-sm text-gray-600">Track project bills, approvals, balances, and payment history.</p>{selectedProject && <p className="mt-1 text-sm text-gray-500">Selected project: {selectedProject.code} — {selectedProject.name}</p>}</div>
            <button onClick={() => { setEditingId(null); setFormOpen(true) }} className="rounded bg-[#323232] px-4 py-2 text-white">Create bill</button>
          </header>

          {error && <div role="alert" className="flex items-center justify-between rounded border border-red-300 bg-red-50 p-3 text-red-800"><span>{error}</span><button className="underline" onClick={() => void load()}>Retry</button></div>}
          {success && <p role="status" className="rounded border border-green-300 bg-green-50 p-3 text-green-800">{success}</p>}

          <nav className="flex flex-wrap gap-2" aria-label="Finance views">
            {([['bills', 'Bills'], ['expenses', 'Project expenses'], ['outstanding', 'Vendor outstanding'], ['payments', 'Payment history']] as const).map(([key, label]) => <button key={key} onClick={() => setView(key)} className={`rounded border px-4 py-2 ${view === key ? 'border-[#323232] bg-[#323232] text-white' : 'bg-white'}`}>{label}</button>)}
          </nav>

          {(view === 'bills' || view === 'expenses') && (
            <>
              <div className="grid gap-3 sm:grid-cols-3">
                {view === 'expenses' && <>
                  <Metric label="Project expenses" value={amount(expenseTotals.total)} />
                  <Metric label="Paid" value={amount(expenseTotals.paid)} />
                  <Metric label="Outstanding" value={amount(expenseTotals.outstanding)} />
                </>}
                {view === 'bills' && <>
                <Metric label="Bills on this page" value={amount(totals.total)} />
                <Metric label="Paid on this page" value={amount(totals.paid)} />
                <Metric label="Outstanding on this page" value={amount(totals.outstanding)} />
                </>}
              </div>
              <section className="rounded-lg border bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-wrap items-end gap-3">
                  {view === 'bills' && <>
                    <label className="text-sm">Status<select className="mt-1 block rounded border px-3 py-2" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="">All statuses</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
                    <label className="text-sm">Category<select className="mt-1 block rounded border px-3 py-2" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}><option value="">All categories</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
                    <label className="text-sm">Search<input className="mt-1 block rounded border px-3 py-2" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Bill or vendor" /></label>
                    <label className="flex items-center gap-2 pb-2 text-sm"><input type="checkbox" checked={overdue} onChange={(event) => setOverdue(event.target.checked)} />Overdue only</label>
                  </>}
                  {view === 'expenses' && <label className="text-sm">Project<select className="mt-1 block rounded border px-3 py-2" value={selectedProjectId} onChange={(event) => {
                    selectProject(event.target.value)
                  }}>{projects.map((project) => <option key={project.id} value={project.id}>{project.code} — {project.name}</option>)}</select></label>}
                  <label className="text-sm">From<input type="date" className="mt-1 block rounded border px-3 py-2" value={from} onChange={(event) => setFrom(event.target.value)} /></label>
                  <label className="text-sm">To<input type="date" className="mt-1 block rounded border px-3 py-2" value={to} onChange={(event) => setTo(event.target.value)} /></label>
                </div>
                {loading ? <p className="py-10 text-center text-gray-500">Loading finance records…</p> : tableBills.length === 0 ? <p className="py-10 text-center text-gray-500">{view === 'expenses' ? 'No expenses recorded for this project and date range.' : 'No bills match these filters.'}</p> : (
                  <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm">
                    <thead><tr className="border-b text-gray-500"><th className="py-2">Bill</th><th>Project</th><th>Vendor</th><th>Date</th><th>Total</th><th>Paid / outstanding</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>{tableBills.map((bill) => <tr key={bill.id} className="border-b last:border-0">
                      <td className="py-3"><button className="font-medium text-blue-700 underline" onClick={() => void chooseBill(bill)}>{bill.billNumber}</button><div className="text-xs text-gray-500">{bill.category}</div></td>
                      <td>{bill.project?.code ?? bill.projectId}</td><td>{bill.vendor?.name ?? '—'}</td><td>{dateLabel(bill.billDate)}</td><td>{amount(bill.totalAmount)}</td>
                      <td>{amount(bill.paidAmount)} / {amount(bill.outstandingAmount)}</td><td>{bill.status.replaceAll('_', ' ')}</td>
                      <td className="space-x-2 whitespace-nowrap">
                        {isAdmin && bill.status === 'PENDING' && <button className="text-green-700 underline" disabled={saving} onClick={() => void action(() => approveBill(bill.id), 'Bill approved.')}>Approve</button>}
                        {isAdmin && bill.status === 'PENDING' && <button className="text-red-700 underline" disabled={saving} onClick={() => { setRejecting(true); setSelectedBill(bill) }}>Reject</button>}
                        {isAdmin && ['APPROVED', 'PARTIALLY_PAID'].includes(bill.status) && <button className="text-blue-700 underline" onClick={() => setPaymentTarget(bill)}>Record payment</button>}
                        {(isAdmin || bill.submittedById === user?.id) && ['PENDING', 'REJECTED'].includes(bill.status) && <button className="text-blue-700 underline" onClick={() => beginEdit(bill)}>Edit</button>}
                        {(isAdmin || bill.submittedById === user?.id) && bill.status === 'PENDING' && <button className="text-red-700 underline" disabled={saving} onClick={() => { if (window.confirm(`Delete bill ${bill.billNumber}?`)) void action(() => deleteBill(bill.id), 'Bill deleted.') }}>Delete</button>}
                      </td>
                    </tr>)}</tbody>
                  </table></div>
                )}
                {view === 'bills' && totalBillPages > 1 && <div className="mt-4 flex items-center justify-between text-sm"><span>Page {billPage} of {totalBillPages}</span><div className="flex gap-2"><button className="rounded border px-3 py-1 disabled:opacity-50" disabled={billPage <= 1 || loading} onClick={() => setBillPage((page) => page - 1)}>Previous</button><button className="rounded border px-3 py-1 disabled:opacity-50" disabled={billPage >= totalBillPages || loading} onClick={() => setBillPage((page) => page + 1)}>Next</button></div></div>}
              </section>
            </>
          )}

          {view === 'outstanding' && <ReportSection title="Vendor outstanding" loading={loading} empty={!outstanding.length} emptyText="No outstanding balances for this date range.">
            <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b text-gray-500"><th className="py-2">Vendor</th><th>Total</th><th>Paid</th><th>Outstanding</th></tr></thead><tbody>{outstanding.map((row) => <tr key={row.vendorId} className="border-b"><td className="py-3">{row.vendorName}</td><td>{amount(row.totalAmount)}</td><td>{amount(row.paidAmount)}</td><td>{amount(row.outstandingAmount)}</td></tr>)}</tbody></table></div>
          </ReportSection>}

          {view === 'payments' && <ReportSection title="Payment history" loading={loading} empty={!history.length} emptyText="No payments found for this date range.">
            <div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead><tr className="border-b text-gray-500"><th className="py-2">Payment date</th><th>Bill</th><th>Vendor</th><th>Project</th><th>Amount</th><th>Mode</th><th>Reference</th><th>Recorded by</th></tr></thead><tbody>{history.map((payment) => <tr key={payment.id} className="border-b"><td className="py-3">{dateLabel(payment.paymentDate)}</td><td>{payment.bill.billNumber}</td><td>{payment.bill.vendor.name}</td><td>{projects.find((project) => project.id === payment.bill.projectId)?.code ?? payment.bill.projectId}</td><td>{amount(payment.amount)}</td><td>{payment.mode.replaceAll('_', ' ')}</td><td>{payment.referenceNumber || '—'}</td><td>{payment.recordedBy.name}</td></tr>)}</tbody></table></div>
          </ReportSection>}
        </div>
      </div>

      {formOpen && <Modal title={editingId === null ? 'Create and submit bill' : 'Edit bill'} onClose={resetBillForm}>
        <form className="space-y-3" onSubmit={(event) => void submitBill(event)}>
          <label className="block text-sm">Project<select required className="mt-1 w-full rounded border px-3 py-2" value={form.projectId || ''} disabled={editingId !== null} onChange={(event) => setForm({ ...form, projectId: Number(event.target.value) })}><option value="">Choose project</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.code} — {project.name}</option>)}</select></label>
          <div className="flex items-end gap-2"><label className="block flex-1 text-sm">Vendor<select required className="mt-1 w-full rounded border px-3 py-2" value={form.vendorId || ''} onChange={(event) => setForm({ ...form, vendorId: Number(event.target.value) })}><option value="">Choose vendor</option>{vendors.map((vendor) => <option key={vendor.id} value={vendor.id}>{vendor.name}</option>)}</select></label><button type="button" className="rounded border px-3 py-2 text-sm" onClick={() => setVendorFormOpen((value) => !value)}>Add</button></div>
          {vendorFormOpen && <div className="flex gap-2"><input required className="min-w-0 flex-1 rounded border px-3 py-2" placeholder="Vendor name" value={newVendorName} onChange={(event) => setNewVendorName(event.target.value)} /><button type="button" className="rounded border px-3 py-2" disabled={saving || !newVendorName.trim()} onClick={() => void createQuickVendor()}>Create</button></div>}
          <label className="block text-sm">Invoice number<input required maxLength={100} className="mt-1 w-full rounded border px-3 py-2" value={form.billNumber} onChange={(event) => setForm({ ...form, billNumber: event.target.value })} /></label>
          <div className="grid grid-cols-2 gap-3"><label className="block text-sm">Invoice date<input type="date" required className="mt-1 w-full rounded border px-3 py-2" value={form.billDate} onChange={(event) => setForm({ ...form, billDate: event.target.value })} /></label><label className="block text-sm">Due date<input type="date" min={form.billDate} className="mt-1 w-full rounded border px-3 py-2" value={form.dueDate ?? ''} onChange={(event) => setForm({ ...form, dueDate: event.target.value })} /></label></div>
          <div className="grid grid-cols-2 gap-3"><label className="block text-sm">Category<select className="mt-1 w-full rounded border px-3 py-2" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value as BillCategory })}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label><label className="block text-sm">GST<select className="mt-1 w-full rounded border px-3 py-2" value={form.gstPercent} onChange={(event) => setForm({ ...form, gstPercent: Number(event.target.value) as BillInput['gstPercent'] })}>{[0, 5, 12, 18, 28].map((rate) => <option key={rate} value={rate}>{rate}%</option>)}</select></label></div>
          <label className="block text-sm">Base amount<input type="number" min="0.01" step="0.01" required className="mt-1 w-full rounded border px-3 py-2" value={form.baseAmount || ''} onChange={(event) => setForm({ ...form, baseAmount: Number(event.target.value) })} /></label>
          <label className="block text-sm">Description<textarea maxLength={5000} rows={2} className="mt-1 w-full rounded border px-3 py-2" value={form.description ?? ''} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
          <p className="text-sm text-gray-600">GST amount: {amount(Number(form.baseAmount || 0) * form.gstPercent / 100)} · Total: {amount(Number(form.baseAmount || 0) * (1 + form.gstPercent / 100))}</p>
          <div className="flex gap-2"><button disabled={saving || !projects.length} className="rounded bg-[#323232] px-4 py-2 text-white disabled:opacity-50">{saving ? 'Saving…' : editingId === null ? 'Submit bill' : 'Save changes'}</button><button type="button" className="rounded border px-4 py-2" onClick={resetBillForm}>Cancel</button></div>
        </form>
      </Modal>}

      {selectedBill && <Modal title={rejecting ? `Reject ${selectedBill.billNumber}` : `Bill ${selectedBill.billNumber}`} onClose={() => { setSelectedBill(null); setRejecting(false); setRejectionReason('') }}>
        {rejecting && isAdmin ? <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); void action(() => rejectBill(selectedBill.id, rejectionReason), 'Bill rejected.'); setRejectionReason('') }}><label className="block text-sm">Reason (5–1000 characters)<textarea minLength={5} maxLength={1000} required rows={4} className="mt-1 w-full rounded border px-3 py-2" value={rejectionReason} onChange={(event) => setRejectionReason(event.target.value)} /></label><button disabled={saving} className="rounded bg-red-700 px-4 py-2 text-white">Reject bill</button></form> : <div className="space-y-3 text-sm">
          <p><strong>Vendor:</strong> {selectedBill.vendor.name}</p><p><strong>Project:</strong> {selectedBill.project?.name ?? selectedBill.projectId}</p><p><strong>Status:</strong> {selectedBill.status.replaceAll('_', ' ')}</p><p><strong>Invoice date:</strong> {dateLabel(selectedBill.billDate)} · <strong>Due:</strong> {dateLabel(selectedBill.dueDate)}</p><p><strong>Amount:</strong> {amount(selectedBill.totalAmount)} · <strong>Paid:</strong> {amount(selectedBill.paidAmount)} · <strong>Outstanding:</strong> {amount(selectedBill.outstandingAmount)}</p>
          {selectedBill.rejectionReason && <p className="rounded bg-red-50 p-2 text-red-800">Rejection: {selectedBill.rejectionReason}</p>}
          <h3 className="font-semibold">Payments</h3>{billPayments.length ? <ul className="divide-y">{billPayments.map((payment) => <li key={payment.id} className="py-2">{dateLabel(payment.paymentDate)} · {amount(payment.amount)} · {payment.mode.replaceAll('_', ' ')} {payment.referenceNumber ? `· ${payment.referenceNumber}` : ''}</li>)}</ul> : <p className="text-gray-500">No payments recorded.</p>}
        </div>}
      </Modal>}

      {paymentTarget && <Modal title={`Record payment · ${paymentTarget.billNumber}`} onClose={() => setPaymentTarget(null)}>
        <form className="space-y-3" onSubmit={(event) => void submitPayment(event)}>
          <p className="text-sm text-gray-600">Outstanding balance: {amount(paymentTarget.outstandingAmount)}</p>
          <label className="block text-sm">Amount<input required type="number" min="0.01" max={paymentTarget.outstandingAmount} step="0.01" className="mt-1 w-full rounded border px-3 py-2" value={paymentAmount} onChange={(event) => setPaymentAmount(event.target.value)} /></label>
          <label className="block text-sm">Payment date<input required type="date" min={paymentTarget.billDate.slice(0, 10)} max={today} className="mt-1 w-full rounded border px-3 py-2" value={paymentDate} onChange={(event) => setPaymentDate(event.target.value)} /></label>
          <label className="block text-sm">Mode<select className="mt-1 w-full rounded border px-3 py-2" value={paymentMode} onChange={(event) => setPaymentMode(event.target.value as PaymentMode)}>{modes.map((mode) => <option key={mode}>{mode}</option>)}</select></label>
          <label className="block text-sm">Reference number<input maxLength={255} className="mt-1 w-full rounded border px-3 py-2" value={paymentReference} onChange={(event) => setPaymentReference(event.target.value)} /></label>
          <label className="block text-sm">Remarks<textarea maxLength={1000} rows={2} className="mt-1 w-full rounded border px-3 py-2" value={paymentRemarks} onChange={(event) => setPaymentRemarks(event.target.value)} /></label>
          <button disabled={saving} className="rounded bg-[#323232] px-4 py-2 text-white">Record payment</button>
        </form>
      </Modal>}
    </AppShell>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg border bg-white p-4 shadow-sm"><p className="text-sm text-gray-500">{label}</p><p className="mt-1 text-xl font-semibold">{value}</p></div>
}

function ReportSection({ title, loading, empty, emptyText, children }: { title: string; loading: boolean; empty: boolean; emptyText: string; children: ReactNode }) {
  return <section className="rounded-lg border bg-white p-5 shadow-sm"><h2 className="mb-4 text-xl font-semibold">{title}</h2>{loading ? <p className="py-10 text-center text-gray-500">Loading report…</p> : empty ? <p className="py-10 text-center text-gray-500">{emptyText}</p> : children}</section>
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section role="dialog" aria-modal="true" aria-label={title} className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl"><div className="mb-4 flex items-center justify-between gap-4"><h2 className="text-xl font-semibold">{title}</h2><button aria-label="Close dialog" className="rounded border px-3 py-1" onClick={onClose}>Close</button></div>{children}</section></div>
}
>>>>>>> 3566074f2a2f684549d478b7530bb924717b2cf7
