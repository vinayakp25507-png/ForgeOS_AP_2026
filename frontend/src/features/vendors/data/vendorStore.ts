// Imports type  Vendor, Quotation, ProjectContract, NegotiationHistoryItem, QuotationStatus from ../types/vendor so this module can reuse that component, helper, or library.
import type { Vendor, Quotation, ProjectContract, NegotiationHistoryItem, QuotationStatus } from '../types/vendor';

// Stores the value in STORAGE_KEY so later lines can reuse this data or behavior for the current feature.
const STORAGE_KEY = 'forgeos_vendors';

// Stores the value in initialVendors so later lines can reuse this data or behavior for the current feature.
export const initialVendors: Vendor[] = [
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 'VEND-001',
    // Sets the name field so the surrounding object or component receives this setting.
    name: 'UltraTech Cement Ltd',
    // Sets the category field so the surrounding object or component receives this setting.
    category: 'CEMENT',
    // Sets the contactPerson field so the surrounding object or component receives this setting.
    contactPerson: 'Rajesh Singhania',
    // Sets the phone field so the surrounding object or component receives this setting.
    phone: '+91 98201 44521',
    // Sets the email field so the surrounding object or component receives this setting.
    email: 'r.singhania@adityabirla.com',
    // Sets the address field so the surrounding object or component receives this setting.
    address: 'Aditya Birla Centre, S.K. Ahire Marg, Worli',
    // Sets the city field so the surrounding object or component receives this setting.
    city: 'Mumbai',
    // Sets the gstin field so the surrounding object or component receives this setting.
    gstin: '07AAACU8044B1Z5',
    // Sets the panNumber field so the surrounding object or component receives this setting.
    panNumber: 'AAACU8044B',
    // Sets the rating field so the surrounding object or component receives this setting.
    rating: 4.8,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'ACTIVE',
    // Sets the totalContractedValue field so the surrounding object or component receives this setting.
    totalContractedValue: 23300000,
    // Sets the activeQuotationsCount field so the surrounding object or component receives this setting.
    activeQuotationsCount: 1,
    // Sets the bankDetails field so the surrounding object or component receives this setting.
    bankDetails: {
      // Sets the accountName field so the surrounding object or component receives this setting.
      accountName: 'UltraTech Cement Limited',
      // Sets the bankName field so the surrounding object or component receives this setting.
      bankName: 'HDFC Bank Ltd',
      // Sets the accountNumber field so the surrounding object or component receives this setting.
      accountNumber: '50200018894120',
      // Sets the ifscCode field so the surrounding object or component receives this setting.
      ifscCode: 'HDFC0000060',
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the contracts field so the surrounding object or component receives this setting.
    contracts: [
      // Opens a block or object so its related statements or settings can be grouped together.
      {
        // Sets the id field so the surrounding object or component receives this setting.
        id: 'CTR-001',
        // Sets the projectId field so the surrounding object or component receives this setting.
        projectId: '1',
        // Sets the projectCode field so the surrounding object or component receives this setting.
        projectCode: 'PRJ-001',
        // Sets the projectName field so the surrounding object or component receives this setting.
        projectName: 'Green Valley Residency',
        // Sets the contractNumber field so the surrounding object or component receives this setting.
        contractNumber: 'CTR-GVR-2026-01',
        // Sets the title field so the surrounding object or component receives this setting.
        title: 'Bulk Supply OPC 53 & Super PPC Cement for Towers A-D',
        // Sets the category field so the surrounding object or component receives this setting.
        category: 'CEMENT',
        // Sets the contractValue field so the surrounding object or component receives this setting.
        contractValue: 14500000,
        // Sets the startDate field so the surrounding object or component receives this setting.
        startDate: '2026-01-15',
        // Sets the endDate field so the surrounding object or component receives this setting.
        endDate: '2026-12-31',
        // Sets the status field so the surrounding object or component receives this setting.
        status: 'ACTIVE',
        // Sets the scopeOfWork field so the surrounding object or component receives this setting.
        scopeOfWork: 'Supply of 45,000 bags of OPC 53 and PPC with guaranteed 24hr delivery to Sector 62 site.',
        // Sets the paymentTerms field so the surrounding object or component receives this setting.
        paymentTerms: '30 days credit cycle against verified delivery challans and lab test certificates.',
      // Closes the current block or object so the grouped statements or settings end here.
      },
      // Opens a block or object so its related statements or settings can be grouped together.
      {
        // Sets the id field so the surrounding object or component receives this setting.
        id: 'CTR-002',
        // Sets the projectId field so the surrounding object or component receives this setting.
        projectId: '2',
        // Sets the projectCode field so the surrounding object or component receives this setting.
        projectCode: 'PRJ-002',
        // Sets the projectName field so the surrounding object or component receives this setting.
        projectName: 'Skyline Commercial Hub',
        // Sets the contractNumber field so the surrounding object or component receives this setting.
        contractNumber: 'CTR-SCH-2026-04',
        // Sets the title field so the surrounding object or component receives this setting.
        title: 'High Performance Cement Supply for Commercial Podium',
        // Sets the category field so the surrounding object or component receives this setting.
        category: 'CEMENT',
        // Sets the contractValue field so the surrounding object or component receives this setting.
        contractValue: 8800000,
        // Sets the startDate field so the surrounding object or component receives this setting.
        startDate: '2026-02-10',
        // Sets the endDate field so the surrounding object or component receives this setting.
        endDate: '2027-01-31',
        // Sets the status field so the surrounding object or component receives this setting.
        status: 'ACTIVE',
        // Sets the scopeOfWork field so the surrounding object or component receives this setting.
        scopeOfWork: 'Supply of specialty cementitious binders for deep basement casting and structural slabs.',
        // Sets the paymentTerms field so the surrounding object or component receives this setting.
        paymentTerms: '45 days credit from date of invoice.',
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
    // Sets the quotations field so the surrounding object or component receives this setting.
    quotations: [
      // Opens a block or object so its related statements or settings can be grouped together.
      {
        // Sets the id field so the surrounding object or component receives this setting.
        id: 'QUOTE-UTC-104',
        // Sets the quotationNumber field so the surrounding object or component receives this setting.
        quotationNumber: 'QT-UTC-2026-104',
        // Sets the vendorId field so the surrounding object or component receives this setting.
        vendorId: 'VEND-001',
        // Sets the vendorName field so the surrounding object or component receives this setting.
        vendorName: 'UltraTech Cement Ltd',
        // Sets the projectId field so the surrounding object or component receives this setting.
        projectId: '1',
        // Sets the projectCode field so the surrounding object or component receives this setting.
        projectCode: 'PRJ-001',
        // Sets the projectName field so the surrounding object or component receives this setting.
        projectName: 'Green Valley Residency',
        // Sets the category field so the surrounding object or component receives this setting.
        category: 'CEMENT',
        // Sets the itemDescription field so the surrounding object or component receives this setting.
        itemDescription: 'UltraTech Premium OPC 53 Grade Cement (50kg Bag) for Phase 2 Superstructure',
        // Sets the quantity field so the surrounding object or component receives this setting.
        quantity: 10000,
        // Sets the unit field so the surrounding object or component receives this setting.
        unit: 'Bags',
        // Sets the initialQuotedRate field so the surrounding object or component receives this setting.
        initialQuotedRate: 375,
        // Sets the initialTotalAmount field so the surrounding object or component receives this setting.
        initialTotalAmount: 3750000,
        // Sets the currentCounterRate field so the surrounding object or component receives this setting.
        currentCounterRate: 345,
        // Sets the builderTargetRate field so the surrounding object or component receives this setting.
        builderTargetRate: 340,
        // Sets the gstRate field so the surrounding object or component receives this setting.
        gstRate: 28,
        // Sets the status field so the surrounding object or component receives this setting.
        status: 'UNDER_NEGOTIATION',
        // Sets the submittedDate field so the surrounding object or component receives this setting.
        submittedDate: '2026-10-20',
        // Sets the validTill field so the surrounding object or component receives this setting.
        validTill: '2026-11-30',
        // Sets the paymentTermsOffered field so the surrounding object or component receives this setting.
        paymentTermsOffered: '21 Days net credit post delivery',
        // Sets the builderNotes field so the surrounding object or component receives this setting.
        builderNotes: 'Offered ₹345/bag considering our ongoing 45,000 bags commitment. Target to close at ₹342 with 30 days credit.',
        // Sets the negotiationHistory field so the surrounding object or component receives this setting.
        negotiationHistory: [
          // Opens a block or object so its related statements or settings can be grouped together.
          {
            // Sets the id field so the surrounding object or component receives this setting.
            id: 'NEG-001',
            // Sets the date field so the surrounding object or component receives this setting.
            date: '2026-10-20',
            // Sets the author field so the surrounding object or component receives this setting.
            author: 'Rajesh Singhania (UltraTech)',
            // Sets the role field so the surrounding object or component receives this setting.
            role: 'VENDOR',
            // Sets the offeredRate field so the surrounding object or component receives this setting.
            offeredRate: 375,
            // Sets the unit field so the surrounding object or component receives this setting.
            unit: 'per Bag',
            // Sets the creditDaysOffered field so the surrounding object or component receives this setting.
            creditDaysOffered: 21,
            // Sets the notes field so the surrounding object or component receives this setting.
            notes: 'Initial quotation submitted based on current clinker freight costs from Kotputli plant.',
          // Closes the current block or object so the grouped statements or settings end here.
          },
          // Opens a block or object so its related statements or settings can be grouped together.
          {
            // Sets the id field so the surrounding object or component receives this setting.
            id: 'NEG-002',
            // Sets the date field so the surrounding object or component receives this setting.
            date: '2026-10-24',
            // Sets the author field so the surrounding object or component receives this setting.
            author: 'Builder Admin (ForgeOS)',
            // Sets the role field so the surrounding object or component receives this setting.
            role: 'BUILDER',
            // Sets the offeredRate field so the surrounding object or component receives this setting.
            offeredRate: 340,
            // Sets the unit field so the surrounding object or component receives this setting.
            unit: 'per Bag',
            // Sets the creditDaysOffered field so the surrounding object or component receives this setting.
            creditDaysOffered: 35,
            // Sets the notes field so the surrounding object or component receives this setting.
            notes: 'Counter-offer sent. Highlighted bulk multi-site volume across Green Valley and Skyline Hub.',
          // Closes the current block or object so the grouped statements or settings end here.
          },
          // Opens a block or object so its related statements or settings can be grouped together.
          {
            // Sets the id field so the surrounding object or component receives this setting.
            id: 'NEG-003',
            // Sets the date field so the surrounding object or component receives this setting.
            date: '2026-10-28',
            // Sets the author field so the surrounding object or component receives this setting.
            author: 'Rajesh Singhania (UltraTech)',
            // Sets the role field so the surrounding object or component receives this setting.
            role: 'VENDOR',
            // Sets the offeredRate field so the surrounding object or component receives this setting.
            offeredRate: 352,
            // Sets the unit field so the surrounding object or component receives this setting.
            unit: 'per Bag',
            // Sets the creditDaysOffered field so the surrounding object or component receives this setting.
            creditDaysOffered: 28,
            // Sets the notes field so the surrounding object or component receives this setting.
            notes: 'Revised quotation after regional sales head approval. Ready to absorb unloading freight.',
          // Closes the current block or object so the grouped statements or settings end here.
          },
          // Opens a block or object so its related statements or settings can be grouped together.
          {
            // Sets the id field so the surrounding object or component receives this setting.
            id: 'NEG-004',
            // Sets the date field so the surrounding object or component receives this setting.
            date: '2026-11-02',
            // Sets the author field so the surrounding object or component receives this setting.
            author: 'Builder Admin (ForgeOS)',
            // Sets the role field so the surrounding object or component receives this setting.
            role: 'BUILDER',
            // Sets the offeredRate field so the surrounding object or component receives this setting.
            offeredRate: 345,
            // Sets the unit field so the surrounding object or component receives this setting.
            unit: 'per Bag',
            // Sets the creditDaysOffered field so the surrounding object or component receives this setting.
            creditDaysOffered: 30,
            // Sets the notes field so the surrounding object or component receives this setting.
            notes: 'Final builder counter-proposal: ₹345/bag including transit insurance and unloading at site.',
          // Closes the current block or object so the grouped statements or settings end here.
          },
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ],
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
  // Closes the current block or object so the grouped statements or settings end here.
  },
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 'VEND-002',
    // Sets the name field so the surrounding object or component receives this setting.
    name: 'Tata Steel Ltd (Tiscon)',
    // Sets the category field so the surrounding object or component receives this setting.
    category: 'STEEL',
    // Sets the contactPerson field so the surrounding object or component receives this setting.
    contactPerson: 'Vikram Malhotra',
    // Sets the phone field so the surrounding object or component receives this setting.
    phone: '+91 98112 99823',
    // Sets the email field so the surrounding object or component receives this setting.
    email: 'v.malhotra@tatasteel.com',
    // Sets the address field so the surrounding object or component receives this setting.
    address: 'Tata Centre, 43 Jawaharlal Nehru Road',
    // Sets the city field so the surrounding object or component receives this setting.
    city: 'Delhi NCR',
    // Sets the gstin field so the surrounding object or component receives this setting.
    gstin: '07AAACT2727Q1ZT',
    // Sets the panNumber field so the surrounding object or component receives this setting.
    panNumber: 'AAACT2727Q',
    // Sets the rating field so the surrounding object or component receives this setting.
    rating: 4.9,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'ACTIVE',
    // Sets the totalContractedValue field so the surrounding object or component receives this setting.
    totalContractedValue: 39500000,
    // Sets the activeQuotationsCount field so the surrounding object or component receives this setting.
    activeQuotationsCount: 1,
    // Sets the bankDetails field so the surrounding object or component receives this setting.
    bankDetails: {
      // Sets the accountName field so the surrounding object or component receives this setting.
      accountName: 'Tata Steel Limited',
      // Sets the bankName field so the surrounding object or component receives this setting.
      bankName: 'State Bank of India',
      // Sets the accountNumber field so the surrounding object or component receives this setting.
      accountNumber: '10998845123',
      // Sets the ifscCode field so the surrounding object or component receives this setting.
      ifscCode: 'SBIN0000691',
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the contracts field so the surrounding object or component receives this setting.
    contracts: [
      // Opens a block or object so its related statements or settings can be grouped together.
      {
        // Sets the id field so the surrounding object or component receives this setting.
        id: 'CTR-003',
        // Sets the projectId field so the surrounding object or component receives this setting.
        projectId: '1',
        // Sets the projectCode field so the surrounding object or component receives this setting.
        projectCode: 'PRJ-001',
        // Sets the projectName field so the surrounding object or component receives this setting.
        projectName: 'Green Valley Residency',
        // Sets the contractNumber field so the surrounding object or component receives this setting.
        contractNumber: 'CTR-GVR-2026-02',
        // Sets the title field so the surrounding object or component receives this setting.
        title: 'Primary Reinforcement Fe500D TMT Rebars Supply (450 MT)',
        // Sets the category field so the surrounding object or component receives this setting.
        category: 'STEEL',
        // Sets the contractValue field so the surrounding object or component receives this setting.
        contractValue: 27500000,
        // Sets the startDate field so the surrounding object or component receives this setting.
        startDate: '2026-01-20',
        // Sets the endDate field so the surrounding object or component receives this setting.
        endDate: '2026-11-30',
        // Sets the status field so the surrounding object or component receives this setting.
        status: 'ACTIVE',
        // Sets the scopeOfWork field so the surrounding object or component receives this setting.
        scopeOfWork: 'Certified primary steel rebars 8mm to 32mm with mill test certificates and weight-bridge slips.',
        // Sets the paymentTerms field so the surrounding object or component receives this setting.
        paymentTerms: 'Payment within 30 days of weigh-bridge verification and delivery challan sign-off.',
      // Closes the current block or object so the grouped statements or settings end here.
      },
      // Opens a block or object so its related statements or settings can be grouped together.
      {
        // Sets the id field so the surrounding object or component receives this setting.
        id: 'CTR-004',
        // Sets the projectId field so the surrounding object or component receives this setting.
        projectId: '3',
        // Sets the projectCode field so the surrounding object or component receives this setting.
        projectCode: 'PRJ-003',
        // Sets the projectName field so the surrounding object or component receives this setting.
        projectName: 'Riverside Heights',
        // Sets the contractNumber field so the surrounding object or component receives this setting.
        contractNumber: 'CTR-RSH-2025-08',
        // Sets the title field so the surrounding object or component receives this setting.
        title: 'Reinforcement TMT Steel Supply Phase 2',
        // Sets the category field so the surrounding object or component receives this setting.
        category: 'STEEL',
        // Sets the contractValue field so the surrounding object or component receives this setting.
        contractValue: 12000000,
        // Sets the startDate field so the surrounding object or component receives this setting.
        startDate: '2025-06-15',
        // Sets the endDate field so the surrounding object or component receives this setting.
        endDate: '2026-08-30',
        // Sets the status field so the surrounding object or component receives this setting.
        status: 'COMPLETED',
        // Sets the scopeOfWork field so the surrounding object or component receives this setting.
        scopeOfWork: 'Supply of 200 MT structural steel for residential wings completed successfully.',
        // Sets the paymentTerms field so the surrounding object or component receives this setting.
        paymentTerms: 'Full settlement completed.',
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
    // Sets the quotations field so the surrounding object or component receives this setting.
    quotations: [
      // Opens a block or object so its related statements or settings can be grouped together.
      {
        // Sets the id field so the surrounding object or component receives this setting.
        id: 'QUOTE-TSL-088',
        // Sets the quotationNumber field so the surrounding object or component receives this setting.
        quotationNumber: 'QT-TSL-2026-088',
        // Sets the vendorId field so the surrounding object or component receives this setting.
        vendorId: 'VEND-002',
        // Sets the vendorName field so the surrounding object or component receives this setting.
        vendorName: 'Tata Steel Ltd (Tiscon)',
        // Sets the projectId field so the surrounding object or component receives this setting.
        projectId: '2',
        // Sets the projectCode field so the surrounding object or component receives this setting.
        projectCode: 'PRJ-002',
        // Sets the projectName field so the surrounding object or component receives this setting.
        projectName: 'Skyline Commercial Hub',
        // Sets the category field so the surrounding object or component receives this setting.
        category: 'STEEL',
        // Sets the itemDescription field so the surrounding object or component receives this setting.
        itemDescription: 'Tata Tiscon 550D High Ductility Earthquake Resistant TMT Bars (16mm, 20mm, 25mm)',
        // Sets the quantity field so the surrounding object or component receives this setting.
        quantity: 200,
        // Sets the unit field so the surrounding object or component receives this setting.
        unit: 'MT',
        // Sets the initialQuotedRate field so the surrounding object or component receives this setting.
        initialQuotedRate: 64000,
        // Sets the initialTotalAmount field so the surrounding object or component receives this setting.
        initialTotalAmount: 12800000,
        // Sets the currentCounterRate field so the surrounding object or component receives this setting.
        currentCounterRate: 61800,
        // Sets the builderTargetRate field so the surrounding object or component receives this setting.
        builderTargetRate: 60000,
        // Sets the gstRate field so the surrounding object or component receives this setting.
        gstRate: 18,
        // Sets the status field so the surrounding object or component receives this setting.
        status: 'COUNTER_OFFERED',
        // Sets the submittedDate field so the surrounding object or component receives this setting.
        submittedDate: '2026-10-18',
        // Sets the validTill field so the surrounding object or component receives this setting.
        validTill: '2026-11-25',
        // Sets the paymentTermsOffered field so the surrounding object or component receives this setting.
        paymentTermsOffered: '15 Days against dispatch weighment',
        // Sets the builderNotes field so the surrounding object or component receives this setting.
        builderNotes: 'Market benchmark for secondary steel is ₹54,000/MT, but Tata Tiscon primary brand justifies ₹60,500/MT for commercial high-rise.',
        // Sets the negotiationHistory field so the surrounding object or component receives this setting.
        negotiationHistory: [
          // Opens a block or object so its related statements or settings can be grouped together.
          {
            // Sets the id field so the surrounding object or component receives this setting.
            id: 'NEG-010',
            // Sets the date field so the surrounding object or component receives this setting.
            date: '2026-10-18',
            // Sets the author field so the surrounding object or component receives this setting.
            author: 'Vikram Malhotra (Tata Steel)',
            // Sets the role field so the surrounding object or component receives this setting.
            role: 'VENDOR',
            // Sets the offeredRate field so the surrounding object or component receives this setting.
            offeredRate: 64000,
            // Sets the unit field so the surrounding object or component receives this setting.
            unit: 'per MT',
            // Sets the creditDaysOffered field so the surrounding object or component receives this setting.
            creditDaysOffered: 15,
            // Sets the notes field so the surrounding object or component receives this setting.
            notes: 'Initial mill gate price quoted with freight to Delhi Okhla stockyard.',
          // Closes the current block or object so the grouped statements or settings end here.
          },
          // Opens a block or object so its related statements or settings can be grouped together.
          {
            // Sets the id field so the surrounding object or component receives this setting.
            id: 'NEG-011',
            // Sets the date field so the surrounding object or component receives this setting.
            date: '2026-10-22',
            // Sets the author field so the surrounding object or component receives this setting.
            author: 'Builder Admin (ForgeOS)',
            // Sets the role field so the surrounding object or component receives this setting.
            role: 'BUILDER',
            // Sets the offeredRate field so the surrounding object or component receives this setting.
            offeredRate: 60500,
            // Sets the unit field so the surrounding object or component receives this setting.
            unit: 'per MT',
            // Sets the creditDaysOffered field so the surrounding object or component receives this setting.
            creditDaysOffered: 30,
            // Sets the notes field so the surrounding object or component receives this setting.
            notes: 'Requested volume rebate of ₹3,500/MT with standard 30-day payment term.',
          // Closes the current block or object so the grouped statements or settings end here.
          },
          // Opens a block or object so its related statements or settings can be grouped together.
          {
            // Sets the id field so the surrounding object or component receives this setting.
            id: 'NEG-012',
            // Sets the date field so the surrounding object or component receives this setting.
            date: '2026-10-30',
            // Sets the author field so the surrounding object or component receives this setting.
            author: 'Vikram Malhotra (Tata Steel)',
            // Sets the role field so the surrounding object or component receives this setting.
            role: 'VENDOR',
            // Sets the offeredRate field so the surrounding object or component receives this setting.
            offeredRate: 61800,
            // Sets the unit field so the surrounding object or component receives this setting.
            unit: 'per MT',
            // Sets the creditDaysOffered field so the surrounding object or component receives this setting.
            creditDaysOffered: 25,
            // Sets the notes field so the surrounding object or component receives this setting.
            notes: 'Revised quote. Can offer ₹61,800/MT if ordered in lots of 50 MT minimum per delivery.',
          // Closes the current block or object so the grouped statements or settings end here.
          },
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ],
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
  // Closes the current block or object so the grouped statements or settings end here.
  },
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 'VEND-003',
    // Sets the name field so the surrounding object or component receives this setting.
    name: 'ACC ReadyMix Concrete (RMC)',
    // Sets the category field so the surrounding object or component receives this setting.
    category: 'READY_MIX_CONCRETE',
    // Sets the contactPerson field so the surrounding object or component receives this setting.
    contactPerson: 'Sunil Kulkarni',
    // Sets the phone field so the surrounding object or component receives this setting.
    phone: '+91 98450 33219',
    // Sets the email field so the surrounding object or component receives this setting.
    email: 'sunil.k@acclimited.com',
    // Sets the address field so the surrounding object or component receives this setting.
    address: 'Udyog Vihar Phase 4, Plot 88',
    // Sets the city field so the surrounding object or component receives this setting.
    city: 'Gurugram',
    // Sets the gstin field so the surrounding object or component receives this setting.
    gstin: '06AAACA0544C1Z9',
    // Sets the panNumber field so the surrounding object or component receives this setting.
    panNumber: 'AAACA0544C',
    // Sets the rating field so the surrounding object or component receives this setting.
    rating: 4.6,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'ACTIVE',
    // Sets the totalContractedValue field so the surrounding object or component receives this setting.
    totalContractedValue: 25000000,
    // Sets the activeQuotationsCount field so the surrounding object or component receives this setting.
    activeQuotationsCount: 1,
    // Sets the bankDetails field so the surrounding object or component receives this setting.
    bankDetails: {
      // Sets the accountName field so the surrounding object or component receives this setting.
      accountName: 'ACC Concrete Products Ltd',
      // Sets the bankName field so the surrounding object or component receives this setting.
      bankName: 'ICICI Bank',
      // Sets the accountNumber field so the surrounding object or component receives this setting.
      accountNumber: '002105009844',
      // Sets the ifscCode field so the surrounding object or component receives this setting.
      ifscCode: 'ICIC0000021',
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the contracts field so the surrounding object or component receives this setting.
    contracts: [
      // Opens a block or object so its related statements or settings can be grouped together.
      {
        // Sets the id field so the surrounding object or component receives this setting.
        id: 'CTR-005',
        // Sets the projectId field so the surrounding object or component receives this setting.
        projectId: '2',
        // Sets the projectCode field so the surrounding object or component receives this setting.
        projectCode: 'PRJ-002',
        // Sets the projectName field so the surrounding object or component receives this setting.
        projectName: 'Skyline Commercial Hub',
        // Sets the contractNumber field so the surrounding object or component receives this setting.
        contractNumber: 'CTR-SCH-2026-06',
        // Sets the title field so the surrounding object or component receives this setting.
        title: 'M35 & M40 Design Mix RMC Supply with Transit Mixers & Boom Placer',
        // Sets the category field so the surrounding object or component receives this setting.
        category: 'READY_MIX_CONCRETE',
        // Sets the contractValue field so the surrounding object or component receives this setting.
        contractValue: 18500000,
        // Sets the startDate field so the surrounding object or component receives this setting.
        startDate: '2026-02-15',
        // Sets the endDate field so the surrounding object or component receives this setting.
        endDate: '2027-02-28',
        // Sets the status field so the surrounding object or component receives this setting.
        status: 'ACTIVE',
        // Sets the scopeOfWork field so the surrounding object or component receives this setting.
        scopeOfWork: 'Continuous concrete pour batches with 36m concrete boom pump allocation.',
        // Sets the paymentTerms field so the surrounding object or component receives this setting.
        paymentTerms: 'Bi-weekly billing based on automated batching plant computerized receipts.',
      // Closes the current block or object so the grouped statements or settings end here.
      },
      // Opens a block or object so its related statements or settings can be grouped together.
      {
        // Sets the id field so the surrounding object or component receives this setting.
        id: 'CTR-006',
        // Sets the projectId field so the surrounding object or component receives this setting.
        projectId: '4',
        // Sets the projectCode field so the surrounding object or component receives this setting.
        projectCode: 'PRJ-004',
        // Sets the projectName field so the surrounding object or component receives this setting.
        projectName: 'Urban Square',
        // Sets the contractNumber field so the surrounding object or component receives this setting.
        contractNumber: 'CTR-USQ-2026-01',
        // Sets the title field so the surrounding object or component receives this setting.
        title: 'Foundation Raft Concrete M30 Pouring Batch 1',
        // Sets the category field so the surrounding object or component receives this setting.
        category: 'READY_MIX_CONCRETE',
        // Sets the contractValue field so the surrounding object or component receives this setting.
        contractValue: 6500000,
        // Sets the startDate field so the surrounding object or component receives this setting.
        startDate: '2026-09-01',
        // Sets the endDate field so the surrounding object or component receives this setting.
        endDate: '2027-03-31',
        // Sets the status field so the surrounding object or component receives this setting.
        status: 'ACTIVE',
        // Sets the scopeOfWork field so the surrounding object or component receives this setting.
        scopeOfWork: '1,500 Cu.M continuous raft foundation casting with cube testing reports.',
        // Sets the paymentTerms field so the surrounding object or component receives this setting.
        paymentTerms: '20% advance, balance 80% on 30-day cycle post pouring.',
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
    // Sets the quotations field so the surrounding object or component receives this setting.
    quotations: [
      // Opens a block or object so its related statements or settings can be grouped together.
      {
        // Sets the id field so the surrounding object or component receives this setting.
        id: 'QUOTE-ACC-031',
        // Sets the quotationNumber field so the surrounding object or component receives this setting.
        quotationNumber: 'QT-ACC-2026-031',
        // Sets the vendorId field so the surrounding object or component receives this setting.
        vendorId: 'VEND-003',
        // Sets the vendorName field so the surrounding object or component receives this setting.
        vendorName: 'ACC ReadyMix Concrete (RMC)',
        // Sets the projectId field so the surrounding object or component receives this setting.
        projectId: '1',
        // Sets the projectCode field so the surrounding object or component receives this setting.
        projectCode: 'PRJ-001',
        // Sets the projectName field so the surrounding object or component receives this setting.
        projectName: 'Green Valley Residency',
        // Sets the category field so the surrounding object or component receives this setting.
        category: 'READY_MIX_CONCRETE',
        // Sets the itemDescription field so the surrounding object or component receives this setting.
        itemDescription: 'M35 Grade High-Performance Self-Compacting Concrete (1,200 Cu.M)',
        // Sets the quantity field so the surrounding object or component receives this setting.
        quantity: 1200,
        // Sets the unit field so the surrounding object or component receives this setting.
        unit: 'Cu.M',
        // Sets the initialQuotedRate field so the surrounding object or component receives this setting.
        initialQuotedRate: 4650,
        // Sets the initialTotalAmount field so the surrounding object or component receives this setting.
        initialTotalAmount: 5580000,
        // Sets the currentCounterRate field so the surrounding object or component receives this setting.
        currentCounterRate: 4300,
        // Sets the finalAgreedRate field so the surrounding object or component receives this setting.
        finalAgreedRate: 4300,
        // Sets the builderTargetRate field so the surrounding object or component receives this setting.
        builderTargetRate: 4300,
        // Sets the gstRate field so the surrounding object or component receives this setting.
        gstRate: 18,
        // Sets the status field so the surrounding object or component receives this setting.
        status: 'ACCEPTED',
        // Sets the submittedDate field so the surrounding object or component receives this setting.
        submittedDate: '2026-10-05',
        // Sets the validTill field so the surrounding object or component receives this setting.
        validTill: '2026-11-15',
        // Sets the paymentTermsOffered field so the surrounding object or component receives this setting.
        paymentTermsOffered: '30 Days credit with slump retention guarantee',
        // Sets the builderNotes field so the surrounding object or component receives this setting.
        builderNotes: 'Successfully negotiated down by ₹350/Cu.M (saving ₹4.2 Lakhs). Contract ready for drafting.',
        // Sets the negotiationHistory field so the surrounding object or component receives this setting.
        negotiationHistory: [
          // Opens a block or object so its related statements or settings can be grouped together.
          {
            // Sets the id field so the surrounding object or component receives this setting.
            id: 'NEG-020',
            // Sets the date field so the surrounding object or component receives this setting.
            date: '2026-10-05',
            // Sets the author field so the surrounding object or component receives this setting.
            author: 'Sunil Kulkarni (ACC)',
            // Sets the role field so the surrounding object or component receives this setting.
            role: 'VENDOR',
            // Sets the offeredRate field so the surrounding object or component receives this setting.
            offeredRate: 4650,
            // Sets the unit field so the surrounding object or component receives this setting.
            unit: 'per Cu.M',
            // Sets the creditDaysOffered field so the surrounding object or component receives this setting.
            creditDaysOffered: 15,
            // Sets the notes field so the surrounding object or component receives this setting.
            notes: 'Quote inclusive of fly ash blend and superplasticizer for 3-hour slump life.',
          // Closes the current block or object so the grouped statements or settings end here.
          },
          // Opens a block or object so its related statements or settings can be grouped together.
          {
            // Sets the id field so the surrounding object or component receives this setting.
            id: 'NEG-021',
            // Sets the date field so the surrounding object or component receives this setting.
            date: '2026-10-09',
            // Sets the author field so the surrounding object or component receives this setting.
            author: 'Builder Admin (ForgeOS)',
            // Sets the role field so the surrounding object or component receives this setting.
            role: 'BUILDER',
            // Sets the offeredRate field so the surrounding object or component receives this setting.
            offeredRate: 4250,
            // Sets the unit field so the surrounding object or component receives this setting.
            unit: 'per Cu.M',
            // Sets the creditDaysOffered field so the surrounding object or component receives this setting.
            creditDaysOffered: 30,
            // Sets the notes field so the surrounding object or component receives this setting.
            notes: 'Countered based on proximity of ACC Manesar batching plant (11 km from site).',
          // Closes the current block or object so the grouped statements or settings end here.
          },
          // Opens a block or object so its related statements or settings can be grouped together.
          {
            // Sets the id field so the surrounding object or component receives this setting.
            id: 'NEG-022',
            // Sets the date field so the surrounding object or component receives this setting.
            date: '2026-10-12',
            // Sets the author field so the surrounding object or component receives this setting.
            author: 'Sunil Kulkarni (ACC)',
            // Sets the role field so the surrounding object or component receives this setting.
            role: 'VENDOR',
            // Sets the offeredRate field so the surrounding object or component receives this setting.
            offeredRate: 4300,
            // Sets the unit field so the surrounding object or component receives this setting.
            unit: 'per Cu.M',
            // Sets the creditDaysOffered field so the surrounding object or component receives this setting.
            creditDaysOffered: 30,
            // Sets the notes field so the surrounding object or component receives this setting.
            notes: 'Agreed on ₹4,300/Cu.M with dedicated pump operator on day of casting.',
          // Closes the current block or object so the grouped statements or settings end here.
          },
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ],
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
  // Closes the current block or object so the grouped statements or settings end here.
  },
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 'VEND-004',
    // Sets the name field so the surrounding object or component receives this setting.
    name: 'Schneider Electric India Pvt Ltd',
    // Sets the category field so the surrounding object or component receives this setting.
    category: 'ELECTRICAL',
    // Sets the contactPerson field so the surrounding object or component receives this setting.
    contactPerson: 'Ananya Sen',
    // Sets the phone field so the surrounding object or component receives this setting.
    phone: '+91 98233 11882',
    // Sets the email field so the surrounding object or component receives this setting.
    email: 'ananya.sen@se.com',
    // Sets the address field so the surrounding object or component receives this setting.
    address: 'Electra Tower, Cyber City Phase 2',
    // Sets the city field so the surrounding object or component receives this setting.
    city: 'Gurugram',
    // Sets the gstin field so the surrounding object or component receives this setting.
    gstin: '09AAACS9821L1Z4',
    // Sets the panNumber field so the surrounding object or component receives this setting.
    panNumber: 'AAACS9821L',
    // Sets the rating field so the surrounding object or component receives this setting.
    rating: 4.7,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'ACTIVE',
    // Sets the totalContractedValue field so the surrounding object or component receives this setting.
    totalContractedValue: 9200000,
    // Sets the activeQuotationsCount field so the surrounding object or component receives this setting.
    activeQuotationsCount: 1,
    // Sets the bankDetails field so the surrounding object or component receives this setting.
    bankDetails: {
      // Sets the accountName field so the surrounding object or component receives this setting.
      accountName: 'Schneider Electric India Pvt Ltd',
      // Sets the bankName field so the surrounding object or component receives this setting.
      bankName: 'Citibank N.A.',
      // Sets the accountNumber field so the surrounding object or component receives this setting.
      accountNumber: '0349887102',
      // Sets the ifscCode field so the surrounding object or component receives this setting.
      ifscCode: 'CITI0000002',
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the contracts field so the surrounding object or component receives this setting.
    contracts: [
      // Opens a block or object so its related statements or settings can be grouped together.
      {
        // Sets the id field so the surrounding object or component receives this setting.
        id: 'CTR-007',
        // Sets the projectId field so the surrounding object or component receives this setting.
        projectId: '1',
        // Sets the projectCode field so the surrounding object or component receives this setting.
        projectCode: 'PRJ-001',
        // Sets the projectName field so the surrounding object or component receives this setting.
        projectName: 'Green Valley Residency',
        // Sets the contractNumber field so the surrounding object or component receives this setting.
        contractNumber: 'CTR-GVR-2026-07',
        // Sets the title field so the surrounding object or component receives this setting.
        title: 'LT Distribution Panels, Transformers & Busduct Supply',
        // Sets the category field so the surrounding object or component receives this setting.
        category: 'ELECTRICAL',
        // Sets the contractValue field so the surrounding object or component receives this setting.
        contractValue: 9200000,
        // Sets the startDate field so the surrounding object or component receives this setting.
        startDate: '2026-03-01',
        // Sets the endDate field so the surrounding object or component receives this setting.
        endDate: '2026-11-30',
        // Sets the status field so the surrounding object or component receives this setting.
        status: 'ACTIVE',
        // Sets the scopeOfWork field so the surrounding object or component receives this setting.
        scopeOfWork: 'Main distribution panels, Schneider ACB 1600A, and rising mains for Towers A & B.',
        // Sets the paymentTerms field so the surrounding object or component receives this setting.
        paymentTerms: '30% advance on GA drawing sign-off, 60% on factory dispatch, 10% on commissioning.',
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
    // Sets the quotations field so the surrounding object or component receives this setting.
    quotations: [
      // Opens a block or object so its related statements or settings can be grouped together.
      {
        // Sets the id field so the surrounding object or component receives this setting.
        id: 'QUOTE-SEI-512',
        // Sets the quotationNumber field so the surrounding object or component receives this setting.
        quotationNumber: 'QT-SEI-2026-512',
        // Sets the vendorId field so the surrounding object or component receives this setting.
        vendorId: 'VEND-004',
        // Sets the vendorName field so the surrounding object or component receives this setting.
        vendorName: 'Schneider Electric India Pvt Ltd',
        // Sets the projectId field so the surrounding object or component receives this setting.
        projectId: '2',
        // Sets the projectCode field so the surrounding object or component receives this setting.
        projectCode: 'PRJ-002',
        // Sets the projectName field so the surrounding object or component receives this setting.
        projectName: 'Skyline Commercial Hub',
        // Sets the category field so the surrounding object or component receives this setting.
        category: 'ELECTRICAL',
        // Sets the itemDescription field so the surrounding object or component receives this setting.
        itemDescription: 'Smart Energy Management Sub-Meters, Modbus Gateways & Capacitor Bank Panels',
        // Sets the quantity field so the surrounding object or component receives this setting.
        quantity: 1,
        // Sets the unit field so the surrounding object or component receives this setting.
        unit: 'Package',
        // Sets the initialQuotedRate field so the surrounding object or component receives this setting.
        initialQuotedRate: 3850000,
        // Sets the initialTotalAmount field so the surrounding object or component receives this setting.
        initialTotalAmount: 3850000,
        // Sets the currentCounterRate field so the surrounding object or component receives this setting.
        currentCounterRate: 3500000,
        // Sets the builderTargetRate field so the surrounding object or component receives this setting.
        builderTargetRate: 3400000,
        // Sets the gstRate field so the surrounding object or component receives this setting.
        gstRate: 18,
        // Sets the status field so the surrounding object or component receives this setting.
        status: 'UNDER_NEGOTIATION',
        // Sets the submittedDate field so the surrounding object or component receives this setting.
        submittedDate: '2026-10-25',
        // Sets the validTill field so the surrounding object or component receives this setting.
        validTill: '2026-12-10',
        // Sets the paymentTermsOffered field so the surrounding object or component receives this setting.
        paymentTermsOffered: '20% Advance, 80% on delivery against LC or PDC',
        // Sets the builderNotes field so the surrounding object or component receives this setting.
        builderNotes: 'Discussing with regional engineering manager to include free 3-year SCADA cloud monitoring license.',
        // Sets the negotiationHistory field so the surrounding object or component receives this setting.
        negotiationHistory: [
          // Opens a block or object so its related statements or settings can be grouped together.
          {
            // Sets the id field so the surrounding object or component receives this setting.
            id: 'NEG-030',
            // Sets the date field so the surrounding object or component receives this setting.
            date: '2026-10-25',
            // Sets the author field so the surrounding object or component receives this setting.
            author: 'Ananya Sen (Schneider)',
            // Sets the role field so the surrounding object or component receives this setting.
            role: 'VENDOR',
            // Sets the offeredRate field so the surrounding object or component receives this setting.
            offeredRate: 3850000,
            // Sets the unit field so the surrounding object or component receives this setting.
            unit: 'Package',
            // Sets the creditDaysOffered field so the surrounding object or component receives this setting.
            creditDaysOffered: 15,
            // Sets the notes field so the surrounding object or component receives this setting.
            notes: 'Premium commercial tier smart panels with IoT wireless energy metering.',
          // Closes the current block or object so the grouped statements or settings end here.
          },
          // Opens a block or object so its related statements or settings can be grouped together.
          {
            // Sets the id field so the surrounding object or component receives this setting.
            id: 'NEG-031',
            // Sets the date field so the surrounding object or component receives this setting.
            date: '2026-10-29',
            // Sets the author field so the surrounding object or component receives this setting.
            author: 'Builder Admin (ForgeOS)',
            // Sets the role field so the surrounding object or component receives this setting.
            role: 'BUILDER',
            // Sets the offeredRate field so the surrounding object or component receives this setting.
            offeredRate: 3400000,
            // Sets the unit field so the surrounding object or component receives this setting.
            unit: 'Package',
            // Sets the creditDaysOffered field so the surrounding object or component receives this setting.
            creditDaysOffered: 45,
            // Sets the notes field so the surrounding object or component receives this setting.
            notes: 'Countered with competitive quotation from L&T Electricals for equivalent specs.',
          // Closes the current block or object so the grouped statements or settings end here.
          },
          // Opens a block or object so its related statements or settings can be grouped together.
          {
            // Sets the id field so the surrounding object or component receives this setting.
            id: 'NEG-032',
            // Sets the date field so the surrounding object or component receives this setting.
            date: '2026-11-04',
            // Sets the author field so the surrounding object or component receives this setting.
            author: 'Ananya Sen (Schneider)',
            // Sets the role field so the surrounding object or component receives this setting.
            role: 'VENDOR',
            // Sets the offeredRate field so the surrounding object or component receives this setting.
            offeredRate: 3580000,
            // Sets the unit field so the surrounding object or component receives this setting.
            unit: 'Package',
            // Sets the creditDaysOffered field so the surrounding object or component receives this setting.
            creditDaysOffered: 30,
            // Sets the notes field so the surrounding object or component receives this setting.
            notes: 'Offered special builder discount of 7% plus extended warranty to 36 months.',
          // Closes the current block or object so the grouped statements or settings end here.
          },
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ],
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
  // Closes the current block or object so the grouped statements or settings end here.
  },
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 'VEND-005',
    // Sets the name field so the surrounding object or component receives this setting.
    name: 'Astral Pipes Ltd',
    // Sets the category field so the surrounding object or component receives this setting.
    category: 'PLUMBING',
    // Sets the contactPerson field so the surrounding object or component receives this setting.
    contactPerson: 'Deepen Parekh',
    // Sets the phone field so the surrounding object or component receives this setting.
    phone: '+91 97240 66512',
    // Sets the email field so the surrounding object or component receives this setting.
    email: 'd.parekh@astralpipes.com',
    // Sets the address field so the surrounding object or component receives this setting.
    address: 'Astral House, 207/1 Rajpath Rangoli Road',
    // Sets the city field so the surrounding object or component receives this setting.
    city: 'Ahmedabad',
    // Sets the gstin field so the surrounding object or component receives this setting.
    gstin: '24AABCA5463J1Z8',
    // Sets the panNumber field so the surrounding object or component receives this setting.
    panNumber: 'AABCA5463J',
    // Sets the rating field so the surrounding object or component receives this setting.
    rating: 4.8,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'ACTIVE',
    // Sets the totalContractedValue field so the surrounding object or component receives this setting.
    totalContractedValue: 5800000,
    // Sets the activeQuotationsCount field so the surrounding object or component receives this setting.
    activeQuotationsCount: 1,
    // Sets the bankDetails field so the surrounding object or component receives this setting.
    bankDetails: {
      // Sets the accountName field so the surrounding object or component receives this setting.
      accountName: 'Astral Limited',
      // Sets the bankName field so the surrounding object or component receives this setting.
      bankName: 'Kotak Mahindra Bank',
      // Sets the accountNumber field so the surrounding object or component receives this setting.
      accountNumber: '4410982311',
      // Sets the ifscCode field so the surrounding object or component receives this setting.
      ifscCode: 'KKBK0000451',
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the contracts field so the surrounding object or component receives this setting.
    contracts: [
      // Opens a block or object so its related statements or settings can be grouped together.
      {
        // Sets the id field so the surrounding object or component receives this setting.
        id: 'CTR-008',
        // Sets the projectId field so the surrounding object or component receives this setting.
        projectId: '2',
        // Sets the projectCode field so the surrounding object or component receives this setting.
        projectCode: 'PRJ-002',
        // Sets the projectName field so the surrounding object or component receives this setting.
        projectName: 'Skyline Commercial Hub',
        // Sets the contractNumber field so the surrounding object or component receives this setting.
        contractNumber: 'CTR-SCH-2026-09',
        // Sets the title field so the surrounding object or component receives this setting.
        title: 'CPVC Pro & DrainMaster SWR Piping Network for 18 Floors',
        // Sets the category field so the surrounding object or component receives this setting.
        category: 'PLUMBING',
        // Sets the contractValue field so the surrounding object or component receives this setting.
        contractValue: 5800000,
        // Sets the startDate field so the surrounding object or component receives this setting.
        startDate: '2026-03-10',
        // Sets the endDate field so the surrounding object or component receives this setting.
        endDate: '2027-01-20',
        // Sets the status field so the surrounding object or component receives this setting.
        status: 'ACTIVE',
        // Sets the scopeOfWork field so the surrounding object or component receives this setting.
        scopeOfWork: 'Complete internal and vertical stack plumbing supply with solvent cements and rubber ring joints.',
        // Sets the paymentTerms field so the surrounding object or component receives this setting.
        paymentTerms: '30 days credit from invoice submission and site delivery acknowledgement.',
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
    // Sets the quotations field so the surrounding object or component receives this setting.
    quotations: [
      // Opens a block or object so its related statements or settings can be grouped together.
      {
        // Sets the id field so the surrounding object or component receives this setting.
        id: 'QUOTE-AST-219',
        // Sets the quotationNumber field so the surrounding object or component receives this setting.
        quotationNumber: 'QT-AST-2026-219',
        // Sets the vendorId field so the surrounding object or component receives this setting.
        vendorId: 'VEND-005',
        // Sets the vendorName field so the surrounding object or component receives this setting.
        vendorName: 'Astral Pipes Ltd',
        // Sets the projectId field so the surrounding object or component receives this setting.
        projectId: '3',
        // Sets the projectCode field so the surrounding object or component receives this setting.
        projectCode: 'PRJ-003',
        // Sets the projectName field so the surrounding object or component receives this setting.
        projectName: 'Riverside Heights',
        // Sets the category field so the surrounding object or component receives this setting.
        category: 'PLUMBING',
        // Sets the itemDescription field so the surrounding object or component receives this setting.
        itemDescription: 'Astral Silencio Low Noise Acoustic Drainage Pipes & Fittings (Phase 3)',
        // Sets the quantity field so the surrounding object or component receives this setting.
        quantity: 1,
        // Sets the unit field so the surrounding object or component receives this setting.
        unit: 'Lot',
        // Sets the initialQuotedRate field so the surrounding object or component receives this setting.
        initialQuotedRate: 2200000,
        // Sets the initialTotalAmount field so the surrounding object or component receives this setting.
        initialTotalAmount: 2200000,
        // Sets the currentCounterRate field so the surrounding object or component receives this setting.
        currentCounterRate: 1950000,
        // Sets the builderTargetRate field so the surrounding object or component receives this setting.
        builderTargetRate: 1900000,
        // Sets the gstRate field so the surrounding object or component receives this setting.
        gstRate: 18,
        // Sets the status field so the surrounding object or component receives this setting.
        status: 'UNDER_NEGOTIATION',
        // Sets the submittedDate field so the surrounding object or component receives this setting.
        submittedDate: '2026-10-15',
        // Sets the validTill field so the surrounding object or component receives this setting.
        validTill: '2026-11-20',
        // Sets the paymentTermsOffered field so the surrounding object or component receives this setting.
        paymentTermsOffered: '30 Days credit',
        // Sets the builderNotes field so the surrounding object or component receives this setting.
        builderNotes: 'Negotiating with distributor for direct mill pricing on large lot size.',
        // Sets the negotiationHistory field so the surrounding object or component receives this setting.
        negotiationHistory: [
          // Opens a block or object so its related statements or settings can be grouped together.
          {
            // Sets the id field so the surrounding object or component receives this setting.
            id: 'NEG-040',
            // Sets the date field so the surrounding object or component receives this setting.
            date: '2026-10-15',
            // Sets the author field so the surrounding object or component receives this setting.
            author: 'Deepen Parekh (Astral)',
            // Sets the role field so the surrounding object or component receives this setting.
            role: 'VENDOR',
            // Sets the offeredRate field so the surrounding object or component receives this setting.
            offeredRate: 2200000,
            // Sets the unit field so the surrounding object or component receives this setting.
            unit: 'Lot',
            // Sets the creditDaysOffered field so the surrounding object or component receives this setting.
            creditDaysOffered: 21,
            // Sets the notes field so the surrounding object or component receives this setting.
            notes: 'High acoustic insulation triple-layer pipes directly dispatched from Santej plant.',
          // Closes the current block or object so the grouped statements or settings end here.
          },
          // Opens a block or object so its related statements or settings can be grouped together.
          {
            // Sets the id field so the surrounding object or component receives this setting.
            id: 'NEG-041',
            // Sets the date field so the surrounding object or component receives this setting.
            date: '2026-10-21',
            // Sets the author field so the surrounding object or component receives this setting.
            author: 'Builder Admin (ForgeOS)',
            // Sets the role field so the surrounding object or component receives this setting.
            role: 'BUILDER',
            // Sets the offeredRate field so the surrounding object or component receives this setting.
            offeredRate: 1950000,
            // Sets the unit field so the surrounding object or component receives this setting.
            unit: 'Lot',
            // Sets the creditDaysOffered field so the surrounding object or component receives this setting.
            creditDaysOffered: 45,
            // Sets the notes field so the surrounding object or component receives this setting.
            notes: 'Countered with target rate of ₹19.5 Lakhs and 45 days payment cycle.',
          // Closes the current block or object so the grouped statements or settings end here.
          },
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ],
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
  // Closes the current block or object so the grouped statements or settings end here.
  },
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 'VEND-006',
    // Sets the name field so the surrounding object or component receives this setting.
    name: 'Devcon Earthmovers & Shoring',
    // Sets the category field so the surrounding object or component receives this setting.
    category: 'EARTHWORK',
    // Sets the contactPerson field so the surrounding object or component receives this setting.
    contactPerson: 'Hardeep Singh',
    // Sets the phone field so the surrounding object or component receives this setting.
    phone: '+91 98140 77123',
    // Sets the email field so the surrounding object or component receives this setting.
    email: 'devcon.excavation@gmail.com',
    // Sets the address field so the surrounding object or component receives this setting.
    address: 'Plot 14, Transport Nagar, Ajmer Road',
    // Sets the city field so the surrounding object or component receives this setting.
    city: 'Jaipur',
    // Sets the gstin field so the surrounding object or component receives this setting.
    gstin: '08AAACD4412E1Z2',
    // Sets the panNumber field so the surrounding object or component receives this setting.
    panNumber: 'AAACD4412E',
    // Sets the rating field so the surrounding object or component receives this setting.
    rating: 4.4,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'ACTIVE',
    // Sets the totalContractedValue field so the surrounding object or component receives this setting.
    totalContractedValue: 4800000,
    // Sets the activeQuotationsCount field so the surrounding object or component receives this setting.
    activeQuotationsCount: 0,
    // Sets the bankDetails field so the surrounding object or component receives this setting.
    bankDetails: {
      // Sets the accountName field so the surrounding object or component receives this setting.
      accountName: 'Devcon Earthmovers Partnership',
      // Sets the bankName field so the surrounding object or component receives this setting.
      bankName: 'Axis Bank',
      // Sets the accountNumber field so the surrounding object or component receives this setting.
      accountNumber: '918020044558',
      // Sets the ifscCode field so the surrounding object or component receives this setting.
      ifscCode: 'UTIB0000140',
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the contracts field so the surrounding object or component receives this setting.
    contracts: [
      // Opens a block or object so its related statements or settings can be grouped together.
      {
        // Sets the id field so the surrounding object or component receives this setting.
        id: 'CTR-009',
        // Sets the projectId field so the surrounding object or component receives this setting.
        projectId: '4',
        // Sets the projectCode field so the surrounding object or component receives this setting.
        projectCode: 'PRJ-004',
        // Sets the projectName field so the surrounding object or component receives this setting.
        projectName: 'Urban Square',
        // Sets the contractNumber field so the surrounding object or component receives this setting.
        contractNumber: 'CTR-USQ-2026-03',
        // Sets the title field so the surrounding object or component receives this setting.
        title: 'Double Basement Excavation, Rock Breaking & Soil Disposal (45,000 Cu.M)',
        // Sets the category field so the surrounding object or component receives this setting.
        category: 'EARTHWORK',
        // Sets the contractValue field so the surrounding object or component receives this setting.
        contractValue: 4800000,
        // Sets the startDate field so the surrounding object or component receives this setting.
        startDate: '2026-09-05',
        // Sets the endDate field so the surrounding object or component receives this setting.
        endDate: '2026-12-15',
        // Sets the status field so the surrounding object or component receives this setting.
        status: 'ACTIVE',
        // Sets the scopeOfWork field so the surrounding object or component receives this setting.
        scopeOfWork: 'Hydraulic breaker deployment, 6 JCB excavators, 12 dumper trucks, and municipal dumping clearance.',
        // Sets the paymentTerms field so the surrounding object or component receives this setting.
        paymentTerms: 'Weekly running account (RA) bills against verified surveyor cross-sections.',
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
    // Sets the quotations field so the surrounding object or component receives this setting.
    quotations: [],
  // Closes the current block or object so the grouped statements or settings end here.
  },
  // Opens a block or object so its related statements or settings can be grouped together.
  {
    // Sets the id field so the surrounding object or component receives this setting.
    id: 'VEND-007',
    // Sets the name field so the surrounding object or component receives this setting.
    name: 'Asian Paints Pro Contracting',
    // Sets the category field so the surrounding object or component receives this setting.
    category: 'FINISHING',
    // Sets the contactPerson field so the surrounding object or component receives this setting.
    contactPerson: 'Meera Nair',
    // Sets the phone field so the surrounding object or component receives this setting.
    phone: '+91 98920 55431',
    // Sets the email field so the surrounding object or component receives this setting.
    email: 'pro.delhi@asianpaints.com',
    // Sets the address field so the surrounding object or component receives this setting.
    address: '6A Shanti Nagar, Santacruz East',
    // Sets the city field so the surrounding object or component receives this setting.
    city: 'Delhi NCR',
    // Sets the gstin field so the surrounding object or component receives this setting.
    gstin: '07AAACA4743B1ZB',
    // Sets the panNumber field so the surrounding object or component receives this setting.
    panNumber: 'AAACA4743B',
    // Sets the rating field so the surrounding object or component receives this setting.
    rating: 4.9,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'ACTIVE',
    // Sets the totalContractedValue field so the surrounding object or component receives this setting.
    totalContractedValue: 0,
    // Sets the activeQuotationsCount field so the surrounding object or component receives this setting.
    activeQuotationsCount: 1,
    // Sets the bankDetails field so the surrounding object or component receives this setting.
    bankDetails: {
      // Sets the accountName field so the surrounding object or component receives this setting.
      accountName: 'Asian Paints Limited',
      // Sets the bankName field so the surrounding object or component receives this setting.
      bankName: 'State Bank of India',
      // Sets the accountNumber field so the surrounding object or component receives this setting.
      accountNumber: '30099441209',
      // Sets the ifscCode field so the surrounding object or component receives this setting.
      ifscCode: 'SBIN0000412',
    // Closes the current block or object so the grouped statements or settings end here.
    },
    // Sets the contracts field so the surrounding object or component receives this setting.
    contracts: [],
    // Sets the quotations field so the surrounding object or component receives this setting.
    quotations: [
      // Opens a block or object so its related statements or settings can be grouped together.
      {
        // Sets the id field so the surrounding object or component receives this setting.
        id: 'QUOTE-AP-301',
        // Sets the quotationNumber field so the surrounding object or component receives this setting.
        quotationNumber: 'QT-AP-2026-301',
        // Sets the vendorId field so the surrounding object or component receives this setting.
        vendorId: 'VEND-007',
        // Sets the vendorName field so the surrounding object or component receives this setting.
        vendorName: 'Asian Paints Pro Contracting',
        // Sets the projectId field so the surrounding object or component receives this setting.
        projectId: '1',
        // Sets the projectCode field so the surrounding object or component receives this setting.
        projectCode: 'PRJ-001',
        // Sets the projectName field so the surrounding object or component receives this setting.
        projectName: 'Green Valley Residency',
        // Sets the category field so the surrounding object or component receives this setting.
        category: 'FINISHING',
        // Sets the itemDescription field so the surrounding object or component receives this setting.
        itemDescription: 'Exterior Apex Ultima Protek with 10-Year Warranty & Internal Royale Luxury Emulsion Application (3,50,000 Sq.Ft)',
        // Sets the quantity field so the surrounding object or component receives this setting.
        quantity: 350000,
        // Sets the unit field so the surrounding object or component receives this setting.
        unit: 'Sq.Ft',
        // Sets the initialQuotedRate field so the surrounding object or component receives this setting.
        initialQuotedRate: 22,
        // Sets the initialTotalAmount field so the surrounding object or component receives this setting.
        initialTotalAmount: 7700000,
        // Sets the currentCounterRate field so the surrounding object or component receives this setting.
        currentCounterRate: 20,
        // Sets the builderTargetRate field so the surrounding object or component receives this setting.
        builderTargetRate: 19.5,
        // Sets the gstRate field so the surrounding object or component receives this setting.
        gstRate: 18,
        // Sets the status field so the surrounding object or component receives this setting.
        status: 'UNDER_NEGOTIATION',
        // Sets the submittedDate field so the surrounding object or component receives this setting.
        submittedDate: '2026-10-28',
        // Sets the validTill field so the surrounding object or component receives this setting.
        validTill: '2026-12-05',
        // Sets the paymentTermsOffered field so the surrounding object or component receives this setting.
        paymentTermsOffered: 'Stage-wise milestone payments based on facade completion',
        // Sets the builderNotes field so the surrounding object or component receives this setting.
        builderNotes: 'Pushing for ₹19.5/Sq.Ft inclusive of 2 coats of exterior wall primer and scaffolding setup.',
        // Sets the negotiationHistory field so the surrounding object or component receives this setting.
        negotiationHistory: [
          // Opens a block or object so its related statements or settings can be grouped together.
          {
            // Sets the id field so the surrounding object or component receives this setting.
            id: 'NEG-050',
            // Sets the date field so the surrounding object or component receives this setting.
            date: '2026-10-28',
            // Sets the author field so the surrounding object or component receives this setting.
            author: 'Meera Nair (Asian Paints)',
            // Sets the role field so the surrounding object or component receives this setting.
            role: 'VENDOR',
            // Sets the offeredRate field so the surrounding object or component receives this setting.
            offeredRate: 22,
            // Sets the unit field so the surrounding object or component receives this setting.
            unit: 'per Sq.Ft',
            // Sets the creditDaysOffered field so the surrounding object or component receives this setting.
            creditDaysOffered: 15,
            // Sets the notes field so the surrounding object or component receives this setting.
            notes: 'Turnkey quote with certified applicator crew and 10-year anti-fungal manufacturer warranty.',
          // Closes the current block or object so the grouped statements or settings end here.
          },
          // Opens a block or object so its related statements or settings can be grouped together.
          {
            // Sets the id field so the surrounding object or component receives this setting.
            id: 'NEG-051',
            // Sets the date field so the surrounding object or component receives this setting.
            date: '2026-11-03',
            // Sets the author field so the surrounding object or component receives this setting.
            author: 'Builder Admin (ForgeOS)',
            // Sets the role field so the surrounding object or component receives this setting.
            role: 'BUILDER',
            // Sets the offeredRate field so the surrounding object or component receives this setting.
            offeredRate: 19.5,
            // Sets the unit field so the surrounding object or component receives this setting.
            unit: 'per Sq.Ft',
            // Sets the creditDaysOffered field so the surrounding object or component receives this setting.
            creditDaysOffered: 30,
            // Sets the notes field so the surrounding object or component receives this setting.
            notes: 'Offered ₹19.5/Sq.Ft considering huge 3.5 Lakh sq ft facade area across 4 towers.',
          // Closes the current block or object so the grouped statements or settings end here.
          },
          // Opens a block or object so its related statements or settings can be grouped together.
          {
            // Sets the id field so the surrounding object or component receives this setting.
            id: 'NEG-052',
            // Sets the date field so the surrounding object or component receives this setting.
            date: '2026-11-07',
            // Sets the author field so the surrounding object or component receives this setting.
            author: 'Meera Nair (Asian Paints)',
            // Sets the role field so the surrounding object or component receives this setting.
            role: 'VENDOR',
            // Sets the offeredRate field so the surrounding object or component receives this setting.
            offeredRate: 20.2,
            // Sets the unit field so the surrounding object or component receives this setting.
            unit: 'per Sq.Ft',
            // Sets the creditDaysOffered field so the surrounding object or component receives this setting.
            creditDaysOffered: 25,
            // Sets the notes field so the surrounding object or component receives this setting.
            notes: 'Revised quote. Offers ₹20.2/Sq.Ft with complimentary damp-proofing evaluation for terrace parapets.',
          // Closes the current block or object so the grouped statements or settings end here.
          },
        // Continues the component or data expression so its related values and behavior stay grouped together.
        ],
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
  // Closes the current block or object so the grouped statements or settings end here.
  },
// Continues the component or data expression so its related values and behavior stay grouped together.
];

// Defines getStoredVendors so this module can perform its named task when needed.
export function getStoredVendors(): Vendor[] {
  // Starts an error-handling region so failures can be caught and handled safely.
  try {
    // Stores the value in raw so later lines can reuse this data or behavior for the current feature.
    const raw = localStorage.getItem(STORAGE_KEY);
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (!raw) {
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialVendors));
      // Returns the result so the caller or React receives the value or interface this function provides.
      return initialVendors;
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Stores the value in parsed so later lines can reuse this data or behavior for the current feature.
    const parsed = JSON.parse(raw);
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Returns the result so the caller or React receives the value or interface this function provides.
      return parsed;
    // Closes the current block or object so the grouped statements or settings end here.
    }
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialVendors));
    // Returns the result so the caller or React receives the value or interface this function provides.
    return initialVendors;
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } catch (err) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    console.error('Failed to load vendors from storage:', err);
    // Returns the result so the caller or React receives the value or interface this function provides.
    return initialVendors;
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines saveStoredVendors so this module can perform its named task when needed.
export function saveStoredVendors(vendors: Vendor[]): void {
  // Starts an error-handling region so failures can be caught and handled safely.
  try {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vendors));
  // Continues the component or data expression so its related values and behavior stay grouped together.
  } catch (err) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    console.error('Failed to save vendors to storage:', err);
  // Closes the current block or object so the grouped statements or settings end here.
  }
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines addVendor so this module can perform its named task when needed.
export function addVendor(vendorData: Omit<Vendor, 'id' | 'contracts' | 'quotations' | 'totalContractedValue' | 'activeQuotationsCount'>): Vendor {
  // Stores the value in vendors so later lines can reuse this data or behavior for the current feature.
  const vendors = getStoredVendors();
  // Stores the value in newVendor so later lines can reuse this data or behavior for the current feature.
  const newVendor: Vendor = {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...vendorData,
    // Sets the id field so the surrounding object or component receives this setting.
    id: `VEND-${String(vendors.length + 1).padStart(3, '0')}`,
    // Sets the contracts field so the surrounding object or component receives this setting.
    contracts: [],
    // Sets the quotations field so the surrounding object or component receives this setting.
    quotations: [],
    // Sets the totalContractedValue field so the surrounding object or component receives this setting.
    totalContractedValue: 0,
    // Sets the activeQuotationsCount field so the surrounding object or component receives this setting.
    activeQuotationsCount: 0,
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  vendors.unshift(newVendor);
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  saveStoredVendors(vendors);
  // Returns the result so the caller or React receives the value or interface this function provides.
  return newVendor;
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines recordNegotiationRound so this module can perform its named task when needed.
export function recordNegotiationRound(
  // Sets the quotationId field so the surrounding object or component receives this setting.
  quotationId: string,
  // Sets the newCounterRate field so the surrounding object or component receives this setting.
  newCounterRate: number,
  // Sets the notes field so the surrounding object or component receives this setting.
  notes: string,
  // Sets the newStatus field so the surrounding object or component receives this setting.
  newStatus: QuotationStatus = 'UNDER_NEGOTIATION'
// Continues the component or data expression so its related values and behavior stay grouped together.
): Quotation | null {
  // Stores the value in vendors so later lines can reuse this data or behavior for the current feature.
  const vendors = getStoredVendors();
  // Stores the value in updatedQuote so later lines can reuse this data or behavior for the current feature.
  let updatedQuote: Quotation | null = null;

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  for (const vendor of vendors) {
    // Stores the value in qIndex so later lines can reuse this data or behavior for the current feature.
    const qIndex = vendor.quotations.findIndex((q) => q.id === quotationId);
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (qIndex !== -1) {
      // Stores the value in q so later lines can reuse this data or behavior for the current feature.
      const q = vendor.quotations[qIndex];
      // Stores the value in newHistoryItem so later lines can reuse this data or behavior for the current feature.
      const newHistoryItem: NegotiationHistoryItem = {
        // Sets the id field so the surrounding object or component receives this setting.
        id: `NEG-${Date.now().toString().slice(-4)}`,
        // Sets the date field so the surrounding object or component receives this setting.
        date: new Date().toISOString().split('T')[0],
        // Sets the author field so the surrounding object or component receives this setting.
        author: 'Builder Admin (ForgeOS)',
        // Sets the role field so the surrounding object or component receives this setting.
        role: 'BUILDER',
        // Sets the offeredRate field so the surrounding object or component receives this setting.
        offeredRate: newCounterRate,
        // Sets the unit field so the surrounding object or component receives this setting.
        unit: `per ${q.unit}`,
        // Sets the creditDaysOffered field so the surrounding object or component receives this setting.
        creditDaysOffered: 30,
        // Sets the notes field so the surrounding object or component receives this setting.
        notes: notes.trim() || 'Counter-offer proposed by Builder during price discovery.',
      // Closes the current block or object so the grouped statements or settings end here.
      };

      // Continues the component or data expression so its related values and behavior stay grouped together.
      q.currentCounterRate = newCounterRate;
      // Continues the component or data expression so its related values and behavior stay grouped together.
      q.status = newStatus;
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      q.negotiationHistory.push(newHistoryItem);
      // Continues the component or data expression so its related values and behavior stay grouped together.
      q.builderNotes = notes;

      // Continues the component or data expression so its related values and behavior stay grouped together.
      vendor.quotations[qIndex] = q;
      // Continues the component or data expression so its related values and behavior stay grouped together.
      updatedQuote = q;
      // Continues the component or data expression so its related values and behavior stay grouped together.
      break;
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (updatedQuote) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    saveStoredVendors(vendors);
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Returns the result so the caller or React receives the value or interface this function provides.
  return updatedQuote;
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines acceptQuotation so this module can perform its named task when needed.
export function acceptQuotation(quotationId: string, finalAgreedRate: number): Quotation | null {
  // Stores the value in vendors so later lines can reuse this data or behavior for the current feature.
  const vendors = getStoredVendors();
  // Stores the value in updatedQuote so later lines can reuse this data or behavior for the current feature.
  let updatedQuote: Quotation | null = null;

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  for (const vendor of vendors) {
    // Stores the value in qIndex so later lines can reuse this data or behavior for the current feature.
    const qIndex = vendor.quotations.findIndex((q) => q.id === quotationId);
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (qIndex !== -1) {
      // Stores the value in q so later lines can reuse this data or behavior for the current feature.
      const q = vendor.quotations[qIndex];
      // Continues the component or data expression so its related values and behavior stay grouped together.
      q.status = 'ACCEPTED';
      // Continues the component or data expression so its related values and behavior stay grouped together.
      q.finalAgreedRate = finalAgreedRate;
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      q.negotiationHistory.push({
        // Sets the id field so the surrounding object or component receives this setting.
        id: `NEG-${Date.now().toString().slice(-4)}`,
        // Sets the date field so the surrounding object or component receives this setting.
        date: new Date().toISOString().split('T')[0],
        // Sets the author field so the surrounding object or component receives this setting.
        author: 'Builder Admin (ForgeOS)',
        // Sets the role field so the surrounding object or component receives this setting.
        role: 'BUILDER',
        // Sets the offeredRate field so the surrounding object or component receives this setting.
        offeredRate: finalAgreedRate,
        // Sets the unit field so the surrounding object or component receives this setting.
        unit: `per ${q.unit}`,
        // Sets the notes field so the surrounding object or component receives this setting.
        notes: `Quotation finalized and accepted at negotiated rate ₹${finalAgreedRate.toLocaleString('en-IN')}/${q.unit}. Prepared for contract execution.`,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      });

      // Also create an active contract for this vendor on the project!
      // Stores the value in contractValue so later lines can reuse this data or behavior for the current feature.
      const contractValue = finalAgreedRate * q.quantity;
      // Stores the value in newContract so later lines can reuse this data or behavior for the current feature.
      const newContract: ProjectContract = {
        // Sets the id field so the surrounding object or component receives this setting.
        id: `CTR-${Date.now().toString().slice(-4)}`,
        // Sets the projectId field so the surrounding object or component receives this setting.
        projectId: q.projectId,
        // Sets the projectCode field so the surrounding object or component receives this setting.
        projectCode: q.projectCode,
        // Sets the projectName field so the surrounding object or component receives this setting.
        projectName: q.projectName,
        // Sets the contractNumber field so the surrounding object or component receives this setting.
        contractNumber: `CTR-${q.projectCode}-${new Date().getFullYear()}-${String(vendor.contracts.length + 1).padStart(2, '0')}`,
        // Sets the title field so the surrounding object or component receives this setting.
        title: `${q.itemDescription.slice(0, 50)}... Supply Agreement`,
        // Sets the category field so the surrounding object or component receives this setting.
        category: q.category,
        // Continues the component or data expression so its related values and behavior stay grouped together.
        contractValue,
        // Sets the startDate field so the surrounding object or component receives this setting.
        startDate: new Date().toISOString().split('T')[0],
        // Sets the endDate field so the surrounding object or component receives this setting.
        endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        // Sets the status field so the surrounding object or component receives this setting.
        status: 'ACTIVE',
        // Sets the scopeOfWork field so the surrounding object or component receives this setting.
        scopeOfWork: `Agreed supply of ${q.quantity} ${q.unit} of ${q.itemDescription} at finalized rate of ₹${finalAgreedRate}/${q.unit}.`,
        // Sets the paymentTerms field so the surrounding object or component receives this setting.
        paymentTerms: q.paymentTermsOffered || '30 days net credit against verified challans.',
      // Closes the current block or object so the grouped statements or settings end here.
      };

      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      vendor.contracts.unshift(newContract);
      // Continues the component or data expression so its related values and behavior stay grouped together.
      vendor.totalContractedValue += contractValue;
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (vendor.activeQuotationsCount > 0) {
        // Continues the component or data expression so its related values and behavior stay grouped together.
        vendor.activeQuotationsCount -= 1;
      // Closes the current block or object so the grouped statements or settings end here.
      }

      // Continues the component or data expression so its related values and behavior stay grouped together.
      vendor.quotations[qIndex] = q;
      // Continues the component or data expression so its related values and behavior stay grouped together.
      updatedQuote = q;
      // Continues the component or data expression so its related values and behavior stay grouped together.
      break;
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (updatedQuote) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    saveStoredVendors(vendors);
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Returns the result so the caller or React receives the value or interface this function provides.
  return updatedQuote;
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines rejectQuotation so this module can perform its named task when needed.
export function rejectQuotation(quotationId: string, reason: string): Quotation | null {
  // Stores the value in vendors so later lines can reuse this data or behavior for the current feature.
  const vendors = getStoredVendors();
  // Stores the value in updatedQuote so later lines can reuse this data or behavior for the current feature.
  let updatedQuote: Quotation | null = null;

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  for (const vendor of vendors) {
    // Stores the value in qIndex so later lines can reuse this data or behavior for the current feature.
    const qIndex = vendor.quotations.findIndex((q) => q.id === quotationId);
    // Checks this condition before continuing so the code can choose the correct path for the current state.
    if (qIndex !== -1) {
      // Stores the value in q so later lines can reuse this data or behavior for the current feature.
      const q = vendor.quotations[qIndex];
      // Continues the component or data expression so its related values and behavior stay grouped together.
      q.status = 'REJECTED';
      // Calls this helper or component so the feature can perform the operation or render the control represented here.
      q.negotiationHistory.push({
        // Sets the id field so the surrounding object or component receives this setting.
        id: `NEG-${Date.now().toString().slice(-4)}`,
        // Sets the date field so the surrounding object or component receives this setting.
        date: new Date().toISOString().split('T')[0],
        // Sets the author field so the surrounding object or component receives this setting.
        author: 'Builder Admin (ForgeOS)',
        // Sets the role field so the surrounding object or component receives this setting.
        role: 'BUILDER',
        // Sets the offeredRate field so the surrounding object or component receives this setting.
        offeredRate: q.currentCounterRate || q.initialQuotedRate,
        // Sets the unit field so the surrounding object or component receives this setting.
        unit: `per ${q.unit}`,
        // Sets the notes field so the surrounding object or component receives this setting.
        notes: `Negotiation closed / Rejected: ${reason}`,
      // Continues the component or data expression so its related values and behavior stay grouped together.
      });
      // Checks this condition before continuing so the code can choose the correct path for the current state.
      if (vendor.activeQuotationsCount > 0) {
        // Continues the component or data expression so its related values and behavior stay grouped together.
        vendor.activeQuotationsCount -= 1;
      // Closes the current block or object so the grouped statements or settings end here.
      }
      // Continues the component or data expression so its related values and behavior stay grouped together.
      vendor.quotations[qIndex] = q;
      // Continues the component or data expression so its related values and behavior stay grouped together.
      updatedQuote = q;
      // Continues the component or data expression so its related values and behavior stay grouped together.
      break;
    // Closes the current block or object so the grouped statements or settings end here.
    }
  // Closes the current block or object so the grouped statements or settings end here.
  }

  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (updatedQuote) {
    // Calls this helper or component so the feature can perform the operation or render the control represented here.
    saveStoredVendors(vendors);
  // Closes the current block or object so the grouped statements or settings end here.
  }
  // Returns the result so the caller or React receives the value or interface this function provides.
  return updatedQuote;
// Closes the current block or object so the grouped statements or settings end here.
}

// Defines addQuotationToVendor so this module can perform its named task when needed.
export function addQuotationToVendor(
  // Sets the vendorId field so the surrounding object or component receives this setting.
  vendorId: string,
  // Sets the quoteData field so the surrounding object or component receives this setting.
  quoteData: Omit<Quotation, 'id' | 'vendorName' | 'status' | 'negotiationHistory'>
// Continues the component or data expression so its related values and behavior stay grouped together.
): Quotation | null {
  // Stores the value in vendors so later lines can reuse this data or behavior for the current feature.
  const vendors = getStoredVendors();
  // Stores the value in vIndex so later lines can reuse this data or behavior for the current feature.
  const vIndex = vendors.findIndex((v) => v.id === vendorId);
  // Checks this condition before continuing so the code can choose the correct path for the current state.
  if (vIndex === -1) return null;

  // Stores the value in vendor so later lines can reuse this data or behavior for the current feature.
  const vendor = vendors[vIndex];
  // Stores the value in newQuotation so later lines can reuse this data or behavior for the current feature.
  const newQuotation: Quotation = {
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ...quoteData,
    // Sets the id field so the surrounding object or component receives this setting.
    id: `QUOTE-${Date.now().toString().slice(-5)}`,
    // Sets the vendorName field so the surrounding object or component receives this setting.
    vendorName: vendor.name,
    // Sets the status field so the surrounding object or component receives this setting.
    status: 'SUBMITTED',
    // Sets the negotiationHistory field so the surrounding object or component receives this setting.
    negotiationHistory: [
      // Opens a block or object so its related statements or settings can be grouped together.
      {
        // Sets the id field so the surrounding object or component receives this setting.
        id: `NEG-INIT-${Date.now().toString().slice(-4)}`,
        // Sets the date field so the surrounding object or component receives this setting.
        date: quoteData.submittedDate || new Date().toISOString().split('T')[0],
        // Sets the author field so the surrounding object or component receives this setting.
        author: `${vendor.contactPerson} (${vendor.name})`,
        // Sets the role field so the surrounding object or component receives this setting.
        role: 'VENDOR',
        // Sets the offeredRate field so the surrounding object or component receives this setting.
        offeredRate: quoteData.initialQuotedRate,
        // Sets the unit field so the surrounding object or component receives this setting.
        unit: `per ${quoteData.unit}`,
        // Sets the notes field so the surrounding object or component receives this setting.
        notes: 'Initial quotation submitted for review.',
      // Closes the current block or object so the grouped statements or settings end here.
      },
    // Continues the component or data expression so its related values and behavior stay grouped together.
    ],
  // Closes the current block or object so the grouped statements or settings end here.
  };

  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  vendor.quotations.unshift(newQuotation);
  // Continues the component or data expression so its related values and behavior stay grouped together.
  vendor.activeQuotationsCount += 1;
  // Continues the component or data expression so its related values and behavior stay grouped together.
  vendors[vIndex] = vendor;
  // Calls this helper or component so the feature can perform the operation or render the control represented here.
  saveStoredVendors(vendors);
  // Returns the result so the caller or React receives the value or interface this function provides.
  return newQuotation;
// Closes the current block or object so the grouped statements or settings end here.
}

