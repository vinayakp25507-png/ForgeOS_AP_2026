// Continues the component or data expression so its related values and behavior stay grouped together.
export type VendorCategory =
  // Continues the component or data expression so its related values and behavior stay grouped together.
  | 'CEMENT'
  // Continues the component or data expression so its related values and behavior stay grouped together.
  | 'STEEL'
  // Continues the component or data expression so its related values and behavior stay grouped together.
  | 'READY_MIX_CONCRETE'
  // Continues the component or data expression so its related values and behavior stay grouped together.
  | 'ELECTRICAL'
  // Continues the component or data expression so its related values and behavior stay grouped together.
  | 'PLUMBING'
  // Continues the component or data expression so its related values and behavior stay grouped together.
  | 'EARTHWORK'
  // Continues the component or data expression so its related values and behavior stay grouped together.
  | 'FINISHING'
  // Continues the component or data expression so its related values and behavior stay grouped together.
  | 'LABOUR_CONTRACTOR'
  // Continues the component or data expression so its related values and behavior stay grouped together.
  | 'EQUIPMENT_RENTAL'
  // Continues the component or data expression so its related values and behavior stay grouped together.
  | 'OTHER';

// Continues the component or data expression so its related values and behavior stay grouped together.
export type VendorStatus = 'ACTIVE' | 'UNDER_REVIEW' | 'BLACKLISTED' | 'INACTIVE';

// Continues the component or data expression so its related values and behavior stay grouped together.
export type ContractStatus = 'ACTIVE' | 'COMPLETED' | 'EXPIRED' | 'TERMINATED';

// Continues the component or data expression so its related values and behavior stay grouped together.
export type QuotationStatus =
  // Continues the component or data expression so its related values and behavior stay grouped together.
  | 'SUBMITTED'
  // Continues the component or data expression so its related values and behavior stay grouped together.
  | 'UNDER_NEGOTIATION'
  // Continues the component or data expression so its related values and behavior stay grouped together.
  | 'COUNTER_OFFERED'
  // Continues the component or data expression so its related values and behavior stay grouped together.
  | 'ACCEPTED'
  // Continues the component or data expression so its related values and behavior stay grouped together.
  | 'REJECTED';

// Continues the component or data expression so its related values and behavior stay grouped together.
export interface ProjectContract {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string;
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: string;
  // Sets the projectCode field so the surrounding object or component receives this setting.
  projectCode: string;
  // Sets the projectName field so the surrounding object or component receives this setting.
  projectName: string;
  // Sets the contractNumber field so the surrounding object or component receives this setting.
  contractNumber: string;
  // Sets the title field so the surrounding object or component receives this setting.
  title: string;
  // Sets the category field so the surrounding object or component receives this setting.
  category: VendorCategory;
  // Sets the contractValue field so the surrounding object or component receives this setting.
  contractValue: number;
  // Sets the startDate field so the surrounding object or component receives this setting.
  startDate: string;
  // Sets the endDate field so the surrounding object or component receives this setting.
  endDate: string;
  // Sets the status field so the surrounding object or component receives this setting.
  status: ContractStatus;
  // Sets the scopeOfWork field so the surrounding object or component receives this setting.
  scopeOfWork: string;
  // Sets the paymentTerms field so the surrounding object or component receives this setting.
  paymentTerms: string;
// Closes the current block or object so the grouped statements or settings end here.
}

// Continues the component or data expression so its related values and behavior stay grouped together.
export interface NegotiationHistoryItem {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string;
  // Sets the date field so the surrounding object or component receives this setting.
  date: string;
  // Sets the author field so the surrounding object or component receives this setting.
  author: string;
  // Sets the role field so the surrounding object or component receives this setting.
  role: 'BUILDER' | 'VENDOR';
  // Sets the offeredRate field so the surrounding object or component receives this setting.
  offeredRate: number;
  // Sets the unit field so the surrounding object or component receives this setting.
  unit: string;
  // Continues the component or data expression so its related values and behavior stay grouped together.
  creditDaysOffered?: number;
  // Sets the notes field so the surrounding object or component receives this setting.
  notes: string;
// Closes the current block or object so the grouped statements or settings end here.
}

// Continues the component or data expression so its related values and behavior stay grouped together.
export interface Quotation {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string;
  // Sets the quotationNumber field so the surrounding object or component receives this setting.
  quotationNumber: string;
  // Sets the vendorId field so the surrounding object or component receives this setting.
  vendorId: string;
  // Sets the vendorName field so the surrounding object or component receives this setting.
  vendorName: string;
  // Sets the projectId field so the surrounding object or component receives this setting.
  projectId: string;
  // Sets the projectCode field so the surrounding object or component receives this setting.
  projectCode: string;
  // Sets the projectName field so the surrounding object or component receives this setting.
  projectName: string;
  // Sets the category field so the surrounding object or component receives this setting.
  category: VendorCategory;
  // Sets the itemDescription field so the surrounding object or component receives this setting.
  itemDescription: string;
  // Sets the quantity field so the surrounding object or component receives this setting.
  quantity: number;
  // Sets the unit field so the surrounding object or component receives this setting.
  unit: string;
  // Sets the initialQuotedRate field so the surrounding object or component receives this setting.
  initialQuotedRate: number;
  // Sets the initialTotalAmount field so the surrounding object or component receives this setting.
  initialTotalAmount: number;
  // Continues the component or data expression so its related values and behavior stay grouped together.
  currentCounterRate?: number;
  // Continues the component or data expression so its related values and behavior stay grouped together.
  finalAgreedRate?: number;
  // Sets the gstRate field so the surrounding object or component receives this setting.
  gstRate: number; // 0, 5, 12, 18, 28
  // Sets the status field so the surrounding object or component receives this setting.
  status: QuotationStatus;
  // Sets the submittedDate field so the surrounding object or component receives this setting.
  submittedDate: string;
  // Sets the validTill field so the surrounding object or component receives this setting.
  validTill: string;
  // Sets the paymentTermsOffered field so the surrounding object or component receives this setting.
  paymentTermsOffered: string;
  // Continues the component or data expression so its related values and behavior stay grouped together.
  builderTargetRate?: number;
  // Sets the negotiationHistory field so the surrounding object or component receives this setting.
  negotiationHistory: NegotiationHistoryItem[];
  // Continues the component or data expression so its related values and behavior stay grouped together.
  builderNotes?: string;
// Closes the current block or object so the grouped statements or settings end here.
}

// Continues the component or data expression so its related values and behavior stay grouped together.
export interface Vendor {
  // Sets the id field so the surrounding object or component receives this setting.
  id: string;
  // Sets the name field so the surrounding object or component receives this setting.
  name: string;
  // Sets the category field so the surrounding object or component receives this setting.
  category: VendorCategory;
  // Sets the contactPerson field so the surrounding object or component receives this setting.
  contactPerson: string;
  // Sets the phone field so the surrounding object or component receives this setting.
  phone: string;
  // Sets the email field so the surrounding object or component receives this setting.
  email: string;
  // Sets the address field so the surrounding object or component receives this setting.
  address: string;
  // Sets the city field so the surrounding object or component receives this setting.
  city: string;
  // Sets the gstin field so the surrounding object or component receives this setting.
  gstin: string;
  // Continues the component or data expression so its related values and behavior stay grouped together.
  panNumber?: string;
  // Sets the rating field so the surrounding object or component receives this setting.
  rating: number; // 1 to 5
  // Sets the status field so the surrounding object or component receives this setting.
  status: VendorStatus;
  // Sets the contracts field so the surrounding object or component receives this setting.
  contracts: ProjectContract[];
  // Sets the quotations field so the surrounding object or component receives this setting.
  quotations: Quotation[];
  // Sets the totalContractedValue field so the surrounding object or component receives this setting.
  totalContractedValue: number;
  // Sets the activeQuotationsCount field so the surrounding object or component receives this setting.
  activeQuotationsCount: number;
  // Continues the component or data expression so its related values and behavior stay grouped together.
  bankDetails?: {
    // Sets the accountName field so the surrounding object or component receives this setting.
    accountName: string;
    // Sets the bankName field so the surrounding object or component receives this setting.
    bankName: string;
    // Sets the accountNumber field so the surrounding object or component receives this setting.
    accountNumber: string;
    // Sets the ifscCode field so the surrounding object or component receives this setting.
    ifscCode: string;
  // Closes the current block or object so the grouped statements or settings end here.
  };
// Closes the current block or object so the grouped statements or settings end here.
}

