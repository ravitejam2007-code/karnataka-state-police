import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Search, Shield, Database, LayoutTemplate, Link } from "lucide-react";

export function AIThinkingIndicator() {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);

  const thinkingSteps = [
    { text: t("ai.thinking.analyzing"), icon: Activity },
    { text: t("ai.thinking.searching"), icon: Search },
    { text: t("ai.thinking.findingFirs"), icon: Shield },
    { text: t("ai.thinking.analyzingNetwork"), icon: Link },
    { text: t("ai.thinking.generatingModels"), icon: Database },
    { text: t("ai.thinking.compiling"), icon: LayoutTemplate },
  ];

  useEffect(() => {
    if (currentStep < thinkingSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 800 + Math.random() * 600);
      return () => clearTimeout(timer);
    }
  }, [currentStep, thinkingSteps.length]);

  const StepIcon = thinkingSteps[currentStep].icon;

  return (
    <div className="w-full max-w-xl mx-auto my-6 flex items-center justify-center p-5 border border-[#E2E8F0] bg-white rounded-xl shadow-2xs">
      <div className="flex flex-col items-center gap-3">
        
        <div className="relative flex items-center justify-center h-10 w-10">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#2563EB]/20 animate-ping"></span>
          <div className="relative h-9 w-9 bg-[#2563EB]/10 rounded-full border border-[#2563EB]/30 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <StepIcon className="h-4 w-4 text-[#2563EB]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="h-6 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-xs font-semibold tracking-wide text-[#2563EB] font-sans"
            >
              {thinkingSteps[currentStep].text}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="w-40 h-1 bg-[#E2E8F0] rounded-full overflow-hidden mt-1">
          <motion.div 
            className="h-full bg-[#2563EB]"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / thinkingSteps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

      </div>
    </div>
  );
}
