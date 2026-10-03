import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import {
  Scale,
  Building2,
  ShieldCheck,
  ExternalLink,
  Flame,
  Droplets,
  HardHat,
  FileCheck2,
  Landmark,
  ArrowRight,
} from "lucide-react";

export default function RegulatoryAreasPage() {
  const stateRegulators = [
    {
      acronym: "MPCB",
      name: "Maharashtra Pollution Control Board",
      act: "Water Act 1974, Air Act 1981, Hazardous & Other Wastes Rules 2016",
      scope: "State Industrial Environmental Clearances",
      trigger: "Any unit discharging trade effluent, air emissions, or generating industrial solid/hazardous waste. Categorized as White (exempt), Green, Orange, or Red.",
      portal: "https://www.mpcb.gov.in",
    },
    {
      acronym: "MIDC",
      name: "Maharashtra Industrial Development Corporation",
      act: "MIDC Act 1961, Industrial Area Development Regulations",
      scope: "Industrial Land, Infrastructure & Water Allocation",
      trigger: "Manufacturing and warehousing units acquiring or leasing plots within planned MIDC industrial estates across Maharashtra.",
      portal: "https://www.midcindia.org",
    },
    {
      acronym: "DISH",
      name: "Directorate of Industrial Safety & Health",
      act: "Factories Act, 1948 & Maharashtra Factories Rules, 1963",
      scope: "Occupational Safety, Machinery Sanction & Factory Licencing",
      trigger: "Premises employing 10 or more workers with electrical power, or 20 or more without power. Requires factory plan approval prior to building construction.",
      portal: "https://dish.maharashtra.gov.in",
    },
    {
      acronym: "Labour Dept.",
      name: "Department of Labour, Maharashtra",
      act: "Maharashtra Shops & Establishments Act, 2017",
      scope: "Commercial Business Registration & Worker Welfare",
      trigger: "Mandatory for all offices, shops, commercial establishments, and non-factory enterprises employing 10+ employees. (Permanent lifetime validity).",
      portal: "https://aaplesarkar.mahaonline.gov.in",
    },
    {
      acronym: "Fire Dept.",
      name: "Maharashtra Fire Services & MIDC Fire Department",
      act: "Maharashtra Fire Prevention & Life Safety Measures Act, 2006",
      scope: "Building Fire Safety Pre-construction NOC & Final Compliance",
      trigger: "Mandatory for industrial sheds, commercial premises, storage godowns, and high-occupancy establishments.",
      portal: "https://mahafireservice.gov.in",
    },
    {
      acronym: "MahaGST",
      name: "Maharashtra State Tax Department",
      act: "Maharashtra State Tax on Professions, Trades, Callings Act, 1975",
      scope: "Profession Tax (P-Tax) Enrolment & Monthly Remittance",
      trigger: "Mandatory for all employers in Maharashtra paying salary/wages to employees above the statutory threshold.",
      portal: "https://mahagst.gov.in",
    },
  ];

  const centralRegulators = [
    {
      acronym: "MSME Ministry",
      name: "Ministry of Micro, Small & Medium Enterprises",
      act: "Micro, Small & Medium Enterprises Development (MSMED) Act, 2006",
      scope: "National MSME Recognition & Priority Benefits",
      trigger: "Self-declaration based on composite investment in plant & machinery and annual turnover. 100% paperless and cost-free.",
      portal: "https://udyamregistration.gov.in",
    },
    {
      acronym: "FSSAI",
      name: "Food Safety & Standards Authority of India",
      act: "Food Safety and Standards Act, 2006 & Regulations 2011",
      scope: "Food Safety Licencing & Quality Compliance",
      trigger: "Mandatory for all food business operators (FBOs)—manufacturers, processors, repackers, cold storage, distributors, and transporters.",
      portal: "https://foscos.fssai.gov.in",
    },
    {
      acronym: "GSTN",
      name: "Goods & Services Tax Network (CBIC / State GST)",
      act: "Central Goods & Services Tax (CGST) Act, 2017",
      scope: "Indirect Taxation & Input Tax Credit",
      trigger: "Mandatory for businesses with annual aggregate turnover exceeding statutory threshold (₹40 Lakh for goods, ₹20 Lakh for services in Maharashtra).",
      portal: "https://www.gst.gov.in",
    },
    {
      acronym: "PESO",
      name: "Petroleum & Explosives Safety Organisation",
      act: "Petroleum Act 1934, Explosives Act 1884, Static & Mobile Pressure Vessels Rules",
      scope: "Hazardous Chemicals, Bulk Fuel & Compressed Gas Sanctions",
      trigger: "Industries storing diesel generators fuel, LPG bulk cylinders, compressed gases, or solvent tankers above exemption limits.",
      portal: "https://peso.gov.in",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-[#17212B] flex flex-col font-sans">
      <Header />

      {/* Hero Banner */}
      <section className="bg-[#082B52] text-white py-12 sm:py-16 border-b border-[#0B3A6E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0B3A6E] text-xs font-semibold text-[#cfe5ff]">
            <span>Statutory Architecture</span>
            <span>•</span>
            <span className="text-[#F39A24]">Dual-Tier Regulatory Model</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif">
            Regulatory Areas & Departments
          </h1>

          <p className="text-base text-[#cfe5ff] max-w-2xl leading-relaxed">
            Maharashtra enterprises navigate both Maharashtra State departments and Government of India regulatory frameworks. UdyamSetu organizes clearances across both tiers.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-12">
        {/* Tier 1: Maharashtra State Regulators */}
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#16845B] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              MH
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#082B52] font-serif">
                Maharashtra State Regulatory Authorities
              </h2>
              <p className="text-xs text-[#5E6B75]">
                State-level clearances covering pollution, industrial premises, factory safety, labor, and local taxation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {stateRegulators.map((reg) => (
              <div
                key={reg.acronym}
                className="bg-white rounded-lg border border-[#D5DCE4] p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#e3eff8] text-[#082B52] border border-[#b5d4ec]">
                      {reg.acronym}
                    </span>
                    <a
                      href={reg.portal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#0B3A6E] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Portal</span>
                      <ExternalLink className="w-3 h-3 text-[#8a96a3]" />
                    </a>
                  </div>

                  <h3 className="text-base font-bold text-[#082B52] font-serif leading-snug">
                    {reg.name}
                  </h3>

                  <div className="text-[11px] font-medium text-[#16845B]">
                    <strong>Primary Act: </strong>{reg.act}
                  </div>

                  <p className="text-xs text-[#5E6B75] leading-relaxed">
                    <strong>Applicability: </strong>{reg.trigger}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D5DCE4] text-[11px] text-[#5E6B75]">
                  <span>Domain: <strong>{reg.scope}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier 2: Central Government Regulators */}
        <div className="space-y-5 pt-4 border-t border-[#D5DCE4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#082B52] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              IN
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#082B52] font-serif">
                Central Government Regulatory Authorities
              </h2>
              <p className="text-xs text-[#5E6B75]">
                National statutory compliances enforced uniformly across Maharashtra.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {centralRegulators.map((reg) => (
              <div
                key={reg.acronym}
                className="bg-white rounded-lg border border-[#D5DCE4] p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#fef5e7] text-[#F39A24] border border-[#f8c471]">
                      {reg.acronym}
                    </span>
                    <a
                      href={reg.portal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#0B3A6E] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3 text-[#8a96a3]" />
                    </a>
                  </div>

                  <h3 className="text-base font-bold text-[#082B52] font-serif leading-snug">
                    {reg.name}
                  </h3>

                  <div className="text-[11px] font-medium text-[#16845B]">
                    <strong>Statutory Authority: </strong>{reg.act}
                  </div>

                  <p className="text-xs text-[#5E6B75] leading-relaxed">
                    <strong>Applicability: </strong>{reg.trigger}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D5DCE4] text-[11px] text-[#5E6B75]">
                  <span>Mandate: <strong>{reg.scope}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Banner */}
        <div className="p-6 rounded-lg bg-[#082B52] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-serif">
              Not sure which regulatory bodies apply to your business?
            </h3>
            <p className="text-xs text-[#cfe5ff]">
              Run the UdyamSetu Regulatory Journey Builder to get an exact, personalized breakdown.
            </p>
          </div>
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#16845B] hover:bg-[#0c5036] text-white text-xs font-bold transition-colors shrink-0 shadow-xs"
          >
            <span>View Regulatory Roadmap</span>
            <ArrowRight className="w-4 h-4 text-[#F39A24]" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
