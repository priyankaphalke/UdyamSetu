import { supabase, isSupabaseConfigured } from "../lib/supabase.js";
import {
  initialBusinessProfile,
  initialRequirements,
  initialDocuments,
  initialComplianceTasks,
  initialGovernmentSupport,
} from "./mockData.js";
import { OFFICIAL_KNOWLEDGE_BASE } from "./regulatoryKnowledgeBase.js";

// Local storage fallback keys
const STORAGE_KEYS = {
  PROFILE: "udyamsetu_profile",
  REQUIREMENTS: "udyamsetu_requirements",
  DOCUMENTS: "udyamsetu_documents",
  COMPLIANCE: "udyamsetu_compliance",
  SUPPORT: "udyamsetu_support",
  AUTH_USER: "udyamsetu_auth_user",
};

function getStoredItem(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return fallback;
  }
}

function setStoredItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e);
  }
}

// Transform helpers between DB snake_case and UI camelCase
function transformBusinessToDB(profile, userId) {
  const payload = {
    user_id: userId,
    legal_name: profile.legalName || "My Enterprise",
    brand_name: profile.brandName || profile.legalName || "Enterprise",
    reference_id: profile.referenceId || `MH-UDYAM-${Date.now().toString().slice(-6)}`,
    sector: profile.sector || "Manufacturing",
    sector_category: profile.sectorCategory || `${profile.sector || "General"} Operations`,
    nic_code: profile.nicCode || "",
    entity_type: profile.entityType || "Private Limited Company",
    classification: profile.classification || "Small",
    stage: profile.stage || "New Business",
    stage_label: profile.stageLabel || "",
    state: profile.state || "Maharashtra",
    district: profile.district || "Nashik",
    taluka: profile.taluka || "",
    industrial_area: profile.industrialArea || "",
    plot_number: profile.plotNumber || "",
    pin_code: profile.pinCode || "",
    local_body: profile.localBody || "",
    operations: profile.operations || [],
    cold_storage_planned: Boolean(profile.coldStoragePlanned),
    workforce_count: Number(profile.workforceCount) || 0,
    connected_load_hp: Number(profile.connectedLoadHP) || 0,
    connected_load_kva: Number(profile.connectedLoadKVA) || 0,
    daily_production_capacity_mt: Number(profile.dailyProductionCapacityMT) || 0,
    plant_machinery_investment: Number(profile.plantMachineryInvestment) || 0,
    annual_turnover_estimated: Number(profile.annualTurnoverEstimated) || 0,
    land_building_investment: Number(profile.landBuildingInvestment) || 0,
    total_project_cost: Number(profile.totalProjectCost) || 0,
    udyam_number: profile.udyamNumber || "",
    cin: profile.cin || "",
    pan: profile.pan || "",
    gstin: profile.gstin || "",
    contact_person: profile.contactPerson || "",
    designation: profile.designation || "Director",
    email: profile.email || "",
    phone: profile.phone || "",
    status: profile.status || "Active MSME",
    is_demo: Boolean(profile.isDemo),
  };

  // Only include id if it is a valid UUID to prevent DB type errors
  if (profile.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(profile.id)) {
    payload.id = profile.id;
  }
  return payload;
}

function transformBusinessFromDB(row) {
  if (!row) return null;
  return {
    id: row.id,
    userId: row.user_id,
    legalName: row.legal_name,
    brandName: row.brand_name || row.legal_name,
    referenceId: row.reference_id,
    sector: row.sector,
    sectorCategory: row.sector_category,
    nicCode: row.nic_code,
    entityType: row.entity_type,
    classification: row.classification,
    stage: row.stage,
    stageLabel: row.stage_label,
    state: row.state,
    district: row.district,
    taluka: row.taluka,
    industrialArea: row.industrial_area,
    plotNumber: row.plot_number,
    pinCode: row.pin_code,
    localBody: row.local_body,
    operations: row.operations || [],
    coldStoragePlanned: row.cold_storage_planned,
    workforceCount: row.workforce_count,
    connectedLoadHP: row.connected_load_hp,
    connectedLoadKVA: row.connected_load_kva,
    dailyProductionCapacityMT: row.daily_production_capacity_mt,
    plantMachineryInvestment: row.plant_machinery_investment,
    annualTurnoverEstimated: row.annual_turnover_estimated,
    landBuildingInvestment: row.land_building_investment,
    totalProjectCost: row.total_project_cost,
    udyamNumber: row.udyam_number,
    cin: row.cin,
    pan: row.pan,
    gstin: row.gstin,
    contactPerson: row.contact_person,
    designation: row.designation,
    email: row.email,
    phone: row.phone,
    status: row.status,
    isDemo: row.is_demo,
    lastUpdated: row.updated_at ? row.updated_at.split("T")[0] : new Date().toISOString().split("T")[0],
  };
}

function transformDocToDB(doc, businessId, userId) {
  const payload = {
    user_id: userId,
    name: doc.name,
    category: doc.category || "General",
    doc_type: doc.docType || doc.doc_type || "Document",
    size: doc.size || "1.0 MB",
    uploaded_at: doc.uploadedAt || new Date().toISOString(),
    status: doc.status || "verified",
    verified_by: doc.verifiedBy || "Pre-Screening Verification",
    requirement_ref: doc.requirementRef || doc.requirement_ref || [],
    notes: doc.notes || "",
  };
  if (businessId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(businessId)) {
    payload.business_id = businessId;
  }
  return payload;
}

function transformDocFromDB(row) {
  if (!row) return null;
  return {
    id: row.id,
    businessId: row.business_id,
    userId: row.user_id,
    name: row.name,
    category: row.category,
    docType: row.doc_type,
    size: row.size,
    uploadedAt: row.uploaded_at ? row.uploaded_at.split("T")[0] : new Date().toISOString().split("T")[0],
    status: row.status,
    verifiedBy: row.verified_by,
    requirementRef: row.requirement_ref || [],
    notes: row.notes,
  };
}

function transformTaskToDB(task, businessId, userId) {
  const payload = {
    user_id: userId,
    title: task.title,
    frequency: task.frequency || "Annual",
    due_date: task.dueDate || null,
    authority: task.authority || "",
    status: task.status || "Upcoming",
    urgency: task.urgency || "Action Pending",
    category: task.category || "General Compliance",
    description: task.description || "",
    penalty_risk: task.penaltyRisk || "",
    filing_portal: task.filingPortal || "",
  };
  if (businessId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(businessId)) {
    payload.business_id = businessId;
  }
  if (task.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(task.id)) {
    payload.id = task.id;
  }
  return payload;
}

function transformTaskFromDB(row) {
  if (!row) return null;
  return {
    id: row.id,
    businessId: row.business_id,
    userId: row.user_id,
    title: row.title,
    frequency: row.frequency,
    dueDate: row.due_date,
    authority: row.authority,
    status: row.status,
    urgency: row.urgency,
    category: row.category,
    description: row.description,
    penaltyRisk: row.penalty_risk,
    filingPortal: row.filing_portal,
  };
}

function transformRequirementFromDB(item) {
  if (!item) return null;
  const baseOfficial =
    OFFICIAL_KNOWLEDGE_BASE.find(
      (k) =>
        k.requirement_id === (item.requirement_id || item.id) ||
        k.id === (item.id || item.requirement_id)
    ) || {};

  return {
    ...baseOfficial,
    ...item,
    id: item.id || item.requirement_id || baseOfficial.id,
    requirement_id: item.requirement_id || item.id || baseOfficial.requirement_id,
    requirementId: item.requirement_id || item.id || baseOfficial.requirement_id,
    title: item.title || item.name || baseOfficial.title,
    name: item.name || item.title || baseOfficial.name,
    act: item.act || item.source_reference || baseOfficial.act,
    source_reference: item.source_reference || item.act || baseOfficial.source_reference,
    sourceReference: item.source_reference || item.act || baseOfficial.source_reference,
    department: item.department || baseOfficial.department,
    official_source_name: item.official_source_name || baseOfficial.official_source_name || item.department,
    officialSourceName: item.official_source_name || baseOfficial.official_source_name || item.department,
    official_source_url: item.official_source_url || baseOfficial.official_source_url || item.portal_url,
    officialSourceUrl: item.official_source_url || baseOfficial.official_source_url || item.portal_url,
    portal_name: item.portal_name || baseOfficial.portal_name || item.official_source_name,
    portalName: item.portal_name || baseOfficial.portal_name || item.official_source_name,
    portal_url: item.portal_url || baseOfficial.portal_url || item.official_source_url,
    portalUrl: item.portal_url || baseOfficial.portal_url || item.official_source_url,
    jurisdiction: item.jurisdiction || item.jurisdiction_tier || baseOfficial.jurisdiction,
    jurisdiction_tier: item.jurisdiction_tier || item.jurisdiction || baseOfficial.jurisdiction_tier,
    jurisdictionTier: item.jurisdiction_tier || item.jurisdiction || baseOfficial.jurisdiction_tier,
    sector: item.sector || baseOfficial.sector || "Food Processing",
    business_stage: item.business_stage || item.stage || baseOfficial.business_stage,
    businessStage: item.business_stage || item.stage || baseOfficial.business_stage,
    business_size: item.business_size || baseOfficial.business_size || "Small",
    businessSize: item.business_size || baseOfficial.business_size || "Small",
    stage: item.stage || item.business_stage || baseOfficial.stage,
    priority: item.priority || baseOfficial.priority || "MEDIUM",
    priorityColor: item.priority_color || item.priorityColor || baseOfficial.priority_color || "blue",
    priority_color: item.priority_color || item.priorityColor || baseOfficial.priority_color || "blue",
    category: item.category || baseOfficial.category || "STATUTORY CLEARANCE",
    applicability_conditions: item.applicability_conditions || baseOfficial.applicability_conditions || {},
    applicabilityConditions: item.applicability_conditions || baseOfficial.applicability_conditions || {},
    trigger_conditions: item.trigger_conditions || item.statutory_triggers || baseOfficial.trigger_conditions,
    triggerConditions: item.trigger_conditions || item.statutory_triggers || baseOfficial.trigger_conditions,
    statutory_triggers: item.statutory_triggers || item.trigger_conditions || baseOfficial.statutory_triggers,
    statutoryTriggers: item.statutory_triggers || item.trigger_conditions || baseOfficial.statutory_triggers,
    required_documents: item.required_documents || item.mandatory_records || baseOfficial.required_documents || [],
    requiredDocuments: item.required_documents || item.mandatory_records || baseOfficial.required_documents || [],
    mandatory_records: item.mandatory_records || item.required_documents || baseOfficial.mandatory_records || [],
    mandatoryRecords: item.mandatory_records || item.required_documents || baseOfficial.mandatory_records || [],
    process_summary: item.process_summary || baseOfficial.process_summary || "",
    processSummary: item.process_summary || baseOfficial.process_summary || "",
    validity: item.validity || (item.validity_years ? `${item.validity_years} Years` : baseOfficial.validity),
    validityYears: item.validity_years || baseOfficial.validity_years,
    renewal_information: item.renewal_information || baseOfficial.renewal_information || "",
    renewalInformation: item.renewal_information || baseOfficial.renewal_information || "",
    estimatedFee: item.estimated_fee !== undefined ? item.estimated_fee : baseOfficial.estimated_fee,
    estimated_fee: item.estimated_fee !== undefined ? item.estimated_fee : baseOfficial.estimated_fee,
    feeBreakdown: item.fee_breakdown || baseOfficial.fee_breakdown || "",
    fee_breakdown: item.fee_breakdown || baseOfficial.fee_breakdown || "",
    estimatedTimeline: item.estimated_timeline || baseOfficial.estimated_timeline || "",
    estimated_timeline: item.estimated_timeline || baseOfficial.estimated_timeline || "",
    inspectionRequired: item.inspection_required || baseOfficial.inspection_required || "",
    inspection_required: item.inspection_required || baseOfficial.inspection_required || "",
    actionNeeded: item.action_needed || baseOfficial.action_needed || "",
    action_needed: item.action_needed || baseOfficial.action_needed || "",
    verification_status: item.verification_status || baseOfficial.verification_status || "CONFIRMED",
    verificationStatus: item.verification_status || baseOfficial.verification_status || "CONFIRMED",
    last_verified: item.last_verified || baseOfficial.last_verified || "2024-09-26T00:00:00.000Z",
    lastVerified: item.last_verified || baseOfficial.last_verified || "2024-09-26T00:00:00.000Z",
    steps: item.steps || baseOfficial.steps || [],
    dosAndDonts: item.dos_and_donts || baseOfficial.dos_and_donts || { dos: [], donts: [] },
  };
}

export const apiService = {
  // Auth API
  async getCurrentUser() {
    if (isSupabaseConfigured && supabase) {
      try {
        // 1. Check local session from Supabase client (persistSession: true)
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        let user = sessionData?.session?.user;

        // 2. If no active session from getSession, check getUser()
        if (!user) {
          const { data: userData, error: userError } = await supabase.auth.getUser();
          if (!userError && userData?.user) {
            user = userData.user;
          }
        }

        // 3. Fallback to stored auth user before concluding user is absent
        if (!user) {
          const stored = getStoredItem(STORAGE_KEYS.AUTH_USER, null);
          return stored || null;
        }

        // Fetch corresponding profile record from Supabase
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        const formatted = {
          id: user.id,
          email: user.email,
          fullName: profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0],
          role: profile?.role || "Enterprise Administrator",
          phone: profile?.phone || "",
        };
        setStoredItem(STORAGE_KEYS.AUTH_USER, formatted);
        return formatted;
      } catch (err) {
        console.error("Supabase auth check failed:", err);
        const stored = getStoredItem(STORAGE_KEYS.AUTH_USER, null);
        return stored || null;
      }
    }
    // Offline client storage fallback only when Supabase is not configured
    return getStoredItem(STORAGE_KEYS.AUTH_USER, null);
  },

  async login(email, password) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const user = data.user;

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      const formatted = {
        id: user.id,
        email: user.email,
        fullName: profile?.full_name || user.user_metadata?.full_name || user.email?.split("@")[0],
        role: profile?.role || "Enterprise Administrator",
        phone: profile?.phone || "",
      };
      setStoredItem(STORAGE_KEYS.AUTH_USER, formatted);
      return formatted;
    }

    // Local offline mock only when Supabase is not configured
    const user = {
      id: "usr_local",
      email,
      fullName: email.split("@")[0].replace(".", " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Enterprise Administrator",
      role: "Compliance Officer & Director",
      companyName: "ABC Foods Pvt. Ltd.",
    };
    setStoredItem(STORAGE_KEYS.AUTH_USER, user);
    return user;
  },

  async register(fullName, email, password) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });
      if (error) throw error;
      const user = data.user;
      if (!user) throw new Error("Registration failed to create user record.");

      // Ensure profile row exists in public.profiles
      try {
        await supabase.from("profiles").upsert({
          id: user.id,
          email: user.email,
          full_name: fullName,
          role: "Enterprise Administrator",
        });
      } catch (profileErr) {
        console.warn("Profile trigger/upsert notice:", profileErr);
      }

      const formatted = {
        id: user.id,
        email: user.email,
        fullName: fullName,
        role: "Enterprise Administrator",
        hasSession: Boolean(data.session),
      };
      setStoredItem(STORAGE_KEYS.AUTH_USER, formatted);
      return formatted;
    }

    const user = {
      id: `usr_${Date.now()}`,
      email,
      fullName,
      role: "Enterprise Administrator",
      companyName: `${fullName}'s Enterprise`,
    };
    setStoredItem(STORAGE_KEYS.AUTH_USER, user);
    return user;
  },

  async logout() {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn("Supabase signout notice:", e);
      }
    }
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  },

  // Business Profile API - Scoped strictly to the logged-in user in Supabase
  async getBusinessProfile(userId) {
    if (isSupabaseConfigured && userId) {
      try {
        const { data, error } = await supabase
          .from("businesses")
          .select("*")
          .eq("user_id", userId)
          .order("updated_at", { ascending: false })
          .limit(1);

        if (error) {
          console.error("Error fetching business from Supabase:", error);
          throw error;
        }

        if (data && data.length > 0) {
          return transformBusinessFromDB(data[0]);
        }
        return null;
      } catch (err) {
        console.error("Supabase getBusinessProfile exception:", err);
        throw err;
      }
    }

    if (!isSupabaseConfigured) {
      const storageKey = userId ? `${STORAGE_KEYS.PROFILE}_${userId}` : STORAGE_KEYS.PROFILE;
      return getStoredItem(storageKey, null);
    }
    return null;
  },

  async updateBusinessProfile(updates, userId) {
    const activeUserId = userId || (await this.getCurrentUser())?.id;
    if (!activeUserId) {
      throw new Error("No active authenticated user. Cannot save business profile.");
    }

    const updated = {
      ...updates,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    if (isSupabaseConfigured) {
      try {
        const dbPayload = transformBusinessToDB(updated, activeUserId);

        // Check if user already has an existing business record
        if (!dbPayload.id) {
          const { data: existing } = await supabase
            .from("businesses")
            .select("id")
            .eq("user_id", activeUserId)
            .order("updated_at", { ascending: false })
            .limit(1);

          if (existing && existing.length > 0) {
            dbPayload.id = existing[0].id;
          }
        }

        let queryResult;
        if (dbPayload.id) {
          queryResult = await supabase
            .from("businesses")
            .update(dbPayload)
            .eq("id", dbPayload.id)
            .eq("user_id", activeUserId)
            .select()
            .single();
        } else {
          queryResult = await supabase
            .from("businesses")
            .insert(dbPayload)
            .select()
            .single();
        }

        const { data, error } = queryResult;
        if (error) {
          console.error("Supabase business save error:", error);
          throw error;
        }

        const saved = transformBusinessFromDB(data);
        return saved;
      } catch (err) {
        console.error("Supabase updateBusinessProfile exception:", err);
        throw err;
      }
    }

    // Local storage only when Supabase is not configured
    const storageKey = `${STORAGE_KEYS.PROFILE}_${activeUserId}`;
    setStoredItem(storageKey, updated);
    return updated;
  },

  // Regulatory Requirements Catalog API - From Supabase
  async getRequirements() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("requirements").select("*");
        if (error) {
          console.error("Error fetching requirements from Supabase:", error);
          throw error;
        }
        if (data && data.length > 0) {
          const mapped = data.map(transformRequirementFromDB).filter(Boolean);
          // Augment with official knowledge base items not yet stored in DB
          OFFICIAL_KNOWLEDGE_BASE.forEach((kbItem) => {
            const exists = mapped.some(
              (m) =>
                m.id === kbItem.id ||
                m.requirement_id === kbItem.requirement_id ||
                m.id === kbItem.requirement_id
            );
            if (!exists) {
              mapped.push(transformRequirementFromDB(kbItem));
            }
          });
          return mapped;
        }
      } catch (err) {
        console.error("Supabase requirements query error:", err);
        throw err;
      }
    }
    return OFFICIAL_KNOWLEDGE_BASE.map(transformRequirementFromDB);
  },

  async getRequirementById(id) {
    const list = await this.getRequirements();
    return list.find((item) => item.id === id) || null;
  },

  // Business Requirements Junction API - Persisted in Supabase
  async getBusinessRequirements(businessId, userId) {
    const activeUserId = userId || (await this.getCurrentUser())?.id;
    if (isSupabaseConfigured && activeUserId) {
      try {
        let query = supabase.from("business_requirements").select("*").eq("user_id", activeUserId);
        if (businessId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(businessId)) {
          query = query.eq("business_id", businessId);
        }
        const { data, error } = await query;
        if (error) {
          console.warn("Supabase business_requirements read notice:", error);
          return [];
        }
        return data || [];
      } catch (err) {
        console.warn("Exception reading business_requirements from Supabase:", err);
        return [];
      }
    }
    return [];
  },

  async updateBusinessRequirement(businessId, requirementId, updates, userId) {
    const activeUserId = userId || (await this.getCurrentUser())?.id;
    if (isSupabaseConfigured && activeUserId && businessId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(businessId)) {
      try {
        const payload = {
          business_id: businessId,
          requirement_id: requirementId,
          user_id: activeUserId,
          status: updates.status || "pending",
          dossier_readiness: Number(updates.dossierReadiness) || 0,
          notes: updates.notes || "",
        };
        const { data, error } = await supabase
          .from("business_requirements")
          .upsert(payload, { onConflict: "business_id,requirement_id" })
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (err) {
        console.error("Supabase updateBusinessRequirement error:", err);
        throw err;
      }
    }
    return null;
  },

  // Documents API - Scoped to user and business in Supabase
  async getDocuments(businessId, userId) {
    const activeUserId = userId || (await this.getCurrentUser())?.id;

    if (isSupabaseConfigured && activeUserId) {
      try {
        let query = supabase.from("documents").select("*").eq("user_id", activeUserId);
        if (businessId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(businessId)) {
          query = query.eq("business_id", businessId);
        }
        const { data, error } = await query.order("created_at", { ascending: false });
        if (error) {
          console.error("Error reading documents from Supabase:", error);
          throw error;
        }
        return (data || []).map(transformDocFromDB);
      } catch (err) {
        console.error("Supabase getDocuments exception:", err);
        throw err;
      }
    }

    if (!isSupabaseConfigured) {
      const storageKey = activeUserId ? `${STORAGE_KEYS.DOCUMENTS}_${activeUserId}` : STORAGE_KEYS.DOCUMENTS;
      return getStoredItem(storageKey, []);
    }
    return [];
  },

  async uploadDocument(newDoc, businessId, userId) {
    const activeUserId = userId || (await this.getCurrentUser())?.id;
    if (!activeUserId) {
      throw new Error("User must be authenticated to upload statutory documents.");
    }

    const created = {
      id: `doc-${Date.now()}`,
      uploadedAt: new Date().toISOString().split("T")[0],
      status: "verified",
      verifiedBy: "Pre-Screening Verification",
      ...newDoc,
    };

    if (isSupabaseConfigured) {
      try {
        const payload = transformDocToDB(created, businessId, activeUserId);
        const { data, error } = await supabase.from("documents").insert(payload).select().single();
        if (error) {
          console.error("Supabase document insert error:", error);
          throw error;
        }
        return transformDocFromDB(data);
      } catch (err) {
        console.error("Supabase uploadDocument exception:", err);
        throw err;
      }
    }

    const storageKey = `${STORAGE_KEYS.DOCUMENTS}_${activeUserId}`;
    const docs = getStoredItem(storageKey, []);
    const updated = [created, ...docs];
    setStoredItem(storageKey, updated);
    return created;
  },

  // Compliance Tasks API - Scoped to user and business in Supabase
  async getComplianceTasks(businessId, userId) {
    const activeUserId = userId || (await this.getCurrentUser())?.id;

    if (isSupabaseConfigured && activeUserId) {
      try {
        let query = supabase.from("compliance_tasks").select("*").eq("user_id", activeUserId);
        if (businessId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(businessId)) {
          query = query.eq("business_id", businessId);
        }
        const { data, error } = await query;
        if (error) {
          console.error("Error reading compliance tasks from Supabase:", error);
          throw error;
        }
        return (data || []).map(transformTaskFromDB);
      } catch (err) {
        console.error("Supabase getComplianceTasks exception:", err);
        throw err;
      }
    }

    if (!isSupabaseConfigured) {
      const storageKey = activeUserId ? `${STORAGE_KEYS.COMPLIANCE}_${activeUserId}` : STORAGE_KEYS.COMPLIANCE;
      return getStoredItem(storageKey, []);
    }
    return [];
  },

  async updateComplianceTask(id, updates, businessId, userId) {
    const activeUserId = userId || (await this.getCurrentUser())?.id;
    if (!activeUserId) {
      throw new Error("User must be authenticated to update compliance tasks.");
    }

    if (isSupabaseConfigured) {
      try {
        const payload = transformTaskToDB({ id, ...updates }, businessId, activeUserId);
        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
          const { data, error } = await supabase
            .from("compliance_tasks")
            .update(payload)
            .eq("id", id)
            .eq("user_id", activeUserId)
            .select()
            .single();
          if (error) throw error;
          return transformTaskFromDB(data);
        } else {
          // If task was seeded by client engine, insert into Supabase compliance_tasks
          const { data, error } = await supabase
            .from("compliance_tasks")
            .insert(payload)
            .select()
            .single();
          if (error) throw error;
          return transformTaskFromDB(data);
        }
      } catch (err) {
        console.error("Supabase updateComplianceTask exception:", err);
        throw err;
      }
    }

    const storageKey = `${STORAGE_KEYS.COMPLIANCE}_${activeUserId}`;
    const list = getStoredItem(storageKey, []);
    const updatedList = list.map((item) => (item.id === id ? { ...item, ...updates } : item));
    setStoredItem(storageKey, updatedList);
    return updatedList;
  },

  // Government Support Schemes Catalog API - From Supabase
  async getGovernmentSupport() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from("support_schemes").select("*");
        if (error) {
          console.error("Error reading support schemes from Supabase:", error);
          throw error;
        }
        if (data && data.length > 0) {
          return data.map((item) => ({
            id: item.id,
            title: item.title,
            authority: item.authority,
            tier: item.tier || "State / Central Scheme",
            statusLabel: "Potentially Relevant",
            eligibilityNotice: "Eligibility to Check",
            matchScore: item.match_score || 90,
            sector: item.sector || "MSME",
            maxBenefit: item.max_benefit || "As per policy guidelines",
            applicationMode: item.application_mode || "Online Portal",
            nodalAgency: item.nodal_agency || item.authority,
            keyBenefits: Array.isArray(item.key_benefits) ? item.key_benefits : [],
            eligibilityChecklist: Array.isArray(item.eligible_criteria) && item.eligible_criteria.length > 0
              ? item.eligible_criteria.map((c) =>
                  typeof c === "string" ? { item: c, met: true } : c
                )
              : [
                  { item: "Valid Udyam Registration", met: true },
                  { item: "Operational in Maharashtra", met: true },
                  { item: "Detailed Project Report (DPR)", met: false },
                ],
            officialPortalUrl: item.scheme_portal || "https://maitri.mahaonline.gov.in",
            portalName: "Official Portal",
            nextStepNote: "Verify detailed guidelines and apply through the official nodal agency portal.",
          }));
        }
      } catch (err) {
        console.error("Supabase support schemes query exception:", err);
        throw err;
      }
    }
    return initialGovernmentSupport;
  },
};
