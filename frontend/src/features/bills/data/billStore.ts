// Imports type  Bill, Payment, PaymentMode from ../types/bill so this module can reuse that component, helper, or library.
import type { Bill, Payment, PaymentMode } from '../types/bill';

// Stores the value in STORAGE_KEY so later lines can reuse this data or behavior for the current feature.
const STORAGE_KEY = 'forgeos_bills';

// Stores the value in initialBills so later lines can reuse this data or behavior for the current feature.
export const initialBills: Bill[] = [
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 'BILL-001',
    // Sets the projectId field so the surrounding object or component receives this setting.
    projectId: '1',
    // Sets the projectCode field so the surrounding object or component receives this setting.
    projectCode: 'PRJ-001',
    // Sets the projectName field so the surrounding object or component receives this setting.
    projectName: 'Green Valley Residency',
    // Sets the vendorName field so the surrounding object or component receives this setting.
    vendorName: 'UltraTech Cement Ltd',
    // Sets the vendorGstin field so the surrounding object or component receives this setting.
    vendorGstin: '07AAACU8044B1Z5',
    // Sets the billNumber field so the surrounding object or component receives this setting.
    billNumber: 'INV-UTC-2026-891',
    // Sets the billDate field so the surrounding object or component receives this setting.
    billDate: '2026-10-25',
    // Sets the dueDate field so the surrounding object or component receives this setting.
    dueDate: '2026-11-20',
    // Sets the category field so the surrounding object or component receives this setting.
    category: 'MATERIAL',
    // Sets the description field so the surrounding object or component receives this setting.
    description: '1,200 bags OPC 53 grade cement for 4th slab casting',
    // Sets the baseAmount field so the surrounding object or component receives this setting.
    baseAmount: 450000,
    // Sets the gstPercent field so the surrounding object or component receives this setting.
    gstPercent: 18,
    // Sets the gstAmount field so the surrounding object or component receives this setting.
    gstAmount: 81000,
    // Sets the totalAmount field so the surrounding object or component receives this setting.
    totalAmount: 531000,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'PENDING',
    // Sets the submittedBy field so the surrounding object or component receives this setting.
    submittedBy: 'Aarav Sharma (PM)',
    // Sets the submittedAt field so the surrounding object or component receives this setting.
    submittedAt: '2026-10-26T10:15:00Z',
    // Sets the paidAmount field so the surrounding object or component receives this setting.
    paidAmount: 0,
    // Sets the outstandingAmount field so the surrounding object or component receives this setting.
    outstandingAmount: 531000,
    // Sets the payments field so the surrounding object or component receives this setting.
    payments: [],
    // Sets the challanNumber field so the surrounding object or component receives this setting.
    challanNumber: 'CH-8821',
    // Sets the fileAttachmentName field so the surrounding object or component receives this setting.
    fileAttachmentName: 'UltraTech_Challan_8821.pdf',
  // Closes the current block or object so the grouped statements or settings end here.
  },
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 'BILL-002',
    // Sets the projectId field so the surrounding object or component receives this setting.
    projectId: '1',
    // Sets the projectCode field so the surrounding object or component receives this setting.
    projectCode: 'PRJ-001',
    // Sets the projectName field so the surrounding object or component receives this setting.
    projectName: 'Green Valley Residency',
    // Sets the vendorName field so the surrounding object or component receives this setting.
    vendorName: 'Kamdhenu Steel Traders',
    // Sets the vendorGstin field so the surrounding object or component receives this setting.
    vendorGstin: '07AABCK1234M1Z2',
    // Sets the billNumber field so the surrounding object or component receives this setting.
    billNumber: 'KST-2026-104',
    // Sets the billDate field so the surrounding object or component receives this setting.
    billDate: '2026-10-10',
    // Sets the dueDate field so the surrounding object or component receives this setting.
    dueDate: '2026-11-05', // Overdue
    // Sets the category field so the surrounding object or component receives this setting.
    category: 'MATERIAL',
    // Sets the description field so the surrounding object or component receives this setting.
    description: '15 Tonnes Fe 550D TMT Rebars',
    // Sets the baseAmount field so the surrounding object or component receives this setting.
    baseAmount: 920000,
    // Sets the gstPercent field so the surrounding object or component receives this setting.
    gstPercent: 18,
    // Sets the gstAmount field so the surrounding object or component receives this setting.
    gstAmount: 165600,
    // Sets the totalAmount field so the surrounding object or component receives this setting.
    totalAmount: 1085600,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'APPROVED',
    // Sets the submittedBy field so the surrounding object or component receives this setting.
    submittedBy: 'Aarav Sharma (PM)',
    // Sets the submittedAt field so the surrounding object or component receives this setting.
    submittedAt: '2026-10-11T09:00:00Z',
    // Sets the approvedBy field so the surrounding object or component receives this setting.
    approvedBy: 'Rakesh Verma (Admin)',
    // Sets the approvedAt field so the surrounding object or component receives this setting.
    approvedAt: '2026-10-12T14:30:00Z',
    // Sets the paidAmount field so the surrounding object or component receives this setting.
    paidAmount: 0,
    // Sets the outstandingAmount field so the surrounding object or component receives this setting.
    outstandingAmount: 1085600,
    // Sets the payments field so the surrounding object or component receives this setting.
    payments: [],
    // Sets the challanNumber field so the surrounding object or component receives this setting.
    challanNumber: 'CH-4910',
    // Sets the fileAttachmentName field so the surrounding object or component receives this setting.
    fileAttachmentName: 'Kamdhenu_Invoice_104.pdf',
  // Closes the current block or object so the grouped statements or settings end here.
  },
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 'BILL-003',
    // Sets the projectId field so the surrounding object or component receives this setting.
    projectId: '1',
    // Sets the projectCode field so the surrounding object or component receives this setting.
    projectCode: 'PRJ-001',
    // Sets the projectName field so the surrounding object or component receives this setting.
    projectName: 'Green Valley Residency',
    // Sets the vendorName field so the surrounding object or component receives this setting.
    vendorName: 'Shree Ram RMC Plant',
    // Sets the vendorGstin field so the surrounding object or component receives this setting.
    vendorGstin: '07AAACS4321K1Z1',
    // Sets the billNumber field so the surrounding object or component receives this setting.
    billNumber: 'RMC-NOV-019',
    // Sets the billDate field so the surrounding object or component receives this setting.
    billDate: '2026-10-15',
    // Sets the dueDate field so the surrounding object or component receives this setting.
    dueDate: '2026-11-15',
    // Sets the category field so the surrounding object or component receives this setting.
    category: 'MATERIAL',
    // Sets the description field so the surrounding object or component receives this setting.
    description: 'M25 Ready Mix Concrete (85 cum)',
    // Sets the baseAmount field so the surrounding object or component receives this setting.
    baseAmount: 340000,
    // Sets the gstPercent field so the surrounding object or component receives this setting.
    gstPercent: 18,
    // Sets the gstAmount field so the surrounding object or component receives this setting.
    gstAmount: 61200,
    // Sets the totalAmount field so the surrounding object or component receives this setting.
    totalAmount: 401200,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'PARTIALLY_PAID',
    // Sets the submittedBy field so the surrounding object or component receives this setting.
    submittedBy: 'Aarav Sharma (PM)',
    // Sets the submittedAt field so the surrounding object or component receives this setting.
    submittedAt: '2026-10-16T11:20:00Z',
    // Sets the approvedBy field so the surrounding object or component receives this setting.
    approvedBy: 'Rakesh Verma (Admin)',
    // Sets the approvedAt field so the surrounding object or component receives this setting.
    approvedAt: '2026-10-17T16:00:00Z',
    // Sets the paidAmount field so the surrounding object or component receives this setting.
    paidAmount: 200000,
    // Sets the outstandingAmount field so the surrounding object or component receives this setting.
    outstandingAmount: 201200,
    // Sets the payments field so the surrounding object or component receives this setting.
    payments: [
      // Opens a block or object so its related statements or settings can be grouped together.
      {
        // Sets the id field so the surrounding object or component receives this setting.
        id: 'PAY-001',
        // Sets the billId field so the surrounding object or component receives this setting.
        billId: 'BILL-003',
        // Sets the amount field so the surrounding object or component receives this setting.
        amount: 200000,
        // Sets the paymentDate field so the surrounding object or component receives this setting.
        paymentDate: '2026-10-28',
        // Sets the mode field so the surrounding object or component receives this setting.
        mode: 'BANK_TRANSFER',
        // Sets the referenceNumber field so the surrounding object or component receives this setting.
        referenceNumber: 'NEFT-HDFC-991823',
        // Sets the remarks field so the surrounding object or component receives this setting.
        remarks: 'Part payment as per delivery verification',
        // Sets the recordedBy field so the surrounding object or component receives this setting.
        recordedBy: 'Rakesh Verma (Admin)',
        // Sets the createdAt field so the surrounding object or component receives this setting.
        createdAt: '2026-10-28T12:00:00Z',
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
    // Sets the challanNumber field so the surrounding object or component receives this setting.
    challanNumber: 'RMC-CH-092',
    // Sets the fileAttachmentName field so the surrounding object or component receives this setting.
    fileAttachmentName: 'RMC_Challan_019.pdf',
  // Closes the current block or object so the grouped statements or settings end here.
  },
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 'BILL-004',
    // Sets the projectId field so the surrounding object or component receives this setting.
    projectId: '2',
    // Sets the projectCode field so the surrounding object or component receives this setting.
    projectCode: 'PRJ-002',
    // Sets the projectName field so the surrounding object or component receives this setting.
    projectName: 'Skyline Commercial Hub',
    // Sets the vendorName field so the surrounding object or component receives this setting.
    vendorName: 'L&T Heavy Machinery Rentals',
    // Sets the vendorGstin field so the surrounding object or component receives this setting.
    vendorGstin: '27AAACL0123P1Z9',
    // Sets the billNumber field so the surrounding object or component receives this setting.
    billNumber: 'LNT-EQ-4491',
    // Sets the billDate field so the surrounding object or component receives this setting.
    billDate: '2026-10-20',
    // Sets the dueDate field so the surrounding object or component receives this setting.
    dueDate: '2026-11-25',
    // Sets the category field so the surrounding object or component receives this setting.
    category: 'MACHINERY',
    // Sets the description field so the surrounding object or component receives this setting.
    description: 'Tower Crane & Boom Placer Monthly Hire',
    // Sets the baseAmount field so the surrounding object or component receives this setting.
    baseAmount: 280000,
    // Sets the gstPercent field so the surrounding object or component receives this setting.
    gstPercent: 18,
    // Sets the gstAmount field so the surrounding object or component receives this setting.
    gstAmount: 50400,
    // Sets the totalAmount field so the surrounding object or component receives this setting.
    totalAmount: 330400,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'PENDING',
    // Sets the submittedBy field so the surrounding object or component receives this setting.
    submittedBy: 'Priya Mehta (PM)',
    // Sets the submittedAt field so the surrounding object or component receives this setting.
    submittedAt: '2026-10-21T15:45:00Z',
    // Sets the paidAmount field so the surrounding object or component receives this setting.
    paidAmount: 0,
    // Sets the outstandingAmount field so the surrounding object or component receives this setting.
    outstandingAmount: 330400,
    // Sets the payments field so the surrounding object or component receives this setting.
    payments: [],
    // Sets the fileAttachmentName field so the surrounding object or component receives this setting.
    fileAttachmentName: 'LNT_Machinery_Invoice.pdf',
  // Closes the current block or object so the grouped statements or settings end here.
  },
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 'BILL-005',
    // Sets the projectId field so the surrounding object or component receives this setting.
    projectId: '2',
    // Sets the projectCode field so the surrounding object or component receives this setting.
    projectCode: 'PRJ-002',
    // Sets the projectName field so the surrounding object or component receives this setting.
    projectName: 'Skyline Commercial Hub',
    // Sets the vendorName field so the surrounding object or component receives this setting.
    vendorName: 'Jindal Steel & Power',
    // Sets the vendorGstin field so the surrounding object or component receives this setting.
    vendorGstin: '27AAACJ5512B1Z8',
    // Sets the billNumber field so the surrounding object or component receives this setting.
    billNumber: 'JSP-DL-9921',
    // Sets the billDate field so the surrounding object or component receives this setting.
    billDate: '2026-09-28',
    // Sets the dueDate field so the surrounding object or component receives this setting.
    dueDate: '2026-10-28', // Overdue
    // Sets the category field so the surrounding object or component receives this setting.
    category: 'MATERIAL',
    // Sets the description field so the surrounding object or component receives this setting.
    description: 'Structural Steel Beams (22 Tonnes)',
    // Sets the baseAmount field so the surrounding object or component receives this setting.
    baseAmount: 1450000,
    // Sets the gstPercent field so the surrounding object or component receives this setting.
    gstPercent: 18,
    // Sets the gstAmount field so the surrounding object or component receives this setting.
    gstAmount: 261000,
    // Sets the totalAmount field so the surrounding object or component receives this setting.
    totalAmount: 1711000,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'APPROVED',
    // Sets the submittedBy field so the surrounding object or component receives this setting.
    submittedBy: 'Priya Mehta (PM)',
    // Sets the submittedAt field so the surrounding object or component receives this setting.
    submittedAt: '2026-09-29T10:00:00Z',
    // Sets the approvedBy field so the surrounding object or component receives this setting.
    approvedBy: 'Rakesh Verma (Admin)',
    // Sets the approvedAt field so the surrounding object or component receives this setting.
    approvedAt: '2026-10-01T11:00:00Z',
    // Sets the paidAmount field so the surrounding object or component receives this setting.
    paidAmount: 0,
    // Sets the outstandingAmount field so the surrounding object or component receives this setting.
    outstandingAmount: 1711000,
    // Sets the payments field so the surrounding object or component receives this setting.
    payments: [],
    // Sets the challanNumber field so the surrounding object or component receives this setting.
    challanNumber: 'JSP-44102',
    // Sets the fileAttachmentName field so the surrounding object or component receives this setting.
    fileAttachmentName: 'Jindal_Tax_Invoice.pdf',
  // Closes the current block or object so the grouped statements or settings end here.
  },
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 'BILL-006',
    // Sets the projectId field so the surrounding object or component receives this setting.
    projectId: '2',
    // Sets the projectCode field so the surrounding object or component receives this setting.
    projectCode: 'PRJ-002',
    // Sets the projectName field so the surrounding object or component receives this setting.
    projectName: 'Skyline Commercial Hub',
    // Sets the vendorName field so the surrounding object or component receives this setting.
    vendorName: 'Apex Labour Contractors',
    // Sets the vendorGstin field so the surrounding object or component receives this setting.
    vendorGstin: '27AAACA9921Q1Z4',
    // Sets the billNumber field so the surrounding object or component receives this setting.
    billNumber: 'ALC-OCT-2026',
    // Sets the billDate field so the surrounding object or component receives this setting.
    billDate: '2026-10-31',
    // Sets the dueDate field so the surrounding object or component receives this setting.
    dueDate: '2026-11-10',
    // Sets the category field so the surrounding object or component receives this setting.
    category: 'LABOUR',
    // Sets the description field so the surrounding object or component receives this setting.
    description: 'Fortnightly shuttering & bar bending manpower payout',
    // Sets the baseAmount field so the surrounding object or component receives this setting.
    baseAmount: 320000,
    // Sets the gstPercent field so the surrounding object or component receives this setting.
    gstPercent: 18,
    // Sets the gstAmount field so the surrounding object or component receives this setting.
    gstAmount: 57600,
    // Sets the totalAmount field so the surrounding object or component receives this setting.
    totalAmount: 377600,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'PENDING',
    // Sets the submittedBy field so the surrounding object or component receives this setting.
    submittedBy: 'Priya Mehta (PM)',
    // Sets the submittedAt field so the surrounding object or component receives this setting.
    submittedAt: '2026-11-01T08:30:00Z',
    // Sets the paidAmount field so the surrounding object or component receives this setting.
    paidAmount: 0,
    // Sets the outstandingAmount field so the surrounding object or component receives this setting.
    outstandingAmount: 377600,
    // Sets the payments field so the surrounding object or component receives this setting.
    payments: [],
    // Sets the fileAttachmentName field so the surrounding object or component receives this setting.
    fileAttachmentName: 'Apex_Labour_Attendance_Bill.pdf',
  // Closes the current block or object so the grouped statements or settings end here.
  },
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 'BILL-007',
    // Sets the projectId field so the surrounding object or component receives this setting.
    projectId: '3',
    // Sets the projectCode field so the surrounding object or component receives this setting.
    projectCode: 'PRJ-003',
    // Sets the projectName field so the surrounding object or component receives this setting.
    projectName: 'Riverside Heights',
    // Sets the vendorName field so the surrounding object or component receives this setting.
    vendorName: 'Asian Paints Pro Contractor',
    // Sets the vendorGstin field so the surrounding object or component receives this setting.
    vendorGstin: '09AAACA1122C1Z3',
    // Sets the billNumber field so the surrounding object or component receives this setting.
    billNumber: 'AP-NOIDA-5541',
    // Sets the billDate field so the surrounding object or component receives this setting.
    billDate: '2026-07-15',
    // Sets the dueDate field so the surrounding object or component receives this setting.
    dueDate: '2026-08-15',
    // Sets the category field so the surrounding object or component receives this setting.
    category: 'MATERIAL',
    // Sets the description field so the surrounding object or component receives this setting.
    description: 'Exterior weatherproof primer & Apex Ultima finish (450 Litres)',
    // Sets the baseAmount field so the surrounding object or component receives this setting.
    baseAmount: 195000,
    // Sets the gstPercent field so the surrounding object or component receives this setting.
    gstPercent: 28,
    // Sets the gstAmount field so the surrounding object or component receives this setting.
    gstAmount: 54600,
    // Sets the totalAmount field so the surrounding object or component receives this setting.
    totalAmount: 249600,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'PAID',
    // Sets the submittedBy field so the surrounding object or component receives this setting.
    submittedBy: 'Rohan Verma (PM)',
    // Sets the submittedAt field so the surrounding object or component receives this setting.
    submittedAt: '2026-07-16T10:00:00Z',
    // Sets the approvedBy field so the surrounding object or component receives this setting.
    approvedBy: 'Rakesh Verma (Admin)',
    // Sets the approvedAt field so the surrounding object or component receives this setting.
    approvedAt: '2026-07-18T14:00:00Z',
    // Sets the paidAmount field so the surrounding object or component receives this setting.
    paidAmount: 249600,
    // Sets the outstandingAmount field so the surrounding object or component receives this setting.
    outstandingAmount: 0,
    // Sets the payments field so the surrounding object or component receives this setting.
    payments: [
      // Opens a block or object so its related statements or settings can be grouped together.
      {
        // Sets the id field so the surrounding object or component receives this setting.
        id: 'PAY-002',
        // Sets the billId field so the surrounding object or component receives this setting.
        billId: 'BILL-007',
        // Sets the amount field so the surrounding object or component receives this setting.
        amount: 249600,
        // Sets the paymentDate field so the surrounding object or component receives this setting.
        paymentDate: '2026-08-10',
        // Sets the mode field so the surrounding object or component receives this setting.
        mode: 'BANK_TRANSFER',
        // Sets the referenceNumber field so the surrounding object or component receives this setting.
        referenceNumber: 'RTGS-AXIS-881234',
        // Sets the remarks field so the surrounding object or component receives this setting.
        remarks: 'Full settlement against completion',
        // Sets the recordedBy field so the surrounding object or component receives this setting.
        recordedBy: 'Rakesh Verma (Admin)',
        // Sets the createdAt field so the surrounding object or component receives this setting.
        createdAt: '2026-08-10T16:00:00Z',
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
    // Sets the fileAttachmentName field so the surrounding object or component receives this setting.
    fileAttachmentName: 'AsianPaints_Receipt.pdf',
  // Closes the current block or object so the grouped statements or settings end here.
  },
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 'BILL-008',
    // Sets the projectId field so the surrounding object or component receives this setting.
    projectId: '4',
    // Sets the projectCode field so the surrounding object or component receives this setting.
    projectCode: 'PRJ-004',
    // Sets the projectName field so the surrounding object or component receives this setting.
    projectName: 'Urban Square',
    // Sets the vendorName field so the surrounding object or component receives this setting.
    vendorName: 'Jaipur Bricks & Aggregates',
    // Sets the vendorGstin field so the surrounding object or component receives this setting.
    vendorGstin: '08AAACJ7788P1Z6',
    // Sets the billNumber field so the surrounding object or component receives this setting.
    billNumber: 'JBA-2026-90',
    // Sets the billDate field so the surrounding object or component receives this setting.
    billDate: '2026-10-18',
    // Sets the dueDate field so the surrounding object or component receives this setting.
    dueDate: '2026-11-18',
    // Sets the category field so the surrounding object or component receives this setting.
    category: 'MATERIAL',
    // Sets the description field so the surrounding object or component receives this setting.
    description: 'Red clay wire-cut bricks 30,000 nos',
    // Sets the baseAmount field so the surrounding object or component receives this setting.
    baseAmount: 210000,
    // Sets the gstPercent field so the surrounding object or component receives this setting.
    gstPercent: 5,
    // Sets the gstAmount field so the surrounding object or component receives this setting.
    gstAmount: 10500,
    // Sets the totalAmount field so the surrounding object or component receives this setting.
    totalAmount: 220500,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'REJECTED',
    // Sets the submittedBy field so the surrounding object or component receives this setting.
    submittedBy: 'Neha Kapoor (PM)',
    // Sets the submittedAt field so the surrounding object or component receives this setting.
    submittedAt: '2026-10-19T14:20:00Z',
    // Sets the approvedBy field so the surrounding object or component receives this setting.
    approvedBy: 'Rakesh Verma (Admin)',
    // Sets the approvedAt field so the surrounding object or component receives this setting.
    approvedAt: '2026-10-21T11:00:00Z',
    // Sets the rejectionReason field so the surrounding object or component receives this setting.
    rejectionReason: 'Challan quantity shows only 20,000 bricks delivered. Please check with site supervisor and resubmit.',
    // Sets the paidAmount field so the surrounding object or component receives this setting.
    paidAmount: 0,
    // Sets the outstandingAmount field so the surrounding object or component receives this setting.
    outstandingAmount: 220500,
    // Sets the payments field so the surrounding object or component receives this setting.
    payments: [],
    // Sets the challanNumber field so the surrounding object or component receives this setting.
    challanNumber: 'JBA-CH-12',
    // Sets the fileAttachmentName field so the surrounding object or component receives this setting.
    fileAttachmentName: 'JaipurBricks_Invoice.pdf',
  // Closes the current block or object so the grouped statements or settings end here.
  },
// Continues the component or data expression so its related values and behavior stay grouped together.
];

// Defines getStoredBills so this module can perform its named task when needed.
export function getStoredBills(): Bill[] {
  // Starts an error-handling region so failures can be caught and handled safely.
  try {
    // Stores the value in data so later lines can reuse this data or behavior for the current feature.
    const data = localStorage.getItem(STORAGE_KEY);
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!data) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBills));
      // Returns the result so the caller or React receives the value or interface this function provides.
      return initialBills;
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Returns the result so the caller or React receives the value or interface this function provides.
    return JSON.parse(data) as Bill[];
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } catch {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return initialBills;
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines saveStoredBills so this module can perform its named task when needed.
export function saveStoredBills(bills: Bill[]): void {
  // Starts an error-handling region so failures can be caught and handled safely.
  try {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bills));
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } catch (error) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    console.error('Failed to save bills in localStorage', error);
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines approveBill so this module can perform its named task when needed.
export function approveBill(billId: string, adminName: string): Bill | null {
  // Stores the value in bills so later lines can reuse this data or behavior for the current feature.
  const bills = getStoredBills();
  // Stores the value in billIndex so later lines can reuse this data or behavior for the current feature.
  const billIndex = bills.findIndex((b) => b.id === billId);
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (billIndex === -1) return null;

  // Stores the value in bill so later lines can reuse this data or behavior for the current feature.
  const bill = bills[billIndex];
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (bill.status !== 'PENDING') return null;

  // Continues the component or data expression so its related values and behavior stay grouped together.
  bill.status = 'APPROVED';
  // Continues the component or data expression so its related values and behavior stay grouped together.
  bill.approvedBy = adminName;
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  bill.approvedAt = new Date().toISOString();
  // Continues the component or data expression so its related values and behavior stay grouped together.
  delete bill.rejectionReason;

  // Continues the component or data expression so its related values and behavior stay grouped together.
  bills[billIndex] = bill;
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  saveStoredBills(bills);
  // Returns the result so the caller or React receives the value or interface this function provides.
  return bill;
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines rejectBill so this module can perform its named task when needed.
export function rejectBill(billId: string, adminName: string, reason: string): Bill | null {
  // Stores the value in bills so later lines can reuse this data or behavior for the current feature.
  const bills = getStoredBills();
  // Stores the value in billIndex so later lines can reuse this data or behavior for the current feature.
  const billIndex = bills.findIndex((b) => b.id === billId);
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (billIndex === -1) return null;

  // Stores the value in bill so later lines can reuse this data or behavior for the current feature.
  const bill = bills[billIndex];
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (bill.status !== 'PENDING') return null;

  // Continues the component or data expression so its related values and behavior stay grouped together.
  bill.status = 'REJECTED';
  // Continues the component or data expression so its related values and behavior stay grouped together.
  bill.approvedBy = adminName;
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  bill.approvedAt = new Date().toISOString();
  // Continues the component or data expression so its related values and behavior stay grouped together.
  bill.rejectionReason = reason;

  // Continues the component or data expression so its related values and behavior stay grouped together.
  bills[billIndex] = bill;
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  saveStoredBills(bills);
  // Returns the result so the caller or React receives the value or interface this function provides.
  return bill;
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines recordBillPayment so this module can perform its named task when needed.
export function recordBillPayment(
  // Sets the billId field so the surrounding object or component receives this setting.
  billId: string,
  // Sets the paymentData field so the surrounding object or component receives this setting.
  paymentData: {
    // Sets the amount field so the surrounding object or component receives this setting.
    amount: number;
    // Sets the paymentDate field so the surrounding object or component receives this setting.
    paymentDate: string;
    // Sets the mode field so the surrounding object or component receives this setting.
    mode: PaymentMode;
    // Continues the component or data expression so its related values and behavior stay grouped together.
    referenceNumber?: string;
    // Continues the component or data expression so its related values and behavior stay grouped together.
    remarks?: string;
    // Sets the recordedBy field so the surrounding object or component receives this setting.
    recordedBy: string;
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Continues the component or data expression so its related values and behavior stay grouped together.
): Bill | null {
  // Stores the value in bills so later lines can reuse this data or behavior for the current feature.
  const bills = getStoredBills();
  // Stores the value in billIndex so later lines can reuse this data or behavior for the current feature.
  const billIndex = bills.findIndex((b) => b.id === billId);
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (billIndex === -1) return null;

  // Stores the value in bill so later lines can reuse this data or behavior for the current feature.
  const bill = bills[billIndex];
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (bill.status !== 'APPROVED' && bill.status !== 'PARTIALLY_PAID') return null;
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (paymentData.amount <= 0 || paymentData.amount > bill.outstandingAmount) return null;

  // Stores the value in newPayment so later lines can reuse this data or behavior for the current feature.
  const newPayment: Payment = {
    // Sets the id field so the surrounding object or component receives this setting.
    id: `PAY-${Date.now().toString().slice(-4)}`,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    billId,
    // Sets the amount field so the surrounding object or component receives this setting.
    amount: paymentData.amount,
    // Sets the paymentDate field so the surrounding object or component receives this setting.
    paymentDate: paymentData.paymentDate,
    // Sets the mode field so the surrounding object or component receives this setting.
    mode: paymentData.mode,
    // Sets the referenceNumber field so the surrounding object or component receives this setting.
    referenceNumber: paymentData.referenceNumber,
    // Sets the remarks field so the surrounding object or component receives this setting.
    remarks: paymentData.remarks,
    // Sets the recordedBy field so the surrounding object or component receives this setting.
    recordedBy: paymentData.recordedBy,
    // Sets the createdAt field so the surrounding object or component receives this setting.
    createdAt: new Date().toISOString(),
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  bill.payments.push(newPayment);
  // Continues the component or data expression so its related values and behavior stay grouped together.
  bill.paidAmount += paymentData.amount;
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  bill.outstandingAmount = Math.max(0, bill.totalAmount - bill.paidAmount);

  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (bill.outstandingAmount === 0) {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    bill.status = 'PAID';
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } else {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    bill.status = 'PARTIALLY_PAID';
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Continues the component or data expression so its related values and behavior stay grouped together.
  bills[billIndex] = bill;
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  saveStoredBills(bills);
  // Returns the result so the caller or React receives the value or interface this function provides.
  return bill;
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines addBill so this module can perform its named task when needed.
export function addBill(newBillData: Omit<Bill, 'id' | 'paidAmount' | 'outstandingAmount' | 'payments' | 'status' | 'submittedAt' | 'gstAmount' | 'totalAmount'>): Bill {
  // Stores the value in bills so later lines can reuse this data or behavior for the current feature.
  const bills = getStoredBills();
  // Stores the value in gstAmount so later lines can reuse this data or behavior for the current feature.
  const gstAmount = Math.round((newBillData.baseAmount * (newBillData.gstPercent / 100)) * 100) / 100;
  // Stores the value in totalAmount so later lines can reuse this data or behavior for the current feature.
  const totalAmount = newBillData.baseAmount + gstAmount;

  // Stores the value in newBill so later lines can reuse this data or behavior for the current feature.
  const newBill: Bill = {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...newBillData,
    // Sets the id field so the surrounding object or component receives this setting.
    id: `BILL-${String(bills.length + 1).padStart(3, '0')}`,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    gstAmount,
    // Continues the component or data expression so its related values and behavior stay grouped together.
    totalAmount,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'PENDING',
    // Sets the submittedAt field so the surrounding object or component receives this setting.
    submittedAt: new Date().toISOString(),
    // Sets the paidAmount field so the surrounding object or component receives this setting.
    paidAmount: 0,
    // Sets the outstandingAmount field so the surrounding object or component receives this setting.
    outstandingAmount: totalAmount,
    // Sets the payments field so the surrounding object or component receives this setting.
    payments: [],
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  bills.unshift(newBill);
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  saveStoredBills(bills);
  // Returns the result so the caller or React receives the value or interface this function provides.
  return newBill;
// Closes the current block or object so the grouped statements or settings end here.
}
