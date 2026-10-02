import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import AppLayout from "../components/layout/AppLayout";
import TimelineGrid from "../components/common/TimelineGrid";
import HandoffCard from "../components/common/HandoffCard";
import {
  GitFork,
  Files,
  CalendarCheck2,
  HandCoins,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Clock,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Building2,
  HelpCircle,
  AlertCircle,
  FileText,
  Compass,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    businessProfile,
    requirements,
    documents,
    complianceTasks,
    governmentSupport,
    metrics,
    primaryNextAction,
    openUploadModal,
  } = useApp();

  // Pending documents and tasks that need attention
  const pendingDocs = documents.filter((d) => d.status === "action_required");
  const verifiedDocs = documents.filter((d) => d.status === "verified");
  const upcomingTasks = complianceTasks.filter((t) => t.status === "Upcoming" || t.status === "Action Required");

  return (
    <AppLayout>
      <div className="flex flex-col space-y-space-lg max-w-7xl mx-auto pb-12">
        {/* SUBTLE PROTOTYPE / DEMO DATA BANNER */}
        <div className="p-2.5 px-4 bg-surface-container-high/60 border border-outline-variant/60 rounded flex flex-wrap items-center justify-between text-xs text-on-surface-variant gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="font-semibold text-primary">Prototype Mode</span>
            <span className="text-outline">|</span>
            <span>
              Curated regulatory dataset for evaluation. Not connected to live government filing APIs.
            </span>
          </div>
          {businessProfile?.isDemo !== false ? (
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-mono text-[10px] font-bold uppercase">
                Demo Profile Active
              </span>
              <Link to="/business-profile" className="text-secondary font-semibold hover:underline">
                Customize Business Profile →
              </Link>
            </div>
          ) : (
            <span className="px-2 py-0.5 rounded bg-secondary-container/50 text-secondary border border-secondary/30 font-mono text-[10px] font-bold uppercase">
              Custom Business Context
            </span>
          )}
        </div>

        {/* TOP CONTEXT & BREADCRUMBS */}
        <div className="flex flex-col gap-space-sm">
          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <nav className="flex items-center gap-2 font-code-statutory text-xs text-on-surface-variant">
              <span className="text-on-surface font-semibold">Regulatory Dashboard</span>
              <span className="text-outline-variant">|</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px] font-medium tracking-wide">
                Demo Regulatory Dataset
              </span>
            </nav>
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-xs uppercase tracking-wider text-outline font-semibold">
                Reference ID:
              </span>
              <span className="font-code-statutory text-xs font-semibold text-primary px-2 py-0.5 bg-surface-container rounded font-mono">
                {businessProfile?.referenceId || "MH-2024-REG"}
              </span>
            </div>
          </div>

          {/* Title & Context Ribbon */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-outline-variant">
            <div>
              <h1 className="font-headline-lg text-[26px] text-primary tracking-tight font-bold">
                Regulatory Dashboard
              </h1>
              <p className="font-body-md text-sm text-on-surface-variant mt-0.5">
                Overview of required approvals, document readiness, and compliance tasks for{" "}
                <strong className="text-primary">{businessProfile?.legalName}</strong>
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
                Change Context
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 ACTIONABLE STATUS CARDS (NO FAKE PERCENTAGES / AMOUNTS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Applicable Requirements */}
          <div className="bg-surface-container-lowest rounded border border-outline-variant p-4 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-[11px] font-bold text-outline uppercase tracking-wider">
                What May Apply
              </span>
              <span className="w-7 h-7 rounded bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs font-mono">
                {requirements.length}
              </span>
            </div>
            <div className="mt-3">
              <div className="font-headline-lg text-2xl font-bold text-primary">
                {requirements.length} Approvals
              </div>
              <p className="text-xs text-on-surface-variant mt-1 truncate">
                {requirements.map((r) => r.title.split(" ")[0]).join(", ") || "Identified Approvals"}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-surface-variant flex items-center justify-between">
              <Link to="/roadmap" className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1">
                View Roadmap <ChevronRight className="w-3 h-3" />
              </Link>
              <span className="text-[10px] text-outline">Stage 3 of 6</span>
            </div>
          </div>

          {/* Card 2: Document Readiness */}
          <div className="bg-surface-container-lowest rounded border border-outline-variant p-4 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-[11px] font-bold text-outline uppercase tracking-wider">
                Document Readiness
              </span>
              <span className="w-7 h-7 rounded bg-secondary-container/40 text-secondary flex items-center justify-center font-bold text-xs font-mono">
                {verifiedDocs.length}/{documents.length}
              </span>
            </div>
            <div className="mt-3">
              <div className="font-headline-lg text-xl font-bold text-secondary">
                {verifiedDocs.length} Ready / {pendingDocs.length} Need Review
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                {pendingDocs.length > 0 ? `${pendingDocs.length} records require action` : "All documents in order"}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-surface-variant flex items-center justify-between">
              <Link to="/documents" className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1">
                Open Documents Vault <ChevronRight className="w-3 h-3" />
              </Link>
              <span className="text-[10px] text-outline font-mono">{documents.length} Total</span>
            </div>
          </div>

          {/* Card 3: Compliance Tasks */}
          <div className="bg-surface-container-lowest rounded border border-outline-variant p-4 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-[11px] font-bold text-outline uppercase tracking-wider">
                Compliance Tasks
              </span>
              <span className="w-7 h-7 rounded bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs font-mono">
                {upcomingTasks.length}
              </span>
            </div>
            <div className="mt-3">
              <div className="font-headline-lg text-xl font-bold text-primary">
                {upcomingTasks.length} Upcoming
              </div>
              <p className="text-xs text-amber-800 font-medium mt-1 truncate">
                Next: {upcomingTasks[0]?.title || "Scheduled Obligation"}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-surface-variant flex items-center justify-between">
              <Link to="/compliance" className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1">
                View Calendar <ChevronRight className="w-3 h-3" />
              </Link>
              <span className="text-[10px] text-outline">{complianceTasks.length} Total</span>
            </div>
          </div>

          {/* Card 4: Government Support */}
          <div className="bg-surface-container-lowest rounded border border-outline-variant p-4 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-[11px] font-bold text-outline uppercase tracking-wider">
                Government Support
              </span>
              <span className="w-7 h-7 rounded bg-surface-container-high text-primary flex items-center justify-center font-bold text-xs font-mono">
                {governmentSupport.length}
              </span>
            </div>
            <div className="mt-3">
              <div className="font-headline-lg text-xl font-bold text-primary">
                {governmentSupport.length} Potentially Relevant
              </div>
              <p className="text-xs text-on-surface-variant mt-1 truncate">
                Eligibility to verify on official portals
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-surface-variant flex items-center justify-between">
              <Link to="/government-support" className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1">
                Explore Schemes <ChevronRight className="w-3 h-3" />
              </Link>
              <span className="text-[10px] text-outline">State & Central</span>
            </div>
          </div>
        </div>

        {/* REGULATORY JOURNEY (6-STAGE SEQUENCE) */}
        <TimelineGrid activeStage={3} />

        {/* PRIMARY CALLOUT: WHAT DO I DO NEXT? (ONE CLEAR ACTION) */}
        <div className="p-4 rounded bg-primary-container text-on-primary shadow-xs border border-primary flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded bg-secondary text-on-secondary flex items-center justify-center shrink-0 mt-0.5">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-[11px] uppercase tracking-wider font-bold text-secondary-fixed">
                  RECOMMENDED NEXT ACTION
                </span>
                <span className="text-outline text-xs">•</span>
                <span className="text-xs text-primary-fixed">Priority Step</span>
              </div>
              <h3 className="font-headline-sm text-base font-bold mt-0.5 text-on-primary">
                {primaryNextAction?.title || "Upload Pending Document in Workspace"}
              </h3>
              <p className="text-xs text-primary-fixed-dim mt-0.5">
                {primaryNextAction?.description || "Resolve missing documentation to prepare your formal submission dossier."}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => openUploadModal()}
              className="h-10 px-5 rounded bg-secondary text-on-secondary font-label-md text-xs font-semibold hover:bg-on-secondary-container transition-colors shadow-xs flex items-center gap-2"
            >
              <span>Upload Document Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2-COLUMN MAIN WORKSPACE: WHAT APPLIES? (LEFT) & WHAT NEEDS ATTENTION? (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* LEFT 7 COLUMNS: WHAT MAY APPLY TO YOUR BUSINESS */}
          <div className="lg:col-span-7 flex flex-col space-y-space-md">
            <div className="bg-surface-container-lowest p-space-md rounded border border-outline-variant shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-outline-variant">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                    <h2 className="font-headline-md text-base font-bold text-primary">
                      What may apply to your business
                    </h2>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Clearances identified for <strong>{businessProfile?.sector}</strong> in{" "}
                    <strong>{businessProfile?.district}, {businessProfile?.state}</strong>.
                  </p>
                </div>
                <Link
                  to="/roadmap"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline"
                >
                  Full Roadmap <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Requirements list */}
              <div className="divide-y divide-surface-variant mt-2">
                {requirements.map((req) => {
                  const matchStatus = req.matchStatus || "APPLICABLE";
                  return (
                    <div key={req.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface/50 transition-colors">
                      <div className="space-y-1 max-w-md">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-surface-container text-on-surface border border-outline-variant font-mono">
                            {req.category}
                          </span>
                          <span className="text-xs font-mono text-outline">{req.act || req.sourceReference}</span>
                          {matchStatus === "NEEDS_VERIFICATION" && (
                            <span className="px-2 py-0.2 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-900 border border-amber-300">
                              Needs Verification
                            </span>
                          )}
                          {matchStatus === "POTENTIALLY_APPLICABLE" && (
                            <span className="px-2 py-0.2 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-800 border border-blue-200">
                              Potentially Applicable
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-semibold text-primary">
                          <Link to={`/requirements/${req.id}`} className="hover:text-secondary hover:underline">
                            {req.title}
                          </Link>
                        </h4>
                        {req.whyItApplies ? (
                          <p className="text-xs text-on-surface-variant line-clamp-2">
                            <strong className="text-on-surface">Why it may apply: </strong>
                            {req.whyItApplies}
                          </p>
                        ) : (
                          <p className="text-xs text-on-surface-variant line-clamp-1">{req.department}</p>
                        )}
                      </div>

                      <div className="flex sm:flex-col items-end justify-between gap-2 shrink-0">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-semibold bg-surface-container text-primary border border-outline-variant">
                          {req.status || "Action Needed"}
                        </span>
                        <Link
                          to={`/requirements/${req.id}`}
                          className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1"
                        >
                          Details <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Link Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/documents"
                className="p-4 rounded bg-surface-container-lowest border border-outline-variant hover:border-primary transition-all shadow-xs group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-primary-container text-on-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Files className="w-4 h-4 text-secondary-container" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary group-hover:text-secondary transition-colors">
                      Documents Workspace
                    </h4>
                    <p className="text-xs text-on-surface-variant">
                      {verifiedDocs.length} ready, {pendingDocs.length} need review
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-xs text-secondary font-semibold flex items-center gap-1">
                  Open Document Vault →
                </div>
              </Link>

              <Link
                to="/government-support"
                className="p-4 rounded bg-surface-container-lowest border border-outline-variant hover:border-primary transition-all shadow-xs group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-secondary text-on-secondary flex items-center justify-center group-hover:scale-105 transition-transform">
                    <HandCoins className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-primary group-hover:text-secondary transition-colors">
                      Government Support
                    </h4>
                    <p className="text-xs text-on-surface-variant">
                      {governmentSupport.length} programs potentially relevant
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-xs text-secondary font-semibold flex items-center gap-1">
                  Explore Scheme Guidelines →
                </div>
              </Link>
            </div>
          </div>

          {/* RIGHT 5 COLUMNS: WHAT NEEDS ATTENTION? & OFFICIAL HANDOFF */}
          <div className="lg:col-span-5 flex flex-col space-y-space-md">
            {/* SECTION: WHAT NEEDS ATTENTION? */}
            <section className="bg-surface-container-lowest rounded border border-outline-variant shadow-xs overflow-hidden">
              <div className="p-space-md border-b border-outline-variant bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  <h3 className="font-headline-sm text-sm font-bold text-primary">
                    What Needs Attention?
                  </h3>
                </div>
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center justify-center font-mono text-xs font-bold">
                  {pendingDocs.length + upcomingTasks.length}
                </span>
              </div>

              <div className="divide-y divide-surface-variant">
                {/* Pending Documents */}
                {pendingDocs.map((doc) => (
                  <div key={doc.id} className="p-3.5 hover:bg-surface transition-colors flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-amber-100 text-amber-900 flex items-center justify-center text-xs shrink-0 mt-0.5">
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-xs text-primary truncate">{doc.name}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 uppercase">
                          Review
                        </span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">{doc.notes}</p>
                      <button
                        onClick={() => openUploadModal(doc.requirementRef?.[0])}
                        className="text-[11px] text-secondary font-semibold hover:underline mt-1.5 inline-block"
                      >
                        Upload / Replace Record →
                      </button>
                    </div>
                  </div>
                ))}

                {/* Upcoming Compliance Actions */}
                {upcomingTasks.slice(0, 2).map((task) => (
                  <div key={task.id} className="p-3.5 hover:bg-surface transition-colors flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-surface-container-high text-primary flex items-center justify-center text-xs shrink-0 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-xs text-primary truncate">{task.title}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-surface-container text-on-surface uppercase">
                          {task.frequency}
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-800 font-medium mt-0.5">{task.urgency} ({task.dueDate})</p>
                      <Link
                        to="/compliance"
                        className="text-[11px] text-secondary font-semibold hover:underline mt-1.5 inline-block"
                      >
                        View Compliance Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* OFFICIAL SERVICE HANDOFF PROTOCOL CARD */}
            <HandoffCard />

            {/* DISTRICT INDUSTRIES CENTRE LIAISON HELP */}
            <div className="bg-surface-container-lowest p-space-md rounded border border-outline-variant flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-secondary-container/40 text-secondary flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-label-md text-xs text-primary font-bold">
                    District Industries Centre ({businessProfile?.district || "Maharashtra"})
                  </div>
                  <div className="text-[11px] text-on-surface-variant">General Manager Office Liaison</div>
                </div>
              </div>
              <Link
                to="/roadmap"
                className="px-2.5 py-1 rounded border border-outline-variant hover:bg-surface-container text-xs text-primary font-semibold transition-colors"
              >
                Helpdesk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
