import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import UploadModal from "../modals/UploadModal";
import { useApp } from "../../context/AppContext";
import { CheckCircle, AlertCircle, Info, ExternalLink, HelpCircle, Shield } from "lucide-react";

export default function AppLayout({ children }) {
  const { toast } = useApp();

  return (
    <div className="min-h-screen bg-[#F5F7F8] text-[#263238] flex flex-col font-sans antialiased">
      {/* Institutional Top Header & Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* Institutional Public Service Footer */}
      <Footer />

      {/* Global Pre-Screening Upload Modal */}
      <UploadModal />

      {/* Institutional Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#12304A] text-white rounded border border-[#0B4F71] shadow-xl animate-fade-in text-sm font-medium">
          {toast.type === "success" && <CheckCircle className="w-5 h-5 text-[#176B55] shrink-0" />}
          {toast.type === "warning" && <AlertCircle className="w-5 h-5 text-[#D99A35] shrink-0" />}
          {toast.type === "info" && <Info className="w-5 h-5 text-[#cfe5ff] shrink-0" />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
