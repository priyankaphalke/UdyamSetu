import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import {
  Scale,
  Building2,
  ShieldCheck,
  Award,
  Layers,
  CheckCircle2,
  ArrowRight,
  Landmark,
  Lock,
  Compass,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F6F8] text-[#17212B] flex flex-col font-sans">
      <Header />

      {/* Hero Banner */}
      <section className="bg-[#082B52] text-white py-12 sm:py-16 border-b border-[#0B3A6E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0B3A6E] text-xs font-semibold text-[#cfe5ff]">
            <span>Smart India Hackathon 2024</span>
            <span>•</span>
            <span className="text-[#F39A24]">Problem Statement SIH26130</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif">
            About UdyamSetu
          </h1>

          <p className="text-base text-[#cfe5ff] max-w-2xl leading-relaxed">
            Your Regulatory Copilot for a Stronger Maharashtra. Bridging the gap between static lists of government services and a dynamic, business-specific regulatory journey.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-12">
        {/* Mandate & Problem Statement */}
        <div className="bg-white rounded-lg border border-[#D5DCE4] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#16845B] uppercase tracking-wider">
              Institutional Problem Statement
            </span>
            <h2 className="text-2xl font-bold text-[#082B52] font-serif">
              SIH26130 — Streamlining Industrial Approvals & Government Support
            </h2>
          </div>

          <p className="text-sm text-[#5E6B75] leading-relaxed">
            While Maharashtra has pioneered digital governance through platforms like MAITRI, Aaple Sarkar, and FoSCoS, micro, small, and medium enterprises (MSMEs) often face friction trying to determine <em>which specific clearances apply to them</em>, <em>in what sequence</em>, and <em>what exact evidence is needed</em>.
          </p>

          <div className="p-4 rounded bg-[#e3eff8] border border-[#b5d4ec] text-xs text-[#082B52] font-medium leading-relaxed">
            <strong>The UdyamSetu Breakthrough: </strong>
            Moving entrepreneurs from a passive, overwhelming catalog of 140+ uncontextualized services to an intelligent, automated, business-specific regulatory roadmap that guides them through preparation, tracking, and compliance.
          </div>
        </div>

        {/* 5-Step Journey Framework */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#082B52] font-serif">
              The 5-Stage Transformation Framework
            </h2>
            <p className="text-xs text-[#5E6B75] mt-1">
              How UdyamSetu supports entrepreneurs across their entire operational lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                step: "01",
                title: "UNDERSTAND",
                desc: "Evaluates exact statutory triggers based on your sector, location, workforce, and machinery.",
              },
              {
                step: "02",
                title: "PREPARE",
                desc: "Checklists and document audits ensure your dossier is 100% complete before applying.",
              },
              {
                step: "03",
                title: "TRACK",
                desc: "Visual roadmap nodes with statuses: Ready, Action Required, Under Review, and Upcoming.",
              },
              {
                step: "04",
                title: "COMPLY",
                desc: "Automated recurring calendar for monthly GST returns, P-Tax, and annual environmental statements.",
              },
              {
                step: "05",
                title: "CONNECT",
                desc: "Direct handoffs to authorized state and central portals (MAITRI, FoSCoS, MPCB, NSWS).",
              },
            ].map((st) => (
              <div
                key={st.step}
                className="bg-white rounded-lg border border-[#D5DCE4] p-5 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="text-2xl font-black text-[#F39A24] font-mono">
                    {st.step}
                  </div>
                  <h3 className="text-sm font-bold text-[#082B52] uppercase tracking-wide mt-1">
                    {st.title}
                  </h3>
                  <p className="text-xs text-[#5E6B75] mt-2 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Tier Trust Philosophy */}
        <div className="bg-[#082B52] text-white rounded-lg p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#F39A24] uppercase tracking-wider">
              Core Architectural Principle
            </span>
            <h2 className="text-2xl font-bold font-serif">
              The 3-Tier Statutory Trust Philosophy
            </h2>
            <p className="text-xs text-[#cfe5ff]">
              Why UdyamSetu is designed for high-stakes government compliance, not generic AI guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded bg-[#051c35] border border-[#0B3A6E] space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F39A24] text-[#082B52] font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h3 className="text-sm font-bold text-white">AI Recommends</h3>
              </div>
              <p className="text-xs text-[#cfe5ff] leading-relaxed">
                Natural language intent parsing and contextual clustering identify potential regulatory overlaps and applicable incentive schemes.
              </p>
            </div>

            <div className="p-4 rounded bg-[#051c35] border border-[#0B3A6E] space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#16845B] text-white font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h3 className="text-sm font-bold text-white">Rules Validate</h3>
              </div>
              <p className="text-xs text-[#cfe5ff] leading-relaxed">
                Deterministic statutory logic engines enforce strict legal thresholds from the Factories Act, Water Act, Air Act, and FSSAI schedules.
              </p>
            </div>

            <div className="p-4 rounded bg-[#051c35] border border-[#0B3A6E] space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0B3A6E] text-white border border-[#cfe5ff] font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <h3 className="text-sm font-bold text-white">Humans Verify</h3>
              </div>
              <p className="text-xs text-[#cfe5ff] leading-relaxed">
                Designated Officers, Sub-Regional Environmental Officers, and District Industries Centre (DIC) authorities conduct final inspections and sanctions.
              </p>
            </div>
          </div>
        </div>

        {/* Data Governance & DPDP Notice */}
        <div id="privacy" className="bg-white rounded-lg border border-[#D5DCE4] p-6 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded bg-[#e1f5ee] text-[#16845B] flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#082B52] font-serif">
              Data Governance & Citizen Privacy
            </h3>
            <p className="text-xs text-[#5E6B75] leading-relaxed">
              UdyamSetu strictly complies with the Digital Personal Data Protection (DPDP) Act, 2023. We do not store biometric data, raw Aadhaar numbers, or banking credentials. All business parameters are retained securely within user-isolated Supabase PostgreSQL tables protected by Row Level Security (RLS).
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 py-4">
          <h3 className="text-xl font-bold text-[#082B52] font-serif">
            Ready to streamline your regulatory obligations?
          </h3>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/roadmap"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[#082B52] hover:bg-[#0B3A6E] text-white text-xs font-bold transition-colors shadow-xs"
            >
              <span>Explore Regulatory Journey</span>
              <ArrowRight className="w-4 h-4 text-[#F39A24]" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
