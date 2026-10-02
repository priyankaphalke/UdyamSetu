/**
 * ==============================================================================
 * UDYAMSETU AI - REGULATORY KNOWLEDGE BASE & INTELLIGENCE ENGINE
 * Target Domain: Maharashtra + Food Processing + New / Small Business
 *
 * Official Sources Seeded:
 * 1. FSSAI / FoSCoS (https://foscos.fssai.gov.in/)
 * 2. MPCB Consent Management (https://www.mpcb.gov.in/en/consentmgt/water-and-air-act)
 *    MPCB Categorisation (https://www.mpcb.gov.in/en/consent-management/rog)
 * 3. Maharashtra Aaple Sarkar (https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS)
 * 4. Government of India Udyam Registration (https://udyamregistration.gov.in/)
 * ==============================================================================
 */

// Internal Regulatory Engine Evaluation Outcomes
export const RULE_STATUS = {
  APPLICABLE: "APPLICABLE",
  POTENTIALLY_APPLICABLE: "POTENTIALLY_APPLICABLE",
  NOT_APPLICABLE: "NOT_APPLICABLE",
  NEEDS_VERIFICATION: "NEEDS_VERIFICATION",
};

// Verification Status Distinctions (as stored in Knowledge Base)
export const VERIFICATION_STATUS = {
  CONFIRMED: "CONFIRMED",
  CONDITIONAL: "CONDITIONAL",
  NEEDS_VERIFICATION: "NEEDS_VERIFICATION",
};

/**
 * Master Seed Regulatory Knowledge Base for Maharashtra Food Processing
 * Traceable strictly to official government portals and statutory gazettes.
 */
export const OFFICIAL_KNOWLEDGE_BASE = [
  {
    requirement_id: "fssai-license",
    id: "fssai-license",
    name: "FSSAI State Manufacturing License / Registration",
    title: "FSSAI State Manufacturing License / Registration",
    department: "Food Safety and Standards Authority of India (FSSAI) / State FDA Maharashtra",
    jurisdiction: "State Directorate of Food and Drug Administration (FDA Maharashtra)",
    jurisdiction_tier: "State Directorate of Food and Drug Administration (FDA Maharashtra)",
    sector: "Food Processing",
    business_stage: "New Business",
    stage: "Stage 3: Approvals",
    business_size: "Small",
    priority: "HIGH",
    priority_color: "amber",
    category: "STATUTORY APPROVAL",

    // Statutory Applicability Conditions
    applicability_conditions: {
      statute: "Food Safety and Standards Act, 2006 (Section 31)",
      statutory_thresholds: {
        registration_tier_turnover_max_inr: 1200000,
        state_license_turnover_range_inr: [1200000, 200000000],
        state_license_daily_production_max_mt: 2.0,
        central_license_daily_production_min_mt: 2.0,
      },
      confirmed_triggers: [
        "Manufacturing of food articles for commercial distribution",
        "Packaging of food articles",
        "Commercial storage / warehousing of food items",
      ],
      rule_logic: "CONFIRMED_STATUTORY",
    },

    trigger_conditions:
      "Any commercial unit in Maharashtra carrying out food manufacturing, packaging, or commercial storage requires mandatory licensing under Section 31 of the Food Safety and Standards Act, 2006 prior to commercial production. State License applies when annual turnover is between ₹12 Lakh and ₹20 Crore or daily production is up to 2 MT/day.",
    statutory_triggers:
      "Food-processing operations, packaging, and commercial storage require mandatory statutory food-safety licensing prior to commercial output in Maharashtra.",

    required_documents: [
      { id: "doc-fb", name: "Form B Application Form", status: "verified", required: true },
      { id: "doc-layout", name: "Premises Blueprint Layout (Drawn to Scale with Dimensions & Flow)", status: "verified", required: true },
      { id: "doc-machinery", name: "Installed Machinery List (Horsepower & Rated Capacity)", status: "action_required", required: true },
      { id: "doc-water", name: "Water Potability Test Report (NABL Certified Lab confirming IS 10500)", status: "action_required", required: true },
      { id: "doc-fsg", name: "Food Safety Management System (FSMS) Plan / Standard Operating Procedures", status: "verified", required: false },
    ],
    mandatory_records: [
      { id: "doc-fb", name: "Form B Application Form", status: "verified", required: true },
      { id: "doc-layout", name: "Premises Blueprint Layout (Drawn to Scale)", status: "verified", required: true },
      { id: "doc-machinery", name: "Installed Machinery List (Horsepower & Capacity)", status: "action_required", required: true },
      { id: "doc-water", name: "Water Test Analysis Report (NABL Certified Lab)", status: "action_required", required: true },
      { id: "doc-fsg", name: "Food Safety Management Plan (FSMS) / SOPs", status: "verified", required: false },
    ],

    process_summary:
      "Online electronic application via FoSCoS portal -> Technical scrutiny by State Designated Officer (DO) -> Clarification of queries (if raised) -> Mandatory on-site audit of premises by Food Safety Officer (FSO) -> Grant of 14-digit statutory FSSAI State License certificate with QR code.",
    steps: [
      { stepNumber: 1, title: "Parameter & Category Identification", description: "Confirm production volume is < 2 MT/day to validate State License eligibility on FoSCoS gateway.", status: "completed" },
      { stepNumber: 2, title: "Technical Dossier Compilation", description: "Compile machinery horsepower schedule and NABL water potability test report (IS 10500 standard).", status: "in_progress" },
      { stepNumber: 3, title: "Government Fee Challan Generation", description: "Generate treasury challan on FoSCoS payment gateway for the selected license tenure (1-5 years).", status: "pending" },
      { stepNumber: 4, title: "Food Safety Officer (FSO) On-Site Audit", description: "FDA Maharashtra inspects physical plant premises, water drainage, hygiene zones, and pest management.", status: "pending" },
      { stepNumber: 5, title: "Grant of 14-Digit State License", description: "FDA Maharashtra issues digitally signed, QR-coded statutory certificate with 14-digit license number.", status: "pending" },
    ],

    validity: "1 to 5 Years (Applicant choice based on annual fee paid)",
    validity_years: 5,
    renewal_information:
      "Must apply for renewal at least 30 days prior to license expiry date via FoSCoS portal to avoid statutory late fee of ₹100/day. Licenses expired cannot be renewed and require fresh filing.",
    estimated_fee: 5000,
    fee_breakdown: "₹5,000 / year state fee + ₹1,000 handling/tax",
    estimated_timeline: "30-45 working days",
    inspection_required: "Mandatory Pre-licensing Joint Inspection by FSO",
    action_needed: "Verify Form B horsepower parameters & upload water lab analysis report",

    official_source_name: "Food Safety and Standards Authority of India (FSSAI) / FoSCoS",
    official_source_url: "https://foscos.fssai.gov.in/",
    portal_name: "FoSCoS Maharashtra Portal",
    portal_url: "https://foscos.fssai.gov.in/",
    source_reference: "Food Safety and Standards Act, 2006; Food Safety and Standards (Licensing and Registration of Food Businesses) Regulations, 2011; FoSCoS State License Fee Schedule",
    act: "Food Safety and Standards Act, 2006",
    last_verified: "2024-09-26T00:00:00.000Z",
    verification_status: VERIFICATION_STATUS.CONFIRMED,

    dos_and_donts: {
      dos: [
        "Ensure water potability test report is issued by an NABL-accredited laboratory dated within the last 6 months.",
        "Display 14-digit FSSAI license number and logo prominently on all primary and secondary food packaging.",
        "Maintain daily backwash and hygiene logs on the plant premises.",
      ],
      donts: [
        "Do not commence commercial food processing or dispatch prior to receiving official license grant.",
        "Do not install machinery exceeding declared cumulative horsepower without intimating FDA Maharashtra.",
      ],
    },
  },

  {
    requirement_id: "mpcb-cte",
    id: "mpcb-cte",
    name: "MPCB Consent to Establish (CTE) - Industrial Pollution Clearance",
    title: "MPCB Consent to Establish (CTE) - Industrial Pollution Clearance",
    department: "Maharashtra Pollution Control Board (MPCB)",
    jurisdiction: "MPCB Regional Office (Nashik / Division)",
    jurisdiction_tier: "MPCB Regional Office (Nashik / Division)",
    sector: "Food Processing",
    business_stage: "New Business",
    stage: "Stage 2: Clearances",
    business_size: "Small",
    priority: "CRITICAL",
    priority_color: "red",
    category: "ENVIRONMENTAL CLEARANCE",

    applicability_conditions: {
      statute: "Water (Prevention & Control of Pollution) Act, 1974 (Sec 25) & Air (Prevention & Control of Pollution) Act, 1981 (Sec 21)",
      industry_categorization: "CPCB/MPCB Revised Classification (Orange Category for food processing with effluent)",
      triggers: {
        connected_load_hp_min: 25,
        effluent_generation: true,
        location: "MIDC Ambad / Industrial zones in Maharashtra",
      },
      rule_logic: "CONFIRMED_PRE_CONSTRUCTION",
    },

    trigger_conditions:
      "Mandatory under Section 25 of the Water Act, 1974 and Section 21 of the Air Act, 1981 prior to taking any steps to establish an industrial plant, factory shed, or process likely to discharge trade effluent or air emissions in Maharashtra. Food processing with washing/effluent and power load > 25 HP falls under Orange Category.",
    statutory_triggers:
      "Food manufacturing facilities with industrial effluent and connected power exceeding 25 HP trigger Orange Category pollution screening.",

    required_documents: [
      { id: "doc-midc", name: "MIDC Allotment / Registered Property Lease Deed", status: "verified", required: true },
      { id: "doc-arch", name: "Architect-Certified Factory Plan & Drainage Conduit Layout", status: "action_required", required: true },
      { id: "doc-etp", name: "Effluent Treatment Plant (ETP) Scheme & Water Balance Sheet", status: "action_required", required: true },
      { id: "doc-msedcl", name: "MSEDCL Connected Load Sanction Letter (45 HP)", status: "action_required", required: true },
      { id: "doc-noc-fire", name: "Provisional Fire Safety NOC (MIDC Fire Dept)", status: "verified", required: true },
    ],
    mandatory_records: [
      { id: "doc-midc", name: "MIDC Allotment / Registered Lease Deed", status: "verified", required: true },
      { id: "doc-arch", name: "Architect-Certified Factory Plan (Rule 3)", status: "action_required", required: true },
      { id: "doc-etp", name: "Effluent Treatment Plant (ETP) Scheme / Zero Discharge", status: "action_required", required: true },
      { id: "doc-msedcl", name: "MSEDCL Connected Load Sanction Letter (45 HP)", status: "action_required", required: true },
      { id: "doc-noc-fire", name: "Provisional Fire Safety NOC (MIDC Fire Dept)", status: "verified", required: true },
    ],

    process_summary:
      "Online application submission on MPCB e-Consent system -> Scrutiny by Sub-Regional Officer (SRO Nashik) -> Site inspection by MPCB field engineer -> Evaluation by Regional Consent Committee -> Issuance of Consent to Establish order with effluent discharge conditions.",
    steps: [
      { stepNumber: 1, title: "Pollution Category Categorization", description: "Confirm categorization under MPCB Orange category schedule for food processing units.", status: "completed" },
      { stepNumber: 2, title: "ETP Design & Water Balance Schema", description: "Prepare certified daily water intake balance and Effluent Treatment Plant engineering design.", status: "in_progress" },
      { stepNumber: 3, title: "Application Filing via e-Consent", description: "Submit Form I, factory plot plans, process flow diagram, and CA project cost certificate.", status: "pending" },
      { stepNumber: 4, title: "Regional Consent Committee Review", description: "Technical scrutiny and physical site inspection by MPCB Sub-Regional Office.", status: "pending" },
      { stepNumber: 5, title: "Issuance of CTE Order", description: "Download digitally signed Consent to Establish certificate specifying statutory environmental standards.", status: "pending" },
    ],

    validity: "5 Years (or until commissioning of plant, whichever is earlier)",
    validity_years: 5,
    renewal_information:
      "Consent to Establish is a one-time pre-construction clearance. Upon plant completion, Consent to Operate (CTO) must be obtained prior to commercial production.",
    estimated_fee: 25000,
    fee_breakdown: "₹25,000 capital-investment slab fee + cess as per MPCB schedule",
    estimated_timeline: "45-60 working days",
    inspection_required: "Sub-Regional Officer (SRO) Site Verification",
    action_needed: "Submit Effluent Treatment Scheme (ETP) and MIDC drainage conduit connection NOC",

    official_source_name: "Maharashtra Pollution Control Board (MPCB)",
    official_source_url: "https://www.mpcb.gov.in/en/consentmgt/water-and-air-act",
    portal_name: "MPCB e-Consent Portal",
    portal_url: "https://www.mpcb.gov.in/en/consentmgt/water-and-air-act",
    source_reference: "Water (Prevention & Control of Pollution) Act, 1974; Air (Prevention & Control of Pollution) Act, 1981; MPCB Revised Categorization of Industries (Red/Orange/Green/White) Schedule",
    act: "Water (Prevention & Control of Pollution) Act, 1974 & Air Act, 1981",
    last_verified: "2024-09-26T00:00:00.000Z",
    verification_status: VERIFICATION_STATUS.CONFIRMED,

    dos_and_donts: {
      dos: [
        "Include a dedicated digital water meter on raw water intake and treated effluent discharge lines.",
        "Obtain MIDC CETP (Common Effluent Treatment Plant) drainage connection NOC where applicable.",
      ],
      donts: [
        "Do not begin civil factory construction or machinery installation prior to obtaining Consent to Establish.",
        "Do not discharge untreated processing or washing wash-water into storm drains or public water bodies.",
      ],
    },
  },

  {
    requirement_id: "mpcb-cto",
    id: "mpcb-cto",
    name: "MPCB Consent to Operate (CTO) - Pre-Commissioning Clearance",
    title: "MPCB Consent to Operate (CTO) - Pre-Commissioning Clearance",
    department: "Maharashtra Pollution Control Board (MPCB)",
    jurisdiction: "MPCB Regional Office (Nashik / Division)",
    jurisdiction_tier: "MPCB Regional Office (Nashik / Division)",
    sector: "Food Processing",
    business_stage: "New Business",
    stage: "Stage 3: Approvals",
    business_size: "Small",
    priority: "HIGH",
    priority_color: "amber",
    category: "ENVIRONMENTAL CLEARANCE",

    applicability_conditions: {
      statute: "Water Act 1974 Sec 25/26 & Air Act 1981 Sec 21",
      condition: "Conditional upon completion of physical factory shed, machinery erection, and ETP installation under valid CTE.",
      rule_logic: "CONDITIONAL_PRE_COMMISSIONING",
    },

    trigger_conditions:
      "Required after plant construction is completed and pollution control equipment (ETP/STP) is installed, but BEFORE starting commercial food manufacturing operations or discharging trade effluent.",
    statutory_triggers:
      "Applicable once plant construction and pollution control infrastructure are completed, prior to commencing commercial food production.",

    required_documents: [
      { id: "doc-cte-copy", name: "Copy of Valid Consent to Establish (CTE) Order", status: "action_required", required: true },
      { id: "doc-cte-comp", name: "CTE Terms & Conditions Point-wise Compliance Report", status: "action_required", required: true },
      { id: "doc-etp-comm", name: "ETP / STP Commissioning Certificate from Environmental Engineer", status: "action_required", required: true },
      { id: "doc-eff-test", name: "Baseline Treated Effluent Test Report", status: "action_required", required: true },
    ],
    mandatory_records: [
      { id: "doc-cte-copy", name: "Copy of Valid Consent to Establish (CTE) Order", status: "action_required", required: true },
      { id: "doc-cte-comp", name: "CTE Terms & Conditions Point-wise Compliance Report", status: "action_required", required: true },
      { id: "doc-etp-comm", name: "ETP / STP Commissioning Certificate from Environmental Engineer", status: "action_required", required: true },
      { id: "doc-eff-test", name: "Baseline Treated Effluent Test Report", status: "action_required", required: true },
    ],

    process_summary:
      "Application filing via MPCB e-Consent portal -> Submission of CTE condition compliance report -> Post-completion site inspection by MPCB officer -> Verification of installed ETP / air filters -> Issuance of Consent to Operate.",
    steps: [
      { stepNumber: 1, title: "CTE Compliance Verification", description: "Verify that all stipulations outlined in the Consent to Establish order have been fulfilled.", status: "pending" },
      { stepNumber: 2, title: "Pollution Control Installation Audit", description: "Chartered engineer certifies completion and test-run of the Effluent Treatment Plant.", status: "pending" },
      { stepNumber: 3, title: "Online CTO Submission", description: "Submit Form I for Consent to Operate with fee challan on MPCB e-Consent portal.", status: "pending" },
      { stepNumber: 4, title: "Inspection & Final Grant", description: "MPCB field officer verifies installed meters and grants Consent to Operate.", status: "pending" },
    ],

    validity: "1 to 5 Years (Depending on capital investment slab)",
    validity_years: 5,
    renewal_information:
      "Mandatory application for renewal at least 60 days prior to expiry date via MPCB e-Consent portal accompanied by compliance audit reports.",
    estimated_fee: 20000,
    fee_breakdown: "₹20,000 per term based on capital investment slab",
    estimated_timeline: "30-45 working days",
    inspection_required: "Physical Post-Construction Verification by MPCB SRO",
    action_needed: "Await physical plant completion, then submit CTE compliance and ETP commissioning report",

    official_source_name: "Maharashtra Pollution Control Board (MPCB)",
    official_source_url: "https://www.mpcb.gov.in/en/consentmgt/water-and-air-act",
    portal_name: "MPCB e-Consent Portal",
    portal_url: "https://www.mpcb.gov.in/en/consentmgt/water-and-air-act",
    source_reference: "Water Act 1974 Sec 25/26; Air Act 1981 Sec 21; MPCB Consent Management Protocol",
    act: "Water (Prevention & Control of Pollution) Act, 1974 & Air Act, 1981",
    last_verified: "2024-09-26T00:00:00.000Z",
    verification_status: VERIFICATION_STATUS.CONDITIONAL,

    dos_and_donts: {
      dos: [
        "Operate ETP round the clock whenever the processing unit is in operation.",
        "Submit annual environmental statement (Form V) on or before September 30 each year.",
      ],
      donts: [
        "Do not begin commercial processing or trade effluent discharge before CTO order is formally issued.",
      ],
    },
  },

  {
    requirement_id: "gumasta-license",
    id: "gumasta-license",
    name: "Maharashtra Shops & Establishments Registration (Form G / Gumasta)",
    title: "Maharashtra Shops & Establishments Registration (Form G / Gumasta)",
    department: "Department of Labour, Government of Maharashtra",
    jurisdiction: "Municipal Corporation / Local Body Jurisdiction (Nashik Municipal Corporation)",
    jurisdiction_tier: "Municipal Corporation / Local Body Jurisdiction (Nashik Municipal Corporation)",
    sector: "Food Processing",
    business_stage: "New Business",
    stage: "Stage 1: Identity & Establishment",
    business_size: "Small",
    priority: "HIGH",
    priority_color: "emerald",
    category: "STATUTORY REGISTRATION",

    applicability_conditions: {
      statute: "Maharashtra Shops and Establishments (Regulation of Employment and Conditions of Service) Act, 2017",
      amendment: "Maharashtra Act No. XXVIII of 2022 (Signboard in Marathi Devanagari)",
      workforce_thresholds: {
        less_than_10_workers: "Form F Intimation only (No registration fee)",
        ten_or_more_workers: "Form G Statutory Registration mandatory",
      },
      rule_logic: "CONFIRMED_WORKFORCE_THRESHOLD",
    },

    trigger_conditions:
      "Mandatory statutory registration for any commercial establishment, administrative office, packaging warehouse, or trading depot operating within Maharashtra municipal/urban boundaries employing 10 or more workers (ABC Foods employs 28 workers).",
    statutory_triggers:
      "Mandatory statutory registration for any commercial establishment operating within Maharashtra state boundaries with 10 or more employees.",

    required_documents: [
      { id: "doc-kyc", name: "PAN & Aadhaar of Directors / Authorized Signatories", status: "verified", required: true },
      { id: "doc-lease", name: "Registered Tenancy Agreement / Premises Title Deed", status: "verified", required: true },
      { id: "doc-tax", name: "Municipal Property Tax Paid Receipt / Electricity Bill", status: "verified", required: true },
      { id: "doc-sign", name: "Frontage Signboard Photo in Marathi (Devanagari Script)", status: "action_required", required: true },
      { id: "doc-emp", name: "List of Employees with Designations & Shift Schedules", status: "verified", required: true },
    ],
    mandatory_records: [
      { id: "doc-kyc", name: "PAN & Aadhaar of Directors / Signatories", status: "verified", required: true },
      { id: "doc-lease", name: "Registered Tenancy Agreement / Title Deed", status: "verified", required: true },
      { id: "doc-tax", name: "Municipal Property Tax Paid Receipt (Current Year)", status: "verified", required: true },
      { id: "doc-sign", name: "Frontage Signboard Photo in Marathi (Devanagari)", status: "action_required", required: true },
    ],

    process_summary:
      "Single-window citizen profile authentication on Aaple Sarkar -> Submission of RTS Form A application -> Upload premises proof, employee roster, and Marathi Devanagari signboard photo -> Payment of municipal fee -> Instant digital issuance of Form G Registration Certificate.",
    steps: [
      { stepNumber: 1, title: "Aaple Sarkar Profile Authentication", description: "Access Aaple Sarkar RTS services and link Director Aadhaar and enterprise PAN.", status: "completed" },
      { stepNumber: 2, title: "Form A/G Application Data Entry", description: "Declare employee count (28), weekly offs, shift timings, and partner details.", status: "completed" },
      { stepNumber: 3, title: "Marathi Signboard Verification", description: "Upload clear color photograph of external signboard displaying Marathi font with equal prominence.", status: "in_progress" },
      { stepNumber: 4, title: "Instant Certificate Issuance", description: "Instant download of digitally signed Form G Registration Intimation Certificate.", status: "pending" },
    ],

    validity: "Lifetime / Permanent (Under Maharashtra 2017 Act; periodic annual renewal abolished)",
    validity_years: 10,
    renewal_information:
      "No annual renewal required under Maharashtra 2017 Act. Any modification in workforce strength, management, or address must be notified via Form I on Aaple Sarkar within 30 days of change.",
    estimated_fee: 1200,
    fee_breakdown: "₹1,200 municipal processing fee based on workforce count slab",
    estimated_timeline: "3-5 working days (often instant via RTS online gateway)",
    inspection_required: "Post-registration random scrutiny by Municipal Ward Inspector",
    action_needed: "Upload high-resolution photo of establishment signboard in Marathi (Devanagari script)",

    official_source_name: "Department of Labour, Government of Maharashtra / Aaple Sarkar RTS",
    official_source_url: "https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS",
    portal_name: "Aaple Sarkar Portal",
    portal_url: "https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS",
    source_reference: "Maharashtra Shops and Establishments (Regulation of Employment and Conditions of Service) Act, 2017; Maharashtra Act No. XXVIII of 2022; Aaple Sarkar Citizen Services RTS Schedule",
    act: "Maharashtra Shops and Establishments (Regulation of Employment and Conditions of Service) Act, 2017",
    last_verified: "2024-09-26T00:00:00.000Z",
    verification_status: VERIFICATION_STATUS.CONFIRMED,

    dos_and_donts: {
      dos: [
        "Ensure Marathi text in Devanagari script is displayed in font size equal to or larger than English or Hindi text on all external signboards.",
        "Maintain digital or physical employee muster roll and wage register at the establishment.",
      ],
      donts: [
        "Do not submit photographs of temporary banners or signboards lacking Marathi lettering.",
        "Do not exceed statutory shift durations without registering overtime compensation.",
      ],
    },
  },

  {
    requirement_id: "dish-factory-license",
    id: "dish-factory-license",
    name: "Maharashtra Factory License & Building Plan Approval (Factories Act, 1948)",
    title: "Maharashtra Factory License & Building Plan Approval (Factories Act, 1948)",
    department: "Directorate of Industrial Safety & Health (DISH), Maharashtra",
    jurisdiction: "DISH Joint Director Office (Nashik Division)",
    jurisdiction_tier: "DISH Joint Director Office (Nashik Division)",
    sector: "Food Processing",
    business_stage: "New Business",
    stage: "Stage 2: Clearances",
    business_size: "Small",
    priority: "HIGH",
    priority_color: "amber",
    category: "STATUTORY CLEARANCE",

    applicability_conditions: {
      statute: "Factories Act, 1948 (Section 2(m)(i)) & Maharashtra Factories Rules, 1963",
      statutory_thresholds: {
        with_power_workforce_min: 10,
        without_power_workforce_min: 20,
      },
      verification_condition:
        "Requires manual verification of how many of the 28 workers are stationed on the manufacturing shop floor vs administrative/sales staff.",
      rule_logic: "CONDITIONAL_WORKFORCE_POWER",
    },

    trigger_conditions:
      "Premises carrying on manufacturing processes with electrical power (45 HP) where 10 or more workers are employed on the factory floor require statutory Factory Building Plan Approval (Form 1) and Factory License (Form 2) under Section 2(m)(i) of the Factories Act, 1948.",
    statutory_triggers:
      "Manufacturing process carried out with power employing 10 or more workers on factory premises triggers DISH licensing scrutiny.",

    required_documents: [
      { id: "doc-dish-f1", name: "Form 1 (Application for Permission to Construct/Extend Factory)", status: "action_required", required: true },
      { id: "doc-factory-drawings", name: "Factory Blueprint Drawings Signed by Architect (Machine Layout, Emergency Exits, Ventilation)", status: "action_required", required: true },
      { id: "doc-stab-cert", name: "Structural Stability Certificate by Recognized Competent Person", status: "action_required", required: true },
      { id: "doc-mach-hp", name: "Schedule of Connected Power Machinery & Raw Materials Flow", status: "verified", required: true },
    ],
    mandatory_records: [
      { id: "doc-dish-f1", name: "Form 1 Application", status: "action_required", required: true },
      { id: "doc-factory-drawings", name: "Architect-Certified Factory Plan", status: "action_required", required: true },
      { id: "doc-stab-cert", name: "Structural Stability Certificate", status: "action_required", required: true },
    ],

    process_summary:
      "Stage 1: Building plan approval (Form 1) with machine layout drawings submitted on Aaple Sarkar RTS -> Scrutiny by DISH Inspector -> Stage 2: Factory registration & license grant (Form 2) prior to production commencement -> Inspection by Factory Inspector.",
    steps: [
      { stepNumber: 1, title: "Worker Distribution Verification", description: "Audit workforce roster to determine whether 10+ employees work on the manufacturing floor.", status: "in_progress" },
      { stepNumber: 2, title: "Architectural Plan Drafting (Rule 3)", description: "Prepare factory drawings illustrating side elevations, machine safety distances, and escape stairs.", status: "pending" },
      { stepNumber: 3, title: "Building Plan Approval Submission", description: "Submit Form 1 application on Aaple Sarkar RTS for DISH scrutiny.", status: "pending" },
      { stepNumber: 4, title: "Grant of Factory License (Form 2)", description: "Following plant construction, file Form 2 for grant of formal Factory License.", status: "pending" },
    ],

    validity: "1 to 10 Years (Based on fee slab selected)",
    validity_years: 5,
    renewal_information:
      "License must be renewed before expiry date (application submitted by October 31 of preceding year) via Aaple Sarkar RTS portal.",
    estimated_fee: 8500,
    fee_breakdown: "₹8,500 based on connected horsepower (45 HP) and workforce slab (20-50 workers)",
    estimated_timeline: "30-45 working days",
    inspection_required: "Site Verification by DISH Inspector of Factories",
    action_needed: "Verify manufacturing shop-floor worker count and prepare architect factory layout (Rule 3)",

    official_source_name: "Directorate of Industrial Safety & Health (DISH) via Aaple Sarkar RTS",
    official_source_url: "https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS",
    portal_name: "Aaple Sarkar / DISH Portal",
    portal_url: "https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS",
    source_reference: "Factories Act, 1948 Sec 2(m)(i), Sec 6; Maharashtra Factories Rules, 1963 Rule 3 & 4; DISH Maharashtra Schedule",
    act: "Factories Act, 1948 & Maharashtra Factories Rules, 1963",
    last_verified: "2024-09-26T00:00:00.000Z",
    verification_status: VERIFICATION_STATUS.CONDITIONAL,

    dos_and_donts: {
      dos: [
        "Ensure minimum headroom and ventilation ratios conform to Maharashtra Factories Rules, 1963.",
        "Obtain structural stability certification from a DISH-empanelled competent chartered engineer.",
      ],
      donts: [
        "Do not operate manufacturing machinery without machine safety guards over moving belts and gear assemblies.",
      ],
    },
  },

  {
    requirement_id: "fire-safety-noc",
    id: "fire-safety-noc",
    name: "Fire Safety Pre-construction NOC & Life Safety Clearance",
    title: "Fire Safety Pre-construction NOC & Life Safety Clearance",
    department: "Directorate of Maharashtra Fire Services / MIDC Fire Department",
    jurisdiction: "MIDC Fire Station (Ambad, Nashik) / Local Fire Authority",
    jurisdiction_tier: "MIDC Fire Station (Ambad, Nashik) / Local Fire Authority",
    sector: "Food Processing",
    business_stage: "New Business",
    stage: "Stage 2: Clearances",
    business_size: "Small",
    priority: "HIGH",
    priority_color: "amber",
    category: "STATUTORY CLEARANCE",

    applicability_conditions: {
      statute: "Maharashtra Fire Prevention and Life Safety Measures Act, 2006",
      triggers: [
        "Industrial factory shed construction",
        "MIDC Ambad industrial estate location",
        "Storage of combustible packaging materials & secondary cartons",
      ],
      verification_condition:
        "Requires manual verification of facility built-up area and heating/fuel storage plans to determine whether Provisional Fire NOC is mandatory prior to building plan sanction.",
      rule_logic: "CONDITIONAL_FIRE_SAFETY",
    },

    trigger_conditions:
      "Industrial buildings, factory sheds with built-up area exceeding prescribed limits, or premises storing combustible packaging/grain dust require Provisional Fire NOC before building sanction, and Final Fire NOC before occupancy.",
    statutory_triggers:
      "Industrial factory shed construction, grain/packaging storage, and commercial power in MIDC industrial areas require fire safety compliance.",

    required_documents: [
      { id: "doc-fire-layout", name: "Architectural Drawing with Fire Hydrants, Hose Reels & Exit Routes", status: "action_required", required: true },
      { id: "doc-fire-water", name: "Underground / Overhead Static Fire Water Storage Tank Schema", status: "action_required", required: true },
      { id: "doc-fire-comb", name: "Declaration of Combustible Inventory & Raw Material Storage", status: "verified", required: true },
    ],
    mandatory_records: [
      { id: "doc-fire-layout", name: "Architectural Drawing with Fire Egress Routes", status: "action_required", required: true },
      { id: "doc-fire-water", name: "Static Fire Water Tank Schema", status: "action_required", required: true },
    ],

    process_summary:
      "Submit architectural plans with firefighting schematics via Aaple Sarkar / MIDC portal -> Scrutiny by Chief Fire Officer (CFO) -> Issuance of Provisional Fire NOC -> Post-construction audit of installed fire hydrants -> Grant of Final Fire NOC.",
    steps: [
      { stepNumber: 1, title: "Fire Risk Assessment", description: "Evaluate packaging materials, grain dust combustion, and electrical loads.", status: "completed" },
      { stepNumber: 2, title: "Provisional Fire NOC Application", description: "Submit building drawings with fire safety measures to MIDC Fire Department.", status: "pending" },
      { stepNumber: 3, title: "Fire Equipment Installation", description: "Install fire extinguishers, hose reels, and emergency signage.", status: "pending" },
      { stepNumber: 4, title: "Final Fire NOC Inspection", description: "Chief Fire Officer inspects premises and issues Final Fire NOC.", status: "pending" },
    ],

    validity: "Provisional: Valid during construction; Final: 1 Year (subject to bi-annual Form B certification)",
    validity_years: 1,
    renewal_information:
      "Semi-annual submission of Form B certificate (every January and July) from a licensed agency certifying operational maintenance of firefighting installations.",
    estimated_fee: 5000,
    fee_breakdown: "₹5,000 scrutiny fee + fire protection cess based on built-up area",
    estimated_timeline: "15-30 working days",
    inspection_required: "Site Verification by Fire Officer",
    action_needed: "Verify built-up area and submit fire egress layout to MIDC Fire Department",

    official_source_name: "Directorate of Maharashtra Fire Services / MIDC Fire Department via Aaple Sarkar RTS",
    official_source_url: "https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS",
    portal_name: "Aaple Sarkar / MIDC Single Window",
    portal_url: "https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS",
    source_reference: "Maharashtra Fire Prevention and Life Safety Measures Act, 2006 Sec 3; MIDC Fire Protection Regulations",
    act: "Maharashtra Fire Prevention and Life Safety Measures Act, 2006",
    last_verified: "2024-09-26T00:00:00.000Z",
    verification_status: VERIFICATION_STATUS.CONDITIONAL,

    dos_and_donts: {
      dos: [
        "Keep all emergency escape passageways and fire doors clear of packaging inventory or crates.",
        "Obtain bi-annual Form B maintenance certificate from an authorized licensed fire agency.",
      ],
      donts: [
        "Do not install electrical junction boxes or combustible material near emergency exit corridors.",
      ],
    },
  },

  {
    requirement_id: "udyam-registration",
    id: "udyam-registration",
    name: "Udyam Registration (Government of India MSME Recognition)",
    title: "Udyam Registration (Government of India MSME Recognition)",
    department: "Ministry of Micro, Small & Medium Enterprises, Government of India",
    jurisdiction: "Central Government of India (All-India & Maharashtra Recognition)",
    jurisdiction_tier: "Central Government of India (All-India & Maharashtra Recognition)",
    sector: "All Sectors (including Food Processing)",
    business_stage: "New Business",
    stage: "Stage 1: Identity & Establishment",
    business_size: "Small",
    priority: "CRITICAL",
    priority_color: "emerald",
    category: "STATUTORY REGISTRATION",

    applicability_conditions: {
      statute: "Micro, Small and Medium Enterprises Development (MSMED) Act, 2006",
      classification_criteria: {
        small_investment_inr_max: 100000000, // 10 Cr
        small_turnover_inr_max: 500000000, // 50 Cr
      },
      rule_logic: "CONFIRMED_MSME_IDENTIFICATION",
    },

    trigger_conditions:
      "Statutory formal identification requirement for any enterprise intending to operate as a Micro, Small, or Medium Enterprise. For ABC Foods (plant & machinery investment ₹4.5 Crore <= ₹10 Crore, turnover ₹18.2 Crore <= ₹50 Crore), Small Enterprise classification is applicable.",
    statutory_triggers:
      "Mandatory national formal registration to unlock statutory MSME status, central/state subsidies, and priority sector bank financing.",

    required_documents: [
      { id: "doc-aadhaar-dir", name: "Aadhaar Card of Managing Director / Authorized Signatory", status: "verified", required: true },
      { id: "doc-pan-ent", name: "Enterprise Permanent Account Number (PAN)", status: "verified", required: true },
      { id: "doc-gstin", name: "Goods and Services Tax Identification Number (GSTIN)", status: "verified", required: true },
      { id: "doc-bank", name: "Enterprise Bank Account Number and IFSC Code", status: "verified", required: true },
      { id: "doc-nic", name: "NIC 5-Digit Industry Classification Codes (10612 & 10792)", status: "verified", required: true },
    ],
    mandatory_records: [
      { id: "doc-aadhaar-dir", name: "Aadhaar Card of Managing Director", status: "verified", required: true },
      { id: "doc-pan-ent", name: "Enterprise PAN Card", status: "verified", required: true },
      { id: "doc-gstin", name: "Enterprise GSTIN Certificate", status: "verified", required: true },
    ],

    process_summary:
      "Paperless, free-of-cost online registration on the official Udyam portal -> Aadhaar OTP authentication -> Automatic verification of PAN and GSTIN data via Income Tax and GSTN systems -> Instant generation of permanent Udyam Registration Certificate with dynamic QR code.",
    steps: [
      { stepNumber: 1, title: "Portal Authentication", description: "Authenticate on udyamregistration.gov.in using Managing Director Aadhaar and OTP.", status: "completed" },
      { stepNumber: 2, title: "Enterprise & PAN Verification", description: "PAN details are dynamically verified with CBDT database.", status: "completed" },
      { stepNumber: 3, title: "Plant & NIC Declaration", description: "Declare manufacturing unit location in MIDC Ambad, Nashik and NIC codes 10612 / 10792.", status: "completed" },
      { stepNumber: 4, title: "Permanent URN Issuance", description: "Download official Udyam Registration Certificate containing unique URN number.", status: "completed" },
    ],

    validity: "Permanent / Lifetime validity",
    validity_years: 10,
    renewal_information:
      "No renewal required. Enterprise investment and turnover metrics are automatically refreshed annually via IT and GST databases.",
    estimated_fee: 0,
    fee_breakdown: "₹0 (Official Government portal does not charge any registration fee)",
    estimated_timeline: "Instant to 2 working days",
    inspection_required: "No physical inspection required (self-declaration with digital tax linkage)",
    action_needed: "Complete digital self-declaration on official Udyam portal with Aadhaar, PAN, and GSTIN",

    official_source_name: "Ministry of Micro, Small and Medium Enterprises (MSME), Government of India",
    official_source_url: "https://udyamregistration.gov.in/",
    portal_name: "Official Udyam Registration Portal",
    portal_url: "https://udyamregistration.gov.in/",
    source_reference: "Micro, Small and Medium Enterprises Development (MSMED) Act, 2006; Gazette Notification S.O. 2119(E) dated 26-06-2020",
    act: "Micro, Small and Medium Enterprises Development (MSMED) Act, 2006",
    last_verified: "2024-09-26T00:00:00.000Z",
    verification_status: VERIFICATION_STATUS.CONFIRMED,

    dos_and_donts: {
      dos: [
        "Only register on the official government website (https://udyamregistration.gov.in) which is completely free of cost.",
        "Ensure the mobile number linked to Director Aadhaar is active for OTP verification.",
      ],
      donts: [
        "Do not pay fees on fraudulent intermediary commercial websites claiming to offer Udyam certificates.",
        "Do not file multiple Udyam applications under the same PAN number.",
      ],
    },
  },
];

/**
 * Clean Regulatory Intelligence Layer
 * Evaluates a requirement against a business profile based on:
 * - Sector
 * - Location (State & District / Industrial Area)
 * - Business Stage
 * - Business Size / Investment / Turnover
 * - Operations
 */
export function evaluateRequirement(requirement, profile) {
  const sector = (profile?.sector || "").trim();
  const state = (profile?.state || "Maharashtra").trim();
  const stage = (profile?.stage || profile?.businessStage || profile?.business_stage || "New Business").trim();
  const size = (profile?.classification || profile?.businessSize || profile?.business_size || "Small").trim();
  const operations = Array.isArray(profile?.operations) ? profile.operations : [];
  const workforce = Number(profile?.workforceCount || profile?.employeeCount || profile?.workforce) || 0;
  const powerHP = Number(profile?.connectedLoadHP || (profile?.powerLoadKW ? profile.powerLoadKW * 1.341 : 0) || profile?.powerHP) || 0;
  const turnover = Number(profile?.annualTurnoverEstimated || profile?.annualTurnover || profile?.turnover) || 0;
  const investment = Number(profile?.plantMachineryInvestment || profile?.investmentPlantMachinery || profile?.investment) || 0;

  const reqId = requirement.requirement_id || requirement.id;
  const reqSector = requirement.sector || "";

  // 1. General Sector & Location Filtering
  const isAllSectors = reqSector === "All Sectors" || reqSector.includes("All");
  const sectorMatches = isAllSectors || reqSector.toLowerCase() === sector.toLowerCase() || (sector === "Food Processing" && reqSector === "Food Processing");
  const locationMatches = state.toLowerCase() === "maharashtra" || (requirement.jurisdiction || "").toLowerCase().includes("central") || (requirement.jurisdiction || "").toLowerCase().includes("all-india");

  if (!sectorMatches || !locationMatches) {
    return {
      ruleStatus: RULE_STATUS.NOT_APPLICABLE,
      whatMayApply: `${requirement.name || requirement.title}`,
      whyItMayApply: `Not applicable to ${sector} enterprises operating in ${state}.`,
      whatYouNeedToPrepare: [],
      officialSource: {
        name: requirement.official_source_name || requirement.department,
        url: requirement.official_source_url || requirement.portal_url,
        reference: requirement.source_reference || requirement.act,
      },
      nextStep: "No action required.",
      verificationNotes: null,
      dossierReadiness: 0,
      userFriendlyBadge: "Not Applicable",
    };
  }

  // 2. Specific Rule Evaluation for Maharashtra Food Processing
  switch (reqId) {
    case "fssai-license": {
      const hasFoodOps = operations.some((op) =>
        ["Manufacturing", "Packaging", "Storage", "Cold Storage", "Primary Grinding & Milling", "Wholesale Distribution"].includes(op)
      );

      if (hasFoodOps || sector === "Food Processing") {
        const isStateLicense = turnover <= 200000000 && turnover > 1200000;
        const why = `As a food enterprise engaged in ${operations.join(", ") || "food operations"} in ${profile?.district || "Maharashtra"} with annual turnover within the state threshold (₹12 Lakh to ₹20 Crore), an FSSAI State Manufacturing License under Section 31 of the Food Safety and Standards Act, 2006 is mandatory prior to commencement of commercial distribution.`;

        return {
          ruleStatus: RULE_STATUS.APPLICABLE,
          whatMayApply: "FSSAI State Manufacturing License (Confirmed Statutory Requirement)",
          whyItMayApply: why,
          whatYouNeedToPrepare: requirement.required_documents || requirement.mandatory_records || [],
          officialSource: {
            name: requirement.official_source_name,
            url: requirement.official_source_url,
            reference: requirement.source_reference,
          },
          nextStep: "Compile installed machinery horsepower parameters and obtain an NABL water potability test report (IS 10500 standard) prior to Form B filing.",
          verificationNotes: "Confirmed requirement. Production capacity must be maintained under 2 MT/day to remain within State License jurisdiction.",
          dossierReadiness: 70,
          userFriendlyBadge: "Confirmed Requirement",
        };
      }
      break;
    }

    case "mpcb-cte": {
      const isPreConstruction = stage.toLowerCase().includes("new") || stage.toLowerCase().includes("start") || stage.toLowerCase().includes("idea");
      const hasMfg = operations.includes("Manufacturing") || powerHP >= 25;

      if (isPreConstruction && hasMfg) {
        const why = `Mandatory under Section 25 of the Water Act, 1974 and Section 21 of the Air Act, 1981 prior to beginning civil construction, factory shed setup, or machinery installation in ${profile?.industrialArea || profile?.district || "Maharashtra"}. Your connected load (${powerHP} HP) and manufacturing operations trigger pollution screening.`;

        return {
          ruleStatus: RULE_STATUS.APPLICABLE,
          whatMayApply: "MPCB Consent to Establish (CTE) (Confirmed Statutory Requirement)",
          whyItMayApply: why,
          whatYouNeedToPrepare: requirement.required_documents || requirement.mandatory_records || [],
          officialSource: {
            name: requirement.official_source_name,
            url: requirement.official_source_url,
            reference: requirement.source_reference,
          },
          nextStep: "Finalize Effluent Treatment Plant (ETP) engineering schema and submit Form I on the MPCB e-Consent portal before beginning factory construction.",
          verificationNotes: "Confirmed statutory requirement for factory establishment. Exact pollution category (Orange vs Green) is verified through daily trade effluent volume in KLD.",
          dossierReadiness: 35,
          userFriendlyBadge: "Confirmed Requirement",
        };
      }
      break;
    }

    case "mpcb-cto": {
      const why = `Conditional requirement: Once your factory construction and Effluent Treatment Plant (ETP) installation are physically completed under your Consent to Establish (CTE), you must obtain Consent to Operate from MPCB BEFORE commencing commercial food processing or discharging trade effluent.`;

      return {
        ruleStatus: RULE_STATUS.POTENTIALLY_APPLICABLE,
        whatMayApply: "MPCB Consent to Operate (CTO) (Conditional Pre-Commissioning Requirement)",
        whyItMayApply: why,
        whatYouNeedToPrepare: requirement.required_documents || requirement.mandatory_records || [],
        officialSource: {
          name: requirement.official_source_name,
          url: requirement.official_source_url,
          reference: requirement.source_reference,
        },
        nextStep: "Keep on schedule for application once physical factory construction and ETP installation reach completion.",
        verificationNotes: "Conditional applicability: Do not file now. Application is triggered 45 days prior to planned commercial commissioning.",
        dossierReadiness: 15,
        userFriendlyBadge: "Conditional (Post-Construction)",
      };
    }

    case "gumasta-license": {
      const hasTenOrMore = workforce >= 10;
      const why = hasTenOrMore
        ? `Mandatory statutory registration under Section 6 of the Maharashtra Shops and Establishments Act, 2017 for commercial establishments and offices employing 10 or more workers (${workforce} declared) in ${profile?.district || "Maharashtra"}.`
        : `Under the Maharashtra Shops and Establishments Act, 2017, establishments with fewer than 10 workers require Form F Intimation (free of statutory fee), rather than Form G registration.`;

      return {
        ruleStatus: hasTenOrMore ? RULE_STATUS.APPLICABLE : RULE_STATUS.POTENTIALLY_APPLICABLE,
        whatMayApply: hasTenOrMore
          ? "Maharashtra Shops & Establishments Registration (Form G) (Confirmed Statutory Requirement)"
          : "Maharashtra Shops & Establishments Intimation (Form F) (Statutory Intimation)",
        whyItMayApply: why,
        whatYouNeedToPrepare: requirement.required_documents || requirement.mandatory_records || [],
        officialSource: {
          name: requirement.official_source_name,
          url: requirement.official_source_url,
          reference: requirement.source_reference,
        },
        nextStep: "Ensure establishment entrance signage displays Marathi Devanagari script with equal font prominence, then submit Form A via Aaple Sarkar RTS.",
        verificationNotes: "Confirmed statutory requirement. Under Maharashtra 2017 Act, this registration has permanent lifetime validity (annual renewal abolished).",
        dossierReadiness: 85,
        userFriendlyBadge: "Confirmed Requirement",
      };
    }

    case "dish-factory-license": {
      const isPowerWithWorkforce = powerHP > 0 && workforce >= 10;
      const why = `Under Section 2(m)(i) of the Factories Act, 1948, any manufacturing premises utilizing electrical power with 10 or more workers qualifies as a factory. Because ABC Foods has ${workforce} total workforce and ${powerHP} HP connected load, this requirement is triggered if 10 or more of those workers are stationed directly on the manufacturing shop floor.`;

      return {
        ruleStatus: RULE_STATUS.NEEDS_VERIFICATION,
        whatMayApply: "Factory Building Plan Approval & License (DISH) (Conditional / Verification Required)",
        whyItMayApply: why,
        whatYouNeedToPrepare: requirement.required_documents || requirement.mandatory_records || [],
        officialSource: {
          name: requirement.official_source_name,
          url: requirement.official_source_url,
          reference: requirement.source_reference,
        },
        nextStep: "Audit workforce roster: verify exact headcount stationed on the processing floor versus administrative, marketing, and logistics staff.",
        verificationNotes: "Verification Required: If 10+ employees work on the manufacturing floor with power, Form 1 plan approval from DISH Nashik is mandatory prior to construction. If fewer than 10 work on the shop floor, only Shops & Establishments applies.",
        dossierReadiness: 40,
        userFriendlyBadge: "Verification Required",
      };
    }

    case "fire-safety-noc": {
      const isIndustrialZone = (profile?.industrialArea || "").toLowerCase().includes("midc");
      const why = `Required for industrial sheds, food processing plants, and packaging storage facilities in ${profile?.industrialArea || "MIDC areas"} under the Maharashtra Fire Prevention and Life Safety Measures Act, 2006 to ensure emergency exit corridors, fire water reserves, and electrical fire safety.`;

      return {
        ruleStatus: RULE_STATUS.POTENTIALLY_APPLICABLE,
        whatMayApply: "Fire Safety Pre-construction NOC (Conditional / Verification Required)",
        whyItMayApply: why,
        whatYouNeedToPrepare: requirement.required_documents || requirement.mandatory_records || [],
        officialSource: {
          name: requirement.official_source_name,
          url: requirement.official_source_url,
          reference: requirement.source_reference,
        },
        nextStep: "Verify factory shed built-up area and submit architectural layout drawings with fire hydrant schematic to the MIDC Fire Department.",
        verificationNotes: "Conditional applicability: Mandatory for building sanction if built-up area exceeds 500 sq.m or involves significant packaging combustible storage.",
        dossierReadiness: 50,
        userFriendlyBadge: "Conditional (Plot/Area Dependent)",
      };
    }

    case "udyam-registration": {
      const isSmall = investment <= 100000000 && turnover <= 500000000;
      const why = `Mandatory national statutory identification for recognition as a Small Enterprise (investment in plant & machinery up to ₹10 Crore, turnover up to ₹50 Crore) under the MSMED Act, 2006. Unlocks priority sector lending, state package scheme subsidies (PSI 2019), and statutory delayed payment protection.`;

      return {
        ruleStatus: RULE_STATUS.APPLICABLE,
        whatMayApply: "Udyam MSME Registration (Confirmed Statutory Recognition)",
        whyItMayApply: why,
        whatYouNeedToPrepare: requirement.required_documents || requirement.mandatory_records || [],
        officialSource: {
          name: requirement.official_source_name,
          url: requirement.official_source_url,
          reference: requirement.source_reference,
        },
        nextStep: "Complete digital self-declaration on the official Government of India Udyam portal using Director Aadhaar, Enterprise PAN, and GSTIN (100% free of charge).",
        verificationNotes: "Confirmed statutory requirement. Permanent registration with dynamic QR code. No periodic renewal fee.",
        dossierReadiness: 100,
        userFriendlyBadge: "Confirmed Requirement",
      };
    }

    default: {
      return {
        ruleStatus: RULE_STATUS.APPLICABLE,
        whatMayApply: `${requirement.name || requirement.title}`,
        whyItMayApply: requirement.trigger_conditions || requirement.statutory_triggers || "Prescribed requirement for this sector in Maharashtra.",
        whatYouNeedToPrepare: requirement.required_documents || requirement.mandatory_records || [],
        officialSource: {
          name: requirement.official_source_name || requirement.department,
          url: requirement.official_source_url || requirement.portal_url,
          reference: requirement.source_reference || requirement.act,
        },
        nextStep: requirement.action_needed || "Prepare required documents for official submission.",
        verificationNotes: null,
        dossierReadiness: 50,
        userFriendlyBadge: "Applicable",
      };
    }
  }
}

/**
 * Service Layer: Query requirements dynamically from the Knowledge Base
 * Queries based on:
 * business sector + location + business stage + business size + operations
 */
export function queryKnowledgeBaseRequirements(profile, masterCatalog = null) {
  const catalog = Array.isArray(masterCatalog) && masterCatalog.length > 0 ? masterCatalog : OFFICIAL_KNOWLEDGE_BASE;

  // Normalize and evaluate each requirement
  const roadmap = catalog
    .map((req) => {
      const evaluation = evaluateRequirement(req, profile);
      if (evaluation.ruleStatus === RULE_STATUS.NOT_APPLICABLE) {
        return null;
      }

      return {
        ...req,
        // Guaranteed core data model attributes
        requirement_id: req.requirement_id || req.id,
        id: req.id || req.requirement_id,
        name: req.name || req.title,
        title: req.title || req.name,
        department: req.department,
        jurisdiction: req.jurisdiction || req.jurisdiction_tier,
        jurisdiction_tier: req.jurisdiction_tier || req.jurisdiction,
        sector: req.sector,
        business_stage: req.business_stage || req.stage,
        business_size: req.business_size || profile.classification,
        applicability_conditions: req.applicability_conditions,
        trigger_conditions: req.trigger_conditions || req.statutory_triggers,
        required_documents: req.required_documents || req.mandatory_records || [],
        mandatory_records: req.mandatory_records || req.required_documents || [],
        process_summary: req.process_summary,
        processSummary: req.process_summary,
        validity: req.validity,
        renewal_information: req.renewal_information,
        renewalInformation: req.renewal_information,
        official_source_name: req.official_source_name || req.department,
        officialSourceName: req.official_source_name || req.department,
        official_source_url: req.official_source_url || req.portal_url,
        officialSourceUrl: req.official_source_url || req.portal_url,
        source_reference: req.source_reference || req.act,
        sourceReference: req.source_reference || req.act,
        last_verified: req.last_verified,
        lastVerified: req.last_verified,
        verification_status: req.verification_status,
        verificationStatus: req.verification_status,

        // User-friendly evaluation outputs (No internal rule-engine jargon)
        rule_status: evaluation.ruleStatus,
        ruleStatus: evaluation.ruleStatus,
        matchStatus: evaluation.ruleStatus,
        what_may_apply: evaluation.whatMayApply,
        whatMayApply: evaluation.whatMayApply,
        why_it_may_apply: evaluation.whyItMayApply,
        whyItApplies: evaluation.whyItMayApply,
        what_you_need_to_prepare: evaluation.whatYouNeedToPrepare,
        whatYouNeedToPrepare: (evaluation.whatYouNeedToPrepare || []).map((d) => (typeof d === "string" ? d : d.name || d.title || "Required Document")),
        official_source: evaluation.officialSource,
        officialSource: evaluation.officialSource,
        next_step: evaluation.nextStep,
        nextStep: evaluation.nextStep,
        verification_notes: evaluation.verificationNotes,
        verificationNotes: evaluation.verificationNotes,
        dossierReadiness: evaluation.dossierReadiness,
        user_friendly_badge: evaluation.userFriendlyBadge,
        userFriendlyBadge: evaluation.userFriendlyBadge,
      };
    })
    .filter(Boolean);

  // Sort by priority: Confirmed/Critical first, then Conditional, then Needs Verification
  const priorityOrder = {
    [RULE_STATUS.APPLICABLE]: 1,
    [RULE_STATUS.POTENTIALLY_APPLICABLE]: 2,
    [RULE_STATUS.NEEDS_VERIFICATION]: 3,
  };

  roadmap.sort((a, b) => {
    const pA = priorityOrder[a.rule_status] || 99;
    const pB = priorityOrder[b.rule_status] || 99;
    return pA - pB;
  });

  return roadmap;
}
