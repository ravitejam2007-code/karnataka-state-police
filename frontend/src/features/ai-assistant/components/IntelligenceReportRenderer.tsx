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
    className="bg-slate-800 border border-slate-700 rounded-md overflow-hidden mb-4"
  >
    <div className="bg-slate-900/50 border-b border-slate-700 px-4 py-2 flex items-center gap-2">
      <Icon className="h-4 w-4 text-slate-400" />
      <h3 className="text-sm font-semibold text-slate-200 tracking-wide uppercase">{title}</h3>
    </div>
    <div className="p-4 text-slate-300">
      {children}
    </div>
  </motion.div>
);

export function IntelligenceReportRenderer({ items }: { items: IntelligenceReportItem[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto my-6 space-y-4">
      {/* Investigation Title Header */}
      <div className="flex items-center gap-3 mb-8 border-b border-slate-700 pb-4">
        <div className="h-12 w-12 bg-slate-800 rounded flex items-center justify-center border border-slate-600">
          <Database className="h-6 w-6 text-slate-300" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-100 uppercase tracking-wide">Generated Intelligence Report</h2>
          <div className="text-sm text-slate-400 font-mono">ID: REP-{Math.floor(Math.random()*10000)} | CLASSIFICATION: CONFIDENTIAL</div>
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(item.data).map(([k, v]) => (
                    <div key={k} className="bg-slate-900/50 p-3 rounded border border-slate-700">
                      <div className="text-xs text-slate-500 uppercase">{k}</div>
                      <div className="text-2xl font-bold text-slate-200">{v as any}</div>
                    </div>
                  ))}
                </div>
              </GenericWidget>
            );

          case "CrimeTimeline":
            return (
              <GenericWidget key={item.id} title="Event Timeline" icon={GitCommit}>
                <div className="space-y-4 pl-2 border-l-2 border-slate-700 ml-2">
                  {item.data.events.map((ev: any, i: number) => (
                    <div key={i} className="relative pl-6">
                      <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[23px] top-1.5 border-4 border-slate-800"></div>
                      <div className="text-xs text-blue-400 font-mono mb-1">{ev.date}</div>
                      <div className="text-sm">{ev.description}</div>
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
                    <div key={p.id} className="flex items-center p-3 bg-slate-900/50 rounded border border-slate-700 gap-3">
                      <div className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-slate-400" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200">{p.name}</div>
                        <div className="text-xs text-slate-500">{p.status} | Risk: {p.riskScore}</div>
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
                    <div key={fir.id} className="p-3 bg-slate-900/50 rounded border border-slate-700 flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-blue-400">{fir.firNumber}</div>
                        <div className="text-xs text-slate-400">{fir.crimeCategory}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500">{new Date(fir.dateReported).toLocaleDateString()}</div>
                        <div className="text-xs text-emerald-500">{fir.status}</div>
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
                  <div className="text-4xl font-bold text-emerald-400">{item.data.score}%</div>
                  <div>
                    <div className="font-medium text-slate-200">{item.data.label}</div>
                    <div className="text-sm text-slate-400">Based on multi-source cross-verification</div>
                  </div>
                </div>
              </GenericWidget>
            );

          case "AIRecommendation":
            return (
              <GenericWidget key={item.id} title="Recommended Directives" icon={ShieldCheck}>
                <ul className="space-y-2">
                  {item.data.steps.map((step: string, i: number) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </GenericWidget>
            );

          default:
            return (
              <GenericWidget key={item.id} title={item.type} icon={Activity}>
                <div className="italic text-slate-500">Component data rendered.</div>
              </GenericWidget>
            );
        }
      })}
    </div>
  );
}
