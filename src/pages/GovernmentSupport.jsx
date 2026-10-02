import React from "react";
import { useApp } from "../context/AppContext";
import AppLayout from "../components/layout/AppLayout";
import HandoffCard from "../components/common/HandoffCard";
import {
  HandCoins,
  ExternalLink,
  CheckCircle2,
  Circle,
  HelpCircle,
  ShieldCheck,
  Building2,
  Sparkles,
  Landmark,
  FileCheck2,
  Info,
  ArrowRight,
} from "lucide-react";

export default function GovernmentSupport() {
  const { governmentSupport, businessProfile, showToast } = useApp();

  const handleGenerateChecklist = (scheme) => {
    showToast(`Eligibility checklist compiled for ${scheme.title}`);
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-space-lg max-w-7xl mx-auto pb-12">
        {/* Top Context & Header */}
        <div className="flex flex-wrap items-center justify-between gap-y-2 border-b border-outline-variant pb-3">
          <div className="flex items-center gap-2 font-code-statutory text-xs text-on-surface-variant">
            <span>Overview</span>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">Government Support</span>
            <span className="text-outline-variant">|</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Demo Regulatory Dataset • Prototype Mode
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-outline">Screened Enterprise:</span>
            <span className="font-mono font-bold text-primary px-2 py-0.5 bg-surface-container rounded">
              {businessProfile?.legalName} ({businessProfile?.district || "Maharashtra"})
            </span>
          </div>
        </div>

        {/* Prototype Disclaimer Banner */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3 text-xs text-amber-900 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-bold">PROTOTYPE MODE: </strong>
            Schemes listed below are potential matches based on your business profile ({businessProfile?.sector || "Industrial"}, {businessProfile?.scale || "MSME"} scale in {businessProfile?.district || "Maharashtra"}). UdyamSetu does not guarantee scheme approval or calculate disbursement amounts. Please verify detailed guidelines on the respective official government portals.
          </div>
        </div>

        {/* Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-[26px] text-primary tracking-tight font-bold">
              Government Support & Schemes
            </h1>
            <p className="font-body-md text-sm text-on-surface-variant mt-0.5">
              Potentially relevant state and central schemes mapped to your sector, location, and enterprise scale.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-secondary-container/40 text-secondary border border-secondary/30 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-secondary" />
              Support: {governmentSupport.length} Potentially Relevant
            </span>
          </div>
        </div>

        {/* PROFILE SCREENING CONTEXT CARD */}
        <div className="bg-surface-container-lowest p-space-md rounded border border-outline-variant shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-secondary" />
              <h3 className="font-headline-sm text-sm font-bold text-primary">
                Screening Profile Parameters
              </h3>
            </div>
            <span className="text-[11px] font-mono text-outline">
              Target Jurisdiction: Government of Maharashtra & Central MSME
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 bg-surface-container-low rounded border border-outline-variant/60">
              <span className="text-[10px] uppercase font-mono text-outline block">Industry Sector</span>
              <span className="font-bold text-primary mt-0.5 block">{businessProfile?.sector}</span>
            </div>
            <div className="p-2.5 bg-surface-container-low rounded border border-outline-variant/60">
              <span className="text-[10px] uppercase font-mono text-outline block">Business Stage</span>
              <span className="font-bold text-primary mt-0.5 block">{businessProfile?.stage}</span>
            </div>
            <div className="p-2.5 bg-surface-container-low rounded border border-outline-variant/60">
              <span className="text-[10px] uppercase font-mono text-outline block">Enterprise Scale</span>
              <span className="font-bold text-primary mt-0.5 block">{businessProfile?.scale}</span>
            </div>
            <div className="p-2.5 bg-surface-container-low rounded border border-outline-variant/60">
              <span className="text-[10px] uppercase font-mono text-outline block">District & State</span>
              <span className="font-bold text-primary mt-0.5 block">
                {businessProfile?.district}, {businessProfile?.state}
              </span>
            </div>
          </div>
        </div>

        {/* SCHEMES CARDS LIST */}
        <div className="space-y-space-md">
          {governmentSupport.length === 0 ? (
            <div className="p-12 text-center bg-surface-container-lowest rounded border border-outline-variant text-on-surface-variant flex flex-col items-center justify-center gap-2">
              <HandCoins className="w-8 h-8 text-outline" />
              <span className="font-semibold text-sm">No schemes found</span>
              <p className="text-xs text-outline max-w-sm">
                No matching government support schemes found for the current enterprise profile.
              </p>
            </div>
          ) : (
            governmentSupport.map((scheme) => (
              <article
                key={scheme.id}
                className="bg-surface-container-lowest rounded border border-outline-variant overflow-hidden hover:border-primary/40 transition-colors shadow-xs"
              >
                <div className="p-space-md">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-3 border-b border-outline-variant">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase font-mono bg-surface-container text-on-surface border border-outline-variant">
                          {scheme.tier}
                        </span>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase font-mono bg-secondary-container/40 text-on-secondary-container border border-secondary/30">
                          Potentially Relevant
                        </span>
                      </div>

                      <h2 className="text-lg font-bold text-primary">{scheme.title}</h2>
                      <p className="text-xs text-on-surface-variant flex items-center gap-1.5">
                        <Landmark className="w-3.5 h-3.5 text-secondary" />
                        {scheme.authority}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-50 text-amber-900 border border-amber-300 font-mono text-xs font-semibold">
                        Eligibility to Check
                      </span>
                    </div>
                  </div>

                  <div className="mt-3.5 grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Summary & Benefits (8 Cols) */}
                    <div className="lg:col-span-8 space-y-3">
                      <p className="text-xs text-on-surface leading-relaxed">
                        {scheme.summary}
                      </p>

                      <div>
                        <span className="font-label-sm text-[11px] font-bold text-primary uppercase tracking-wider block mb-1.5">
                          Key Policy Support Areas:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-on-surface-variant">
                          {(scheme.keyBenefits || []).map((b, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 bg-surface p-2 rounded border border-outline-variant/40"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Eligibility Checklist & Actions (4 Cols) */}
                    <div className="lg:col-span-4 bg-surface-container-low p-3.5 rounded border border-outline-variant/60 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="font-label-sm text-[11px] font-bold text-primary uppercase tracking-wider block mb-2">
                          Criteria to Check Before Applying:
                        </span>
                        <div className="space-y-1.5">
                          {(scheme.eligibilityChecklist || []).map((c, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs">
                              {c.met ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                              ) : (
                                <Circle className="w-3.5 h-3.5 text-outline shrink-0 mt-0.5" />
                              )}
                              <span className={c.met ? "text-on-surface font-medium" : "text-on-surface-variant"}>
                                {c.item}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-outline-variant/40">
                        <a
                          href={scheme.officialPortalUrl || "https://maitri.mahaonline.gov.in"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-9 rounded bg-primary-container text-on-primary text-xs font-semibold hover:bg-primary transition-colors flex items-center justify-center gap-2 shadow-xs"
                        >
                          <span>View Official Details</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleGenerateChecklist(scheme)}
                          className="w-full h-8 rounded border border-outline bg-surface-container-lowest text-xs font-semibold text-primary hover:bg-surface-container transition-colors flex items-center justify-center gap-1.5"
                        >
                          <FileCheck2 className="w-3.5 h-3.5 text-secondary" />
                          <span>Self-Verification Checklist</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* OFFICIAL SERVICE POSITIONING & HANDOFF FOOTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <HandoffCard />
          </div>
          <div className="lg:col-span-4 bg-surface-container-lowest p-space-md rounded border border-outline-variant flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 font-bold text-xs text-primary mb-1">
                <HelpCircle className="w-4 h-4 text-secondary" />
                <span>Nodal Assistance</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Connect with the District Industries Centre (DIC) in {businessProfile?.district || "Maharashtra"} for scheme verification and guidance on the official state portal.
              </p>
            </div>
            <a
              href="https://maitri.mahaonline.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-3 py-2 rounded border border-outline-variant hover:bg-surface-container text-xs text-primary font-semibold flex items-center justify-between"
            >
              <span>Visit MAITRI Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-secondary" />
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
