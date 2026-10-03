import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import AppLayout from "../components/layout/AppLayout";
import HandoffCard from "../components/common/HandoffCard";
import {
  CheckCircle2,
  Clock,
  ChevronRight,
  Filter,
  ArrowRight,
  Building2,
  ExternalLink,
  Shield,
  HelpCircle,
} from "lucide-react";

export default function RegulatoryRoadmap() {
  const { businessProfile, requirements } = useApp();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Clearances" },
    { id: "approval", label: "Statutory Approvals (FSSAI, DISH)" },
    { id: "clearance", label: "Environmental Clearances (MPCB)" },
    { id: "registration", label: "Registrations (Gumasta, Udyam)" },
  ];

  const filtered = requirements.filter((req) => {
    if (activeCategory === "approval") return req.category?.includes("APPROVAL");
    if (activeCategory === "clearance") return req.category?.includes("CLEARANCE") || req.category?.includes("ENVIRONMENTAL");
    if (activeCategory === "registration") return req.category?.includes("REGISTRATION");
    return true;
  });

  const steps = [
    { number: "1", title: "Understand", desc: "Applicable laws & rules" },
    { number: "2", title: "Prepare", desc: "Required documents & records" },
    { number: "3", title: "Submit", desc: "Official government portal filing" },
    { number: "4", title: "Track", desc: "Department scrutiny & inspection" },
    { number: "5", title: "Comply", desc: "Annual returns & renewals" },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* ========================================================================= */}
        {/* HEADER & 5-STEP JOURNEY SEQUENCE                                          */}
        {/* ========================================================================= */}
        <div className="bg-white border border-[#D8DEE4] rounded p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#D8DEE4]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#0B4F71] uppercase tracking-wider px-2 py-0.5 rounded bg-[#e3f0f8] border border-[#b8d7eb]">
                  Regulatory Roadmap
                </span>
                <span className="text-xs text-[#495057]">
                  {businessProfile?.legalName} • {businessProfile?.sector}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#12304A] font-serif mt-1">
                My Regulatory Journey
              </h1>
              <p className="text-xs sm:text-sm text-[#495057] mt-0.5">
                Statutory clearances and licenses mapped for your operations in {businessProfile?.district || "Maharashtra"}.
              </p>
            </div>

            <Link
              to="/business-profile"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#F5F7F8] hover:bg-[#e3f0f8] border border-[#D8DEE4] text-xs font-semibold text-[#12304A] transition-colors shrink-0"
            >
              <Building2 className="w-3.5 h-3.5 text-[#0B4F71]" />
              <span>Edit Business Details</span>
            </Link>
          </div>

          {/* Simple 5-Step Sequence */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#495057] mb-3">
              Standard Maharashtra MSME Regulatory Pathway:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
              {steps.map((st, idx) => (
                <div
                  key={st.number}
                  className={`p-3 rounded border text-xs ${
                    idx === 0
                      ? "bg-[#e3f0f8] border-[#0B4F71] text-[#12304A]"
                      : idx === 1
                      ? "bg-[#fef5e7] border-[#D99A35] text-[#7a5214]"
                      : "bg-[#F5F7F8] border-[#D8DEE4] text-[#495057]"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white ${
                        idx === 0
                          ? "bg-[#0B4F71]"
                          : idx === 1
                          ? "bg-[#D99A35]"
                          : "bg-[#8c96a0]"
                      }`}
                    >
                      {st.number}
                    </span>
                    <span className="font-semibold text-xs sm:text-sm">{st.title}</span>
                  </div>
                  <div className="text-[11px] leading-tight text-[#495057]">{st.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* REQUIREMENTS TABLE / LIST                                                 */}
        {/* ========================================================================= */}
        <div className="bg-white border border-[#D8DEE4] rounded p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D8DEE4]">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#12304A] font-serif">
                Applicable Requirements ({filtered.length})
              </h2>
              <p className="text-xs text-[#495057]">
                Review why each requirement applies, required documents, and next preparation steps.
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3 py-1.5 rounded font-semibold border transition-colors ${
                    activeCategory === c.id
                      ? "bg-[#0B4F71] text-white border-[#0B4F71]"
                      : "bg-[#F5F7F8] text-[#495057] border-[#D8DEE4] hover:bg-white"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Rows */}
          <div className="space-y-3">
            {filtered.map((req) => {
              const status = req.ruleStatus || req.matchStatus || "APPLICABLE";
              const isApplicable = status === "APPLICABLE";
              const isConditional = status === "POTENTIALLY_APPLICABLE";

              return (
                <div
                  key={req.id}
                  className="p-4 rounded border border-[#D8DEE4] bg-white hover:border-[#0B4F71] transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1 max-w-3xl">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm sm:text-base text-[#12304A]">
                          {req.title || req.name}
                        </span>
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
                      </div>

                      <div className="text-xs text-[#8c96a0]">
                        <strong className="text-[#495057] font-medium">{req.department}</strong> •{" "}
                        <span>{req.act}</span>
                      </div>
                    </div>

                    <Link
                      to={`/requirements/${req.id}`}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-[#0B4F71] hover:bg-[#12304A] text-white text-xs font-semibold transition-colors shrink-0 shadow-xs"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Why it applies */}
                  <div className="p-3 bg-[#F5F7F8] rounded border border-[#D8DEE4] text-xs text-[#263238]">
                    <div className="font-bold text-[#12304A] text-[11px] uppercase tracking-wider mb-0.5">
                      Why this applies to your business:
                    </div>
                    <p className="leading-relaxed">
                      {req.whyItMayApply ||
                        req.whyItApplies ||
                        req.statutory_triggers ||
                        "Applicable based on your business sector, operating district, and manufacturing activities in Maharashtra."}
                    </p>
                  </div>

                  {/* Next Action & Details Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#495057] pt-1 gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#0B4F71]">Next Action:</span>
                      <span className="text-[#263238]">
                        {req.nextStep ||
                          req.next_step ||
                          req.actionNeeded ||
                          "Prepare required documents for official submission."}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-[11px] text-[#8c96a0] shrink-0">
                      <span>Timeline: <strong className="text-[#263238]">{req.estimatedTimeline || req.estimated_timeline || "15-30 days"}</strong></span>
                      <span>Fee: <strong className="text-[#263238]">{typeof req.estimatedFee === "number" ? `₹${req.estimatedFee.toLocaleString("en-IN")}` : req.estimatedFee || "As per official schedule"}</strong></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* OFFICIAL GOVERNMENT HANDOFF                                               */}
        {/* ========================================================================= */}
        <HandoffCard />
      </div>
    </AppLayout>
  );
}
