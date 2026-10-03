import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  Scale,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Sparkles,
  Building2,
  Lock,
  CheckCircle2,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useApp();

  const searchParams = new URLSearchParams(location.search);
  const targetRedirect = searchParams.get("redirect") || location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    if (user?.id) {
      navigate(targetRedirect, { replace: true });
    }
  }, [user, navigate, targetRedirect]);

  const [email, setEmail] = useState("rajesh.sharma@abcfoods.in");
  const [password, setPassword] = useState("Maharashtra@2024");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError("");
    try {
      await login(email, password);
      // Navigate to destination (dashboard or originally requested protected route)
      navigate(targetRedirect, { replace: true });
    } catch (err) {
      const msg = err.message || "";
      if (msg.includes("Invalid login credentials") || msg.includes("invalid_credentials")) {
        setAuthError("Incorrect email or password. Please verify your credentials or click 'Autofill Demo Credentials'.");
      } else if (msg.includes("Email not confirmed")) {
        setAuthError("Please check your email to verify your account, or sign in using demo credentials.");
      } else {
        setAuthError("Unable to sign in. Please verify your internet connection or try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail("rajesh.sharma@abcfoods.in");
    setPassword("Maharashtra@2024");
    setAuthError("");
  };

  return (
    <div className="bg-background font-sans text-on-surface min-h-screen flex flex-col">
      <div className="w-full flex flex-col lg:flex-row min-h-screen">
        {/* LEFT PANEL: SIGN IN FORM */}
        <div className="w-full lg:w-1/2 bg-surface-container-lowest flex flex-col justify-between p-6 sm:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-outline-variant/30">
          <div className="w-full max-w-md mx-auto my-auto py-4">
            {/* Brand Mark & Statutory Identity */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded bg-primary-container flex items-center justify-center text-on-primary shadow-sm">
                <Scale className="w-5 h-5 text-secondary-container" />
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

            {/* Section Title & Meta */}
            <h1 className="font-headline-lg text-[26px] text-primary-container tracking-tight mb-1 font-bold">
              Sign in to your account
            </h1>
            <p className="font-body-md text-sm text-on-surface-variant mb-6">
              Access your enterprise regulatory journey, required documents, and compliance schedule.
            </p>

            {/* Quick Demo Login Preset Banner */}
            <div className="mb-6 p-3 bg-secondary-container/30 border border-secondary/30 rounded flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-secondary" />
                <span className="text-xs font-semibold text-secondary-fixed-dim sm:text-on-surface">
                  Demo Profile: <strong>ABC Foods Pvt. Ltd. (Nashik)</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={handleDemoFill}
                className="px-2.5 py-1 text-[11px] bg-secondary text-on-secondary rounded font-bold hover:bg-on-secondary-container transition-colors shadow-xs"
              >
                Autofill Credentials
              </button>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/30 text-red-700 text-xs flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-600 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Form Elements */}
            <form className="space-y-4" onSubmit={handleLogin}>
              {/* Work Email */}
              <div>
                <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1" htmlFor="login-email">
                  Work Email / Udyam ID
                </label>
                <div className="relative">
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full h-10 px-3 py-2 bg-surface-container-lowest border border-outline-variant rounded text-on-surface font-body-md placeholder:text-outline text-sm focus:outline-none focus:border-primary-container transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-label-md text-label-md text-on-surface font-semibold" htmlFor="login-password">
                    Password
                  </label>
                  <a href="#forgot" className="font-label-sm text-[11px] text-secondary hover:underline font-semibold">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
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
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border border-outline-variant text-primary-container accent-[#12304a] cursor-pointer"
                  />
                  <span className="font-body-sm text-[12px] text-on-surface-variant">
                    Keep me signed in on this secure device
                  </span>
                </label>
              </div>

              {/* Primary CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-primary-container text-on-primary font-label-md text-label-md font-semibold tracking-wider uppercase rounded flex items-center justify-center gap-2 hover:bg-primary transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-75"
                >
                  <span>{isLoading ? "Authenticating..." : "Sign In"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Sign-up Switch */}
              <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-center gap-1.5 font-body-sm text-sm">
                <span className="text-on-surface-variant">Need to register a new enterprise?</span>
                <Link
                  to="/register"
                  className="font-label-md text-label-md text-primary-container font-semibold hover:text-secondary tracking-wide uppercase"
                >
                  Create Account
                </Link>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="w-full max-w-md mx-auto pt-6 text-center">
            <p className="font-body-sm text-[11px] text-outline">
              © 2025 UdyamSetu • Regulatory Guidance Prototype for Maharashtra MSMEs
            </p>
          </div>
        </div>

        {/* RIGHT PANEL: INSTITUTIONAL MISSION & STATUTORY CREDENTIALS */}
        <div className="w-full lg:w-1/2 bg-surface-container-low/60 flex flex-col justify-between p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-lg mx-auto my-auto space-y-8 py-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-secondary">
                <Scale className="w-5 h-5" />
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Institutional Mandate
                </span>
              </div>
              <h2 className="font-headline-md text-[22px] text-primary-container leading-snug tracking-tight font-bold">
                Your Regulatory Copilot for a Stronger Maharashtra.
              </h2>
              <p className="font-body-md text-sm text-on-surface-variant mt-2 leading-relaxed">
                UdyamSetu organizes complex regulatory clearances, pre-screens mandatory documentation, and pairs your enterprise with state industrial incentives.
              </p>
            </div>

            {/* Quick Feature Pillars */}
            <div className="space-y-3">
              <div className="p-4 rounded bg-surface-container-lowest border border-outline-variant/40 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-primary-container text-on-primary flex items-center justify-center shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-label-md text-sm font-semibold text-primary">
                    Predictive Regulatory Roadmap
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Clearances tailored to your industry sector, Maharashtra district, scale, and operational activities.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded bg-surface-container-lowest border border-outline-variant/40 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-secondary text-on-secondary flex items-center justify-center shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-label-md text-sm font-semibold text-primary">
                    Pre-Screened Required Documents
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Avoid portal rejections on MAITRI and FoSCoS through automated rule-based compliance audits.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded bg-surface-container-lowest border border-outline-variant/40 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-tertiary-container text-on-tertiary flex items-center justify-center shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-label-md text-sm font-semibold text-primary">
                    Government Support & Schemes
                  </h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Curated state industrial policy incentives, power tariff waivers, and interest subvention matching.
                  </p>
                </div>
              </div>
            </div>

            {/* DPDP Notice */}
            <div className="p-4 rounded bg-surface-container border-l-4 border-l-primary-container border-y border-r border-outline-variant/30 flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary-container shrink-0 mt-0.5" />
              <div>
                <div className="font-label-sm text-[11px] font-bold text-primary-container uppercase tracking-wide">
                  Data Governance Standard
                </div>
                <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5 leading-relaxed">
                  DPDP Act Compliant • Zero retention of Aadhaar XML authentication data.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-lg mx-auto pt-6 border-t border-outline-variant/40 flex items-center justify-between text-outline text-[11px] font-body-sm">
            <span>Prototype Dataset</span>
            <span>MAITRI Aligned</span>
            <span>Document Readiness</span>
          </div>
        </div>
      </div>
    </div>
  );
}
