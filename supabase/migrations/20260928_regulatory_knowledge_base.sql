-- ==============================================================================
-- UDYAMSETU AI - REGULATORY KNOWLEDGE BASE MIGRATION
-- State & Central Compliance Data Model for Maharashtra MSMEs
-- Target Sector: Food Processing | New/Small Business | Maharashtra
-- ==============================================================================

-- 1. Extend requirements table with the Regulatory Knowledge Base schema
ALTER TABLE public.requirements
  ADD COLUMN IF NOT EXISTS requirement_id TEXT,
  ADD COLUMN IF NOT EXISTS name TEXT,
  ADD COLUMN IF NOT EXISTS jurisdiction TEXT,
  ADD COLUMN IF NOT EXISTS sector TEXT,
  ADD COLUMN IF NOT EXISTS business_stage TEXT,
  ADD COLUMN IF NOT EXISTS business_size TEXT,
  ADD COLUMN IF NOT EXISTS applicability_conditions JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS trigger_conditions TEXT,
  ADD COLUMN IF NOT EXISTS required_documents JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS process_summary TEXT,
  ADD COLUMN IF NOT EXISTS validity TEXT,
  ADD COLUMN IF NOT EXISTS renewal_information TEXT,
  ADD COLUMN IF NOT EXISTS official_source_name TEXT,
  ADD COLUMN IF NOT EXISTS official_source_url TEXT,
  ADD COLUMN IF NOT EXISTS source_reference TEXT,
  ADD COLUMN IF NOT EXISTS last_verified TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'CONFIRMED';

-- Populate legacy column fallbacks
UPDATE public.requirements SET requirement_id = id WHERE requirement_id IS NULL;
UPDATE public.requirements SET name = title WHERE name IS NULL;
UPDATE public.requirements SET jurisdiction = jurisdiction_tier WHERE jurisdiction IS NULL;
UPDATE public.requirements SET trigger_conditions = statutory_triggers WHERE trigger_conditions IS NULL;
UPDATE public.requirements SET required_documents = mandatory_records WHERE required_documents IS NULL OR required_documents = '[]'::jsonb;

-- 2. Seed / Upsert Official Regulatory Knowledge Base for Maharashtra Food Processing
-- Source 1: FSSAI / FoSCoS (https://foscos.fssai.gov.in/)
INSERT INTO public.requirements (
  id, requirement_id, title, name, act, source_reference,
  department, official_source_name, official_source_url, portal_name, portal_url,
  jurisdiction, jurisdiction_tier, sector, business_stage, business_size, stage,
  priority, priority_color, category,
  applicability_conditions, trigger_conditions, statutory_triggers,
  process_summary, validity, validity_years, renewal_information,
  estimated_fee, fee_breakdown, estimated_timeline, inspection_required,
  action_needed, verification_status, last_verified,
  required_documents, mandatory_records, steps, dos_and_donts
) VALUES (
  'fssai-license',
  'fssai-license',
  'FSSAI State Manufacturing License / Registration',
  'FSSAI State Manufacturing License / Registration',
  'Food Safety and Standards Act, 2006',
  'Food Safety and Standards Act, 2006; Licensing and Registration Regulations, 2011; FoSCoS Fee Schedule',
  'Food Safety and Standards Authority of India',
  'Food Safety and Standards Authority of India (FSSAI) / FoSCoS',
  'https://foscos.fssai.gov.in/',
  'FoSCoS Maharashtra Portal',
  'https://foscos.fssai.gov.in/',
  'State Directorate of Food and Drug Administration (FDA Maharashtra)',
  'State Directorate of Food and Drug Administration (FDA Maharashtra)',
  'Food Processing',
  'New Business',
  'Small',
  'Stage 3: Approvals',
  'HIGH',
  'amber',
  'STATUTORY APPROVAL',
  '{
    "rule_type": "STATUTORY_MANDATORY",
    "sector_match": ["Food Processing"],
    "location_state": "Maharashtra",
    "operations_any": ["Manufacturing", "Packaging", "Storage", "Cold Storage", "Primary Grinding & Milling", "Wholesale Distribution"],
    "capacity_limits": {
      "min_turnover_inr": 1200000,
      "max_turnover_inr": 200000000,
      "max_daily_production_mt": 2.0
    },
    "classification": "APPLICABLE"
  }'::jsonb,
  'Food-processing operations, packaging, and commercial storage require mandatory food-safety licensing under Section 31 of FSS Act, 2006 prior to commercial output in Maharashtra. State License tier applies for production <= 2 MT/day or turnover between ₹12 Lakh and ₹20 Crore.',
  'Food-processing operations and packaged food manufacturing require mandatory statutory food-safety licensing prior to commercial output in Maharashtra.',
  'Online submission via FoSCoS portal -> Scrutiny by State Designated Officer (DO) -> Query clarification (if any) -> Mandatory joint on-site inspection by Food Safety Officer (FSO) -> Grant of 14-digit FSSAI State License certificate with QR code.',
  '1 to 5 Years (Applicant choice based on annual fee paid)',
  5,
  'Renewal must be filed at least 30 days prior to license expiry date via FoSCoS portal to avoid statutory late fee of ₹100/day.',
  5000,
  '₹5,000 / year state fee + ₹1,000 handling/tax',
  '30-45 working days',
  'Mandatory Pre-licensing Joint Inspection by FSO',
  'Verify Form B horsepower parameters & upload water lab analysis report',
  'CONFIRMED',
  timezone('utc'::text, now()),
  '[
    {"id": "doc-fb", "name": "Form B Application Form", "status": "verified", "required": true},
    {"id": "doc-layout", "name": "Premises Blueprint Layout (Drawn to Scale with Dimensions)", "status": "verified", "required": true},
    {"id": "doc-machinery", "name": "Installed Machinery List (Horsepower & Rated Capacity)", "status": "action_required", "required": true},
    {"id": "doc-water", "name": "Water Potability Test Report (NABL Certified Lab as per IS 10500)", "status": "action_required", "required": true},
    {"id": "doc-fsg", "name": "Food Safety Management System (FSMS) Plan / SOPs", "status": "verified", "required": false}
  ]'::jsonb,
  '[
    {"id": "doc-fb", "name": "Form B Application Form", "status": "verified", "required": true},
    {"id": "doc-layout", "name": "Premises Blueprint Layout (Drawn to Scale)", "status": "verified", "required": true},
    {"id": "doc-machinery", "name": "Installed Machinery List (Horsepower & Capacity)", "status": "action_required", "required": true},
    {"id": "doc-water", "name": "Water Test Analysis Report (NABL Certified Lab)", "status": "action_required", "required": true},
    {"id": "doc-fsg", "name": "Food Safety Management Plan (FSMS) / SOPs", "status": "verified", "required": false}
  ]'::jsonb,
  '[
    {"stepNumber": 1, "title": "Parameter & Category Identification", "description": "Confirm production volume is < 2 MT/day to validate State License eligibility on FoSCoS gateway.", "status": "completed"},
    {"stepNumber": 2, "title": "Technical Dossier Compilation", "description": "Compile machinery horsepower schedule and NABL water potability test report (IS 10500 standard).", "status": "in_progress"},
    {"stepNumber": 3, "title": "Government Fee Challan Generation", "description": "Generate treasury challan on FoSCoS payment gateway for the selected license tenure (1-5 years).", "status": "pending"},
    {"stepNumber": 4, "title": "Food Safety Officer (FSO) On-Site Audit", "description": "FDA Maharashtra inspects physical plant premises, water drainage, hygiene zones, and pest management.", "status": "pending"},
    {"stepNumber": 5, "title": "Grant of 14-Digit State License", "description": "FDA Maharashtra issues digitally signed, QR-coded statutory certificate with 14-digit license number.", "status": "pending"}
  ]'::jsonb,
  '{
    "dos": [
      "Ensure water potability test report is issued by an NABL-accredited laboratory dated within the last 6 months.",
      "Display 14-digit FSSAI license number and logo prominently on all primary and secondary food packaging.",
      "Maintain daily backwash and hygiene logs on the plant premises."
    ],
    "donts": [
      "Do not commence commercial food processing or dispatch prior to receiving official license grant.",
      "Do not install machinery exceeding declared cumulative horsepower without intimating FDA Maharashtra."
    ]
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  requirement_id = EXCLUDED.requirement_id,
  name = EXCLUDED.name,
  department = EXCLUDED.department,
  jurisdiction = EXCLUDED.jurisdiction,
  sector = EXCLUDED.sector,
  business_stage = EXCLUDED.business_stage,
  business_size = EXCLUDED.business_size,
  applicability_conditions = EXCLUDED.applicability_conditions,
  trigger_conditions = EXCLUDED.trigger_conditions,
  required_documents = EXCLUDED.required_documents,
  process_summary = EXCLUDED.process_summary,
  validity = EXCLUDED.validity,
  renewal_information = EXCLUDED.renewal_information,
  official_source_name = EXCLUDED.official_source_name,
  official_source_url = EXCLUDED.official_source_url,
  source_reference = EXCLUDED.source_reference,
  last_verified = EXCLUDED.last_verified,
  verification_status = EXCLUDED.verification_status;

-- Source 2a: MPCB Consent to Establish (CTE) (https://www.mpcb.gov.in/en/consentmgt/water-and-air-act)
INSERT INTO public.requirements (
  id, requirement_id, title, name, act, source_reference,
  department, official_source_name, official_source_url, portal_name, portal_url,
  jurisdiction, jurisdiction_tier, sector, business_stage, business_size, stage,
  priority, priority_color, category,
  applicability_conditions, trigger_conditions, statutory_triggers,
  process_summary, validity, validity_years, renewal_information,
  estimated_fee, fee_breakdown, estimated_timeline, inspection_required,
  action_needed, verification_status, last_verified,
  required_documents, mandatory_records, steps, dos_and_donts
) VALUES (
  'mpcb-cte',
  'mpcb-cte',
  'MPCB Consent to Establish (CTE) - Industrial Pollution Clearance',
  'MPCB Consent to Establish (CTE) - Industrial Pollution Clearance',
  'Water (Prevention & Control of Pollution) Act, 1974 & Air Act, 1981',
  'Water Act 1974 Sec 25; Air Act 1981 Sec 21; MPCB Revised Industrial Categorization (Red/Orange/Green)',
  'Maharashtra Pollution Control Board (MPCB)',
  'Maharashtra Pollution Control Board (MPCB)',
  'https://www.mpcb.gov.in/en/consentmgt/water-and-air-act',
  'MPCB e-Consent Portal',
  'https://www.mpcb.gov.in/en/consentmgt/water-and-air-act',
  'MPCB Regional Office (Nashik / Division)',
  'MPCB Regional Office (Nashik / Division)',
  'Food Processing',
  'New Business',
  'Small',
  'Stage 2: Clearances',
  'CRITICAL',
  'red',
  'ENVIRONMENTAL CLEARANCE',
  '{
    "rule_type": "ENVIRONMENTAL_PRE_CONSTRUCTION",
    "sector_match": ["Food Processing", "Manufacturing"],
    "location_state": "Maharashtra",
    "pollution_tier": "Orange",
    "triggers": ["effluent_generation", "connected_load_gt_25hp", "midc_industrial_area"],
    "classification": "APPLICABLE"
  }'::jsonb,
  'Industrial food manufacturing facilities involving trade effluent/wash-water discharge or connected electrical load exceeding 25 HP require statutory Consent to Establish from MPCB prior to starting factory site setup, construction, or machinery installation.',
  'Food manufacturing facilities with industrial effluent and connected power exceeding 25 HP trigger Orange Category pollution screening.',
  'Online application submission on MPCB e-Consent system -> Scrutiny by Sub-Regional Officer (SRO Nashik) -> Site inspection by MPCB field engineer -> Evaluation by Regional Consent Committee -> Issuance of Consent to Establish order with effluent discharge conditions.',
  '5 Years (or until commissioning of plant, whichever is earlier)',
  5,
  'Consent to Establish is a one-time pre-construction approval. Upon plant completion, Consent to Operate (CTO) must be obtained prior to commercial production.',
  25000,
  '₹25,000 capital-investment slab fee + cess as per MPCB schedule',
  '45-60 working days',
  'Sub-Regional Officer (SRO) Site Verification',
  'Submit Effluent Treatment Scheme (ETP) and MIDC drainage conduit connection NOC',
  'CONFIRMED',
  timezone('utc'::text, now()),
  '[
    {"id": "doc-midc", "name": "MIDC Allotment / Registered Property Lease Deed", "status": "verified", "required": true},
    {"id": "doc-arch", "name": "Architect-Certified Factory Plan & Drainage Conduit Layout", "status": "action_required", "required": true},
    {"id": "doc-etp", "name": "Effluent Treatment Plant (ETP) Scheme & Water Balance Sheet", "status": "action_required", "required": true},
    {"id": "doc-msedcl", "name": "MSEDCL Connected Load Sanction Letter (45 HP)", "status": "action_required", "required": true},
    {"id": "doc-noc-fire", "name": "Provisional Fire Safety NOC (MIDC Fire Dept)", "status": "verified", "required": true}
  ]'::jsonb,
  '[
    {"id": "doc-midc", "name": "MIDC Allotment / Registered Lease Deed", "status": "verified", "required": true},
    {"id": "doc-arch", "name": "Architect-Certified Factory Plan (Rule 3)", "status": "action_required", "required": true},
    {"id": "doc-etp", "name": "Effluent Treatment Plant (ETP) Scheme / Zero Discharge", "status": "action_required", "required": true},
    {"id": "doc-msedcl", "name": "MSEDCL Connected Load Sanction Letter (45 HP)", "status": "action_required", "required": true},
    {"id": "doc-noc-fire", "name": "Provisional Fire Safety NOC (MIDC Fire Dept)", "status": "verified", "required": true}
  ]'::jsonb,
  '[
    {"stepNumber": 1, "title": "Pollution Category Categorization", "description": "Confirm categorization under MPCB Orange category schedule for food processing units.", "status": "completed"},
    {"stepNumber": 2, "title": "ETP Design & Water Balance Schema", "description": "Prepare certified daily water intake balance and Effluent Treatment Plant engineering design.", "status": "in_progress"},
    {"stepNumber": 3, "title": "Application Filing via e-Consent", "description": "Submit Form I, factory plot plans, process flow diagram, and CA project cost certificate.", "status": "pending"},
    {"stepNumber": 4, "title": "Regional Consent Committee Review", "description": "Technical scrutiny and physical site inspection by MPCB Sub-Regional Office.", "status": "pending"},
    {"stepNumber": 5, "title": "Issuance of CTE Order", "description": "Download digitally signed Consent to Establish certificate specifying statutory environmental standards.", "status": "pending"}
  ]'::jsonb,
  '{
    "dos": [
      "Include a dedicated digital water meter on raw water intake and treated effluent discharge lines.",
      "Obtain MIDC CETP (Common Effluent Treatment Plant) drainage connection NOC where applicable."
    ],
    "donts": [
      "Do not begin civil factory construction or machinery installation prior to obtaining Consent to Establish.",
      "Do not discharge untreated processing or washing wash-water into storm drains or public water bodies."
    ]
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  requirement_id = EXCLUDED.requirement_id,
  name = EXCLUDED.name,
  department = EXCLUDED.department,
  jurisdiction = EXCLUDED.jurisdiction,
  sector = EXCLUDED.sector,
  business_stage = EXCLUDED.business_stage,
  business_size = EXCLUDED.business_size,
  applicability_conditions = EXCLUDED.applicability_conditions,
  trigger_conditions = EXCLUDED.trigger_conditions,
  required_documents = EXCLUDED.required_documents,
  process_summary = EXCLUDED.process_summary,
  validity = EXCLUDED.validity,
  renewal_information = EXCLUDED.renewal_information,
  official_source_name = EXCLUDED.official_source_name,
  official_source_url = EXCLUDED.official_source_url,
  source_reference = EXCLUDED.source_reference,
  last_verified = EXCLUDED.last_verified,
  verification_status = EXCLUDED.verification_status;

-- Source 2b: MPCB Consent to Operate (CTO) (https://www.mpcb.gov.in/en/consentmgt/water-and-air-act)
INSERT INTO public.requirements (
  id, requirement_id, title, name, act, source_reference,
  department, official_source_name, official_source_url, portal_name, portal_url,
  jurisdiction, jurisdiction_tier, sector, business_stage, business_size, stage,
  priority, priority_color, category,
  applicability_conditions, trigger_conditions, statutory_triggers,
  process_summary, validity, validity_years, renewal_information,
  estimated_fee, fee_breakdown, estimated_timeline, inspection_required,
  action_needed, verification_status, last_verified,
  required_documents, mandatory_records, steps, dos_and_donts
) VALUES (
  'mpcb-cto',
  'mpcb-cto',
  'MPCB Consent to Operate (CTO) - Pre-Commissioning Clearance',
  'MPCB Consent to Operate (CTO) - Pre-Commissioning Clearance',
  'Water (Prevention & Control of Pollution) Act, 1974 & Air Act, 1981',
  'Water Act 1974 Sec 25/26; Air Act 1981 Sec 21; MPCB Consent Management Protocol',
  'Maharashtra Pollution Control Board (MPCB)',
  'Maharashtra Pollution Control Board (MPCB)',
  'https://www.mpcb.gov.in/en/consentmgt/water-and-air-act',
  'MPCB e-Consent Portal',
  'https://www.mpcb.gov.in/en/consentmgt/water-and-air-act',
  'MPCB Regional Office (Nashik / Division)',
  'MPCB Regional Office (Nashik / Division)',
  'Food Processing',
  'New Business',
  'Small',
  'Stage 3: Approvals',
  'HIGH',
  'amber',
  'ENVIRONMENTAL CLEARANCE',
  '{
    "rule_type": "ENVIRONMENTAL_PRE_COMMISSIONING",
    "sector_match": ["Food Processing", "Manufacturing"],
    "location_state": "Maharashtra",
    "stage_dependency": "post_construction",
    "prerequisite_id": "mpcb-cte",
    "classification": "POTENTIALLY_APPLICABLE"
  }'::jsonb,
  'Conditional clearance triggered upon completion of factory construction and pollution control installation (ETP/STP), required BEFORE commercial operations and effluent discharge begin.',
  'Applicable once plant construction and pollution control infrastructure are completed, prior to commencing commercial food production.',
  'Application filing via MPCB e-Consent portal -> Submission of CTE condition compliance report -> Post-completion site inspection by MPCB officer -> Verification of installed ETP / air filters -> Issuance of Consent to Operate.',
  '1 to 5 Years (Depending on capital investment slab)',
  5,
  'Mandatory application for renewal at least 60 days prior to expiry date via MPCB e-Consent portal accompanied by compliance audit reports.',
  20000,
  '₹20,000 per term based on capital investment slab',
  '30-45 working days',
  'Physical Post-Construction Verification by MPCB SRO',
  'Await physical plant completion, then submit CTE compliance and ETP commissioning report',
  'CONDITIONAL',
  timezone('utc'::text, now()),
  '[
    {"id": "doc-cte-copy", "name": "Copy of Valid Consent to Establish (CTE) Order", "status": "action_required", "required": true},
    {"id": "doc-cte-comp", "name": "CTE Terms & Conditions Point-wise Compliance Report", "status": "action_required", "required": true},
    {"id": "doc-etp-comm", "name": "ETP / STP Commissioning Certificate from Environmental Engineer", "status": "action_required", "required": true},
    {"id": "doc-eff-test", "name": "Baseline Treated Effluent Test Report", "status": "action_required", "required": true}
  ]'::jsonb,
  '[
    {"id": "doc-cte-copy", "name": "Copy of Valid Consent to Establish (CTE) Order", "status": "action_required", "required": true},
    {"id": "doc-cte-comp", "name": "CTE Terms & Conditions Point-wise Compliance Report", "status": "action_required", "required": true},
    {"id": "doc-etp-comm", "name": "ETP / STP Commissioning Certificate from Environmental Engineer", "status": "action_required", "required": true},
    {"id": "doc-eff-test", "name": "Baseline Treated Effluent Test Report", "status": "action_required", "required": true}
  ]'::jsonb,
  '[
    {"stepNumber": 1, "title": "CTE Compliance Verification", "description": "Verify that all stipulations outlined in the Consent to Establish order have been fulfilled.", "status": "pending"},
    {"stepNumber": 2, "title": "Pollution Control Installation Audit", "description": "Chartered engineer certifies completion and test-run of the Effluent Treatment Plant.", "status": "pending"},
    {"stepNumber": 3, "title": "Online CTO Submission", "description": "Submit Form I for Consent to Operate with fee challan on MPCB e-Consent portal.", "status": "pending"},
    {"stepNumber": 4, "title": "Inspection & Final Grant", "description": "MPCB field officer verifies installed meters and grants Consent to Operate.", "status": "pending"}
  ]'::jsonb,
  '{
    "dos": [
      "Operate ETP round the clock whenever the processing unit is in operation.",
      "Submit annual environmental statement (Form V) on or before September 30 each year."
    ],
    "donts": [
      "Do not begin commercial processing or trade effluent discharge before CTO order is formally issued."
    ]
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  requirement_id = EXCLUDED.requirement_id,
  name = EXCLUDED.name,
  department = EXCLUDED.department,
  jurisdiction = EXCLUDED.jurisdiction,
  sector = EXCLUDED.sector,
  business_stage = EXCLUDED.business_stage,
  business_size = EXCLUDED.business_size,
  applicability_conditions = EXCLUDED.applicability_conditions,
  trigger_conditions = EXCLUDED.trigger_conditions,
  required_documents = EXCLUDED.required_documents,
  process_summary = EXCLUDED.process_summary,
  validity = EXCLUDED.validity,
  renewal_information = EXCLUDED.renewal_information,
  official_source_name = EXCLUDED.official_source_name,
  official_source_url = EXCLUDED.official_source_url,
  source_reference = EXCLUDED.source_reference,
  last_verified = EXCLUDED.last_verified,
  verification_status = EXCLUDED.verification_status;

-- Source 3a: Maharashtra Aaple Sarkar / Dept of Labour - Form G / Gumasta (https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS)
INSERT INTO public.requirements (
  id, requirement_id, title, name, act, source_reference,
  department, official_source_name, official_source_url, portal_name, portal_url,
  jurisdiction, jurisdiction_tier, sector, business_stage, business_size, stage,
  priority, priority_color, category,
  applicability_conditions, trigger_conditions, statutory_triggers,
  process_summary, validity, validity_years, renewal_information,
  estimated_fee, fee_breakdown, estimated_timeline, inspection_required,
  action_needed, verification_status, last_verified,
  required_documents, mandatory_records, steps, dos_and_donts
) VALUES (
  'gumasta-license',
  'gumasta-license',
  'Maharashtra Shops & Establishments Registration (Form G / Gumasta)',
  'Maharashtra Shops & Establishments Registration (Form G / Gumasta)',
  'Maharashtra Shops and Establishments (Regulation of Employment and Conditions of Service) Act, 2017',
  'Maharashtra Shops and Establishments Act, 2017 Sec 6; Maharashtra Act No. XXVIII of 2022 (Signboard Amendment)',
  'Department of Labour, Government of Maharashtra',
  'Department of Labour, Government of Maharashtra / Aaple Sarkar RTS',
  'https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS',
  'Aaple Sarkar Portal',
  'https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS',
  'Municipal Corporation / Local Body Jurisdiction (Nashik Municipal Corporation)',
  'Municipal Corporation / Local Body Jurisdiction (Nashik Municipal Corporation)',
  'Food Processing',
  'New Business',
  'Small',
  'Stage 1: Identity & Establishment',
  'HIGH',
  'emerald',
  'STATUTORY REGISTRATION',
  '{
    "rule_type": "LABOUR_ESTABLISHMENT",
    "location_state": "Maharashtra",
    "min_workforce": 10,
    "form_type": "Form G Registration",
    "note": "Units with < 10 workers require Form F Intimation (no fee). Units with >= 10 workers require Form G statutory registration.",
    "classification": "APPLICABLE"
  }'::jsonb,
  'Mandatory statutory registration for any commercial establishment, administrative office, or storehouse operating within Maharashtra municipal/urban boundaries employing 10 or more workers.',
  'Mandatory statutory registration for any commercial establishment operating within Maharashtra state boundaries with 10 or more employees.',
  'Single-window citizen profile authentication on Aaple Sarkar -> Submission of RTS Form A application -> Upload premises proof, employee roster, and Marathi Devanagari signboard photo -> Payment of municipal fee -> Instant digital issuance of Form G Registration Certificate.',
  'Lifetime / Permanent (Under Maharashtra 2017 Act; periodic annual renewal abolished)',
  10,
  'No annual renewal required under Maharashtra 2017 Act. Any modification in workforce strength, management, or address must be notified via Form I on Aaple Sarkar within 30 days of change.',
  1200,
  '₹1,200 municipal processing fee based on workforce count slab',
  '3-5 working days (often instant via RTS online gateway)',
  'Post-registration random scrutiny by Municipal Ward Inspector',
  'Upload high-resolution photo of establishment signboard in Marathi (Devanagari script)',
  'CONFIRMED',
  timezone('utc'::text, now()),
  '[
    {"id": "doc-kyc", "name": "PAN & Aadhaar of Directors / Authorized Signatories", "status": "verified", "required": true},
    {"id": "doc-lease", "name": "Registered Tenancy Agreement / Premises Title Deed", "status": "verified", "required": true},
    {"id": "doc-tax", "name": "Municipal Property Tax Paid Receipt / Electricity Bill", "status": "verified", "required": true},
    {"id": "doc-sign", "name": "Frontage Signboard Photo in Marathi (Devanagari Script)", "status": "action_required", "required": true},
    {"id": "doc-emp", "name": "List of Employees with Designations & Shift Schedules", "status": "verified", "required": true}
  ]'::jsonb,
  '[
    {"id": "doc-kyc", "name": "PAN & Aadhaar of Directors / Signatories", "status": "verified", "required": true},
    {"id": "doc-lease", "name": "Registered Tenancy Agreement / Title Deed", "status": "verified", "required": true},
    {"id": "doc-tax", "name": "Municipal Property Tax Paid Receipt (Current Year)", "status": "verified", "required": true},
    {"id": "doc-sign", "name": "Frontage Signboard Photo in Marathi (Devanagari)", "status": "action_required", "required": true}
  ]'::jsonb,
  '[
    {"stepNumber": 1, "title": "Aaple Sarkar Profile Authentication", "description": "Access Aaple Sarkar RTS services and link Director Aadhaar and enterprise PAN.", "status": "completed"},
    {"stepNumber": 2, "title": "Form A/G Application Data Entry", "description": "Declare employee count (28), weekly offs, shift timings, and partner details.", "status": "completed"},
    {"stepNumber": 3, "title": "Marathi Signboard Verification", "description": "Upload clear color photograph of external signboard displaying Marathi font with equal prominence.", "status": "in_progress"},
    {"stepNumber": 4, "title": "Instant Certificate Issuance", "description": "Instant download of digitally signed Form G Registration Intimation Certificate.", "status": "pending"}
  ]'::jsonb,
  '{
    "dos": [
      "Ensure Marathi text in Devanagari script is displayed in font size equal to or larger than English or Hindi text on all external signboards.",
      "Maintain digital or physical employee muster roll and wage register at the establishment."
    ],
    "donts": [
      "Do not submit photographs of temporary banners or signboards lacking Marathi lettering.",
      "Do not exceed statutory shift durations without registering overtime compensation."
    ]
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  requirement_id = EXCLUDED.requirement_id,
  name = EXCLUDED.name,
  department = EXCLUDED.department,
  jurisdiction = EXCLUDED.jurisdiction,
  sector = EXCLUDED.sector,
  business_stage = EXCLUDED.business_stage,
  business_size = EXCLUDED.business_size,
  applicability_conditions = EXCLUDED.applicability_conditions,
  trigger_conditions = EXCLUDED.trigger_conditions,
  required_documents = EXCLUDED.required_documents,
  process_summary = EXCLUDED.process_summary,
  validity = EXCLUDED.validity,
  renewal_information = EXCLUDED.renewal_information,
  official_source_name = EXCLUDED.official_source_name,
  official_source_url = EXCLUDED.official_source_url,
  source_reference = EXCLUDED.source_reference,
  last_verified = EXCLUDED.last_verified,
  verification_status = EXCLUDED.verification_status;

-- Source 3b: DISH Factory License / Plan Approval (https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS)
INSERT INTO public.requirements (
  id, requirement_id, title, name, act, source_reference,
  department, official_source_name, official_source_url, portal_name, portal_url,
  jurisdiction, jurisdiction_tier, sector, business_stage, business_size, stage,
  priority, priority_color, category,
  applicability_conditions, trigger_conditions, statutory_triggers,
  process_summary, validity, validity_years, renewal_information,
  estimated_fee, fee_breakdown, estimated_timeline, inspection_required,
  action_needed, verification_status, last_verified,
  required_documents, mandatory_records, steps, dos_and_donts
) VALUES (
  'dish-factory-license',
  'dish-factory-license',
  'Maharashtra Factory License & Building Plan Approval (Factories Act, 1948)',
  'Maharashtra Factory License & Building Plan Approval (Factories Act, 1948)',
  'Factories Act, 1948 & Maharashtra Factories Rules, 1963',
  'Factories Act, 1948 Sec 2(m)(i), Sec 6; Maharashtra Factories Rules, 1963 Rule 3 & 4',
  'Directorate of Industrial Safety & Health (DISH), Maharashtra',
  'Directorate of Industrial Safety & Health (DISH) via Aaple Sarkar RTS',
  'https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS',
  'Aaple Sarkar / DISH Portal',
  'https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS',
  'DISH Joint Director Office (Nashik Division)',
  'DISH Joint Director Office (Nashik Division)',
  'Food Processing',
  'New Business',
  'Small',
  'Stage 2: Clearances',
  'HIGH',
  'amber',
  'STATUTORY CLEARANCE',
  '{
    "rule_type": "FACTORY_SAFETY_STATUTE",
    "location_state": "Maharashtra",
    "trigger_thresholds": {
      "with_power_workforce_min": 10,
      "without_power_workforce_min": 20
    },
    "verification_needed": "Verify how many of the 28 workers are stationed on the manufacturing shop floor vs administrative/sales staff.",
    "classification": "POTENTIALLY_APPLICABLE"
  }'::jsonb,
  'Premises carrying on manufacturing processes with electrical power (45 HP) where 10 or more workers are employed in factory operations require statutory Factory Building Plan Approval (Form 1) and Factory License (Form 2) under Section 2(m)(i) of the Factories Act, 1948.',
  'Manufacturing process carried out with power employing 10 or more workers on factory premises triggers DISH licensing scrutiny.',
  'Stage 1: Building plan approval (Form 1) with machine layout drawings submitted on Aaple Sarkar RTS -> Scrutiny by DISH Inspector -> Stage 2: Factory registration & license grant (Form 2) prior to production commencement -> Inspection by Factory Inspector.',
  '1 to 10 Years (Based on fee slab selected)',
  5,
  'License must be renewed before expiry date (application submitted by October 31 of preceding year) via Aaple Sarkar RTS portal.',
  8500,
  '₹8,500 based on connected horsepower (45 HP) and workforce slab (20-50 workers)',
  '30-45 working days',
  'Site Verification by DISH Inspector of Factories',
  'Verify manufacturing shop-floor worker count and prepare architect factory layout (Rule 3)',
  'CONDITIONAL',
  timezone('utc'::text, now()),
  '[
    {"id": "doc-dish-f1", "name": "Form 1 (Application for Permission to Construct/Extend Factory)", "status": "action_required", "required": true},
    {"id": "doc-factory-drawings", "name": "Factory Blueprint Drawings Signed by Architect (Machine Layout, Emergency Exits, Ventilation)", "status": "action_required", "required": true},
    {"id": "doc-stab-cert", "name": "Structural Stability Certificate by Recognized Competent Person", "status": "action_required", "required": true},
    {"id": "doc-mach-hp", "name": "Schedule of Connected Power Machinery & Raw Materials Flow", "status": "verified", "required": true}
  ]'::jsonb,
  '[
    {"id": "doc-dish-f1", "name": "Form 1 Application", "status": "action_required", "required": true},
    {"id": "doc-factory-drawings", "name": "Architect-Certified Factory Plan", "status": "action_required", "required": true},
    {"id": "doc-stab-cert", "name": "Structural Stability Certificate", "status": "action_required", "required": true}
  ]'::jsonb,
  '[
    {"stepNumber": 1, "title": "Worker Distribution Verification", "description": "Audit workforce roster to determine whether 10+ employees work on the manufacturing floor.", "status": "in_progress"},
    {"stepNumber": 2, "title": "Architectural Plan Drafting (Rule 3)", "description": "Prepare factory drawings illustrating side elevations, machine safety distances, and escape stairs.", "status": "pending"},
    {"stepNumber": 3, "title": "Building Plan Approval Submission", "description": "Submit Form 1 application on Aaple Sarkar RTS for DISH scrutiny.", "status": "pending"},
    {"stepNumber": 4, "title": "Grant of Factory License (Form 2)", "description": "Following plant construction, file Form 2 for grant of formal Factory License.", "status": "pending"}
  ]'::jsonb,
  '{
    "dos": [
      "Ensure minimum headroom and ventilation ratios conform to Maharashtra Factories Rules, 1963.",
      "Obtain structural stability certification from a DISH-empanelled competent chartered engineer."
    ],
    "donts": [
      "Do not operate manufacturing machinery without machine safety guards over moving belts and gear assemblies."
    ]
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  requirement_id = EXCLUDED.requirement_id,
  name = EXCLUDED.name,
  department = EXCLUDED.department,
  jurisdiction = EXCLUDED.jurisdiction,
  sector = EXCLUDED.sector,
  business_stage = EXCLUDED.business_stage,
  business_size = EXCLUDED.business_size,
  applicability_conditions = EXCLUDED.applicability_conditions,
  trigger_conditions = EXCLUDED.trigger_conditions,
  required_documents = EXCLUDED.required_documents,
  process_summary = EXCLUDED.process_summary,
  validity = EXCLUDED.validity,
  renewal_information = EXCLUDED.renewal_information,
  official_source_name = EXCLUDED.official_source_name,
  official_source_url = EXCLUDED.official_source_url,
  source_reference = EXCLUDED.source_reference,
  last_verified = EXCLUDED.last_verified,
  verification_status = EXCLUDED.verification_status;

-- Source 3c: Fire Safety Pre-construction NOC (https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS)
INSERT INTO public.requirements (
  id, requirement_id, title, name, act, source_reference,
  department, official_source_name, official_source_url, portal_name, portal_url,
  jurisdiction, jurisdiction_tier, sector, business_stage, business_size, stage,
  priority, priority_color, category,
  applicability_conditions, trigger_conditions, statutory_triggers,
  process_summary, validity, validity_years, renewal_information,
  estimated_fee, fee_breakdown, estimated_timeline, inspection_required,
  action_needed, verification_status, last_verified,
  required_documents, mandatory_records, steps, dos_and_donts
) VALUES (
  'fire-safety-noc',
  'fire-safety-noc',
  'Fire Safety Pre-construction NOC & Life Safety Clearance',
  'Fire Safety Pre-construction NOC & Life Safety Clearance',
  'Maharashtra Fire Prevention and Life Safety Measures Act, 2006',
  'Maharashtra Fire Prevention and Life Safety Measures Act, 2006 Sec 3; MIDC Fire Protection Regulations',
  'Directorate of Maharashtra Fire Services / MIDC Fire Department',
  'Directorate of Maharashtra Fire Services / MIDC Fire Department via Aaple Sarkar RTS',
  'https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS',
  'Aaple Sarkar / MIDC Single Window',
  'https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS',
  'MIDC Fire Station (Ambad, Nashik) / Local Fire Authority',
  'MIDC Fire Station (Ambad, Nashik) / Local Fire Authority',
  'Food Processing',
  'New Business',
  'Small',
  'Stage 2: Clearances',
  'HIGH',
  'amber',
  'STATUTORY CLEARANCE',
  '{
    "rule_type": "FIRE_SAFETY_CLEARANCE",
    "location_state": "Maharashtra",
    "triggers": ["industrial_shed_construction", "midc_area", "packaging_material_storage"],
    "verification_needed": "Verify facility built-up area and heating/fuel storage plans to determine whether Provisional Fire NOC is mandatory prior to building plan sanction.",
    "classification": "POTENTIALLY_APPLICABLE"
  }'::jsonb,
  'Industrial buildings, factory sheds with built-up area exceeding prescribed limits, or premises storing combustible packaging/grain dust require Provisional Fire NOC before building sanction, and Final Fire NOC before occupancy.',
  'Industrial factory shed construction, grain/packaging storage, and commercial power in MIDC industrial areas require fire safety compliance.',
  'Submit architectural plans with firefighting schematics via Aaple Sarkar / MIDC portal -> Scrutiny by Chief Fire Officer (CFO) -> Issuance of Provisional Fire NOC -> Post-construction audit of installed fire hydrants -> Grant of Final Fire NOC.',
  'Provisional: Valid during construction; Final: 1 Year (subject to bi-annual Form B certification)',
  1,
  'Semi-annual submission of Form B certificate (every January and July) from a licensed agency certifying operational maintenance of firefighting installations.',
  5000,
  '₹5,000 scrutiny fee + fire protection cess based on built-up area',
  '15-30 working days',
  'Site Verification by Fire Officer',
  'Verify built-up area and submit fire egress layout to MIDC Fire Department',
  'CONDITIONAL',
  timezone('utc'::text, now()),
  '[
    {"id": "doc-fire-layout", "name": "Architectural Drawing with Fire Hydrants, Hose Reels & Exit Routes", "status": "action_required", "required": true},
    {"id": "doc-fire-water", "name": "Underground / Overhead Static Fire Water Storage Tank Schema", "status": "action_required", "required": true},
    {"id": "doc-fire-comb", "name": "Declaration of Combustible Inventory & Raw Material Storage", "status": "verified", "required": true}
  ]'::jsonb,
  '[
    {"id": "doc-fire-layout", "name": "Architectural Drawing with Fire Egress Routes", "status": "action_required", "required": true},
    {"id": "doc-fire-water", "name": "Static Fire Water Tank Schema", "status": "action_required", "required": true}
  ]'::jsonb,
  '[
    {"stepNumber": 1, "title": "Fire Risk Assessment", "description": "Evaluate packaging materials, grain dust combustion, and electrical loads.", "status": "completed"},
    {"stepNumber": 2, "title": "Provisional Fire NOC Application", "description": "Submit building drawings with fire safety measures to MIDC Fire Department.", "status": "pending"},
    {"stepNumber": 3, "title": "Fire Equipment Installation", "description": "Install fire extinguishers, hose reels, and emergency signage.", "status": "pending"},
    {"stepNumber": 4, "title": "Final Fire NOC Inspection", "description": "Chief Fire Officer inspects premises and issues Final Fire NOC.", "status": "pending"}
  ]'::jsonb,
  '{
    "dos": [
      "Keep all emergency escape passageways and fire doors clear of packaging inventory or crates.",
      "Obtain bi-annual Form B maintenance certificate from an authorized licensed fire agency."
    ],
    "donts": [
      "Do not install electrical junction boxes or combustible material near emergency exit corridors."
    ]
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  requirement_id = EXCLUDED.requirement_id,
  name = EXCLUDED.name,
  department = EXCLUDED.department,
  jurisdiction = EXCLUDED.jurisdiction,
  sector = EXCLUDED.sector,
  business_stage = EXCLUDED.business_stage,
  business_size = EXCLUDED.business_size,
  applicability_conditions = EXCLUDED.applicability_conditions,
  trigger_conditions = EXCLUDED.trigger_conditions,
  required_documents = EXCLUDED.required_documents,
  process_summary = EXCLUDED.process_summary,
  validity = EXCLUDED.validity,
  renewal_information = EXCLUDED.renewal_information,
  official_source_name = EXCLUDED.official_source_name,
  official_source_url = EXCLUDED.official_source_url,
  source_reference = EXCLUDED.source_reference,
  last_verified = EXCLUDED.last_verified,
  verification_status = EXCLUDED.verification_status;

-- Source 4: Government of India Udyam Registration (https://udyamregistration.gov.in/)
INSERT INTO public.requirements (
  id, requirement_id, title, name, act, source_reference,
  department, official_source_name, official_source_url, portal_name, portal_url,
  jurisdiction, jurisdiction_tier, sector, business_stage, business_size, stage,
  priority, priority_color, category,
  applicability_conditions, trigger_conditions, statutory_triggers,
  process_summary, validity, validity_years, renewal_information,
  estimated_fee, fee_breakdown, estimated_timeline, inspection_required,
  action_needed, verification_status, last_verified,
  required_documents, mandatory_records, steps, dos_and_donts
) VALUES (
  'udyam-registration',
  'udyam-registration',
  'Udyam Registration (Government of India MSME Recognition)',
  'Udyam Registration (Government of India MSME Recognition)',
  'Micro, Small and Medium Enterprises Development (MSMED) Act, 2006',
  'MSMED Act, 2006; Gazette Notification S.O. 2119(E) dated 26-06-2020',
  'Ministry of Micro, Small & Medium Enterprises, Government of India',
  'Ministry of Micro, Small and Medium Enterprises (MSME), Government of India',
  'https://udyamregistration.gov.in/',
  'Official Udyam Registration Portal',
  'https://udyamregistration.gov.in/',
  'Central Government of India (All-India & Maharashtra Recognition)',
  'Central Government of India (All-India & Maharashtra Recognition)',
  'Food Processing',
  'New Business',
  'Small',
  'Stage 1: Identity & Establishment',
  'CRITICAL',
  'emerald',
  'STATUTORY REGISTRATION',
  '{
    "rule_type": "CENTRAL_MSME_IDENTIFICATION",
    "location_state": "All India (including Maharashtra)",
    "thresholds": {
      "small_investment_max_inr": 100000000,
      "small_turnover_max_inr": 500000000
    },
    "classification": "APPLICABLE"
  }'::jsonb,
  'Statutory formal identification requirement for any enterprise intending to operate as a Micro, Small, or Medium Enterprise. For ABC Foods (plant & machinery investment ₹4.5 Crore <= ₹10 Crore, turnover ₹18.2 Crore <= ₹50 Crore), Small Enterprise classification is applicable.',
  'Mandatory national formal registration to unlock statutory MSME status, central/state subsidies, and priority sector bank financing.',
  'Paperless, free-of-cost online registration on the official Udyam portal -> Aadhaar OTP authentication -> Automatic verification of PAN and GSTIN data via Income Tax and GSTN systems -> Instant generation of permanent Udyam Registration Certificate with dynamic QR code.',
  'Permanent / Lifetime validity',
  10,
  'No renewal required. Enterprise investment and turnover metrics are automatically refreshed annually via IT and GST databases.',
  0,
  '₹0 (Official Government portal does not charge any registration fee)',
  'Instant to 2 working days',
  'No physical inspection required (self-declaration with digital tax linkage)',
  'Complete digital self-declaration on official Udyam portal with Aadhaar, PAN, and GSTIN',
  'CONFIRMED',
  timezone('utc'::text, now()),
  '[
    {"id": "doc-aadhaar-dir", "name": "Aadhaar Card of Managing Director / Authorized Signatory", "status": "verified", "required": true},
    {"id": "doc-pan-ent", "name": "Enterprise Permanent Account Number (PAN)", "status": "verified", "required": true},
    {"id": "doc-gstin", "name": "Goods and Services Tax Identification Number (GSTIN)", "status": "verified", "required": true},
    {"id": "doc-bank", "name": "Enterprise Bank Account Number and IFSC Code", "status": "verified", "required": true},
    {"id": "doc-nic", "name": "NIC 5-Digit Industry Classification Codes (10612 & 10792)", "status": "verified", "required": true}
  ]'::jsonb,
  '[
    {"id": "doc-aadhaar-dir", "name": "Aadhaar Card of Managing Director", "status": "verified", "required": true},
    {"id": "doc-pan-ent", "name": "Enterprise PAN Card", "status": "verified", "required": true},
    {"id": "doc-gstin", "name": "Enterprise GSTIN Certificate", "status": "verified", "required": true}
  ]'::jsonb,
  '[
    {"stepNumber": 1, "title": "Portal Authentication", "description": "Authenticate on udyamregistration.gov.in using Managing Director Aadhaar and OTP.", "status": "completed"},
    {"stepNumber": 2, "title": "Enterprise & PAN Verification", "description": "PAN details are dynamically verified with CBDT database.", "status": "completed"},
    {"stepNumber": 3, "title": "Plant & NIC Declaration", "description": "Declare manufacturing unit location in MIDC Ambad, Nashik and NIC codes 10612 / 10792.", "status": "completed"},
    {"stepNumber": 4, "title": "Permanent URN Issuance", "description": "Download official Udyam Registration Certificate containing unique URN number.", "status": "completed"}
  ]'::jsonb,
  '{
    "dos": [
      "Only register on the official government website (https://udyamregistration.gov.in) which is completely free of cost.",
      "Ensure the mobile number linked to Director Aadhaar is active for OTP verification."
    ],
    "donts": [
      "Do not pay fees on fraudulent intermediary commercial websites claiming to offer Udyam certificates.",
      "Do not file multiple Udyam applications under the same PAN number."
    ]
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  requirement_id = EXCLUDED.requirement_id,
  name = EXCLUDED.name,
  department = EXCLUDED.department,
  jurisdiction = EXCLUDED.jurisdiction,
  sector = EXCLUDED.sector,
  business_stage = EXCLUDED.business_stage,
  business_size = EXCLUDED.business_size,
  applicability_conditions = EXCLUDED.applicability_conditions,
  trigger_conditions = EXCLUDED.trigger_conditions,
  required_documents = EXCLUDED.required_documents,
  process_summary = EXCLUDED.process_summary,
  validity = EXCLUDED.validity,
  renewal_information = EXCLUDED.renewal_information,
  official_source_name = EXCLUDED.official_source_name,
  official_source_url = EXCLUDED.official_source_url,
  source_reference = EXCLUDED.source_reference,
  last_verified = EXCLUDED.last_verified,
  verification_status = EXCLUDED.verification_status;
