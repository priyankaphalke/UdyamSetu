import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import UploadModal from "../modals/UploadModal";
import { useApp } from "../../context/AppContext";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export default function AppLayout({ children }) {
  const { toast } = useApp();

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col font-sans">
      <Sidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <Header />
        <main className="relative pt-20 w-full flex-1 bg-surface px-6 sm:px-8 py-6">
          {children}
        </main>
      </div>

      {/* Global Pre-Screening Upload Modal */}
      <UploadModal />

      {/* Institutional Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-primary text-on-primary rounded shadow-xl border border-outline-variant/40 animate-fade-in text-body-md">
          {toast.type === "success" && <CheckCircle className="w-5 h-5 text-secondary-fixed shrink-0" />}
          {toast.type === "warning" && <AlertCircle className="w-5 h-5 text-tertiary-fixed shrink-0" />}
          {toast.type === "info" && <Info className="w-5 h-5 text-primary-fixed shrink-0" />}
          <span className="font-medium text-sm">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
