import React, { createContext, useContext, useState, useEffect } from "react";
import { apiService } from "../services/api";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import {
  generateRegulatoryIntelligence,
  DEMO_PROFILES,
  defaultBusinessProfile,
  INDUSTRY_SECTORS,
  BUSINESS_STAGES,
  BUSINESS_SIZES,
  MAHARASHTRA_DISTRICTS,
  INDUSTRY_OPERATIONS_MAP,
} from "../services/regulatoryEngine";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [businessProfile, setBusinessProfile] = useState(defaultBusinessProfile);
  const [requirements, setRequirements] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [complianceTasks, setComplianceTasks] = useState([]);
  const [governmentSupport, setGovernmentSupport] = useState([]);
  const [metrics, setMetrics] = useState({
    applicableRequirementsCount: 3,
    documentsReadyCount: 6,
    documentsReviewCount: 2,
    complianceUpcomingCount: 2,
    supportRelevantCount: 3,
  });
  const [primaryNextAction, setPrimaryNextAction] = useState(null);
  const [loading, setLoading] = useState(true);

  // Upload modal global state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadTargetRequirement, setUploadTargetRequirement] = useState(null);

  // Notification toast state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Re-generate all regulatory intelligence when profile changes
  const applyProfileIntelligence = (
    profile,
    customDocs = [],
    customTasks = [],
    dbReqs = [],
    dbSchemes = [],
    bizReqs = []
  ) => {
    // Generate dynamic regulatory intelligence from the Supabase master requirements knowledge base
    const intelligence = generateRegulatoryIntelligence(profile, dbReqs);

    // Merge baseline documents with user-uploaded docs
    const allDocs = [...customDocs];
    intelligence.documents.forEach((baselineDoc) => {
      if (!allDocs.some((d) => d.id === baselineDoc.id || d.name === baselineDoc.name)) {
        allDocs.push(baselineDoc);
      }
    });

    // Merge baseline compliance tasks with user updates
    const allTasks = intelligence.complianceTasks.map((t) => {
      const override = customTasks.find((ct) => ct.id === t.id || ct.title === t.title);
      return override ? { ...t, ...override } : t;
    });

    // Evaluated business-specific regulatory requirements from knowledge base merged with business_requirements
    const allRequirements = intelligence.requirements.map((req) => {
      const savedBizReq = (bizReqs || []).find(
        (br) => br.requirement_id === req.id || br.requirement_id === req.requirement_id
      );
      if (savedBizReq) {
        return {
          ...req,
          status: savedBizReq.status || req.status,
          dossierReadiness: savedBizReq.dossier_readiness ?? req.dossierReadiness,
          notes: savedBizReq.notes || req.notes,
        };
      }
      return req;
    });

    // Merge Supabase support schemes with dynamically matched schemes
    const allSchemes = intelligence.governmentSupport.map((scheme) => {
      const dbMatch = dbSchemes.find((ds) => ds.id === scheme.id);
      return dbMatch ? { ...scheme, ...dbMatch } : scheme;
    });

    setRequirements(allRequirements);
    setDocuments(allDocs);
    setComplianceTasks(allTasks);
    setGovernmentSupport(allSchemes);
    setMetrics(intelligence.metrics);
    setPrimaryNextAction(intelligence.primaryNextAction);
    return intelligence;
  };

  // Load user data and business context
  const loadUserData = async (activeUser) => {
    try {
      const userId = activeUser?.id;
      let activeProfile = null;

      if (userId) {
        try {
          activeProfile = await apiService.getBusinessProfile(userId);
        } catch (e) {
          console.warn("Could not load business profile from Supabase:", e);
        }
      }

      if (!activeProfile) {
        activeProfile = {
          ...defaultBusinessProfile,
          id: `biz-${Date.now()}`,
          legalName: activeUser?.fullName ? `${activeUser.fullName}'s Enterprise` : "ABC Foods Pvt. Ltd.",
          brandName: activeUser?.fullName ? `${activeUser.fullName}'s Business` : "ABC Foods",
          contactPerson: activeUser?.fullName || "Rajesh Sharma",
          email: activeUser?.email || "rajesh.sharma@abcfoods.in",
          isDemo: false,
        };
      }

      // Load user documents, compliance tasks, requirements, schemes, and business_requirements in parallel
      const [userDocs, userTasks, dbReqs, dbSchemes, bizReqs] = await Promise.all([
        userId ? apiService.getDocuments(activeProfile?.id, userId).catch(() => []) : [],
        userId ? apiService.getComplianceTasks(activeProfile?.id, userId).catch(() => []) : [],
        apiService.getRequirements().catch(() => []),
        apiService.getGovernmentSupport().catch(() => []),
        userId ? apiService.getBusinessRequirements(activeProfile?.id, userId).catch(() => []) : [],
      ]);

      setBusinessProfile(activeProfile);
      applyProfileIntelligence(activeProfile, userDocs, userTasks, dbReqs, dbSchemes, bizReqs);
    } catch (err) {
      console.error("Failed to load user business context:", err);
    }
  };

  useEffect(() => {
    let authListener = null;

    async function init() {
      try {
        setLoading(true);
        const currentUser = await apiService.getCurrentUser();
        setUser(currentUser);
        if (currentUser) {
          await loadUserData(currentUser);
        } else {
          // Default unauthenticated baseline intelligence
          applyProfileIntelligence(defaultBusinessProfile);
        }

        // Supabase Auth state change listener
        if (isSupabaseConfigured && supabase) {
          const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
            // Never log out on simple route navigation or tab re-focus
            if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED") {
              if (session?.user) {
                const refreshedUser = await apiService.getCurrentUser();
                setUser(refreshedUser);
                await loadUserData(refreshedUser);
              }
            } else if (event === "SIGNED_OUT") {
              // Double check if there is truly no session
              const { data: checkSession } = await supabase.auth.getSession().catch(() => ({ data: { session: null } }));
              if (!checkSession?.session) {
                setUser(null);
                setBusinessProfile(defaultBusinessProfile);
                applyProfileIntelligence(defaultBusinessProfile);
              }
            }
          });
          authListener = listener;
        }
      } catch (err) {
        console.error("Initial load error:", err);
      } finally {
        setLoading(false);
      }
    }

    init();

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const login = async (email, password) => {
    const loggedUser = await apiService.login(email, password);
    setUser(loggedUser);
    await loadUserData(loggedUser);
    showToast(`Signed in successfully as ${loggedUser.fullName || loggedUser.email}`);
    return loggedUser;
  };

  const register = async (fullName, email, password) => {
    const newUser = await apiService.register(fullName, email, password);
    setUser(newUser);
    // Initialize fresh business profile for the new user if they have an active session
    if (newUser.hasSession) {
      const initialProfile = {
        ...defaultBusinessProfile,
        legalName: `${fullName}'s Enterprise`,
        brandName: `${fullName}'s Business`,
        contactPerson: fullName,
        email: email,
        isDemo: false,
      };
      try {
        const saved = await apiService.updateBusinessProfile(initialProfile, newUser.id);
        setBusinessProfile(saved);
        applyProfileIntelligence(saved);
      } catch (err) {
        console.warn("Notice saving initial business profile:", err);
      }
    }
    showToast("Account created successfully.");
    return newUser;
  };

  const logout = async () => {
    await apiService.logout();
    setUser(null);
    setBusinessProfile(defaultBusinessProfile);
    applyProfileIntelligence(defaultBusinessProfile);
    showToast("Signed out successfully", "info");
  };

  const updateProfile = async (updates) => {
    if (!user?.id) {
      showToast("Please sign in to save your business profile to Supabase.", "warning");
      const updated = { ...businessProfile, ...updates, isDemo: false };
      setBusinessProfile(updated);
      applyProfileIntelligence(updated, documents, complianceTasks);
      return updated;
    }

    const updated = await apiService.updateBusinessProfile(
      {
        ...updates,
        isDemo: false,
      },
      user?.id
    );
    setBusinessProfile(updated);
    applyProfileIntelligence(updated, documents, complianceTasks);
    showToast(`Saved profile for ${updated.legalName} in Supabase.`);
    return updated;
  };

  const loadDemoProfile = async (presetKey = "abc_foods") => {
    const preset = DEMO_PROFILES[presetKey] || DEMO_PROFILES.abc_foods;
    if (user?.id) {
      try {
        const updated = await apiService.updateBusinessProfile(preset, user.id);
        setBusinessProfile(updated);

        // Seed initial documents and tasks into Supabase if none exist yet for this user
        const existingDocs = await apiService.getDocuments(updated.id, user.id);
        if (existingDocs.length === 0) {
          const sampleDocs = [
            { name: "Certificate of Incorporation.pdf", category: "Statutory Identity", docType: "Corporate Registration", size: "1.8 MB", status: "verified", notes: "Verified against CIN: U15400MH2024PTC419820" },
            { name: "MoA_and_AoA_Executed.pdf", category: "Statutory Identity", docType: "Constitutional Charter", size: "3.4 MB", status: "verified", notes: "Food Processing authorized" },
            { name: "MIDC_Ambad_Allotment_Lease_Deed.pdf", category: "Premises & Land", docType: "Land Tenure", size: "6.2 MB", status: "verified", notes: "Plot No. W-48, MIDC Ambad" },
            { name: "NABL_Water_Potability_Test_Report.pdf", category: "Environmental & Lab", docType: "Water Quality (IS 10500)", size: "1.5 MB", status: "verified", notes: "NABL Accredited test" },
          ];
          for (const d of sampleDocs) {
            await apiService.uploadDocument(d, updated.id, user.id).catch(() => {});
          }
        }

        const existingTasks = await apiService.getComplianceTasks(updated.id, user.id);
        if (existingTasks.length === 0) {
          const sampleTasks = [
            { title: "GSTR-3B Monthly Return Filing", frequency: "Monthly", dueDate: "2026-10-20", authority: "Goods & Services Tax Network (GSTN)", status: "Upcoming", urgency: "Action Pending", category: "Taxation & Financial", description: "Monthly summary return for outward supplies and input tax credit.", penaltyRisk: "Statutory late fee under GST regulations.", filingPortal: "https://www.gst.gov.in" },
            { title: "Maharashtra State Profession Tax (P-Tax) Return", frequency: "Monthly", dueDate: "2026-10-31", authority: "Maharashtra State Tax Department", status: "Upcoming", urgency: "Action Pending", category: "State Statutory Compliance", description: "Monthly professional tax deduction and remittance for salaried employees.", penaltyRisk: "Penalty of 2% per month plus statutory late fee.", filingPortal: "https://mahagst.gov.in" },
            { title: "Annual Environmental Statement (Form V)", frequency: "Annual", dueDate: "2026-09-30", authority: "Maharashtra Pollution Control Board (MPCB)", status: "Upcoming", urgency: "Action Pending", category: "Environmental Regulation", description: "Annual environmental audit statement submitted to Sub-Regional Officer under EPA 1986.", penaltyRisk: "Non-compliance triggers notice under Section 33A of Water Act.", filingPortal: "https://www.mpcb.gov.in" },
          ];
          for (const t of sampleTasks) {
            await apiService.updateComplianceTask(t.title, t, updated.id, user.id).catch(() => {});
          }
        }

        await loadUserData(user);
        showToast(`Loaded demo business context: ${preset.legalName} in Supabase`);
        return updated;
      } catch (err) {
        console.warn("Notice updating demo profile in Supabase:", err);
      }
    }

    setBusinessProfile(preset);
    applyProfileIntelligence(preset);
    showToast(`Loaded demo business context: ${preset.legalName}`);
    return preset;
  };

  const uploadDoc = async (docData) => {
    if (!user?.id) {
      showToast("Please sign in to upload and save documents to Supabase.", "warning");
      const localDoc = { id: `doc-${Date.now()}`, ...docData, uploadedAt: new Date().toISOString().split("T")[0] };
      setDocuments((prev) => [localDoc, ...prev]);
      return localDoc;
    }
    const newDoc = await apiService.uploadDocument(docData, businessProfile?.id, user?.id);
    setDocuments((prev) => [newDoc, ...prev.filter((d) => d.id !== newDoc.id)]);

    // Recalculate document counts
    setMetrics((prev) => ({
      ...prev,
      documentsReadyCount: prev.documentsReadyCount + 1,
      documentsReviewCount: Math.max(0, prev.documentsReviewCount - 1),
    }));

    showToast(`Saved to workspace: ${docData.name}`);
    return newDoc;
  };

  const updateRequirementStatus = async (requirementId, updates) => {
    if (businessProfile?.id && user?.id) {
      try {
        await apiService.updateBusinessRequirement(businessProfile.id, requirementId, updates, user.id);
      } catch (e) {
        console.warn("Could not save requirement status to Supabase:", e);
      }
    }
    setRequirements((prev) =>
      prev.map((r) =>
        r.id === requirementId || r.requirement_id === requirementId
          ? { ...r, ...updates }
          : r
      )
    );
  };

  const toggleComplianceStatus = async (taskId) => {
    const task = complianceTasks.find((t) => t.id === taskId);
    if (!task) return;
    const newStatus = task.status === "Completed" ? "Upcoming" : "Completed";
    if (user?.id) {
      try {
        const updatedTask = await apiService.updateComplianceTask(
          taskId,
          {
            status: newStatus,
            urgency: newStatus === "Completed" ? "Completed Today" : "Action Pending",
          },
          businessProfile?.id,
          user?.id
        );
        setComplianceTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, ...updatedTask } : t))
        );
        showToast(`Compliance marked as ${newStatus}`);
        return;
      } catch (e) {
        console.warn("Could not update task in Supabase:", e);
      }
    }

    setComplianceTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: newStatus, urgency: newStatus === "Completed" ? "Completed Today" : "Action Pending" }
          : t
      )
    );
    showToast(`Compliance marked as ${newStatus}`);
  };

  const openUploadModal = (targetReq = null) => {
    setUploadTargetRequirement(targetReq);
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
    setUploadTargetRequirement(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        businessProfile,
        requirements,
        documents,
        complianceTasks,
        governmentSupport,
        metrics,
        primaryNextAction,
        loading,
        toast,
        showToast,
        login,
        register,
        logout,
        updateProfile,
        loadDemoProfile,
        uploadDoc,
        updateRequirementStatus,
        toggleComplianceStatus,
        isUploadModalOpen,
        uploadTargetRequirement,
        openUploadModal,
        closeUploadModal,
        // Constants
        DEMO_PROFILES,
        INDUSTRY_SECTORS,
        BUSINESS_STAGES,
        BUSINESS_SIZES,
        MAHARASHTRA_DISTRICTS,
        INDUSTRY_OPERATIONS_MAP,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
