# UdyamSetu AI - Supabase Database & Security Guide

This directory contains the database schema migrations, seed catalogs, and Row Level Security (RLS) policies for connecting UdyamSetu to Supabase.

---

## 1. Quick Setup in Supabase Dashboard

1. **Log in to Supabase**: Navigate to [https://supabase.com/dashboard](https://supabase.com/dashboard) and open your project.
2. **Execute Schema**:
   - Go to the **SQL Editor** tab in the left sidebar.
   - Click **New Query**.
   - Copy and paste the contents of `supabase/schema.sql` and click **Run**.
3. **Load Master Regulatory Seed Catalogs**:
   - In a new query in the SQL Editor, paste the contents of `supabase/seed.sql` and click **Run**.
4. **Retrieve Credentials**:
   - Go to **Project Settings** -> **API**.
   - Copy your **Project URL** and your **anon / public** API key.
5. **Configure Environment Variables**:
   - Open `.env` in the root of this project:
     ```env
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key-here
     ```
   - Restart the Vite development server (`npm run dev`).

---

## 2. Database Architecture & Tables

| Table Name | Description | Key Security Rule |
| :--- | :--- | :--- |
| `profiles` | User profiles linked 1:1 with `auth.users(id)` | Can only be selected/updated by the profile owner (`auth.uid() = id`). Auto-created on signup. |
| `businesses` | Business context records (sector, scale, district, workforce, etc.) | Scoped by `user_id`. Each user only manages their own businesses. |
| `requirements` | Master statutory clearance catalog (FSSAI, MPCB, Gumasta, etc.) | Read-only for authenticated & public users. Curated by administrators. |
| `business_requirements` | Junction table tracking custom dossier readiness & status per business | Scoped by `user_id` and `business_id`. |
| `documents` | Statutory documents uploaded by the user | Scoped to `user_id` & `business_id`. One business cannot view another's files. |
| `compliance_tasks` | Recurring and statutory filings (GST, P-Tax, Form V, etc.) | Scoped to `user_id` & `business_id`. Status toggles persist per user. |
| `support_schemes` | Central & State incentive schemes (PSI 2019, PMFME, CGTMSE, etc.) | Read-only catalog filtered dynamically by enterprise profile. |

---

## 3. Row Level Security (RLS) Policies

All tables have RLS explicitly enabled:
- `businesses`: Users can only `SELECT`, `INSERT`, `UPDATE`, and `DELETE` rows where `user_id = auth.uid()`.
- `documents`: Users can only access records where `user_id = auth.uid()`.
- `compliance_tasks`: Users can only access and update tasks where `user_id = auth.uid()`.
- `profiles`: Users can only see and edit their own row (`id = auth.uid()`).
- `requirements` & `support_schemes`: Readable across authenticated sessions for statutory guidance.

---

## 4. Resilience & Fallback Behavior

UdyamSetu implements an API Adapter pattern:
- **Connected Mode**: When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are provided and valid, authentication and database reads/writes run on live Supabase.
- **Offline / Local Fallback**: When environment variables are unset, invalid, or during temporary network degradation, the app gracefully falls back to browser `localStorage` and seed catalogs without blocking the user.
