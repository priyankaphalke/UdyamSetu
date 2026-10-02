import React from "react";
import { ExternalLink, ShieldCheck } from "lucide-react";

export default function HandoffCard({ className = "" }) {
  return (
    <section
      className={`bg-surface-container-low rounded border-l-4 border-l-primary-container border-y border-r border-outline-variant p-space-md shadow-xs space-y-3.5 ${className}`}
    >
      <div className="flex items-center gap-2.5 pb-2 border-b border-outline-variant">
        <div className="w-8 h-8 rounded bg-primary-container/10 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="font-headline-sm text-[15px] font-bold text-primary leading-tight">
            Official Service Handoff
          </h4>
          <span className="font-code-statutory text-[11px] text-on-surface-variant font-medium">
            Understand → Prepare → Track → Official Government Service
          </span>
        </div>
      </div>

      <p className="font-body-sm text-[13px] text-on-surface leading-relaxed">
        UdyamSetu does not replace official government portals. We help your business understand applicable requirements, prepare documents, and track recurring compliance before guiding you to the appropriate official department for formal submission.
      </p>

      {/* Visual Flow Diagram: Understand -> Prepare -> Track -> Official Government Service */}
      <div className="bg-surface-container-lowest p-2.5 rounded border border-outline-variant font-code-statutory text-[11px]">
        <div className="grid grid-cols-7 gap-1 text-center items-center">
          <div className="p-1 rounded bg-surface text-primary font-bold text-[10px] sm:text-[11px]">1. Understand</div>
          <div className="text-outline-variant font-bold">→</div>
          <div className="p-1 rounded bg-surface text-primary font-bold text-[10px] sm:text-[11px]">2. Prepare</div>
          <div className="text-outline-variant font-bold">→</div>
          <div className="p-1 rounded bg-surface text-primary font-bold text-[10px] sm:text-[11px]">3. Track</div>
          <div className="text-outline-variant font-bold">→</div>
          <div className="p-1 rounded bg-primary-container text-on-primary font-bold text-[10px] sm:text-[11px] truncate">
            4. Official Service
          </div>
        </div>
      </div>

      <div className="bg-surface-container-highest/60 p-2.5 rounded text-on-surface font-body-sm text-[12px] leading-tight">
        <strong className="text-primary font-semibold">Important Positioning:</strong> All legally binding licenses, statutory payments, and formal approvals are administered directly by authorized Maharashtra and Central authorities.
      </div>

      {/* Handoff Action Links */}
      <div className="pt-1 flex flex-col gap-2">
        <a
          className="inline-flex items-center justify-between w-full h-9 px-3 rounded bg-surface-container-lowest border border-primary text-primary font-label-md text-[12px] hover:bg-surface-container transition-colors shadow-xs"
          href="https://maitri.mahaonline.gov.in"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="flex items-center gap-1.5 font-semibold">
            <ExternalLink className="w-3.5 h-3.5 text-secondary" />
            MAITRI Single Window (Maharashtra)
          </span>
          <span className="font-code-statutory text-[11px] text-outline font-medium">Official Portal ↗</span>
        </a>

        <a
          className="inline-flex items-center justify-between w-full h-9 px-3 rounded bg-surface-container-lowest border border-outline-variant text-on-surface font-label-md text-[12px] hover:bg-surface-container transition-colors"
          href="https://aaplesarkar.mahaonline.gov.in"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="flex items-center gap-1.5 font-semibold">
            <ExternalLink className="w-3.5 h-3.5 text-outline" />
            Aaple Sarkar (Citizen & Business Services)
          </span>
          <span className="font-code-statutory text-[11px] text-outline font-medium">Official Portal ↗</span>
        </a>
      </div>
    </section>
  );
}
