import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  LayoutDashboard,
  Building2,
  GitFork,
  Files,
  CalendarCheck2,
  HandCoins,
  HelpCircle,
  Settings,
  LogOut,
  ShieldCheck,
  Scale,
} from "lucide-react";

export default function Sidebar() {
  const { businessProfile, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { label: "Business Profile", path: "/business-profile", icon: Building2 },
    { label: "Regulatory Roadmap", path: "/roadmap", icon: GitFork },
    { label: "Documents", path: "/documents", icon: Files },
    { label: "Compliance", path: "/compliance", icon: CalendarCheck2 },
    { label: "Government Support", path: "/government-support", icon: HandCoins },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-lowest border-r border-outline-variant z-50 flex flex-col justify-between select-none">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="h-20 px-5 flex items-center gap-3 border-b border-outline-variant">
          <div className="w-9 h-9 rounded bg-primary-container flex items-center justify-center text-on-primary shrink-0 shadow-sm">
            <Scale className="w-5 h-5 text-secondary-container" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-[15px] font-bold text-primary tracking-tight truncate uppercase">
              UDYAMSETU
            </span>
            <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider truncate font-semibold">
              Regulatory Intelligence
            </span>
          </div>
        </div>

        {/* Primary Navigation */}
        <div className="px-3 py-4">
          <div className="px-3 pb-2 font-label-sm text-[11px] text-outline uppercase tracking-wider font-semibold">
            Navigation
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                (item.path === "/dashboard" && location.pathname === "/");

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded transition-colors text-body-md ${
                    isActive
                      ? "bg-primary-container text-on-primary font-semibold shadow-sm"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-secondary-fixed" : "text-outline"}`} />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom System & Jurisdiction Section */}
      <div className="px-3 pb-5 flex flex-col gap-3">
        <div className="border-t border-outline-variant pt-3">
          <div className="px-3 pb-2 font-label-sm text-[11px] text-outline uppercase tracking-wider font-semibold">
            System
          </div>
          <nav className="space-y-1">
            <NavLink
              to="/roadmap"
              className="flex items-center gap-3 px-3 py-2 rounded text-body-md text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-outline" />
              <span>DIC Helpdesk</span>
            </NavLink>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded text-body-md text-red-700 hover:bg-red-50 transition-colors text-left"
            >
              <LogOut className="w-4 h-4 text-red-600" />
              <span>Sign Out</span>
            </button>
          </nav>
        </div>

        {/* State Jurisdiction Badge */}
        <div className="mx-1 p-2.5 bg-surface-container border border-outline-variant/60 rounded flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-secondary-container/50 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-secondary" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-[12px] text-on-surface font-semibold truncate leading-tight">
              Maharashtra
            </span>
            <span className="font-code-statutory text-[10px] text-on-surface-variant truncate uppercase tracking-wide">
              Regulatory Guidance (Prototype)
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
