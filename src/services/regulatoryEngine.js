// Regulatory Intelligence Engine for UdyamSetu
// Dynamically maps Business Profile -> Regulatory Intelligence -> Applicable Requirements -> Documents -> Compliance -> Government Support

import {
  queryKnowledgeBaseRequirements,
  evaluateRequirement,
  RULE_STATUS,
  VERIFICATION_STATUS,
  OFFICIAL_KNOWLEDGE_BASE,
} from "./regulatoryKnowledgeBase.js";

export {
  queryKnowledgeBaseRequirements,
  evaluateRequirement,
  RULE_STATUS,
  VERIFICATION_STATUS,
  OFFICIAL_KNOWLEDGE_BASE,
};

export const INDUSTRY_SECTORS = [
  "Manufacturing",
  "Food Processing",
  "IT / Software",
  "Textiles",
  "Agriculture / Agro-processing",
  "Pharmaceuticals",
  "Construction",
  "Retail",
  "Services",
  "Other",
];

export const BUSINESS_STAGES = [
  "Idea / Planning",
  "New Business",
  "Existing Business",
  "Expansion",
];

export const BUSINESS_SIZES = [
  "Micro",
  "Small",
  "Medium",
  "Large",
];

export const MAHARASHTRA_DISTRICTS = [
  "Nashik",
  "Pune",
  "Mumbai City",
  "Mumbai Suburban",
  "Thane",
  "Nagpur",
  "Chhatrapati Sambhajinagar",
  "Kolhapur",
  "Solapur",
  "Amravati",
  "Satara",
  "Ahmednagar",
  "Jalgaon",
  "Nanded",
  "Raigad",
  "Palghar",
  "Sangli",
  "Ratnagiri",
  "Chandrapur",
  "Wardha",
  "Latur",
  "Dhule",
  "Beed",
  "Yavatmal",
  "Bhandara",
  "Gondia",
  "Gadchiroli",
  "Hingoli",
  "Jalna",
  "Nandurbar",
  "Osmanabad (Dharashiv)",
  "Parbhani",
  "Sindhudurg",
  "Washim",
  "Buldhana",
];

export const INDUSTRY_OPERATIONS_MAP = {
  "Food Processing": [
    "Manufacturing",
    "Packaging",
    "Storage",
    "Cold Storage",
    "Primary Grinding & Milling",
    "Quality Lab Testing",
    "Wholesale Distribution",
  ],
  "Manufacturing": [
    "Machining & Fabrication",
    "Assembly Line",
    "Heat Treatment / Foundry",
    "Surface Coating / Painting",
    "Tooling & Die Making",
    "Packaging & Dispatch",
    "Warehousing & Raw Material Storage",
  ],
  "IT / Software": [
    "Custom Software Development",
    "SaaS Platform Hosting",
    "Cloud Infrastructure Operations",
    "Data Center & Server Hosting",
    "IT Support & BPO Services",
    "AI / ML R&D Lab",
    "Client Consulting & Delivery",
  ],
  "Textiles": [
    "Spinning & Ginning",
    "Weaving & Knitting",
    "Wet Processing & Dyeing",
    "Garment Fabrication & Stitching",
    "Effluent Treatment Operations",
    "Packaging & Export Staging",
    "Yarn & Fabric Storage",
  ],
  "Agriculture / Agro-processing": [
    "Sorting & Grading Line",
    "Cold Chain Pre-cooling",
    "Grain & Pulse Milling",
    "Dehydration & Drying",
    "Bulk Storage & Silos",
    "Packaging & Barcoding",
    "Farm Gate Aggregation",
  ],
  "Pharmaceuticals": [
    "Active Pharmaceutical Ingredient (API) Synthesis",
    "Formulation (Tablets / Liquids / Capsules)",
    "Sterile Packaging & Blistering",
    "Quality Control (NABL Analytical Lab)",
    "Temperature Controlled Storage",
    "Hazardous Solvent Recovery",
    "Clinical Batch Pilot Plant",
  ],
  "Construction": [
    "Civil Works & Structural Erection",
    "Ready-mix Concrete (RMC) Plant",
    "Earthmoving & Excavation",
    "Precast Concrete Casting",
    "Heavy Equipment Staging & Yard",
    "Material Storage & Silos",
    "Project Site Management",
  ],
  "Retail": [
    "Physical Commercial Storefront",
    "E-Commerce Fulfillment Hub",
    "Inventory Warehousing",
    "Cash & Carry Wholesale Depot",
    "Cold Storage for Perishables",
    "Counter Sales & POS",
    "Customer Delivery Fleet",
  ],
  "Services": [
    "Professional Consultancy Office",
    "Logistics & Fleet Depot",
    "Maintenance & Repair Workshop",
    "Facility Management Hub",
    "Field Support & Deployment",
    "Training & Skill Center",
    "Client Service Center",
  ],
  "Other": [
    "Commercial Office Operations",
    "Light Processing / Assembly",
    "Packaging & Despatch",
    "Storage & Warehousing",
    "Client Services",
    "Distribution & Logistics",
  ],
};

// Curated demo profiles for quick user testing
export const DEMO_PROFILES = {
  abc_foods: {
    id: "biz-001",
    isDemo: true,
    legalName: "ABC Foods Pvt. Ltd.",
    brandName: "ABC Foods",
    referenceId: "MH-NSK-2024-F8821",
    sector: "Food Processing",
    sectorCategory: "Grain Mill Products & Commercial Packaging",
    entityType: "Private Limited Company",
    classification: "Small",
    stage: "New Business",
    state: "Maharashtra",
    district: "Nashik",
    industrialArea: "MIDC Ambad Industrial Estate",
    plotNumber: "Plot No. W-48, Phase II",
    pinCode: "422010",
    operations: ["Manufacturing", "Packaging", "Storage"],
    workforceCount: 28,
    connectedLoadHP: 45,
    plantMachineryInvestment: 45000000,
    annualTurnoverEstimated: 182000000,
    udyamNumber: "UDYAM-MH-26-0038912",
    cin: "U15400MH2024PTC419820",
    pan: "AABCA9128K",
    gstin: "27AABCA9128K1Z3",
    contactPerson: "Rajesh Sharma",
    designation: "Managing Director",
    email: "rajesh.sharma@abcfoods.in",
    phone: "+91 98220 45678",
    status: "Sample MSME",
  },
  pune_tech: {
    id: "biz-002",
    isDemo: true,
    legalName: "Pune CloudSoft Solutions Pvt. Ltd.",
    brandName: "CloudSoft AI",
    referenceId: "MH-PUN-2024-S3019",
    sector: "IT / Software",
    sectorCategory: "SaaS Platform & Enterprise Cloud Services",
    entityType: "Private Limited Company",
    classification: "Small",
    stage: "Existing Business",
    state: "Maharashtra",
    district: "Pune",
    industrialArea: "Hinjawadi Rajiv Gandhi Infotech Park Phase 1",
    plotNumber: "Tower C, 4th Floor, Tech Hub",
    pinCode: "411057",
    operations: ["Custom Software Development", "SaaS Platform Hosting", "Cloud Infrastructure Operations"],
    workforceCount: 42,
    connectedLoadHP: 15,
    plantMachineryInvestment: 12000000,
    annualTurnoverEstimated: 65000000,
    udyamNumber: "UDYAM-MH-26-0091823",
    cin: "U72200MH2023PTC398210",
    pan: "AAPCS8821L",
    gstin: "27AAPCS8821L1ZM",
    contactPerson: "Aditi Kulkarni",
    designation: "Director & CTO",
    email: "aditi.kulkarni@cloudsoft.in",
    phone: "+91 98501 92834",
    status: "Sample MSME",
  },
  nagpur_mfg: {
    id: "biz-003",
    isDemo: true,
    legalName: "Vidarbha Precision Forgings LLP",
    brandName: "Vidarbha Forgings",
    referenceId: "MH-NGP-2024-M4420",
    sector: "Manufacturing",
    sectorCategory: "Automotive Precision Components & CNC Machining",
    entityType: "Partnership / LLP",
    classification: "Medium",
    stage: "Expansion",
    state: "Maharashtra",
    district: "Nagpur",
    industrialArea: "MIDC Butibori Industrial Zone",
    plotNumber: "Plot No. B-12, Sector D",
    pinCode: "441122",
    operations: ["Machining & Fabrication", "Assembly Line", "Heat Treatment / Foundry"],
    workforceCount: 65,
    connectedLoadHP: 120,
    plantMachineryInvestment: 85000000,
    annualTurnoverEstimated: 240000000,
    udyamNumber: "UDYAM-MH-20-0044120",
    cin: "AAA-4910",
    pan: "AABFV4421R",
    gstin: "27AABFV4421R1ZX",
    contactPerson: "Nitin Deshmukh",
    designation: "Managing Partner",
    email: "nitin@vidarbhaforgings.com",
    phone: "+91 97654 32109",
    status: "Sample MSME",
  },
};

export const defaultBusinessProfile = DEMO_PROFILES.abc_foods;

// Dynamic Regulatory Intelligence Engine
export function generateRegulatoryIntelligence(profile, masterRequirements = null) {
  const sector = profile.sector || "Manufacturing";
  const district = profile.district || "Nashik";
  const state = profile.state || "Maharashtra";
  const size = profile.classification || "Small";
  const stage = profile.stage || "New Business";
  const operations = profile.operations || [];
  const workforce = profile.workforceCount || 20;
  const hp = profile.connectedLoadHP || 25;
  const isMfgOrProcessing = sector === "Manufacturing" || sector === "Food Processing" || sector === "Textiles" || sector === "Pharmaceuticals";

  let requirements = [];
  let documents = [];
  let complianceTasks = [];
  let governmentSupport = [];

  // 1. Sector-Specific Requirements Generator / Master Knowledge Base Engine
  if (sector === "Food Processing" || (Array.isArray(masterRequirements) && masterRequirements.length > 0)) {
    requirements = queryKnowledgeBaseRequirements(profile, masterRequirements);
  } else if (sector === "IT / Software") {
    requirements.push({
      id: "it-sez-stpi",
      title: "STPI / Non-STPI Service Registration & DPDP Architecture",
      act: "Information Technology Act, 2000 & STPI Scheme",
      department: "Software Technology Parks of India / MeitY",
      portalName: "STPI Portal",
      portalUrl: "https://www.stpi.in",
      priority: "HIGH",
      priorityColor: "amber",
      category: "STATUTORY APPROVAL",
      status: "Action Needed",
      validityYears: "3 Years",
      estimatedFee: "As per STPI slab schedule",
      estimatedTimeline: "15-25 working days",
      inspectionRequired: "Desk Scrutiny & Virtual Security Review",
      jurisdictionTier: `STPI Maharashtra (${district === "Pune" ? "Pune" : "Regional Directorate"})`,
      statutoryTriggers: "Software export, SaaS hosting, and IT service delivery require formal export registration and compliance with data governance norms.",
      actionNeeded: "Upload IT Infrastructure Architecture & Data Protection Officer declaration",
      mandatoryRecords: [
        { id: "doc-it-arch", name: "Network & Cloud Security Architecture Blueprint", status: "verified", required: true },
        { id: "doc-dpo", name: "Data Protection Officer (DPO) Appointment Declaration", status: "action_required", required: true },
        { id: "doc-lease-it", name: "Commercial Premises Agreement (IT Zone)", status: "verified", required: true },
        { id: "doc-export", name: "IEC (Import Export Code) for Service Export", status: "verified", required: true },
      ],
      steps: [
        { stepNumber: 1, title: "Service Unit Intimation", description: "Draft operational charter and export projections.", status: "completed" },
        { stepNumber: 2, title: "Security Baseline Verification", description: "Verify data privacy and architecture documentation.", status: "in_progress" },
        { stepNumber: 3, title: "Official Portal Filing", description: "Submit on STPI gateway.", status: "pending" },
        { stepNumber: 4, title: "Registration Grant", description: "Receive STPI export registration certificate.", status: "pending" },
      ],
    });
  } else if (sector === "Pharmaceuticals") {
    requirements.push({
      id: "pharma-drug-lic",
      title: "State FDA Drug Manufacturing License (Form 25 / Form 28)",
      act: "Drugs and Cosmetics Act, 1940 & Rules 1945",
      department: "Food and Drug Administration (FDA Maharashtra)",
      portalName: "FDA Maharashtra Licensing Portal",
      portalUrl: "https://fda.maharashtra.gov.in",
      priority: "HIGH",
      priorityColor: "amber",
      category: "STATUTORY APPROVAL",
      status: "Action Needed",
      validityYears: "5 Years",
      estimatedFee: "As per Drugs & Cosmetics Schedule M fee slabs",
      estimatedTimeline: "60-90 working days",
      inspectionRequired: "Joint Inspection by Drug Inspector & Assistant Commissioner",
      jurisdictionTier: `FDA Maharashtra (${district} Division)`,
      statutoryTriggers: "Manufacturing, formulation, or packaging of pharmaceutical products requires cGMP validation and FDA drug manufacturing clearance.",
      actionNeeded: "Upload Approved Technical Staff Bio-data & Plant HVAC Validation Report",
      mandatoryRecords: [
        { id: "doc-ph-layout", name: "Plant Layout Drawing (Clean Room / HVAC)", status: "verified", required: true },
        { id: "doc-chemist", name: "Approved Technical Staff Credentials", status: "action_required", required: true },
        { id: "doc-sop", name: "Standard Operating Procedures (SOP) & Master Formula", status: "action_required", required: true },
        { id: "doc-water-ph", name: "Purified Water System Test Report", status: "verified", required: true },
      ],
      steps: [
        { stepNumber: 1, title: "Application Preparation", description: "Identify pharmacopeial monograph items.", status: "completed" },
        { stepNumber: 2, title: "Clean Room & HVAC Audit", description: "Verify pressure differential and particle counts.", status: "in_progress" },
        { stepNumber: 3, title: "Official FDA Inspection", description: "Site inspection by Senior Drug Inspector.", status: "pending" },
        { stepNumber: 4, title: "License Issuance", description: "Issuance of formal drug manufacturing license.", status: "pending" },
      ],
    });
  } else if (sector === "Textiles") {
    requirements.push({
      id: "textile-commissioner",
      title: "Textile Commissioner Registration & Handloom/Powerloom Code",
      act: "Textile Development Act & State Policy",
      department: "Office of the Textile Commissioner / Directorate of Textiles",
      portalName: "National Textile Portal",
      portalUrl: "https://txcindia.gov.in",
      priority: "HIGH",
      priorityColor: "amber",
      category: "STATUTORY APPROVAL",
      status: "Action Needed",
      validityYears: "5 Years",
      estimatedFee: "As per plant capacity slabs",
      estimatedTimeline: "20-30 working days",
      inspectionRequired: "Machinery inspection by District Textile Officer",
      jurisdictionTier: `Directorate of Textiles (${district})`,
      statutoryTriggers: "Spinning, weaving, processing, or garment manufacture requires formal registration with Office of the Textile Commissioner.",
      actionNeeded: "Verify loom capacity declarations and effluent mitigation scheme",
      mandatoryRecords: [
        { id: "doc-loom", name: "Loom / Machinery Installed Capacity Schedule", status: "action_required", required: true },
        { id: "doc-midc-tex", name: "Premises Allotment / Lease Deed", status: "verified", required: true },
        { id: "doc-etp-tex", name: "Effluent Treatment (CETP / ZLD) Membership", status: "action_required", required: true },
      ],
      steps: [
        { stepNumber: 1, title: "Capacity Declaration", description: "Declare capacity under Textile Information System.", status: "completed" },
        { stepNumber: 2, title: "Environmental Pre-Screening", description: "Validate CETP tie-up in industrial cluster.", status: "in_progress" },
        { stepNumber: 3, title: "Registration Grant", description: "Receive Textile Commissioner Identification Number.", status: "pending" },
      ],
    });
  } else if (sector === "Construction") {
    requirements.push({
      id: "maharera-reg",
      title: "MahaRERA Project Registration & Local Building Sanctions",
      act: "Real Estate (Regulation and Development) Act, 2016",
      department: "Maharashtra Real Estate Regulatory Authority (MahaRERA)",
      portalName: "MahaRERA Portal",
      portalUrl: "https://maharera.mahaonline.gov.in",
      priority: "HIGH",
      priorityColor: "amber",
      category: "STATUTORY APPROVAL",
      status: "Action Needed",
      validityYears: "Project Duration",
      estimatedFee: "Statutory rate per sq. meter under MahaRERA rules",
      estimatedTimeline: "30-45 working days",
      inspectionRequired: "Desk Scrutiny of Title & Local Sanctions",
      jurisdictionTier: "MahaRERA Regional Authority & Local Planning Authority",
      statutoryTriggers: "Development or commercial construction project exceeding 500 sq. meters requires mandatory MahaRERA registration prior to advertising or sale.",
      actionNeeded: "Upload Title Search Report from Advocate & Commencement Certificate (CC)",
      mandatoryRecords: [
        { id: "doc-title", name: "Title Search Certificate by Empaneled Advocate", status: "verified", required: true },
        { id: "doc-cc", name: "Municipal Commencement Certificate (CC)", status: "action_required", required: true },
        { id: "doc-sanction", name: "Sanctioned Architectural Layout & Structural Plan", status: "verified", required: true },
        { id: "doc-rera-bank", name: "Project Escrow Bank Account Declaration", status: "action_required", required: true },
      ],
      steps: [
        { stepNumber: 1, title: "Title Investigation & Approvals", description: "Complete non-encumbrance verification.", status: "completed" },
        { stepNumber: 2, title: "MahaRERA Online Filing", description: "Submit Forms 1, 2, and 3 on the portal.", status: "in_progress" },
        { stepNumber: 3, title: "Registration Grant", description: "Receive statutory project registration number.", status: "pending" },
      ],
    });
  }

  // 2. Environmental & Factory Approvals (Applies to Non-Food Manufacturing / Legacy fallbacks)
  const isKnowledgeBaseHandled = sector === "Food Processing" || (Array.isArray(masterRequirements) && masterRequirements.length > 0);
  if (!isKnowledgeBaseHandled && (isMfgOrProcessing || sector === "Construction" || sector === "Agriculture / Agro-processing")) {
    requirements.push({
      id: "mpcb-cte",
      title: "Factory Layout Approval & Consent to Establish (CTE)",
      act: "Factories Act, 1948 / Water & Air Pollution Control Acts",
      department: "Directorate of Industrial Safety & Health (DISH) / MPCB",
      portalName: "MPCB Portal",
      portalUrl: "https://mpcb.gov.in",
      priority: "HIGH",
      priorityColor: "amber",
      category: "ENVIRONMENTAL & SAFETY",
      status: "Action Needed",
      validityYears: "5 Years",
      estimatedFee: "Prescribed government fee based on capital outlay",
      estimatedTimeline: "45-60 working days",
      inspectionRequired: "Site Appraisal by MPCB Sub-Regional Officer",
      jurisdictionTier: `MPCB ${district} Sub-Regional Office & DISH Division`,
      statutoryTriggers: `${sector} operations at ${district} with power load (${hp} HP) and workforce (${workforce}) trigger statutory factory layout approval and pollution categorization.`,
      actionNeeded: "Complete environmental checklist for MPCB single-window entry",
      mandatoryRecords: [
        { id: "doc-midc", name: "Premises Allotment / Registered Lease Deed", status: "verified", required: true },
        { id: "doc-arch", name: "Architect-Certified Factory Layout Plan", status: "action_required", required: true },
        { id: "doc-etp", name: "Effluent & Emission Treatment Scheme", status: "action_required", required: true },
        { id: "doc-msedcl", name: `Connected Power Load Sanction Letter (${hp} HP)`, status: "action_required", required: true },
      ],
      steps: [
        { stepNumber: 1, title: "Siting & Pollution Classification", description: "Determine Green/Orange/Red category.", status: "completed" },
        { stepNumber: 2, title: "Environmental Management Plan", description: "Draft effluent and particulate emission plan.", status: "in_progress" },
        { stepNumber: 3, title: "Portal Submission (MAITRI/MPCB)", description: "Submit on official single window portal.", status: "pending" },
        { stepNumber: 4, title: "Consent Order Grant", description: "Issuance of formal Consent to Establish.", status: "pending" },
      ],
    });
  }

  // 3. Local Municipal / Premises Requirement (Gumasta - Applies across Non-Food / legacy fallback)
  if (!isKnowledgeBaseHandled) {
    requirements.push({
      id: "gumasta-license",
      title: "Local Business Registration (Gumasta / Shop Act)",
      act: "Maharashtra Shops & Establishments Act, 2017",
      department: `${district} Municipal Corporation / Aaple Sarkar`,
      portalName: "Aaple Sarkar Portal",
      portalUrl: "https://aaplesarkar.mahaonline.gov.in",
      priority: "MEDIUM",
      priorityColor: "blue",
      category: "MUNICIPAL JURISDICTION",
      status: "Near Completion",
      validityYears: "Up to 10 Years",
      estimatedFee: "₹2,400 municipal intimation fee",
      estimatedTimeline: "5-7 working days",
      inspectionRequired: "Random post-intimation municipal verification",
      jurisdictionTier: `${district} Municipal Corporation Ward Office`,
      statutoryTriggers: `Operating commercial enterprise within ${district} municipal limits requires formal intimation (Form A) for establishment head office under state municipal laws.`,
      actionNeeded: "Upload photograph of frontage signboard in Marathi (Devanagari)",
      mandatoryRecords: [
        { id: "doc-kyc", name: "PAN & Identity Proofs of Signatories", status: "verified", required: true },
        { id: "doc-lease", name: "Premises Tenancy Agreement / Title Document", status: "verified", required: true },
        { id: "doc-tax", name: "Municipal Property Tax Paid Receipt", status: "verified", required: true },
        { id: "doc-sign", name: "Frontage Signboard Photo in Marathi (Devanagari)", status: "action_required", required: true },
      ],
      steps: [
        { stepNumber: 1, title: "Form A Intimation Preparation", description: "Prefill enterprise classification and worker roster.", status: "completed" },
        { stepNumber: 2, title: "Signboard Photo Check", description: "Verify signboard text in Marathi Devanagari script.", status: "in_progress" },
        { stepNumber: 3, title: "Portal Submission (Aaple Sarkar)", description: "Submit on Aaple Sarkar portal with Aadhaar e-Sign.", status: "pending" },
        { stepNumber: 4, title: "Certificate Download", description: "Download digitally signed Form G Registration Certificate.", status: "pending" },
      ],
    });
  }

  // 4. Dynamic Documents List
  documents = [
    {
      id: "doc-1",
      name: `${profile.brandName || "Enterprise"}_Certificate_of_Incorporation.pdf`,
      category: "Statutory Identity",
      docType: "Corporate Registration",
      size: "1.8 MB",
      uploadedAt: "2024-02-14",
      status: "verified",
      statusLabel: "Ready",
      verifiedBy: "MCA Portal Verified",
      requirementRef: requirements.map((r) => r.id),
      notes: `Verified against CIN: ${profile.cin || "U15400MH2024PTC419820"}`,
    },
    {
      id: "doc-2",
      name: "Constitutional_Charter_MoA_AoA.pdf",
      category: "Statutory Identity",
      docType: "Constitutional Charter",
      size: "3.2 MB",
      uploadedAt: "2024-02-14",
      status: "verified",
      statusLabel: "Ready",
      verifiedBy: "ROC Maharashtra Certified",
      requirementRef: requirements.map((r) => r.id),
      notes: `Objects clause explicitly covers ${sector} operations.`,
    },
    {
      id: "doc-3",
      name: "Authorized_Signatory_KYC_Bundle.pdf",
      category: "Statutory Identity",
      docType: "Identity Proof",
      size: "2.1 MB",
      uploadedAt: "2024-02-18",
      status: "verified",
      statusLabel: "Ready",
      verifiedBy: "DigiLocker Pre-Checked",
      requirementRef: ["gumasta-license"],
      notes: `KYC credentials for ${profile.contactPerson || "Authorized Signatory"} verified.`,
    },
    {
      id: "doc-4",
      name: `${district}_Premises_Lease_Deed.pdf`,
      category: "Premises & Land",
      docType: "Land Tenure",
      size: "5.4 MB",
      uploadedAt: "2024-03-01",
      status: "verified",
      statusLabel: "Ready",
      verifiedBy: `${district} Sub-Registry Copy`,
      requirementRef: ["gumasta-license", "mpcb-cte"],
      notes: `Premises agreement for ${profile.industrialArea || district}.`,
    },
    {
      id: "doc-5",
      name: "Municipal_Property_Tax_Current_Receipt.pdf",
      category: "Premises & Land",
      docType: "Municipal Clearance",
      size: "840 KB",
      uploadedAt: "2024-03-10",
      status: "verified",
      statusLabel: "Ready",
      verifiedBy: `${district} Municipal Revenue Portal`,
      requirementRef: ["gumasta-license"],
      notes: "Current assessment year receipt verified.",
    },
    {
      id: "doc-6",
      name: `${district}_Premises_Layout_Plan.pdf`,
      category: "Technical & Engineering",
      docType: "Premises Layout Plan",
      size: "4.5 MB",
      uploadedAt: "2024-03-15",
      status: "verified",
      statusLabel: "Ready",
      verifiedBy: "Licensed Architect Stamp",
      requirementRef: ["mpcb-cte"],
      notes: "Premises drawing illustrates operational zones and exits.",
    },
    {
      id: "doc-7",
      name: "Machinery_and_Power_Load_Schedule.pdf",
      category: "Technical & Engineering",
      docType: "Machinery Inventory",
      size: "1.2 MB",
      uploadedAt: "2024-03-18",
      status: "action_required",
      statusLabel: "Needs Review",
      verifiedBy: "Awaiting Technical Endorsement",
      requirementRef: ["mpcb-cte"],
      notes: `Requires certified electrical load breakdown for ${hp} HP sanction.`,
    },
    {
      id: "doc-8",
      name: "Signboard_Marathi_Devanagari_Frontage.jpg",
      category: "Premises & Land",
      docType: "Photographic Evidence",
      size: "2.1 MB",
      uploadedAt: "2024-03-21",
      status: "action_required",
      statusLabel: "Needs Review",
      verifiedBy: "Pending Signboard Verification",
      requirementRef: ["gumasta-license"],
      notes: "Frontage photo must clearly display Marathi lettering equal or larger than other languages.",
    },
  ];

  // 5. Dynamic Compliance Tasks
  complianceTasks = [
    {
      id: "comp-ptax",
      title: "Maharashtra Professional Tax (P-Tax) Return & Remittance",
      frequency: "Monthly",
      dueDate: "2024-04-30",
      authority: "Maharashtra State Tax Department",
      status: "Upcoming",
      urgency: "Due in 11 Days",
      category: "State Taxation",
      description: `Monthly deposit of deducted professional tax for ${workforce} employees under Maharashtra State Tax on Professions Act.`,
      penaltyRisk: "Monthly interest and delay penalty under statutory rules.",
      filingPortal: "https://mahagst.gov.in",
    },
    {
      id: "comp-gst",
      title: "GST Monthly Return Filing (GSTR-3B)",
      frequency: "Monthly",
      dueDate: "2024-04-20",
      authority: "GSTN / Maharashtra GST",
      status: "Completed",
      urgency: "Filed On-Time",
      category: "Indirect Tax",
      description: "Summary return of outward supplies and input tax credit claimed for the preceding month.",
      penaltyRisk: "Late fee per day plus interest on net tax liability.",
      filingPortal: "https://gst.gov.in",
    },
    {
      id: "comp-factories",
      title: "Factories Act / Annual Labour Return (Form 27)",
      frequency: "Annual",
      dueDate: "2025-02-01",
      authority: "DISH Maharashtra",
      status: "Scheduled",
      urgency: "Scheduled for Q4",
      category: "Labor & Safety",
      description: `Annual employment, working hours, and industrial health summary for ${district} establishment.`,
      penaltyRisk: "Statutory fine under Section 92 of Factories Act.",
      filingPortal: "https://dish.maharashtra.gov.in",
    },
  ];

  if (isMfgOrProcessing) {
    complianceTasks.unshift({
      id: "comp-env",
      title: "MPCB Environmental Statement (Form V)",
      frequency: "Annual",
      dueDate: "2024-09-30",
      authority: "Maharashtra Pollution Control Board",
      status: "Scheduled",
      urgency: "Upcoming in Q3",
      category: "Environment",
      description: "Annual submission of raw materials consumed, water consumption, and pollution loads generated.",
      penaltyRisk: "Notice from regional officer and condition review.",
      filingPortal: "https://mpcb.gov.in",
    });
  }

  if (sector === "Food Processing") {
    complianceTasks.unshift({
      id: "comp-fssai-d1",
      title: "FSSAI Annual Return Filing (Form D-1)",
      frequency: "Annual",
      dueDate: "2024-05-31",
      authority: "FSSAI / FoSCoS",
      status: "Upcoming",
      urgency: "Due in 42 Days",
      category: "Food Safety",
      description: "Statutory declaration of food products manufactured, handled, or distributed during financial year.",
      penaltyRisk: "Standard delay fee per day under licensing regulations.",
      filingPortal: "https://foscos.fssai.gov.in",
    });
  }

  // 6. Dynamic Government Support (Realistic, Non-Guaranteed, Transparent)
  governmentSupport.push({
    id: "scheme-psi-2019",
    title: `Maharashtra Package Scheme of Incentives (PSI) 2019`,
    authority: "Directorate of Industries, Government of Maharashtra",
    tier: `State Industrial Policy (${district} Classification)`,
    statusLabel: "Potentially Relevant",
    eligibilityNotice: "Eligibility to Check",
    summary: `Framework intended to promote industrial investment in Maharashtra. Units in ${district} may explore capital subsidies, electricity duty exemptions, and interest subvention for eligible ${size} enterprises in ${sector}.`,
    keyBenefits: [
      `Capital Investment Subsidy (subject to industrial zone criteria and capital outlay).`,
      `Electricity Duty Exemption for eligible operational tenure.`,
      `Interest subvention on term loans through scheduled commercial banks.`,
      `State GST reimbursement mechanism under prevailing industrial policy guidelines.`,
    ],
    eligibilityChecklist: [
      { item: `Located in ${district} Industrial Cluster`, met: true },
      { item: `${sector} activity aligned with eligible industrial schedules`, met: true },
      { item: `Valid Udyam Registration (${size} Enterprise)`, met: true },
      { item: "Commercial production timeline criteria met", met: false },
    ],
    officialPortalUrl: "https://di.maharashtra.gov.in",
    portalName: "MAITRI Single Window",
    nextStepNote: "Review full eligibility terms and guidelines on official MAITRI portal.",
  });

  if (sector === "Food Processing" || sector === "Agriculture / Agro-processing") {
    governmentSupport.push({
      id: "scheme-pmfme",
      title: "PM Formalisation of Micro Food Processing Enterprises (PMFME) Scheme",
      authority: "Ministry of Food Processing Industries (MoFPI) / Maharashtra Agriculture Dept",
      tier: "Centrally Sponsored Scheme (Aatmanirbhar Bharat)",
      statusLabel: "Potentially Relevant",
      eligibilityNotice: "Eligibility to Check",
      summary: `Assistance for micro and small food processing enterprises, aligned with the One District One Product (ODOP) focus for ${district}.`,
      keyBenefits: [
        "Credit-linked capital subsidy for eligible machinery up-gradation.",
        "Cluster branding and packaging standardization assistance.",
        "Technical training support through national research institutes.",
      ],
      eligibilityChecklist: [
        { item: `Enterprise located in ${district}`, met: true },
        { item: "Product line aligned with designated district food cluster", met: true },
        { item: "Bank loan sanction letter from participating financial institution", met: false },
      ],
      officialPortalUrl: "https://pmfme.mofpi.gov.in",
      portalName: "MoFPI National Portal",
      nextStepNote: "Apply through designated bank branches or district resource persons.",
    });
  } else if (sector === "IT / Software") {
    governmentSupport.push({
      id: "scheme-it-policy",
      title: "Maharashtra IT & ITeS Policy 2023 - Emerging Tech Support",
      authority: "Directorate of Industries, Govt of Maharashtra",
      tier: "State IT/ITeS Policy",
      statusLabel: "Potentially Relevant",
      eligibilityNotice: "Eligibility to Check",
      summary: `Incentives framework for registered IT, cloud, and software service units in Maharashtra. Includes stamp duty exemptions and power tariff provisions.`,
      keyBenefits: [
        "Stamp Duty Exemption on office lease or property purchase in designated IT areas.",
        "Electricity provision at industrial rates rather than commercial tariff.",
        "Assistance for patent filings for proprietary technological solutions.",
      ],
      eligibilityChecklist: [
        { item: `Registered IT/ITeS unit operating in ${district}`, met: true },
        { item: "Primary business activity registered under software/ITeS NIC code", met: true },
        { item: "Valid Udyam MSME Certificate", met: true },
      ],
      officialPortalUrl: "https://di.maharashtra.gov.in",
      portalName: "MAITRI IT Window",
      nextStepNote: "Submit intimation via MAITRI single window within prescribed window.",
    });
  } else if (sector === "Textiles") {
    governmentSupport.push({
      id: "scheme-textile-policy",
      title: "Maharashtra Integrated Textile Policy 2023-28",
      authority: "Directorate of Textiles, Govt of Maharashtra",
      tier: "State Textile Policy",
      statusLabel: "Potentially Relevant",
      eligibilityNotice: "Eligibility to Check",
      summary: `Incentive structure for modern textile machinery, spinning, weaving, and processing units in Maharashtra.`,
      keyBenefits: [
        "Capital subsidy on recognized new technology machinery.",
        "Power tariff concessions for eligible textile units.",
        "Common effluent treatment facility assistance in textile clusters.",
      ],
      eligibilityChecklist: [
        { item: `Textile manufacturing facility in ${district}`, met: true },
        { item: "Plant machinery compliant with recognized technology list", met: true },
        { item: "Pollution clearance from MPCB attached", met: false },
      ],
      officialPortalUrl: "https://di.maharashtra.gov.in",
      portalName: "Maharashtra Textiles Directorate",
      nextStepNote: "Verify detailed project report requirements with District Textile Office.",
    });
  }

  governmentSupport.push({
    id: "scheme-cgtmse",
    title: "Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)",
    authority: "Ministry of MSME & SIDBI",
    tier: "National Credit Support Scheme",
    statusLabel: "Potentially Relevant",
    eligibilityNotice: "Eligibility to Check",
    summary: `Credit guarantee mechanism for ${size} enterprises seeking working capital or term debt without requiring third-party collateral or mortgage.`,
    keyBenefits: [
      "Credit guarantee coverage on eligible term loan facilities.",
      "Available through public and private scheduled commercial banks.",
      "Helps early-stage enterprises establish formal bank lending track records.",
    ],
    eligibilityChecklist: [
      { item: "Valid Udyam Registration Certificate", met: true },
      { item: "Commercial appraisal and clean credit standing with lending bank", met: true },
    ],
    officialPortalUrl: "https://www.cgtmse.in",
    portalName: "CGTMSE Official Portal",
    nextStepNote: "Apply directly through partner lending banks during term loan appraisal.",
  });

  // 7. Computed 3-Question Framework
  const readyDocsCount = documents.filter((d) => d.status === "verified").length;
  const reviewDocsCount = documents.filter((d) => d.status === "action_required").length;
  const upcomingComplianceCount = complianceTasks.filter((t) => t.status === "Upcoming" || t.status === "Action Required").length;

  const primaryNextAction = {
    title: `Upload ${documents.find((d) => d.status === "action_required")?.docType || "Pending Document"}`,
    description: `To proceed with your ${requirements[0]?.title || "Approvals"} preparation, resolve the pending document in your workspace.`,
    targetUrl: "/documents",
    ctaText: "Go to Documents Workspace",
  };

  return {
    requirements,
    documents,
    complianceTasks,
    governmentSupport,
    metrics: {
      applicableRequirementsCount: requirements.length,
      documentsReadyCount: readyDocsCount,
      documentsReviewCount: reviewDocsCount,
      complianceUpcomingCount: upcomingComplianceCount,
      supportRelevantCount: governmentSupport.length,
    },
    primaryNextAction,
  };
}
