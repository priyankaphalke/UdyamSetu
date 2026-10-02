import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import BusinessProfile from "./pages/BusinessProfile";
import Dashboard from "./pages/Dashboard";
import RegulatoryRoadmap from "./pages/RegulatoryRoadmap";
import RequirementDetail from "./pages/RequirementDetail";
import DocumentsWorkspace from "./pages/DocumentsWorkspace";
import Compliance from "./pages/Compliance";
import GovernmentSupport from "./pages/GovernmentSupport";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Authentication Flows */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Onboarding / Business Context */}
          <Route path="/business-profile" element={<BusinessProfile />} />

          {/* Core App Protected Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roadmap" element={<RegulatoryRoadmap />} />
          <Route path="/requirements/:id" element={<RequirementDetail />} />
          <Route path="/documents" element={<DocumentsWorkspace />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/government-support" element={<GovernmentSupport />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
