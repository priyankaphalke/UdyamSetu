import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useApp } from "../context/AppContext";
import {
  Factory,
  UtensilsCrossed,
  Laptop,
  Shirt,
  Pill,
  Sprout,
  HardHat,
  ShoppingBag,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Building2,
  MapPin,
  ChevronRight,
} from "lucide-react";

export default function IndustriesPage() {
  const navigate = useNavigate();
  const { updateProfile, user } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const industries = [
    {
      id: "food-processing",
      name: "Food Processing & Beverages",
      icon: UtensilsCrossed,
      hubs: "Nashik, Pune, Kolhapur, Sangli, Solapur",
      pollutionCategory: "Orange / Green (FSSAI Regulated)",
      description:
        "Flour mills, spice processing, dairy plants, bakeries, canned fruit, ready-to-eat products, and beverage manufacturing.",
      commonClearances: [
        "FSSAI State / Central Manufacturing Licence",
        "MPCB Consent to Establish (Orange/Green Category)",
        "Water Quality & Potability Certificate (IS 10500)",
        "Maharashtra Shops & Establishments / Factory Licence",
      ],
      image: "/images/food_manufacturing_unit.jpg",
    },
    {
      id: "manufacturing",
      name: "Advanced Manufacturing & Engineering",
      icon: Factory,
      hubs: "Pune (Chakan/Bhosari), Aurangabad, Nashik (Ambad/Satpur), Nagpur",
      pollutionCategory: "Orange / Red / Green",
      description:
        "Automotive components, precision machine tools, fabricated metal products, industrial machinery, and electrical equipment.",
      commonClearances: [
        "MPCB Consent to Establish (CTE)",
        "Factories Act 1948 DISH Factory Licence & Plan Sanction",
        "MIDC Industrial Water & Effluent Discharge Allotment",
        "Fire Safety Pre-construction NOC",
      ],
      image: "/images/pune_advanced_manufacturing.jpg",
    },
    {
      id: "it-software",
      name: "IT, Software & Data Centers",
      icon: Laptop,
      hubs: "Pune (Hinjawadi, Magarpatta), Navi Mumbai, Mumbai (Powai/BKC)",
      pollutionCategory: "White Category (Exempted from MPCB Consent)",
      description:
        "Software development, SaaS platforms, cloud infrastructure, AI labs, data center hosting, and IT-enabled services (ITeS).",
      commonClearances: [
        "Maharashtra Shops & Establishments Registration",
        "STPI / SEZ Registration (if export-oriented)",
        "State IT Policy Power Tariff Concession Certificate",
        "Fire Safety Occupancy Certificate",
      ],
      image: "/images/maharashtra_tech_hub.jpg",
    },
    {
      id: "textiles",
      name: "Textiles, Weaving & Apparel",
      icon: Shirt,
      hubs: "Ichalkaranji, Bhiwandi, Solapur, Malegaon, Nagpur",
      pollutionCategory: "Orange / Red (Dyeing) / Green (Garments)",
      description:
        "Powerloom fabric weaving, textile processing, garment manufacturing, synthetic spinning, and technical textiles.",
      commonClearances: [
        "MPCB Consent with Trade Effluent Treatment validation",
        "Shops & Establishments / Factory Licence (DISH)",
        "Textile Policy Capital Subsidy Registration",
        "Fire Department Life Safety NOC for fabric warehouses",
      ],
      image: "/images/maharashtra_industrial_hero.jpg",
    },
    {
      id: "pharmaceuticals",
      name: "Pharmaceuticals & Life Sciences",
      icon: Pill,
      hubs: "Tarapur, Patalganga, Pune, Chhatrapati Sambhajinagar",
      pollutionCategory: "Red / Orange Category",
      description:
        "Active Pharmaceutical Ingredients (API), formulations, Ayurvedic medicine manufacturing, medical devices, and bio-testing labs.",
      commonClearances: [
        "Food & Drug Administration (FDA) Maharashtra Drug Licence",
        "MPCB Consent to Establish with Environmental Clearance",
        "PESO Petroleum & Explosive Storage Licence (Solvents)",
        "WHO-GMP Compliance Certification",
      ],
      image: "/images/food_manufacturing_unit.jpg",
    },
    {
      id: "agriculture",
      name: "Agriculture & Cold Chain Infrastructure",
      icon: Sprout,
      hubs: "Jalgaon, Ratnagiri, Sindhudurg, Ahmednagar, Nagpur",
      pollutionCategory: "Green / White Category",
      description:
        "Controlled atmosphere cold storage, packhouses, ripening chambers, sorting & grading lines, and farm-gate agro logistics.",
      commonClearances: [
        "APMC Yard Licences / Direct Marketing Permission",
        "MPCB Environmental Exemption / Green Consent",
        "FSSAI Storage & Warehouse Registration",
        "National Horticulture Board (NHB) Subsidy Sanction",
      ],
      image: "/images/food_manufacturing_unit.jpg",
    },
    {
      id: "construction",
      name: "Construction, Building Materials & Ready-Mix",
      icon: HardHat,
      hubs: "Mumbai MMR, Pune, Nagpur, Nashik, Chhatrapati Sambhajinagar",
      pollutionCategory: "Orange / Red (RMC & Quarrying)",
      description:
        "Ready-mix concrete batching plants, fly-ash brick production, pre-cast structural concrete, and architectural fabrication.",
      commonClearances: [
        "MPCB Consent to Operate with Air Pollution Control (Dust collectors)",
        "Local Planning Authority (CIDCO, MMRDA, Municipal) Sanction",
        "Mines & Minerals Royalty Pass for aggregate transit",
        "DISH Maharashtra Occupational Safety Registration",
      ],
      image: "/images/pune_advanced_manufacturing.jpg",
    },
    {
      id: "retail",
      name: "Retail, Wholesale & Logistics Hubs",
      icon: ShoppingBag,
      hubs: "Bhiwandi, Panvel, Taloja, Chakan, Nagpur (MIHAN)",
      pollutionCategory: "Green / White Category",
      description:
        "Regional fulfillment distribution centers, 3PL logistics parks, multi-brand retail chains, and wholesale warehousing.",
      commonClearances: [
        "Maharashtra Shops & Establishments Registration (Form G)",
        "Legal Metrology Packaging & Labeling Registration",
        "Fire Department High-Bay Warehouse Life Safety NOC",
        "Local Municipal Trade License & Property Tax Clearance",
      ],
      image: "/images/maharashtra_tech_hub.jpg",
    },
    {
      id: "services",
      name: "Hospitality, Healthcare & Professional Services",
      icon: Briefcase,
      hubs: "Mumbai, Pune, Nashik, Shirdi, Mahabaleshwar, Nagpur",
      pollutionCategory: "Green / Orange (Healthcare)",
      description:
        "Hotels, restaurants, private clinics, diagnostic centers, engineering consultancy, and commercial corporate facilities.",
      commonClearances: [
        "Municipal Health Department Eating House / Trade Licence",
        "MPCB Bio-Medical Waste Authorization (for Clinics)",
        "Police Department Public Entertainment License",
        "FSSAI Food Services Licence",
      ],
      image: "/images/maharashtra_tech_hub.jpg",
    },
  ];

  const handleSelectIndustry = async (industryName) => {
    if (user?.id) {
      await updateProfile({ sector: industryName });
      navigate("/dashboard");
    } else {
      navigate(`/?industry=${encodeURIComponent(industryName)}#journey-builder`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] text-[#17212B] flex flex-col font-sans">
      <Header />

      {/* Hero Banner */}
      <section className="bg-[#082B52] text-white py-12 sm:py-16 border-b border-[#0B3A6E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0B3A6E] text-xs font-semibold text-[#cfe5ff]">
            <span>Maharashtra Industrial Sectors</span>
            <span>•</span>
            <span className="text-[#F39A24]">Sectoral Roadmaps</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif">
            Explore by Industry
          </h1>

          <p className="text-base text-[#cfe5ff] max-w-2xl leading-relaxed">
            Every industrial sector in Maharashtra operates under specific regulatory acts, pollution categories, and licensing authorities. Choose your sector to inspect typical clearance paths.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.id}
                className="bg-white rounded-lg border border-[#D5DCE4] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Sector Image Header */}
                  <div className="relative h-44 w-full overflow-hidden bg-[#082B52]">
                    <img
                      src={ind.image}
                      alt={ind.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#082B52] via-[#082B52]/40 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded bg-[#0B3A6E] text-white flex items-center justify-center shrink-0 border border-[#1e528b]">
                        <Icon className="w-5 h-5 text-[#F39A24]" />
                      </div>
                      <h2 className="text-base font-bold text-white font-serif leading-tight">
                        {ind.name}
                      </h2>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#5E6B75]">
                      <MapPin className="w-3.5 h-3.5 text-[#16845B] shrink-0" />
                      <span className="truncate"><strong>Key Hubs:</strong> {ind.hubs}</span>
                    </div>

                    <div className="inline-block px-2 py-0.5 rounded bg-[#F4F6F8] text-[11px] font-semibold text-[#082B52] border border-[#D5DCE4]">
                      Pollution Class: {ind.pollutionCategory}
                    </div>

                    <p className="text-xs text-[#5E6B75] leading-relaxed">
                      {ind.description}
                    </p>

                    <div className="pt-2 border-t border-[#D5DCE4] space-y-1.5">
                      <div className="text-[11px] font-bold text-[#082B52] uppercase tracking-wider">
                        Common Statutory Clearances:
                      </div>
                      <ul className="space-y-1 text-xs text-[#17212B]">
                        {ind.commonClearances.map((c, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-[#16845B] font-bold">•</span>
                            <span className="truncate">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-[#F4F6F8] border-t border-[#D5DCE4]">
                  <button
                    type="button"
                    onClick={() => handleSelectIndustry(ind.name)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded bg-[#082B52] hover:bg-[#0B3A6E] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <span>Build Journey for {ind.name.split(" ")[0]}</span>
                    <ArrowRight className="w-4 h-4 text-[#F39A24]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
