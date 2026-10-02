import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import AppLayout from "../components/layout/AppLayout";
import {
  Building2,
  MapPin,
  Factory,
  BadgeCheck,
  Save,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  Layers,
  HelpCircle,
  FileSpreadsheet,
  Cpu,
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
    legalName: businessProfile?.legalName || "",
    brandName: businessProfile?.brandName || "",
    sector: businessProfile?.sector || "Manufacturing",
    sectorCategory: businessProfile?.sectorCategory || "Industrial Manufacturing",
    classification: businessProfile?.classification || "Small",
    stage: businessProfile?.stage || "New Business",
    state: businessProfile?.state || "Maharashtra",
    district: businessProfile?.district || "Nashik",
    industrialArea: businessProfile?.industrialArea || "",
    plotNumber: businessProfile?.plotNumber || "",
    pinCode: businessProfile?.pinCode || "",
    operations: businessProfile?.operations || ["Machining & Fabrication"],
    workforceCount: businessProfile?.workforceCount ?? 20,
    connectedLoadHP: businessProfile?.connectedLoadHP ?? 25,
    plantMachineryInvestment: businessProfile?.plantMachineryInvestment ?? 10000000,
    annualTurnoverEstimated: businessProfile?.annualTurnoverEstimated ?? 30000000,
    udyamNumber: businessProfile?.udyamNumber || "",
    cin: businessProfile?.cin || "",
    pan: businessProfile?.pan || "",
    gstin: businessProfile?.gstin || "",
    contactPerson: businessProfile?.contactPerson || "",
    designation: businessProfile?.designation || "Managing Director",
    email: businessProfile?.email || "",
    phone: businessProfile?.phone || "",
  });

  const [isSaving, setIsSaving] = useState(false);

  // Sync formData whenever businessProfile updates from Supabase or context
  useEffect(() => {
    if (businessProfile) {
      setFormData({
        legalName: businessProfile.legalName || "",
        brandName: businessProfile.brandName || "",
        sector: businessProfile.sector || "Manufacturing",
        sectorCategory: businessProfile.sectorCategory || `${businessProfile.sector || "Industrial"} Operations`,
        classification: businessProfile.classification || "Small",
        stage: businessProfile.stage || "New Business",
        state: businessProfile.state || "Maharashtra",
        district: businessProfile.district || "Nashik",
        industrialArea: businessProfile.industrialArea || "",
        plotNumber: businessProfile.plotNumber || "",
        pinCode: businessProfile.pinCode || "",
        operations: businessProfile.operations || [],
        workforceCount: businessProfile.workforceCount ?? 20,
        connectedLoadHP: businessProfile.connectedLoadHP ?? 25,
        plantMachineryInvestment: businessProfile.plantMachineryInvestment ?? 10000000,
        annualTurnoverEstimated: businessProfile.annualTurnoverEstimated ?? 30000000,
        udyamNumber: businessProfile.udyamNumber || "",
        cin: businessProfile.cin || "",
        pan: businessProfile.pan || "",
        gstin: businessProfile.gstin || "",
        contactPerson: businessProfile.contactPerson || "",
        designation: businessProfile.designation || "Managing Director",
        email: businessProfile.email || "",
        phone: businessProfile.phone || "",
      });
    }
  }, [businessProfile]);

  // When industry changes, reset operations if previous operations don't match the new sector
  const handleSectorChange = (newSector) => {
    const availableOps = INDUSTRY_OPERATIONS_MAP[newSector] || INDUSTRY_OPERATIONS_MAP["Other"];
    setFormData((prev) => ({
      ...prev,
      sector: newSector,
      // Default to first 2-3 available operations
      operations: availableOps.slice(0, 3),
      sectorCategory: `${newSector} Operations & Services`,
    }));
  };

  const handleOperationToggle = (op) => {
    setFormData((prev) => {
      const exists = prev.operations.includes(op);
      return {
        ...prev,
        operations: exists
          ? prev.operations.filter((item) => item !== op)
          : [...prev.operations, op],
      };
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLoadPreset = async (key) => {
    await loadDemoProfile(key);
  };

  const handleStartBlank = () => {
    setFormData({
      legalName: "",
      brandName: "",
      sector: "Manufacturing",
      sectorCategory: "Industrial Manufacturing",
      classification: "Micro",
      stage: "Idea / Planning",
      state: "Maharashtra",
      district: "Pune",
      industrialArea: "",
      plotNumber: "",
      pinCode: "",
      operations: ["Machining & Fabrication"],
      workforceCount: 10,
      connectedLoadHP: 15,
      plantMachineryInvestment: 5000000,
      annualTurnoverEstimated: 15000000,
      udyamNumber: "",
      cin: "",
      pan: "",
      gstin: "",
      contactPerson: "",
      designation: "Proprietor / Director",
      email: "",
      phone: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.legalName) {
      alert("Please enter a Business Name");
      return;
    }
    setIsSaving(true);
    try {
      await updateProfile(formData);
      // Flow: Business Profile -> Dashboard
      navigate("/dashboard");
    } finally {
      setIsSaving(false);
    }
  };

  const currentAvailableOperations =
    INDUSTRY_OPERATIONS_MAP[formData.sector] || INDUSTRY_OPERATIONS_MAP["Other"];

  return (
    <AppLayout>
      <div className="flex flex-col space-y-space-lg max-w-6xl mx-auto pb-12">
        {/* Breadcrumb & Phase Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-outline-variant pb-3">
          <div className="flex items-center gap-2 font-code-statutory text-code-statutory text-on-surface-variant">
            <span>Overview</span>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">Business Profile Configuration</span>
            <span className="text-outline-variant">|</span>
            <span className="px-2 py-0.5 rounded bg-primary-fixed text-primary-container font-semibold text-[11px]">
              Step 2 of 2 (Enterprise Mapping Engine)
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-outline">
            <span>Reference ID:</span>
            <span className="font-mono font-bold text-primary px-2 py-0.5 bg-surface-container rounded">
              {businessProfile?.referenceId || "MH-2024-REG"}
            </span>
          </div>
        </div>

        {/* DEMO DATA NOTICE & PRESET SWITCHER */}
        <div className="p-4 rounded bg-surface-container-low border border-outline-variant/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded bg-primary-container text-on-primary flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4 text-secondary-container" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-md text-xs font-bold uppercase text-primary tracking-wider">
                  Configurable Enterprise Profile
                </span>
                {businessProfile?.isDemo !== false && (
                  <span className="px-2 py-0.2 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 uppercase">
                    Sample Demo Data Active
                  </span>
                )}
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                UdyamSetu supports all industries across Maharashtra. You can configure your own business profile below, or switch between pre-configured sector templates.
              </p>
            </div>
          </div>

          {/* Quick Demo Template Switcher */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <span className="text-[11px] font-bold text-outline uppercase tracking-wider">
              Presets:
            </span>
            <button
              type="button"
              onClick={() => handleLoadPreset("abc_foods")}
              className="px-2.5 py-1 text-xs bg-surface-container-lowest border border-outline-variant rounded hover:border-primary text-primary font-medium"
            >
              ABC Foods (Food Processing)
            </button>
            <button
              type="button"
              onClick={() => handleLoadPreset("pune_tech")}
              className="px-2.5 py-1 text-xs bg-surface-container-lowest border border-outline-variant rounded hover:border-primary text-primary font-medium"
            >
              CloudSoft (IT / Software)
            </button>
            <button
              type="button"
              onClick={() => handleLoadPreset("nagpur_mfg")}
              className="px-2.5 py-1 text-xs bg-surface-container-lowest border border-outline-variant rounded hover:border-primary text-primary font-medium"
            >
              Vidarbha Forging (Mfg)
            </button>
            <button
              type="button"
              onClick={handleStartBlank}
              className="px-2.5 py-1 text-xs bg-secondary text-on-secondary rounded hover:bg-on-secondary-container font-semibold"
            >
              + Create From Scratch
            </button>
          </div>
        </div>

        {/* Page Title & Context Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-[26px] text-primary tracking-tight font-bold">
              Business Profile & Regulatory Parameters
            </h1>
            <p className="font-body-md text-sm text-on-surface-variant mt-0.5">
              Configuring your sector, scale, and operations generates your business-specific regulatory roadmap, mandatory documents, compliance calendar, and government subsidies.
            </p>
          </div>
        </div>

        {/* MAIN FORM */}
        <form onSubmit={handleSubmit} className="space-y-space-md">
          {/* SECTION 1: CORE BUSINESS ATTRIBUTES (THE 6 REQUIRED FIELDS) */}
          <section className="bg-surface-container-lowest rounded border border-outline-variant p-space-md shadow-xs">
            <div className="flex items-center gap-2.5 pb-3 border-b border-outline-variant mb-4">
              <Building2 className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-headline-sm text-base font-bold text-primary">
                  1. Enterprise Core Identity & Sector
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Defines statutory department jurisdiction and legal clearance classification.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* 1. Business Name */}
              <div className="lg:col-span-2">
                <label className="block font-label-md text-xs font-semibold text-on-surface mb-1">
                  1. Business Name / Entity Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.legalName}
                  onChange={(e) => {
                    handleInputChange("legalName", e.target.value);
                    if (!formData.brandName || formData.brandName === formData.legalName) {
                      handleInputChange("brandName", e.target.value);
                    }
                  }}
                  placeholder="e.g. Acme Precision Tools Pvt. Ltd."
                  className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded text-sm text-on-surface font-medium focus:outline-none focus:border-primary-container"
                />
              </div>

              {/* Trade / Brand Name */}
              <div>
                <label className="block font-label-md text-xs font-semibold text-on-surface mb-1">
                  Trading Name / Brand
                </label>
                <input
                  type="text"
                  value={formData.brandName}
                  onChange={(e) => handleInputChange("brandName", e.target.value)}
                  placeholder="e.g. Acme Tools"
                  className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded text-sm text-on-surface focus:outline-none focus:border-primary-container"
                />
              </div>

              {/* 2. Industry / Sector */}
              <div>
                <label className="block font-label-md text-xs font-semibold text-on-surface mb-1">
                  2. Industry / Sector <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => handleSectorChange(e.target.value)}
                  className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded text-sm text-on-surface font-semibold focus:outline-none focus:border-primary-container"
                >
                  {INDUSTRY_SECTORS.map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-secondary font-medium mt-0.5 block">
                  Maps statutory bodies (FSSAI, DISH, MPCB, STPI, RERA)
                </span>
              </div>

              {/* 3. Business Stage */}
              <div>
                <label className="block font-label-md text-xs font-semibold text-on-surface mb-1">
                  3. Business Stage <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.stage}
                  onChange={(e) => handleInputChange("stage", e.target.value)}
                  className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded text-sm text-on-surface focus:outline-none focus:border-primary-container"
                >
                  {BUSINESS_STAGES.map((stg) => (
                    <option key={stg} value={stg}>
                      {stg}
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-outline mt-0.5 block">
                  Determines pre-operational vs recurring filings
                </span>
              </div>

              {/* 5. Business Size */}
              <div>
                <label className="block font-label-md text-xs font-semibold text-on-surface mb-1">
                  4. Business Size (MSME Scale) <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.classification}
                  onChange={(e) => handleInputChange("classification", e.target.value)}
                  className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded text-sm text-on-surface font-semibold focus:outline-none focus:border-primary-container"
                >
                  {BUSINESS_SIZES.map((sz) => (
                    <option key={sz} value={sz}>
                      {sz} Enterprise
                    </option>
                  ))}
                </select>
                <span className="text-[11px] text-outline mt-0.5 block">
                  Micro (&lt; ₹1 Cr) • Small (&lt; ₹10 Cr) • Medium (&lt; ₹50 Cr)
                </span>
              </div>
            </div>
          </section>

          {/* SECTION 2: LOCATION & STATE JURISDICTION */}
          <section className="bg-surface-container-lowest rounded border border-outline-variant p-space-md shadow-xs">
            <div className="flex items-center gap-2.5 pb-3 border-b border-outline-variant mb-4">
              <MapPin className="w-5 h-5 text-secondary" />
              <div>
                <h3 className="font-headline-sm text-base font-bold text-primary">
                  2. Location & Siting Jurisdiction
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Determines municipal bylaws, District Industries Centre (DIC), and Maharashtra PSI 2019 sub-zone incentives.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* State */}
              <div>
                <label className="block font-label-md text-xs font-semibold text-on-surface mb-1">
                  State Jurisdiction <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="w-full h-10 px-3 bg-surface-container border border-outline-variant rounded text-sm text-on-surface font-semibold"
                >
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </div>

              {/* District / City */}
              <div>
                <label className="block font-label-md text-xs font-semibold text-on-surface mb-1">
                  District / City <span className="text-red-600">*</span>
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => handleInputChange("district", e.target.value)}
                  className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded text-sm text-on-surface font-medium focus:outline-none focus:border-primary-container"
                >
                  {MAHARASHTRA_DISTRICTS.map((dst) => (
                    <option key={dst} value={dst}>
                      {dst}
                    </option>
                  ))}
                </select>
              </div>

              {/* Industrial Area / MIDC / IT Park */}
              <div>
                <label className="block font-label-md text-xs font-semibold text-on-surface mb-1">
                  Industrial Area / Zone / Tech Park
                </label>
                <input
                  type="text"
                  value={formData.industrialArea}
                  onChange={(e) => handleInputChange("industrialArea", e.target.value)}
                  placeholder="e.g. MIDC Industrial Zone / Hinjawadi Phase 1"
                  className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded text-sm text-on-surface focus:outline-none focus:border-primary-container"
                />
              </div>

              {/* Plot / Address */}
              <div className="md:col-span-2">
                <label className="block font-label-md text-xs font-semibold text-on-surface mb-1">
                  Premises Street Address & Plot Number
                </label>
                <input
                  type="text"
                  value={formData.plotNumber}
                  onChange={(e) => handleInputChange("plotNumber", e.target.value)}
                  placeholder="e.g. Plot No. 42, Sector 5 / Office 302, Business Center"
                  className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded text-sm text-on-surface focus:outline-none focus:border-primary-container"
                />
              </div>

              {/* PIN Code */}
              <div>
                <label className="block font-label-md text-xs font-semibold text-on-surface mb-1">
                  PIN Code
                </label>
                <input
                  type="text"
                  value={formData.pinCode}
                  onChange={(e) => handleInputChange("pinCode", e.target.value)}
                  placeholder="e.g. 422010"
                  className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded text-sm text-on-surface font-mono focus:outline-none focus:border-primary-container"
                />
              </div>
            </div>
          </section>

          {/* SECTION 3: OPERATIONS (DYNAMICALLY TAILORED TO SELECTED INDUSTRY) */}
          <section className="bg-surface-container-lowest rounded border border-outline-variant p-space-md shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-4">
              <div className="flex items-center gap-2.5">
                <Factory className="w-5 h-5 text-primary-container" />
                <div>
                  <h3 className="font-headline-sm text-base font-bold text-primary">
                    3. Enterprise Operations & Activities ({formData.sector})
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Select the active operational activities for your business. Specific permits are triggered based on these selections.
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-secondary px-2 py-0.5 rounded bg-secondary-container/40">
                {formData.operations.length} Selected
              </span>
            </div>

            {/* Operations Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {currentAvailableOperations.map((op) => {
                const isChecked = formData.operations.includes(op);
                return (
                  <div
                    key={op}
                    onClick={() => handleOperationToggle(op)}
                    className={`p-3 rounded border cursor-pointer flex items-start gap-2.5 transition-colors ${
                      isChecked
                        ? "bg-secondary-container/20 border-secondary text-primary font-semibold"
                        : "bg-surface-container-low border-outline-variant text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 w-4 h-4 text-secondary accent-[#166b55] cursor-pointer"
                    />
                    <div className="flex-1">
                      <span className="text-xs block font-semibold leading-tight">{op}</span>
                      <span className="text-[10px] text-outline font-normal">
                        Active operational permit trigger
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Threshold parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 mt-4 border-t border-surface-variant">
              <div>
                <label className="block font-label-md text-xs font-semibold text-on-surface mb-1">
                  Estimated Workforce (Employees)
                </label>
                <input
                  type="number"
                  value={formData.workforceCount}
                  onChange={(e) => handleInputChange("workforceCount", parseInt(e.target.value) || 0)}
                  className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded text-sm text-on-surface focus:outline-none focus:border-primary-container"
                />
                <span className="text-[11px] text-secondary font-medium">
                  {formData.workforceCount >= 20 ? "Triggers Factories Act provisions" : "Under Shops & Est. limits"}
                </span>
              </div>

              <div>
                <label className="block font-label-md text-xs font-semibold text-on-surface mb-1">
                  Connected Power Load (Horsepower HP)
                </label>
                <input
                  type="number"
                  value={formData.connectedLoadHP}
                  onChange={(e) => handleInputChange("connectedLoadHP", parseInt(e.target.value) || 0)}
                  className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded text-sm text-on-surface focus:outline-none focus:border-primary-container"
                />
                <span className="text-[11px] text-outline">
                  Sanctioned electricity demand
                </span>
              </div>

              <div>
                <label className="block font-label-md text-xs font-semibold text-on-surface mb-1">
                  Plant, Machinery / Hardware Outlay (₹)
                </label>
                <input
                  type="number"
                  value={formData.plantMachineryInvestment}
                  onChange={(e) => handleInputChange("plantMachineryInvestment", parseInt(e.target.value) || 0)}
                  className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded text-sm text-on-surface font-mono focus:outline-none focus:border-primary-container"
                />
                <span className="text-[11px] text-secondary font-medium">
                  Qualifies for ~40-50% PSI Capital Subsidy
                </span>
              </div>
            </div>
          </section>

          {/* SECTION 4: STATUTORY REGISTRATIONS (OPTIONAL / EDITABLE) */}
          <section className="bg-surface-container-lowest rounded border border-outline-variant p-space-md shadow-xs">
            <div className="flex items-center gap-2.5 pb-3 border-b border-outline-variant mb-4">
              <BadgeCheck className="w-5 h-5 text-secondary" />
              <div>
                <h3 className="font-headline-sm text-base font-bold text-primary">
                  4. Statutory Identifiers & Tax Numbers (If Available)
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Leave empty if starting a new business; enter if already incorporated.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-label-md text-xs font-semibold text-on-surface mb-1">
                  Udyam Registration Number
                </label>
                <input
                  type="text"
                  value={formData.udyamNumber}
                  onChange={(e) => handleInputChange("udyamNumber", e.target.value)}
                  placeholder="UDYAM-MH-XX-XXXXXXX"
                  className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded text-sm text-on-surface font-mono focus:outline-none focus:border-primary-container"
                />
              </div>

              <div>
                <label className="block font-label-md text-xs font-semibold text-on-surface mb-1">
                  PAN Number
                </label>
                <input
                  type="text"
                  value={formData.pan}
                  onChange={(e) => handleInputChange("pan", e.target.value)}
                  placeholder="e.g. AABCA9128K"
                  className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded text-sm text-on-surface font-mono focus:outline-none focus:border-primary-container"
                />
              </div>

              <div>
                <label className="block font-label-md text-xs font-semibold text-on-surface mb-1">
                  GSTIN
                </label>
                <input
                  type="text"
                  value={formData.gstin}
                  onChange={(e) => handleInputChange("gstin", e.target.value)}
                  placeholder="e.g. 27AABCA9128K1Z3"
                  className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded text-sm text-on-surface font-mono focus:outline-none focus:border-primary-container"
                />
              </div>
            </div>
          </section>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <ShieldAlert className="w-4 h-4 text-secondary" />
              <span>
                Saving recomputes your <strong>{formData.sector}</strong> regulatory roadmap, required permits, documents vault, and subsidies in real time.
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="h-11 px-5 rounded border border-outline text-on-surface text-sm font-semibold hover:bg-surface-container transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="h-11 px-6 rounded bg-primary-container text-on-primary text-sm font-semibold hover:bg-primary transition-colors flex items-center gap-2 shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Compiling Roadmap..." : "Save Profile & Generate Roadmap"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
