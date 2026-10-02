import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Check, ShieldCheck, Compass } from "lucide-react";

export default function TimelineGrid({ activeStage = 3 }) {
  const navigate = useNavigate();
  const { businessProfile } = useApp();

  const stages = [
    { number: 1, label: "Business Profile", status: "Configured", path: "/business-profile", isCompleted: true },
    { number: 2, label: "Requirements", status: "Identified", path: "/roadmap", isCompleted: true },
    { number: 3, label: "Approvals", status: "Active Stage", path: "/roadmap", isCurrent: true },
    { number: 4, label: "Documents", status: "In Progress", path: "/documents" },
    { number: 5, label: "Compliance", status: "Upcoming", path: "/compliance" },
    { number: 6, label: "Support", status: "Explore", path: "/government-support" },
  ];

  return (
    <div className="bg-surface-container-lowest p-space-md rounded border border-outline-variant shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-primary" />
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
            REGULATORY JOURNEY
          </span>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
          Step {activeStage} of 6
        </span>
      </div>

      {/* 6-Stage Timeline Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 relative py-2">
        {/* Continuous back rail */}
        <div className="absolute top-8 left-8 right-8 h-0.5 bg-outline-variant -z-0 hidden md:block"></div>

        {stages.map((stage) => {
          const isDone = stage.number < activeStage || stage.isCompleted;
          const isCur = stage.number === activeStage || stage.isCurrent;

          return (
            <button
              key={stage.number}
              onClick={() => navigate(stage.path)}
              className="flex flex-col items-center text-center relative z-10 group focus:outline-none"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-code-statutory text-code-statutory font-bold transition-transform group-hover:scale-110 shadow-xs ${
                  isCur
                    ? "bg-primary-container text-on-primary ring-4 ring-surface-container-lowest ring-offset-2 ring-primary-container/40"
                    : isDone
                    ? "bg-secondary text-on-secondary ring-4 ring-surface-container-lowest"
                    : "bg-surface-container-high text-on-surface-variant ring-4 ring-surface-container-lowest opacity-80"
                }`}
              >
                {isDone && !isCur ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span>{stage.number}</span>
                )}
              </div>

              <span
                className={`font-label-sm text-[11px] font-semibold mt-2 tracking-wide truncate max-w-full ${
                  isCur ? "text-primary font-bold" : isDone ? "text-on-surface" : "text-on-surface-variant"
                }`}
              >
                {stage.number}. {stage.label}
              </span>

              {isCur ? (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-primary-container text-on-primary mt-0.5 uppercase tracking-wider">
                  ACTIVE
                </span>
              ) : (
                <span
                  className={`font-code-statutory text-[11px] font-medium mt-0.5 ${
                    isDone ? "text-secondary" : "text-outline"
                  }`}
                >
                  {stage.status}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Pipeline footnote */}
      <div className="mt-3 pt-2.5 border-t border-surface-variant flex flex-wrap items-center justify-between text-on-surface-variant font-body-sm text-[12px] gap-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
          <span>
            Curated sequence for {businessProfile?.sector || "Enterprise"} based on Maharashtra state policies & {businessProfile?.district || "local"} guidelines.
          </span>
        </div>
        <span className="font-code-statutory text-code-statutory text-outline font-medium">
          Prototype Mode • Curated Regulatory Data
        </span>
      </div>
    </div>
  );
}
