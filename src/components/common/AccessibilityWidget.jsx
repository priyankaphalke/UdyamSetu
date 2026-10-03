import React, { useState, useEffect } from "react";
import { Eye, Type, ZoomIn, ZoomOut, RotateCcw, Activity, X } from "lucide-react";

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [textSize, setTextSize] = useState("normal"); // 'sm', 'normal', 'lg', 'xl'
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Load persisted preferences
    const savedContrast = localStorage.getItem("udyamsetu_contrast") === "true";
    const savedTextSize = localStorage.getItem("udyamsetu_text_size") || "normal";
    const savedReduceMotion = localStorage.getItem("udyamsetu_reduce_motion") === "true";

    setHighContrast(savedContrast);
    setTextSize(savedTextSize);
    setReduceMotion(savedReduceMotion);

    applyClasses(savedContrast, savedTextSize, savedReduceMotion);
  }, []);

  const applyClasses = (contrast, size, motion) => {
    const root = document.documentElement;

    // High Contrast
    if (contrast) root.classList.add("accessibility-high-contrast");
    else root.classList.remove("accessibility-high-contrast");

    // Text Size
    root.classList.remove("accessibility-text-sm", "accessibility-text-lg", "accessibility-text-xl");
    if (size === "sm") root.classList.add("accessibility-text-sm");
    if (size === "lg") root.classList.add("accessibility-text-lg");
    if (size === "xl") root.classList.add("accessibility-text-xl");

    // Reduce Motion
    if (motion) root.classList.add("accessibility-reduce-motion");
    else root.classList.remove("accessibility-reduce-motion");
  };

  const toggleContrast = () => {
    const updated = !highContrast;
    setHighContrast(updated);
    localStorage.setItem("udyamsetu_contrast", String(updated));
    applyClasses(updated, textSize, reduceMotion);
  };

  const changeTextSize = (newSize) => {
    setTextSize(newSize);
    localStorage.setItem("udyamsetu_text_size", newSize);
    applyClasses(highContrast, newSize, reduceMotion);
  };

  const toggleMotion = () => {
    const updated = !reduceMotion;
    setReduceMotion(updated);
    localStorage.setItem("udyamsetu_reduce_motion", String(updated));
    applyClasses(highContrast, textSize, updated);
  };

  const resetAll = () => {
    setHighContrast(false);
    setTextSize("normal");
    setReduceMotion(false);
    localStorage.removeItem("udyamsetu_contrast");
    localStorage.removeItem("udyamsetu_text_size");
    localStorage.removeItem("udyamsetu_reduce_motion");
    applyClasses(false, "normal", false);
  };

  return (
    <>
      {/* Floating Accessibility Trigger Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Accessibility Tools"
          className="w-11 h-11 rounded-full bg-[#082B52] hover:bg-[#0B3A6E] text-white flex items-center justify-center shadow-lg border-2 border-white transition-transform hover:scale-105"
          title="Accessibility Options (सुगमता पर्याय)"
        >
          <span className="text-sm font-bold font-serif">♿</span>
        </button>
      </div>

      {/* Accessibility Popover Modal */}
      {isOpen && (
        <div className="fixed bottom-20 left-6 z-50 w-72 bg-white rounded-lg border border-[#D5DCE4] shadow-2xl p-4 text-xs text-[#17212B] animate-fade-in">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#D5DCE4]">
            <div className="font-bold text-sm text-[#082B52] flex items-center gap-1.5">
              <span>♿</span>
              <span>Accessibility Options</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-[#8a96a3] hover:text-[#17212B]"
              aria-label="Close Accessibility Options"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 space-y-3.5">
            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <span className="font-medium text-xs flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#0B3A6E]" />
                High Contrast
              </span>
              <button
                onClick={toggleContrast}
                className={`px-2.5 py-1 rounded text-[11px] font-bold border transition-colors ${
                  highContrast
                    ? "bg-[#16845B] text-white border-[#16845B]"
                    : "bg-[#F4F6F8] text-[#17212B] border-[#D5DCE4]"
                }`}
              >
                {highContrast ? "Enabled" : "Disabled"}
              </button>
            </div>

            {/* Text Scaling */}
            <div>
              <div className="font-medium text-xs mb-1.5 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-[#0B3A6E]" />
                Text Sizing
              </div>
              <div className="grid grid-cols-4 gap-1.5 text-center">
                <button
                  onClick={() => changeTextSize("sm")}
                  className={`py-1 rounded border text-[11px] font-semibold ${
                    textSize === "sm"
                      ? "bg-[#082B52] text-white border-[#082B52]"
                      : "bg-[#F4F6F8] text-[#17212B] border-[#D5DCE4]"
                  }`}
                  title="Smaller Text"
                >
                  A-
                </button>
                <button
                  onClick={() => changeTextSize("normal")}
                  className={`py-1 rounded border text-[11px] font-semibold ${
                    textSize === "normal"
                      ? "bg-[#082B52] text-white border-[#082B52]"
                      : "bg-[#F4F6F8] text-[#17212B] border-[#D5DCE4]"
                  }`}
                  title="Default Text"
                >
                  A
                </button>
                <button
                  onClick={() => changeTextSize("lg")}
                  className={`py-1 rounded border text-[11px] font-semibold ${
                    textSize === "lg"
                      ? "bg-[#082B52] text-white border-[#082B52]"
                      : "bg-[#F4F6F8] text-[#17212B] border-[#D5DCE4]"
                  }`}
                  title="Larger Text"
                >
                  A+
                </button>
                <button
                  onClick={() => changeTextSize("xl")}
                  className={`py-1 rounded border text-[11px] font-semibold ${
                    textSize === "xl"
                      ? "bg-[#082B52] text-white border-[#082B52]"
                      : "bg-[#F4F6F8] text-[#17212B] border-[#D5DCE4]"
                  }`}
                  title="Extra Large Text"
                >
                  A++
                </button>
              </div>
            </div>

            {/* Reduce Motion */}
            <div className="flex items-center justify-between">
              <span className="font-medium text-xs flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#0B3A6E]" />
                Reduce Motion
              </span>
              <button
                onClick={toggleMotion}
                className={`px-2.5 py-1 rounded text-[11px] font-bold border transition-colors ${
                  reduceMotion
                    ? "bg-[#16845B] text-white border-[#16845B]"
                    : "bg-[#F4F6F8] text-[#17212B] border-[#D5DCE4]"
                }`}
              >
                {reduceMotion ? "Reduced" : "Standard"}
              </button>
            </div>
          </div>

          <div className="pt-2.5 border-t border-[#D5DCE4] flex items-center justify-between text-[11px]">
            <span className="text-[#8a96a3]">Public Service Portal</span>
            <button
              onClick={resetAll}
              className="text-[#0B3A6E] hover:underline font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Defaults
            </button>
          </div>
        </div>
      )}
    </>
  );
}
