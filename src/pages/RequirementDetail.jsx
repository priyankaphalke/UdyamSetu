import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import AppLayout from "../components/layout/AppLayout";
import HandoffCard from "../components/common/HandoffCard";
import {
  ArrowLeft,
  Landmark,
  ShieldCheck,
  Clock,
  IndianRupee,
  Calendar,
  CheckCircle2,
  Circle,
  AlertTriangle,
  UploadCloud,
  FileDown,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  HelpCircle,
  Check,
  FileText,
} from "lucide-react";

export default function RequirementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { requirements, openUploadModal, showToast, businessProfile } = useApp();

  // Find target requirement or fallback to first
  const req = requirements.find((r) => r.id === id) || requirements[0];

  if (!req) {
    return (
      <AppLayout>
        <div className="p-8 text-center">
          <p>Requirement not found.</p>
          <Link to="/roadmap" className="text-secondary font-bold underline mt-2 block">
            Return to Roadmap
          </Link>
        </div>
      </AppLayout>
    );
  }

  const handleExportDossier = () => {
    showToast(`Dossier package compiled for ${req.title} with SHA-256 integrity seal.`);
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-space-lg max-w-7xl mx-auto pb-12">
        {/* Top Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-outline-variant pb-3">
          <div className="flex items-center gap-2 font-code-statutory text-xs text-on-surface-variant">
            <Link to="/dashboard" className="hover:text-primary">
              Overview
            </Link>
            <span className="text-outline-variant">/</span>
            <Link to="/roadmap" className="hover:text-primary">
              Regulatory Roadmap
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold truncate max-w-md">{req.title}</span>
          </div>

          <Link
            to="/roadmap"
            className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-primary font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Regulatory Roadmap
          </Link>
        </div>

        {/* Header Ribbon & Authority Details */}
        <div className="bg-surface-container-lowest p-space-md rounded border border-outline-variant shadow-xs">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface-container-high text-on-surface border border-outline-variant">
                  {req.category}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                  {req.priority} PRIORITY
                </span>
                <span className="font-code-statutory text-xs font-mono text-outline">
                  Statute: {req.act}
                </span>
              </div>

              <h1 className="font-headline-lg text-2xl font-bold text-primary">
                {req.title}
              </h1>

              <div className="flex items-center gap-3 text-xs text-on-surface-variant flex-wrap">
                <span className="flex items-center gap-1 font-medium text-primary">
                  <Landmark className="w-4 h-4 text-secondary" />
                  {req.department}
                </span>
                <span>•</span>
                <span>
                  Official Source:{" "}
                  {req.officialSourceUrl || req.portalUrl ? (
                    <a
                      href={req.officialSourceUrl || req.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-secondary hover:underline inline-flex items-center gap-1"
                    >
                      {req.officialSourceName || req.portalName || "Official Portal"}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <strong className="text-on-surface">{req.officialSourceName || req.portalName}</strong>
                  )}
                </span>
                {req.sourceReference && (
                  <>
                    <span>•</span>
                    <span className="font-mono text-outline">{req.sourceReference}</span>
                  </>
                )}
              </div>
            </div>

            {/* Document Readiness Status */}
            <div className="bg-surface-container-low p-3.5 rounded border border-outline-variant text-right shrink-0 min-w-[200px]">
              <div className="text-[11px] font-bold text-outline uppercase tracking-wider">
                Document Readiness
              </div>
              <div className="text-xl font-bold font-mono text-secondary mt-0.5">
                {(req.mandatoryRecords || []).filter((d) => d.status === "verified").length} of {(req.mandatoryRecords || []).length} Ready
              </div>
              <div className="text-[11px] text-on-surface-variant mt-1 font-medium">
                {(req.mandatoryRecords || []).some((d) => d.status !== "verified")
                  ? "Prerequisites Pending Review"
                  : "All Records Ready for Portal Filing"}
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-surface-variant">
            <div className="p-2.5 bg-surface rounded border border-outline-variant/60">
              <div className="text-[10px] font-mono text-outline uppercase">Processing Time</div>
              <div className="text-xs font-bold text-primary mt-0.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-secondary" />
                {req.estimatedTimeline || "15-30 working days"}
              </div>
            </div>

            <div className="p-2.5 bg-surface rounded border border-outline-variant/60">
              <div className="text-[10px] font-mono text-outline uppercase">Statutory Fee</div>
              <div className="text-xs font-bold text-primary mt-0.5 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-secondary" />
                {typeof req.estimatedFee === "number" ? `₹${req.estimatedFee.toLocaleString()}` : (req.estimatedFee || "As per scale")}
              </div>
            </div>

            <div className="p-2.5 bg-surface rounded border border-outline-variant/60">
              <div className="text-[10px] font-mono text-outline uppercase">Validity & Renewal</div>
              <div className="text-xs font-bold text-primary mt-0.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-secondary" />
                {req.validity || (req.validityYears ? `${req.validityYears} Years` : "Perpetual / Annual")}
              </div>
            </div>

            <div className="p-2.5 bg-surface rounded border border-outline-variant/60">
              <div className="text-[10px] font-mono text-outline uppercase">Audit / Verification</div>
              <div className="text-xs font-bold text-primary mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary" />
                {req.verificationStatus === "pending_field_verification" ? "Pending Site Audit" : "Statutory Scrutiny"}
              </div>
            </div>
          </div>
        </div>

        {/* Verification Alert if applicable */}
        {req.verificationNotes && (
          <div className="p-3.5 rounded bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Manual Verification Recommended: </strong>
              <span>{req.verificationNotes}</span>
            </div>
          </div>
        )}

        {/* 2-Column Content Layout: Left Details / Right Actions & Handoff */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* LEFT 8 COLUMNS: WHY IT APPLIES, RECORDS CHECKLIST, STEP-BY-STEP */}
          <div className="lg:col-span-8 flex flex-col space-y-space-md">
            {/* Why it may apply */}
            <section className="bg-surface-container-lowest rounded border border-outline-variant p-space-md shadow-xs">
              <div className="flex items-center gap-2 pb-2.5 border-b border-outline-variant mb-3">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <h3 className="font-headline-sm text-sm font-bold text-primary">
                  Why it may apply
                </h3>
              </div>
              <p className="text-xs text-on-surface leading-relaxed">
                {req.whyItApplies || req.statutoryTriggers || "Applicable based on business sector, operational activities, and jurisdictional regulations."}
              </p>
              {req.nextStep && (
                <div className="mt-3 p-3 bg-secondary-container/20 rounded border border-secondary/30 text-xs text-on-surface">
                  <strong className="text-secondary font-semibold">Next step: </strong>
                  <span>{req.nextStep}</span>
                </div>
              )}
              {req.renewalInformation && (
                <div className="mt-2 p-3 bg-surface-container-low rounded border border-outline-variant/50 text-xs text-on-surface-variant">
                  <strong className="text-primary font-semibold">Renewal Information: </strong>
                  <span>{req.renewalInformation}</span>
                </div>
              )}
              {req.processSummary && (
                <div className="mt-2 p-3 bg-surface-container-low rounded border border-outline-variant/50 text-xs text-on-surface-variant">
                  <strong className="text-primary font-semibold">Process Summary: </strong>
                  <span>{req.processSummary}</span>
                </div>
              )}
            </section>

            {/* What you need to prepare Checklist */}
            <section className="bg-surface-container-lowest rounded border border-outline-variant p-space-md shadow-xs">
              <div className="flex items-center justify-between pb-2.5 border-b border-outline-variant mb-3">
                <div>
                  <h3 className="font-headline-sm text-sm font-bold text-primary">
                    What you need to prepare
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    Supporting records and exhibits required for official verification.
                  </p>
                </div>
                <button
                  onClick={() => openUploadModal(req.id)}
                  className="px-3 py-1.5 rounded bg-primary-container text-on-primary text-xs font-semibold hover:bg-primary transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  Upload Record
                </button>
              </div>

              <div className="divide-y divide-surface-variant">
                {req.mandatoryRecords.map((rec) => {
                  const isVerified = rec.status === "verified";
                  return (
                    <div
                      key={rec.id}
                      className="py-3 flex items-center justify-between gap-3 hover:bg-surface/60 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                            isVerified ? "bg-secondary text-on-secondary" : "bg-amber-100 text-amber-900"
                          }`}
                        >
                          {isVerified ? <Check className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-primary block">
                            {rec.name}
                          </span>
                          <span className="text-[11px] text-outline font-mono">
                            {rec.required ? "Mandatory Legal Prerequisite" : "Optional Supporting Exhibit"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                            isVerified
                              ? "bg-secondary-container/40 text-on-secondary-container border border-secondary/30"
                              : "bg-amber-100 text-amber-800 border border-amber-300"
                          }`}
                        >
                          {isVerified ? "Verified" : "Action Required"}
                        </span>
                        {!isVerified && (
                          <button
                            onClick={() => openUploadModal(req.id)}
                            className="text-xs text-secondary font-semibold hover:underline"
                          >
                            Resolve →
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Step-by-Step Statutory Procedure Guide */}
            <section className="bg-surface-container-lowest rounded border border-outline-variant p-space-md shadow-xs">
              <div className="pb-2.5 border-b border-outline-variant mb-4">
                <h3 className="font-headline-sm text-sm font-bold text-primary">
                  Official Statutory Procedure
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Sequential roadmap to secure formal grant from {req.portalName}.
                </p>
              </div>

              <div className="space-y-4">
                {req.steps.map((st) => (
                  <div key={st.stepNumber} className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        st.status === "completed"
                          ? "bg-secondary text-on-secondary"
                          : st.status === "in_progress"
                          ? "bg-primary-container text-on-primary ring-2 ring-primary-container/40"
                          : "bg-surface-container text-outline"
                      }`}
                    >
                      {st.status === "completed" ? <Check className="w-4 h-4" /> : st.stepNumber}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-primary">{st.title}</h4>
                        <span
                          className={`text-[10px] font-bold uppercase font-mono px-2 py-0.2 rounded ${
                            st.status === "completed"
                              ? "text-secondary"
                              : st.status === "in_progress"
                              ? "bg-primary-fixed text-primary-container"
                              : "text-outline"
                          }`}
                        >
                          {st.status.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-[12px] text-on-surface-variant mt-0.5 leading-normal">
                        {st.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Compliance Dos & Don'ts */}
            {req.dosAndDonts && (
              <section className="bg-surface-container-lowest rounded border border-outline-variant p-space-md shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-secondary-container/20 rounded border border-secondary/30">
                    <div className="font-bold text-xs text-secondary flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary" />
                      Statutory Best Practices (Dos)
                    </div>
                    <ul className="text-xs text-on-surface space-y-1.5 pl-4 list-disc">
                      {req.dosAndDonts.dos.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-red-50 rounded border border-red-200">
                    <div className="font-bold text-xs text-red-800 flex items-center gap-1.5 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-700" />
                      Rejection Pitfalls (Don'ts)
                    </div>
                    <ul className="text-xs text-red-900 space-y-1.5 pl-4 list-disc">
                      {req.dosAndDonts.donts.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* RIGHT 4 COLUMNS: OFFICIAL DISPATCH ACTIONS & HANDOFF PROTOCOL */}
          <div className="lg:col-span-4 flex flex-col space-y-space-md">
            {/* Direct Official Portal Dispatch Card */}
            <section className="bg-surface-container-lowest rounded border border-outline-variant p-space-md shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-outline-variant">
                <ExternalLink className="w-4 h-4 text-primary" />
                <h4 className="font-headline-sm text-sm font-bold text-primary">
                  Official Portal Handoff
                </h4>
              </div>
              <p className="text-xs text-on-surface leading-relaxed">
                Ready to submit? UdyamSetu prepares your application schema and pre-checks documents. Click below to proceed to the official government filing system.
              </p>

              <a
                href={req.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 rounded bg-primary-container text-on-primary font-label-md text-xs font-semibold hover:bg-primary transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Proceed to {req.portalName}</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleExportDossier}
                className="w-full h-10 rounded border border-outline-variant bg-surface-container-low hover:bg-surface-container text-xs font-semibold text-primary flex items-center justify-center gap-2 transition-colors"
              >
                <FileDown className="w-4 h-4 text-secondary" />
                <span>Download Pre-Screened Dossier (.PDF)</span>
              </button>

              <div className="text-[11px] text-outline text-center">
                Package SHA-256 Digest: <span className="font-mono">8f92...c410</span>
              </div>
            </section>

            {/* Standard Institutional Handoff Protocol Card */}
            <HandoffCard />

            {/* Helpdesk Support Card */}
            <div className="bg-surface-container-lowest p-space-md rounded border border-outline-variant flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-secondary-container/40 text-secondary flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-label-md text-xs text-primary font-bold">{req.department} • {businessProfile?.district || "Maharashtra"} Liaison</div>
                  <div className="text-[11px] text-on-surface-variant">Regional Facilitation Desk</div>
                </div>
              </div>
              <a
                href="mailto:helpdesk@fda.maharashtra.gov.in"
                className="px-2.5 py-1 rounded border border-outline-variant hover:bg-surface-container text-xs text-primary font-semibold"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
