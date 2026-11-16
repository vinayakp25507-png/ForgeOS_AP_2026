// Imports useState, useMemo, useEffect from react so this module can reuse that component, helper, or library.
import { useState, useMemo, useEffect } from 'react';
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Plus,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Search,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  XCircle,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  AlertTriangle,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Building2,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  FileText,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Eye,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Check,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  X,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Receipt,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from 'lucide-react';
// Imports AppShell from ../../app-shell/components/AppShell so this module can reuse that component, helper, or library.
import { AppShell } from '../../app-shell/components/AppShell';
// Imports isAdmin, getCurrentUser, getCurrentRole from ../../authentication/utils/permissions so this module can reuse that component, helper, or library.
import { isAdmin, getCurrentUser, getCurrentRole } from '../../authentication/utils/permissions';
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  getStoredBills,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  approveBill,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  rejectBill,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  recordBillPayment,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  addBill,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from '../data/billStore';
// Imports type  Bill, BillCategory, PaymentMode from ../types/bill so this module can reuse that component, helper, or library.
import type { Bill, BillCategory, PaymentMode } from '../types/bill';

// Stores the value in GST_RATES so later lines can reuse this data or behavior for the current feature.
const GST_RATES = [0, 5, 12, 18, 28] as const;

// Stores the value in CATEGORIES so later lines can reuse this data or behavior for the current feature.
const CATEGORIES: BillCategory[] = ['MATERIAL', 'LABOUR', 'MACHINERY', 'SERVICES', 'OTHER'];

// Defines formatINR so this module can perform its named task when needed.
function formatINR(val: number): string {
  // Returns the result so the caller or React receives the value or interface this function provides.
  return new Intl.NumberFormat('en-IN', {
    // Sets the style field so the surrounding object or component receives this setting.
    style: 'currency',
    // Sets the currency field so the surrounding object or component receives this setting.
    currency: 'INR',
    // Sets the maximumFractionDigits field so the surrounding object or component receives this setting.
    maximumFractionDigits: 0,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }).format(val);
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines formatDate so this module can perform its named task when needed.
function formatDate(dateStr: string): string {
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!dateStr) return '—';
  // Starts an error-handling region so failures can be caught and handled safely.
  try {
    // Stores the value in d so later lines can reuse this data or behavior for the current feature.
    const d = new Date(dateStr);
    // Returns the result so the caller or React receives the value or interface this function provides.
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } catch {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return dateStr;
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines isBillOverdue so this module can perform its named task when needed.
function isBillOverdue(bill: Bill): boolean {
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (!bill.dueDate) return false;
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (bill.status !== 'APPROVED' && bill.status !== 'PARTIALLY_PAID') return false;
  // Stores the value in today so later lines can reuse this data or behavior for the current feature.
  const today = new Date().toISOString().split('T')[0];
  // Returns the result so the caller or React receives the value or interface this function provides.
  return bill.dueDate < today;
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines BillsPage so this module can perform its named task when needed.
export function BillsPage({ openUpload = false }: { openUpload?: boolean }) {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [bills, setBills] = useState<Bill[]>(() => getStoredBills());
  // Stores the value in admin so later lines can reuse this data or behavior for the current feature.
  const admin = isAdmin();
  // Stores the value in currentUser so later lines can reuse this data or behavior for the current feature.
  const currentUser = getCurrentUser();

  // Filters state
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [selectedProjectId, setSelectedProjectId] = useState<string>('ALL');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [searchQuery, setSearchQuery] = useState<string>('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [overdueOnly, setOverdueOnly] = useState<boolean>(false);

  // Modals state
  // Continues the component or data expression so its related values and behavior stay grouped together.
  const [activeModal, setActiveModal] = useState<
    // Continues the component or data expression so its related values and behavior stay grouped together.
    'VIEW' | 'APPROVE' | 'REJECT' | 'PAYMENT' | 'CREATE' | null
  // Continues the component or data expression so its related values and behavior stay grouped together.
  >(null);
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  // Reject Form
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [rejectReason, setRejectReason] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [rejectError, setRejectError] = useState('');

  // Payment Form
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('BANK_TRANSFER');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [paymentRef, setPaymentRef] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [paymentDate, setPaymentDate] = useState(() => new Date().toISOString().split('T')[0]);
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [paymentRemarks, setPaymentRemarks] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [paymentError, setPaymentError] = useState('');

  // Create/Upload Bill Form
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newProjectId, setNewProjectId] = useState('1');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newVendorName, setNewVendorName] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newVendorGstin, setNewVendorGstin] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newBillNumber, setNewBillNumber] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newBillDate, setNewBillDate] = useState(() => new Date().toISOString().split('T')[0]);
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newDueDate, setNewDueDate] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newCategory, setNewCategory] = useState<BillCategory>('MATERIAL');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newBaseAmount, setNewBaseAmount] = useState<number>(0);
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newGstPercent, setNewGstPercent] = useState<number>(18);
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newDescription, setNewDescription] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newChallan, setNewChallan] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [createError, setCreateError] = useState('');

  // Distinct projects list
  // Caches projectList so its calculation is repeated only when its inputs change.
  // Caches projectList so its calculation is repeated only when its inputs change.
  // Caches projectList so its calculation is repeated only when its inputs change.
  // Caches projectList so its calculation is repeated only when its inputs change.
  // Caches projectList so its calculation is repeated only when its inputs change.
  // Caches projectList so its calculation is repeated only when its inputs change.
  // Caches projectList so its calculation is repeated only when its inputs change.
  // Caches projectList so its calculation is repeated only when its inputs change.
  // Caches projectList so its calculation is repeated only when its inputs change.
  // Caches projectList so its calculation is repeated only when its inputs change.
  // Caches projectList so its calculation is repeated only when its inputs change.
  const projectList = useMemo(() => {
    // Stores the value in map so later lines can reuse this data or behavior for the current feature.
    const map = new Map<string, { id: string; code: string; name: string }>();
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    bills.forEach((b) => {
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (!map.has(b.projectId)) {
        // Calls this helper or component so the feature can perform the operation or render the control represented here.
        map.set(b.projectId, { id: b.projectId, code: b.projectCode, name: b.projectName });
      // Closes the current block or object so the grouped statements or settings end here.
      }
    // Continues the component or data expression so its related values and behavior stay grouped together.
    });
    // Returns the result so the caller or React receives the value or interface this function provides.
    return Array.from(map.values());
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [bills]);

  // Scoped bills: If user is PM, only show bills for their project or created by them
  // Caches scopedBills so its calculation is repeated only when its inputs change.
  // Caches scopedBills so its calculation is repeated only when its inputs change.
  // Caches scopedBills so its calculation is repeated only when its inputs change.
  // Caches scopedBills so its calculation is repeated only when its inputs change.
  // Caches scopedBills so its calculation is repeated only when its inputs change.
  // Caches scopedBills so its calculation is repeated only when its inputs change.
  // Caches scopedBills so its calculation is repeated only when its inputs change.
  // Caches scopedBills so its calculation is repeated only when its inputs change.
  // Caches scopedBills so its calculation is repeated only when its inputs change.
  // Caches scopedBills so its calculation is repeated only when its inputs change.
  // Caches scopedBills so its calculation is repeated only when its inputs change.
  const scopedBills = useMemo(() => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (admin) return bills;
    // Stores the value in pmName so later lines can reuse this data or behavior for the current feature.
    const pmName = currentUser?.name?.toLowerCase().trim() ?? '';
    // Returns the result so the caller or React receives the value or interface this function provides.
    return bills.filter(
      // Continues the component or data expression so its related values and behavior stay grouped together.
      (b) =>
        // Calls this helper or component so the feature can perform the operation or render the control represented here.
        b.submittedBy.toLowerCase().includes(pmName) ||
        // Calls this helper or component so the feature can perform the operation or render the control represented here.
        b.projectName.toLowerCase().includes(pmName)
    // Closes this function call or grouped expression so the surrounding code can continue.
    );
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [bills, admin, currentUser]);

  // Filtered bills
  // Caches filteredBills so its calculation is repeated only when its inputs change.
  // Caches filteredBills so its calculation is repeated only when its inputs change.
  // Caches filteredBills so its calculation is repeated only when its inputs change.
  // Caches filteredBills so its calculation is repeated only when its inputs change.
  // Caches filteredBills so its calculation is repeated only when its inputs change.
  // Caches filteredBills so its calculation is repeated only when its inputs change.
  // Caches filteredBills so its calculation is repeated only when its inputs change.
  // Caches filteredBills so its calculation is repeated only when its inputs change.
  // Caches filteredBills so its calculation is repeated only when its inputs change.
  // Caches filteredBills so its calculation is repeated only when its inputs change.
  // Caches filteredBills so its calculation is repeated only when its inputs change.
  const filteredBills = useMemo(() => {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return scopedBills.filter((bill) => {
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (selectedProjectId !== 'ALL' && bill.projectId !== selectedProjectId) return false;
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (statusFilter !== 'ALL' && bill.status !== statusFilter) return false;
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (categoryFilter !== 'ALL' && bill.category !== categoryFilter) return false;
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (overdueOnly && !isBillOverdue(bill)) return false;

      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (searchQuery.trim()) {
        // Stores the value in q so later lines can reuse this data or behavior for the current feature.
        const q = searchQuery.toLowerCase();
        // Stores the value in matchesNo so later lines can reuse this data or behavior for the current feature.
        const matchesNo = bill.billNumber.toLowerCase().includes(q);
        // Stores the value in matchesVendor so later lines can reuse this data or behavior for the current feature.
        const matchesVendor = bill.vendorName.toLowerCase().includes(q);
        // Stores the value in matchesProject so later lines can reuse this data or behavior for the current feature.
        const matchesProject = bill.projectName.toLowerCase().includes(q);
        // Stores the value in matchesChallan so later lines can reuse this data or behavior for the current feature.
        const matchesChallan = bill.challanNumber?.toLowerCase().includes(q);
        // Checks this condition before continuing so the code can choose the correct path for the current state.
        if (!matchesNo && !matchesVendor && !matchesProject && !matchesChallan) return false;
      // Closes the current block or object so the grouped statements or settings end here.
      }
      // Returns the result so the caller or React receives the value or interface this function provides.
      return true;
    // Continues the component or data expression so its related values and behavior stay grouped together.
    });
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [scopedBills, selectedProjectId, statusFilter, categoryFilter, overdueOnly, searchQuery]);

  // Overall Financial KPIs
  // Caches kpis so its calculation is repeated only when its inputs change.
  // Caches kpis so its calculation is repeated only when its inputs change.
  // Caches kpis so its calculation is repeated only when its inputs change.
  // Caches kpis so its calculation is repeated only when its inputs change.
  // Caches kpis so its calculation is repeated only when its inputs change.
  // Caches kpis so its calculation is repeated only when its inputs change.
  // Caches kpis so its calculation is repeated only when its inputs change.
  // Caches kpis so its calculation is repeated only when its inputs change.
  // Caches kpis so its calculation is repeated only when its inputs change.
  // Caches kpis so its calculation is repeated only when its inputs change.
  // Caches kpis so its calculation is repeated only when its inputs change.
  const kpis = useMemo(() => {
    // Stores the value in totalInvoiced so later lines can reuse this data or behavior for the current feature.
    let totalInvoiced = 0;
    // Stores the value in committed so later lines can reuse this data or behavior for the current feature.
    let committed = 0;
    // Stores the value in totalPaid so later lines can reuse this data or behavior for the current feature.
    let totalPaid = 0;
    // Stores the value in totalOutstanding so later lines can reuse this data or behavior for the current feature.
    let totalOutstanding = 0;
    // Stores the value in pendingCount so later lines can reuse this data or behavior for the current feature.
    let pendingCount = 0;
    // Stores the value in pendingAmount so later lines can reuse this data or behavior for the current feature.
    let pendingAmount = 0;
    // Stores the value in overdueCount so later lines can reuse this data or behavior for the current feature.
    let overdueCount = 0;
    // Stores the value in overdueAmount so later lines can reuse this data or behavior for the current feature.
    let overdueAmount = 0;

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    filteredBills.forEach((b) => {
      // Continues the component or data expression so its related values and behavior stay grouped together.
      totalInvoiced += b.totalAmount;

      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (b.status === 'APPROVED' || b.status === 'PARTIALLY_PAID' || b.status === 'PAID') {
        // Continues the component or data expression so its related values and behavior stay grouped together.
        committed += b.totalAmount;
      // Closes the current block or object so the grouped statements or settings end here.
      }
      // Continues the component or data expression so its related values and behavior stay grouped together.
      totalPaid += b.paidAmount;
      // Continues the component or data expression so its related values and behavior stay grouped together.
      totalOutstanding += b.outstandingAmount;

      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (b.status === 'PENDING') {
        // Continues the component or data expression so its related values and behavior stay grouped together.
        pendingCount += 1;
        // Continues the component or data expression so its related values and behavior stay grouped together.
        pendingAmount += b.totalAmount;
      // Closes the current block or object so the grouped statements or settings end here.
      }

      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (isBillOverdue(b)) {
        // Continues the component or data expression so its related values and behavior stay grouped together.
        overdueCount += 1;
        // Continues the component or data expression so its related values and behavior stay grouped together.
        overdueAmount += b.outstandingAmount;
      // Closes the current block or object so the grouped statements or settings end here.
      }
    // Continues the component or data expression so its related values and behavior stay grouped together.
    });

    // Returns the result so the caller or React receives the value or interface this function provides.
    return {
      // Continues the component or data expression so its related values and behavior stay grouped together.
      totalInvoiced,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      committed,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      totalPaid,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      totalOutstanding,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      pendingCount,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      pendingAmount,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      overdueCount,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      overdueAmount,
    // Closes the current block or object so the grouped statements or settings end here.
    };
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [filteredBills]);

  // Project-wise summary chips
  // Caches projectSummaries so its calculation is repeated only when its inputs change.
  // Caches projectSummaries so its calculation is repeated only when its inputs change.
  // Caches projectSummaries so its calculation is repeated only when its inputs change.
  // Caches projectSummaries so its calculation is repeated only when its inputs change.
  // Caches projectSummaries so its calculation is repeated only when its inputs change.
  // Caches projectSummaries so its calculation is repeated only when its inputs change.
  // Caches projectSummaries so its calculation is repeated only when its inputs change.
  // Caches projectSummaries so its calculation is repeated only when its inputs change.
  // Caches projectSummaries so its calculation is repeated only when its inputs change.
  // Caches projectSummaries so its calculation is repeated only when its inputs change.
  // Caches projectSummaries so its calculation is repeated only when its inputs change.
  const projectSummaries = useMemo(() => {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return projectList.map((p) => {
      // Stores the value in pBills so later lines can reuse this data or behavior for the current feature.
      const pBills = scopedBills.filter((b) => b.projectId === p.id);
      // Stores the value in totalAmount so later lines can reuse this data or behavior for the current feature.
      const totalAmount = pBills.reduce((acc, b) => acc + b.totalAmount, 0);
      // Stores the value in paid so later lines can reuse this data or behavior for the current feature.
      const paid = pBills.reduce((acc, b) => acc + b.paidAmount, 0);
      // Stores the value in outstanding so later lines can reuse this data or behavior for the current feature.
      const outstanding = pBills.reduce((acc, b) => acc + b.outstandingAmount, 0);
      // Stores the value in pendingApprovals so later lines can reuse this data or behavior for the current feature.
      const pendingApprovals = pBills.filter((b) => b.status === 'PENDING').length;
      // Returns the result so the caller or React receives the value or interface this function provides.
      return {
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ...p,
        // Sets the count field so the surrounding object or component receives this setting.
        count: pBills.length,
        // Continues the component or data expression so its related values and behavior stay grouped together.
        totalAmount,
        // Continues the component or data expression so its related values and behavior stay grouped together.
        paid,
        // Continues the component or data expression so its related values and behavior stay grouped together.
        outstanding,
        // Continues the component or data expression so its related values and behavior stay grouped together.
        pendingApprovals,
      // Closes the current block or object so the grouped statements or settings end here.
      };
    // Continues the component or data expression so its related values and behavior stay grouped together.
    });
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [projectList, scopedBills]);

  // Action Handlers
  // Stores the value in handleOpenApprove so later lines can reuse this data or behavior for the current feature.
  const handleOpenApprove = (bill: Bill) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setSelectedBill(bill);
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setActiveModal('APPROVE');
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Stores the value in handleConfirmApprove so later lines can reuse this data or behavior for the current feature.
  const handleConfirmApprove = () => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!selectedBill) return;
    // Stores the value in adminName so later lines can reuse this data or behavior for the current feature.
    const adminName = currentUser?.name || 'Rakesh Verma (Admin)';
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    approveBill(selectedBill.id, adminName);
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setBills(getStoredBills());
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setActiveModal(null);
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setSelectedBill(null);
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Stores the value in handleOpenReject so later lines can reuse this data or behavior for the current feature.
  const handleOpenReject = (bill: Bill) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setSelectedBill(bill);
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setRejectReason('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setRejectError('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setActiveModal('REJECT');
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Stores the value in handleConfirmReject so later lines can reuse this data or behavior for the current feature.
  const handleConfirmReject = () => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!selectedBill) return;
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (rejectReason.trim().length < 5) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setRejectError('Please provide a specific rejection reason (min 5 characters).');
      // Returns the result so the caller or React receives the value or interface this function provides.
      return;
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Stores the value in adminName so later lines can reuse this data or behavior for the current feature.
    const adminName = currentUser?.name || 'Rakesh Verma (Admin)';
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    rejectBill(selectedBill.id, adminName, rejectReason.trim());
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setBills(getStoredBills());
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setActiveModal(null);
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setSelectedBill(null);
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Stores the value in handleOpenPayment so later lines can reuse this data or behavior for the current feature.
  const handleOpenPayment = (bill: Bill) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setSelectedBill(bill);
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setPaymentAmount(bill.outstandingAmount);
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setPaymentMode('BANK_TRANSFER');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setPaymentRef('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setPaymentRemarks('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setPaymentDate(new Date().toISOString().split('T')[0]);
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setPaymentError('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setActiveModal('PAYMENT');
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Stores the value in handleConfirmPayment so later lines can reuse this data or behavior for the current feature.
  const handleConfirmPayment = () => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!selectedBill) return;
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (paymentAmount <= 0) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setPaymentError('Payment amount must be greater than zero.');
      // Returns the result so the caller or React receives the value or interface this function provides.
      return;
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (paymentAmount > selectedBill.outstandingAmount) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setPaymentError(`Amount cannot exceed outstanding balance of ${formatINR(selectedBill.outstandingAmount)}.`);
      // Returns the result so the caller or React receives the value or interface this function provides.
      return;
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Stores the value in adminName so later lines can reuse this data or behavior for the current feature.
    const adminName = currentUser?.name || 'Rakesh Verma (Admin)';
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    recordBillPayment(selectedBill.id, {
      // Sets the amount field so the surrounding object or component receives this setting.
      amount: paymentAmount,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      paymentDate,
      // Sets the mode field so the surrounding object or component receives this setting.
      mode: paymentMode,
      // Sets the referenceNumber field so the surrounding object or component receives this setting.
      referenceNumber: paymentRef.trim() || undefined,
      // Sets the remarks field so the surrounding object or component receives this setting.
      remarks: paymentRemarks.trim() || undefined,
      // Sets the recordedBy field so the surrounding object or component receives this setting.
      recordedBy: adminName,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    });
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setBills(getStoredBills());
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setActiveModal(null);
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setSelectedBill(null);
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Stores the value in handleOpenCreate so later lines can reuse this data or behavior for the current feature.
  const handleOpenCreate = () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewProjectId(projectList[0]?.id || '1');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewVendorName('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewVendorGstin('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewBillNumber(`INV-${Date.now().toString().slice(-4)}`);
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewBillDate(new Date().toISOString().split('T')[0]);
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewDueDate('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewCategory('MATERIAL');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewBaseAmount(0);
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewGstPercent(18);
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewDescription('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewChallan('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setCreateError('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setActiveModal('CREATE');
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  useEffect(() => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (openUpload) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setActiveModal('CREATE');
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [openUpload]);

  // Stores the value in handleConfirmCreate so later lines can reuse this data or behavior for the current feature.
  const handleConfirmCreate = () => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!newVendorName.trim()) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setCreateError('Vendor name is required.');
      // Returns the result so the caller or React receives the value or interface this function provides.
      return;
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!newBillNumber.trim()) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setCreateError('Bill / Invoice number is required.');
      // Returns the result so the caller or React receives the value or interface this function provides.
      return;
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (newBaseAmount <= 0) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setCreateError('Base amount must be greater than zero.');
      // Returns the result so the caller or React receives the value or interface this function provides.
      return;
    // Closes the current block or object so the grouped statements or settings end here.
    }

    // Stores the value in matchedProject so later lines can reuse this data or behavior for the current feature.
    const matchedProject = projectList.find((p) => p.id === newProjectId) || {
      // Sets the id field so the surrounding object or component receives this setting.
      id: newProjectId,
      // Sets the code field so the surrounding object or component receives this setting.
      code: 'PRJ-NEW',
      // Sets the name field so the surrounding object or component receives this setting.
      name: 'Project Site',
    // Closes the current block or object so the grouped statements or settings end here.
    };

    // Stores the value in submitter so later lines can reuse this data or behavior for the current feature.
    const submitter = currentUser?.name
      // Continues the component or data expression so its related values and behavior stay grouped together.
      ? `${currentUser.name} (${getCurrentRole() === 'Admin' ? 'Admin' : 'PM'})`
      // Continues the component or data expression so its related values and behavior stay grouped together.
      : 'Site Manager';

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    addBill({
      // Sets the projectId field so the surrounding object or component receives this setting.
      projectId: matchedProject.id,
      // Sets the projectCode field so the surrounding object or component receives this setting.
      projectCode: matchedProject.code,
      // Sets the projectName field so the surrounding object or component receives this setting.
      projectName: matchedProject.name,
      // Sets the vendorName field so the surrounding object or component receives this setting.
      vendorName: newVendorName.trim(),
      // Sets the vendorGstin field so the surrounding object or component receives this setting.
      vendorGstin: newVendorGstin.trim() || undefined,
      // Sets the billNumber field so the surrounding object or component receives this setting.
      billNumber: newBillNumber.trim(),
      // Sets the billDate field so the surrounding object or component receives this setting.
      billDate: newBillDate,
      // Sets the dueDate field so the surrounding object or component receives this setting.
      dueDate: newDueDate || undefined,
      // Sets the category field so the surrounding object or component receives this setting.
      category: newCategory,
      // Sets the baseAmount field so the surrounding object or component receives this setting.
      baseAmount: newBaseAmount,
      // Sets the gstPercent field so the surrounding object or component receives this setting.
      gstPercent: newGstPercent,
      // Sets the description field so the surrounding object or component receives this setting.
      description: newDescription.trim() || undefined,
      // Sets the challanNumber field so the surrounding object or component receives this setting.
      challanNumber: newChallan.trim() || undefined,
      // Sets the submittedBy field so the surrounding object or component receives this setting.
      submittedBy: submitter,
      // Sets the fileAttachmentName field so the surrounding object or component receives this setting.
      fileAttachmentName: `${newVendorName.replace(/\s+/g, '_')}_Challan.pdf`,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    });

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setBills(getStoredBills());
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setActiveModal(null);
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <AppShell currentPath="/app/bills">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="mx-auto max-w-[1600px] space-y-6 p-5 sm:p-7 lg:p-8">
        {/* Page Header */}
        {/* Starts the <div> element to organize this part of the interface. */}
        <div>
          {/* Starts the <p> element to organize this part of the interface. */}
          <p className="text-sm text-[#8E827A]">Workspace / Bills & Invoices</p>
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div>
              {/* Starts the <h1> element to organize this part of the interface. */}
              <h1 className="text-2xl font-bold tracking-tight text-[#323232] sm:text-3xl">
                {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                Project Billing & Invoices
              {/* Closes the <h1> element so later content is no longer part of this region. */}
              </h1>
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="text-sm text-[#8E827A] mt-1 font-light">
                {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                Centralized invoice audit, GST reconciliation, approval workflows, and payment records across all sites.
              {/* Closes the <p> element so later content is no longer part of this region. */}
              </p>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center gap-3">
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={handleOpenCreate}
                /* Chooses the element’s browser behavior, such as a button action or input format. */
                type="button"
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="inline-flex items-center gap-2 rounded-full bg-[#323232] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F7F3EE] hover:bg-[#1E1E1E] transition-all shadow-sm"
              >
                {/* Starts the <Plus> element to organize this part of the interface. */}
                <Plus className="w-4 h-4" />
                {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                Upload / Submit Bill
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>

        {/* Financial KPI Summary Cards */}
        {/* Starts the <div> element to organize this part of the interface. */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] p-4">
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E827A]">Total Invoiced</span>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-lg font-bold text-[#323232] mt-1">{formatINR(kpis.totalInvoiced)}</p>
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[10px] text-[#8E827A]">{filteredBills.length} Bills in scope</span>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>

          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] p-4">
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E827A]">Committed</span>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-lg font-bold text-[#323232] mt-1">{formatINR(kpis.committed)}</p>
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[10px] text-emerald-600 font-medium">Approved & Paid</span>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>

          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] p-4">
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E827A]">Total Paid</span>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-lg font-bold text-emerald-700 mt-1">{formatINR(kpis.totalPaid)}</p>
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[10px] text-[#8E827A]">Released to vendors</span>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>

          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] p-4">
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E827A]">Outstanding</span>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-lg font-bold text-amber-700 mt-1">{formatINR(kpis.totalOutstanding)}</p>
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[10px] text-[#8E827A]">Remaining balance</span>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>

          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] p-4">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center justify-between">
              {/* Starts the <span> element to organize this part of the interface. */}
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E827A]">Pending Approvals</span>
              {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
              {kpis.pendingCount > 0 && (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              // Continues the component or data expression so its related values and behavior stay grouped together.
              )}
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-lg font-bold text-[#323232] mt-1">{kpis.pendingCount} Bills</p>
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[10px] text-amber-700 font-medium">{formatINR(kpis.pendingAmount)} awaiting</span>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>

          {/* Starts the <div> element to organize this part of the interface. */}
          <div className={`rounded-2xl border p-4 ${kpis.overdueCount > 0 ? 'border-rose-300 bg-rose-50/50' : 'border-[#E8E0DA] bg-[#FBF9F7]'}`}>
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-700">Overdue</span>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-lg font-bold text-rose-700 mt-1">{kpis.overdueCount} Bills</p>
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[10px] text-rose-600 font-medium">{formatINR(kpis.overdueAmount)} due</span>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>

        {/* Project-Wise Filter Bar */}
        {/* Starts the <div> element to organize this part of the interface. */}
        <div className="rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] p-4 space-y-3">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="flex items-center justify-between">
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-xs font-bold uppercase tracking-wider text-[#323232] flex items-center gap-1.5">
              {/* Starts the <Building2> element to organize this part of the interface. */}
              <Building2 className="w-4 h-4 text-[#8E827A]" />
              {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
              Project-Wise View
            {/* Closes the <span> element so later content is no longer part of this region. */}
            </span>
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-xs text-[#8E827A] font-light">
              {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
              Select a project to audit site invoices
            {/* Closes the <span> element so later content is no longer part of this region. */}
            </span>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>

          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Starts the <button> element to provide an action the user can activate. */}
            <button
              /* Connects the Click event to its handler so the interface can respond to interaction. */
              onClick={() => setSelectedProjectId('ALL')}
              /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                /* Sets the selectedProjectId property so this element receives the data or behavior required by this screen. */
                selectedProjectId === 'ALL'
                  /* Continues the component or data expression so its related values and behavior stay grouped together. */
                  ? 'bg-[#323232] text-[#F7F3EE] shadow-xs'
                  /* Continues the component or data expression so its related values and behavior stay grouped together. */
                  : 'bg-[#F2ECE6] text-[#595552] hover:bg-[#E8E0DA]'
              /* Continues the component or data expression so its related values and behavior stay grouped together. */
              }`}
            >
              {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
              All Projects ({scopedBills.length})
            {/* Closes the <button> element so later content is no longer part of this region. */}
            </button>

            {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
            {projectSummaries.map((p) => (
              // Continues the component or data expression so its related values and behavior stay grouped together.
              <button
                /* Gives this rendered item a stable identity so React can update lists efficiently. */
                key={p.id}
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={() => setSelectedProjectId(p.id)}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  /* Sets the selectedProjectId property so this element receives the data or behavior required by this screen. */
                  selectedProjectId === p.id
                    /* Continues the component or data expression so its related values and behavior stay grouped together. */
                    ? 'bg-[#323232] text-[#F7F3EE] shadow-xs'
                    /* Continues the component or data expression so its related values and behavior stay grouped together. */
                    : 'bg-[#F2ECE6] text-[#595552] hover:bg-[#E8E0DA]'
                /* Continues the component or data expression so its related values and behavior stay grouped together. */
                }`}
              >
                {/* Starts the <span> element to organize this part of the interface. */}
                <span>{p.name}</span>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${selectedProjectId === p.id ? 'bg-[#595552] text-white' : 'bg-[#E0D7D0] text-[#323232]'}`}>
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  {p.count}
                {/* Closes the <span> element so later content is no longer part of this region. */}
                </span>
                // Continues the component or data expression so its related values and behavior stay grouped together.
                {p.pendingApprovals > 0 && (
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title={`${p.pendingApprovals} pending approvals`} />
                // Continues the component or data expression so its related values and behavior stay grouped together.
                )}
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>
            // Continues the component or data expression so its related values and behavior stay grouped together.
            ))}
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>

        {/* Search & Filter Toolbar */}
        {/* Starts the <div> element to organize this part of the interface. */}
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="flex flex-1 items-center gap-2">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="relative flex-1 max-w-md">
              {/* Starts the <Search> element to organize this part of the interface. */}
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E827A]" />
              {/* Starts the <input> element to collect or display a value. */}
              <input
                /* Chooses the element’s browser behavior, such as a button action or input format. */
                type="text"
                /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                placeholder="Search by Bill #, Vendor, or Challan..."
                /* Supplies the value shown by this form control so the user sees the current data. */
                value={searchQuery}
                /* Connects the Change event to its handler so the interface can respond to interaction. */
                onChange={(e) => setSearchQuery(e.target.value)}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E8E0DA] bg-white text-xs text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
              />
              {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
              {searchQuery && (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <button
                  /* Connects the Click event to its handler so the interface can respond to interaction. */
                  onClick={() => setSearchQuery('')}
                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E827A] hover:text-[#323232]"
                >
                  {/* Starts the <X> element to organize this part of the interface. */}
                  <X className="w-3.5 h-3.5" />
                {/* Closes the <button> element so later content is no longer part of this region. */}
                </button>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              )}
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Overdue Toggle */}
            {/* Starts the <button> element to provide an action the user can activate. */}
            <button
              /* Connects the Click event to its handler so the interface can respond to interaction. */
              onClick={() => setOverdueOnly(!overdueOnly)}
              /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
              className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
                /* Continues the component or data expression so its related values and behavior stay grouped together. */
                overdueOnly
                  /* Continues the component or data expression so its related values and behavior stay grouped together. */
                  ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold'
                  /* Continues the component or data expression so its related values and behavior stay grouped together. */
                  : 'bg-white border-[#E8E0DA] text-[#595552] hover:bg-[#FBF9F7]'
              /* Continues the component or data expression so its related values and behavior stay grouped together. */
              }`}
            >
              {/* Starts the <AlertTriangle> element to organize this part of the interface. */}
              <AlertTriangle className="w-3.5 h-3.5" />
              {/* Starts the <span> element to organize this part of the interface. */}
              <span>Overdue Only</span>
            {/* Closes the <button> element so later content is no longer part of this region. */}
            </button>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>

          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Filter */}
            {/* Starts the <select> element to collect or display a value. */}
            <select
              /* Supplies the value shown by this form control so the user sees the current data. */
              value={categoryFilter}
              /* Connects the Change event to its handler so the interface can respond to interaction. */
              onChange={(e) => setCategoryFilter(e.target.value)}
              /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
              className="px-3 py-2 rounded-xl border border-[#E8E0DA] bg-white text-xs text-[#323232] focus:outline-none"
            >
              {/* Starts the <option> element to organize this part of the interface. */}
              <option value="ALL">All Categories</option>
              {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
              {CATEGORIES.map((cat) => (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <option key={cat} value={cat}>
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  {cat.charAt(0) + cat.slice(1).toLowerCase()}
                {/* Closes the <option> element so later content is no longer part of this region. */}
                </option>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              ))}
            {/* Closes the <select> element so later content is no longer part of this region. */}
            </select>

            {/* Status Pills */}
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="inline-flex p-1 rounded-xl bg-[#F2ECE6] border border-[#E8E0DA] text-xs">
              {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
              {(['ALL', 'PENDING', 'APPROVED', 'PARTIALLY_PAID', 'PAID', 'REJECTED'] as const).map((st) => (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <button
                  /* Gives this rendered item a stable identity so React can update lists efficiently. */
                  key={st}
                  /* Connects the Click event to its handler so the interface can respond to interaction. */
                  onClick={() => setStatusFilter(st)}
                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    /* Sets the statusFilter property so this element receives the data or behavior required by this screen. */
                    statusFilter === st
                      /* Continues the component or data expression so its related values and behavior stay grouped together. */
                      ? 'bg-white text-[#323232] font-bold shadow-xs'
                      /* Continues the component or data expression so its related values and behavior stay grouped together. */
                      : 'text-[#8E827A] hover:text-[#323232]'
                  /* Continues the component or data expression so its related values and behavior stay grouped together. */
                  }`}
                >
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  {st === 'ALL'
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    ? 'All'
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    : st === 'PENDING'
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    ? 'Pending'
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    : st === 'APPROVED'
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    ? 'Approved'
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    : st === 'PARTIALLY_PAID'
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    ? 'Part-Paid'
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    : st === 'PAID'
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    ? 'Paid'
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    : 'Rejected'}
                {/* Closes the <button> element so later content is no longer part of this region. */}
                </button>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              ))}
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>

        {/* Bills Table */}
        {/* Starts the <div> element to organize this part of the interface. */}
        <div className="rounded-2xl border border-[#E8E0DA] bg-white overflow-hidden shadow-xs">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="overflow-x-auto">
            {/* Starts the <table> element to organize this part of the interface. */}
            <table className="w-full text-left text-xs">
              {/* Starts the <thead> element to organize this part of the interface. */}
              <thead className="bg-[#FBF9F7] border-b border-[#E8E0DA] text-[#8E827A] font-semibold uppercase tracking-wider">
                {/* Starts the <tr> element to organize this part of the interface. */}
                <tr>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="py-3 px-4">Bill # / Date</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="py-3 px-4">Project</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="py-3 px-4">Vendor</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="py-3 px-4">Due Date</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="py-3 px-4 text-right">Amount (₹)</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="py-3 px-4">Payment Progress</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="py-3 px-4 text-center">Status</th>
                  {/* Starts the <th> element to organize this part of the interface. */}
                  <th className="py-3 px-4 text-right">Actions</th>
                {/* Closes the <tr> element so later content is no longer part of this region. */}
                </tr>
              {/* Closes the <thead> element so later content is no longer part of this region. */}
              </thead>
              {/* Starts the <tbody> element to organize this part of the interface. */}
              <tbody className="divide-y divide-[#E8E0DA]">
                {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                {filteredBills.length === 0 ? (
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  <tr>
                    {/* Starts the <td> element to organize this part of the interface. */}
                    <td colSpan={8} className="py-12 text-center text-[#8E827A]">
                      {/* Starts the <Receipt> element to organize this part of the interface. */}
                      <Receipt className="w-8 h-8 mx-auto text-[#C8BCB4] mb-2" />
                      {/* Starts the <p> element to organize this part of the interface. */}
                      <p className="font-medium text-sm text-[#323232]">No bills found</p>
                      {/* Starts the <p> element to organize this part of the interface. */}
                      <p className="text-xs text-[#8E827A] mt-1">Try clearing filters or search query.</p>
                    {/* Closes the <td> element so later content is no longer part of this region. */}
                    </td>
                  {/* Closes the <tr> element so later content is no longer part of this region. */}
                  </tr>
                // Continues the component or data expression so its related values and behavior stay grouped together.
                ) : (
                  // Transforms each collection item so the corresponding values or interface elements can be produced.
                  filteredBills.map((bill) => {
                    // Stores the value in overdue so later lines can reuse this data or behavior for the current feature.
                    const overdue = isBillOverdue(bill);
                    // Returns the result so the caller or React receives the value or interface this function provides.
                    return (
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      <tr key={bill.id} className="hover:bg-[#FBF9F7]/70 transition-colors">
                        {/* Bill Number & Category */}
                        {/* Starts the <td> element to organize this part of the interface. */}
                        <td className="py-3.5 px-4">
                          {/* Starts the <div> element to organize this part of the interface. */}
                          <div className="font-bold text-[#323232] flex items-center gap-1.5">
                            {/* Starts the <span> element to organize this part of the interface. */}
                            <span>{bill.billNumber}</span>
                          {/* Closes the <div> element so later content is no longer part of this region. */}
                          </div>
                          {/* Starts the <div> element to organize this part of the interface. */}
                          <div className="text-[11px] text-[#8E827A] flex items-center gap-2 mt-0.5">
                            {/* Starts the <span> element to organize this part of the interface. */}
                            <span>{formatDate(bill.billDate)}</span>
                            {/* Starts the <span> element to organize this part of the interface. */}
                            <span>•</span>
                            {/* Starts the <span> element to organize this part of the interface. */}
                            <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-[#F2ECE6] text-[#595552]">
                              // Continues the component or data expression so its related values and behavior stay grouped together.
                              {bill.category}
                            {/* Closes the <span> element so later content is no longer part of this region. */}
                            </span>
                          {/* Closes the <div> element so later content is no longer part of this region. */}
                          </div>
                        {/* Closes the <td> element so later content is no longer part of this region. */}
                        </td>

                        {/* Project */}
                        {/* Starts the <td> element to organize this part of the interface. */}
                        <td className="py-3.5 px-4">
                          {/* Starts the <div> element to organize this part of the interface. */}
                          <div className="font-semibold text-[#323232]">{bill.projectName}</div>
                          {/* Starts the <div> element to organize this part of the interface. */}
                          <div className="text-[10px] font-mono text-[#8E827A]">{bill.projectCode}</div>
                        {/* Closes the <td> element so later content is no longer part of this region. */}
                        </td>

                        {/* Vendor */}
                        {/* Starts the <td> element to organize this part of the interface. */}
                        <td className="py-3.5 px-4">
                          {/* Starts the <div> element to organize this part of the interface. */}
                          <div className="font-medium text-[#323232]">{bill.vendorName}</div>
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          {bill.vendorGstin && (
                            // Continues the component or data expression so its related values and behavior stay grouped together.
                            <div className="text-[10px] font-mono text-[#8E827A]">GST: {bill.vendorGstin}</div>
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          )}
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          {bill.challanNumber && (
                            // Continues the component or data expression so its related values and behavior stay grouped together.
                            <div className="text-[10px] text-emerald-700 font-mono mt-0.5">Challan: {bill.challanNumber}</div>
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          )}
                        {/* Closes the <td> element so later content is no longer part of this region. */}
                        </td>

                        {/* Due Date */}
                        {/* Starts the <td> element to organize this part of the interface. */}
                        <td className="py-3.5 px-4">
                          {/* Starts the <div> element to organize this part of the interface. */}
                          <div className={`font-medium ${overdue ? 'text-rose-600 font-bold flex items-center gap-1' : 'text-[#595552]'}`}>
                            // Continues the component or data expression so its related values and behavior stay grouped together.
                            {overdue && <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                            {/* Starts the <span> element to organize this part of the interface. */}
                            <span>{formatDate(bill.dueDate || '')}</span>
                          {/* Closes the <div> element so later content is no longer part of this region. */}
                          </div>
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          {overdue && (
                            // Continues the component or data expression so its related values and behavior stay grouped together.
                            <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-1.5 rounded mt-0.5">
                              // Continues the component or data expression so its related values and behavior stay grouped together.
                              Overdue
                            {/* Closes the <span> element so later content is no longer part of this region. */}
                            </span>
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          )}
                        {/* Closes the <td> element so later content is no longer part of this region. */}
                        </td>

                        {/* Amount */}
                        {/* Starts the <td> element to organize this part of the interface. */}
                        <td className="py-3.5 px-4 text-right">
                          {/* Starts the <div> element to organize this part of the interface. */}
                          <div className="font-bold text-[#323232]">{formatINR(bill.totalAmount)}</div>
                          {/* Starts the <div> element to organize this part of the interface. */}
                          <div className="text-[10px] text-[#8E827A]">
                            // Calls this helper or component so the feature can perform the operation or render the control represented here.
                            Base {formatINR(bill.baseAmount)} + {bill.gstPercent}% GST
                          {/* Closes the <div> element so later content is no longer part of this region. */}
                          </div>
                        {/* Closes the <td> element so later content is no longer part of this region. */}
                        </td>

                        {/* Payment Progress */}
                        {/* Starts the <td> element to organize this part of the interface. */}
                        <td className="py-3.5 px-4 min-w-[140px]">
                          {/* Starts the <div> element to organize this part of the interface. */}
                          <div className="flex justify-between text-[11px] mb-1">
                            {/* Starts the <span> element to organize this part of the interface. */}
                            <span className="text-emerald-700 font-medium">Paid: {formatINR(bill.paidAmount)}</span>
                            {/* Starts the <span> element to organize this part of the interface. */}
                            <span className="text-[#8E827A]">Bal: {formatINR(bill.outstandingAmount)}</span>
                          {/* Closes the <div> element so later content is no longer part of this region. */}
                          </div>
                          {/* Starts the <div> element to organize this part of the interface. */}
                          <div className="w-full bg-[#F2ECE6] rounded-full h-1.5 overflow-hidden">
                            {/* Starts the <div> element to organize this part of the interface. */}
                            <div
                              /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                              className="bg-emerald-600 h-full rounded-full transition-all"
                              /* Sets the style property so this element receives the data or behavior required by this screen. */
                              style={{
                                /* Sets the width field so the surrounding object or component receives this setting. */
                                width: `${Math.min(100, (bill.paidAmount / bill.totalAmount) * 100)}%`,
                              /* Continues the component or data expression so its related values and behavior stay grouped together. */
                              }}
                            />
                          {/* Closes the <div> element so later content is no longer part of this region. */}
                          </div>
                        {/* Closes the <td> element so later content is no longer part of this region. */}
                        </td>

                        {/* Status Badge */}
                        {/* Starts the <td> element to organize this part of the interface. */}
                        <td className="py-3.5 px-4 text-center">
                          {/* Starts the <span> element to organize this part of the interface. */}
                          <span
                            /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                            className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              /* Sets the bill.status property so this element receives the data or behavior required by this screen. */
                              bill.status === 'PENDING'
                                /* Continues the component or data expression so its related values and behavior stay grouped together. */
                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                /* Continues the component or data expression so its related values and behavior stay grouped together. */
                                : bill.status === 'APPROVED'
                                /* Continues the component or data expression so its related values and behavior stay grouped together. */
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                /* Continues the component or data expression so its related values and behavior stay grouped together. */
                                : bill.status === 'PARTIALLY_PAID'
                                /* Continues the component or data expression so its related values and behavior stay grouped together. */
                                ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                /* Continues the component or data expression so its related values and behavior stay grouped together. */
                                : bill.status === 'PAID'
                                /* Continues the component or data expression so its related values and behavior stay grouped together. */
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                /* Continues the component or data expression so its related values and behavior stay grouped together. */
                                : 'bg-rose-100 text-rose-800 border border-rose-200'
                            /* Continues the component or data expression so its related values and behavior stay grouped together. */
                            }`}
                          >
                            // Continues the component or data expression so its related values and behavior stay grouped together.
                            {bill.status.replace('_', ' ')}
                          {/* Closes the <span> element so later content is no longer part of this region. */}
                          </span>
                        {/* Closes the <td> element so later content is no longer part of this region. */}
                        </td>

                        {/* Action Buttons */}
                        {/* Starts the <td> element to organize this part of the interface. */}
                        <td className="py-3.5 px-4 text-right">
                          {/* Starts the <div> element to organize this part of the interface. */}
                          <div className="inline-flex items-center gap-1.5">
                            {/* Starts the <button> element to provide an action the user can activate. */}
                            <button
                              /* Connects the Click event to its handler so the interface can respond to interaction. */
                              onClick={() => {
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                setSelectedBill(bill);
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                                setActiveModal('VIEW');
                              /* Continues the component or data expression so its related values and behavior stay grouped together. */
                              }}
                              /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                              className="p-1.5 rounded-lg text-[#595552] hover:text-[#323232] hover:bg-[#F2ECE6] transition-colors"
                              /* Sets the title property so this element receives the data or behavior required by this screen. */
                              title="View Invoice Details"
                            >
                              {/* Starts the <Eye> element to organize this part of the interface. */}
                              <Eye className="w-4 h-4" />
                            {/* Closes the <button> element so later content is no longer part of this region. */}
                            </button>

                            {/* Admin-only Workflow Controls */}
                            // Continues the component or data expression so its related values and behavior stay grouped together.
                            {admin && bill.status === 'PENDING' && (
                              // Continues the component or data expression so its related values and behavior stay grouped together.
                              <>
                                {/* Starts the <button> element to provide an action the user can activate. */}
                                <button
                                  /* Connects the Click event to its handler so the interface can respond to interaction. */
                                  onClick={() => handleOpenApprove(bill)}
                                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-semibold text-[11px] hover:bg-emerald-700 transition-colors shadow-xs"
                                  /* Sets the title property so this element receives the data or behavior required by this screen. */
                                  title="Approve Bill"
                                >
                                  // Continues the component or data expression so its related values and behavior stay grouped together.
                                  Approve
                                {/* Closes the <button> element so later content is no longer part of this region. */}
                                </button>
                                {/* Starts the <button> element to provide an action the user can activate. */}
                                <button
                                  /* Connects the Click event to its handler so the interface can respond to interaction. */
                                  onClick={() => handleOpenReject(bill)}
                                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                                  className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 font-semibold text-[11px] hover:bg-rose-100 transition-colors"
                                  /* Sets the title property so this element receives the data or behavior required by this screen. */
                                  title="Reject Bill"
                                >
                                  // Continues the component or data expression so its related values and behavior stay grouped together.
                                  Reject
                                {/* Closes the <button> element so later content is no longer part of this region. */}
                                </button>
                              {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                              </>
                            // Continues the component or data expression so its related values and behavior stay grouped together.
                            )}

                            // Continues the component or data expression so its related values and behavior stay grouped together.
                            {admin &&
                              // Continues the component or data expression so its related values and behavior stay grouped together.
                              (bill.status === 'APPROVED' || bill.status === 'PARTIALLY_PAID') && (
                                // Continues the component or data expression so its related values and behavior stay grouped together.
                                <button
                                  /* Connects the Click event to its handler so the interface can respond to interaction. */
                                  onClick={() => handleOpenPayment(bill)}
                                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                                  className="px-2.5 py-1 rounded-lg bg-[#323232] text-[#F7F3EE] font-semibold text-[11px] hover:bg-[#1E1E1E] transition-colors shadow-xs"
                                  /* Sets the title property so this element receives the data or behavior required by this screen. */
                                  title="Record Payment"
                                >
                                  // Continues the component or data expression so its related values and behavior stay grouped together.
                                  Pay
                                {/* Closes the <button> element so later content is no longer part of this region. */}
                                </button>
                              // Continues the component or data expression so its related values and behavior stay grouped together.
                              )}
                          {/* Closes the <div> element so later content is no longer part of this region. */}
                          </div>
                        {/* Closes the <td> element so later content is no longer part of this region. */}
                        </td>
                      {/* Closes the <tr> element so later content is no longer part of this region. */}
                      </tr>
                    // Closes this function call or grouped expression so the surrounding code can continue.
                    );
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  })
                // Continues the component or data expression so its related values and behavior stay grouped together.
                )}
              {/* Closes the <tbody> element so later content is no longer part of this region. */}
              </tbody>
            {/* Closes the <table> element so later content is no longer part of this region. */}
            </table>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>

      {/* ===================== MODALS ===================== */}

      {/* 1. VIEW BILL DETAILS MODAL */}
      {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
      {activeModal === 'VIEW' && selectedBill && (
        // Continues the component or data expression so its related values and behavior stay grouped together.
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#323232]/40 backdrop-blur-xs">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E0DA] max-h-[90vh] overflow-y-auto space-y-6">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E0DA]">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-xs uppercase tracking-wider text-[#8E827A] font-semibold">
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  Invoice Overview
                {/* Closes the <span> element so later content is no longer part of this region. */}
                </span>
                {/* Starts the <h3> element to organize this part of the interface. */}
                <h3 className="text-xl font-bold text-[#323232] mt-0.5">
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  {selectedBill.billNumber}
                {/* Closes the <h3> element so later content is no longer part of this region. */}
                </h3>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={() => setActiveModal(null)}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="p-2 rounded-full hover:bg-[#F2ECE6] text-[#8E827A]"
              >
                {/* Starts the <X> element to organize this part of the interface. */}
                <X className="w-5 h-5" />
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Rejection Banner if rejected */}
            // Continues the component or data expression so its related values and behavior stay grouped together.
            {selectedBill.status === 'REJECTED' && selectedBill.rejectionReason && (
              // Continues the component or data expression so its related values and behavior stay grouped together.
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="font-bold flex items-center gap-1.5 mb-1">
                  {/* Starts the <XCircle> element to organize this part of the interface. */}
                  <XCircle className="w-4 h-4 text-rose-600" />
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  Bill Rejected by Admin
                {/* Closes the <span> element so later content is no longer part of this region. */}
                </span>
                {/* Starts the <p> element to organize this part of the interface. */}
                <p>{selectedBill.rejectionReason}</p>
                // Continues the component or data expression so its related values and behavior stay grouped together.
                {selectedBill.approvedBy && (
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  <p className="text-[10px] text-rose-600/80 mt-1">
                    // Calls this helper or component so the feature can perform the operation or render the control represented here.
                    By {selectedBill.approvedBy} on {formatDate(selectedBill.approvedAt || '')}
                  {/* Closes the <p> element so later content is no longer part of this region. */}
                  </p>
                // Continues the component or data expression so its related values and behavior stay grouped together.
                )}
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
            // Continues the component or data expression so its related values and behavior stay grouped together.
            )}

            {/* Grid Breakdown */}
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="p-3.5 rounded-2xl bg-[#FBF9F7] border border-[#E8E0DA]">
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-[#8E827A] font-medium block">Project</span>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="font-bold text-[#323232] text-sm mt-0.5 block">
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  {selectedBill.projectName}
                {/* Closes the <span> element so later content is no longer part of this region. */}
                </span>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-[11px] font-mono text-[#8E827A]">{selectedBill.projectCode}</span>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="p-3.5 rounded-2xl bg-[#FBF9F7] border border-[#E8E0DA]">
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-[#8E827A] font-medium block">Vendor</span>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="font-bold text-[#323232] text-sm mt-0.5 block">
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  {selectedBill.vendorName}
                {/* Closes the <span> element so later content is no longer part of this region. */}
                </span>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-[11px] font-mono text-[#8E827A]">
                  // Sets the GST field so the surrounding object or component receives this setting.
                  GST: {selectedBill.vendorGstin || 'Not registered'}
                {/* Closes the <span> element so later content is no longer part of this region. */}
                </span>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Amount details */}
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="p-4 rounded-2xl bg-[#FBF9F7] border border-[#E8E0DA] space-y-2 text-xs">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="flex justify-between text-[#595552]">
                {/* Starts the <span> element to organize this part of the interface. */}
                <span>Base Amount</span>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="font-semibold text-[#323232]">{formatINR(selectedBill.baseAmount)}</span>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="flex justify-between text-[#595552]">
                {/* Starts the <span> element to organize this part of the interface. */}
                <span>GST ({selectedBill.gstPercent}%)</span>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="font-semibold text-[#323232]">{formatINR(selectedBill.gstAmount)}</span>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="pt-2 border-t border-[#E8E0DA] flex justify-between text-sm font-bold text-[#323232]">
                {/* Starts the <span> element to organize this part of the interface. */}
                <span>Total Invoice Value</span>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span>{formatINR(selectedBill.totalAmount)}</span>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="flex justify-between text-emerald-700 font-semibold pt-1">
                {/* Starts the <span> element to organize this part of the interface. */}
                <span>Total Amount Paid</span>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span>{formatINR(selectedBill.paidAmount)}</span>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="flex justify-between text-amber-700 font-semibold">
                {/* Starts the <span> element to organize this part of the interface. */}
                <span>Remaining Outstanding</span>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span>{formatINR(selectedBill.outstandingAmount)}</span>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Description & Challan */}
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="space-y-2 text-xs">
              {/* Starts the <span> element to organize this part of the interface. */}
              <span className="font-bold text-[#323232]">Description / Line Items</span>
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="text-[#595552] p-3 rounded-xl bg-[#FBF9F7] border border-[#E8E0DA]">
                // Continues the component or data expression so its related values and behavior stay grouped together.
                {selectedBill.description || 'No description provided.'}
              {/* Closes the <p> element so later content is no longer part of this region. */}
              </p>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              {selectedBill.challanNumber && (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <div className="flex items-center gap-2 text-[#595552] text-xs pt-1">
                  {/* Starts the <FileText> element to organize this part of the interface. */}
                  <FileText className="w-4 h-4 text-[#8E827A]" />
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span>Verified Delivery Challan: <strong>{selectedBill.challanNumber}</strong></span>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              )}
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Payment History Log */}
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="space-y-2 text-xs">
              {/* Starts the <span> element to organize this part of the interface. */}
              <span className="font-bold text-[#323232] block">Payment History ({selectedBill.payments.length})</span>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              {selectedBill.payments.length === 0 ? (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <p className="text-[#8E827A] italic">No payments recorded yet.</p>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              ) : (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <div className="divide-y divide-[#E8E0DA] border border-[#E8E0DA] rounded-xl overflow-hidden">
                  // Transforms each collection item so the corresponding values or interface elements can be produced.
                  {selectedBill.payments.map((pay) => (
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    <div key={pay.id} className="p-3 bg-white flex justify-between items-center text-xs">
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div>
                        {/* Starts the <div> element to organize this part of the interface. */}
                        <div className="font-bold text-emerald-800">{formatINR(pay.amount)}</div>
                        {/* Starts the <div> element to organize this part of the interface. */}
                        <div className="text-[10px] text-[#8E827A]">
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          {pay.mode} • Ref: {pay.referenceNumber || 'N/A'} • {formatDate(pay.paymentDate)}
                        {/* Closes the <div> element so later content is no longer part of this region. */}
                        </div>
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
                      {/* Starts the <span> element to organize this part of the interface. */}
                      <span className="text-[10px] text-[#8E827A]">Recorded by {pay.recordedBy}</span>
                    {/* Closes the <div> element so later content is no longer part of this region. */}
                    </div>
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  ))}
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              )}
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex justify-end pt-4 border-t border-[#E8E0DA] gap-3">
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={() => setActiveModal(null)}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="px-5 py-2.5 rounded-full border border-[#E8E0DA] text-xs font-semibold text-[#595552] hover:bg-[#F2ECE6]"
              >
                // Continues the component or data expression so its related values and behavior stay grouped together.
                Close
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
      // Continues the component or data expression so its related values and behavior stay grouped together.
      )}

      {/* 2. APPROVE MODAL */}
      {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
      {activeModal === 'APPROVE' && selectedBill && (
        // Continues the component or data expression so its related values and behavior stay grouped together.
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#323232]/40 backdrop-blur-xs">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E0DA] space-y-4">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center gap-3 text-emerald-700">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold">
                {/* Starts the <Check> element to organize this part of the interface. */}
                <Check className="w-5 h-5 text-emerald-700" />
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <h3> element to organize this part of the interface. */}
                <h3 className="font-bold text-base text-[#323232]">Approve Invoice</h3>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-xs text-[#8E827A]">{selectedBill.billNumber}</span>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-xs text-[#595552] leading-relaxed">
              {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
              Are you sure you want to approve this invoice from <strong>{selectedBill.vendorName}</strong> for{' '}
              {/* Starts the <strong> element to organize this part of the interface. */}
              <strong>{formatINR(selectedBill.totalAmount)}</strong> on{' '}
              {/* Starts the <strong> element to organize this part of the interface. */}
              <strong>{selectedBill.projectName}</strong>?
            {/* Closes the <p> element so later content is no longer part of this region. */}
            </p>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-[11px] text-[#8E827A]">
              // Continues the component or data expression so its related values and behavior stay grouped together.
              Approving this bill will add it to the project's committed spend and allow payments to be released.
            {/* Closes the <p> element so later content is no longer part of this region. */}
            </p>

            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#E8E0DA]">
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={() => setActiveModal(null)}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="px-4 py-2 rounded-full border border-[#E8E0DA] text-xs font-semibold text-[#595552] hover:bg-[#F2ECE6]"
              >
                // Continues the component or data expression so its related values and behavior stay grouped together.
                Cancel
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={handleConfirmApprove}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="px-5 py-2 rounded-full bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-xs"
              >
                // Continues the component or data expression so its related values and behavior stay grouped together.
                Confirm Approval
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
      // Continues the component or data expression so its related values and behavior stay grouped together.
      )}

      {/* 3. REJECT MODAL */}
      {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
      {activeModal === 'REJECT' && selectedBill && (
        // Continues the component or data expression so its related values and behavior stay grouped together.
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#323232]/40 backdrop-blur-xs">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E0DA] space-y-4">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center gap-3 text-rose-700">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center font-bold">
                {/* Starts the <X> element to organize this part of the interface. */}
                <X className="w-5 h-5 text-rose-700" />
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <h3> element to organize this part of the interface. */}
                <h3 className="font-bold text-base text-[#323232]">Reject Invoice</h3>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-xs text-[#8E827A]">{selectedBill.billNumber}</span>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-xs text-[#595552]">
              // Continues the component or data expression so its related values and behavior stay grouped together.
              Please state why this bill is being rejected. The submitting Project Manager will be notified with this reason.
            {/* Closes the <p> element so later content is no longer part of this region. */}
            </p>

            {/* Starts the <div> element to organize this part of the interface. */}
            <div>
              {/* Starts the <label> element to name a form control for users and assistive technology. */}
              <label className="block text-xs font-semibold text-[#323232] mb-1">
                // Continues the component or data expression so its related values and behavior stay grouped together.
                Rejection Reason *
              {/* Closes the <label> element so later content is no longer part of this region. */}
              </label>
              {/* Starts the <textarea> element to collect or display a value. */}
              <textarea
                /* Sets the rows property so this element receives the data or behavior required by this screen. */
                rows={3}
                /* Supplies the value shown by this form control so the user sees the current data. */
                value={rejectReason}
                /* Connects the Change event to its handler so the interface can respond to interaction. */
                onChange={(e) => {
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  setRejectReason(e.target.value);
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                  setRejectError('');
                /* Continues the component or data expression so its related values and behavior stay grouped together. */
                }}
                /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                placeholder="e.g. Quantity mismatch with site challan, wrong GSTIN, or unauthorized rate."
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="w-full p-3 rounded-xl border border-[#E8E0DA] text-xs text-[#323232] focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              // Continues the component or data expression so its related values and behavior stay grouped together.
              {rejectError && <p className="text-xs text-rose-600 mt-1">{rejectError}</p>}
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#E8E0DA]">
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={() => setActiveModal(null)}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="px-4 py-2 rounded-full border border-[#E8E0DA] text-xs font-semibold text-[#595552] hover:bg-[#F2ECE6]"
              >
                // Continues the component or data expression so its related values and behavior stay grouped together.
                Cancel
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={handleConfirmReject}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="px-5 py-2 rounded-full bg-rose-700 text-white text-xs font-semibold hover:bg-rose-800 transition-colors shadow-xs"
              >
                // Continues the component or data expression so its related values and behavior stay grouped together.
                Confirm Rejection
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
      // Continues the component or data expression so its related values and behavior stay grouped together.
      )}

      {/* 4. RECORD PAYMENT MODAL */}
      {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
      {activeModal === 'PAYMENT' && selectedBill && (
        // Continues the component or data expression so its related values and behavior stay grouped together.
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#323232]/40 backdrop-blur-xs">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E0DA] space-y-4">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E0DA]">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-xs uppercase tracking-wider text-[#8E827A] font-semibold">
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  Record Payout
                {/* Closes the <span> element so later content is no longer part of this region. */}
                </span>
                {/* Starts the <h3> element to organize this part of the interface. */}
                <h3 className="font-bold text-base text-[#323232] mt-0.5">
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  {selectedBill.billNumber} — {selectedBill.vendorName}
                {/* Closes the <h3> element so later content is no longer part of this region. */}
                </h3>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button onClick={() => setActiveModal(null)} className="text-[#8E827A] hover:text-[#323232]">
                {/* Starts the <X> element to organize this part of the interface. */}
                <X className="w-5 h-5" />
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="p-3 rounded-xl bg-[#FBF9F7] text-xs flex justify-between">
              {/* Starts the <span> element to organize this part of the interface. */}
              <span className="text-[#8E827A]">Outstanding Balance</span>
              {/* Starts the <span> element to organize this part of the interface. */}
              <span className="font-bold text-[#323232]">{formatINR(selectedBill.outstandingAmount)}</span>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="space-y-3 text-xs">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label className="block font-semibold text-[#323232] mb-1">Payment Amount (₹) *</label>
                {/* Starts the <input> element to collect or display a value. */}
                <input
                  /* Chooses the element’s browser behavior, such as a button action or input format. */
                  type="number"
                  /* Supplies the value shown by this form control so the user sees the current data. */
                  value={paymentAmount}
                  /* Connects the Change event to its handler so the interface can respond to interaction. */
                  onChange={(e) => {
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    setPaymentAmount(Number(e.target.value));
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                    setPaymentError('');
                  /* Continues the component or data expression so its related values and behavior stay grouped together. */
                  }}
                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                  className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs font-bold text-[#323232]"
                />
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label className="block font-semibold text-[#323232] mb-1">Payment Mode</label>
                {/* Starts the <select> element to collect or display a value. */}
                <select
                  /* Supplies the value shown by this form control so the user sees the current data. */
                  value={paymentMode}
                  /* Connects the Change event to its handler so the interface can respond to interaction. */
                  onChange={(e) => setPaymentMode(e.target.value as PaymentMode)}
                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                  className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                >
                  {/* Starts the <option> element to organize this part of the interface. */}
                  <option value="BANK_TRANSFER">Bank Transfer (NEFT / RTGS / IMPS)</option>
                  {/* Starts the <option> element to organize this part of the interface. */}
                  <option value="CHEQUE">Cheque</option>
                  {/* Starts the <option> element to organize this part of the interface. */}
                  <option value="UPI">UPI</option>
                  {/* Starts the <option> element to organize this part of the interface. */}
                  <option value="CASH">Cash</option>
                  {/* Starts the <option> element to organize this part of the interface. */}
                  <option value="OTHER">Other</option>
                {/* Closes the <select> element so later content is no longer part of this region. */}
                </select>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label className="block font-semibold text-[#323232] mb-1">Reference / UTR / Cheque Number</label>
                {/* Starts the <input> element to collect or display a value. */}
                <input
                  /* Chooses the element’s browser behavior, such as a button action or input format. */
                  type="text"
                  /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                  placeholder="e.g. UTR-HDFC-991204"
                  /* Supplies the value shown by this form control so the user sees the current data. */
                  value={paymentRef}
                  /* Connects the Change event to its handler so the interface can respond to interaction. */
                  onChange={(e) => setPaymentRef(e.target.value)}
                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                  className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                />
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label className="block font-semibold text-[#323232] mb-1">Payment Date</label>
                {/* Starts the <input> element to collect or display a value. */}
                <input
                  /* Chooses the element’s browser behavior, such as a button action or input format. */
                  type="date"
                  /* Supplies the value shown by this form control so the user sees the current data. */
                  value={paymentDate}
                  /* Connects the Change event to its handler so the interface can respond to interaction. */
                  onChange={(e) => setPaymentDate(e.target.value)}
                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                  className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                />
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label className="block font-semibold text-[#323232] mb-1">Remarks (Optional)</label>
                {/* Starts the <input> element to collect or display a value. */}
                <input
                  /* Chooses the element’s browser behavior, such as a button action or input format. */
                  type="text"
                  /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                  placeholder="e.g. Part payment against 800 bags cement delivery"
                  /* Supplies the value shown by this form control so the user sees the current data. */
                  value={paymentRemarks}
                  /* Connects the Change event to its handler so the interface can respond to interaction. */
                  onChange={(e) => setPaymentRemarks(e.target.value)}
                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                  className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                />
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              // Continues the component or data expression so its related values and behavior stay grouped together.
              {paymentError && <p className="text-xs text-rose-600 mt-1">{paymentError}</p>}
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#E8E0DA]">
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={() => setActiveModal(null)}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="px-4 py-2 rounded-full border border-[#E8E0DA] text-xs font-semibold text-[#595552] hover:bg-[#F2ECE6]"
              >
                // Continues the component or data expression so its related values and behavior stay grouped together.
                Cancel
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={handleConfirmPayment}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="px-5 py-2 rounded-full bg-[#323232] text-[#F7F3EE] text-xs font-semibold hover:bg-[#1E1E1E] transition-colors shadow-xs"
              >
                // Continues the component or data expression so its related values and behavior stay grouped together.
                Record Payout
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
      // Continues the component or data expression so its related values and behavior stay grouped together.
      )}

      {/* 5. CREATE / UPLOAD BILL MODAL */}
      {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
      {activeModal === 'CREATE' && (
        // Continues the component or data expression so its related values and behavior stay grouped together.
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#323232]/40 backdrop-blur-xs">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E0DA] max-h-[90vh] overflow-y-auto space-y-4">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E0DA]">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-xs uppercase tracking-wider text-[#8E827A] font-semibold">
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  Invoice Submission
                {/* Closes the <span> element so later content is no longer part of this region. */}
                </span>
                {/* Starts the <h3> element to organize this part of the interface. */}
                <h3 className="font-bold text-base text-[#323232] mt-0.5">
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  Upload / Submit New Bill
                {/* Closes the <h3> element so later content is no longer part of this region. */}
                </h3>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button onClick={() => setActiveModal(null)} className="text-[#8E827A] hover:text-[#323232]">
                {/* Starts the <X> element to organize this part of the interface. */}
                <X className="w-5 h-5" />
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="space-y-3 text-xs">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label className="block font-semibold text-[#323232] mb-1">Target Project *</label>
                {/* Starts the <select> element to collect or display a value. */}
                <select
                  /* Supplies the value shown by this form control so the user sees the current data. */
                  value={newProjectId}
                  /* Connects the Change event to its handler so the interface can respond to interaction. */
                  onChange={(e) => setNewProjectId(e.target.value)}
                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                  className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                >
                  // Transforms each collection item so the corresponding values or interface elements can be produced.
                  {projectList.map((p) => (
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    <option key={p.id} value={p.id}>
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      {p.name} ({p.code})
                    {/* Closes the <option> element so later content is no longer part of this region. */}
                    </option>
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  ))}
                {/* Closes the <select> element so later content is no longer part of this region. */}
                </select>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="grid grid-cols-2 gap-3">
                {/* Starts the <div> element to organize this part of the interface. */}
                <div>
                  {/* Starts the <label> element to name a form control for users and assistive technology. */}
                  <label className="block font-semibold text-[#323232] mb-1">Vendor Name *</label>
                  {/* Starts the <input> element to collect or display a value. */}
                  <input
                    /* Chooses the element’s browser behavior, such as a button action or input format. */
                    type="text"
                    /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                    placeholder="e.g. UltraTech Cement"
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value={newVendorName}
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => {
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      setNewVendorName(e.target.value);
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      setCreateError('');
                    /* Continues the component or data expression so its related values and behavior stay grouped together. */
                    }}
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                  />
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div>
                  {/* Starts the <label> element to name a form control for users and assistive technology. */}
                  <label className="block font-semibold text-[#323232] mb-1">Vendor GSTIN (Optional)</label>
                  {/* Starts the <input> element to collect or display a value. */}
                  <input
                    /* Chooses the element’s browser behavior, such as a button action or input format. */
                    type="text"
                    /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                    placeholder="e.g. 07AAACU8044B1Z5"
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value={newVendorGstin}
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => setNewVendorGstin(e.target.value)}
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                  />
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="grid grid-cols-2 gap-3">
                {/* Starts the <div> element to organize this part of the interface. */}
                <div>
                  {/* Starts the <label> element to name a form control for users and assistive technology. */}
                  <label className="block font-semibold text-[#323232] mb-1">Bill / Invoice # *</label>
                  {/* Starts the <input> element to collect or display a value. */}
                  <input
                    /* Chooses the element’s browser behavior, such as a button action or input format. */
                    type="text"
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value={newBillNumber}
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => {
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      setNewBillNumber(e.target.value);
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                      setCreateError('');
                    /* Continues the component or data expression so its related values and behavior stay grouped together. */
                    }}
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                  />
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div>
                  {/* Starts the <label> element to name a form control for users and assistive technology. */}
                  <label className="block font-semibold text-[#323232] mb-1">Expense Category</label>
                  {/* Starts the <select> element to collect or display a value. */}
                  <select
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value={newCategory}
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => setNewCategory(e.target.value as BillCategory)}
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                  >
                    // Transforms each collection item so the corresponding values or interface elements can be produced.
                    {CATEGORIES.map((cat) => (
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      <option key={cat} value={cat}>
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        {cat}
                      {/* Closes the <option> element so later content is no longer part of this region. */}
                      </option>
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    ))}
                  {/* Closes the <select> element so later content is no longer part of this region. */}
                  </select>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="grid grid-cols-2 gap-3">
                {/* Starts the <div> element to organize this part of the interface. */}
                <div>
                  {/* Starts the <label> element to name a form control for users and assistive technology. */}
                  <label className="block font-semibold text-[#323232] mb-1">Bill Date</label>
                  {/* Starts the <input> element to collect or display a value. */}
                  <input
                    /* Chooses the element’s browser behavior, such as a button action or input format. */
                    type="date"
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value={newBillDate}
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => setNewBillDate(e.target.value)}
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                  />
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div>
                  {/* Starts the <label> element to name a form control for users and assistive technology. */}
                  <label className="block font-semibold text-[#323232] mb-1">Due Date</label>
                  {/* Starts the <input> element to collect or display a value. */}
                  <input
                    /* Chooses the element’s browser behavior, such as a button action or input format. */
                    type="date"
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value={newDueDate}
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => setNewDueDate(e.target.value)}
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                  />
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Amounts & GST Calculation */}
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="p-3 rounded-2xl bg-[#FBF9F7] border border-[#E8E0DA] space-y-2">
                {/* Starts the <div> element to organize this part of the interface. */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Starts the <div> element to organize this part of the interface. */}
                  <div>
                    {/* Starts the <label> element to name a form control for users and assistive technology. */}
                    <label className="block font-semibold text-[#323232] mb-1">Base Amount (₹) *</label>
                    {/* Starts the <input> element to collect or display a value. */}
                    <input
                      /* Chooses the element’s browser behavior, such as a button action or input format. */
                      type="number"
                      /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                      placeholder="0"
                      /* Supplies the value shown by this form control so the user sees the current data. */
                      value={newBaseAmount || ''}
                      /* Connects the Change event to its handler so the interface can respond to interaction. */
                      onChange={(e) => {
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        setNewBaseAmount(Number(e.target.value));
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        /* Calls this helper or component so the feature can perform the operation or render the control represented here. */
                        setCreateError('');
                      /* Continues the component or data expression so its related values and behavior stay grouped together. */
                      }}
                      /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                      className="w-full p-2 rounded-lg border border-[#E8E0DA] text-xs font-bold text-[#323232]"
                    />
                  {/* Closes the <div> element so later content is no longer part of this region. */}
                  </div>
                  {/* Starts the <div> element to organize this part of the interface. */}
                  <div>
                    {/* Starts the <label> element to name a form control for users and assistive technology. */}
                    <label className="block font-semibold text-[#323232] mb-1">GST Rate (%)</label>
                    {/* Starts the <select> element to collect or display a value. */}
                    <select
                      /* Supplies the value shown by this form control so the user sees the current data. */
                      value={newGstPercent}
                      /* Connects the Change event to its handler so the interface can respond to interaction. */
                      onChange={(e) => setNewGstPercent(Number(e.target.value))}
                      /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                      className="w-full p-2 rounded-lg border border-[#E8E0DA] text-xs text-[#323232]"
                    >
                      // Transforms each collection item so the corresponding values or interface elements can be produced.
                      {GST_RATES.map((rate) => (
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        <option key={rate} value={rate}>
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          {rate}% GST
                        {/* Closes the <option> element so later content is no longer part of this region. */}
                        </option>
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      ))}
                    {/* Closes the <select> element so later content is no longer part of this region. */}
                    </select>
                  {/* Closes the <div> element so later content is no longer part of this region. */}
                  </div>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>

                {/* Starts the <div> element to organize this part of the interface. */}
                <div className="flex justify-between text-xs text-[#595552] pt-2 border-t border-[#E8E0DA]">
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span>GST Amount:</span>
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span className="font-bold text-[#323232]">
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    {formatINR(Math.round(newBaseAmount * (newGstPercent / 100)))}
                  {/* Closes the <span> element so later content is no longer part of this region. */}
                  </span>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div className="flex justify-between text-sm text-[#323232] font-bold">
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span>Computed Total:</span>
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span className="text-emerald-700">
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    {formatINR(Math.round(newBaseAmount * (1 + newGstPercent / 100)))}
                  {/* Closes the <span> element so later content is no longer part of this region. */}
                  </span>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label className="block font-semibold text-[#323232] mb-1">Delivery Challan / GRN Ref (Optional)</label>
                {/* Starts the <input> element to collect or display a value. */}
                <input
                  /* Chooses the element’s browser behavior, such as a button action or input format. */
                  type="text"
                  /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                  placeholder="e.g. CH-8812"
                  /* Supplies the value shown by this form control so the user sees the current data. */
                  value={newChallan}
                  /* Connects the Change event to its handler so the interface can respond to interaction. */
                  onChange={(e) => setNewChallan(e.target.value)}
                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                  className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                />
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label className="block font-semibold text-[#323232] mb-1">Description / Notes</label>
                {/* Starts the <textarea> element to collect or display a value. */}
                <textarea
                  /* Sets the rows property so this element receives the data or behavior required by this screen. */
                  rows={2}
                  /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                  placeholder="e.g. Cement bags for 5th floor beam casting"
                  /* Supplies the value shown by this form control so the user sees the current data. */
                  value={newDescription}
                  /* Connects the Change event to its handler so the interface can respond to interaction. */
                  onChange={(e) => setNewDescription(e.target.value)}
                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                  className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232]"
                />
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              // Continues the component or data expression so its related values and behavior stay grouped together.
              {createError && <p className="text-xs text-rose-600 mt-1">{createError}</p>}
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#E8E0DA]">
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={() => setActiveModal(null)}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="px-4 py-2 rounded-full border border-[#E8E0DA] text-xs font-semibold text-[#595552] hover:bg-[#F2ECE6]"
              >
                // Continues the component or data expression so its related values and behavior stay grouped together.
                Cancel
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={handleConfirmCreate}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="px-5 py-2 rounded-full bg-[#323232] text-[#F7F3EE] text-xs font-semibold hover:bg-[#1E1E1E] transition-colors shadow-xs"
              >
                // Continues the component or data expression so its related values and behavior stay grouped together.
                Submit for Approval
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
      // Continues the component or data expression so its related values and behavior stay grouped together.
      )}
    {/* Closes the <AppShell> element so later content is no longer part of this region. */}
    </AppShell>
  // Closes this function call or grouped expression so the surrounding code can continue.
  );
// Closes the current block or object so the grouped statements or settings end here.
}
// Exports BillsPage as this file’s default value so other modules can load the main feature.
export default BillsPage;
