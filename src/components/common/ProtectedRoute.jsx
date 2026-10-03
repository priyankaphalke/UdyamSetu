import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Scale } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useApp();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F6F8] flex flex-col items-center justify-center p-4 text-[#17212B]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded bg-[#082B52] border border-[#0B3A6E] flex items-center justify-center text-white shadow-md animate-pulse">
            <Scale className="w-6 h-6 text-[#F39A24]" />
          </div>
          <div className="text-center space-y-1">
            <div className="text-sm font-bold font-serif text-[#082B52]">UdyamSetu</div>
            <div className="text-xs text-[#8a96a3]">Verifying enterprise session...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to /login preserving destination in query and state
    const redirectParam = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirectParam}`} replace state={{ from: location }} />;
  }

  return children;
}
