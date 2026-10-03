import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useApp } from "../context/AppContext";
import {
  FileCheck2,
  CalendarCheck2,
  HandCoins,
  ShieldCheck,
  Search,
  ArrowRight,
  ExternalLink,
  Building2,
  CheckCircle2,
  HelpCircle,
  Clock,
  Layers,
} from "lucide-react";

export default function ServicesPage() {
  const { requirements } = useApp();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const servicesList = [
    {
      id: "approvals",
      title: "Approvals & Licences",
      tagline: "Find statutory permissions and licences relevant to your business.",
      icon: ShieldCheck,
      color: "#082B52",
      badge: "Pre-Establishment & Operating",
      description:
        "Understand exactly which central, state, and local clearances apply to your factory, warehouse, commercial unit, or office in Maharashtra. Eliminate surprise enforcement visits.",
      features: [
        "FSSAI State & Central Food Manufacturing Licences",
        "MPCB Consent to Establish (CTE) & Consent to Operate (CTO)",
        "Maharashtra Shops & Establishments Registration (Gumasta)",
        "Factories Act 1948 DISH Factory Licence & Plan Approval",
        "MIDC Water Connection & Fire Department Life Safety NOC",
      ],
      ctaText: "Explore Approvals Roadmap",
      ctaLink: "/roadmap",
    },
    {
      id: "documents",
      title: "Mandatory Document Checklists",
      tagline: "Understand what evidence you need before submitting applications.",
      icon: FileCheck2,
      color: "#16845B",
      badge: "Readiness & Verification",
      description:
        "Avoid application delays and portal rejections on MAITRI, Aaple Sarkar, and FoSCoS by assembling verified documentary proof in advance.",
      features: [
        "Certificate of Incorporation, MoA, and AoA charters",
        "Land Title Deeds / Registered MIDC Tenancy Agreements",
        "Approved Machine Layout Drawings & Electrical Connected Load schedules",
        "NABL-accredited water potability test certificates",
        "Staff qualification records and food safety management plans",
      ],
      ctaText: "Access Document Checklists",
      ctaLink: "/documents",
    },
    {
      id: "compliance",
      title: "Compliance & Renewals Calendar",
      tagline: "Track recurring statutory obligations and avoid late penalties.",
      icon: CalendarCheck2,
      color: "#0B3A6E",
      badge: "Ongoing Operations",
      description:
        "Never miss a statutory filing deadline. Track monthly GST returns, state profession tax, annual environmental statements, and periodic license renewals.",
      features: [
        "GSTR-3B Monthly Return Filing (GSTN)",
        "Maharashtra Profession Tax (P-Tax) Return (MahaGST)",
        "Annual Environmental Statement Form V (MPCB)",
        "Factory Annual Return Form 27 (DISH Maharashtra)",
        "Periodic FSSAI Food Safety Audit Submissions",
      ],
      ctaText: "View Compliance Calendar",
      ctaLink: "/compliance",
    },
    {
      id: "support",
      title: "Government Support & Incentives",
      tagline: "Discover industrial incentives, capital subsidies, and power tariff relief.",
      icon: HandCoins,
      color: "#F39A24",
      badge: "Financial & Policy Incentives",
      description:
        "Tap into Maharashtra State Industrial Policy (PSI 2019), PMFME agro-processing subsidies, and MSME interest subvention programs tailored to your taluka tier.",
      features: [
        "Maharashtra Package Scheme of Incentives (PSI 2019) Capital Subsidy",
        "Industrial Power Tariff Concession for eligible MSMEs",
        "Stamp Duty & Electricity Duty exemptions for eligible industrial zones",
        "PMFME 35% Credit-Linked Capital Subsidy for food processors",
        "CGTMSE Collateral-Free Credit Guarantee facilitation",
      ],
      ctaText: "Check Eligible Support Schemes",
      ctaLink: "/government-support",
    },
  ];

  const filteredServices = servicesList.filter(
    (s) => activeTab === "all" || s.id === activeTab
  );

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-[#17212B] flex flex-col font-sans">
      <Header />

      {/* Hero Banner */}
      <section className="bg-[#082B52] text-white py-12 sm:py-16 border-b border-[#0B3A6E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0B3A6E] text-xs font-semibold text-[#cfe5ff]">
            <span>Services Facilitation Directory</span>
            <span>•</span>
            <span className="text-[#F39A24]">UdyamSetu Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif">
            Business Services
          </h1>

          <p className="text-base text-[#cfe5ff] max-w-2xl leading-relaxed">
            Four specialized facilitation pillars designed to streamline your business journey from concept through continuous compliance in Maharashtra.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-10">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#D5DCE4] pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded text-xs font-bold transition-colors ${
              activeTab === "all"
                ? "bg-[#082B52] text-white shadow-xs"
                : "bg-white text-[#17212B] border border-[#D5DCE4] hover:bg-[#F4F6F8]"
            }`}
          >
            All Services (4)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("approvals")}
            className={`px-4 py-2 rounded text-xs font-bold transition-colors ${
              activeTab === "approvals"
                ? "bg-[#082B52] text-white shadow-xs"
                : "bg-white text-[#17212B] border border-[#D5DCE4] hover:bg-[#F4F6F8]"
            }`}
          >
            Approvals & Licences
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("documents")}
            className={`px-4 py-2 rounded text-xs font-bold transition-colors ${
              activeTab === "documents"
                ? "bg-[#082B52] text-white shadow-xs"
                : "bg-white text-[#17212B] border border-[#D5DCE4] hover:bg-[#F4F6F8]"
            }`}
          >
            Mandatory Documents
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("compliance")}
            className={`px-4 py-2 rounded text-xs font-bold transition-colors ${
              activeTab === "compliance"
                ? "bg-[#082B52] text-white shadow-xs"
                : "bg-white text-[#17212B] border border-[#D5DCE4] hover:bg-[#F4F6F8]"
            }`}
          >
            Compliance & Renewals
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("support")}
            className={`px-4 py-2 rounded text-xs font-bold transition-colors ${
              activeTab === "support"
                ? "bg-[#082B52] text-white shadow-xs"
                : "bg-white text-[#17212B] border border-[#D5DCE4] hover:bg-[#F4F6F8]"
            }`}
          >
            Government Support
          </button>
        </div>

        {/* Primary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-lg border border-[#D5DCE4] shadow-xs hover:shadow-md transition-shadow p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded bg-[#082B52] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Icon className="w-6 h-6 text-[#F39A24]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#e3eff8] text-[#082B52] border border-[#b5d4ec]">
                          {service.badge}
                        </span>
                        <h2 className="text-xl font-bold text-[#082B52] font-serif mt-1">
                          {service.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs font-medium text-[#16845B]">
                    {service.tagline}
                  </p>

                  <p className="text-xs text-[#5E6B75] leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#D5DCE4]">
                    <div className="text-[11px] font-bold text-[#082B52] uppercase tracking-wider">
                      Key Highlights:
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#17212B]">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#16845B] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D5DCE4]">
                  <Link
                    to={service.ctaLink}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#082B52] hover:bg-[#0B3A6E] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-4 h-4 text-[#F39A24]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Statutory Handoff Notice */}
        <div className="p-4 rounded-lg bg-[#e3eff8] border border-[#b5d4ec] flex items-start gap-3 text-xs text-[#082B52]">
          <HelpCircle className="w-5 h-5 text-[#0B3A6E] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-bold">Official Governance Handoff: </strong>
            UdyamSetu is an intelligent preparatory and tracking platform. Formal submissions, inspection fee disbursements, and statutory licenses are processed on authorized government portals including MAITRI, Aaple Sarkar, and FoSCoS.
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
