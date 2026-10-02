import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import AppLayout from "../components/layout/AppLayout";
import {
  Files,
  UploadCloud,
  FileCheck2,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Download,
  Search,
  Filter,
  Trash2,
  ShieldCheck,
  Building2,
  Archive,
  Eye,
} from "lucide-react";

export default function DocumentsWorkspace() {
  const { documents, openUploadModal, showToast, businessProfile } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Records", count: documents.length },
    { id: "Statutory Identity", label: "Statutory Identity", count: documents.filter(d => d.category === "Statutory Identity").length },
    { id: "Premises & Land", label: "Premises & Land", count: documents.filter(d => d.category === "Premises & Land").length },
    { id: "Technical & Engineering", label: "Technical & Engineering", count: documents.filter(d => d.category === "Technical & Engineering").length },
    { id: "Environmental & Lab", label: "Environmental & Lab", count: documents.filter(d => d.category === "Environmental & Lab").length },
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesCat = selectedCategory === "all" || doc.category === selectedCategory;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.docType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.notes?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleExportZip = () => {
    showToast("Generating pre-screened MAITRI statutory dossier package (.ZIP)...");
  };

  const handleDownloadDoc = (doc) => {
    showToast(`Downloading certified copy: ${doc.name}`);
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-space-lg max-w-7xl mx-auto pb-12">
        {/* Top Context & Header */}
        <div className="flex flex-wrap items-center justify-between gap-y-2 border-b border-outline-variant pb-3">
          <div className="flex items-center gap-2 font-code-statutory text-xs text-on-surface-variant">
            <span>Overview</span>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">Document Readiness</span>
            <span className="text-outline-variant">|</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Demo Regulatory Dataset • Prototype Mode
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-outline">Enterprise Vault:</span>
            <span className="font-mono font-bold text-primary px-2 py-0.5 bg-surface-container rounded">
              {businessProfile?.legalName}
            </span>
          </div>
        </div>

        {/* Title Bar & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-[26px] text-primary tracking-tight font-bold">
              Document Readiness & Records Workspace
            </h1>
            <p className="font-body-md text-sm text-on-surface-variant mt-0.5">
              Upload, pre-screen, and organize mandatory permits before filing with official Maharashtra government departments.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportZip}
              className="h-10 px-4 rounded border border-outline bg-surface-container-lowest text-primary text-xs font-semibold hover:bg-surface-container transition-colors flex items-center gap-2 shadow-xs"
            >
              <Archive className="w-4 h-4 text-secondary" />
              <span>Export Pre-Screened Documents (.ZIP)</span>
            </button>

            <button
              onClick={() => openUploadModal()}
              className="h-10 px-4 rounded bg-primary-container text-on-primary text-xs font-semibold hover:bg-primary transition-colors flex items-center gap-2 shadow-xs"
            >
              <UploadCloud className="w-4 h-4 text-secondary-container" />
              <span>Upload Record</span>
            </button>
          </div>
        </div>

        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded bg-surface-container-lowest border border-outline-variant shadow-xs flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold text-outline uppercase tracking-wider">
                Total Ingested Records
              </div>
              <div className="text-2xl font-bold text-primary font-mono mt-1">
                {documents.length} Files
              </div>
            </div>
            <div className="w-10 h-10 rounded bg-primary-container/10 flex items-center justify-center">
              <Files className="w-5 h-5 text-primary" />
            </div>
          </div>

          <div className="p-4 rounded bg-surface-container-lowest border border-outline-variant shadow-xs flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold text-outline uppercase tracking-wider">
                Pre-Screened & Verified
              </div>
              <div className="text-2xl font-bold text-secondary font-mono mt-1">
                {documents.filter((d) => d.status === "verified").length} Records
              </div>
            </div>
            <div className="w-10 h-10 rounded bg-secondary-container/30 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-secondary" />
            </div>
          </div>

          <div className="p-4 rounded bg-surface-container-lowest border border-outline-variant shadow-xs flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold text-outline uppercase tracking-wider">
                Action Required / Pending
              </div>
              <div className="text-2xl font-bold text-amber-700 font-mono mt-1">
                {documents.filter((d) => d.status === "action_required").length} Items
              </div>
            </div>
            <div className="w-10 h-10 rounded bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-800" />
            </div>
          </div>
        </div>

        {/* SEARCH & CATEGORY FILTER TABS */}
        <div className="bg-surface-container-lowest p-space-md rounded border border-outline-variant shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? "bg-primary-container text-on-primary shadow-xs"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="font-mono text-[10px] opacity-80">({cat.count})</span>
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, type, or note..."
                className="w-full h-9 pl-9 pr-3 bg-surface-container-lowest border border-outline-variant rounded text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary-container"
              />
              <Search className="w-4 h-4 text-outline absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* DOCUMENTS DATA TABLE */}
          <div className="overflow-x-auto border border-outline-variant/60 rounded">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-on-surface border-b border-outline-variant font-semibold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Document Name & Type</th>
                  <th className="py-3 px-3">Statutory Tier</th>
                  <th className="py-3 px-3">Related Clearance</th>
                  <th className="py-3 px-3">Pre-Screening Status</th>
                  <th className="py-3 px-3">Audit Details</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-variant bg-surface-container-lowest">
                {filteredDocs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-on-surface-variant">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Files className="w-8 h-8 text-outline" />
                        <span className="font-semibold text-sm">No records found</span>
                        <p className="text-xs text-outline max-w-sm">
                          {searchQuery || selectedCategory !== "all"
                            ? "Try adjusting your search query or category filter."
                            : "No statutory documents uploaded yet for this enterprise. Click 'Upload Record' to add a document."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredDocs.map((doc) => {
                    const isVerified = doc.status === "verified";
                    return (
                      <tr key={doc.id} className="hover:bg-surface/60 transition-colors">
                        {/* Document Name */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded bg-surface-container flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-semibold text-primary">{doc.name}</div>
                              <div className="text-[11px] text-outline font-mono">
                                {doc.docType} • {doc.size}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Tier */}
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface-container text-on-surface">
                            {doc.category}
                          </span>
                        </td>

                        {/* Related Clearance */}
                        <td className="py-3 px-3">
                          <div className="flex flex-wrap gap-1">
                            {doc.requirementRef?.map((ref) => (
                              <span
                                key={ref}
                                className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-primary-fixed text-primary-container font-semibold uppercase"
                              >
                                {ref.replace("-", " ")}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase font-mono ${
                              isVerified
                                ? "bg-secondary-container/50 text-on-secondary-container border border-secondary/30"
                                : "bg-amber-100 text-amber-900 border border-amber-300"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isVerified ? "bg-secondary" : "bg-amber-700"
                              }`}
                            ></span>
                            {isVerified ? "Verified" : "Action Required"}
                          </span>
                        </td>

                        {/* Audit Details */}
                        <td className="py-3 px-3 text-on-surface-variant text-[11px]">
                          <div>{doc.verifiedBy}</div>
                          {doc.notes && <div className="text-[10px] text-outline mt-0.5">{doc.notes}</div>}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleDownloadDoc(doc)}
                              title="Download Record"
                              className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            {!isVerified && (
                              <button
                                onClick={() => openUploadModal(doc.requirementRef?.[0])}
                                className="text-xs text-secondary font-semibold hover:underline px-2 py-1 bg-surface-container rounded"
                              >
                                Replace
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statutory Ingestion Architecture Notice */}
        <div className="p-4 rounded bg-surface-container-low border border-outline-variant/60 flex items-start gap-3 text-xs text-on-surface-variant">
          <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-primary">Automated Ingestion Pre-Check Standard: </strong>
            Documents stored in UdyamSetu are validated against Maharashtra MAITRI schemas (PDF/A compliance, 200 DPI resolution, and NABL lab certification validation).
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
