import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import AppLayout from "../components/layout/AppLayout";
import HandoffCard from "../components/common/HandoffCard";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  UploadCloud,
  Building2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export default function RequirementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { requirements, openUploadModal, showToast, businessProfile } = useApp();

  const req = requirements.find((r) => r.id === id) || requirements[0];

  if (!req) {
    return (
      <AppLayout>
        <div className="bg-white border border-[#D8DEE4] rounded p-8 text-center space-y-4">
          <p className="text-sm text-[#495057]">Requirement not found.</p>
          <Link
            to="/roadmap"
            className="text-xs font-semibold text-[#0B4F71] hover:underline"
          >
            ← Return to My Regulatory Journey
          </Link>
        </div>
      </AppLayout>
    );
  }

  const status = req.ruleStatus || req.matchStatus || "APPLICABLE";
  const isApplicable = status === "APPLICABLE";
  const docs = req.required_documents || req.mandatory_records || [];
  const portalUrl = req.portal_url || req.official_source_url || req.portalUrl || "https://maharashtra.gov.in";
  const portalName = req.portal_name || req.portalName || "Official Government Portal";

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B4F71] hover:text-[#12304A]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to My Regulatory Journey</span>
          </Link>

          <span className="text-[11px] text-[#8c96a0]">
            Entity: <strong className="text-[#263238]">{businessProfile?.legalName}</strong>
          </span>
        </div>

        {/* Main Requirement Detail Card */}
        <div className="bg-white border border-[#D8DEE4] rounded p-5 sm:p-7 shadow-xs space-y-6">
          {/* 1. REQUIREMENT NAME */}
          <div className="border-b border-[#D8DEE4] pb-4 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#0B4F71] uppercase tracking-wider px-2 py-0.5 rounded bg-[#e3f0f8] border border-[#b8d7eb]">
                {req.category || "Statutory Clearance"}
              </span>
              <span className="text-xs text-[#8c96a0]">
                {req.stage || "Stage: Approvals"}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-[#12304A] font-serif">
              {req.title || req.name}
            </h1>

            <div className="text-xs text-[#495057]">
              Authority: <strong className="text-[#263238] font-medium">{req.department}</strong> •{" "}
              <span>{req.act}</span>
            </div>
          </div>

          {/* 2. APPLICABLE TO YOUR BUSINESS */}
          <div className="p-4 rounded bg-[#e1f5ee] border border-[#a2e0cb] space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#176B55] shrink-0" />
              <span className="font-bold text-xs sm:text-sm text-[#176B55]">
                Applicable to your business
              </span>
              <span className="text-xs text-[#0f4738]">
                ({businessProfile?.legalName} • {businessProfile?.sector}, {businessProfile?.district})
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#a2e0cb]/60 text-xs text-[#0f4738]">
              <div>
                <div className="text-[10px] uppercase font-bold text-[#176B55]">Estimated Fee</div>
                <div className="font-semibold text-sm mt-0.5">
                  {typeof req.estimatedFee === "number"
                    ? `₹${req.estimatedFee.toLocaleString("en-IN")}`
                    : req.estimatedFee || "As per official schedule"}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-bold text-[#176B55]">Timeline</div>
                <div className="font-semibold text-sm mt-0.5">
                  {req.estimatedTimeline || req.estimated_timeline || "30-45 working days"}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-bold text-[#176B55]">Validity</div>
                <div className="font-semibold text-sm mt-0.5">
                  {req.validity || (req.validity_years ? `${req.validity_years} Years` : "Permanent")}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-bold text-[#176B55]">Inspection</div>
                <div className="font-semibold text-sm mt-0.5">
                  {req.inspectionRequired || req.inspection_required || "Department Verification"}
                </div>
              </div>
            </div>
          </div>

          {/* 3. WHY THIS APPLIES */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#12304A]">
              Why this applies
            </h2>
            <div className="p-3.5 rounded bg-[#F5F7F8] border border-[#D8DEE4] text-xs text-[#263238] leading-relaxed">
              {req.whyItMayApply ||
                req.whyItApplies ||
                req.statutory_triggers ||
                "Mandatory requirement based on your business operations, facility location, and production capacity in Maharashtra."}
            </div>
          </div>

          {/* 4. REQUIRED DOCUMENTS */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#12304A]">
                Required Documents ({docs.length})
              </h2>
              <button
                onClick={() => openUploadModal(req.id)}
                className="text-xs font-semibold text-[#0B4F71] hover:underline"
              >
                + Upload Documents
              </button>
            </div>

            <div className="divide-y divide-[#D8DEE4] border border-[#D8DEE4] rounded">
              {docs.map((doc, idx) => {
                const docName = typeof doc === "string" ? doc : doc.name || doc.title || "Required Document";
                const isVerified = doc.status === "verified";

                return (
                  <div
                    key={idx}
                    className="p-3 flex items-center justify-between gap-3 text-xs bg-white hover:bg-[#F5F7F8] transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileText className="w-4 h-4 text-[#8c96a0] shrink-0" />
                      <span className="font-medium text-[#263238] truncate">{docName}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isVerified ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#e1f5ee] text-[#176B55]">
                          Ready
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#fef5e7] text-[#7a5214]">
                          Needs Review
                        </span>
                      )}
                      <button
                        onClick={() => openUploadModal(req.id)}
                        className="px-2.5 py-1 rounded bg-[#F5F7F8] hover:bg-[#e3f0f8] border border-[#D8DEE4] text-[11px] font-semibold text-[#0B4F71]"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. NEXT STEP */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#12304A]">
              Next Step
            </h2>
            <div className="p-3.5 rounded bg-[#e3f0f8] border border-[#b8d7eb] text-xs text-[#0B4F71] leading-relaxed font-medium">
              {req.nextStep ||
                req.next_step ||
                req.actionNeeded ||
                "Compile required documents into your dossier before commencing official portal submission."}
            </div>
          </div>

          {/* 6. OFFICIAL SOURCE & 7. OFFICIAL GOVERNMENT PORTAL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#D8DEE4]">
            {/* 6. Official Source */}
            <div className="p-3.5 rounded bg-[#F5F7F8] border border-[#D8DEE4] text-xs space-y-1">
              <div className="text-[10px] uppercase font-bold text-[#8c96a0] tracking-wider">
                Official Source
              </div>
              <div className="font-semibold text-[#12304A]">
                {req.official_source_name || req.officialSourceName || req.department}
              </div>
              <div className="text-[11px] text-[#495057]">
                Statutory Reference: {req.source_reference || req.sourceReference || req.act}
              </div>
            </div>

            {/* 7. Official Government Portal */}
            <div className="p-3.5 rounded bg-[#F5F7F8] border border-[#D8DEE4] text-xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold text-[#8c96a0] tracking-wider">
                  Official Government Portal
                </div>
                <div className="font-semibold text-[#12304A]">{portalName}</div>
                <div className="text-[11px] text-[#495057] truncate">{portalUrl}</div>
              </div>

              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-[#0B4F71] hover:bg-[#12304A] text-white text-xs font-semibold transition-colors"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Handoff Guidance */}
        <HandoffCard />
      </div>
    </AppLayout>
  );
}
