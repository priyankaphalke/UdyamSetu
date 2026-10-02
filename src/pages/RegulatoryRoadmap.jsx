import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import AppLayout from "../components/layout/AppLayout";
import TimelineGrid from "../components/common/TimelineGrid";
import HandoffCard from "../components/common/HandoffCard";
import {
  Building2,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  HelpCircle,
  Layers,
  ChevronRight,
  Factory,
  Landmark,
  Store,
} from "lucide-react";

export default function RegulatoryRoadmap() {
  const navigate = useNavigate();
  const { businessProfile, requirements, openUploadModal } = useApp();
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredRequirements = requirements.filter((req) => {
    if (activeFilter === "statutory") return req.category.includes("STATUTORY") || req.category.includes("ENVIRONMENTAL");
    if (activeFilter === "municipal") return req.category.includes("MUNICIPAL");
    return true;
  });

  return (
    <AppLayout>
      <div className="flex flex-col space-y-space-lg max-w-7xl mx-auto pb-12">
        {/* TOP CONTEXT & BREADCRUMBS */}
        <div className="flex flex-col gap-space-sm">
          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <nav className="flex items-center gap-2 font-code-statutory text-code-statutory text-on-surface-variant">
              <Link to="/dashboard" className="hover:text-primary transition-colors">
                Overview
              </Link>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface font-semibold">Regulatory Roadmap</span>
              <span className="text-outline-variant mx-1">|</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-[11px] font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                Prototype Mode • Curated Guidance
              </span>
            </nav>
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">
                Reference ID:
              </span>
              <span className="font-code-statutory text-code-statutory font-semibold text-primary px-2 py-0.5 bg-surface-container rounded font-mono">
                {businessProfile?.referenceId || "MH-2024-REG"}
              </span>
            </div>
          </div>

          {/* Title & Context Metadata Ribbon */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-outline-variant">
            <div>
              <h1 className="font-headline-lg text-[26px] text-primary tracking-tight font-bold">
                Regulatory Roadmap
              </h1>
              <p className="font-body-md text-sm text-on-surface-variant mt-0.5">
                Applicable approvals and requirements for {businessProfile?.legalName}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-surface-container-lowest px-3.5 py-2 rounded border border-outline-variant shadow-xs">
              <div className="flex items-center gap-2 text-on-surface text-xs font-medium">
                <Building2 className="w-4 h-4 text-secondary" />
                <span>
                  {businessProfile?.sector} • {businessProfile?.district}, {businessProfile?.state} • {businessProfile?.classification} Scale
                </span>
              </div>
              <div className="h-4 w-px bg-outline-variant"></div>
              <Link
                to="/business-profile"
                className="inline-flex items-center gap-1 font-label-sm text-xs text-secondary hover:text-primary font-semibold transition-colors"
              >
                Change Business Context
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* REGULATORY JOURNEY */}
        <TimelineGrid activeStage={3} />

        {/* TWO-COLUMN WORKSPACE: 65% MAIN CONTENT / 35% SIDE ACTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* LEFT COLUMN: APPLICABLE REQUIREMENTS (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col space-y-space-md">
            {/* Section Title & Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-space-md rounded border border-outline-variant shadow-xs">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-headline-md text-lg font-bold text-primary tracking-tight">
                    Applicable Requirements
                  </h2>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-primary-container text-on-primary">
                    {requirements.length} Applicable Approvals
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                  Identified based on activity: {businessProfile?.sector} & operations: {businessProfile?.operations?.join(", ")}.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="inline-flex p-1 bg-surface-container rounded border border-outline-variant text-xs font-semibold">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeFilter === "all"
                      ? "bg-surface-container-lowest text-primary font-bold shadow-xs border border-outline-variant/60"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  All ({requirements.length})
                </button>
                <button
                  onClick={() => setActiveFilter("statutory")}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeFilter === "statutory"
                      ? "bg-surface-container-lowest text-primary font-bold shadow-xs border border-outline-variant/60"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  Statutory ({requirements.filter(r => r.category.includes("STATUTORY") || r.category.includes("ENVIRONMENTAL")).length})
                </button>
                <button
                  onClick={() => setActiveFilter("municipal")}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeFilter === "municipal"
                      ? "bg-surface-container-lowest text-primary font-bold shadow-xs border border-outline-variant/60"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  Municipal ({requirements.filter(r => r.category.includes("MUNICIPAL")).length})
                </button>
              </div>
            </div>

            {/* REQUIREMENT CARDS LIST */}
            {filteredRequirements.length === 0 ? (
              <div className="p-12 text-center bg-surface-container-lowest rounded border border-outline-variant text-on-surface-variant flex flex-col items-center justify-center gap-2">
                <Layers className="w-8 h-8 text-outline" />
                <span className="font-semibold text-sm">No approvals found</span>
                <p className="text-xs text-outline max-w-sm">
                  No approvals match the current filter. Try selecting "All Clearances" or updating your business profile.
                </p>
              </div>
            ) : (
              filteredRequirements.map((req) => {
              const isConfirmed = req.verification_status === "CONFIRMED" || req.rule_status === "APPLICABLE";
              const isConditional = req.verification_status === "CONDITIONAL" || req.rule_status === "POTENTIALLY_APPLICABLE";
              const needsVerification = req.verification_status === "NEEDS_VERIFICATION" || req.rule_status === "NEEDS_VERIFICATION";

              return (
                <article
                  key={req.id}
                  className="bg-surface-container-lowest rounded border border-outline-variant overflow-hidden hover:border-primary/40 transition-colors shadow-xs"
                >
                  <div className="p-space-md flex flex-col space-y-space-sm">
                    {/* Card Meta Row */}
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* User-Friendly Applicability Badge */}
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border ${
                              isConfirmed
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                : isConditional
                                ? "bg-amber-50 text-amber-800 border-amber-300"
                                : "bg-purple-50 text-purple-800 border-purple-300"
                            }`}
                          >
                            {req.user_friendly_badge || (isConfirmed ? "Confirmed Statutory Requirement" : isConditional ? "Conditional Requirement" : "Verification Required")}
                          </span>

                          <span className="font-code-statutory text-[11px] text-outline font-mono">
                            Statute: {req.source_reference || req.act}
                          </span>
                        </div>

                        <div>
                          <div className="text-[11px] text-outline font-semibold uppercase tracking-wider">
                            What may apply to your business:
                          </div>
                          <h3 className="font-headline-sm text-base font-bold text-primary mt-0.5">
                            <Link to={`/requirements/${req.id}`} className="hover:text-secondary">
                              {req.name || req.title}
                            </Link>
                          </h3>
                        </div>

                        {/* Official Source Ribbon */}
                        <div className="flex items-center gap-2 text-xs text-on-surface-variant flex-wrap pt-0.5">
                          <Landmark className="w-3.5 h-3.5 text-secondary shrink-0" />
                          <span>
                            <strong className="text-on-surface">Official Source: </strong>
                            {req.official_source_name || req.department}
                          </span>
                          {(req.official_source_url || req.portalUrl) && (
                            <a
                              href={req.official_source_url || req.portalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-0.5 text-secondary hover:underline font-medium text-[11px]"
                            >
                              <span>Official Portal</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Prepared documents count */}
                      <div className="text-right shrink-0">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-code-statutory text-[12px] bg-secondary-container/40 text-on-secondary-container font-bold border border-secondary/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                          {(req.required_documents || req.mandatoryRecords)?.filter((r) => r.status === "verified").length} of {(req.required_documents || req.mandatoryRecords)?.length} Prepared
                        </span>
                      </div>
                    </div>

                    {/* Why it may apply block */}
                    <div className="bg-surface-container-low p-3 rounded border border-outline-variant/60 flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div className="text-xs text-on-surface leading-relaxed">
                        <span className="font-bold text-primary">Why it may apply: </span>
                        {req.why_it_may_apply || req.statutoryTriggers || req.trigger_conditions}
                      </div>
                    </div>

                    {/* Verification Notes Alert (if conditional or needs verification) */}
                    {(req.verification_notes || needsVerification) && (
                      <div className="bg-amber-50/70 p-2.5 rounded border border-amber-200/80 flex items-start gap-2 text-xs text-amber-900">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold text-amber-950">Manual Verification Item: </strong>
                          {req.verification_notes || "Requires checking shop-floor worker count or operational volume against statutory threshold."}
                        </div>
                      </div>
                    )}

                    {/* What you need to prepare checklist */}
                    <div className="space-y-1.5 pt-1">
                      <span className="font-label-sm text-[11px] uppercase tracking-wider text-outline font-semibold">
                        What you need to prepare:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {(req.required_documents || req.mandatoryRecords || []).map((rec) => (
                          <span
                            key={rec.id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface border border-outline-variant font-code-statutory text-[11px] text-on-surface"
                          >
                            {rec.status === "verified" ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
                            ) : (
                              <Circle className="w-3.5 h-3.5 text-outline" />
                            )}
                            <span className={rec.status === "verified" ? "font-medium" : "text-on-surface-variant"}>
                              {rec.name}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer: Next Step */}
                  <div className="bg-surface-container px-space-md py-2.5 border-t border-outline-variant flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-xs">
                      {req.dossierReadiness >= 80 ? (
                        <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                      )}
                      <span>
                        <strong className="text-on-surface">Next step: </strong>
                        {req.next_step || req.actionNeeded}
                      </span>
                    </div>
                    <Link
                      to={`/requirements/${req.id}`}
                      className="inline-flex items-center gap-2 h-9 px-4 rounded bg-primary-container text-on-primary font-label-md text-xs font-semibold hover:bg-primary transition-colors shadow-xs"
                    >
                      <span>VIEW DETAILS & PREREQUISITES</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            }))}
          </div>

          {/* RIGHT COLUMN: ACTION STACK & INSTITUTIONAL HANDOFF (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-space-md">
            {/* ACTION PANEL: WHAT YOU NEED TO DO */}
            <section className="bg-surface-container-lowest rounded border border-outline-variant shadow-xs overflow-hidden">
              <div className="p-space-md border-b border-outline-variant bg-surface-container-low">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline-sm text-sm font-bold text-primary">
                    What You Need to Do
                  </h3>
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center font-mono text-xs font-bold">
                    {requirements.length}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Immediate prerequisites to unlock submission dossiers.
                </p>
              </div>

              <div className="divide-y divide-surface-variant">
                {requirements.map((req, idx) => (
                  <div key={req.id} className="p-3.5 hover:bg-surface transition-colors flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-surface-container-high text-primary flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/requirements/${req.id}`}
                        className="font-label-md text-xs text-primary font-bold hover:underline block truncate"
                      >
                        {req.actionNeeded}
                      </Link>
                      <p className="text-[11px] text-on-surface-variant mt-0.5 truncate">
                        {req.department} • {req.mandatoryRecords?.filter((r) => r.status === "verified").length} of {req.mandatoryRecords?.length} Records Ready
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[10px] text-outline font-mono">{req.portalName.split(" ")[0]}</span>
                        <span className="text-outline-variant">•</span>
                        <Link
                          to={`/requirements/${req.id}`}
                          className="font-label-sm text-xs text-secondary font-semibold hover:underline"
                        >
                          Resolve Prerequisite →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-space-md bg-surface-container border-t border-outline-variant">
                <button
                  onClick={() => openUploadModal()}
                  className="w-full h-10 rounded bg-secondary text-on-secondary font-label-md text-xs font-semibold hover:bg-on-secondary-container transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <span>UPLOAD MISSING RECORDS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* INSTITUTIONAL PROTOCOL CARD: OFFICIAL SERVICE HANDOFF */}
            <HandoffCard />

            {/* REGULATORY HELPDESK ASSISTANCE */}
            <div className="bg-surface-container-lowest p-space-md rounded border border-outline-variant flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-secondary-container/40 text-secondary flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-label-md text-xs text-primary font-bold">Need Clarification?</div>
                  <div className="font-body-sm text-[11px] text-on-surface-variant">
                    District Industries Centre (DIC) {businessProfile?.district || "Maharashtra"} Liaison
                  </div>
                </div>
              </div>
              <a
                href="mailto:gm.dic-nsk@maharashtra.gov.in"
                className="px-3 py-1.5 rounded border border-outline-variant hover:bg-surface-container text-xs text-primary font-semibold transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
