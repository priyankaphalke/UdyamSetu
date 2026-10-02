import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  Building2,
  Shield,
  Eye,
  EyeOff,
  ArrowRight,
  Info,
  Scale,
  CalendarCheck,
  FileCheck2,
  IndianRupee,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useApp();

  const [fullName, setFullName] = useState("Rajesh Sharma");
  const [workEmail, setWorkEmail] = useState("rajesh.sharma@abcfoods.in");
  const [password, setPassword] = useState("Maharashtra@2024");
  const [confirmPassword, setConfirmPassword] = useState("Maharashtra@2024");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Compute password strength score (0 to 4)
  const getPasswordScore = (val) => {
    if (!val) return 0;
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  };

  const passwordScore = getPasswordScore(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAuthError("Passwords do not match!");
      return;
    }
    setAuthError("");
    setIsLoading(true);
    try {
      await register(fullName, workEmail, password);
      // Flow: Create Account -> Business Profile
      navigate("/business-profile");
    } catch (err) {
      setAuthError(err.message || "Failed to create account. Please verify your details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background font-sans text-on-surface min-h-screen flex flex-col">
      <div className="w-full flex flex-col lg:flex-row min-h-screen">
        {/* LEFT PANEL: REGISTRATION FORM */}
        <div className="w-full lg:w-1/2 bg-surface-container-lowest flex flex-col justify-between p-6 sm:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-outline-variant/30">
          <div className="w-full max-w-md mx-auto my-auto py-4">
            {/* Brand Mark & Statutory Identity */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center text-on-primary">
                <Scale className="w-4 h-4 text-secondary-container" />
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-[12px] tracking-wider uppercase text-primary-container font-semibold">
                  UdyamSetu <span className="text-outline">|</span> Regulatory Intelligence
                </span>
                <span className="font-body-sm text-[10px] text-on-surface-variant uppercase tracking-widest font-medium">
                  State & Central Compliance Architecture
                </span>
              </div>
            </div>

            {/* Onboarding Phase Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container text-on-surface-variant border border-outline-variant/40 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="font-label-sm text-[10px] uppercase font-bold tracking-widest text-primary-container">
                Enterprise Onboarding • Step 1 of 2 (Credential Setup)
              </span>
            </div>

            {/* Section Title & Meta */}
            <h1 className="font-headline-lg text-[26px] text-primary-container tracking-tight mb-1 font-bold">
              Create your UdyamSetu account
            </h1>
            <p className="font-body-md text-sm text-on-surface-variant mb-6">
              Set up your account to start your business regulatory journey.
            </p>

            {authError && (
              <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/30 text-red-700 text-xs flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-600 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Form Elements */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1" htmlFor="full-name">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="full-name"
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full h-10 px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded text-on-surface font-body-md placeholder:text-outline text-sm focus:outline-none focus:border-primary-container transition-colors"
                  />
                </div>
              </div>

              {/* Work Email */}
              <div>
                <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1" htmlFor="work-email">
                  Work Email
                </label>
                <div className="relative">
                  <input
                    id="work-email"
                    name="workEmail"
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full h-10 px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded text-on-surface font-body-md placeholder:text-outline text-sm focus:outline-none focus:border-primary-container transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="password">
                    Password
                  </label>
                  <span className="font-label-sm text-[11px] text-on-surface-variant">Min. 8 characters</span>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password (min. 8 characters)"
                    className="w-full h-10 px-3 py-2 pr-10 bg-surface-container-lowest border border-outline-variant rounded text-on-surface font-body-md placeholder:text-outline text-sm focus:outline-none focus:border-primary-container transition-colors"
                  />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-outline hover:text-on-surface p-0.5 rounded focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Structural Password Indicator */}
                <div className="flex items-center gap-1.5 mt-2">
                  {[1, 2, 3, 4].map((bar) => {
                    const activeColor = passwordScore >= 3 ? "bg-secondary" : "bg-primary-container";
                    const isFilled = passwordScore >= bar;
                    return (
                      <div
                        key={bar}
                        className={`h-1 flex-1 rounded-sm transition-colors duration-300 ${
                          isFilled ? activeColor : "bg-surface-container"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full h-10 px-3 py-2 pr-10 bg-surface-container-lowest border border-outline-variant rounded text-on-surface font-body-md placeholder:text-outline text-sm focus:outline-none focus:border-primary-container transition-colors"
                  />
                  <button
                    type="button"
                    aria-label="Toggle confirm password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-2.5 text-outline hover:text-on-surface p-0.5 rounded focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Agreement Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 rounded border border-outline-variant text-primary-container accent-[#12304a] cursor-pointer"
                  />
                  <span className="font-body-sm text-[12px] text-on-surface-variant leading-tight">
                    I agree to the{" "}
                    <span className="text-primary-container underline font-semibold hover:text-secondary">
                      Terms & Privacy Policy
                    </span>{" "}
                    and Statutory Data Governance Standards.
                  </span>
                </label>
              </div>

              {/* Primary CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-11 bg-primary-container text-on-primary font-label-md text-label-md font-semibold tracking-wider uppercase rounded flex items-center justify-center gap-2 hover:bg-primary transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                >
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Process Redirection Microcopy */}
              <p className="font-body-sm text-[12px] text-center text-outline leading-normal">
                Account creation directs to Business Profile onboarding to configure your enterprise jurisdiction.
              </p>

              {/* Sign-in Switch */}
              <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-center gap-1.5 font-body-sm text-sm">
                <span className="text-on-surface-variant">Already have an account?</span>
                <Link
                  to="/login"
                  className="font-label-md text-label-md text-primary-container font-semibold hover:text-secondary tracking-wide uppercase"
                >
                  Sign In
                </Link>
              </div>
            </form>

            {/* Deferred Information Card */}
            <div className="mt-6 p-3 bg-surface-container-low rounded border border-outline-variant/30 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <p className="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">
                <span className="font-semibold text-primary-container">Note:</span> Business entity credentials, Udyam registration, and manufacturing parameters are entered on the next screen (Business Profile).
              </p>
            </div>
          </div>

          {/* Footer Micro Regulatory Ledger */}
          <div className="w-full max-w-md mx-auto pt-6 text-center">
            <p className="font-body-sm text-[11px] text-outline">
              © 2025 UdyamSetu • Regulatory Guidance Prototype for Maharashtra MSMEs
            </p>
          </div>
        </div>

        {/* RIGHT PANEL: CONTEXT & STATUTORY JOURNEY PREVIEW */}
        <div className="w-full lg:w-1/2 bg-surface-container-low/60 flex flex-col justify-between p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-lg mx-auto my-auto space-y-8 py-4">
            {/* Header Statement */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-secondary">
                <Scale className="w-5 h-5 text-secondary" />
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Institutional Blueprint
                </span>
              </div>
              <h2 className="font-headline-md text-[22px] text-primary-container leading-snug tracking-tight font-bold">
                Structured regulatory intelligence from day one.
              </h2>
              <p className="font-body-md text-sm text-on-surface-variant mt-2 leading-relaxed">
                UdyamSetu replaces fragmented government portal searches with an end-to-end statutory roadmap built specifically around your enterprise.
              </p>
            </div>

            {/* 2-Step Onboarding Architecture Diagram */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-outline-variant/40">
                <span className="font-label-sm text-[11px] tracking-wider uppercase font-semibold text-on-surface-variant">
                  System Provisioning Pipeline
                </span>
                <span className="font-label-sm text-[11px] font-semibold text-secondary">Step 1 of 2 Active</span>
              </div>

              {/* Step 1 Card: Active */}
              <div className="p-4 rounded bg-surface-container-lowest border-l-4 border-l-primary-container border-y border-r border-outline-variant/40 shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary font-label-sm text-xs flex items-center justify-center font-bold">
                      1
                    </span>
                    <span className="font-label-md text-sm font-semibold text-primary-container">
                      Account Credentials
                    </span>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-primary-fixed text-primary-container">
                    Current Step
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant pl-7">
                  Verified work email and secure authorized signatory credentials.
                </p>
              </div>

              {/* Step 2 Card: Incoming */}
              <div className="p-4 rounded bg-surface-container-lowest/80 border-l-4 border-l-outline border-y border-r border-outline-variant/40">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    <span className="font-label-md text-sm font-semibold text-on-surface">
                      Business Profile Configuration
                    </span>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-surface-container text-on-surface-variant">
                    Direct Next
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant pl-7">
                  Map your entity type, state jurisdiction, MSME classification, and operational permits.
                </p>
              </div>
            </div>

            {/* Value Pillar Ledger */}
            <div className="p-5 rounded bg-surface-container-lowest border border-outline-variant/40 space-y-4 shadow-xs">
              <div className="font-label-sm text-[11px] font-bold uppercase tracking-wider text-primary-container">
                Why register with UdyamSetu
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-secondary-container/40 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                    <CalendarCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-md text-sm font-medium text-on-surface">
                      Track statutory deadlines with structured compliance calendar
                    </span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">
                      Curated statutory filing schedules based on official state board calendars.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-secondary-container/40 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                    <FileCheck2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-md text-sm font-medium text-on-surface">
                      Document readiness checklist before official portal filing
                    </span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">
                      Pre-screen clearances against MAITRI & National Portal criteria.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-secondary-container/40 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                    <IndianRupee className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-md text-sm font-medium text-on-surface">
                      Personalized central and state industrial incentive discovery
                    </span>
                    <span className="font-body-sm text-[12px] text-on-surface-variant">
                      Tailored scheme mapping based on sector and enterprise scale.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Official Statutory Notice */}
            <div className="p-4 rounded bg-surface-container border-l-4 border-l-primary-container border-y border-r border-outline-variant/30 flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary-container shrink-0 mt-0.5" />
              <div>
                <div className="font-label-sm text-[11px] font-bold text-primary-container uppercase tracking-wide">
                  Data Governance Standard
                </div>
                <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5 leading-relaxed">
                  Statutory Notice: UdyamSetu maintains secure zero-retention handling for sensitive credentials in accordance with Digital Personal Data Protection (DPDP) principles.
                </p>
              </div>
            </div>
          </div>

          {/* Trust Indicator Strip */}
          <div className="w-full max-w-lg mx-auto pt-6 border-t border-outline-variant/40 flex items-center justify-between text-outline text-[11px] font-body-sm">
            <span>Prototype Architecture</span>
            <span>MAITRI Aligned</span>
            <span>Document Readiness</span>
          </div>
        </div>
      </div>
    </div>
  );
}
