import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

// Public Pages
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import IndustriesPage from "./pages/IndustriesPage";
import RegulatoryAreasPage from "./pages/RegulatoryAreasPage";
import ResourcesPage from "./pages/ResourcesPage";
import AboutPage from "./pages/AboutPage";
import GovernmentSupport from "./pages/GovernmentSupport";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Authenticated Pages
import BusinessProfile from "./pages/BusinessProfile";
import Dashboard from "./pages/Dashboard";
import RegulatoryRoadmap from "./pages/RegulatoryRoadmap";
import RequirementDetail from "./pages/RequirementDetail";
import DocumentsWorkspace from "./pages/DocumentsWorkspace";
import Compliance from "./pages/Compliance";

// Layout & Global Components
import ProtectedRoute from "./components/common/ProtectedRoute";
import AccessibilityWidget from "./components/common/AccessibilityWidget";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* ========================================================= */}
          {/* PUBLIC ROUTES (Strictly Separated from Dashboard)         */}
          {/* ========================================================= */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/regulatory-areas" element={<RegulatoryAreasPage />} />
          <Route path="/government-support" element={<GovernmentSupport />} />
          <Route path="/support" element={<Navigate to="/government-support" replace />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ========================================================= */}
          {/* AUTHENTICATED ROUTES (Protected by ProtectedRoute)         */}
          {/* ========================================================= */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/business-profile"
            element={
              <ProtectedRoute>
                <BusinessProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roadmap"
            element={
              <ProtectedRoute>
                <RegulatoryRoadmap />
              </ProtectedRoute>
            }
          />
          <Route
            path="/requirements/:id"
            element={
              <ProtectedRoute>
                <RequirementDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <ProtectedRoute>
                <DocumentsWorkspace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/compliance"
            element={
              <ProtectedRoute>
                <Compliance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/government-support"
            element={
              <ProtectedRoute>
                <GovernmentSupport />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global Government Portal Floating Accessibility Tools */}
        <AccessibilityWidget />
      </BrowserRouter>
    </AppProvider>
  );
}
