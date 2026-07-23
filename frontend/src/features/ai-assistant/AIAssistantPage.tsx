import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CurrentInvestigationHeader } from "./components/CurrentInvestigationHeader";
import { LeftInvestigationPanel } from "./components/LeftInvestigationPanel";
import { RightIntelligencePanel } from "./components/RightIntelligencePanel";
import { VoiceIntelligenceInput } from "./components/VoiceIntelligenceInput";
import { AIThinkingIndicator } from "./components/AIThinkingIndicator";
import { IntelligenceReportRenderer } from "./components/IntelligenceReportRenderer";
import { ConversationExport } from "./components/ConversationExport";
import { dummyResponses } from "./data/chatResponses";
import type { IntelligenceResponse } from "./types";

export function AIAssistantPage() {
  const { t } = useTranslation();
  const [activeReport, setActiveReport] = useState<IntelligenceResponse | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSendQuery = (query: string) => {
    let responseKey = "robbery_hotspots";
    if (query.toLowerCase().includes("offender") || query.toLowerCase().includes("repeat")) {
      responseKey = "repeat_offenders";
    }

    setActiveReport(null);
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      setActiveReport(dummyResponses[responseKey]);
    }, 5500);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeReport, isThinking]);

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200">
      <CurrentInvestigationHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <LeftInvestigationPanel />
        
        <div className="flex flex-col flex-1 relative">
          <div className="absolute top-4 right-4 z-10">
            <ConversationExport
              title={activeReport?.queryIntent || "intelligence_report"}
              activeReport={activeReport}
            />
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 custom-scrollbar"
          >
            {!activeReport && !isThinking && (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                <div className="text-xl font-semibold tracking-wider">{t("ai.awaitingDirective")}</div>
                <div className="text-sm max-w-md text-center">
                  {t("ai.placeholderDesc")}
                </div>
              </div>
            )}

            {isThinking && <AIThinkingIndicator />}

            {activeReport && <IntelligenceReportRenderer items={activeReport.items} />}
          </div>

          <VoiceIntelligenceInput onSend={handleSendQuery} disabled={isThinking} />
        </div>

        <RightIntelligencePanel />
      </div>
    </div>
  );
}
