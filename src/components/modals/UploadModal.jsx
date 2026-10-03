import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  X,
  UploadCloud,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
  ShieldAlert,
} from "lucide-react";

export default function UploadModal() {
  const { isUploadModalOpen, closeUploadModal, uploadDoc, uploadTargetRequirement, requirements, businessProfile } = useApp();

  const [file, setFile] = useState(null);
  const [docName, setDocName] = useState("");
  const [category, setCategory] = useState("Technical & Engineering");
  const [docType, setDocType] = useState("Water Test Analysis Report");
  const [targetReqId, setTargetReqId] = useState(uploadTargetRequirement || "fssai-license");
  const [isProcessing, setIsProcessing] = useState(false);
  const [screeningResults, setScreeningResults] = useState(null);

  if (!isUploadModalOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setDocName(selected.name);
    }
  };

  const runPreScreening = () => {
    if (!docName) return;

    setIsProcessing(true);
    setScreeningResults(null);

    // Simulate intelligent pre-screening parser
    setTimeout(() => {
      setIsProcessing(false);
      setScreeningResults({
        formatValid: true,
        resolutionValid: true,
        entityMatch: `${businessProfile?.legalName || "Registered Enterprise"} (${businessProfile?.district || "Maharashtra"})`,
        statutoryStandards: "Statutory parameters & format standards verified",
        score: 95,
      });
    }, 1200);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!docName) return;

    await uploadDoc({
      name: docName,
      category,
      docType,
      size: file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : "1.4 MB",
      requirementRef: [targetReqId],
      notes: "Pre-screened and verified against statutory criteria.",
    });

    // Reset and close
    setFile(null);
    setDocName("");
    setScreeningResults(null);
    closeUploadModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-surface-container-lowest border border-outline-variant rounded max-w-xl w-full shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-primary-container text-on-primary flex items-center justify-center">
              <UploadCloud className="w-4 h-4 text-secondary-fixed" />
            </div>
            <div>
              <h3 className="font-headline-sm text-[16px] text-primary font-bold leading-tight">
                Pre-Screen & Upload Regulatory Document
              </h3>
              <p className="font-body-sm text-[11px] text-on-surface-variant">
                Document Verification • Automated Pre-Screening
              </p>
            </div>
          </div>
          <button
            onClick={closeUploadModal}
            className="p-1 rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleFinalSubmit} className="p-5 space-y-4">
          {/* Target Requirement Selector */}
          <div>
            <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
              Link to Regulatory Clearance
            </label>
            <select
              value={targetReqId}
              onChange={(e) => setTargetReqId(e.target.value)}
              className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded text-on-surface text-sm focus:outline-none focus:border-primary-container"
            >
              {requirements.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title} ({r.department})
                </option>
              ))}
              <option value="general">General Enterprise Repository</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Category */}
            <div>
              <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                Document Tier
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded text-on-surface text-sm focus:outline-none focus:border-primary-container"
              >
                <option value="Statutory Identity">Statutory Identity</option>
                <option value="Premises & Land">Premises & Land</option>
                <option value="Technical & Engineering">Technical & Engineering</option>
                <option value="Environmental & Lab">Environmental & Lab</option>
              </select>
            </div>

            {/* Document Specific Type */}
            <div>
              <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                Document Type
              </label>
              <input
                type="text"
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                placeholder="e.g. Water Test Analysis Report"
                required
                className="w-full h-10 px-3 bg-surface-container-lowest border border-outline-variant rounded text-on-surface text-sm focus:outline-none focus:border-primary-container"
              />
            </div>
          </div>

          {/* File Drag and Drop Zone */}
          <div>
            <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
              File Attachment
            </label>
            <div className="border-2 border-dashed border-outline-variant rounded p-5 text-center bg-surface-container-low/40 hover:bg-surface-container-low transition-colors">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.dwg"
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center justify-center gap-1.5"
              >
                <FileText className="w-8 h-8 text-secondary" />
                <span className="font-label-md text-sm text-primary font-semibold">
                  {docName ? docName : "Click to browse or drop file here"}
                </span>
                <span className="text-[11px] text-outline">
                  Accepted formats: PDF, JPG, PNG (Max 15MB) • Self-attestation supported
                </span>
              </label>
            </div>
          </div>

          {/* Pre-Screening Run Button & Diagnostic Panel */}
          {docName && !screeningResults && (
            <div className="pt-1">
              <button
                type="button"
                onClick={runPreScreening}
                disabled={isProcessing}
                className="w-full h-10 rounded bg-surface-container-high border border-outline text-primary font-label-md text-sm font-semibold flex items-center justify-center gap-2 hover:bg-surface-container transition-colors"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-secondary" />
                    <span>Analyzing statutory metadata & OCR compliance...</span>
                  </>
                ) : (
                  <>
                    <FileCheck className="w-4 h-4 text-secondary" />
                    <span>Run Automated Pre-Screening Check</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Pre-Screening Success Result */}
          {screeningResults && (
            <div className="p-3 bg-secondary-container/20 border border-secondary/40 rounded space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-secondary flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  Pre-Screening Passed (Ready for Submission)
                </span>
                <span className="font-mono bg-secondary text-on-secondary px-1.5 py-0.5 rounded font-bold">
                  {screeningResults.score}% Match
                </span>
              </div>
              <ul className="text-on-surface-variant space-y-1 pl-5 list-disc text-[11px]">
                <li>Entity Verified: {screeningResults.entityMatch}</li>
                <li>Statutory Quality: {screeningResults.statutoryStandards}</li>
                <li>Digital Seal & Watermark verified. Ready for portal upload.</li>
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 border-t border-outline-variant flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={closeUploadModal}
              className="h-10 px-4 rounded border border-outline-variant text-on-surface text-sm font-medium hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!docName}
              className="h-10 px-5 rounded bg-primary-container text-on-primary text-sm font-semibold hover:bg-primary transition-colors disabled:opacity-50"
            >
              Save Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
