// Imports useState, useMemo from react so this module can reuse that component, helper, or library.
import { useState, useMemo } from 'react';
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  UsersRound,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Plus,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Search,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Building2,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Eye,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Check,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  X,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Phone,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Mail,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  MapPin,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  TrendingDown,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Handshake,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  MessageSquare,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  ShieldCheck,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Star,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Receipt,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from 'lucide-react';
// Imports AppShell from ../../app-shell/components/AppShell so this module can reuse that component, helper, or library.
import { AppShell } from '../../app-shell/components/AppShell';
// Imports isAdmin from ../../authentication/utils/permissions so this module can reuse that component, helper, or library.
import { isAdmin } from '../../authentication/utils/permissions';
// Continues the component or data expression so its related values and behavior stay grouped together.
import {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  getStoredVendors,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  addVendor,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  recordNegotiationRound,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  acceptQuotation,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  rejectQuotation,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  addQuotationToVendor,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from '../data/vendorStore';
// Continues the component or data expression so its related values and behavior stay grouped together.
import type {
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Vendor,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  Quotation,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  VendorCategory,
  // Continues the component or data expression so its related values and behavior stay grouped together.
  QuotationStatus,
// Continues the component or data expression so its related values and behavior stay grouped together.
} from '../types/vendor';

// Stores the value in PROJECTS so later lines can reuse this data or behavior for the current feature.
const PROJECTS = [
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: '1', code: 'PRJ-001', name: 'Green Valley Residency' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: '2', code: 'PRJ-002', name: 'Skyline Commercial Hub' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: '3', code: 'PRJ-003', name: 'Riverside Heights' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { id: '4', code: 'PRJ-004', name: 'Urban Square' },
// Continues the component or data expression so its related values and behavior stay grouped together.
];

// Stores the value in CATEGORIES so later lines can reuse this data or behavior for the current feature.
const CATEGORIES: { label: string; value: VendorCategory }[] = [
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { label: 'Cement', value: 'CEMENT' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { label: 'Steel & Rebars', value: 'STEEL' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { label: 'Ready-Mix Concrete (RMC)', value: 'READY_MIX_CONCRETE' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { label: 'Electrical & Panels', value: 'ELECTRICAL' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { label: 'Plumbing & Drainage', value: 'PLUMBING' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { label: 'Earthwork & Shoring', value: 'EARTHWORK' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { label: 'Finishing & Paints', value: 'FINISHING' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { label: 'Labour Contractor', value: 'LABOUR_CONTRACTOR' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { label: 'Equipment Rental', value: 'EQUIPMENT_RENTAL' },
  // Continues the component or data expression so its related values and behavior stay grouped together.
  { label: 'Other', value: 'OTHER' },
// Continues the component or data expression so its related values and behavior stay grouped together.
];

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

// Defines getStatusBadge so this module can perform its named task when needed.
function getStatusBadge(status: QuotationStatus) {
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  switch (status) {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    case 'ACCEPTED':
      // Returns the result so the caller or React receives the value or interface this function provides.
      return {
        // Sets the bg field so the surrounding object or component receives this setting.
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        // Sets the label field so the surrounding object or component receives this setting.
        label: 'Accepted / Contracted',
      // Closes the current block or object so the grouped statements or settings end here.
      };
    // Continues the component or data expression so its related values and behavior stay grouped together.
    case 'COUNTER_OFFERED':
      // Returns the result so the caller or React receives the value or interface this function provides.
      return {
        // Sets the bg field so the surrounding object or component receives this setting.
        bg: 'bg-blue-50 text-blue-800 border-blue-200',
        // Sets the label field so the surrounding object or component receives this setting.
        label: 'Counter-Offered',
      // Closes the current block or object so the grouped statements or settings end here.
      };
    // Continues the component or data expression so its related values and behavior stay grouped together.
    case 'UNDER_NEGOTIATION':
      // Returns the result so the caller or React receives the value or interface this function provides.
      return {
        // Sets the bg field so the surrounding object or component receives this setting.
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        // Sets the label field so the surrounding object or component receives this setting.
        label: 'Under Negotiation',
      // Closes the current block or object so the grouped statements or settings end here.
      };
    // Continues the component or data expression so its related values and behavior stay grouped together.
    case 'REJECTED':
      // Returns the result so the caller or React receives the value or interface this function provides.
      return {
        // Sets the bg field so the surrounding object or component receives this setting.
        bg: 'bg-rose-50 text-rose-800 border-rose-200',
        // Sets the label field so the surrounding object or component receives this setting.
        label: 'Rejected',
      // Closes the current block or object so the grouped statements or settings end here.
      };
    // Continues the component or data expression so its related values and behavior stay grouped together.
    case 'SUBMITTED':
    // Sets the default field so the surrounding object or component receives this setting.
    default:
      // Returns the result so the caller or React receives the value or interface this function provides.
      return {
        // Sets the bg field so the surrounding object or component receives this setting.
        bg: 'bg-purple-50 text-purple-800 border-purple-200',
        // Sets the label field so the surrounding object or component receives this setting.
        label: 'New Quote',
      // Closes the current block or object so the grouped statements or settings end here.
      };
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines VendorsPage so this module can perform its named task when needed.
export function VendorsPage() {
  // Stores the value in admin so later lines can reuse this data or behavior for the current feature.
  const admin = isAdmin();
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [vendors, setVendors] = useState<Vendor[]>(() => getStoredVendors());

  // Views: 'VENDORS' (Directory & Contracts), 'NEGOTIATIONS' (Quotes & Counter-offers), 'BY_PROJECT'
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [activeTab, setActiveTab] = useState<'VENDORS' | 'NEGOTIATIONS' | 'BY_PROJECT'>('NEGOTIATIONS');

  // Filters
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [selectedProjectId, setSelectedProjectId] = useState<string>('ALL');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [selectedQuoteStatus, setSelectedQuoteStatus] = useState<string>('ALL');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  // Continues the component or data expression so its related values and behavior stay grouped together.
  const [activeModal, setActiveModal] = useState<
    // Continues the component or data expression so its related values and behavior stay grouped together.
    'NEGOTIATE' | 'VIEW_VENDOR' | 'ADD_VENDOR' | 'NEW_QUOTE' | null
  // Continues the component or data expression so its related values and behavior stay grouped together.
  >(null);
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [selectedQuote, setSelectedQuote] = useState<Quotation | null>(null);

  // Negotiation Modal Inputs
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [counterRateInput, setCounterRateInput] = useState<string>('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [negotiationNotes, setNegotiationNotes] = useState<string>('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [rejectReasonInput, setRejectReasonInput] = useState<string>('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [isRejecting, setIsRejecting] = useState<boolean>(false);

  // New Vendor Form
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newVendorName, setNewVendorName] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newVendorCategory, setNewVendorCategory] = useState<VendorCategory>('CEMENT');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newContactPerson, setNewContactPerson] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newPhone, setNewPhone] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newEmail, setNewEmail] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newCity, setNewCity] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newAddress, setNewAddress] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newGstin, setNewGstin] = useState('');

  // New Quote Form
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newQuoteVendorId, setNewQuoteVendorId] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newQuoteProjectId, setNewQuoteProjectId] = useState('1');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newQuoteCategory, setNewQuoteCategory] = useState<VendorCategory>('CEMENT');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newQuoteDescription, setNewQuoteDescription] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newQuoteQuantity, setNewQuoteQuantity] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newQuoteUnit, setNewQuoteUnit] = useState('Bags');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newQuoteRate, setNewQuoteRate] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newQuoteTargetRate, setNewQuoteTargetRate] = useState('');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newQuoteGst, setNewQuoteGst] = useState('18');
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  const [newQuotePaymentTerms, setNewQuotePaymentTerms] = useState('30 Days credit');

  // Flattened quotations list across all vendors
  // Caches allQuotations so its calculation is repeated only when its inputs change.
  // Caches allQuotations so its calculation is repeated only when its inputs change.
  // Caches allQuotations so its calculation is repeated only when its inputs change.
  // Caches allQuotations so its calculation is repeated only when its inputs change.
  // Caches allQuotations so its calculation is repeated only when its inputs change.
  // Caches allQuotations so its calculation is repeated only when its inputs change.
  // Caches allQuotations so its calculation is repeated only when its inputs change.
  // Caches allQuotations so its calculation is repeated only when its inputs change.
  // Caches allQuotations so its calculation is repeated only when its inputs change.
  // Caches allQuotations so its calculation is repeated only when its inputs change.
  // Caches allQuotations so its calculation is repeated only when its inputs change.
  const allQuotations = useMemo(() => {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return vendors.flatMap((v) => v.quotations);
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [vendors]);

  // Overall KPI Calculations
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
    // Stores the value in totalVendorsCount so later lines can reuse this data or behavior for the current feature.
    const totalVendorsCount = vendors.length;
    // Stores the value in totalContractsCount so later lines can reuse this data or behavior for the current feature.
    let totalContractsCount = 0;
    // Stores the value in totalContractValue so later lines can reuse this data or behavior for the current feature.
    let totalContractValue = 0;
    // Stores the value in activeNegotiationsCount so later lines can reuse this data or behavior for the current feature.
    let activeNegotiationsCount = 0;
    // Stores the value in totalNegotiationSavings so later lines can reuse this data or behavior for the current feature.
    let totalNegotiationSavings = 0;

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    for (const v of vendors) {
      // Continues the component or data expression so its related values and behavior stay grouped together.
      totalContractsCount += v.contracts.length;
      // Continues the component or data expression so its related values and behavior stay grouped together.
      totalContractValue += v.totalContractedValue;
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      for (const q of v.quotations) {
        // Checks this condition before continuing so the code can choose the correct path for the current state.
        if (q.status === 'UNDER_NEGOTIATION' || q.status === 'COUNTER_OFFERED' || q.status === 'SUBMITTED') {
          // Continues the component or data expression so its related values and behavior stay grouped together.
          activeNegotiationsCount++;
        // Closes the current block or object so the grouped statements or settings end here.
        }
        // If counter rate or final agreed rate exists, calculate saving
        // Stores the value in benchmarkRate so later lines can reuse this data or behavior for the current feature.
        const benchmarkRate = q.finalAgreedRate || q.currentCounterRate;
        // Checks this condition before continuing so the code can choose the correct path for the current state.
        if (benchmarkRate && benchmarkRate < q.initialQuotedRate) {
          // Calls this helper or component so the feature can perform the operation or render the control represented here.
          totalNegotiationSavings += (q.initialQuotedRate - benchmarkRate) * q.quantity;
        // Closes the current block or object so the grouped statements or settings end here.
        }
      // Closes the current block or object so the grouped statements or settings end here.
      }
    // Closes the current block or object so the grouped statements or settings end here.
    }

    // Returns the result so the caller or React receives the value or interface this function provides.
    return {
      // Continues the component or data expression so its related values and behavior stay grouped together.
      totalVendorsCount,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      totalContractsCount,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      totalContractValue,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      activeNegotiationsCount,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      totalNegotiationSavings,
    // Closes the current block or object so the grouped statements or settings end here.
    };
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [vendors]);

  // Filtered Quotations
  // Caches filteredQuotations so its calculation is repeated only when its inputs change.
  // Caches filteredQuotations so its calculation is repeated only when its inputs change.
  // Caches filteredQuotations so its calculation is repeated only when its inputs change.
  // Caches filteredQuotations so its calculation is repeated only when its inputs change.
  // Caches filteredQuotations so its calculation is repeated only when its inputs change.
  // Caches filteredQuotations so its calculation is repeated only when its inputs change.
  // Caches filteredQuotations so its calculation is repeated only when its inputs change.
  // Caches filteredQuotations so its calculation is repeated only when its inputs change.
  // Caches filteredQuotations so its calculation is repeated only when its inputs change.
  // Caches filteredQuotations so its calculation is repeated only when its inputs change.
  // Caches filteredQuotations so its calculation is repeated only when its inputs change.
  const filteredQuotations = useMemo(() => {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return allQuotations.filter((q) => {
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (selectedProjectId !== 'ALL' && q.projectId !== selectedProjectId) return false;
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (selectedCategory !== 'ALL' && q.category !== selectedCategory) return false;
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (selectedQuoteStatus !== 'ALL' && q.status !== selectedQuoteStatus) return false;
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (searchQuery.trim()) {
        // Stores the value in query so later lines can reuse this data or behavior for the current feature.
        const query = searchQuery.toLowerCase();
        // Stores the value in matches so later lines can reuse this data or behavior for the current feature.
        const matches =
          // Calls this helper or component so the feature can perform the operation or render the control represented here.
          q.vendorName.toLowerCase().includes(query) ||
          // Calls this helper or component so the feature can perform the operation or render the control represented here.
          q.quotationNumber.toLowerCase().includes(query) ||
          // Calls this helper or component so the feature can perform the operation or render the control represented here.
          q.projectName.toLowerCase().includes(query) ||
          // Calls this helper or component so the feature can perform the operation or render the control represented here.
          q.itemDescription.toLowerCase().includes(query);
        // Checks this condition before continuing so the code can choose the correct path for the current state.
        if (!matches) return false;
      // Closes the current block or object so the grouped statements or settings end here.
      }
      // Returns the result so the caller or React receives the value or interface this function provides.
      return true;
    // Continues the component or data expression so its related values and behavior stay grouped together.
    });
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [allQuotations, selectedProjectId, selectedCategory, selectedQuoteStatus, searchQuery]);

  // Filtered Vendors
  // Caches filteredVendors so its calculation is repeated only when its inputs change.
  // Caches filteredVendors so its calculation is repeated only when its inputs change.
  // Caches filteredVendors so its calculation is repeated only when its inputs change.
  // Caches filteredVendors so its calculation is repeated only when its inputs change.
  // Caches filteredVendors so its calculation is repeated only when its inputs change.
  // Caches filteredVendors so its calculation is repeated only when its inputs change.
  // Caches filteredVendors so its calculation is repeated only when its inputs change.
  // Caches filteredVendors so its calculation is repeated only when its inputs change.
  // Caches filteredVendors so its calculation is repeated only when its inputs change.
  // Caches filteredVendors so its calculation is repeated only when its inputs change.
  // Caches filteredVendors so its calculation is repeated only when its inputs change.
  const filteredVendors = useMemo(() => {
    // Returns the result so the caller or React receives the value or interface this function provides.
    return vendors.filter((v) => {
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (selectedCategory !== 'ALL' && v.category !== selectedCategory) return false;
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (selectedProjectId !== 'ALL') {
        // Stores the value in hasProject so later lines can reuse this data or behavior for the current feature.
        const hasProject =
          // Calls this helper or component so the feature can perform the operation or render the control represented here.
          v.contracts.some((c) => c.projectId === selectedProjectId) ||
          // Calls this helper or component so the feature can perform the operation or render the control represented here.
          v.quotations.some((q) => q.projectId === selectedProjectId);
        // Checks this condition before continuing so the code can choose the correct path for the current state.
        if (!hasProject) return false;
      // Closes the current block or object so the grouped statements or settings end here.
      }
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (searchQuery.trim()) {
        // Stores the value in query so later lines can reuse this data or behavior for the current feature.
        const query = searchQuery.toLowerCase();
        // Stores the value in matches so later lines can reuse this data or behavior for the current feature.
        const matches =
          // Calls this helper or component so the feature can perform the operation or render the control represented here.
          v.name.toLowerCase().includes(query) ||
          // Calls this helper or component so the feature can perform the operation or render the control represented here.
          v.contactPerson.toLowerCase().includes(query) ||
          // Calls this helper or component so the feature can perform the operation or render the control represented here.
          v.city.toLowerCase().includes(query) ||
          // Calls this helper or component so the feature can perform the operation or render the control represented here.
          v.gstin.toLowerCase().includes(query);
        // Checks this condition before continuing so the code can choose the correct path for the current state.
        if (!matches) return false;
      // Closes the current block or object so the grouped statements or settings end here.
      }
      // Returns the result so the caller or React receives the value or interface this function provides.
      return true;
    // Continues the component or data expression so its related values and behavior stay grouped together.
    });
  // Continues the component or data expression so its related values and behavior stay grouped together.
  }, [vendors, selectedCategory, selectedProjectId, searchQuery]);

  // Handlers for negotiation
  // Stores the value in handleOpenNegotiation so later lines can reuse this data or behavior for the current feature.
  const handleOpenNegotiation = (quote: Quotation) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setSelectedQuote(quote);
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setCounterRateInput(quote.currentCounterRate?.toString() || quote.builderTargetRate?.toString() || '');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNegotiationNotes('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setIsRejecting(false);
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setRejectReasonInput('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setActiveModal('NEGOTIATE');
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Stores the value in handleOpenVendorDetail so later lines can reuse this data or behavior for the current feature.
  const handleOpenVendorDetail = (vendor: Vendor) => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setSelectedVendor(vendor);
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setActiveModal('VIEW_VENDOR');
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Stores the value in handleOpenAddVendor so later lines can reuse this data or behavior for the current feature.
  const handleOpenAddVendor = () => {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewVendorName('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewVendorCategory('CEMENT');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewContactPerson('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewPhone('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewEmail('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewCity('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewAddress('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewGstin('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setActiveModal('ADD_VENDOR');
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Stores the value in handleOpenNewQuote so later lines can reuse this data or behavior for the current feature.
  const handleOpenNewQuote = () => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (vendors.length > 0) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setNewQuoteVendorId(vendors[0].id);
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      setNewQuoteCategory(vendors[0].category);
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewQuoteProjectId('1');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewQuoteDescription('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewQuoteQuantity('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewQuoteUnit('Bags');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewQuoteRate('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewQuoteTargetRate('');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewQuoteGst('18');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNewQuotePaymentTerms('30 Days credit');
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setActiveModal('NEW_QUOTE');
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Stores the value in handleSubmitCounterOffer so later lines can reuse this data or behavior for the current feature.
  const handleSubmitCounterOffer = () => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!selectedQuote) return;
    // Stores the value in rate so later lines can reuse this data or behavior for the current feature.
    const rate = parseFloat(counterRateInput);
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (isNaN(rate) || rate <= 0) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      alert('Please enter a valid counter rate.');
      // Returns the result so the caller or React receives the value or interface this function provides.
      return;
    // Closes the current block or object so the grouped statements or settings end here.
    }

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    recordNegotiationRound(
      // Continues the component or data expression so its related values and behavior stay grouped together.
      selectedQuote.id,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      rate,
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      negotiationNotes || `Builder counter-offer of ₹${rate.toLocaleString('en-IN')}/${selectedQuote.unit}.`,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      'COUNTER_OFFERED'
    // Closes this function call or grouped expression so the surrounding code can continue.
    );

    // Stores the value in refreshed so later lines can reuse this data or behavior for the current feature.
    const refreshed = getStoredVendors();
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setVendors(refreshed);
    // update current selected quote in modal
    // Stores the value in updated so later lines can reuse this data or behavior for the current feature.
    const updated = refreshed.flatMap((v) => v.quotations).find((q) => q.id === selectedQuote.id);
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (updated) setSelectedQuote(updated);
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setNegotiationNotes('');
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Stores the value in handleAcceptNegotiation so later lines can reuse this data or behavior for the current feature.
  const handleAcceptNegotiation = () => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!selectedQuote) return;
    // Stores the value in finalRate so later lines can reuse this data or behavior for the current feature.
    const finalRate = parseFloat(counterRateInput) || selectedQuote.currentCounterRate || selectedQuote.initialQuotedRate;

    // Stores the value in confirmed so later lines can reuse this data or behavior for the current feature.
    const confirmed = window.confirm(
      // Continues the component or data expression so its related values and behavior stay grouped together.
      `Confirm acceptance of quotation at ₹${finalRate.toLocaleString('en-IN')}/${selectedQuote.unit}?\nThis will create an active Project Contract for ${selectedQuote.projectName}.`
    // Closes this function call or grouped expression so the surrounding code can continue.
    );
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!confirmed) return;

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    acceptQuotation(selectedQuote.id, finalRate);
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setVendors(getStoredVendors());
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setActiveModal(null);
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Stores the value in handleRejectQuotationSubmit so later lines can reuse this data or behavior for the current feature.
  const handleRejectQuotationSubmit = () => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!selectedQuote) return;
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!rejectReasonInput.trim()) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      alert('Please state a reason for closing or rejecting the quotation.');
      // Returns the result so the caller or React receives the value or interface this function provides.
      return;
    // Closes the current block or object so the grouped statements or settings end here.
    }

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    rejectQuotation(selectedQuote.id, rejectReasonInput.trim());
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setVendors(getStoredVendors());
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setActiveModal(null);
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Stores the value in handleSaveNewVendor so later lines can reuse this data or behavior for the current feature.
  const handleSaveNewVendor = () => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!newVendorName.trim() || !newContactPerson.trim()) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      alert('Please enter Vendor Name and Contact Person.');
      // Returns the result so the caller or React receives the value or interface this function provides.
      return;
    // Closes the current block or object so the grouped statements or settings end here.
    }

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    addVendor({
      // Sets the name field so the surrounding object or component receives this setting.
      name: newVendorName.trim(),
      // Sets the category field so the surrounding object or component receives this setting.
      category: newVendorCategory,
      // Sets the contactPerson field so the surrounding object or component receives this setting.
      contactPerson: newContactPerson.trim(),
      // Sets the phone field so the surrounding object or component receives this setting.
      phone: newPhone.trim() || '+91 98000 00000',
      // Sets the email field so the surrounding object or component receives this setting.
      email: newEmail.trim() || 'info@vendor.com',
      // Sets the city field so the surrounding object or component receives this setting.
      city: newCity.trim() || 'New Delhi',
      // Sets the address field so the surrounding object or component receives this setting.
      address: newAddress.trim() || 'Industrial Area',
      // Sets the gstin field so the surrounding object or component receives this setting.
      gstin: newGstin.trim().toUpperCase() || '07AAAAA0000A1Z5',
      // Sets the rating field so the surrounding object or component receives this setting.
      rating: 4.5,
      // Sets the status field so the surrounding object or component receives this setting.
      status: 'ACTIVE',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    });

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setVendors(getStoredVendors());
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setActiveModal(null);
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Stores the value in handleSaveNewQuote so later lines can reuse this data or behavior for the current feature.
  const handleSaveNewQuote = () => {
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!newQuoteVendorId || !newQuoteDescription.trim()) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      alert('Please fill out all mandatory quote fields.');
      // Returns the result so the caller or React receives the value or interface this function provides.
      return;
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Stores the value in qty so later lines can reuse this data or behavior for the current feature.
    const qty = parseFloat(newQuoteQuantity);
    // Stores the value in rate so later lines can reuse this data or behavior for the current feature.
    const rate = parseFloat(newQuoteRate);
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (isNaN(qty) || qty <= 0 || isNaN(rate) || rate <= 0) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      alert('Please provide valid quantity and unit rate.');
      // Returns the result so the caller or React receives the value or interface this function provides.
      return;
    // Closes the current block or object so the grouped statements or settings end here.
    }

    // Stores the value in matchedProject so later lines can reuse this data or behavior for the current feature.
    const matchedProject = PROJECTS.find((p) => p.id === newQuoteProjectId) || PROJECTS[0];
    // Stores the value in initialTotal so later lines can reuse this data or behavior for the current feature.
    const initialTotal = qty * rate;

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    addQuotationToVendor(newQuoteVendorId, {
      // Sets the quotationNumber field so the surrounding object or component receives this setting.
      quotationNumber: `QT-${Date.now().toString().slice(-4)}`,
      // Sets the vendorId field so the surrounding object or component receives this setting.
      vendorId: newQuoteVendorId,
      // Sets the projectId field so the surrounding object or component receives this setting.
      projectId: matchedProject.id,
      // Sets the projectCode field so the surrounding object or component receives this setting.
      projectCode: matchedProject.code,
      // Sets the projectName field so the surrounding object or component receives this setting.
      projectName: matchedProject.name,
      // Sets the category field so the surrounding object or component receives this setting.
      category: newQuoteCategory,
      // Sets the itemDescription field so the surrounding object or component receives this setting.
      itemDescription: newQuoteDescription.trim(),
      // Sets the quantity field so the surrounding object or component receives this setting.
      quantity: qty,
      // Sets the unit field so the surrounding object or component receives this setting.
      unit: newQuoteUnit,
      // Sets the initialQuotedRate field so the surrounding object or component receives this setting.
      initialQuotedRate: rate,
      // Sets the initialTotalAmount field so the surrounding object or component receives this setting.
      initialTotalAmount: initialTotal,
      // Sets the currentCounterRate field so the surrounding object or component receives this setting.
      currentCounterRate: newQuoteTargetRate ? parseFloat(newQuoteTargetRate) : undefined,
      // Sets the builderTargetRate field so the surrounding object or component receives this setting.
      builderTargetRate: newQuoteTargetRate ? parseFloat(newQuoteTargetRate) : undefined,
      // Sets the gstRate field so the surrounding object or component receives this setting.
      gstRate: parseInt(newQuoteGst, 10),
      // Sets the submittedDate field so the surrounding object or component receives this setting.
      submittedDate: new Date().toISOString().split('T')[0],
      // Sets the validTill field so the surrounding object or component receives this setting.
      validTill: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      // Sets the paymentTermsOffered field so the surrounding object or component receives this setting.
      paymentTermsOffered: newQuotePaymentTerms,
      // Sets the builderNotes field so the surrounding object or component receives this setting.
      builderNotes: 'Initial quote recorded by Builder procurement desk.',
    // Continues the component or data expression so its related values and behavior stay grouped together.
    });

    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setVendors(getStoredVendors());
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    setActiveModal(null);
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Returns the result so the caller or React receives the value or interface this function provides.
  return (
    // Continues the component or data expression so its related values and behavior stay grouped together.
    <AppShell currentPath="/app/vendors">
      {/* Starts the <div> element to organize this part of the interface. */}
      <div className="mx-auto max-w-[1600px] space-y-6 p-5 sm:p-7 lg:p-8">
        {/* Page Header */}
        {/* Starts the <div> element to organize this part of the interface. */}
        <div>
          {/* Starts the <p> element to organize this part of the interface. */}
          <p className="text-sm text-[#8E827A]">Workspace / Procurement</p>
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div>
              {/* Starts the <h1> element to organize this part of the interface. */}
              <h1 className="text-2xl font-bold tracking-tight text-[#323232] sm:text-3xl">
                {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                Vendor Contracts & Quotation Negotiations
              {/* Closes the <h1> element so later content is no longer part of this region. */}
              </h1>
              {/* Starts the <p> element to organize this part of the interface. */}
              <p className="text-sm text-[#8E827A] mt-1 font-light">
                {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                Builder control center for contracted project suppliers, rate discovery, and multi-round price negotiations.
              {/* Closes the <p> element so later content is no longer part of this region. */}
              </p>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={handleOpenNewQuote}
                /* Chooses the element’s browser behavior, such as a button action or input format. */
                type="button"
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="inline-flex items-center gap-2 rounded-full border border-[#E8E0DA] bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#323232] hover:bg-[#F2ECE6] transition-all shadow-xs"
              >
                {/* Starts the <Plus> element to organize this part of the interface. */}
                <Plus className="w-3.5 h-3.5" />
                {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                Add Quotation
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>
              {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
              {admin && (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <button
                  /* Connects the Click event to its handler so the interface can respond to interaction. */
                  onClick={handleOpenAddVendor}
                  /* Chooses the element’s browser behavior, such as a button action or input format. */
                  type="button"
                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                  className="inline-flex items-center gap-2 rounded-full bg-[#323232] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F7F3EE] hover:bg-[#1E1E1E] transition-all shadow-xs"
                >
                  {/* Starts the <UsersRound> element to organize this part of the interface. */}
                  <UsersRound className="w-4 h-4" />
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  Onboard Vendor
                {/* Closes the <button> element so later content is no longer part of this region. */}
                </button>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              )}
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>

        {/* Procurement KPI Summary Banner */}
        {/* Starts the <div> element to organize this part of the interface. */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] p-4">
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E827A]">Total Vendors</span>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-2xl font-bold text-[#323232] mt-1">{kpis.totalVendorsCount}</p>
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[10px] text-emerald-700 font-medium">All KYC & GST verified</span>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>

          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] p-4">
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E827A]">Project Contracts</span>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-2xl font-bold text-[#323232] mt-1">{kpis.totalContractsCount}</p>
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[10px] text-[#8E827A]">Across 4 active sites</span>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>

          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] p-4">
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E827A]">Contracted Value</span>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-xl font-bold text-[#323232] mt-1">{formatINR(kpis.totalContractValue)}</p>
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[10px] text-[#8E827A]">Committed work orders</span>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>

          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] p-4">
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E827A]">Active Negotiations</span>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-2xl font-bold text-amber-700 mt-1">{kpis.activeNegotiationsCount}</p>
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[10px] text-amber-600 font-medium">Quotes in price discovery</span>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>

          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] p-4 col-span-2 md:col-span-1">
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E827A]">Builder Savings</span>
            {/* Starts the <p> element to organize this part of the interface. */}
            <p className="text-xl font-bold text-emerald-700 mt-1 flex items-center gap-1">
              {/* Starts the <TrendingDown> element to organize this part of the interface. */}
              <TrendingDown className="w-4 h-4 text-emerald-600" />
              {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
              {formatINR(kpis.totalNegotiationSavings)}
            {/* Closes the <p> element so later content is no longer part of this region. */}
            </p>
            {/* Starts the <span> element to organize this part of the interface. */}
            <span className="text-[10px] text-emerald-600 font-medium">Gained via counter-offers</span>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>

        {/* View Selection Tabs & Search / Filter Controls */}
        {/* Starts the <div> element to organize this part of the interface. */}
        <div className="flex flex-col gap-4">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8E0DA] pb-3">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center gap-2">
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={() => setActiveTab('NEGOTIATIONS')}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
                  /* Sets the activeTab property so this element receives the data or behavior required by this screen. */
                  activeTab === 'NEGOTIATIONS'
                    /* Continues the component or data expression so its related values and behavior stay grouped together. */
                    ? 'bg-[#323232] text-white shadow-xs'
                    /* Continues the component or data expression so its related values and behavior stay grouped together. */
                    : 'bg-[#FBF9F7] text-[#595552] border border-[#E8E0DA] hover:bg-[#F2ECE6]'
                /* Continues the component or data expression so its related values and behavior stay grouped together. */
                }`}
              >
                {/* Starts the <Handshake> element to organize this part of the interface. */}
                <Handshake className="w-3.5 h-3.5" />
                {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                Quotations & Price Negotiations ({allQuotations.length})
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>

              {/* Starts the <button> element to provide an action the user can activate. */}
              <button
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={() => setActiveTab('VENDORS')}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
                  /* Sets the activeTab property so this element receives the data or behavior required by this screen. */
                  activeTab === 'VENDORS'
                    /* Continues the component or data expression so its related values and behavior stay grouped together. */
                    ? 'bg-[#323232] text-white shadow-xs'
                    /* Continues the component or data expression so its related values and behavior stay grouped together. */
                    : 'bg-[#FBF9F7] text-[#595552] border border-[#E8E0DA] hover:bg-[#F2ECE6]'
                /* Continues the component or data expression so its related values and behavior stay grouped together. */
                }`}
              >
                {/* Starts the <UsersRound> element to organize this part of the interface. */}
                <UsersRound className="w-3.5 h-3.5" />
                {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                All Vendors & Contracts ({vendors.length})
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>

              {/* Starts the <button> element to provide an action the user can activate. */}
              <button
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={() => setActiveTab('BY_PROJECT')}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
                  /* Sets the activeTab property so this element receives the data or behavior required by this screen. */
                  activeTab === 'BY_PROJECT'
                    /* Continues the component or data expression so its related values and behavior stay grouped together. */
                    ? 'bg-[#323232] text-white shadow-xs'
                    /* Continues the component or data expression so its related values and behavior stay grouped together. */
                    : 'bg-[#FBF9F7] text-[#595552] border border-[#E8E0DA] hover:bg-[#F2ECE6]'
                /* Continues the component or data expression so its related values and behavior stay grouped together. */
                }`}
              >
                {/* Starts the <Building2> element to organize this part of the interface. */}
                <Building2 className="w-3.5 h-3.5" />
                {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                Site-Wise Vendor Map
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>

          {/* Filtering Bar */}
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="relative flex-1 min-w-[220px]">
              {/* Starts the <Search> element to organize this part of the interface. */}
              <Search className="w-4 h-4 text-[#8E827A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              {/* Starts the <input> element to collect or display a value. */}
              <input
                /* Chooses the element’s browser behavior, such as a button action or input format. */
                type="text"
                /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                placeholder="Search vendor, item description, GSTIN or quote #..."
                /* Supplies the value shown by this form control so the user sees the current data. */
                value={searchQuery}
                /* Connects the Change event to its handler so the interface can respond to interaction. */
                onChange={(e) => setSearchQuery(e.target.value)}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E8E0DA] bg-white text-xs text-[#323232] placeholder-[#8E827A] focus:outline-none focus:ring-2 focus:ring-[#323232]"
              />
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Project Filter */}
            {/* Starts the <select> element to collect or display a value. */}
            <select
              /* Supplies the value shown by this form control so the user sees the current data. */
              value={selectedProjectId}
              /* Connects the Change event to its handler so the interface can respond to interaction. */
              onChange={(e) => setSelectedProjectId(e.target.value)}
              /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
              className="px-3.5 py-2 rounded-xl border border-[#E8E0DA] bg-white text-xs text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
            >
              {/* Starts the <option> element to organize this part of the interface. */}
              <option value="ALL">All Projects</option>
              {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
              {PROJECTS.map((p) => (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <option key={p.id} value={p.id}>
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  {p.code} - {p.name}
                {/* Closes the <option> element so later content is no longer part of this region. */}
                </option>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              ))}
            {/* Closes the <select> element so later content is no longer part of this region. */}
            </select>

            {/* Category Filter */}
            {/* Starts the <select> element to collect or display a value. */}
            <select
              /* Supplies the value shown by this form control so the user sees the current data. */
              value={selectedCategory}
              /* Connects the Change event to its handler so the interface can respond to interaction. */
              onChange={(e) => setSelectedCategory(e.target.value)}
              /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
              className="px-3.5 py-2 rounded-xl border border-[#E8E0DA] bg-white text-xs text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
            >
              {/* Starts the <option> element to organize this part of the interface. */}
              <option value="ALL">All Categories</option>
              {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
              {CATEGORIES.map((c) => (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <option key={c.value} value={c.value}>
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  {c.label}
                {/* Closes the <option> element so later content is no longer part of this region. */}
                </option>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              ))}
            {/* Closes the <select> element so later content is no longer part of this region. */}
            </select>

            {/* Status Filter for Negotiations tab */}
            {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
            {activeTab === 'NEGOTIATIONS' && (
              // Continues the component or data expression so its related values and behavior stay grouped together.
              <select
                /* Supplies the value shown by this form control so the user sees the current data. */
                value={selectedQuoteStatus}
                /* Connects the Change event to its handler so the interface can respond to interaction. */
                onChange={(e) => setSelectedQuoteStatus(e.target.value)}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="px-3.5 py-2 rounded-xl border border-[#E8E0DA] bg-white text-xs text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
              >
                {/* Starts the <option> element to organize this part of the interface. */}
                <option value="ALL">All Negotiation Statuses</option>
                {/* Starts the <option> element to organize this part of the interface. */}
                <option value="UNDER_NEGOTIATION">Under Negotiation</option>
                {/* Starts the <option> element to organize this part of the interface. */}
                <option value="COUNTER_OFFERED">Counter-Offered</option>
                {/* Starts the <option> element to organize this part of the interface. */}
                <option value="ACCEPTED">Accepted / Contracted</option>
                {/* Starts the <option> element to organize this part of the interface. */}
                <option value="REJECTED">Rejected</option>
                {/* Starts the <option> element to organize this part of the interface. */}
                <option value="SUBMITTED">Newly Submitted</option>
              {/* Closes the <select> element so later content is no longer part of this region. */}
              </select>
            // Continues the component or data expression so its related values and behavior stay grouped together.
            )}
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>

        {/* TAB 1: QUOTATIONS & BUILDER NEGOTIATIONS VIEW */}
        {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
        {activeTab === 'NEGOTIATIONS' && (
          // Continues the component or data expression so its related values and behavior stay grouped together.
          <div className="space-y-4">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="rounded-3xl border border-[#E8E0DA] bg-white shadow-xs overflow-hidden">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="p-4 sm:p-5 border-b border-[#E8E0DA] flex items-center justify-between">
                {/* Starts the <div> element to organize this part of the interface. */}
                <div>
                  {/* Starts the <h3> element to organize this part of the interface. */}
                  <h3 className="font-semibold text-sm text-[#323232]">
                    // Calls this helper or component so the feature can perform the operation or render the control represented here.
                    Material & Service Price Negotiations ({filteredQuotations.length})
                  {/* Closes the <h3> element so later content is no longer part of this region. */}
                  </h3>
                  {/* Starts the <p> element to organize this part of the interface. */}
                  <p className="text-xs text-[#8E827A] mt-0.5">
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    Compare initial vendor bids, submit counter-proposals, and lock finalized contract rates.
                  {/* Closes the <p> element so later content is no longer part of this region. */}
                  </p>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="overflow-x-auto">
                {/* Starts the <table> element to organize this part of the interface. */}
                <table className="w-full text-left text-xs text-[#595552]">
                  {/* Starts the <thead> element to organize this part of the interface. */}
                  <thead className="bg-[#FBF9F7] text-[11px] uppercase tracking-wider text-[#8E827A] border-b border-[#E8E0DA]">
                    {/* Starts the <tr> element to organize this part of the interface. */}
                    <tr>
                      {/* Starts the <th> element to organize this part of the interface. */}
                      <th className="py-3.5 px-4 font-semibold">Quotation / Project</th>
                      {/* Starts the <th> element to organize this part of the interface. */}
                      <th className="py-3.5 px-4 font-semibold">Vendor</th>
                      {/* Starts the <th> element to organize this part of the interface. */}
                      <th className="py-3.5 px-4 font-semibold">Item & Scope</th>
                      {/* Starts the <th> element to organize this part of the interface. */}
                      <th className="py-3.5 px-4 font-semibold">Quantity</th>
                      {/* Starts the <th> element to organize this part of the interface. */}
                      <th className="py-3.5 px-4 font-semibold">Quoted vs Target</th>
                      {/* Starts the <th> element to organize this part of the interface. */}
                      <th className="py-3.5 px-4 font-semibold">Counter / Agreed</th>
                      {/* Starts the <th> element to organize this part of the interface. */}
                      <th className="py-3.5 px-4 font-semibold">Status</th>
                      {/* Starts the <th> element to organize this part of the interface. */}
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    {/* Closes the <tr> element so later content is no longer part of this region. */}
                    </tr>
                  {/* Closes the <thead> element so later content is no longer part of this region. */}
                  </thead>
                  {/* Starts the <tbody> element to organize this part of the interface. */}
                  <tbody className="divide-y divide-[#E8E0DA]/70 font-normal">
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    {filteredQuotations.length === 0 ? (
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      <tr>
                        {/* Starts the <td> element to organize this part of the interface. */}
                        <td colSpan={8} className="py-12 text-center text-[#8E827A]">
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          No quotations match your filters.
                        {/* Closes the <td> element so later content is no longer part of this region. */}
                        </td>
                      {/* Closes the <tr> element so later content is no longer part of this region. */}
                      </tr>
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    ) : (
                      // Transforms each collection item so the corresponding values or interface elements can be produced.
                      filteredQuotations.map((quote) => {
                        // Stores the value in statusBadge so later lines can reuse this data or behavior for the current feature.
                        const statusBadge = getStatusBadge(quote.status);
                        // Stores the value in rateDiff so later lines can reuse this data or behavior for the current feature.
                        const rateDiff = (quote.currentCounterRate || quote.finalAgreedRate)
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          ? quote.initialQuotedRate - (quote.finalAgreedRate || quote.currentCounterRate || quote.initialQuotedRate)
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          : 0;
                        // Stores the value in savingsPercent so later lines can reuse this data or behavior for the current feature.
                        const savingsPercent = quote.initialQuotedRate > 0
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          ? Math.round((rateDiff / quote.initialQuotedRate) * 100)
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          : 0;

                        // Returns the result so the caller or React receives the value or interface this function provides.
                        return (
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          <tr key={quote.id} className="hover:bg-[#FBF9F7] transition-colors">
                            {/* Starts the <td> element to organize this part of the interface. */}
                            <td className="py-3.5 px-4">
                              {/* Starts the <span> element to organize this part of the interface. */}
                              <span className="font-mono font-semibold text-[#323232] block">
                                // Continues the component or data expression so its related values and behavior stay grouped together.
                                {quote.quotationNumber}
                              {/* Closes the <span> element so later content is no longer part of this region. */}
                              </span>
                              {/* Starts the <span> element to organize this part of the interface. */}
                              <span className="text-[11px] text-[#8E827A] flex items-center gap-1 mt-0.5">
                                {/* Starts the <Building2> element to organize this part of the interface. */}
                                <Building2 className="w-3 h-3" />
                                // Continues the component or data expression so its related values and behavior stay grouped together.
                                {quote.projectName}
                              {/* Closes the <span> element so later content is no longer part of this region. */}
                              </span>
                            {/* Closes the <td> element so later content is no longer part of this region. */}
                            </td>

                            {/* Starts the <td> element to organize this part of the interface. */}
                            <td className="py-3.5 px-4">
                              {/* Starts the <span> element to organize this part of the interface. */}
                              <span className="font-medium text-[#323232] block">{quote.vendorName}</span>
                              {/* Starts the <span> element to organize this part of the interface. */}
                              <span className="text-[11px] text-[#8E827A]">{quote.category}</span>
                            {/* Closes the <td> element so later content is no longer part of this region. */}
                            </td>

                            {/* Starts the <td> element to organize this part of the interface. */}
                            <td className="py-3.5 px-4 max-w-[260px]">
                              {/* Starts the <p> element to organize this part of the interface. */}
                              <p className="line-clamp-2 text-[#323232] font-medium" title={quote.itemDescription}>
                                // Continues the component or data expression so its related values and behavior stay grouped together.
                                {quote.itemDescription}
                              {/* Closes the <p> element so later content is no longer part of this region. */}
                              </p>
                              {/* Starts the <span> element to organize this part of the interface. */}
                              <span className="text-[10px] text-[#8E827A]">GST: {quote.gstRate}%</span>
                            {/* Closes the <td> element so later content is no longer part of this region. */}
                            </td>

                            {/* Starts the <td> element to organize this part of the interface. */}
                            <td className="py-3.5 px-4">
                              {/* Starts the <span> element to organize this part of the interface. */}
                              <span className="font-semibold text-[#323232]">
                                // Continues the component or data expression so its related values and behavior stay grouped together.
                                {quote.quantity.toLocaleString('en-IN')} {quote.unit}
                              {/* Closes the <span> element so later content is no longer part of this region. */}
                              </span>
                            {/* Closes the <td> element so later content is no longer part of this region. */}
                            </td>

                            {/* Starts the <td> element to organize this part of the interface. */}
                            <td className="py-3.5 px-4">
                              {/* Starts the <div> element to organize this part of the interface. */}
                              <div>
                                {/* Starts the <span> element to organize this part of the interface. */}
                                <span className="font-semibold text-[#323232]">
                                  // Continues the component or data expression so its related values and behavior stay grouped together.
                                  ₹{quote.initialQuotedRate.toLocaleString('en-IN')}/{quote.unit}
                                {/* Closes the <span> element so later content is no longer part of this region. */}
                                </span>
                                // Continues the component or data expression so its related values and behavior stay grouped together.
                                {quote.builderTargetRate && (
                                  // Continues the component or data expression so its related values and behavior stay grouped together.
                                  <span className="text-[11px] text-amber-700 block">
                                    // Sets the Target field so the surrounding object or component receives this setting.
                                    Target: ₹{quote.builderTargetRate.toLocaleString('en-IN')}
                                  {/* Closes the <span> element so later content is no longer part of this region. */}
                                  </span>
                                // Continues the component or data expression so its related values and behavior stay grouped together.
                                )}
                              {/* Closes the <div> element so later content is no longer part of this region. */}
                              </div>
                            {/* Closes the <td> element so later content is no longer part of this region. */}
                            </td>

                            {/* Starts the <td> element to organize this part of the interface. */}
                            <td className="py-3.5 px-4">
                              // Continues the component or data expression so its related values and behavior stay grouped together.
                              {quote.finalAgreedRate ? (
                                // Continues the component or data expression so its related values and behavior stay grouped together.
                                <div>
                                  {/* Starts the <span> element to organize this part of the interface. */}
                                  <span className="font-bold text-emerald-700 block">
                                    // Continues the component or data expression so its related values and behavior stay grouped together.
                                    ₹{quote.finalAgreedRate.toLocaleString('en-IN')}/{quote.unit}
                                  {/* Closes the <span> element so later content is no longer part of this region. */}
                                  </span>
                                  // Continues the component or data expression so its related values and behavior stay grouped together.
                                  {savingsPercent > 0 && (
                                    // Continues the component or data expression so its related values and behavior stay grouped together.
                                    <span className="text-[10px] text-emerald-600 font-semibold">
                                      // Calls this helper or component so the feature can perform the operation or render the control represented here.
                                      Saved {savingsPercent}% ({formatINR(rateDiff * quote.quantity)})
                                    {/* Closes the <span> element so later content is no longer part of this region. */}
                                    </span>
                                  // Continues the component or data expression so its related values and behavior stay grouped together.
                                  )}
                                {/* Closes the <div> element so later content is no longer part of this region. */}
                                </div>
                              // Continues the component or data expression so its related values and behavior stay grouped together.
                              ) : quote.currentCounterRate ? (
                                // Continues the component or data expression so its related values and behavior stay grouped together.
                                <div>
                                  {/* Starts the <span> element to organize this part of the interface. */}
                                  <span className="font-bold text-blue-700 block">
                                    // Continues the component or data expression so its related values and behavior stay grouped together.
                                    ₹{quote.currentCounterRate.toLocaleString('en-IN')}/{quote.unit}
                                  {/* Closes the <span> element so later content is no longer part of this region. */}
                                  </span>
                                  // Continues the component or data expression so its related values and behavior stay grouped together.
                                  {savingsPercent > 0 && (
                                    // Continues the component or data expression so its related values and behavior stay grouped together.
                                    <span className="text-[10px] text-blue-600 font-semibold">
                                      // Continues the component or data expression so its related values and behavior stay grouped together.
                                      -{savingsPercent}% vs Quote
                                    {/* Closes the <span> element so later content is no longer part of this region. */}
                                    </span>
                                  // Continues the component or data expression so its related values and behavior stay grouped together.
                                  )}
                                {/* Closes the <div> element so later content is no longer part of this region. */}
                                </div>
                              // Continues the component or data expression so its related values and behavior stay grouped together.
                              ) : (
                                // Continues the component or data expression so its related values and behavior stay grouped together.
                                <span className="text-[#8E827A] italic text-[11px]">No counter yet</span>
                              // Continues the component or data expression so its related values and behavior stay grouped together.
                              )}
                            {/* Closes the <td> element so later content is no longer part of this region. */}
                            </td>

                            {/* Starts the <td> element to organize this part of the interface. */}
                            <td className="py-3.5 px-4">
                              {/* Starts the <span> element to organize this part of the interface. */}
                              <span
                                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusBadge.bg}`}
                              >
                                // Continues the component or data expression so its related values and behavior stay grouped together.
                                {statusBadge.label}
                              {/* Closes the <span> element so later content is no longer part of this region. */}
                              </span>
                            {/* Closes the <td> element so later content is no longer part of this region. */}
                            </td>

                            {/* Starts the <td> element to organize this part of the interface. */}
                            <td className="py-3.5 px-4 text-right">
                              {/* Starts the <div> element to organize this part of the interface. */}
                              <div className="flex items-center justify-end gap-1.5">
                                {/* Starts the <button> element to provide an action the user can activate. */}
                                <button
                                  /* Connects the Click event to its handler so the interface can respond to interaction. */
                                  onClick={() => handleOpenNegotiation(quote)}
                                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#323232] text-[#F7F3EE] text-[11px] font-semibold hover:bg-[#1E1E1E] transition-all shadow-xs"
                                >
                                  {/* Starts the <Handshake> element to organize this part of the interface. */}
                                  <Handshake className="w-3.5 h-3.5" />
                                  // Continues the component or data expression so its related values and behavior stay grouped together.
                                  {quote.status === 'ACCEPTED' ? 'View Terms' : 'Negotiate'}
                                {/* Closes the <button> element so later content is no longer part of this region. */}
                                </button>
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
        // Continues the component or data expression so its related values and behavior stay grouped together.
        )}

        {/* TAB 2: ALL VENDORS & CONTRACTS DIRECTORY */}
        {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
        {activeTab === 'VENDORS' && (
          // Continues the component or data expression so its related values and behavior stay grouped together.
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            // Continues the component or data expression so its related values and behavior stay grouped together.
            {filteredVendors.length === 0 ? (
              // Continues the component or data expression so its related values and behavior stay grouped together.
              <div className="col-span-full py-16 text-center text-[#8E827A] bg-white rounded-3xl border border-[#E8E0DA]">
                // Continues the component or data expression so its related values and behavior stay grouped together.
                No vendors found matching your search.
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
            // Continues the component or data expression so its related values and behavior stay grouped together.
            ) : (
              // Transforms each collection item so the corresponding values or interface elements can be produced.
              filteredVendors.map((vendor) => (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <div
                  /* Gives this rendered item a stable identity so React can update lists efficiently. */
                  key={vendor.id}
                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                  className="rounded-3xl border border-[#E8E0DA] bg-white p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  {/* Starts the <div> element to organize this part of the interface. */}
                  <div className="space-y-3">
                    {/* Starts the <div> element to organize this part of the interface. */}
                    <div className="flex items-start justify-between gap-3">
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div>
                        {/* Starts the <div> element to organize this part of the interface. */}
                        <div className="flex items-center gap-2">
                          {/* Starts the <span> element to organize this part of the interface. */}
                          <span className="inline-block px-2 py-0.5 rounded-md bg-[#F2ECE6] text-[#595552] text-[10px] font-semibold">
                            // Continues the component or data expression so its related values and behavior stay grouped together.
                            {vendor.category}
                          {/* Closes the <span> element so later content is no longer part of this region. */}
                          </span>
                          {/* Starts the <span> element to organize this part of the interface. */}
                          <span className="flex items-center gap-0.5 text-amber-600 text-xs font-semibold">
                            {/* Starts the <Star> element to organize this part of the interface. */}
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            // Continues the component or data expression so its related values and behavior stay grouped together.
                            {vendor.rating}
                          {/* Closes the <span> element so later content is no longer part of this region. */}
                          </span>
                        {/* Closes the <div> element so later content is no longer part of this region. */}
                        </div>
                        {/* Starts the <h4> element to organize this part of the interface. */}
                        <h4 className="text-base font-bold text-[#323232] mt-1.5">{vendor.name}</h4>
                        {/* Starts the <p> element to organize this part of the interface. */}
                        <p className="text-xs text-[#8E827A] font-mono mt-0.5">GST: {vendor.gstin}</p>
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
                      {/* Starts the <span> element to organize this part of the interface. */}
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        {vendor.status}
                      {/* Closes the <span> element so later content is no longer part of this region. */}
                      </span>
                    {/* Closes the <div> element so later content is no longer part of this region. */}
                    </div>

                    {/* Contact Snippet */}
                    {/* Starts the <div> element to organize this part of the interface. */}
                    <div className="p-3 rounded-2xl bg-[#FBF9F7] space-y-1.5 text-xs text-[#595552]">
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div className="flex items-center gap-2">
                        {/* Starts the <UsersRound> element to organize this part of the interface. */}
                        <UsersRound className="w-3.5 h-3.5 text-[#8E827A]" />
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span className="font-medium text-[#323232]">{vendor.contactPerson}</span>
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div className="flex items-center gap-2">
                        {/* Starts the <Phone> element to organize this part of the interface. */}
                        <Phone className="w-3.5 h-3.5 text-[#8E827A]" />
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span>{vendor.phone}</span>
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div className="flex items-center gap-2">
                        {/* Starts the <Mail> element to organize this part of the interface. */}
                        <Mail className="w-3.5 h-3.5 text-[#8E827A]" />
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span className="truncate">{vendor.email}</span>
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div className="flex items-center gap-2">
                        {/* Starts the <MapPin> element to organize this part of the interface. */}
                        <MapPin className="w-3.5 h-3.5 text-[#8E827A]" />
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span>{vendor.city}</span>
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
                    {/* Closes the <div> element so later content is no longer part of this region. */}
                    </div>

                    {/* Contracted Projects Summary */}
                    {/* Starts the <div> element to organize this part of the interface. */}
                    <div>
                      {/* Starts the <span> element to organize this part of the interface. */}
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E827A] block mb-1.5">
                        // Calls this helper or component so the feature can perform the operation or render the control represented here.
                        Contracted Projects ({vendor.contracts.length})
                      {/* Closes the <span> element so later content is no longer part of this region. */}
                      </span>
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      {vendor.contracts.length === 0 ? (
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        <p className="text-xs text-[#8E827A] italic">No active contracts signed yet.</p>
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      ) : (
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        <div className="space-y-1.5">
                          // Transforms each collection item so the corresponding values or interface elements can be produced.
                          {vendor.contracts.map((c) => (
                            // Continues the component or data expression so its related values and behavior stay grouped together.
                            <div
                              /* Gives this rendered item a stable identity so React can update lists efficiently. */
                              key={c.id}
                              /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                              className="p-2.5 rounded-xl border border-[#E8E0DA] bg-white text-xs flex items-center justify-between"
                            >
                              {/* Starts the <div> element to organize this part of the interface. */}
                              <div>
                                {/* Starts the <span> element to organize this part of the interface. */}
                                <span className="font-semibold text-[#323232] block">{c.projectName}</span>
                                {/* Starts the <span> element to organize this part of the interface. */}
                                <span className="text-[10px] text-[#8E827A] line-clamp-1">{c.title}</span>
                              {/* Closes the <div> element so later content is no longer part of this region. */}
                              </div>
                              {/* Starts the <span> element to organize this part of the interface. */}
                              <span className="font-bold text-[#323232] text-xs">
                                // Continues the component or data expression so its related values and behavior stay grouped together.
                                {formatINR(c.contractValue)}
                              {/* Closes the <span> element so later content is no longer part of this region. */}
                              </span>
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
                  {/* Closes the <div> element so later content is no longer part of this region. */}
                  </div>

                  {/* Card Footer Actions */}
                  {/* Starts the <div> element to organize this part of the interface. */}
                  <div className="pt-4 mt-4 border-t border-[#E8E0DA] flex items-center justify-between">
                    {/* Starts the <div> element to organize this part of the interface. */}
                    <div>
                      {/* Starts the <span> element to organize this part of the interface. */}
                      <span className="text-[10px] uppercase text-[#8E827A] block">Total Contract Value</span>
                      {/* Starts the <span> element to organize this part of the interface. */}
                      <span className="font-bold text-sm text-[#323232]">
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        {formatINR(vendor.totalContractedValue)}
                      {/* Closes the <span> element so later content is no longer part of this region. */}
                      </span>
                    {/* Closes the <div> element so later content is no longer part of this region. */}
                    </div>

                    {/* Starts the <button> element to provide an action the user can activate. */}
                    <button
                      /* Connects the Click event to its handler so the interface can respond to interaction. */
                      onClick={() => handleOpenVendorDetail(vendor)}
                      /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8E0DA] bg-[#FBF9F7] text-[#323232] text-xs font-semibold hover:bg-[#F2ECE6] transition-colors"
                    >
                      {/* Starts the <Eye> element to organize this part of the interface. */}
                      <Eye className="w-3.5 h-3.5" />
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      View Dossier
                    {/* Closes the <button> element so later content is no longer part of this region. */}
                    </button>
                  {/* Closes the <div> element so later content is no longer part of this region. */}
                  </div>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              ))
            // Continues the component or data expression so its related values and behavior stay grouped together.
            )}
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        // Continues the component or data expression so its related values and behavior stay grouped together.
        )}

        {/* TAB 3: SITE-WISE VENDOR MAP VIEW */}
        {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
        {activeTab === 'BY_PROJECT' && (
          // Continues the component or data expression so its related values and behavior stay grouped together.
          <div className="space-y-6">
            // Transforms each collection item so the corresponding values or interface elements can be produced.
            {PROJECTS.map((project) => {
              // Stores the value in projectContracts so later lines can reuse this data or behavior for the current feature.
              const projectContracts = vendors.flatMap((v) =>
                // Continues the component or data expression so its related values and behavior stay grouped together.
                v.contracts
                  // Keeps only items matching this condition so the result contains relevant data.
                  .filter((c) => c.projectId === project.id)
                  // Transforms each collection item so the corresponding values or interface elements can be produced.
                  .map((c) => ({ ...c, vendorName: v.name, vendorPhone: v.phone, vendorGstin: v.gstin }))
              // Closes this function call or grouped expression so the surrounding code can continue.
              );
              // Stores the value in projectQuotes so later lines can reuse this data or behavior for the current feature.
              const projectQuotes = vendors.flatMap((v) =>
                // Keeps only items matching this condition so the result contains relevant data.
                v.quotations.filter((q) => q.projectId === project.id)
              // Closes this function call or grouped expression so the surrounding code can continue.
              );
              // Stores the value in totalSiteContracted so later lines can reuse this data or behavior for the current feature.
              const totalSiteContracted = projectContracts.reduce((acc, c) => acc + c.contractValue, 0);

              // Returns the result so the caller or React receives the value or interface this function provides.
              return (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <div key={project.id} className="rounded-3xl border border-[#E8E0DA] bg-white p-6 shadow-xs space-y-4">
                  {/* Starts the <div> element to organize this part of the interface. */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#E8E0DA]">
                    {/* Starts the <div> element to organize this part of the interface. */}
                    <div className="flex items-center gap-3">
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div className="w-10 h-10 rounded-2xl bg-[#F2ECE6] flex items-center justify-center text-[#323232]">
                        {/* Starts the <Building2> element to organize this part of the interface. */}
                        <Building2 className="w-5 h-5" />
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div>
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span className="text-xs font-mono font-semibold text-[#8E827A]">{project.code}</span>
                        {/* Starts the <h3> element to organize this part of the interface. */}
                        <h3 className="text-lg font-bold text-[#323232]">{project.name}</h3>
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
                    {/* Closes the <div> element so later content is no longer part of this region. */}
                    </div>

                    {/* Starts the <div> element to organize this part of the interface. */}
                    <div className="flex items-center gap-6">
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div>
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span className="text-[10px] uppercase text-[#8E827A] block font-semibold">
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          Contracted Vendors
                        {/* Closes the <span> element so later content is no longer part of this region. */}
                        </span>
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span className="text-sm font-bold text-[#323232]">{projectContracts.length} On-Site</span>
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div>
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span className="text-[10px] uppercase text-[#8E827A] block font-semibold">
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          Total Committed Value
                        {/* Closes the <span> element so later content is no longer part of this region. */}
                        </span>
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span className="text-sm font-bold text-[#323232]">
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          {formatINR(totalSiteContracted)}
                        {/* Closes the <span> element so later content is no longer part of this region. */}
                        </span>
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div>
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span className="text-[10px] uppercase text-[#8E827A] block font-semibold">
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          Pending Quotes
                        {/* Closes the <span> element so later content is no longer part of this region. */}
                        </span>
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span className="text-sm font-bold text-amber-700">
                          // Keeps only items matching this condition so the result contains relevant data.
                          {projectQuotes.filter((q) => q.status !== 'ACCEPTED').length} Active
                        {/* Closes the <span> element so later content is no longer part of this region. */}
                        </span>
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
                    {/* Closes the <div> element so later content is no longer part of this region. */}
                    </div>
                  {/* Closes the <div> element so later content is no longer part of this region. */}
                  </div>

                  {/* Contracted Vendors List for this Project */}
                  {/* Starts the <div> element to organize this part of the interface. */}
                  <div>
                    {/* Starts the <h4> element to organize this part of the interface. */}
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8E827A] mb-3">
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      Executed Project Contracts
                    {/* Closes the <h4> element so later content is no longer part of this region. */}
                    </h4>
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    {projectContracts.length === 0 ? (
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      <p className="text-xs text-[#8E827A] italic py-2">
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        No active vendor contracts assigned to this project yet.
                      {/* Closes the <p> element so later content is no longer part of this region. */}
                      </p>
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    ) : (
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        // Transforms each collection item so the corresponding values or interface elements can be produced.
                        {projectContracts.map((contract) => (
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          <div
                            /* Gives this rendered item a stable identity so React can update lists efficiently. */
                            key={contract.id}
                            /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                            className="p-4 rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] space-y-2 text-xs"
                          >
                            {/* Starts the <div> element to organize this part of the interface. */}
                            <div className="flex items-start justify-between gap-2">
                              {/* Starts the <div> element to organize this part of the interface. */}
                              <div>
                                {/* Starts the <span> element to organize this part of the interface. */}
                                <span className="font-bold text-sm text-[#323232] block">
                                  // Continues the component or data expression so its related values and behavior stay grouped together.
                                  {contract.vendorName}
                                {/* Closes the <span> element so later content is no longer part of this region. */}
                                </span>
                                {/* Starts the <span> element to organize this part of the interface. */}
                                <span className="text-[10px] text-[#8E827A] font-mono">
                                  // Continues the component or data expression so its related values and behavior stay grouped together.
                                  {contract.contractNumber} • {contract.category}
                                {/* Closes the <span> element so later content is no longer part of this region. */}
                                </span>
                              {/* Closes the <div> element so later content is no longer part of this region. */}
                              </div>
                              {/* Starts the <span> element to organize this part of the interface. */}
                              <span className="font-bold text-sm text-[#323232]">
                                // Continues the component or data expression so its related values and behavior stay grouped together.
                                {formatINR(contract.contractValue)}
                              {/* Closes the <span> element so later content is no longer part of this region. */}
                              </span>
                            {/* Closes the <div> element so later content is no longer part of this region. */}
                            </div>
                            {/* Starts the <p> element to organize this part of the interface. */}
                            <p className="text-[#595552] line-clamp-2">{contract.title}</p>
                            {/* Starts the <div> element to organize this part of the interface. */}
                            <div className="pt-2 border-t border-[#E8E0DA]/60 flex items-center justify-between text-[11px] text-[#8E827A]">
                              {/* Starts the <span> element to organize this part of the interface. */}
                              <span>Valid: {contract.startDate} to {contract.endDate}</span>
                              {/* Starts the <span> element to organize this part of the interface. */}
                              <span className="text-emerald-700 font-semibold">{contract.status}</span>
                            {/* Closes the <div> element so later content is no longer part of this region. */}
                            </div>
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
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
              // Closes this function call or grouped expression so the surrounding code can continue.
              );
            // Continues the component or data expression so its related values and behavior stay grouped together.
            })}
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        // Continues the component or data expression so its related values and behavior stay grouped together.
        )}
      {/* Closes the <div> element so later content is no longer part of this region. */}
      </div>

      {/* ===================== MODALS ===================== */}

      {/* 1. NEGOTIATION / COUNTER-OFFER MODAL */}
      {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
      {activeModal === 'NEGOTIATE' && selectedQuote && (
        // Continues the component or data expression so its related values and behavior stay grouped together.
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#323232]/40 backdrop-blur-xs">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E0DA] max-h-[92vh] overflow-y-auto space-y-6">
            {/* Header */}
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E8E0DA]">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div className="flex items-center gap-2">
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F2ECE6] text-[#595552]">
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    {selectedQuote.category}
                  {/* Closes the <span> element so later content is no longer part of this region. */}
                  </span>
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span className="font-mono text-xs text-[#8E827A]">{selectedQuote.quotationNumber}</span>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
                {/* Starts the <h3> element to organize this part of the interface. */}
                <h3 className="text-xl font-bold text-[#323232] mt-1">{selectedQuote.itemDescription}</h3>
                {/* Starts the <p> element to organize this part of the interface. */}
                <p className="text-xs text-[#8E827A] mt-0.5">
                  {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                  Vendor: <strong className="text-[#323232]">{selectedQuote.vendorName}</strong> | Project: <strong className="text-[#323232]">{selectedQuote.projectName}</strong>
                {/* Closes the <p> element so later content is no longer part of this region. */}
                </p>
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

            {/* Price Discovery Matrix Cards */}
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="p-3.5 rounded-2xl bg-[#FBF9F7] border border-[#E8E0DA]">
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-[#8E827A] text-[10px] uppercase font-semibold block">Total Quantity</span>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-sm font-bold text-[#323232] mt-1 block">
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  {selectedQuote.quantity.toLocaleString('en-IN')} {selectedQuote.unit}
                {/* Closes the <span> element so later content is no longer part of this region. */}
                </span>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-[10px] text-[#8E827A]">Estimated Requirement</span>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="p-3.5 rounded-2xl bg-[#FBF9F7] border border-[#E8E0DA]">
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-[#8E827A] text-[10px] uppercase font-semibold block">Vendor Quote</span>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-sm font-bold text-[#323232] mt-1 block">
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  ₹{selectedQuote.initialQuotedRate.toLocaleString('en-IN')}/{selectedQuote.unit}
                {/* Closes the <span> element so later content is no longer part of this region. */}
                </span>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-[10px] text-[#8E827A]">Total: {formatINR(selectedQuote.initialTotalAmount)}</span>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-amber-800 text-[10px] uppercase font-semibold block">Builder Target</span>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-sm font-bold text-amber-900 mt-1 block">
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  ₹{(selectedQuote.builderTargetRate || selectedQuote.initialQuotedRate * 0.9).toLocaleString('en-IN')}/{selectedQuote.unit}
                {/* Closes the <span> element so later content is no longer part of this region. */}
                </span>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-[10px] text-amber-700">Budgeted ceiling</span>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-emerald-800 text-[10px] uppercase font-semibold block">Active Counter / Agreed</span>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-sm font-bold text-emerald-900 mt-1 block">
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  ₹{(selectedQuote.finalAgreedRate || selectedQuote.currentCounterRate || selectedQuote.initialQuotedRate).toLocaleString('en-IN')}/{selectedQuote.unit}
                {/* Closes the <span> element so later content is no longer part of this region. */}
                </span>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-[10px] text-emerald-700">
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  {selectedQuote.finalAgreedRate ? 'Contract Locked' : 'Latest Proposed Rate'}
                {/* Closes the <span> element so later content is no longer part of this region. */}
                </span>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Negotiation History Timeline */}
            {/* Starts the <div> element to organize this part of the interface. */}
            <div>
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="flex items-center justify-between mb-3">
                {/* Starts the <h4> element to organize this part of the interface. */}
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8E827A] flex items-center gap-1.5">
                  {/* Starts the <MessageSquare> element to organize this part of the interface. */}
                  <MessageSquare className="w-3.5 h-3.5" />
                  // Calls this helper or component so the feature can perform the operation or render the control represented here.
                  Negotiation Rounds & Audit Trail ({selectedQuote.negotiationHistory.length})
                {/* Closes the <h4> element so later content is no longer part of this region. */}
                </h4>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-[11px] text-[#8E827A]">Terms: {selectedQuote.paymentTermsOffered}</span>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="space-y-3 rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] p-4 max-h-[220px] overflow-y-auto">
                // Transforms each collection item so the corresponding values or interface elements can be produced.
                {selectedQuote.negotiationHistory.map((item, idx) => (
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  <div
                    /* Gives this rendered item a stable identity so React can update lists efficiently. */
                    key={item.id}
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className={`p-3 rounded-xl border text-xs space-y-1 ${
                      /* Sets the item.role property so this element receives the data or behavior required by this screen. */
                      item.role === 'BUILDER'
                        /* Continues the component or data expression so its related values and behavior stay grouped together. */
                        ? 'bg-amber-50/60 border-amber-200 ml-4'
                        /* Continues the component or data expression so its related values and behavior stay grouped together. */
                        : 'bg-white border-[#E8E0DA] mr-4'
                    /* Continues the component or data expression so its related values and behavior stay grouped together. */
                    }`}
                  >
                    {/* Starts the <div> element to organize this part of the interface. */}
                    <div className="flex items-center justify-between font-semibold">
                      {/* Starts the <span> element to organize this part of the interface. */}
                      <span className={item.role === 'BUILDER' ? 'text-amber-900' : 'text-[#323232]'}>
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        {idx + 1}. {item.author}
                      {/* Closes the <span> element so later content is no longer part of this region. */}
                      </span>
                      {/* Starts the <span> element to organize this part of the interface. */}
                      <span className="text-[10px] text-[#8E827A] font-mono">{item.date}</span>
                    {/* Closes the <div> element so later content is no longer part of this region. */}
                    </div>
                    {/* Starts the <div> element to organize this part of the interface. */}
                    <div className="flex items-center gap-2">
                      {/* Starts the <span> element to organize this part of the interface. */}
                      <span className="text-xs font-bold text-[#323232]">
                        // Sets the Proposed field so the surrounding object or component receives this setting.
                        Proposed: ₹{item.offeredRate.toLocaleString('en-IN')} {item.unit}
                      {/* Closes the <span> element so later content is no longer part of this region. */}
                      </span>
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      {item.creditDaysOffered && (
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        <span className="text-[10px] text-[#8E827A] bg-[#F2ECE6] px-1.5 py-0.5 rounded">
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          {item.creditDaysOffered} days credit
                        {/* Closes the <span> element so later content is no longer part of this region. */}
                        </span>
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      )}
                    {/* Closes the <div> element so later content is no longer part of this region. */}
                    </div>
                    {/* Starts the <p> element to organize this part of the interface. */}
                    <p className="text-[#595552] text-[11px] italic mt-0.5">{item.notes}</p>
                  {/* Closes the <div> element so later content is no longer part of this region. */}
                  </div>
                // Continues the component or data expression so its related values and behavior stay grouped together.
                ))}
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Builder Action Panel */}
            // Continues the component or data expression so its related values and behavior stay grouped together.
            {selectedQuote.status !== 'ACCEPTED' && (
              // Continues the component or data expression so its related values and behavior stay grouped together.
              <div className="p-4 rounded-2xl border border-[#E8E0DA] bg-white space-y-4">
                {/* Starts the <h4> element to organize this part of the interface. */}
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#323232] flex items-center gap-2">
                  {/* Starts the <Handshake> element to organize this part of the interface. */}
                  <Handshake className="w-4 h-4 text-emerald-700" />
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  Submit Builder Counter-Offer or Lock Agreement
                {/* Closes the <h4> element so later content is no longer part of this region. */}
                </h4>

                // Continues the component or data expression so its related values and behavior stay grouped together.
                {!isRejecting ? (
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  <>
                    {/* Starts the <div> element to organize this part of the interface. */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div>
                        {/* Starts the <label> element to name a form control for users and assistive technology. */}
                        <label className="text-[11px] font-semibold text-[#595552] block mb-1">
                          // Calls this helper or component so the feature can perform the operation or render the control represented here.
                          Counter-Offer Unit Rate (₹ per {selectedQuote.unit}) *
                        {/* Closes the <label> element so later content is no longer part of this region. */}
                        </label>
                        {/* Starts the <input> element to collect or display a value. */}
                        <input
                          /* Chooses the element’s browser behavior, such as a button action or input format. */
                          type="number"
                          /* Supplies the value shown by this form control so the user sees the current data. */
                          value={counterRateInput}
                          /* Connects the Change event to its handler so the interface can respond to interaction. */
                          onChange={(e) => setCounterRateInput(e.target.value)}
                          /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                          placeholder="e.g. 345"
                          /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                          className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                        />
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>

                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div>
                        {/* Starts the <label> element to name a form control for users and assistive technology. */}
                        <label className="text-[11px] font-semibold text-[#595552] block mb-1">
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          Credit Days / Payment Terms
                        {/* Closes the <label> element so later content is no longer part of this region. */}
                        </label>
                        {/* Starts the <input> element to collect or display a value. */}
                        <input
                          /* Chooses the element’s browser behavior, such as a button action or input format. */
                          type="text"
                          /* Supplies the value shown by this form control so the user sees the current data. */
                          defaultValue="30 Days credit against verified challans"
                          /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                          className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                        />
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
                    {/* Closes the <div> element so later content is no longer part of this region. */}
                    </div>

                    {/* Starts the <div> element to organize this part of the interface. */}
                    <div>
                      {/* Starts the <label> element to name a form control for users and assistive technology. */}
                      <label className="text-[11px] font-semibold text-[#595552] block mb-1">
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        Negotiation Justification / Counter Notes
                      {/* Closes the <label> element so later content is no longer part of this region. */}
                      </label>
                      {/* Starts the <textarea> element to collect or display a value. */}
                      <textarea
                        /* Sets the rows property so this element receives the data or behavior required by this screen. */
                        rows={2}
                        /* Supplies the value shown by this form control so the user sees the current data. */
                        value={negotiationNotes}
                        /* Connects the Change event to its handler so the interface can respond to interaction. */
                        onChange={(e) => setNegotiationNotes(e.target.value)}
                        /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                        placeholder="State reason: e.g. multi-site volume discount, absorption of site unloading costs, competitor rate comparison..."
                        /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                        className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-xs text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                      />
                    {/* Closes the <div> element so later content is no longer part of this region. */}
                    </div>

                    {/* Starts the <div> element to organize this part of the interface. */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      {/* Starts the <button> element to provide an action the user can activate. */}
                      <button
                        /* Connects the Click event to its handler so the interface can respond to interaction. */
                        onClick={() => setIsRejecting(true)}
                        /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                        className="text-xs text-rose-700 font-semibold hover:underline"
                      >
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        Reject Quotation
                      {/* Closes the <button> element so later content is no longer part of this region. */}
                      </button>

                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div className="flex items-center gap-2">
                        {/* Starts the <button> element to provide an action the user can activate. */}
                        <button
                          /* Connects the Click event to its handler so the interface can respond to interaction. */
                          onClick={handleSubmitCounterOffer}
                          /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                          className="px-4 py-2 rounded-full border border-[#323232] text-xs font-semibold text-[#323232] hover:bg-[#F2ECE6] transition-colors"
                        >
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          Send Counter-Offer
                        {/* Closes the <button> element so later content is no longer part of this region. */}
                        </button>
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        {admin && (
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          <button
                            /* Connects the Click event to its handler so the interface can respond to interaction. */
                            onClick={handleAcceptNegotiation}
                            /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                            className="px-5 py-2 rounded-full bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-xs flex items-center gap-1.5"
                          >
                            {/* Starts the <Check> element to organize this part of the interface. */}
                            <Check className="w-3.5 h-3.5" />
                            // Continues the component or data expression so its related values and behavior stay grouped together.
                            Accept & Lock Contract
                          {/* Closes the <button> element so later content is no longer part of this region. */}
                          </button>
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        )}
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
                    {/* Closes the <div> element so later content is no longer part of this region. */}
                    </div>
                  {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
                  </>
                // Continues the component or data expression so its related values and behavior stay grouped together.
                ) : (
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  <div className="space-y-3">
                    {/* Starts the <label> element to name a form control for users and assistive technology. */}
                    <label className="text-xs font-semibold text-rose-800 block">
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      State reason for rejecting quotation:
                    {/* Closes the <label> element so later content is no longer part of this region. */}
                    </label>
                    {/* Starts the <textarea> element to collect or display a value. */}
                    <textarea
                      /* Sets the rows property so this element receives the data or behavior required by this screen. */
                      rows={2}
                      /* Supplies the value shown by this form control so the user sees the current data. */
                      value={rejectReasonInput}
                      /* Connects the Change event to its handler so the interface can respond to interaction. */
                      onChange={(e) => setRejectReasonInput(e.target.value)}
                      /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                      placeholder="e.g. Rate unacceptable, specifications do not match architectural schedule, or vendor disqualified."
                      /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                      className="w-full p-2.5 rounded-xl border border-rose-300 text-xs text-[#323232] focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                    {/* Starts the <div> element to organize this part of the interface. */}
                    <div className="flex justify-end gap-2">
                      {/* Starts the <button> element to provide an action the user can activate. */}
                      <button
                        /* Connects the Click event to its handler so the interface can respond to interaction. */
                        onClick={() => setIsRejecting(false)}
                        /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                        className="px-3 py-1.5 rounded-full border border-[#E8E0DA] text-xs font-semibold text-[#595552]"
                      >
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        Cancel
                      {/* Closes the <button> element so later content is no longer part of this region. */}
                      </button>
                      {/* Starts the <button> element to provide an action the user can activate. */}
                      <button
                        /* Connects the Click event to its handler so the interface can respond to interaction. */
                        onClick={handleRejectQuotationSubmit}
                        /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                        className="px-4 py-1.5 rounded-full bg-rose-700 text-white text-xs font-semibold hover:bg-rose-800"
                      >
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        Confirm Rejection
                      {/* Closes the <button> element so later content is no longer part of this region. */}
                      </button>
                    {/* Closes the <div> element so later content is no longer part of this region. */}
                    </div>
                  {/* Closes the <div> element so later content is no longer part of this region. */}
                  </div>
                // Continues the component or data expression so its related values and behavior stay grouped together.
                )}
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
            // Continues the component or data expression so its related values and behavior stay grouped together.
            )}
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
      // Continues the component or data expression so its related values and behavior stay grouped together.
      )}

      {/* 2. VENDOR DOSSIER MODAL */}
      {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
      {activeModal === 'VIEW_VENDOR' && selectedVendor && (
        // Continues the component or data expression so its related values and behavior stay grouped together.
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#323232]/40 backdrop-blur-xs">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E0DA] max-h-[90vh] overflow-y-auto space-y-6">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E8E0DA]">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8E827A]">
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  Vendor Profile & Audit Dossier
                {/* Closes the <span> element so later content is no longer part of this region. */}
                </span>
                {/* Starts the <h3> element to organize this part of the interface. */}
                <h3 className="text-xl font-bold text-[#323232] mt-0.5">{selectedVendor.name}</h3>
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="text-xs text-[#8E827A]">{selectedVendor.city} • Category: {selectedVendor.category}</span>
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

            {/* Legal & Banking Grid */}
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="p-4 rounded-2xl bg-[#FBF9F7] border border-[#E8E0DA] space-y-2">
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="font-semibold text-[#323232] block flex items-center gap-1.5">
                  {/* Starts the <ShieldCheck> element to organize this part of the interface. */}
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  // Continues the component or data expression so its related values and behavior stay grouped together.
                  Tax & Verification
                {/* Closes the <span> element so later content is no longer part of this region. */}
                </span>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div className="flex justify-between">
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span className="text-[#8E827A]">GSTIN</span>
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span className="font-mono font-semibold text-[#323232]">{selectedVendor.gstin}</span>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div className="flex justify-between">
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span className="text-[#8E827A]">PAN</span>
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span className="font-mono font-semibold text-[#323232]">{selectedVendor.panNumber || 'On file'}</span>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div className="flex justify-between">
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span className="text-[#8E827A]">Vendor Status</span>
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span className="text-emerald-700 font-semibold">{selectedVendor.status}</span>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="p-4 rounded-2xl bg-[#FBF9F7] border border-[#E8E0DA] space-y-2">
                {/* Starts the <span> element to organize this part of the interface. */}
                <span className="font-semibold text-[#323232] block flex items-center gap-1.5">
                  {/* Starts the <Receipt> element to organize this part of the interface. */}
                  <Receipt className="w-4 h-4 text-[#8E827A]" />
                  // Calls this helper or component so the feature can perform the operation or render the control represented here.
                  Bank Account (For RTGS Settlement)
                {/* Closes the <span> element so later content is no longer part of this region. */}
                </span>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div className="flex justify-between">
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span className="text-[#8E827A]">Bank</span>
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span className="font-semibold text-[#323232]">{selectedVendor.bankDetails?.bankName || 'HDFC Bank'}</span>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div className="flex justify-between">
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span className="text-[#8E827A]">Account #</span>
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span className="font-mono font-semibold text-[#323232]">{selectedVendor.bankDetails?.accountNumber || '••••••••4120'}</span>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div className="flex justify-between">
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span className="text-[#8E827A]">IFSC Code</span>
                  {/* Starts the <span> element to organize this part of the interface. */}
                  <span className="font-mono font-semibold text-[#323232]">{selectedVendor.bankDetails?.ifscCode || 'HDFC0000060'}</span>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Contracts List */}
            {/* Starts the <div> element to organize this part of the interface. */}
            <div>
              {/* Starts the <h4> element to organize this part of the interface. */}
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8E827A] mb-3">
                // Calls this helper or component so the feature can perform the operation or render the control represented here.
                Contracted Projects ({selectedVendor.contracts.length})
              {/* Closes the <h4> element so later content is no longer part of this region. */}
              </h4>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              {selectedVendor.contracts.length === 0 ? (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <p className="text-xs text-[#8E827A] italic">No contracts currently active.</p>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              ) : (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <div className="space-y-2.5">
                  // Transforms each collection item so the corresponding values or interface elements can be produced.
                  {selectedVendor.contracts.map((c) => (
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    <div
                      /* Gives this rendered item a stable identity so React can update lists efficiently. */
                      key={c.id}
                      /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                      className="p-3.5 rounded-2xl border border-[#E8E0DA] bg-[#FBF9F7] text-xs space-y-1.5"
                    >
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div className="flex items-center justify-between font-semibold">
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span className="text-[#323232]">{c.projectName} ({c.projectCode})</span>
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span className="text-[#323232] font-bold">{formatINR(c.contractValue)}</span>
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
                      {/* Starts the <p> element to organize this part of the interface. */}
                      <p className="text-[#595552]">{c.title}</p>
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div className="flex justify-between text-[11px] text-[#8E827A] pt-1 border-t border-[#E8E0DA]/60">
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span>Terms: {c.paymentTerms}</span>
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span className="text-emerald-700 font-semibold">{c.status}</span>
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
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

            {/* Quotations List */}
            {/* Starts the <div> element to organize this part of the interface. */}
            <div>
              {/* Starts the <h4> element to organize this part of the interface. */}
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8E827A] mb-3">
                // Calls this helper or component so the feature can perform the operation or render the control represented here.
                Quotations Submitted ({selectedVendor.quotations.length})
              {/* Closes the <h4> element so later content is no longer part of this region. */}
              </h4>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              {selectedVendor.quotations.length === 0 ? (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <p className="text-xs text-[#8E827A] italic">No quotations submitted.</p>
              // Continues the component or data expression so its related values and behavior stay grouped together.
              ) : (
                // Continues the component or data expression so its related values and behavior stay grouped together.
                <div className="space-y-2">
                  // Transforms each collection item so the corresponding values or interface elements can be produced.
                  {selectedVendor.quotations.map((q) => (
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    <div
                      /* Gives this rendered item a stable identity so React can update lists efficiently. */
                      key={q.id}
                      /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                      className="p-3 rounded-xl border border-[#E8E0DA] bg-white flex items-center justify-between text-xs"
                    >
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div>
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span className="font-semibold text-[#323232] block">{q.itemDescription}</span>
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span className="text-[11px] text-[#8E827A]">
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          {q.projectName} • {q.quantity} {q.unit} @ ₹{q.initialQuotedRate}/{q.unit}
                        {/* Closes the <span> element so later content is no longer part of this region. */}
                        </span>
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
                      {/* Starts the <div> element to organize this part of the interface. */}
                      <div className="text-right">
                        {/* Starts the <span> element to organize this part of the interface. */}
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(q.status).bg}`}>
                          // Continues the component or data expression so its related values and behavior stay grouped together.
                          {getStatusBadge(q.status).label}
                        {/* Closes the <span> element so later content is no longer part of this region. */}
                        </span>
                      {/* Closes the <div> element so later content is no longer part of this region. */}
                      </div>
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
          {/* Closes the <div> element so later content is no longer part of this region. */}
          </div>
        {/* Closes the <div> element so later content is no longer part of this region. */}
        </div>
      // Continues the component or data expression so its related values and behavior stay grouped together.
      )}

      {/* 3. ONBOARD VENDOR MODAL */}
      {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
      {activeModal === 'ADD_VENDOR' && (
        // Continues the component or data expression so its related values and behavior stay grouped together.
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#323232]/40 backdrop-blur-xs">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E0DA] space-y-4">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E0DA]">
              {/* Starts the <h3> element to organize this part of the interface. */}
              <h3 className="font-bold text-base text-[#323232]">Onboard New Vendor</h3>
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
                <label className="font-semibold text-[#595552] block mb-1">Company / Trade Name *</label>
                {/* Starts the <input> element to collect or display a value. */}
                <input
                  /* Chooses the element’s browser behavior, such as a button action or input format. */
                  type="text"
                  /* Supplies the value shown by this form control so the user sees the current data. */
                  value={newVendorName}
                  /* Connects the Change event to its handler so the interface can respond to interaction. */
                  onChange={(e) => setNewVendorName(e.target.value)}
                  /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                  placeholder="e.g. JSW Steel Ltd or Jaquar Bath Fittings"
                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                  className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                />
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="grid grid-cols-2 gap-3">
                {/* Starts the <div> element to organize this part of the interface. */}
                <div>
                  {/* Starts the <label> element to name a form control for users and assistive technology. */}
                  <label className="font-semibold text-[#595552] block mb-1">Primary Category</label>
                  {/* Starts the <select> element to collect or display a value. */}
                  <select
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value={newVendorCategory}
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => setNewVendorCategory(e.target.value as VendorCategory)}
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                  >
                    // Transforms each collection item so the corresponding values or interface elements can be produced.
                    {CATEGORIES.map((c) => (
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      <option key={c.value} value={c.value}>
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        {c.label}
                      {/* Closes the <option> element so later content is no longer part of this region. */}
                      </option>
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    ))}
                  {/* Closes the <select> element so later content is no longer part of this region. */}
                  </select>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div>
                  {/* Starts the <label> element to name a form control for users and assistive technology. */}
                  <label className="font-semibold text-[#595552] block mb-1">GSTIN (15 Digits)</label>
                  {/* Starts the <input> element to collect or display a value. */}
                  <input
                    /* Chooses the element’s browser behavior, such as a button action or input format. */
                    type="text"
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value={newGstin}
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => setNewGstin(e.target.value)}
                    /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                    placeholder="07AAAAA0000A1Z5"
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-[#323232] uppercase focus:outline-none focus:ring-2 focus:ring-[#323232]"
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
                  <label className="font-semibold text-[#595552] block mb-1">Contact Person *</label>
                  {/* Starts the <input> element to collect or display a value. */}
                  <input
                    /* Chooses the element’s browser behavior, such as a button action or input format. */
                    type="text"
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value={newContactPerson}
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => setNewContactPerson(e.target.value)}
                    /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                    placeholder="e.g. Amit Sharma"
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                  />
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div>
                  {/* Starts the <label> element to name a form control for users and assistive technology. */}
                  <label className="font-semibold text-[#595552] block mb-1">Phone Number</label>
                  {/* Starts the <input> element to collect or display a value. */}
                  <input
                    /* Chooses the element’s browser behavior, such as a button action or input format. */
                    type="text"
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value={newPhone}
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => setNewPhone(e.target.value)}
                    /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                    placeholder="+91 98000 00000"
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
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
                  <label className="font-semibold text-[#595552] block mb-1">Email</label>
                  {/* Starts the <input> element to collect or display a value. */}
                  <input
                    /* Chooses the element’s browser behavior, such as a button action or input format. */
                    type="email"
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value={newEmail}
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => setNewEmail(e.target.value)}
                    /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                    placeholder="sales@vendor.com"
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                  />
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div>
                  {/* Starts the <label> element to name a form control for users and assistive technology. */}
                  <label className="font-semibold text-[#595552] block mb-1">City / Region</label>
                  {/* Starts the <input> element to collect or display a value. */}
                  <input
                    /* Chooses the element’s browser behavior, such as a button action or input format. */
                    type="text"
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value={newCity}
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => setNewCity(e.target.value)}
                    /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                    placeholder="Delhi NCR / Mumbai"
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                  />
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#E8E0DA]">
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={() => setActiveModal(null)}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="px-4 py-2 rounded-full border border-[#E8E0DA] text-xs font-semibold text-[#595552]"
              >
                // Continues the component or data expression so its related values and behavior stay grouped together.
                Cancel
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={handleSaveNewVendor}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="px-5 py-2 rounded-full bg-[#323232] text-white text-xs font-semibold hover:bg-[#1E1E1E]"
              >
                // Continues the component or data expression so its related values and behavior stay grouped together.
                Save & Onboard
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

      {/* 4. NEW QUOTATION REQUEST MODAL */}
      {/* Adds this JSX content to the surrounding interface so related information or controls appear in the right place. */}
      {activeModal === 'NEW_QUOTE' && (
        // Continues the component or data expression so its related values and behavior stay grouped together.
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#323232]/40 backdrop-blur-xs">
          {/* Starts the <div> element to organize this part of the interface. */}
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8E0DA] space-y-4">
            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E0DA]">
              {/* Starts the <h3> element to organize this part of the interface. */}
              <h3 className="font-bold text-base text-[#323232]">Record Vendor Quotation</h3>
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
              <div className="grid grid-cols-2 gap-3">
                {/* Starts the <div> element to organize this part of the interface. */}
                <div>
                  {/* Starts the <label> element to name a form control for users and assistive technology. */}
                  <label className="font-semibold text-[#595552] block mb-1">Select Vendor *</label>
                  {/* Starts the <select> element to collect or display a value. */}
                  <select
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value={newQuoteVendorId}
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => setNewQuoteVendorId(e.target.value)}
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                  >
                    // Transforms each collection item so the corresponding values or interface elements can be produced.
                    {vendors.map((v) => (
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      <option key={v.id} value={v.id}>
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        {v.name}
                      {/* Closes the <option> element so later content is no longer part of this region. */}
                      </option>
                    // Continues the component or data expression so its related values and behavior stay grouped together.
                    ))}
                  {/* Closes the <select> element so later content is no longer part of this region. */}
                  </select>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>

                {/* Starts the <div> element to organize this part of the interface. */}
                <div>
                  {/* Starts the <label> element to name a form control for users and assistive technology. */}
                  <label className="font-semibold text-[#595552] block mb-1">Project Site *</label>
                  {/* Starts the <select> element to collect or display a value. */}
                  <select
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value={newQuoteProjectId}
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => setNewQuoteProjectId(e.target.value)}
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                  >
                    // Transforms each collection item so the corresponding values or interface elements can be produced.
                    {PROJECTS.map((p) => (
                      // Continues the component or data expression so its related values and behavior stay grouped together.
                      <option key={p.id} value={p.id}>
                        // Continues the component or data expression so its related values and behavior stay grouped together.
                        {p.code} - {p.name}
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
              <div>
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label className="font-semibold text-[#595552] block mb-1">Item Description / Work Scope *</label>
                {/* Starts the <input> element to collect or display a value. */}
                <input
                  /* Chooses the element’s browser behavior, such as a button action or input format. */
                  type="text"
                  /* Supplies the value shown by this form control so the user sees the current data. */
                  value={newQuoteDescription}
                  /* Connects the Change event to its handler so the interface can respond to interaction. */
                  onChange={(e) => setNewQuoteDescription(e.target.value)}
                  /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                  placeholder="e.g. Fe500D TMT Rebars 20mm & 25mm (100 MT) for Tower C"
                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                  className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                />
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div className="grid grid-cols-3 gap-3">
                {/* Starts the <div> element to organize this part of the interface. */}
                <div>
                  {/* Starts the <label> element to name a form control for users and assistive technology. */}
                  <label className="font-semibold text-[#595552] block mb-1">Quantity *</label>
                  {/* Starts the <input> element to collect or display a value. */}
                  <input
                    /* Chooses the element’s browser behavior, such as a button action or input format. */
                    type="number"
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value={newQuoteQuantity}
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => setNewQuoteQuantity(e.target.value)}
                    /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                    placeholder="1000"
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                  />
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div>
                  {/* Starts the <label> element to name a form control for users and assistive technology. */}
                  <label className="font-semibold text-[#595552] block mb-1">Unit</label>
                  {/* Starts the <input> element to collect or display a value. */}
                  <input
                    /* Chooses the element’s browser behavior, such as a button action or input format. */
                    type="text"
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value={newQuoteUnit}
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => setNewQuoteUnit(e.target.value)}
                    /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                    placeholder="Bags, MT, Cu.M"
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                  />
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div>
                  {/* Starts the <label> element to name a form control for users and assistive technology. */}
                  <label className="font-semibold text-[#595552] block mb-1">Quoted Rate (₹) *</label>
                  {/* Starts the <input> element to collect or display a value. */}
                  <input
                    /* Chooses the element’s browser behavior, such as a button action or input format. */
                    type="number"
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value={newQuoteRate}
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => setNewQuoteRate(e.target.value)}
                    /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                    placeholder="Rate per unit"
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
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
                  <label className="font-semibold text-[#595552] block mb-1">Builder Target Rate (₹)</label>
                  {/* Starts the <input> element to collect or display a value. */}
                  <input
                    /* Chooses the element’s browser behavior, such as a button action or input format. */
                    type="number"
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value={newQuoteTargetRate}
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => setNewQuoteTargetRate(e.target.value)}
                    /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                    placeholder="Desired negotiated rate"
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                  />
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
                {/* Starts the <div> element to organize this part of the interface. */}
                <div>
                  {/* Starts the <label> element to name a form control for users and assistive technology. */}
                  <label className="font-semibold text-[#595552] block mb-1">GST %</label>
                  {/* Starts the <select> element to collect or display a value. */}
                  <select
                    /* Supplies the value shown by this form control so the user sees the current data. */
                    value={newQuoteGst}
                    /* Connects the Change event to its handler so the interface can respond to interaction. */
                    onChange={(e) => setNewQuoteGst(e.target.value)}
                    /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                    className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                  >
                    {/* Starts the <option> element to organize this part of the interface. */}
                    <option value="0">0% (Nil)</option>
                    {/* Starts the <option> element to organize this part of the interface. */}
                    <option value="5">5%</option>
                    {/* Starts the <option> element to organize this part of the interface. */}
                    <option value="12">12%</option>
                    {/* Starts the <option> element to organize this part of the interface. */}
                    <option value="18">18%</option>
                    {/* Starts the <option> element to organize this part of the interface. */}
                    <option value="28">28%</option>
                  {/* Closes the <select> element so later content is no longer part of this region. */}
                  </select>
                {/* Closes the <div> element so later content is no longer part of this region. */}
                </div>
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>

              {/* Starts the <div> element to organize this part of the interface. */}
              <div>
                {/* Starts the <label> element to name a form control for users and assistive technology. */}
                <label className="font-semibold text-[#595552] block mb-1">Offered Credit Terms</label>
                {/* Starts the <input> element to collect or display a value. */}
                <input
                  /* Chooses the element’s browser behavior, such as a button action or input format. */
                  type="text"
                  /* Supplies the value shown by this form control so the user sees the current data. */
                  value={newQuotePaymentTerms}
                  /* Connects the Change event to its handler so the interface can respond to interaction. */
                  onChange={(e) => setNewQuotePaymentTerms(e.target.value)}
                  /* Sets the placeholder property so this element receives the data or behavior required by this screen. */
                  placeholder="e.g. 30 days credit from site delivery"
                  /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                  className="w-full p-2.5 rounded-xl border border-[#E8E0DA] text-[#323232] focus:outline-none focus:ring-2 focus:ring-[#323232]"
                />
              {/* Closes the <div> element so later content is no longer part of this region. */}
              </div>
            {/* Closes the <div> element so later content is no longer part of this region. */}
            </div>

            {/* Starts the <div> element to organize this part of the interface. */}
            <div className="flex justify-end gap-3 pt-4 border-t border-[#E8E0DA]">
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={() => setActiveModal(null)}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="px-4 py-2 rounded-full border border-[#E8E0DA] text-xs font-semibold text-[#595552]"
              >
                // Continues the component or data expression so its related values and behavior stay grouped together.
                Cancel
              {/* Closes the <button> element so later content is no longer part of this region. */}
              </button>
              {/* Starts the <button> element to provide an action the user can activate. */}
              <button
                /* Connects the Click event to its handler so the interface can respond to interaction. */
                onClick={handleSaveNewQuote}
                /* Applies utility classes so the element’s layout, spacing, and appearance match the design. */
                className="px-5 py-2 rounded-full bg-[#323232] text-white text-xs font-semibold hover:bg-[#1E1E1E]"
              >
                // Continues the component or data expression so its related values and behavior stay grouped together.
                Record Quotation
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

// Exports VendorsPage as this file’s default value so other modules can load the main feature.
export default VendorsPage;
