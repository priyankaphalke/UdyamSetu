import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  Bell,
  ChevronDown,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  UserCheck,
} from "lucide-react";

export default function Header() {
  const { businessProfile, user, loadDemoProfile } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSwitcher, setShowSwitcher] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Statutory Dossier Ingestion Check Active",
      time: "Just now",
      type: "action",
      desc: `Pre-screening rules loaded for ${businessProfile?.sector || "Enterprise"} in ${businessProfile?.district || "Maharashtra"}.`,
    },
    {
      id: 2,
      title: "P-Tax Monthly Remittance Due in 11 Days",
      time: "1 day ago",
      type: "warning",
      desc: `Maharashtra State Tax deposit for employees under ${businessProfile?.district || "Maharashtra"} jurisdiction.`,
    },
    {
      id: 3,
      title: "Industrial Incentive Match Available",
      time: "3 days ago",
      type: "info",
      desc: `Maharashtra PSI 2019 incentives pre-screened for ${businessProfile?.classification || "MSME"} scale.`,
    },
  ];

  return (
    <header className="fixed top-0 left-64 right-0 h-20 bg-surface-container-lowest border-b border-outline-variant z-40 px-6 sm:px-8">
      <div className="h-full w-full flex items-center justify-between gap-4">
        {/* Left: Enterprise Greeting & Identity */}
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded bg-primary-container flex items-center justify-center text-on-primary shrink-0 shadow-xs">
            <Building2 className="w-5 h-5 text-secondary-container" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-headline-sm text-[15px] text-on-surface font-bold truncate">
                Good morning, {businessProfile?.brandName || businessProfile?.legalName || "Enterprise"}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-secondary-container/40 text-on-secondary-container border border-secondary/20">
                <CheckCircle2 className="w-3 h-3 text-secondary" />
                {businessProfile?.classification || "MSME"} Scale
              </span>
              {businessProfile?.isDemo !== false && (
                <span className="hidden sm:inline-flex items-center px-2 py-0.2 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300 uppercase">
                  Demo Context
                </span>
              )}
            </div>
            <span className="font-body-sm text-[12px] text-on-surface-variant truncate">
              {businessProfile?.sector} • {businessProfile?.district}, {businessProfile?.state} | Ref ID:{" "}
              <strong className="text-primary font-mono">{businessProfile?.referenceId}</strong>
            </span>
          </div>
        </div>

        {/* Right: Quick Context Controls & User Avatar */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Entity & Industry Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSwitcher(!showSwitcher)}
              className="hidden sm:flex items-center gap-2 h-10 px-3 bg-surface-container border border-outline-variant rounded hover:bg-surface-container-high transition-colors"
            >
              <span className="font-label-md text-xs text-on-surface font-semibold truncate max-w-[150px]">
                {businessProfile?.legalName || "Select Business"}
              </span>
              <ChevronDown className="w-4 h-4 text-on-surface-variant" />
            </button>

            {showSwitcher && (
              <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest border border-outline-variant rounded shadow-xl z-50 overflow-hidden text-xs">
                <div className="p-3 bg-surface-container-low border-b border-outline-variant">
                  <span className="font-bold text-primary block">Active Business Profile</span>
                  <span className="text-[11px] text-on-surface-variant">
                    {businessProfile?.sector} • {businessProfile?.district}
                  </span>
                </div>
                <div className="p-2 space-y-1">
                  <div className="text-[10px] font-bold text-outline uppercase px-2 py-1">
                    Quick Sample Presets:
                  </div>
                  <button
                    onClick={() => {
                      loadDemoProfile("abc_foods");
                      setShowSwitcher(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-surface-container text-xs text-primary font-medium flex items-center justify-between"
                  >
                    <span>ABC Foods (Food Processing)</span>
                    <span className="text-[10px] text-outline font-mono">Nashik</span>
                  </button>
                  <button
                    onClick={() => {
                      loadDemoProfile("pune_tech");
                      setShowSwitcher(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-surface-container text-xs text-primary font-medium flex items-center justify-between"
                  >
                    <span>CloudSoft (IT / Software)</span>
                    <span className="text-[10px] text-outline font-mono">Pune</span>
                  </button>
                  <button
                    onClick={() => {
                      loadDemoProfile("nagpur_mfg");
                      setShowSwitcher(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded hover:bg-surface-container text-xs text-primary font-medium flex items-center justify-between"
                  >
                    <span>Vidarbha Forging (Mfg)</span>
                    <span className="text-[10px] text-outline font-mono">Nagpur</span>
                  </button>
                </div>
                <div className="p-2.5 bg-surface-container border-t border-outline-variant text-center">
                  <Link
                    to="/business-profile"
                    onClick={() => setShowSwitcher(false)}
                    className="text-xs font-semibold text-secondary hover:underline flex items-center justify-center gap-1"
                  >
                    Configure Custom Profile <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Notifications Button & Flyout */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
              className="relative w-10 h-10 flex items-center justify-center rounded border border-outline-variant bg-surface-container-lowest hover:bg-surface-container transition-colors"
            >
              <Bell className="w-4 h-4 text-on-surface-variant" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary ring-2 ring-surface-container-lowest"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface-container-lowest border border-outline-variant rounded shadow-xl z-50 overflow-hidden">
                <div className="p-3 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
                  <span className="font-label-md text-xs font-bold text-primary">Regulatory Alerts</span>
                  <span className="text-[10px] font-mono bg-primary-fixed text-primary-container px-2 py-0.5 rounded font-semibold">
                    3 Active
                  </span>
                </div>
                <div className="divide-y divide-surface-variant max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-surface transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-primary">{n.title}</span>
                        <span className="text-[10px] text-outline whitespace-nowrap">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant mt-1 leading-normal">{n.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2.5 bg-surface-container border-t border-outline-variant text-center">
                  <Link
                    to="/compliance"
                    onClick={() => setShowNotifications(false)}
                    className="text-xs font-semibold text-secondary hover:underline"
                  >
                    View Compliance Calendar →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Signatory Profile Pill */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-outline-variant">
            <div className="w-9 h-9 rounded bg-primary flex items-center justify-center text-on-primary font-bold text-xs shadow-xs">
              {businessProfile?.contactPerson ? businessProfile.contactPerson.substring(0, 2).toUpperCase() : "AD"}
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="font-label-sm text-[12px] text-on-surface font-semibold leading-tight">
                {businessProfile?.contactPerson || user?.fullName || "Signatory Admin"}
              </span>
              <span className="font-code-statutory text-[10px] text-on-surface-variant leading-tight">
                {businessProfile?.designation || "Compliance Director"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
