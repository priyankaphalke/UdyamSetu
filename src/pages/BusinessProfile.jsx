import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import AppLayout from "../components/layout/AppLayout";
import {
  Building2,
  MapPin,
  Factory,
  Save,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Info,
} from "lucide-react";

export default function BusinessProfile() {
  const navigate = useNavigate();
  const {
    businessProfile,
    updateProfile,
    loadDemoProfile,
    INDUSTRY_SECTORS,
    BUSINESS_STAGES,
    BUSINESS_SIZES,
    MAHARASHTRA_DISTRICTS,
    INDUSTRY_OPERATIONS_MAP,
  } = useApp();

  const [formData, setFormData] = useState({
    legalName: businessProfile?.legalName || "ABC Foods Pvt. Ltd.",
    brandName: businessProfile?.brandName || "ABC Foods",
    sector: businessProfile?.sector || "Food Processing",
    classification: businessProfile?.classification || "Small",
    stage: businessProfile?.stage || "New Business",
    state: businessProfile?.state || "Maharashtra",
    district: businessProfile?.district || "Nashik",
    industrialArea: businessProfile?.industrialArea || "Ambad MIDC",
    operations: businessProfile?.operations || ["Manufacturing", "Packaging", "Storage"],
    workforceCount: businessProfile?.workforceCount ?? 20,
    connectedLoadHP: businessProfile?.connectedLoadHP ?? 25,
    annualTurnoverEstimated: businessProfile?.annualTurnoverEstimated ?? 30000000,
    contactPerson: businessProfile?.contactPerson || "Rajesh Sharma",
    email: businessProfile?.email || "rajesh.sharma@abcfoods.in",
    phone: businessProfile?.phone || "+91 98230 11223",
  });

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    if (businessProfile) {
      setFormData((prev) => ({
        ...prev,
        ...businessProfile,
        operations: Array.isArray(businessProfile.operations)
          ? businessProfile.operations
          : ["Manufacturing", "Packaging", "Storage"],
      }));
    }
  }, [businessProfile]);

  // Available operations for the selected sector
  const availableOps =
    INDUSTRY_OPERATIONS_MAP?.[formData.sector] || [
      "Manufacturing",
      "Packaging",
      "Storage",
      "Cold Storage",
      "Wholesale Distribution",
      "Retail Sale",
      "Import / Export",
    ];

  const handleOperationToggle = (op) => {
    setFormData((prev) => {
      const exists = prev.operations.includes(op);
      const updated = exists
        ? prev.operations.filter((o) => o !== op)
        : [...prev.operations, op];
      return { ...prev, operations: updated.length ? updated : [op] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(formData);
      setSuccessMsg(true);
      setTimeout(() => {
        navigate("/roadmap");
      }, 500);
    } catch (err) {
      console.error("Error saving business profile:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Heading */}
        <div className="bg-white border border-[#D8DEE4] rounded p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8DEE4]">
            <div>
              <span className="text-[11px] font-bold text-[#0B4F71] uppercase tracking-wider px-2 py-0.5 rounded bg-[#e3f0f8] border border-[#b8d7eb]">
                Business Information
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-[#12304A] font-serif mt-1.5">
                Tell us about your business
              </h1>
              <p className="text-xs sm:text-sm text-[#495057] mt-0.5">
                Enter your basic business details to map your applicable statutory requirements, necessary documents, and compliance schedule in Maharashtra.
              </p>
            </div>

            {/* Quick Demo Sample Picker */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  loadDemoProfile("abc_foods");
                  setSuccessMsg(true);
                  setTimeout(() => setSuccessMsg(false), 2000);
                }}
                className="px-3 py-1.5 rounded bg-[#F5F7F8] hover:bg-[#e3f0f8] border border-[#D8DEE4] text-xs font-semibold text-[#12304A] transition-colors"
                title="Load sample Nashik Food Processing profile"
              >
                Reset to ABC Foods Demo
              </button>
            </div>
          </div>

          {successMsg && (
            <div className="mt-4 p-3 rounded bg-[#e1f5ee] border border-[#a2e0cb] text-[#176B55] text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Business profile saved. Updating regulatory journey...</span>
            </div>
          )}
        </div>

        {/* Main Simple Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white border border-[#D8DEE4] rounded p-5 sm:p-6 shadow-xs space-y-5">
            {/* Field: Business Legal Name */}
            <div>
              <label className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-1">
                Business Legal Name *
              </label>
              <input
                type="text"
                required
                value={formData.legalName}
                onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                placeholder="e.g. ABC Foods Pvt. Ltd."
                className="w-full px-3.5 py-2.5 rounded border border-[#D8DEE4] bg-white text-sm text-[#263238] focus:outline-hidden focus:border-[#0B4F71]"
              />
            </div>

            {/* Grid: Industry & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field 1: Industry */}
              <div>
                <label className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-1">
                  Industry *
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded border border-[#D8DEE4] bg-white text-sm text-[#263238] focus:outline-hidden focus:border-[#0B4F71]"
                >
                  {(INDUSTRY_SECTORS || [
                    "Food Processing",
                    "Manufacturing",
                    "Textiles",
                    "Pharmaceuticals",
                    "IT / Software",
                    "Agriculture / Agro-processing",
                    "Other",
                  ]).map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-[#8c96a0] mt-1 block">
                  Determines statutory clearances like FSSAI, DISH, and pollution categories.
                </span>
              </div>

              {/* Field 2: Location */}
              <div>
                <label className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-1">
                  Location (District in Maharashtra) *
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded border border-[#D8DEE4] bg-white text-sm text-[#263238] focus:outline-hidden focus:border-[#0B4F71]"
                >
                  {(MAHARASHTRA_DISTRICTS || [
                    "Nashik",
                    "Pune",
                    "Mumbai City",
                    "Mumbai Suburban",
                    "Thane",
                    "Nagpur",
                    "Chhatrapati Sambhajinagar",
                    "Kolhapur",
                    "Solapur",
                    "Satara",
                    "Ahmednagar",
                    "Jalgaon",
                  ]).map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}, Maharashtra
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-[#8c96a0] mt-1 block">
                  Maps local District Industries Centre (DIC) and municipal jurisdictions.
                </span>
              </div>
            </div>

            {/* Grid: Business Stage & Business Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field 3: Business Stage */}
              <div>
                <label className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-1">
                  Business Stage *
                </label>
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded border border-[#D8DEE4] bg-white text-sm text-[#263238] focus:outline-hidden focus:border-[#0B4F71]"
                >
                  {(BUSINESS_STAGES || [
                    "Idea / Planning",
                    "New Business",
                    "Existing Business",
                    "Expansion",
                  ]).map((stg) => (
                    <option key={stg} value={stg}>
                      {stg}
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-[#8c96a0] mt-1 block">
                  Identifies pre-construction vs operational licensing requirements.
                </span>
              </div>

              {/* Field 4: Business Size */}
              <div>
                <label className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-1">
                  Business Size *
                </label>
                <select
                  value={formData.classification}
                  onChange={(e) => setFormData({ ...formData, classification: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded border border-[#D8DEE4] bg-white text-sm text-[#263238] focus:outline-hidden focus:border-[#0B4F71]"
                >
                  {(BUSINESS_SIZES || ["Micro", "Small", "Medium", "Large"]).map((sz) => (
                    <option key={sz} value={sz}>
                      {sz} MSME
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-[#8c96a0] mt-1 block">
                  Micro (&lt;₹1 Cr inv), Small (&lt;₹10 Cr inv), Medium (&lt;₹50 Cr inv).
                </span>
              </div>
            </div>

            {/* Field 5: Operations */}
            <div>
              <label className="block text-xs font-bold text-[#12304A] uppercase tracking-wider mb-1.5">
                Operations Carried Out on Premises *
              </label>
              <p className="text-xs text-[#495057] mb-2.5">
                Select all activities conducted at this facility. Specific operations trigger specialized clearances.
              </p>
              <div className="flex flex-wrap gap-2">
                {availableOps.map((op) => {
                  const selected = formData.operations.includes(op);
                  return (
                    <button
                      key={op}
                      type="button"
                      onClick={() => handleOperationToggle(op)}
                      className={`px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${
                        selected
                          ? "bg-[#0B4F71] text-white border-[#0B4F71]"
                          : "bg-white text-[#495057] border-[#D8DEE4] hover:bg-[#F5F7F8]"
                      }`}
                    >
                      {selected ? "✓ " : "+ "}
                      {op}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Operational Thresholds (Workforce & Power) */}
            <div className="pt-4 border-t border-[#D8DEE4]">
              <div className="text-xs font-bold text-[#12304A] uppercase tracking-wider mb-2">
                Operating Parameters (Optional / Threshold Rules)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-[#495057] mb-1">
                    Number of Employees
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.workforceCount}
                    onChange={(e) =>
                      setFormData({ ...formData, workforceCount: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded border border-[#D8DEE4] text-xs text-[#263238]"
                  />
                  <span className="text-[10px] text-[#8c96a0]">10+ triggers Gumasta / DISH review</span>
                </div>

                <div>
                  <label className="block text-xs text-[#495057] mb-1">
                    Connected Electric Power (HP)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.connectedLoadHP}
                    onChange={(e) =>
                      setFormData({ ...formData, connectedLoadHP: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded border border-[#D8DEE4] text-xs text-[#263238]"
                  />
                  <span className="text-[10px] text-[#8c96a0]">&gt;25 HP triggers MPCB CTE check</span>
                </div>

                <div>
                  <label className="block text-xs text-[#495057] mb-1">
                    Industrial Area / MIDC
                  </label>
                  <input
                    type="text"
                    value={formData.industrialArea}
                    onChange={(e) => setFormData({ ...formData, industrialArea: e.target.value })}
                    placeholder="e.g. Ambad MIDC"
                    className="w-full px-3 py-2 rounded border border-[#D8DEE4] text-xs text-[#263238]"
                  />
                  <span className="text-[10px] text-[#8c96a0]">MIDC zone drainage verification</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-[#D8DEE4] rounded p-4 shadow-xs">
            <span className="text-xs text-[#495057]">
              All details are stored in your secure Supabase enterprise profile.
            </span>

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded bg-[#0B4F71] hover:bg-[#12304A] text-white font-semibold text-sm transition-colors shadow-xs"
            >
              {saving ? (
                <span>Building Journey...</span>
              ) : (
                <>
                  <span>Build My Regulatory Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
