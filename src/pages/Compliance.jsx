import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import AppLayout from "../components/layout/AppLayout";
import {
  CalendarCheck2,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  FileCheck,
  Calendar,
  Building2,
  Scale,
} from "lucide-react";

export default function Compliance() {
  const { complianceTasks, toggleComplianceStatus, showToast, businessProfile } = useApp();
  const [filter, setFilter] = useState("all");

  const filteredTasks = complianceTasks.filter((task) => {
    if (filter === "upcoming") return task.status === "Action Required" || task.status === "Upcoming";
    if (filter === "completed") return task.status === "Completed";
    if (filter === "scheduled") return task.status === "Scheduled";
    return true;
  });

  return (
    <AppLayout>
      <div className="flex flex-col space-y-space-lg max-w-7xl mx-auto pb-12">
        {/* Top Context & Header */}
        <div className="flex flex-wrap items-center justify-between gap-y-2 border-b border-outline-variant pb-3">
          <div className="flex items-center gap-2 font-code-statutory text-xs text-on-surface-variant">
            <span>Overview</span>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">Compliance Tasks</span>
            <span className="text-outline-variant">|</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Demo Regulatory Dataset • Prototype Mode
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-outline">Enterprise Filing ID:</span>
            <span className="font-mono font-bold text-primary px-2 py-0.5 bg-surface-container rounded">
              {businessProfile?.referenceId}
            </span>
          </div>
        </div>

        {/* Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-[26px] text-primary tracking-tight font-bold">
              Recurring Compliance Tasks
            </h1>
            <p className="font-body-md text-sm text-on-surface-variant mt-0.5">
              Standard statutory filing calendar for {businessProfile?.sector} enterprises in {businessProfile?.district || "Maharashtra"}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-50 text-amber-900 border border-amber-300 text-xs font-semibold">
              <Clock className="w-4 h-4 text-amber-700" />
              Compliance: {complianceTasks.filter((t) => t.status === "Action Required" || t.status === "Upcoming").length} Upcoming
            </span>
          </div>
        </div>

        {/* SUMMARY STAT METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded bg-surface-container-lowest border border-outline-variant shadow-xs">
            <div className="text-[11px] font-bold text-outline uppercase tracking-wider">
              Compliance Tasks Tracked
            </div>
            <div className="text-2xl font-bold text-primary font-mono mt-1">
              {complianceTasks.length} Tasks
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1">Across official regulatory boards</p>
          </div>

          <div className="p-4 rounded bg-surface-container-lowest border border-outline-variant shadow-xs">
            <div className="text-[11px] font-bold text-outline uppercase tracking-wider">
              Upcoming & Due Soon
            </div>
            <div className="text-2xl font-bold text-amber-700 font-mono mt-1">
              {complianceTasks.filter((t) => t.status === "Action Required" || t.status === "Upcoming").length} Tasks
            </div>
            <p className="text-[11px] text-amber-800 font-medium mt-1">Immediate filing windows</p>
          </div>

          <div className="p-4 rounded bg-surface-container-lowest border border-outline-variant shadow-xs">
            <div className="text-[11px] font-bold text-outline uppercase tracking-wider">
              Completed / Filed
            </div>
            <div className="text-2xl font-bold text-secondary font-mono mt-1">
              {complianceTasks.filter((t) => t.status === "Completed").length} Filed
            </div>
            <p className="text-[11px] text-secondary font-medium mt-1">Recorded in enterprise ledger</p>
          </div>

          <div className="p-4 rounded bg-surface-container-lowest border border-outline-variant shadow-xs">
            <div className="text-[11px] font-bold text-outline uppercase tracking-wider">
              Scheduled Ahead
            </div>
            <div className="text-2xl font-bold text-primary font-mono mt-1">
              {complianceTasks.filter((t) => t.status === "Scheduled").length} Tasks
            </div>
            <p className="text-[11px] text-on-surface-variant mt-1">Quarterly & annual deadlines</p>
          </div>
        </div>

        {/* FILTER TABS & TASK LIST */}
        <div className="bg-surface-container-lowest p-space-md rounded border border-outline-variant shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
            <div className="inline-flex p-1 bg-surface-container rounded border border-outline-variant text-xs font-semibold">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded transition-colors ${
                  filter === "all"
                    ? "bg-surface-container-lowest text-primary font-bold shadow-xs border border-outline-variant/60"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                All Tasks ({complianceTasks.length})
              </button>
              <button
                onClick={() => setFilter("upcoming")}
                className={`px-3 py-1 rounded transition-colors ${
                  filter === "upcoming"
                    ? "bg-surface-container-lowest text-primary font-bold shadow-xs border border-outline-variant/60"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                Due Soon ({complianceTasks.filter((t) => t.status === "Action Required" || t.status === "Upcoming").length})
              </button>
              <button
                onClick={() => setFilter("scheduled")}
                className={`px-3 py-1 rounded transition-colors ${
                  filter === "scheduled"
                    ? "bg-surface-container-lowest text-primary font-bold shadow-xs border border-outline-variant/60"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                Scheduled ({complianceTasks.filter((t) => t.status === "Scheduled").length})
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-3 py-1 rounded transition-colors ${
                  filter === "completed"
                    ? "bg-surface-container-lowest text-primary font-bold shadow-xs border border-outline-variant/60"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                Completed ({complianceTasks.filter((t) => t.status === "Completed").length})
              </button>
            </div>
          </div>

          {/* TASK CARDS */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="p-12 text-center bg-surface-container-lowest rounded border border-outline-variant text-on-surface-variant flex flex-col items-center justify-center gap-2">
                <CalendarCheck2 className="w-8 h-8 text-outline" />
                <span className="font-semibold text-sm">No compliance tasks found</span>
                <p className="text-xs text-outline max-w-sm">
                  {filter !== "all"
                    ? "No tasks match the selected status filter."
                    : "No recurring compliance obligations found for the current enterprise profile."}
                </p>
              </div>
            ) : (
              filteredTasks.map((task) => {
              const isCompleted = task.status === "Completed";
              const isUrgent = task.status === "Action Required";

              return (
                <div
                  key={task.id}
                  className={`p-4 rounded border transition-all ${
                    isCompleted
                      ? "bg-surface-container-low/40 border-outline-variant/60"
                      : isUrgent
                      ? "bg-amber-50/40 border-amber-300"
                      : "bg-surface-container-lowest border-outline-variant hover:border-primary/40"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-surface-container text-on-surface border border-outline-variant">
                          {task.category}
                        </span>
                        <span className="text-xs font-mono text-outline">{task.authority}</span>
                        <span className="text-xs font-mono text-outline">• {task.frequency}</span>
                      </div>

                      <h3 className="text-sm font-bold text-primary">{task.title}</h3>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        {task.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-outline pt-1 flex-wrap">
                        <span className="flex items-center gap-1 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          Statutory Due Date: <strong className="text-on-surface">{task.dueDate}</strong>
                        </span>
                        <span className="text-amber-800 font-medium">
                          Penalty Risk: {task.penaltyRisk}
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-end justify-between gap-2.5 shrink-0">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-bold uppercase ${
                          isCompleted
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : isUrgent
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : "bg-surface-container text-on-surface-variant border border-outline-variant"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        {task.urgency}
                      </span>

                      <div className="flex items-center gap-2">
                        {task.filingPortal.startsWith("http") && (
                          <a
                            href={task.filingPortal}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded border border-outline-variant hover:bg-surface-container text-primary text-xs font-semibold flex items-center gap-1"
                            title="Open Official Filing Portal"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span className="hidden md:inline">Filing Gateway</span>
                          </a>
                        )}

                        <button
                          onClick={() => toggleComplianceStatus(task.id)}
                          className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                            isCompleted
                              ? "border border-outline-variant hover:bg-surface-container text-on-surface-variant"
                              : "bg-primary-container text-on-primary hover:bg-primary shadow-xs"
                          }`}
                        >
                          {isCompleted ? "Reopen Task" : "Mark as Filed"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }))}
          </div>
        </div>

        {/* STATUTORY JURISDICTION FOOTNOTE */}
        <div className="p-4 rounded bg-surface-container-low border border-outline-variant/60 flex items-start gap-3 text-xs text-on-surface-variant">
          <Scale className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-primary">Statutory Disclaimer: </strong>
            UdyamSetu provides curated regulatory schedules based on standard Maharashtra state and central compliance requirements. Official acknowledgments, challan payments, and filing numbers are issued solely by the respective government portals.
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
