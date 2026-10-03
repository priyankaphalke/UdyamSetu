import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  Scale,
  Building2,
  ChevronDown,
  LogOut,
  User,
  Menu,
  X,
  FileText,
  CalendarCheck2,
  HandCoins,
  LayoutDashboard,
  ExternalLink,
  ShieldCheck,
  Compass,
} from "lucide-react";

export default function Header() {
  const { businessProfile, user, logout, showToast } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN"); // 'EN' | 'MR'
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setShowUserMenu(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    setShowUserMenu(false);
    setMobileMenuOpen(false);
    await logout();
    navigate("/login", { replace: true });
  };

  const handleLangToggle = (lang) => {
    setCurrentLang(lang);
    if (lang === "MR") {
      showToast("मराठी भाषा निवडली (Language set to Marathi)");
    } else {
      showToast("Language set to English");
    }
  };

  const publicNavLinks = [
    { label: currentLang === "MR" ? "मुख्यपृष्ठ" : "Home", path: "/" },
    { label: currentLang === "MR" ? "सेवा" : "Services", path: "/services" },
    { label: currentLang === "MR" ? "उद्योग" : "Industries", path: "/industries" },
    { label: currentLang === "MR" ? "नियामक क्षेत्रे" : "Regulatory Areas", path: "/regulatory-areas" },
    { label: currentLang === "MR" ? "शासकीय योजना" : "Government Support", path: "/government-support" },
    { label: currentLang === "MR" ? "संसाधने" : "Resources", path: "/resources" },
    { label: currentLang === "MR" ? "माहिती" : "About", path: "/about" },
  ];

  return (
    <header className="w-full bg-[#082B52] text-white select-none sticky top-0 z-40 transition-all duration-200">
      {/* 1. TOP UTILITY BAR (India.gov.in & Maharashtra Government style) */}
      <div className="bg-[#051c35] text-[#b5d4ec] text-[11px] py-1 border-b border-[#082B52]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">Government of Maharashtra</span>
            <span className="text-[#8a96a3]">|</span>
            <span className="hidden sm:inline">Industries • Investment • Entrepreneurship</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-medium">
              <button
                type="button"
                onClick={() => handleLangToggle("EN")}
                className={`hover:text-white transition-colors ${currentLang === "EN" ? "text-white font-bold underline underline-offset-2" : "text-[#b5d4ec]"}`}
                aria-label="Set language to English"
              >
                English
              </button>
              <span className="text-[#8a96a3]">|</span>
              <button
                type="button"
                onClick={() => handleLangToggle("MR")}
                className={`hover:text-white transition-colors ${currentLang === "MR" ? "text-white font-bold underline underline-offset-2" : "text-[#b5d4ec]"}`}
                aria-label="मराठी भाषा निवडा"
              >
                मराठी
              </button>
            </div>

            <span className="text-[#8a96a3]">|</span>

            <button
              type="button"
              onClick={() => {
                const widgetBtn = document.querySelector('button[aria-label="Open Accessibility Tools"]');
                if (widgetBtn) widgetBtn.click();
              }}
              className="hover:text-white transition-colors flex items-center gap-1 text-[11px]"
              aria-label="Toggle Accessibility Menu"
            >
              <span aria-hidden="true">♿</span>
              <span className="hidden sm:inline">Accessibility</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tricolor / State Accent Strip (Saffron, White, Green) */}
      <div className="h-1 w-full bg-gradient-to-r from-[#F39A24] via-[#FFFFFF] to-[#16845B]" />

      {/* 2. MAIN HEADER BRANDING & ACTION BAR */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-200 ${isScrolled ? "py-2" : "py-3"}`}>
        <div className="flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group text-left">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded bg-[#0B3A6E] border border-[#1e528b] flex items-center justify-center text-white shrink-0 shadow-sm group-hover:border-[#F39A24] transition-colors">
              <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-[#F39A24]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-none font-serif">
                  UdyamSetu
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#16845B] text-white border border-[#1c9c6d] tracking-wider hidden sm:inline-block">
                  Maharashtra MSME
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-[#cfe5ff] tracking-normal mt-1 font-medium hidden md:block">
                Your Regulatory Copilot for a Stronger Maharashtra
              </span>
            </div>
          </Link>

          {/* Right: Workspace & Authentication Status */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              // AUTHENTICATED STATE
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#0B3A6E] hover:bg-[#072445] border border-[#1e528b] hover:border-[#F39A24] text-white text-xs font-semibold transition-all shadow-xs"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-[#F39A24]" />
                  <span>Command Center</span>
                </Link>

                <Link
                  to="/business-profile"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#0B3A6E]/60 hover:bg-[#0B3A6E] border border-[#1e528b]/60 text-white text-xs font-medium transition-colors"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#cfe5ff]" />
                  <span className="max-w-[120px] truncate">{businessProfile?.brandName || "Profile"}</span>
                </Link>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-1.5 rounded hover:bg-[#0B3A6E] border border-transparent hover:border-[#1e528b] transition-colors text-xs"
                    aria-label="User Account Menu"
                    aria-expanded={showUserMenu}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#F39A24] text-[#082B52] font-bold flex items-center justify-center text-xs shadow-xs">
                      {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 text-[#cfe5ff] transition-transform ${showUserMenu ? "rotate-180" : ""}`} />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white text-[#17212B] rounded-md border border-[#D5DCE4] shadow-xl z-50 overflow-hidden text-xs animate-in fade-in zoom-in-95 duration-100">
                      <div className="p-3 bg-[#F4F6F8] border-b border-[#D5DCE4]">
                        <div className="font-bold text-[#082B52] truncate">
                          {user?.fullName || "Enterprise Administrator"}
                        </div>
                        <div className="text-[#5E6B75] text-[11px] truncate mt-0.5">
                          {user?.email || "enterprise@maharashtra.in"}
                        </div>
                        <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#e1f5ee] text-[#16845B] text-[10px] font-semibold border border-[#9ee0ca]">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Enterprise Active</span>
                        </div>
                      </div>

                      <div className="p-2 space-y-1">
                        <Link
                          to="/dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 p-2 rounded hover:bg-[#F4F6F8] text-[#17212B] font-medium"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#0B3A6E]" />
                          <span>Regulatory Command Center</span>
                        </Link>
                        <Link
                          to="/business-profile"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 p-2 rounded hover:bg-[#F4F6F8] text-[#17212B] font-medium"
                        >
                          <Building2 className="w-4 h-4 text-[#0B3A6E]" />
                          <span>Enterprise Profile</span>
                        </Link>
                        <Link
                          to="/roadmap"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 p-2 rounded hover:bg-[#F4F6F8] text-[#17212B] font-medium"
                        >
                          <Compass className="w-4 h-4 text-[#0B3A6E]" />
                          <span>Regulatory Roadmap</span>
                        </Link>
                        <Link
                          to="/documents"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 p-2 rounded hover:bg-[#F4F6F8] text-[#17212B] font-medium"
                        >
                          <FileText className="w-4 h-4 text-[#0B3A6E]" />
                          <span>Document Workspace</span>
                        </Link>
                        <Link
                          to="/compliance"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 p-2 rounded hover:bg-[#F4F6F8] text-[#17212B] font-medium"
                        >
                          <CalendarCheck2 className="w-4 h-4 text-[#0B3A6E]" />
                          <span>Compliance Calendar</span>
                        </Link>
                        <Link
                          to="/dashboard/government-support"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 p-2 rounded hover:bg-[#F4F6F8] text-[#17212B] font-medium"
                        >
                          <HandCoins className="w-4 h-4 text-[#0B3A6E]" />
                          <span>Tailored Support Schemes</span>
                        </Link>

                        <div className="border-t border-[#D5DCE4] pt-1 mt-1">
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 p-2 rounded hover:bg-red-50 text-red-700 text-left transition-colors font-medium"
                          >
                            <LogOut className="w-4 h-4 text-red-600" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // UNAUTHENTICATED STATE
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded hover:bg-[#0B3A6E] text-white text-xs font-semibold transition-colors border border-transparent hover:border-[#1e528b]"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#16845B] hover:bg-[#0c5036] text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Create Business Profile</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {user && (
              <div className="w-7 h-7 rounded-full bg-[#F39A24] text-[#082B52] font-bold flex items-center justify-center text-xs">
                {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded bg-[#0B3A6E] text-white hover:bg-[#1e528b] focus:outline-none focus:ring-2 focus:ring-[#F39A24]"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN NAVIGATION BAR */}
      <nav className="bg-[#0B3A6E] border-t border-[#082B52] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center justify-between">
            {/* Public Links */}
            <div className="flex items-center space-x-0.5 lg:space-x-1 py-1">
              {publicNavLinks.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 text-xs lg:text-[13px] font-medium rounded transition-colors ${
                      isActive
                        ? "bg-[#082B52] text-white font-semibold shadow-xs border-b-2 border-[#F39A24]"
                        : "text-[#cfe5ff] hover:text-white hover:bg-[#082B52]/50"
                    }`}
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </div>

            {/* Quick Workspace Nav Pill when logged in */}
            {user && (
              <div className="flex items-center space-x-1 text-xs py-1 pl-4 border-l border-[#1e528b]">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `px-2.5 py-1 rounded font-semibold transition-colors ${
                      isActive
                        ? "bg-[#082B52] text-white border-b border-[#F39A24]"
                        : "text-[#cfe5ff] hover:text-white hover:bg-[#082B52]/40"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/roadmap"
                  className={({ isActive }) =>
                    `px-2.5 py-1 rounded font-semibold transition-colors ${
                      isActive
                        ? "bg-[#082B52] text-white border-b border-[#F39A24]"
                        : "text-[#cfe5ff] hover:text-white hover:bg-[#082B52]/40"
                    }`
                  }
                >
                  Roadmap
                </NavLink>
                <NavLink
                  to="/documents"
                  className={({ isActive }) =>
                    `px-2.5 py-1 rounded font-semibold transition-colors ${
                      isActive
                        ? "bg-[#082B52] text-white border-b border-[#F39A24]"
                        : "text-[#cfe5ff] hover:text-white hover:bg-[#082B52]/40"
                    }`
                  }
                >
                  Documents
                </NavLink>
                <NavLink
                  to="/compliance"
                  className={({ isActive }) =>
                    `px-2.5 py-1 rounded font-semibold transition-colors ${
                      isActive
                        ? "bg-[#082B52] text-white border-b border-[#F39A24]"
                        : "text-[#cfe5ff] hover:text-white hover:bg-[#082B52]/40"
                    }`
                  }
                >
                  Compliance
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#082B52] border-t border-[#0B3A6E] px-4 py-3 space-y-2 text-sm shadow-2xl">
            {/* Authenticated user profile banner in mobile menu */}
            {user ? (
              <div className="p-3 bg-[#0B3A6E] rounded border border-[#1e528b] mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#F39A24] text-[#082B52] font-bold flex items-center justify-center text-xs">
                    {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-white text-xs truncate">
                      {user?.fullName}
                    </div>
                    <div className="text-[#cfe5ff] text-[11px] truncate">
                      {businessProfile?.legalName || user?.email}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-[#1e528b]">
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-center rounded bg-[#082B52] hover:bg-[#051c35] text-white text-xs font-semibold border border-[#1e528b]"
                  >
                    Command Center
                  </Link>
                  <Link
                    to="/business-profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-center rounded bg-[#082B52] hover:bg-[#051c35] text-white text-xs font-semibold border border-[#1e528b]"
                  >
                    Business Profile
                  </Link>
                  <Link
                    to="/roadmap"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-center rounded bg-[#082B52] hover:bg-[#051c35] text-white text-xs font-semibold border border-[#1e528b]"
                  >
                    Roadmap
                  </Link>
                  <Link
                    to="/documents"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-center rounded bg-[#082B52] hover:bg-[#051c35] text-white text-xs font-semibold border border-[#1e528b]"
                  >
                    Documents
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#0B3A6E]">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 text-center rounded bg-[#0B3A6E] text-white text-xs font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 text-center rounded bg-[#16845B] text-white text-xs font-semibold"
                >
                  Create Account
                </Link>
              </div>
            )}

            {/* Public Links */}
            <div className="space-y-1 pt-1">
              <div className="text-[10px] font-bold text-[#8a96a3] uppercase tracking-wider px-3 py-1">
                Portal Sections
              </div>
              {publicNavLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded text-xs font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-[#0B3A6E] text-white font-bold"
                      : "text-[#cfe5ff] hover:bg-[#0B3A6E] hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Logout on mobile when authenticated */}
            {user && (
              <div className="pt-2 border-t border-[#0B3A6E]">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 p-2 rounded bg-red-950/40 text-red-300 border border-red-800/40 text-xs font-semibold"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span>Sign Out of Enterprise Session</span>
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
