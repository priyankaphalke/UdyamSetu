import React, { useState, useMemo, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import {
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  CalendarCheck2,
  HandCoins,
  ExternalLink,
  ChevronRight,
  Building2,
  Scale,
  Factory,
  Layers,
  Clock,
  HelpCircle,
  FileCheck2,
  Filter,
  Info,
  Check,
  Zap,
  MapPin,
  Compass,
  UtensilsCrossed,
  Laptop,
  Shirt,
  Pill,
  Sprout,
  HardHat,
  ShoppingBag,
  Briefcase,
  AlertCircle,
  Award,
  Sparkles,
  Quote,
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    requirements,
    businessProfile,
    updateProfile,
    loadDemoProfile,
    INDUSTRY_SECTORS,
    MAHARASHTRA_DISTRICTS,
    BUSINESS_STAGES,
    BUSINESS_SIZES,
    INDUSTRY_OPERATIONS_MAP,
  } = useApp();

  // Search State in Hero
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  // Business Journey Builder Form State
  const [discoverySector, setDiscoverySector] = useState("Food Processing");
  const [discoveryDistrict, setDiscoveryDistrict] = useState("Nashik");
  const [discoveryStage, setDiscoveryStage] = useState("New Business");
  const [discoverySize, setDiscoverySize] = useState("Small");
  const [discoveryOps, setDiscoveryOps] = useState(["Manufacturing", "Packaging", "Storage"]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);

  // Regulatory Intelligence Tabs
  const [intelligenceTab, setIntelligenceTab] = useState("regulatory");

  // Scheme Search in Support Section
  const [schemeSearch, setSchemeSearch] = useState("");
  const [schemeFilterSector, setSchemeFilterSector] = useState("All");

  // Pre-curated Search Suggestions for Hero Focus
  const curatedSuggestions = [
    { title: "FSSAI State Manufacturing Licence", category: "Approvals", trigger: "Food units turnover > ₹12 Lakh" },
    { title: "MPCB Consent to Establish (CTE) - Orange Category", category: "Approvals", trigger: "Pollution index 41-59" },
    { title: "Maharashtra Shops & Establishments Registration (Form G)", category: "Licences", trigger: "Commercial offices 10+ employees" },
    { title: "Udyam Registration (Government of India MSME)", category: "Licences", trigger: "Central statutory identification" },
    { title: "GSTR-3B Monthly Return Filing", category: "Compliance", trigger: "Monthly outward supply return" },
    { title: "Maharashtra Package Scheme of Incentives (PSI 2019)", category: "Government Support", trigger: "Capital subsidy for Taluka B/C/D tiers" },
  ];

  // Dynamic operations available for the selected sector
  const availableOps = useMemo(() => {
    return (
      INDUSTRY_OPERATIONS_MAP?.[discoverySector] || [
        "Manufacturing",
        "Packaging",
        "Storage",
        "Distribution",
        "Direct Retail",
      ]
    );
  }, [discoverySector, INDUSTRY_OPERATIONS_MAP]);

  // Update operations when sector changes
  useEffect(() => {
    const ops = availableOps.slice(0, 3);
    setDiscoveryOps(ops);
  }, [discoverySector, availableOps]);

  // Handle Search Execution
  const handleSearch = (e) => {
    e?.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    const q = searchQuery.toLowerCase();
    const matched = requirements.filter((r) => {
      const titleMatch = (r.title || r.name || "").toLowerCase().includes(q);
      const actMatch = (r.act || "").toLowerCase().includes(q);
      const deptMatch = (r.department || "").toLowerCase().includes(q);
      const triggersMatch = (r.statutory_triggers || "").toLowerCase().includes(q);

      if (searchCategory === "approvals") return (titleMatch || actMatch) && (r.category || "").includes("APPROVAL");
      if (searchCategory === "licences") return (titleMatch || actMatch) && ((r.title || "").includes("License") || (r.title || "").includes("Registration"));
      if (searchCategory === "compliance") return titleMatch || actMatch || (r.category || "").includes("CLEARANCE");
      if (searchCategory === "documents") return (r.required_documents || []).some((d) => d.toLowerCase().includes(q));
      return titleMatch || actMatch || deptMatch || triggersMatch;
    });

    setSearchResults(matched);
  };

  const handlePopularSearch = (term) => {
    setSearchQuery(term);
    setIsSearchFocused(false);
    const q = term.toLowerCase();
    const matched = requirements.filter((r) => {
      const title = (r.title || r.name || "").toLowerCase();
      const act = (r.act || "").toLowerCase();
      const cat = (r.category || "").toLowerCase();
      return title.includes(q) || act.includes(q) || cat.includes(q);
    });
    setSearchResults(matched);
  };

  // Toggle operations checkboxes in journey builder
  const toggleOperation = (op) => {
    setDiscoveryOps((prev) =>
      prev.includes(op) ? prev.filter((item) => item !== op) : [...prev, op]
    );
  };

  // Build Journey execution with animated pipeline reveal
  const handleBuildJourney = async () => {
    setIsEvaluating(true);
    setPipelineStep(1);

    setTimeout(() => setPipelineStep(2), 250);
    setTimeout(() => setPipelineStep(3), 500);
    setTimeout(() => setPipelineStep(4), 750);
    setTimeout(() => setPipelineStep(5), 1000);

    setTimeout(async () => {
      setIsEvaluating(false);
      if (user?.id) {
        await updateProfile({
          sector: discoverySector,
          district: discoveryDistrict,
          stage: discoveryStage,
          classification: discoverySize,
          operations: discoveryOps,
        });
        navigate("/roadmap");
      } else {
        // If not logged in, take user to roadmap or register with pre-populated params
        navigate("/roadmap");
      }
    }, 1300);
  };

  // Curated Regulatory Intelligence Editorial Items
  const editorialItems = {
    regulatory: [
      {
        title: "MPCB Streamlines Green & White Category Industrial Clearances",
        date: "September 2024",
        category: "State Pollution Compliance",
        source: "Maharashtra Pollution Control Board",
        desc: "Industrial facilities categorized as White are officially exempt from Consent to Establish (CTE). Green category units gain 3-year auto-renewals on MAITRI.",
        link: "https://www.mpcb.gov.in",
      },
      {
        title: "Maharashtra Shops & Establishments Registration (Form G) Permanent Validity",
        date: "August 2024",
        category: "Labour Department Notification",
        source: "Department of Labour, Maharashtra",
        desc: "Under the Maharashtra Act No. XXVIII, commercial establishments employing 10+ persons enjoy lifetime registration validity without annual renewal fees.",
        link: "https://aaplesarkar.mahaonline.gov.in",
      },
    ],
    policy: [
      {
        title: "Maharashtra Package Scheme of Incentives (PSI 2019) Operational Guidelines",
        date: "July 2024",
        category: "State Industrial Policy",
        source: "Directorate of Industries, Maharashtra",
        desc: "MSMEs setting up in Talukas classified as B, C, D, and D+ qualify for 40% to 80% capital subsidies, stamp duty exemptions, and electricity duty relief.",
        link: "https://maitri.mahaonline.gov.in",
      },
      {
        title: "Industrial Power Tariff Subsidy for Micro & Small Enterprises",
        date: "August 2024",
        category: "Energy Department Notification",
        source: "MahaVitaran (MSEDCL)",
        desc: "Eligible manufacturing units outside MMR benefit from a ₹1.00 per unit power tariff concession for eligible connected loads.",
        link: "https://www.mahadiscom.in",
      },
    ],
    compliance: [
      {
        title: "Annual Environmental Statement Form V Due by September 30 Each Fiscal Year",
        date: "Annual Filing",
        category: "MPCB Statutory Requirement",
        source: "Environment Protection Act, 1986",
        desc: "Mandatory annual environmental audit submission detailing raw materials consumed, water utilized, and treated effluent discharged.",
        link: "https://www.mpcb.gov.in",
      },
      {
        title: "Monthly GSTR-3B & Maharashtra Profession Tax (P-Tax) Schedule",
        date: "Monthly Obligation",
        category: "Taxation & Statutory Remittance",
        source: "MahaGST / GSTN",
        desc: "Timely filing prevents monthly compound interest penalties under Section 50 of the CGST Act and late fees under the Maharashtra P-Tax Act.",
        link: "https://mahagst.gov.in",
      },
    ],
    support: [
      {
        title: "PMFME 35% Credit-Linked Capital Subsidy for Maharashtra Agro Processors",
        date: "Active Tranche",
        category: "Central & State Scheme",
        source: "Ministry of Food Processing Industries (MoFPI)",
        desc: "Individual micro food enterprises receive up to ₹10 Lakh subsidy on eligible project costs for plant & machinery upgrades.",
        link: "https://pmfme.mofpi.gov.in",
      },
      {
        title: "Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)",
        date: "Collateral-Free Credit",
        category: "MSME Financing Support",
        source: "Ministry of MSME, Government of India",
        desc: "Guarantees term loans and working capital facilities up to ₹5 Crore from member scheduled commercial banks without third-party collateral.",
        link: "https://www.cgtmse.in",
      },
    ],
  };

  // Government Support Schemes Catalog for Support Section
  const supportSchemes = [
    {
      id: "psi-2019",
      name: "Maharashtra Package Scheme of Incentives (PSI 2019)",
      tier: "State Policy Incentive",
      sector: "Manufacturing & Agro",
      target: "Micro, Small & Medium Units",
      benefit: "Capital Subsidy up to 80% of eligible fixed capital investment + Electricity Duty waiver.",
      eligibility: "Operational unit in designated B, C, D, or D+ Talukas in Maharashtra with active Udyam Registration.",
      source: "Directorate of Industries, Maharashtra",
      portalUrl: "https://maitri.mahaonline.gov.in",
    },
    {
      id: "pmfme-scheme",
      name: "PM Formalisation of Micro Food Processing Enterprises (PMFME)",
      tier: "Central & State Joint Initiative",
      sector: "Food Processing & Agriculture",
      target: "Micro Food Processors & SHGs",
      benefit: "35% Credit-Linked Capital Subsidy with maximum ceiling of ₹10 Lakh per enterprise.",
      eligibility: "Existing or new micro food processing enterprise with formal banking DPR linkage.",
      source: "Ministry of Food Processing Industries (MoFPI)",
      portalUrl: "https://pmfme.mofpi.gov.in",
    },
    {
      id: "power-tariff-scheme",
      name: "Maharashtra Industrial Power Tariff Concession Scheme",
      tier: "State Energy Subsidy",
      sector: "All Manufacturing Sectors",
      target: "Micro & Small Industrial Units",
      benefit: "Direct subsidy of ₹1.00 per unit on electricity bill for 3 consecutive financial years.",
      eligibility: "Manufacturing units with metered HT/LT industrial electricity connection in eligible districts.",
      source: "Government of Maharashtra Energy Dept.",
      portalUrl: "https://maitri.mahaonline.gov.in",
    },
    {
      id: "cgtmse-credit",
      name: "CGTMSE Collateral-Free Credit Guarantee Scheme",
      tier: "Central MSME Scheme",
      sector: "All MSME Sectors",
      target: "New & Existing MSMEs",
      benefit: "Collateral-free credit facility up to ₹500 Lakh with credit guarantee coverage up to 85%.",
      eligibility: "Valid Udyam Registration Certificate and standard banking credit evaluation.",
      source: "Ministry of MSME & SIDBI",
      portalUrl: "https://www.cgtmse.in",
    },
  ];

  const filteredSchemes = supportSchemes.filter((sc) => {
    const matchesSearch =
      !schemeSearch.trim() ||
      sc.name.toLowerCase().includes(schemeSearch.toLowerCase()) ||
      sc.benefit.toLowerCase().includes(schemeSearch.toLowerCase());
    const matchesSector =
      schemeFilterSector === "All" ||
      sc.sector.toLowerCase().includes(schemeFilterSector.toLowerCase());
    return matchesSearch && matchesSector;
  });

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-[#17212B] font-sans antialiased flex flex-col">
      {/* 1. INSTITUTIONAL GOVERNMENT HEADER */}
      <Header />

      {/* ========================================================================= */}
      {/* ACTIVE ENTERPRISE SESSION BANNER (When User is Logged In)                 */}
      {/* ========================================================================= */}
      {user && (
        <div className="bg-[#0B3A6E] text-white border-b border-[#1e528b] px-4 py-2.5 shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#16845B] animate-pulse" />
              <span className="font-semibold text-white">Active Enterprise Session:</span>
              <strong className="text-[#F39A24]">
                {businessProfile?.legalName || "Your Enterprise"}
              </strong>
              <span className="text-[#cfe5ff] hidden md:inline">
                ({businessProfile?.district || "Maharashtra"} • {businessProfile?.sector})
              </span>
            </div>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#16845B] hover:bg-[#0c5036] text-white font-bold transition-colors shadow-xs text-xs"
            >
              <span>Resume Regulatory Command Center</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F39A24]" />
            </Link>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. HERO — PRIMARY WOW EXPERIENCE                                          */}
      {/* ========================================================================= */}
      <section className="relative bg-[#082B52] text-white overflow-hidden border-b border-[#0B3A6E]">
        {/* Background Image: Maharashtra Industrial Infrastructure with Navy Tint */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
          style={{ backgroundImage: `url('/images/maharashtra_tech_hub.jpg')` }}
          aria-hidden="true"
        />

        {/* Deep Navy Institutional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#082B52] via-[#082B52]/95 to-[#082B52]/80" />

        {/* Continuous Flowing Ribbon SVG: BUSINESS → REGULATION → GROWTH */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50" aria-hidden="true">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M-100 480 C 300 200, 700 650, 1100 300 C 1300 150, 1500 280, 1600 350"
              stroke="#F39A24"
              strokeWidth="2.5"
              strokeDasharray="16 12"
              className="animate-ribbon-slow"
            />
            <path
              d="M-50 420 C 350 150, 750 600, 1150 250 C 1350 100, 1550 220, 1650 300"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeDasharray="20 16"
              className="animate-ribbon-slow"
              style={{ animationDelay: "2s" }}
            />
            <path
              d="M-20 360 C 400 120, 800 550, 1200 200 C 1400 60, 1600 180, 1700 250"
              stroke="#16845B"
              strokeWidth="2"
              strokeDasharray="18 14"
              className="animate-ribbon-slow"
              style={{ animationDelay: "4s" }}
            />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0B3A6E] border border-[#1e528b] text-xs font-semibold text-[#cfe5ff]">
              <span className="w-2 h-2 rounded-full bg-[#16845B]" />
              <span>Government of Maharashtra • Industrial Clearances & Support</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif text-white leading-tight">
              YOUR BUSINESS.<br />
              <span className="text-[#F39A24]">YOUR REGULATORY JOURNEY.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#cfe5ff] leading-relaxed max-w-2xl font-normal">
              Understand what applies. Prepare what is required. Stay compliant. Discover relevant government support. A serious digital public-service platform for Maharashtra enterprises.
            </p>
          </div>

          {/* Large Global Search Box with Category Selector */}
          <div className="max-w-4xl bg-white text-[#17212B] p-2.5 sm:p-3 rounded-lg border border-[#D5DCE4] shadow-2xl space-y-3 relative z-30">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch gap-2">
              {/* Category Selector */}
              <div className="sm:w-48 shrink-0">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-full h-12 px-3 bg-[#F4F6F8] rounded border border-[#D5DCE4] text-xs font-semibold text-[#17212B] focus:outline-none focus:border-[#0B3A6E] cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="approvals">Approvals</option>
                  <option value="licences">Licences</option>
                  <option value="compliance">Compliance</option>
                  <option value="documents">Documents</option>
                  <option value="schemes">Government Support</option>
                </select>
              </div>

              {/* Text Input */}
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-[#8a96a3] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (!e.target.value.trim()) setSearchResults(null);
                  }}
                  placeholder="Search approvals, licences, schemes or compliance requirements..."
                  className="w-full h-12 pl-11 pr-4 bg-white rounded border border-[#D5DCE4] text-sm text-[#17212B] placeholder:text-[#8a96a3] focus:outline-none focus:border-[#0B3A6E]"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="h-12 px-8 rounded bg-[#082B52] hover:bg-[#0B3A6E] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors shrink-0 shadow-xs"
              >
                <span>SEARCH</span>
                <ArrowRight className="w-4 h-4 text-[#F39A24]" />
              </button>
            </form>

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center gap-2 pt-1 px-1 text-xs text-[#5E6B75]">
              <span className="font-bold text-[#082B52] uppercase text-[10px] tracking-wider">
                Popular Searches:
              </span>
              {["FSSAI", "MPCB Consent", "Udyam Registration", "GST", "Industrial Approvals"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handlePopularSearch(tag)}
                  className="px-2.5 py-1 rounded bg-[#F4F6F8] hover:bg-[#0B3A6E] hover:text-white border border-[#D5DCE4] text-[11px] font-medium text-[#17212B] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Live Search Suggestions Dropdown on Focus */}
            {isSearchFocused && !searchResults && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg border border-[#D5DCE4] shadow-2xl p-4 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between pb-2 border-b border-[#D5DCE4]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#5E6B75]">
                    Recommended Regulatory Clearances
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSearchFocused(false)}
                    className="text-[11px] text-[#8a96a3] hover:text-[#17212B] font-semibold"
                  >
                    Close
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {curatedSuggestions.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handlePopularSearch(item.title)}
                      className="p-2.5 rounded bg-[#F4F6F8] hover:bg-[#e3eff8] border border-[#D5DCE4] text-left transition-colors flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#082B52]">
                          {item.title}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-[#0B3A6E] font-semibold border border-[#D5DCE4]">
                          {item.category}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#5E6B75] mt-1">
                        Trigger: {item.trigger}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Live Results Panel */}
            {searchResults && (
              <div className="p-4 bg-[#F4F6F8] rounded border border-[#D5DCE4] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#D5DCE4]">
                  <div className="text-xs font-bold text-[#082B52]">
                    Found {searchResults.length} matching statutory requirements for "{searchQuery}"
                  </div>
                  <button
                    type="button"
                    onClick={() => setSearchResults(null)}
                    className="text-xs text-[#0B3A6E] font-semibold hover:underline"
                  >
                    Clear Search
                  </button>
                </div>

                {searchResults.length === 0 ? (
                  <p className="text-xs text-[#5E6B75]">
                    No exact clearances matched your query. Try searching for terms like "FSSAI", "MPCB", "Shops", or "Factories Act".
                  </p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {searchResults.map((r) => (
                      <div
                        key={r.id}
                        className="p-3 rounded bg-white border border-[#D5DCE4] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="font-bold text-[#082B52] truncate">
                            {r.title || r.name}
                          </div>
                          <div className="text-[#5E6B75] text-[11px]">
                            {r.act} • {r.department}
                          </div>
                        </div>
                        <Link
                          to={`/requirements/${r.id}`}
                          className="px-3 py-1.5 rounded bg-[#082B52] hover:bg-[#0B3A6E] text-white font-semibold transition-colors shrink-0 text-center"
                        >
                          View Statutory Dossier
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. BUSINESS JOURNEY BUILDER (Section 13)                                  */}
      {/* ========================================================================= */}
      <section id="journey-builder" className="py-12 sm:py-16 bg-white border-b border-[#D5DCE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#e3eff8] text-xs font-semibold text-[#082B52] border border-[#b5d4ec]">
              <Compass className="w-3.5 h-3.5 text-[#16845B]" />
              <span>Interactive Regulatory Profiler</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B52] font-serif">
              BUILD YOUR REGULATORY JOURNEY
            </h2>
            <p className="text-sm text-[#5E6B75] max-w-2xl">
              Tell us about your business and discover what may apply. Zero guesswork, deterministic statutory guidance.
            </p>
          </div>

          {/* 5-Field Interactive Form */}
          <div className="bg-[#F4F6F8] rounded-xl border border-[#D5DCE4] p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Field 1: Industry */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#082B52]">
                  1. Industry Sector
                </label>
                <select
                  value={discoverySector}
                  onChange={(e) => setDiscoverySector(e.target.value)}
                  className="w-full h-11 px-3 bg-white rounded border border-[#D5DCE4] text-xs font-semibold text-[#17212B] focus:outline-none focus:border-[#0B3A6E]"
                >
                  {(INDUSTRY_SECTORS || [
                    "Manufacturing",
                    "Food Processing",
                    "IT / Software",
                    "Textiles",
                    "Pharmaceuticals",
                    "Agriculture / Agro-processing",
                    "Construction",
                    "Retail",
                    "Services",
                    "Other",
                  ]).map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 2: Location (Maharashtra District) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#082B52]">
                  2. Maharashtra Location
                </label>
                <select
                  value={discoveryDistrict}
                  onChange={(e) => setDiscoveryDistrict(e.target.value)}
                  className="w-full h-11 px-3 bg-white rounded border border-[#D5DCE4] text-xs font-semibold text-[#17212B] focus:outline-none focus:border-[#0B3A6E]"
                >
                  {(MAHARASHTRA_DISTRICTS || [
                    "Nashik",
                    "Pune",
                    "Mumbai Suburban",
                    "Thane",
                    "Chhatrapati Sambhajinagar",
                    "Nagpur",
                    "Kolhapur",
                    "Solapur",
                    "Raigad",
                    "Palghar",
                  ]).map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 3: Business Stage */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#082B52]">
                  3. Business Stage
                </label>
                <select
                  value={discoveryStage}
                  onChange={(e) => setDiscoveryStage(e.target.value)}
                  className="w-full h-11 px-3 bg-white rounded border border-[#D5DCE4] text-xs font-semibold text-[#17212B] focus:outline-none focus:border-[#0B3A6E]"
                >
                  {(BUSINESS_STAGES || ["Idea / Planning", "New Business", "Existing Business", "Expansion"]).map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 4: Business Size */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#082B52]">
                  4. Business Scale (MSME)
                </label>
                <select
                  value={discoverySize}
                  onChange={(e) => setDiscoverySize(e.target.value)}
                  className="w-full h-11 px-3 bg-white rounded border border-[#D5DCE4] text-xs font-semibold text-[#17212B] focus:outline-none focus:border-[#0B3A6E]"
                >
                  {(BUSINESS_SIZES || ["Micro", "Small", "Medium", "Large"]).map((sz) => (
                    <option key={sz} value={sz}>
                      {sz} Enterprise
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field 5: Operations (Dynamic Multi-Select) */}
            <div className="space-y-2 pt-2 border-t border-[#D5DCE4]">
              <label className="text-xs font-bold uppercase tracking-wider text-[#082B52] block">
                5. Operations & Activities ({discoverySector})
              </label>
              <div className="flex flex-wrap gap-2.5">
                {availableOps.map((op) => {
                  const isChecked = discoveryOps.includes(op);
                  return (
                    <button
                      key={op}
                      type="button"
                      onClick={() => toggleOperation(op)}
                      className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                        isChecked
                          ? "bg-[#082B52] text-white border-[#082B52] shadow-xs"
                          : "bg-white text-[#17212B] border-[#D5DCE4] hover:bg-[#F4F6F8]"
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                          isChecked ? "bg-[#F39A24] border-[#F39A24]" : "border-[#8a96a3]"
                        }`}
                      >
                        {isChecked && <Check className="w-2.5 h-2.5 text-[#082B52] stroke-[3]" />}
                      </div>
                      <span>{op}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#D5DCE4]">
              <div className="text-xs text-[#5E6B75]">
                Generates a live statutory snapshot: clearances, required documents, compliance schedule, and subsidies.
              </div>

              <button
                type="button"
                onClick={handleBuildJourney}
                disabled={isEvaluating}
                className="w-full sm:w-auto px-8 py-3 rounded bg-[#16845B] hover:bg-[#0c5036] text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-75 shrink-0"
              >
                <span>{isEvaluating ? "Evaluating Statutory Engine..." : "BUILD MY JOURNEY"}</span>
                <ArrowRight className="w-4 h-4 text-[#F39A24]" />
              </button>
            </div>

            {/* Animated Pipeline Flow Preview */}
            <div className="pt-4 border-t border-[#D5DCE4]">
              <div className="text-[11px] font-bold text-[#082B52] uppercase tracking-wider mb-2">
                Automated Regulatory Pipeline:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-[11px]">
                {[
                  { label: "BUSINESS CONTEXT", active: pipelineStep >= 1 },
                  { label: "REGULATORY INTEL", active: pipelineStep >= 2 },
                  { label: "CLEARANCES", active: pipelineStep >= 3 },
                  { label: "MANDATORY DOCS", active: pipelineStep >= 4 },
                  { label: "NEXT ACTIONS", active: pipelineStep >= 5 },
                  { label: "COMPLIANCE", active: pipelineStep >= 5 },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded border font-semibold transition-all ${
                      step.active
                        ? "bg-[#082B52] text-white border-[#082B52]"
                        : "bg-white text-[#8a96a3] border-[#D5DCE4]"
                    }`}
                  >
                    {step.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. BUSINESS SERVICES (Section 14)                                         */}
      {/* ========================================================================= */}
      <section id="services" className="py-12 sm:py-16 bg-[#F4F6F8] border-b border-[#D5DCE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#16845B] uppercase tracking-wider">
              Core Facilitation Pillars
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B52] font-serif">
              BUSINESS SERVICES
            </h2>
            <p className="text-sm text-[#5E6B75] max-w-2xl">
              Everything an entrepreneur needs to navigate permissions, documents, renewals, and state industrial support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1: Approvals */}
            <div className="bg-white rounded-lg border border-[#D5DCE4] p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded bg-[#082B52] text-white flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-[#F39A24]" />
                </div>
                <h3 className="text-base font-bold text-[#082B52] font-serif uppercase tracking-wide">
                  APPROVALS
                </h3>
                <p className="text-xs text-[#5E6B75] leading-relaxed">
                  Find permissions and statutory clearances relevant to your specific business.
                </p>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#082B52] hover:text-[#16845B] transition-colors pt-2 border-t border-[#D5DCE4]"
              >
                <span>Explore Approvals</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F39A24]" />
              </Link>
            </div>

            {/* Service 2: Documents */}
            <div className="bg-white rounded-lg border border-[#D5DCE4] p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded bg-[#16845B] text-white flex items-center justify-center shadow-xs">
                  <FileCheck2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-[#082B52] font-serif uppercase tracking-wide">
                  DOCUMENTS
                </h3>
                <p className="text-xs text-[#5E6B75] leading-relaxed">
                  Understand what evidence and records you need before applying to portals.
                </p>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#082B52] hover:text-[#16845B] transition-colors pt-2 border-t border-[#D5DCE4]"
              >
                <span>Access Checklists</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F39A24]" />
              </Link>
            </div>

            {/* Service 3: Compliance */}
            <div className="bg-white rounded-lg border border-[#D5DCE4] p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded bg-[#0B3A6E] text-white flex items-center justify-center shadow-xs">
                  <CalendarCheck2 className="w-5 h-5 text-[#F39A24]" />
                </div>
                <h3 className="text-base font-bold text-[#082B52] font-serif uppercase tracking-wide">
                  COMPLIANCE
                </h3>
                <p className="text-xs text-[#5E6B75] leading-relaxed">
                  Track recurring obligations, return deadlines, and periodic licence renewals.
                </p>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#082B52] hover:text-[#16845B] transition-colors pt-2 border-t border-[#D5DCE4]"
              >
                <span>Track Obligations</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F39A24]" />
              </Link>
            </div>

            {/* Service 4: Government Support */}
            <div className="bg-white rounded-lg border border-[#D5DCE4] p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded bg-[#F39A24] text-[#082B52] flex items-center justify-center shadow-xs">
                  <HandCoins className="w-5 h-5 text-[#082B52]" />
                </div>
                <h3 className="text-base font-bold text-[#082B52] font-serif uppercase tracking-wide">
                  GOVERNMENT SUPPORT
                </h3>
                <p className="text-xs text-[#5E6B75] leading-relaxed">
                  Discover potentially relevant industrial subsidies, power tariff waivers, and credit guarantees.
                </p>
              </div>
              <Link
                to="/government-support"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#082B52] hover:text-[#16845B] transition-colors pt-2 border-t border-[#D5DCE4]"
              >
                <span>Discover Schemes</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F39A24]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. EXPLORE BY INDUSTRY (Section 15)                                       */}
      {/* ========================================================================= */}
      <section id="industries" className="py-12 sm:py-16 bg-white border-b border-[#D5DCE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#16845B] uppercase tracking-wider">
                Sectoral Intelligence
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B52] font-serif">
                EXPLORE BY INDUSTRY
              </h2>
              <p className="text-sm text-[#5E6B75] max-w-2xl">
                Maharashtra boasts diverse industrial hubs across food processing, engineering, software, and agro-infrastructure.
              </p>
            </div>
            <Link
              to="/industries"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#082B52] hover:text-[#16845B] transition-colors shrink-0"
            >
              <span>View All 9 Sectors</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F39A24]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Food Processing",
                tagline: "FSSAI, MPCB Orange Consent, Water Quality",
                image: "/images/food_manufacturing_unit.jpg",
                hubs: "Nashik, Kolhapur, Pune, Sangli",
              },
              {
                name: "Manufacturing",
                tagline: "Factories Act (DISH), MIDC Power & Fire NOC",
                image: "/images/pune_advanced_manufacturing.jpg",
                hubs: "Pune, Aurangabad, Nashik, Nagpur",
              },
              {
                name: "IT & Software",
                tagline: "Shops & Establishments, White Category MPCB",
                image: "/images/maharashtra_tech_hub.jpg",
                hubs: "Pune, Navi Mumbai, Mumbai Suburban",
              },
              {
                name: "Textiles",
                tagline: "Effluent Treatment, PSI 2019 Capital Subsidies",
                image: "/images/maharashtra_industrial_hero.jpg",
                hubs: "Ichalkaranji, Bhiwandi, Solapur",
              },
              {
                name: "Pharmaceuticals",
                tagline: "FDA Drug Licence, PESO, Red Category MPCB",
                image: "/images/food_manufacturing_unit.jpg",
                hubs: "Tarapur, Patalganga, Chhatrapati Sambhajinagar",
              },
              {
                name: "Agriculture & Agro-processing",
                tagline: "Cold Chain, Packhouses, PMFME Subsidies",
                image: "/images/food_manufacturing_unit.jpg",
                hubs: "Jalgaon, Ratnagiri, Ahmednagar",
              },
            ].map((ind, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setDiscoverySector(ind.name);
                  const el = document.getElementById("journey-builder");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative h-56 rounded-lg overflow-hidden border border-[#D5DCE4] cursor-pointer shadow-xs hover:shadow-lg transition-all"
              >
                <img
                  src={ind.image}
                  alt={ind.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082B52] via-[#082B52]/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <div className="text-[10px] uppercase font-bold text-[#F39A24] tracking-wider">
                    {ind.hubs}
                  </div>
                  <h3 className="text-lg font-bold font-serif leading-tight">
                    {ind.name}
                  </h3>
                  <p className="text-[11px] text-[#cfe5ff] truncate">
                    {ind.tagline}
                  </p>
                  <div className="pt-2 flex items-center gap-1 text-[11px] font-bold text-[#F39A24] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Inspect Requirements</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. WHAT APPLIES TO YOUR BUSINESS? (Signature Section 16)                  */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-[#F4F6F8] border-b border-[#D5DCE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#16845B] uppercase tracking-wider">
              Signature Diagnostic
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B52] font-serif">
              WHAT APPLIES TO YOUR BUSINESS?
            </h2>
            <p className="text-sm text-[#5E6B75] max-w-2xl">
              Deterministic evaluation based on declared enterprise parameters. Illustrative prototype values shown below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Business Profile Card */}
            <div className="lg:col-span-5 bg-white rounded-lg border border-[#D5DCE4] p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#D5DCE4]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#16845B]">
                      Enterprise Profile Context
                    </span>
                    <h3 className="text-lg font-bold text-[#082B52] font-serif">
                      ABC Foods Pvt. Ltd.
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#e3eff8] text-[#082B52] text-[10px] font-bold border border-[#b5d4ec]">
                    PROTOTYPE
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-[#F4F6F8]">
                    <span className="text-[#5E6B75]">Industry Sector:</span>
                    <strong className="text-[#082B52]">Food Processing & Milling</strong>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#F4F6F8]">
                    <span className="text-[#5E6B75]">Location:</span>
                    <strong className="text-[#082B52]">MIDC Ambad, Nashik (Maharashtra)</strong>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#F4F6F8]">
                    <span className="text-[#5E6B75]">Business Stage:</span>
                    <strong className="text-[#082B52]">New Business (Pre-commissioning)</strong>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#F4F6F8]">
                    <span className="text-[#5E6B75]">Scale / Classification:</span>
                    <strong className="text-[#082B52]">Small Enterprise (MSMED Act)</strong>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-[#F4F6F8]">
                    <span className="text-[#5E6B75]">Connected Power Load:</span>
                    <strong className="text-[#082B52]">60.345 HP (45 kVA)</strong>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-[#5E6B75]">Declared Workforce:</span>
                    <strong className="text-[#082B52]">28 Workers (18 Shop Floor)</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#D5DCE4]">
                <button
                  type="button"
                  onClick={() => loadDemoProfile("abc_foods")}
                  className="w-full py-2 text-center rounded bg-[#F4F6F8] hover:bg-[#e3eff8] text-[#082B52] text-xs font-semibold border border-[#D5DCE4] transition-colors"
                >
                  Load Demo Data in Workspace
                </button>
              </div>
            </div>

            {/* Right: Regulatory Snapshot Metrics */}
            <div className="lg:col-span-7 bg-[#082B52] text-white rounded-lg p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#0B3A6E]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F39A24]">
                      Regulatory Snapshot
                    </span>
                    <h3 className="text-xl font-bold font-serif text-white">
                      Clearance & Compliance Assessment
                    </h3>
                  </div>
                  <span className="text-[11px] text-[#cfe5ff]">
                    Evaluation Complete
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-3.5 rounded bg-[#051c35] border border-[#0B3A6E] space-y-1">
                    <div className="text-2xl font-black text-white font-mono">06</div>
                    <div className="text-xs font-bold text-[#cfe5ff]">Potential Requirements</div>
                    <p className="text-[10px] text-[#8a96a3]">Triggered across FSSAI, MPCB & DISH</p>
                  </div>

                  <div className="p-3.5 rounded bg-[#051c35] border border-[#0B3A6E] space-y-1">
                    <div className="text-2xl font-black text-[#16845B] font-mono">04</div>
                    <div className="text-xs font-bold text-[#cfe5ff]">Documents Ready</div>
                    <p className="text-[10px] text-[#8a96a3]">Incorporation, land lease, water test</p>
                  </div>

                  <div className="p-3.5 rounded bg-[#051c35] border border-[#0B3A6E] space-y-1">
                    <div className="text-2xl font-black text-[#F39A24] font-mono">02</div>
                    <div className="text-xs font-bold text-[#cfe5ff]">Documents to Review</div>
                    <p className="text-[10px] text-[#8a96a3]">Machine layout blueprint, FSMS plan</p>
                  </div>

                  <div className="p-3.5 rounded bg-[#051c35] border border-[#0B3A6E] space-y-1">
                    <div className="text-2xl font-black text-white font-mono">03</div>
                    <div className="text-xs font-bold text-[#cfe5ff]">Upcoming Actions</div>
                    <p className="text-[10px] text-[#8a96a3]">Prior to commercial commissioning</p>
                  </div>

                  <div className="p-3.5 rounded bg-[#051c35] border border-[#0B3A6E] space-y-1 sm:col-span-2">
                    <div className="text-2xl font-black text-[#16845B] font-mono">03</div>
                    <div className="text-xs font-bold text-[#cfe5ff]">Potentially Relevant Support</div>
                    <p className="text-[10px] text-[#8a96a3]">PSI 2019 Capital Subsidy, PMFME, Power Tariff</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#0B3A6E] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-[#cfe5ff]">
                  Rules validated against Maharashtra & Central Statutory Schedules.
                </span>
                <Link
                  to="/roadmap"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded bg-[#F39A24] hover:bg-[#e08917] text-[#082B52] text-xs font-bold uppercase tracking-wider transition-colors shadow-xs shrink-0"
                >
                  <span>VIEW MY REGULATORY JOURNEY</span>
                  <ArrowRight className="w-4 h-4 text-[#082B52]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. REGULATORY JOURNEY TIMELINE (Section 17)                                */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#D5DCE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#16845B] uppercase tracking-wider">
              Visual Execution Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B52] font-serif">
              REGULATORY JOURNEY
            </h2>
            <p className="text-sm text-[#5E6B75] max-w-2xl">
              Chronological statutory sequence from incorporation through commercial operation. Click any clearance to view detailed statutory requirements.
            </p>
          </div>

          {/* Node Journey Line */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              {
                id: "step-context",
                num: "01",
                title: "BUSINESS CONTEXT",
                sub: "Legal Entity & Scale",
                status: "READY",
                statusClass: "bg-[#e1f5ee] text-[#16845B] border-[#9ee0ca]",
                desc: "CIN incorporation, PAN, GSTIN, and national Udyam Registration.",
              },
              {
                id: "step-reg",
                num: "02",
                title: "LOCAL CLEARANCE",
                sub: "Labour & Municipal",
                status: "ACTION REQUIRED",
                statusClass: "bg-red-50 text-red-700 border-red-200",
                desc: "Maharashtra Shops & Establishments Registration (Form G / Gumasta).",
              },
              {
                id: "step-fssai",
                num: "03",
                title: "FSSAI LICENCE",
                sub: "Food Safety Standards",
                status: "UNDER REVIEW",
                statusClass: "bg-[#fef5e7] text-[#7a4807] border-[#f8c471]",
                desc: "State Food Manufacturing Licence application via FoSCoS portal.",
              },
              {
                id: "step-mpcb",
                num: "04",
                title: "MPCB CONSENT",
                sub: "Environmental Clearance",
                status: "ACTION REQUIRED",
                statusClass: "bg-red-50 text-red-700 border-red-200",
                desc: "Consent to Establish (CTE) Orange Category for trade effluent.",
              },
              {
                id: "step-local",
                num: "05",
                title: "FACTORY SAFETY",
                sub: "Factories Act 1948",
                status: "UPCOMING",
                statusClass: "bg-[#F4F6F8] text-[#5E6B75] border-[#D5DCE4]",
                desc: "DISH Factory Licence and machine layout plan approval.",
              },
              {
                id: "step-compliance",
                num: "06",
                title: "ONGOING COMPLIANCE",
                sub: "Recurring Operations",
                status: "UPCOMING",
                statusClass: "bg-[#F4F6F8] text-[#5E6B75] border-[#D5DCE4]",
                desc: "Monthly GSTR-3B, Profession Tax, and annual Form V statement.",
              },
            ].map((node) => (
              <div
                key={node.id}
                onClick={() => navigate("/roadmap")}
                className="bg-[#F4F6F8] hover:bg-white rounded-lg border border-[#D5DCE4] p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-[#082B52] font-mono group-hover:text-[#F39A24] transition-colors">
                      {node.num}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${node.statusClass}`}>
                      {node.status}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-[#082B52] uppercase tracking-wide">
                    {node.title}
                  </h3>

                  <div className="text-[11px] font-semibold text-[#16845B]">
                    {node.sub}
                  </div>

                  <p className="text-[11px] text-[#5E6B75] leading-relaxed">
                    {node.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#D5DCE4] flex items-center justify-between text-[11px] font-semibold text-[#082B52] group-hover:text-[#16845B]">
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#F39A24]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. SIGNATURE DIFFERENTIATOR: WHY • WHAT • NEXT (Section 18)               */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-[#082B52] text-white border-b border-[#0B3A6E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-[#F39A24] uppercase tracking-wider">
              UdyamSetu Intelligence Core
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              DON'T JUST FIND A REQUIREMENT. UNDERSTAND WHY IT APPLIES.
            </h2>
            <p className="text-sm text-[#cfe5ff]">
              UdyamSetu breaks down every government clearance into three unambiguous operational facets:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: WHY */}
            <div className="bg-[#051c35] rounded-lg border border-[#0B3A6E] p-6 space-y-3">
              <div className="w-10 h-10 rounded bg-[#0B3A6E] flex items-center justify-center font-bold text-sm text-[#F39A24]">
                WHY
              </div>
              <h3 className="text-base font-bold font-serif text-white">
                Why does it apply?
              </h3>
              <p className="text-xs text-[#cfe5ff] leading-relaxed">
                Evaluates statutory triggers. For example: ABC Foods employs 28 workers and runs 60 HP connected load—triggering Section 2(m)(i) of the Factories Act and MPCB Orange Category pollution rules.
              </p>
              <div className="pt-2 text-[11px] text-[#F39A24] font-semibold">
                ✓ Eliminates ambiguous regulatory guesswork
              </div>
            </div>

            {/* Column 2: WHAT */}
            <div className="bg-[#051c35] rounded-lg border border-[#0B3A6E] p-6 space-y-3">
              <div className="w-10 h-10 rounded bg-[#16845B] flex items-center justify-center font-bold text-sm text-white">
                WHAT
              </div>
              <h3 className="text-base font-bold font-serif text-white">
                What evidence is required?
              </h3>
              <p className="text-xs text-[#cfe5ff] leading-relaxed">
                Assembles exact documentary requirements. Tells you whether you need NABL water test reports, architectural machine blueprints, or registered MIDC tenancy deeds before initiating portal submissions.
              </p>
              <div className="pt-2 text-[11px] text-[#16845B] font-semibold">
                ✓ Zero portal rejections due to incomplete dossiers
              </div>
            </div>

            {/* Column 3: NEXT */}
            <div className="bg-[#051c35] rounded-lg border border-[#0B3A6E] p-6 space-y-3">
              <div className="w-10 h-10 rounded bg-[#F39A24] flex items-center justify-center font-bold text-sm text-[#082B52]">
                NEXT
              </div>
              <h3 className="text-base font-bold font-serif text-white">
                What should I do now?
              </h3>
              <p className="text-xs text-[#cfe5ff] leading-relaxed">
                Prescribes the exact next step. Submit Form A on Aaple Sarkar RTS, initiate MPCB e-Consent application, or upload your ETP layout plan to your workspace dossier.
              </p>
              <div className="pt-2 text-[11px] text-[#cfe5ff] font-semibold">
                ✓ Direct handoff to authorized government portals
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end">
            <Link
              to="/resources"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F39A24] hover:text-white transition-colors"
            >
              <span>View Official Regulatory Sources</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. OFFICIAL GOVERNMENT RESOURCES (Section 19)                             */}
      {/* ========================================================================= */}
      <section id="official-resources" className="py-12 sm:py-16 bg-white border-b border-[#D5DCE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#16845B] uppercase tracking-wider">
              Authorized Service Gateways
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B52] font-serif">
              OFFICIAL GOVERNMENT RESOURCES
            </h2>
            <p className="text-sm text-[#5E6B75] max-w-2xl">
              UdyamSetu connects you directly to official government portals for final submission and statutory fee payment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                name: "National Single Window System (NSWS)",
                desc: "Central Government portal for pre-establishment statutory clearances across national ministries.",
                url: "https://www.nsws.gov.in",
                tier: "Central Single Window",
              },
              {
                name: "MAITRI Single Window",
                desc: "Maharashtra Industry, Trade and Investment Facilitation Cell for unified state clearances.",
                url: "https://maitri.mahaonline.gov.in",
                tier: "State Single Window",
              },
              {
                name: "Aaple Sarkar RTS",
                desc: "Right to Public Services gateway for municipal Gumasta, labour welfare, and revenue NOCs.",
                url: "https://aaplesarkar.mahaonline.gov.in",
                tier: "State RTS Services",
              },
              {
                name: "Udyam Registration",
                desc: "Ministry of MSME official paperless registration portal with dynamic QR certification.",
                url: "https://udyamregistration.gov.in",
                tier: "Central MSME Registry",
              },
              {
                name: "FoSCoS — FSSAI",
                desc: "Food Safety Compliance System for food manufacturing licenses, renewals, and audits.",
                url: "https://foscos.fssai.gov.in",
                tier: "Food Regulatory",
              },
              {
                name: "MPCB Consent Gateway",
                desc: "Maharashtra Pollution Control Board e-Consent portal for CTE, CTO, and Form V filings.",
                url: "https://www.mpcb.gov.in",
                tier: "Environmental Regulatory",
              },
            ].map((portal, idx) => (
              <div
                key={idx}
                className="bg-[#F4F6F8] rounded-lg border border-[#D5DCE4] p-5 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#082B52] border border-[#D5DCE4]">
                      {portal.tier}
                    </span>
                    <span className="text-[11px] text-[#16845B] font-semibold">Official Resource</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#082B52] font-serif leading-snug">
                    {portal.name}
                  </h3>
                  <p className="text-xs text-[#5E6B75] leading-relaxed">
                    {portal.desc}
                  </p>
                </div>

                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-white hover:bg-[#082B52] text-[#082B52] hover:text-white border border-[#D5DCE4] text-xs font-semibold transition-colors shadow-xs"
                >
                  <span>Continue to Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#F39A24]" />
                </a>
              </div>
            ))}
          </div>

          {/* Institutional Trust Statement */}
          <div className="p-4 rounded-lg bg-[#e1f5ee] border border-[#9ee0ca] flex items-start gap-3 text-xs text-[#062b1d]">
            <ShieldCheck className="w-5 h-5 text-[#16845B] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="font-bold">Statutory Boundary: </strong>
              UdyamSetu helps you understand and prepare. Final applications, inspections, and formal sanction decisions remain exclusively with the respective competent government authorities.
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. LEADERSHIP & VISION FOR MAHARASHTRA (Section 4 Compliance)             */}
      {/* ========================================================================= */}
      <section className="py-12 bg-[#051c35] text-white border-b border-[#0B3A6E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#F39A24] uppercase tracking-wider">
              Institutional Vision
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Vision for Maharashtra's Industrial Growth & MSME Empowerment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Leader Citation 1: Hon'ble Prime Minister Narendra Modi */}
            <div className="p-5 rounded-lg bg-[#082B52] border border-[#0B3A6E] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#051c35] border border-[#F39A24] flex items-center justify-center text-[#F39A24] font-bold text-xs shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-serif">
                    Shri Narendra Modi
                  </div>
                  <div className="text-[11px] text-[#cfe5ff]">
                    Hon'ble Prime Minister of India
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#cfe5ff] italic leading-relaxed">
                "Our MSMEs are the backbone of Atmanirbhar Bharat. When regulatory hurdles are simplified through digital intelligence and single-window ease, our entrepreneurs lead global innovation."
              </p>
            </div>

            {/* Leader Citation 2: Hon'ble Deputy Chief Minister Devendra Fadnavis */}
            <div className="p-5 rounded-lg bg-[#082B52] border border-[#0B3A6E] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#051c35] border border-[#16845B] flex items-center justify-center text-[#16845B] font-bold text-xs shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-serif">
                    Shri Devendra Fadnavis
                  </div>
                  <div className="text-[11px] text-[#cfe5ff]">
                    Hon'ble Deputy Chief Minister of Maharashtra
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#cfe5ff] italic leading-relaxed">
                "Maharashtra's trillion-dollar economic trajectory depends on empowering our industrial clusters—from Nashik to Pune—with transparent, frictionless digital governance and rapid clearances."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. REGULATORY INTELLIGENCE (Section 20)                                  */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-[#F4F6F8] border-b border-[#D5DCE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#16845B] uppercase tracking-wider">
              Editorial Desk
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B52] font-serif">
              REGULATORY INTELLIGENCE
            </h2>
            <p className="text-sm text-[#5E6B75] max-w-2xl">
              Verified legal and policy updates curated from official state and central gazettes.
            </p>
          </div>

          {/* Editorial Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-[#D5DCE4] pb-2">
            {[
              { id: "regulatory", label: "Regulatory Updates" },
              { id: "policy", label: "Policy Updates" },
              { id: "compliance", label: "Compliance Updates" },
              { id: "support", label: "Government Support" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setIntelligenceTab(tab.id)}
                className={`px-4 py-2 rounded text-xs font-bold transition-colors ${
                  intelligenceTab === tab.id
                    ? "bg-[#082B52] text-white shadow-xs"
                    : "bg-white text-[#17212B] border border-[#D5DCE4] hover:bg-[#F4F6F8]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(editorialItems[intelligenceTab] || []).map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg border border-[#D5DCE4] p-6 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#16845B] uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-[#8a96a3]">{item.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#082B52] font-serif leading-snug">
                    {item.title}
                  </h3>

                  <div className="text-[11px] font-medium text-[#5E6B75]">
                    Source: {item.source}
                  </div>

                  <p className="text-xs text-[#5E6B75] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D5DCE4]">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#082B52] hover:text-[#16845B] transition-colors"
                  >
                    <span>Read Verified Gazette Notice</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#F39A24]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. GOVERNMENT SUPPORT FOR YOUR BUSINESS (Section 21)                     */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#D5DCE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#16845B] uppercase tracking-wider">
              Incentives & Schemes
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B52] font-serif">
              GOVERNMENT SUPPORT FOR YOUR BUSINESS
            </h2>
            <p className="text-sm text-[#5E6B75] max-w-2xl">
              Central and Maharashtra State incentive programs. UdyamSetu identifies schemes where your enterprise meets initial eligibility conditions.
            </p>
          </div>

          {/* Search & Sector Filters */}
          <div className="bg-[#F4F6F8] rounded-lg border border-[#D5DCE4] p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#8a96a3] absolute left-3 top-3" />
              <input
                type="text"
                value={schemeSearch}
                onChange={(e) => setSchemeSearch(e.target.value)}
                placeholder="Search schemes, incentives and support..."
                className="w-full h-10 pl-9 pr-3 bg-white rounded border border-[#D5DCE4] text-xs text-[#17212B] placeholder:text-[#8a96a3] focus:outline-none focus:border-[#0B3A6E]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-semibold text-[#082B52] shrink-0">Filter Sector:</span>
              <select
                value={schemeFilterSector}
                onChange={(e) => setSchemeFilterSector(e.target.value)}
                className="h-10 px-3 bg-white rounded border border-[#D5DCE4] text-xs font-semibold text-[#17212B] focus:outline-none focus:border-[#0B3A6E] cursor-pointer"
              >
                <option value="All">All Sectors</option>
                <option value="Food Processing">Food Processing</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="MSME">All MSMEs</option>
              </select>
            </div>
          </div>

          {/* Scheme Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-lg border border-[#D5DCE4] p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#fef5e7] text-[#7a4807] border border-[#f8c471]">
                      Potentially Relevant
                    </span>
                    <span className="text-[11px] font-semibold text-[#082B52]">{scheme.tier}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#082B52] font-serif leading-snug">
                    {scheme.name}
                  </h3>

                  <div className="text-xs text-[#16845B] font-semibold">
                    Target: {scheme.target}
                  </div>

                  <div className="p-3 rounded bg-[#F4F6F8] border border-[#D5DCE4] text-xs space-y-1">
                    <div className="font-bold text-[#082B52] text-[11px] uppercase tracking-wider">
                      What It Offers:
                    </div>
                    <p className="text-[#17212B] leading-relaxed">
                      {scheme.benefit}
                    </p>
                  </div>

                  <div className="text-xs text-[#5E6B75] leading-relaxed">
                    <strong>Eligibility to Check: </strong>{scheme.eligibility}
                  </div>

                  <div className="text-[11px] text-[#8a96a3]">
                    Official Source: {scheme.source}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D5DCE4]">
                  <a
                    href={scheme.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded bg-[#082B52] hover:bg-[#0B3A6E] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <span>VIEW OFFICIAL DETAILS</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#F39A24]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. GOVERNMENT-GRADE FOOTER (Section 23)                                  */}
      {/* ========================================================================= */}
      <Footer />
    </div>
  );
}
