import type { ReactNode } from "react";
import type { IntelligenceReportItem } from "../types";
import { ExecutiveSummaryWidget } from "./widgets/ExecutiveSummaryWidget";
import { RelationshipGraphWidget } from "./widgets/RelationshipGraphWidget";
import { MapWidget } from "./widgets/MapWidget";
import { ShieldCheck, TrendingUp, Users, Database, Activity, GitCommit, FileText, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

// Dummy fallbacks for unimplemented complex widgets
const GenericWidget = ({ title, icon: Icon, children }: { title: string, icon: any, children: ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden mb-4 shadow-2xs"
  >
    <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 py-2.5 flex items-center gap-2">
      <Icon className="h-4 w-4 text-[#2563EB]" />
      <h3 className="text-xs font-bold text-[#1E293B] tracking-wider uppercase">{title}</h3>
    </div>
    <div className="p-4 text-[#1E293B]">
      {children}
    </div>
  </motion.div>
);

export function IntelligenceReportRenderer({ items }: { items: IntelligenceReportItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto my-4 space-y-4 font-sans">
      {/* Investigation Title Header */}
      <div className="flex items-center gap-3 mb-6 border-b border-[#E2E8F0] pb-4">
        <div className="h-10 w-10 bg-[#2563EB]/10 rounded-lg flex items-center justify-center border border-[#2563EB]/30">
          <Database className="h-5 w-5 text-[#2563EB]" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[#1E293B] uppercase tracking-wide">Generated Intelligence Report</h2>
          <div className="text-xs text-[#64748B] font-mono">CLASSIFICATION: OFFICIAL USE ONLY</div>
        </div>
      </div>

      {items.map((item) => {
        switch (item.type) {
          case "ExecutiveSummary":
            return <ExecutiveSummaryWidget key={item.id} data={item.data} />;
          
          case "RelationshipGraph":
            return <RelationshipGraphWidget key={item.id} data={item.data} />;
            
          case "InteractiveMap":
            return <MapWidget key={item.id} data={item.data} />;
            
          case "CrimeStatistics":
            return (
              <GenericWidget key={item.id} title="Crime Statistics" icon={TrendingUp}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(item.data).map(([k, v]) => (
                    <div key={k} className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">
                      <div className="text-[10px] text-[#64748B] uppercase font-bold">{k}</div>
                      <div className="text-xl font-bold text-[#1E293B]">{v as any}</div>
                    </div>
                  ))}
                </div>
              </GenericWidget>
            );

          case "CrimeTimeline":
            return (
              <GenericWidget key={item.id} title="Event Timeline" icon={GitCommit}>
                <div className="space-y-4 pl-2 border-l-2 border-[#2563EB] ml-2">
                  {item.data.events.map((ev: any, i: number) => (
                    <div key={i} className="relative pl-6">
                      <div className="absolute w-3 h-3 bg-[#2563EB] rounded-full -left-[23px] top-1.5 border-2 border-white"></div>
                      <div className="text-xs text-[#2563EB] font-bold font-mono mb-0.5">{ev.date}</div>
                      <div className="text-xs text-[#1E293B]">{ev.description}</div>
                    </div>
                  ))}
                </div>
              </GenericWidget>
            );

          case "RelatedPersons":
            return (
              <GenericWidget key={item.id} title="Related Persons" icon={Users}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {item.data.map((p: any) => (
                    <div key={p.id} className="flex items-center p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] gap-3">
                      <div className="h-9 w-9 bg-white rounded-full flex items-center justify-center border border-[#E2E8F0]">
                        <Users className="h-4 w-4 text-[#2563EB]" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-[#1E293B]">{p.name}</div>
                        <div className="text-[11px] text-[#64748B]">{p.status} | Risk Score: <strong className="text-red-600">{p.riskScore}</strong></div>
                      </div>
                    </div>
                  ))}
                </div>
              </GenericWidget>
            );

          case "RelatedFIRs":
            return (
              <GenericWidget key={item.id} title="Related Records" icon={FileText}>
                <div className="space-y-2">
                  {item.data.map((fir: any) => (
                    <div key={fir.id} className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] flex justify-between items-center text-xs">
                      <div>
                        <div className="font-bold text-[#2563EB]">{fir.firNumber}</div>
                        <div className="text-[#64748B]">{fir.crimeCategory}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[#64748B]">{new Date(fir.dateReported).toLocaleDateString()}</div>
                        <div className="text-emerald-700 font-semibold">{fir.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </GenericWidget>
            );

          case "ConfidenceScore":
            return (
              <GenericWidget key={item.id} title="Confidence Assessment" icon={Activity}>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-extrabold text-[#2563EB]">{item.data.score}%</div>
                  <div>
                    <div className="font-bold text-xs text-[#1E293B]">{item.data.label}</div>
                    <div className="text-xs text-[#64748B]">Multi-source cross-verification completed</div>
                  </div>
                </div>
              </GenericWidget>
            );

          case "AIRecommendation":
            return (
              <GenericWidget key={item.id} title="Recommended Directives" icon={ShieldCheck}>
                <ul className="space-y-2 text-xs">
                  {item.data.steps.map((step: string, i: number) => (
                    <li key={i} className="flex gap-2 text-[#1E293B]">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </GenericWidget>
            );

          default:
            return (
              <GenericWidget key={item.id} title={item.type} icon={Activity}>
                <div className="italic text-xs text-[#64748B]">Component data rendered.</div>
              </GenericWidget>
            );
        }
      })}
    </div>
  );
}
