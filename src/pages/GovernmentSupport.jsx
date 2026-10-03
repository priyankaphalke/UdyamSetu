import React from "react";
import { useApp } from "../context/AppContext";
import AppLayout from "../components/layout/AppLayout";
import HandoffCard from "../components/common/HandoffCard";
import {
  HandCoins,
  ExternalLink,
  CheckCircle2,
  Clock,
  Info,
  Building2,
  HelpCircle,
  ShieldAlert,
} from "lucide-react";

export default function GovernmentSupport() {
  const { governmentSupport, businessProfile, showToast } = useApp();

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* ========================================================================= */}
        {/* HEADER                                                                    */}
        {/* ========================================================================= */}
        <div className="bg-white border border-[#D8DEE4] rounded p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#D8DEE4]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#0B4F71] uppercase tracking-wider px-2 py-0.5 rounded bg-[#e3f0f8] border border-[#b8d7eb]">
                  Facilitation & Schemes
                </span>
                <span className="text-xs text-[#495057]">
                  {businessProfile?.legalName} • {businessProfile?.district || "Maharashtra"}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#12304A] font-serif mt-1">
                Government Support
              </h1>
              <p className="text-xs sm:text-sm text-[#495057] mt-0.5">
                Central and Maharashtra state incentive schemes mapped to your enterprise profile.
              </p>
            </div>
          </div>

          {/* Institutional Advisory */}
          <div className="p-3.5 rounded bg-[#F5F7F8] border border-[#D8DEE4] text-xs text-[#263238] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#0B4F71] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="font-bold text-[#12304A]">Guidance Note: </strong>
              Support schemes listed below are potentially relevant based on your enterprise sector ({businessProfile?.sector}), scale ({businessProfile?.classification}), and location ({businessProfile?.district || "Maharashtra"}). UdyamSetu does not guarantee scheme sanction or subsidy disbursement. Formal applications, Detailed Project Reports (DPR), and sanction scrutiny are administered directly by the District Industries Centre (DIC) or respective nodal authority.
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCHEMES LIST                                                              */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          {governmentSupport.map((scheme) => {
            const portalUrl = scheme.portalUrl || scheme.official_url || "https://maitridev.mahaonline.gov.in";

            return (
              <div
                key={scheme.id}
                className="bg-white border border-[#D8DEE4] rounded p-5 sm:p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[#D8DEE4]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-base sm:text-lg font-bold text-[#12304A]">
                        {scheme.title}
                      </h2>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#fef5e7] text-[#7a5214] border border-[#f8c471]">
                        <Clock className="w-3 h-3" />
                        Potentially Relevant
                      </span>
                    </div>
                    <div className="text-xs text-[#495057]">
                      Department: <strong className="text-[#263238] font-medium">{scheme.department || "Government of Maharashtra"}</strong>
                    </div>
                  </div>

                  <a
                    href={portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded bg-[#0B4F71] hover:bg-[#12304A] text-white text-xs font-semibold transition-colors shrink-0 shadow-xs"
                  >
                    <span>Official Details</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Description */}
                <div className="text-xs text-[#263238] leading-relaxed">
                  {scheme.description}
                </div>

                {/* Eligibility to Check */}
                <div className="p-3.5 rounded bg-[#F5F7F8] border border-[#D8DEE4] space-y-2 text-xs">
                  <div className="font-bold text-[#12304A] text-[11px] uppercase tracking-wider">
                    Eligibility to Check:
                  </div>
                  <ul className="space-y-1.5 text-[#263238]">
                    {(scheme.criteria || [
                      "Valid Udyam Registration Certificate linked to enterprise bank account",
                      `Manufacturing unit situated in designated MIDC or taluka zone (${businessProfile?.district || "Maharashtra"})`,
                      "Statutory environmental and local authority clearances in place (CTE/FSSAI)",
                      "Project term loan sanctioned by scheduled commercial bank or financial institution",
                    ]).map((crit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#0B4F71] font-bold">•</span>
                        <span>{crit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Benefits Summary */}
                {scheme.benefits && (
                  <div className="text-xs text-[#495057] flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                    <span>
                      Support Type: <strong className="text-[#263238] font-medium">{scheme.type || "Incentive / Subsidy"}</strong>
                    </span>
                    <span>
                      Administered By: <strong className="text-[#263238] font-medium">District Industries Centre (DIC)</strong>
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* OFFICIAL GOVERNMENT HANDOFF                                               */}
        {/* ========================================================================= */}
        <HandoffCard />
      </div>
    </AppLayout>
  );
}
