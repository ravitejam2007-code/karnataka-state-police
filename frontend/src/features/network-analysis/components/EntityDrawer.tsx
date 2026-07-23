import { X, ShieldAlert, History, Banknote, BookOpen, Clock } from "lucide-react";
import type { NetworkNode } from "../types";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  node: NetworkNode | null;
  onClose: () => void;
}

export function EntityDrawer({ node, onClose }: Props) {
  if (!node) return null;

  const { data } = node;
  const { details } = data;

  return (
    <AnimatePresence>
      {node && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col h-full overflow-hidden text-slate-300 shadow-2xl z-20"
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-800/30 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{data.type} PROFILE</div>
              <div className="font-semibold text-slate-100">{data.label}</div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-slate-200 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            
            {/* Risk Gauge (if applicable) */}
            {details.riskScore && (
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                  <ShieldAlert className="h-4 w-4 text-red-500" />
                  Risk Score
                </div>
                <div className="text-xl font-bold text-red-400">{details.riskScore}</div>
              </div>
            )}

            {/* Profile Summary */}
            {details.profileSummary && (
              <div className="space-y-2">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Overview</div>
                <div className="text-xs text-slate-400 bg-slate-800/30 p-2.5 rounded">
                  {details.profileSummary}
                </div>
              </div>
            )}

            {/* General Info */}
            <div className="space-y-2">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Identified Metrics</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50">
                  <div className="text-[10px] text-slate-500 mb-1">CONNECTIONS</div>
                  <div className="font-semibold">{details.connectionsCount} Nodes</div>
                </div>
                {details.address && (
                  <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50 col-span-2">
                    <div className="text-[10px] text-slate-500 mb-1">ADDRESS</div>
                    <div className="font-medium truncate">{details.address}</div>
                  </div>
                )}
                {details.accountNumber && (
                  <div className="bg-slate-800/50 p-2 rounded border border-slate-700/50 col-span-2 flex items-center gap-2">
                    <Banknote className="h-3 w-3 text-emerald-500" />
                    <span className="font-mono text-emerald-400">{details.accountNumber}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Criminal History */}
            {details.criminalHistory && details.criminalHistory.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  <History className="h-3.5 w-3.5" /> Criminal History
                </div>
                <div className="space-y-1">
                  {details.criminalHistory.map((ch, i) => (
                    <div key={i} className="text-xs bg-red-950/20 text-red-300 p-2 rounded border border-red-900/30">
                      {ch}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Officer Notes */}
            {details.officerNotes && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  <BookOpen className="h-3.5 w-3.5" /> Investigation Notes
                </div>
                <div className="text-xs text-indigo-300 bg-indigo-950/20 p-2.5 rounded border border-indigo-900/30 italic">
                  "{details.officerNotes}"
                </div>
              </div>
            )}

            {/* Timeline */}
            {details.timeline && details.timeline.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  <Clock className="h-3.5 w-3.5" /> Known Timeline
                </div>
                <div className="space-y-3 pl-2 border-l border-slate-700 ml-2">
                  {details.timeline.map((ev, i) => (
                    <div key={i} className="relative pl-4">
                      <div className="absolute w-2 h-2 bg-indigo-500 rounded-full -left-[17px] top-1 border-2 border-slate-900"></div>
                      <div className="text-[10px] text-indigo-400 font-mono mb-0.5">{ev.date}</div>
                      <div className="text-xs text-slate-300">{ev.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
