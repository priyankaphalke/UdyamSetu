import React from "react";
import { Link } from "react-router-dom";
import { Scale, ExternalLink, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#082B52] text-white border-t border-[#0B3A6E] mt-auto">
      {/* Tricolor / State Accent Strip */}
      <div className="h-1 w-full bg-gradient-to-r from-[#F39A24] via-[#FFFFFF] to-[#16845B]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#0B3A6E]/80">
          {/* Col 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#0B3A6E] border border-[#1e528b] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Scale className="w-5 h-5 text-[#F39A24]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-serif">
                UdyamSetu
              </span>
            </Link>

            <p className="text-sm text-[#cfe5ff] leading-relaxed max-w-sm">
              Your Regulatory Copilot for a Stronger Maharashtra. Transforming static regulatory compliance into dynamic, business-specific roadmaps.
            </p>

            <div className="p-3.5 rounded bg-[#051c35] border border-[#0B3A6E] text-xs text-[#b5d4ec] space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#16845B]" />
                <span>Statutory Trust Principle</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#cfe5ff]">
                AI recommends. Rules validate. Humans verify. Final applications, sanctions, and regulatory decisions remain with the respective government authorities.
              </p>
            </div>
          </div>

          {/* Col 3: Business Services */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#F39A24] uppercase tracking-wider">
              Business Services
            </div>
            <ul className="space-y-2 text-xs text-[#cfe5ff]">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Approvals & Licences
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Mandatory Documents
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Compliance Calendar
                </Link>
              </li>
              <li>
                <Link to="/government-support" className="hover:text-white transition-colors">
                  Government Support
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-white transition-colors">
                  Explore by Industry
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#F39A24] uppercase tracking-wider">
              Resources
            </div>
            <ul className="space-y-2 text-xs text-[#cfe5ff]">
              <li>
                <a
                  href="https://maitri.mahaonline.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>MAITRI Portal</span>
                  <ExternalLink className="w-3 h-3 text-[#8a96a3]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.nsws.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>National Single Window (NSWS)</span>
                  <ExternalLink className="w-3 h-3 text-[#8a96a3]" />
                </a>
              </li>
              <li>
                <a
                  href="https://aaplesarkar.mahaonline.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Aaple Sarkar RTS</span>
                  <ExternalLink className="w-3 h-3 text-[#8a96a3]" />
                </a>
              </li>
              <li>
                <a
                  href="https://udyamregistration.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Udyam Registration</span>
                  <ExternalLink className="w-3 h-3 text-[#8a96a3]" />
                </a>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  Regulatory Guides & FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Institutional & About */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#F39A24] uppercase tracking-wider">
              Institutional
            </div>
            <ul className="space-y-2 text-xs text-[#cfe5ff]">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About UdyamSetu
                </Link>
              </li>
              <li>
                <Link to="/regulatory-areas" className="hover:text-white transition-colors">
                  Regulatory Areas
                </Link>
              </li>
              <li>
                <Link to="/about#sih-mandate" className="hover:text-white transition-colors">
                  SIH26130 Problem Statement
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const btn = document.querySelector('button[aria-label="Open Accessibility Tools"]');
                    if (btn) btn.click();
                  }}
                  className="hover:text-white transition-colors text-left"
                >
                  Accessibility Options
                </button>
              </li>
              <li>
                <Link to="/about#privacy" className="hover:text-white transition-colors">
                  Privacy & Data Governance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8a96a3]">
          <div>
            © {new Date().getFullYear()} UdyamSetu • Dedicated to Maharashtra's Entrepreneurs & MSMEs.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Maharashtra State Facilitation</span>
            <span>•</span>
            <span>Interoperable with MAITRI & NSWS</span>
            <span>•</span>
            <span>Speed • Clarity • Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
