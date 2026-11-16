// Continues the component or data expression so its related values and behavior stay grouped together.
export type BillCategory = 'MATERIAL' | 'LABOUR' | 'MACHINERY' | 'SERVICES' | 'OTHER';

// Continues the component or data expression so its related values and behavior stay grouped together.
export type BillStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'PARTIALLY_PAID' | 'PAID';

// Continues the component or data expression so its related values and behavior stay grouped together.
export type PaymentMode = 'BANK_TRANSFER' | 'CHEQUE' | 'UPI' | 'CASH' | 'OTHER';

// Continues the component or data expression so its related values and behavior stay grouped together.
export interface Payment {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string;
  // Sets the billId field so the surrounding object or component receives this setting.
  billId: string;
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
  // Sets the createdAt field so the surrounding object or component receives this setting.
  createdAt: string;
// Closes the current block or object so the grouped statements or settings end here.
}

// Continues the component or data expression so its related values and behavior stay grouped together.
export interface Bill {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string;
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: string;
  // Sets the projectCode field so the surrounding object or component receives this setting.
  projectCode: string;
  // Sets the projectName field so the surrounding object or component receives this setting.
  projectName: string;
  // Continues the component or data expression so its related values and behavior stay grouped together.
  vendorId?: string;
  // Sets the vendorName field so the surrounding object or component receives this setting.
  vendorName: string;
  // Continues the component or data expression so its related values and behavior stay grouped together.
  vendorGstin?: string;
  // Sets the billNumber field so the surrounding object or component receives this setting.
  billNumber: string;
  // Sets the billDate field so the surrounding object or component receives this setting.
  billDate: string;
  // Continues the component or data expression so its related values and behavior stay grouped together.
  dueDate?: string;
  // Sets the category field so the surrounding object or component receives this setting.
  category: BillCategory;
  // Continues the component or data expression so its related values and behavior stay grouped together.
  description?: string;
  // Sets the baseAmount field so the surrounding object or component receives this setting.
  baseAmount: number;
  // Sets the gstPercent field so the surrounding object or component receives this setting.
  gstPercent: number;
  // Sets the gstAmount field so the surrounding object or component receives this setting.
  gstAmount: number;
  // Sets the totalAmount field so the surrounding object or component receives this setting.
  totalAmount: number;
  // Sets the status field so the surrounding object or component receives this setting.
  status: BillStatus;
  // Sets the submittedBy field so the surrounding object or component receives this setting.
  submittedBy: string;
  // Sets the submittedAt field so the surrounding object or component receives this setting.
  submittedAt: string;
  // Continues the component or data expression so its related values and behavior stay grouped together.
  approvedBy?: string;
  // Continues the component or data expression so its related values and behavior stay grouped together.
  approvedAt?: string;
  // Continues the component or data expression so its related values and behavior stay grouped together.
  rejectionReason?: string;
  // Sets the paidAmount field so the surrounding object or component receives this setting.
  paidAmount: number;
  // Sets the outstandingAmount field so the surrounding object or component receives this setting.
  outstandingAmount: number;
  // Sets the payments field so the surrounding object or component receives this setting.
  payments: Payment[];
  // Continues the component or data expression so its related values and behavior stay grouped together.
  challanNumber?: string;
  // Continues the component or data expression so its related values and behavior stay grouped together.
  fileAttachmentName?: string;
// Closes the current block or object so the grouped statements or settings end here.
}

