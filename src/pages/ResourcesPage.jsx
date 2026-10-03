import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import {
  ExternalLink,
  FileText,
  ShieldCheck,
  Building2,
  HelpCircle,
  Download,
  ChevronDown,
  Info,
  CheckCircle2,
} from "lucide-react";

export default function ResourcesPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const officialPortals = [
    {
      name: "MAITRI Single Window",
      fullName: "Maharashtra Industry, Trade and Investment Facilitation Cell",
      dept: "Department of Industries, Government of Maharashtra",
      desc: "State one-stop portal providing over 140+ G2B industrial services, single-window clearances, tracking, and incentive disbursements.",
      url: "https://maitri.mahaonline.gov.in",
      category: "State Single Window",
    },
    {
      name: "NSWS National Single Window",
      fullName: "National Single Window System (NSWS)",
      dept: "Department for Promotion of Industry and Internal Trade (DPIIT), GoI",
      desc: "Central digital platform that guides investors and businesses to identify and apply for all requisite central and state regulatory approvals.",
      url: "https://www.nsws.gov.in",
      category: "Central Single Window",
    },
    {
      name: "Aaple Sarkar RTS",
      fullName: "Maharashtra Right to Public Services Act (RTS)",
      dept: "General Administration Department, Government of Maharashtra",
      desc: "Citizen and enterprise delivery portal for statutory time-bound services including Shops & Establishments, Labour permissions, and revenue certificates.",
      url: "https://aaplesarkar.mahaonline.gov.in",
      category: "Citizen & Business RTS",
    },
    {
      name: "Udyam Registration Portal",
      fullName: "Official National MSME Registration Portal",
      dept: "Ministry of Micro, Small and Medium Enterprises, Government of India",
      desc: "Zero-cost, paperless self-declaration system for obtaining national Udyam Registration number with dynamic QR code verification.",
      url: "https://udyamregistration.gov.in",
      category: "Central Statutory Identity",
    },
    {
      name: "FoSCoS — FSSAI",
      fullName: "Food Safety Compliance System",
      dept: "Food Safety and Standards Authority of India (FSSAI)",
      desc: "Cloud-based food licensing and registration platform for food manufacturers, processors, distributors, cold storages, and repackers.",
      url: "https://foscos.fssai.gov.in",
      category: "Central Food Regulatory",
    },
    {
      name: "MPCB Portal",
      fullName: "Maharashtra Pollution Control Board Consent Management",
      dept: "Environment & Climate Change Department, Maharashtra",
      desc: "Application and monitoring platform for Consent to Establish (CTE), Consent to Operate (CTO), and annual Form V environmental statements.",
      url: "https://www.mpcb.gov.in",
      category: "State Environmental",
    },
  ];

  const statutoryGuides = [
    {
      title: "Maharashtra Package Scheme of Incentives (PSI 2019)",
      authority: "Directorate of Industries, Maharashtra",
      type: "Policy Document",
      size: "1.4 MB",
      desc: "Comprehensive guidelines covering capital subsidies, power tariff waivers, and interest subvention across Taluka classification tiers (A, B, C, D, D+).",
    },
    {
      title: "MPCB Categorization of Industrial Sectors (Red/Orange/Green/White)",
      authority: "Maharashtra Pollution Control Board",
      type: "Classification Guide",
      size: "820 KB",
      desc: "Official pollution index categorization determining mandatory ETP requirements, consent fees, and validity periods.",
    },
    {
      title: "Factories Act 1948 — Building Blueprint & Stability Requirements",
      authority: "DISH Maharashtra",
      type: "Compliance Manual",
      size: "650 KB",
      desc: "Standard operating procedure for submitting machine layout drawings, ventilation schedules, and structural stability certificates.",
    },
    {
      title: "FSSAI Mandatory Schedule 4 Sanitary & Hygienic Standards",
      authority: "Food Safety and Standards Authority of India",
      type: "Checklist",
      size: "490 KB",
      desc: "Statutory checklist for food business operators preparing for pre-licensing inspection by Designated Officers.",
    },
  ];

  const faqs = [
    {
      q: "Does UdyamSetu replace official portals like MAITRI or FoSCoS?",
      a: "No. UdyamSetu is an intelligent preparatory and tracking platform. We analyze your business context, evaluate exact statutory triggers, provide document checklists, and direct you seamlessly to the authorized government portal for final filing.",
    },
    {
      q: "Is Udyam Registration mandatory for obtaining Maharashtra State subsidies?",
      a: "Yes. Under the Maharashtra Package Scheme of Incentives (PSI 2019), possessing an active, verified Udyam Registration linked to your enterprise PAN and GSTIN is an essential eligibility requirement.",
    },
    {
      q: "What is the difference between MPCB Consent to Establish (CTE) and Consent to Operate (CTO)?",
      a: "Consent to Establish (CTE) must be obtained BEFORE beginning any factory construction or machinery installation. Once the plant is built and the Effluent Treatment Plant (ETP) is commissioned, Consent to Operate (CTO) must be secured prior to starting commercial production.",
    },
    {
      q: "How does UdyamSetu determine which permissions apply to my business?",
      a: "UdyamSetu uses an institutional regulatory engine that maps statutory triggers from Maharashtra and Central Acts against your declared sector, location (district and industrial area), workforce size, power load, and manufacturing activities.",
    },
    {
      q: "Is there any cost for using UdyamSetu?",
      a: "UdyamSetu is provided as a digital public facilitation tool for Maharashtra's entrepreneurs and MSMEs. All intelligence roadmaps, checklists, and calendar trackers are 100% free of charge.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-[#17212B] flex flex-col font-sans">
      <Header />

      {/* Hero Banner */}
      <section className="bg-[#082B52] text-white py-12 sm:py-16 border-b border-[#0B3A6E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0B3A6E] text-xs font-semibold text-[#cfe5ff]">
            <span>Official Resources & Repository</span>
            <span>•</span>
            <span className="text-[#F39A24]">Verified Portals</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif">
            Official Government Resources
          </h1>

          <p className="text-base text-[#cfe5ff] max-w-2xl leading-relaxed">
            Direct access to authorized Maharashtra and Central Government portals, verified statutory policy guidelines, and practical regulatory guidance.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-12">
        {/* Trust Statement */}
        <div className="p-4 rounded-lg bg-[#e1f5ee] border border-[#9ee0ca] flex items-start gap-3 text-xs text-[#062b1d]">
          <ShieldCheck className="w-5 h-5 text-[#16845B] shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-bold">Institutional Trust Statement: </strong>
            UdyamSetu helps you understand and prepare. Final submissions, fee collections, statutory inspections, and formal approvals are administered exclusively by authorized government authorities via their designated single-window portals.
          </div>
        </div>

        {/* Official Portals Grid */}
        <div className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-[#082B52] font-serif">
              Authorized Government Portals
            </h2>
            <p className="text-xs text-[#5E6B75] mt-1">
              Direct links to official Maharashtra state and national regulatory portals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {officialPortals.map((portal) => (
              <div
                key={portal.name}
                className="bg-white rounded-lg border border-[#D5DCE4] p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#e3eff8] text-[#082B52] border border-[#b5d4ec]">
                      {portal.category}
                    </span>
                    <span className="text-[11px] text-[#16845B] font-semibold">Official Portal</span>
                  </div>

                  <h3 className="text-base font-bold text-[#082B52] font-serif leading-snug">
                    {portal.name}
                  </h3>

                  <div className="text-[11px] font-medium text-[#5E6B75]">
                    {portal.dept}
                  </div>

                  <p className="text-xs text-[#5E6B75] leading-relaxed">
                    {portal.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D5DCE4]">
                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded bg-[#082B52] hover:bg-[#0B3A6E] text-white text-xs font-semibold transition-colors"
                  >
                    <span>Continue to Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#F39A24]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statutory Policy Guides */}
        <div className="space-y-5 pt-4 border-t border-[#D5DCE4]">
          <div>
            <h2 className="text-2xl font-bold text-[#082B52] font-serif">
              Statutory Guidelines & Reference Documents
            </h2>
            <p className="text-xs text-[#5E6B75] mt-1">
              Curated official policy frameworks and regulatory checklists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {statutoryGuides.map((guide, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg border border-[#D5DCE4] p-5 shadow-xs flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded bg-[#F4F6F8] border border-[#D5DCE4] text-[#082B52] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#0B3A6E]" />
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F4F6F8] text-[#5E6B75] border border-[#D5DCE4]">
                      {guide.type}
                    </span>
                    <span className="text-[11px] text-[#8a96a3] font-mono">{guide.size}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#082B52] leading-snug">
                    {guide.title}
                  </h3>
                  <div className="text-[11px] text-[#16845B] font-medium">
                    {guide.authority}
                  </div>
                  <p className="text-xs text-[#5E6B75] leading-relaxed">
                    {guide.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-5 pt-4 border-t border-[#D5DCE4]">
          <div>
            <h2 className="text-2xl font-bold text-[#082B52] font-serif">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-xs text-[#5E6B75] mt-1">
              Clear answers to the most common queries from Maharashtra entrepreneurs.
            </p>
          </div>

          <div className="space-y-3 max-w-4xl">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg border border-[#D5DCE4] overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-4 flex items-center justify-between text-left text-sm font-bold text-[#082B52] hover:bg-[#F4F6F8] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8a96a3] shrink-0 transition-transform ${
                      openFaq === idx ? "rotate-180 text-[#0B3A6E]" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#5E6B75] leading-relaxed border-t border-[#F4F6F8]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
