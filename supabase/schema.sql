-- ==============================================================================
-- UDYAMSETU AI - SUPABASE DATABASE SCHEMA MIGRATION
-- State & Central Compliance Architecture for Maharashtra MSMEs
-- ==============================================================================

-- Enable UUID extension if not already available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. PROFILES TABLE (Associated with auth.users)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'Enterprise Administrator',
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 2. BUSINESSES TABLE (User business profile context)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  legal_name TEXT NOT NULL,
  brand_name TEXT,
  reference_id TEXT,
  sector TEXT NOT NULL,
  sector_category TEXT,
  nic_code TEXT,
  entity_type TEXT,
  classification TEXT,
  stage TEXT,
  stage_label TEXT,
  state TEXT DEFAULT 'Maharashtra',
  district TEXT,
  taluka TEXT,
  industrial_area TEXT,
  plot_number TEXT,
  pin_code TEXT,
  local_body TEXT,
  operations JSONB DEFAULT '[]'::jsonb,
  cold_storage_planned BOOLEAN DEFAULT false,
  workforce_count INTEGER DEFAULT 0,
  connected_load_hp NUMERIC DEFAULT 0,
  connected_load_kva NUMERIC DEFAULT 0,
  daily_production_capacity_mt NUMERIC DEFAULT 0,
  plant_machinery_investment NUMERIC DEFAULT 0,
  annual_turnover_estimated NUMERIC DEFAULT 0,
  land_building_investment NUMERIC DEFAULT 0,
  total_project_cost NUMERIC DEFAULT 0,
  udyam_number TEXT,
  cin TEXT,
  pan TEXT,
  gstin TEXT,
  contact_person TEXT,
  designation TEXT,
  email TEXT,
  phone TEXT,
  status TEXT DEFAULT 'Active MSME',
  is_demo BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for speedy business lookup by user
CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON public.businesses(user_id);

-- ==============================================================================
-- 3. REQUIREMENTS TABLE (Master regulatory requirements catalog & knowledge base)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.requirements (
  id TEXT PRIMARY KEY,
  requirement_id TEXT,
  title TEXT NOT NULL,
  name TEXT,
  act TEXT,
  source_reference TEXT,
  department TEXT,
  official_source_name TEXT,
  official_source_url TEXT,
  portal_name TEXT,
  portal_url TEXT,
  jurisdiction TEXT,
  jurisdiction_tier TEXT,
  sector TEXT,
  business_stage TEXT,
  business_size TEXT,
  priority TEXT DEFAULT 'MEDIUM',
  priority_color TEXT DEFAULT 'blue',
  category TEXT,
  stage TEXT,
  applicability_conditions JSONB DEFAULT '{}'::jsonb,
  trigger_conditions TEXT,
  statutory_triggers TEXT,
  required_documents JSONB DEFAULT '[]'::jsonb,
  mandatory_records JSONB DEFAULT '[]'::jsonb,
  process_summary TEXT,
  validity TEXT,
  validity_years NUMERIC,
  renewal_information TEXT,
  estimated_fee NUMERIC,
  fee_breakdown TEXT,
  estimated_timeline TEXT,
  inspection_required TEXT,
  action_needed TEXT,
  verification_status TEXT DEFAULT 'CONFIRMED',
  last_verified TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  steps JSONB DEFAULT '[]'::jsonb,
  dos_and_donts JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 4. BUSINESS_REQUIREMENTS TABLE (Mapping of user businesses to requirements)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.business_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  requirement_id TEXT NOT NULL REFERENCES public.requirements(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending',
  dossier_readiness NUMERIC DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_business_requirement UNIQUE(business_id, requirement_id)
);

CREATE INDEX IF NOT EXISTS idx_business_requirements_biz_id ON public.business_requirements(business_id);
CREATE INDEX IF NOT EXISTS idx_business_requirements_user_id ON public.business_requirements(user_id);

-- ==============================================================================
-- 5. DOCUMENTS TABLE (Statutory documents repository per business)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  doc_type TEXT,
  size TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  status TEXT DEFAULT 'verified',
  verified_by TEXT,
  requirement_ref JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  storage_path TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_documents_business_id ON public.documents(business_id);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON public.documents(user_id);

-- ==============================================================================
-- 6. COMPLIANCE_TASKS TABLE (Periodic and statutory compliance calendar)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.compliance_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  frequency TEXT,
  due_date DATE,
  authority TEXT,
  status TEXT DEFAULT 'Upcoming',
  urgency TEXT,
  category TEXT,
  description TEXT,
  penalty_risk TEXT,
  filing_portal TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_compliance_tasks_business_id ON public.compliance_tasks(business_id);
CREATE INDEX IF NOT EXISTS idx_compliance_tasks_user_id ON public.compliance_tasks(user_id);

-- ==============================================================================
-- 7. SUPPORT_SCHEMES TABLE (State and Central incentive schemes catalog)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.support_schemes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  authority TEXT NOT NULL,
  tier TEXT,
  match_score INTEGER DEFAULT 90,
  sector TEXT,
  max_benefit TEXT,
  application_mode TEXT,
  nodal_agency TEXT,
  key_benefits JSONB DEFAULT '[]'::jsonb,
  eligible_criteria JSONB DEFAULT '[]'::jsonb,
  scheme_portal TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 8. AUTOMATIC TRIGGERS & FUNCTIONS
-- ==============================================================================

-- Auto-update updated_at column helper
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_businesses_updated_at ON public.businesses;
CREATE TRIGGER set_businesses_updated_at
  BEFORE UPDATE ON public.businesses
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_compliance_tasks_updated_at ON public.compliance_tasks;
CREATE TRIGGER set_compliance_tasks_updated_at
  BEFORE UPDATE ON public.compliance_tasks
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_business_requirements_updated_at ON public.business_requirements;
CREATE TRIGGER set_business_requirements_updated_at
  BEFORE UPDATE ON public.business_requirements
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Trigger to create a public.profiles record automatically when a user signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'Enterprise Administrator')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- Strict isolation ensuring each user only accesses their own business records
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_schemes ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Businesses Policies (User owns business)
DROP POLICY IF EXISTS "Users can view own businesses" ON public.businesses;
CREATE POLICY "Users can view own businesses"
  ON public.businesses FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own businesses" ON public.businesses;
CREATE POLICY "Users can insert own businesses"
  ON public.businesses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own businesses" ON public.businesses;
CREATE POLICY "Users can update own businesses"
  ON public.businesses FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own businesses" ON public.businesses;
CREATE POLICY "Users can delete own businesses"
  ON public.businesses FOR DELETE
  USING (auth.uid() = user_id);

-- Requirements Policies (Read-only catalog for all users)
DROP POLICY IF EXISTS "Requirements readable by authenticated" ON public.requirements;
CREATE POLICY "Requirements readable by authenticated"
  ON public.requirements FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Requirements readable by anon" ON public.requirements;
CREATE POLICY "Requirements readable by anon"
  ON public.requirements FOR SELECT
  TO anon
  USING (true);

-- Business Requirements Policies (User owns business_requirements)
DROP POLICY IF EXISTS "Users view own business requirements" ON public.business_requirements;
CREATE POLICY "Users view own business requirements"
  ON public.business_requirements FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own business requirements" ON public.business_requirements;
CREATE POLICY "Users insert own business requirements"
  ON public.business_requirements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update own business requirements" ON public.business_requirements;
CREATE POLICY "Users update own business requirements"
  ON public.business_requirements FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users delete own business requirements" ON public.business_requirements;
CREATE POLICY "Users delete own business requirements"
  ON public.business_requirements FOR DELETE
  USING (auth.uid() = user_id);

-- Documents Policies (Scoped to user_id)
DROP POLICY IF EXISTS "Users view own documents" ON public.documents;
CREATE POLICY "Users view own documents"
  ON public.documents FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own documents" ON public.documents;
CREATE POLICY "Users insert own documents"
  ON public.documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update own documents" ON public.documents;
CREATE POLICY "Users update own documents"
  ON public.documents FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users delete own documents" ON public.documents;
CREATE POLICY "Users delete own documents"
  ON public.documents FOR DELETE
  USING (auth.uid() = user_id);

-- Compliance Tasks Policies (Scoped to user_id)
DROP POLICY IF EXISTS "Users view own compliance tasks" ON public.compliance_tasks;
CREATE POLICY "Users view own compliance tasks"
  ON public.compliance_tasks FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own compliance tasks" ON public.compliance_tasks;
CREATE POLICY "Users insert own compliance tasks"
  ON public.compliance_tasks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update own compliance tasks" ON public.compliance_tasks;
CREATE POLICY "Users update own compliance tasks"
  ON public.compliance_tasks FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users delete own compliance tasks" ON public.compliance_tasks;
CREATE POLICY "Users delete own compliance tasks"
  ON public.compliance_tasks FOR DELETE
  USING (auth.uid() = user_id);

-- Support Schemes Policies (Read-only catalog)
DROP POLICY IF EXISTS "Schemes readable by authenticated" ON public.support_schemes;
CREATE POLICY "Schemes readable by authenticated"
  ON public.support_schemes FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Schemes readable by anon" ON public.support_schemes;
CREATE POLICY "Schemes readable by anon"
  ON public.support_schemes FOR SELECT
  TO anon
  USING (true);
