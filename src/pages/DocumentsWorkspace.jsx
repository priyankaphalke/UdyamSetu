import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import AppLayout from "../components/layout/AppLayout";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Download,
  Building2,
} from "lucide-react";

export default function DocumentsWorkspace() {
  const { documents, openUploadModal, showToast, businessProfile } = useApp();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const readyDocs = documents.filter((d) => d.status === "verified");
  const needReviewDocs = documents.filter((d) => d.status === "action_required");
  const missingDocs = documents.filter((d) => d.status === "pending" || !d.status);

  const tabs = [
    { id: "all", label: "All Documents", count: documents.length },
    { id: "ready", label: "Ready", count: readyDocs.length },
    { id: "need_review", label: "Need Review", count: needReviewDocs.length },
    { id: "missing", label: "Missing", count: missingDocs.length },
  ];

  const filteredDocs = documents.filter((doc) => {
    let tabMatch = true;
    if (activeTab === "ready") tabMatch = doc.status === "verified";
    if (activeTab === "need_review") tabMatch = doc.status === "action_required";
    if (activeTab === "missing") tabMatch = doc.status === "pending" || !doc.status;

    const query = searchQuery.toLowerCase();
    const searchMatch =
      !query ||
      doc.name.toLowerCase().includes(query) ||
      (doc.category && doc.category.toLowerCase().includes(query)) ||
      (doc.notes && doc.notes.toLowerCase().includes(query));

    return tabMatch && searchMatch;
  });

  const handleDownloadChecklist = () => {
    showToast("Document preparation checklist downloaded.");
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* ========================================================================= */}
        {/* PAGE HEADER                                                               */}
        {/* ========================================================================= */}
        <div className="bg-white border border-[#D8DEE4] rounded p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8DEE4]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#0B4F71] uppercase tracking-wider px-2 py-0.5 rounded bg-[#e3f0f8] border border-[#b8d7eb]">
                  Document Readiness
                </span>
                <span className="text-xs text-[#495057]">
                  {businessProfile?.legalName}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#12304A] font-serif mt-1">
                Required Documents
              </h1>
              <p className="text-xs sm:text-sm text-[#495057] mt-0.5">
                Manage, verify, and upload documents required for your Maharashtra regulatory applications.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => openUploadModal()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#0B4F71] hover:bg-[#12304A] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload Document</span>
              </button>

              <button
                onClick={handleDownloadChecklist}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-[#F5F7F8] hover:bg-[#e3f0f8] border border-[#D8DEE4] text-xs font-semibold text-[#12304A] transition-colors"
                title="Download document preparation checklist"
              >
                <Download className="w-3.5 h-3.5 text-[#0B4F71]" />
                <span className="hidden sm:inline">Checklist</span>
              </button>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-3 rounded border text-left transition-colors ${
                    active
                      ? "bg-[#0B4F71] text-white border-[#0B4F71]"
                      : "bg-[#F5F7F8] text-[#263238] border-[#D8DEE4] hover:bg-white"
                  }`}
                >
                  <div className={`text-[11px] uppercase font-semibold tracking-wider ${active ? "text-[#cfe5ff]" : "text-[#8c96a0]"}`}>
                    {tab.label}
                  </div>
                  <div className="text-lg sm:text-xl font-bold mt-0.5">
                    {tab.count} <span className="text-xs font-normal">Files</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DOCUMENTS LIST & SEARCH                                                   */}
        {/* ========================================================================= */}
        <div className="bg-white border border-[#D8DEE4] rounded p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D8DEE4]">
            <h2 className="text-base sm:text-lg font-bold text-[#12304A] font-serif">
              Document Checklist ({filteredDocs.length})
            </h2>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#8c96a0] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search documents..."
                className="w-full pl-9 pr-3 py-1.5 rounded border border-[#D8DEE4] text-xs bg-white text-[#263238] focus:outline-hidden focus:border-[#0B4F71]"
              />
            </div>
          </div>

          {filteredDocs.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#8c96a0] space-y-2">
              <FileText className="w-8 h-8 text-[#D8DEE4] mx-auto" />
              <p>No documents found matching this filter.</p>
              <button
                onClick={() => {
                  setActiveTab("all");
                  setSearchQuery("");
                }}
                className="text-xs font-semibold text-[#0B4F71] underline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F5F7F8] border-b border-[#D8DEE4] text-[#495057] uppercase text-[10px] tracking-wider font-semibold">
                    <th className="py-2.5 px-3">Document Name</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 hidden md:table-cell">Details / Format</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D8DEE4]">
                  {filteredDocs.map((doc) => {
                    const isReady = doc.status === "verified";
                    const isNeedReview = doc.status === "action_required";

                    return (
                      <tr key={doc.id} className="hover:bg-[#F5F7F8]/80 transition-colors">
                        <td className="py-3 px-3">
                          <div className="font-semibold text-sm text-[#12304A]">
                            {doc.name}
                          </div>
                          {doc.notes && (
                            <div className="text-[11px] text-[#495057] mt-0.5 max-w-md">
                              {doc.notes}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-3 text-[#495057]">
                          <span className="px-2 py-0.5 rounded bg-[#F5F7F8] border border-[#D8DEE4] text-[11px] font-medium">
                            {doc.category || "General"}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          {isReady && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#e1f5ee] text-[#176B55] border border-[#a2e0cb]">
                              <CheckCircle2 className="w-3 h-3" />
                              Ready
                            </span>
                          )}
                          {isNeedReview && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#fef5e7] text-[#7a5214] border border-[#f8c471]">
                              <Clock className="w-3 h-3" />
                              Need Review
                            </span>
                          )}
                          {!isReady && !isNeedReview && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#fee2e2] text-[#b91c1c] border border-[#fca5a5]">
                              <AlertCircle className="w-3 h-3" />
                              Missing
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-3 hidden md:table-cell text-[#8c96a0] text-[11px]">
                          <div>{doc.docType || "PDF Document"}</div>
                          <div>{doc.size || "Standard Size"}</div>
                        </td>

                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => openUploadModal(doc.requirementRef?.[0] || doc.id)}
                            className="px-3 py-1.5 rounded bg-white hover:bg-[#F5F7F8] border border-[#D8DEE4] text-xs font-semibold text-[#0B4F71] transition-colors"
                          >
                            {isReady ? "Replace" : "Upload"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
