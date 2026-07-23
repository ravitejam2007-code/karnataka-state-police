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
    <div className="w-full max-w-2xl mx-auto my-8 flex items-center justify-center p-6 border border-blue-900/30 bg-blue-950/20 rounded-lg shadow-inner">
      <div className="flex flex-col items-center gap-4">
        
        <div className="relative flex items-center justify-center h-12 w-12">
          <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-20 animate-ping"></span>
          <div className="relative h-10 w-10 bg-blue-900 rounded-full border border-blue-400 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <StepIcon className="h-5 w-5 text-blue-300" />
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
              className="text-sm font-medium tracking-wide text-blue-300 font-mono"
            >
              {thinkingSteps[currentStep].text}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden mt-2">
          <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / thinkingSteps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

      </div>
    </div>
  );
}
