import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import AppLayout from "../components/layout/AppLayout";
import HandoffCard from "../components/common/HandoffCard";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  CalendarCheck2,
  Building2,
  ExternalLink,
  ChevronRight,
  UploadCloud,
  ShieldAlert,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    businessProfile,
    requirements,
    documents,
    complianceTasks,
    primaryNextAction,
    openUploadModal,
  } = useApp();

  // Document status counts
  const readyDocs = documents.filter((d) => d.status === "verified");
  const needReviewDocs = documents.filter(
    (d) => d.status === "action_required" || d.status === "pending"
  );

  // Compliance task filters
  const upcomingCompliance = complianceTasks.slice(0, 4);

  // Target requirement for Next Action
  const nextReqId =
    primaryNextAction?.requirementId ||
    requirements[0]?.id ||
    "fssai-license";
  const nextReqTitle =
    primaryNextAction?.requirementTitle ||
    requirements.find((r) => r.id === nextReqId)?.title ||
    "FSSAI State Manufacturing License";

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* ========================================================================= */}
        {/* TOP: YOUR REGULATORY JOURNEY & BUSINESS CONTEXT                            */}
        {/* ========================================================================= */}
        <div className="bg-white border border-[#D8DEE4] rounded p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D8DEE4] gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#12304A] font-serif">
                Your Regulatory Journey
              </h1>
              <p className="text-xs sm:text-sm text-[#495057] mt-0.5">
                Overview of applicable Maharashtra statutory clearances, document readiness, and compliance schedules.
              </p>
            </div>
            <Link
              to="/business-profile"
              className="inline-flex items-center text-xs font-semibold text-[#0B4F71] hover:text-[#12304A] hover:underline shrink-0"
            >
              Update Business Profile →
            </Link>
          </div>

          {/* Business Context Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
            <div>
              <div className="text-[#8c96a0] font-semibold uppercase text-[10px] tracking-wider">
                Enterprise Name
              </div>
              <div className="font-bold text-[#12304A] text-sm mt-0.5 truncate">
                {businessProfile?.legalName || "ABC Foods Pvt. Ltd."}
              </div>
            </div>

            <div>
              <div className="text-[#8c96a0] font-semibold uppercase text-[10px] tracking-wider">
                Industry Sector
              </div>
              <div className="font-semibold text-[#263238] mt-0.5">
                {businessProfile?.sector || "Food Processing"}
              </div>
            </div>

            <div>
              <div className="text-[#8c96a0] font-semibold uppercase text-[10px] tracking-wider">
                Location
              </div>
              <div className="font-semibold text-[#263238] mt-0.5">
                {businessProfile?.district || "Nashik"}, {businessProfile?.state || "Maharashtra"}
              </div>
            </div>

            <div>
              <div className="text-[#8c96a0] font-semibold uppercase text-[10px] tracking-wider">
                Size & Stage
              </div>
              <div className="font-semibold text-[#263238] mt-0.5">
                {businessProfile?.classification || "Small"} • {businessProfile?.stage || "New Business"}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CORE QUESTION 3: WHAT DO I DO NEXT? — PROMINENT NEXT STEP SECTION         */}
        {/* ========================================================================= */}
        <div className="bg-white border-l-4 border-l-[#0B4F71] border border-[#D8DEE4] rounded p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#e3f0f8] text-[#0B4F71] border border-[#b8d7eb]">
                  Your Next Step
                </span>
                <span className="text-xs text-[#495057] font-medium">
                  Priority Action for Regulatory Preparation
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#12304A]">
                {primaryNextAction?.title || "Upload Machinery Inventory & Power Schedule"}
              </h2>
              <p className="text-xs sm:text-sm text-[#495057] leading-relaxed">
                Required for completing regulatory preparation for{" "}
                <strong className="text-[#12304A] font-semibold">{nextReqTitle}</strong>.{" "}
                {primaryNextAction?.reason ||
                  "Statutory guidelines require machinery specifications and an architect layout prior to official online filing."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => navigate(`/requirements/${nextReqId}`)}
                className="px-4 py-2.5 rounded bg-[#0B4F71] hover:bg-[#12304A] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
              >
                Review Requirement
              </button>
              <button
                onClick={() => openUploadModal(nextReqId)}
                className="px-4 py-2.5 rounded bg-white hover:bg-[#F5F7F8] border border-[#D8DEE4] text-[#12304A] text-xs sm:text-sm font-semibold transition-colors"
              >
                Upload Document
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CORE QUESTION 1: WHAT APPLIES? — YOUR REQUIREMENTS                        */}
        {/* ========================================================================= */}
        <div className="bg-white border border-[#D8DEE4] rounded p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#D8DEE4]">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#12304A] font-serif">
                Your Requirements
              </h2>
              <p className="text-xs text-[#495057]">
                Clearances, licenses, and registrations applicable to your business in Maharashtra.
              </p>
            </div>
            <Link
              to="/roadmap"
              className="text-xs font-semibold text-[#0B4F71] hover:underline"
            >
              View Full Journey ({requirements.length} Items) →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F5F7F8] border-b border-[#D8DEE4] text-[#495057] uppercase text-[10px] tracking-wider font-semibold">
                  <th className="py-2.5 px-3">Requirement</th>
                  <th className="py-2.5 px-3 hidden md:table-cell">Authority & Act</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8DEE4]">
                {requirements.slice(0, 5).map((req) => {
                  const status = req.ruleStatus || req.matchStatus || "APPLICABLE";
                  const isApplicable = status === "APPLICABLE";
                  const isConditional = status === "POTENTIALLY_APPLICABLE";

                  return (
                    <tr key={req.id} className="hover:bg-[#F5F7F8]/80 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-semibold text-sm text-[#12304A]">
                          {req.title || req.name}
                        </div>
                        <div className="text-[11px] text-[#495057] md:hidden mt-0.5">
                          {req.department}
                        </div>
                      </td>

                      <td className="py-3 px-3 hidden md:table-cell text-[#495057]">
                        <div className="font-medium text-[#263238]">{req.department}</div>
                        <div className="text-[11px] text-[#8c96a0] truncate max-w-xs">{req.act}</div>
                      </td>

                      <td className="py-3 px-3">
                        {isApplicable && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#e1f5ee] text-[#176B55] border border-[#a2e0cb]">
                            <CheckCircle2 className="w-3 h-3" />
                            Applicable
                          </span>
                        )}
                        {isConditional && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#fef5e7] text-[#D99A35] border border-[#f8c471]">
                            <Clock className="w-3 h-3" />
                            Potentially Applicable
                          </span>
                        )}
                        {!isApplicable && !isConditional && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#F5F7F8] text-[#495057] border border-[#D8DEE4]">
                            Needs Verification
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-right">
                        <Link
                          to={`/requirements/${req.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#F5F7F8] hover:bg-[#0B4F71] hover:text-white border border-[#D8DEE4] text-xs font-semibold text-[#0B4F71] transition-colors"
                        >
                          <span>Review</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CORE QUESTION 2: WHAT NEEDS ATTENTION? — DOCUMENTS & COMPLIANCE           */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Your Documents */}
          <div className="bg-white border border-[#D8DEE4] rounded p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D8DEE4] gap-2">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#12304A] font-serif">
                    Your Documents
                  </h2>
                  <p className="text-xs text-[#495057]">
                    Required records and statutory proofs for your clearances.
                  </p>
                </div>
                <Link
                  to="/documents"
                  className="text-xs font-semibold text-[#0B4F71] hover:underline"
                >
                  Manage All →
                </Link>
              </div>

              {/* Status Summary Pills */}
              <div className="grid grid-cols-2 gap-3 py-3 border-b border-[#D8DEE4]">
                <div className="p-3 bg-[#e1f5ee] rounded border border-[#a2e0cb]">
                  <div className="text-[11px] text-[#176B55] font-semibold uppercase tracking-wider">
                    Ready
                  </div>
                  <div className="text-xl font-bold text-[#176B55] mt-0.5">
                    {readyDocs.length} Documents
                  </div>
                </div>

                <div className="p-3 bg-[#fef5e7] rounded border border-[#f8c471]">
                  <div className="text-[11px] text-[#7a5214] font-semibold uppercase tracking-wider">
                    Need Review / Missing
                  </div>
                  <div className="text-xl font-bold text-[#D99A35] mt-0.5">
                    {needReviewDocs.length} Documents
                  </div>
                </div>
              </div>

              {/* Sample list of documents needing review */}
              <div className="divide-y divide-[#D8DEE4] pt-1">
                {needReviewDocs.slice(0, 3).map((doc) => (
                  <div
                    key={doc.id}
                    className="py-2.5 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-[#12304A] truncate">
                        {doc.name}
                      </div>
                      <div className="text-[11px] text-[#8c96a0]">
                        {doc.category || "Statutory Proof"}
                      </div>
                    </div>
                    <button
                      onClick={() => openUploadModal(doc.requirementRef?.[0] || "general")}
                      className="px-2.5 py-1 rounded bg-white hover:bg-[#F5F7F8] border border-[#D8DEE4] text-[#0B4F71] font-semibold text-xs shrink-0"
                    >
                      Upload
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#D8DEE4] mt-4">
              <Link
                to="/documents"
                className="text-xs font-semibold text-[#0B4F71] hover:underline block text-center"
              >
                Go to Documents Workspace ({documents.length} Total) →
              </Link>
            </div>
          </div>

          {/* Upcoming Compliance */}
          <div className="bg-white border border-[#D8DEE4] rounded p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#D8DEE4] gap-2">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[#12304A] font-serif">
                    Upcoming Compliance
                  </h2>
                  <p className="text-xs text-[#495057]">
                    Periodic statutory returns and inspections due in Maharashtra.
                  </p>
                </div>
                <Link
                  to="/compliance"
                  className="text-xs font-semibold text-[#0B4F71] hover:underline"
                >
                  View Calendar →
                </Link>
              </div>

              {/* Compliance tasks list */}
              <div className="divide-y divide-[#D8DEE4]">
                {upcomingCompliance.map((task) => (
                  <div
                    key={task.id}
                    className="py-3 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="font-semibold text-[#12304A] truncate">
                        {task.title}
                      </div>
                      <div className="text-[11px] text-[#495057]">
                        {task.authority} • {task.frequency || "Annual"}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F5F7F8] text-[#263238] border border-[#D8DEE4]">
                        {task.status || "Upcoming"}
                      </span>
                      <div className="text-[10px] text-[#8c96a0] mt-0.5">
                        Due: {task.dueDate || "As scheduled"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#D8DEE4] mt-4">
              <Link
                to="/compliance"
                className="text-xs font-semibold text-[#0B4F71] hover:underline block text-center"
              >
                Open Full Compliance Calendar ({complianceTasks.length} Tasks) →
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INSTITUTIONAL GOVERNMENT HANDOFF GUIDANCE                                 */}
        {/* ========================================================================= */}
        <HandoffCard />
      </div>
    </AppLayout>
  );
}
