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
          className="w-80 bg-white border-l border-[#E2E8F0] flex flex-col h-full overflow-hidden text-[#1E293B] shadow-2xl z-20 font-sans"
        >
          {/* Header */}
          <div className="p-4 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider mb-0.5">{data.type} PROFILE</div>
              <div className="font-bold text-[#1E293B] text-sm">{data.label}</div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-[#E2E8F0] rounded text-[#64748B] transition-colors cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            
            {/* Risk Gauge */}
            {details.riskScore && (
              <div className="bg-red-50 p-3 rounded-xl border border-red-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-red-700 font-bold">
                  <ShieldAlert className="h-4 w-4 text-red-600" />
                  Risk Score
                </div>
                <div className="text-xl font-bold text-red-700">{details.riskScore}</div>
              </div>
            )}

            {/* Profile Summary */}
            {details.profileSummary && (
              <div className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Overview</div>
                <div className="text-xs text-[#475569] bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0] leading-relaxed">
                  {details.profileSummary}
                </div>
              </div>
            )}

            {/* General Info */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Identified Metrics</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                  <div className="text-[9px] text-[#64748B] font-bold mb-0.5">CONNECTIONS</div>
                  <div className="font-bold text-[#1E293B]">{details.connectionsCount} Nodes</div>
                </div>
                {details.address && (
                  <div className="bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0] col-span-2">
                    <div className="text-[9px] text-[#64748B] font-bold mb-0.5">ADDRESS</div>
                    <div className="font-medium truncate text-[#1E293B]">{details.address}</div>
                  </div>
                )}
                {details.accountNumber && (
                  <div className="bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0] col-span-2 flex items-center gap-2">
                    <Banknote className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="font-mono font-bold text-[#1E293B]">{details.accountNumber}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Criminal History */}
            {details.criminalHistory && details.criminalHistory.length > 0 && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  <History className="h-3.5 w-3.5 text-red-600" /> Criminal History
                </div>
                <div className="space-y-1">
                  {details.criminalHistory.map((ch, i) => (
                    <div key={i} className="text-xs bg-red-50 text-red-700 p-2 rounded-lg border border-red-200 font-medium">
                      {ch}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Officer Notes */}
            {details.officerNotes && (
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  <BookOpen className="h-3.5 w-3.5 text-[#2563EB]" /> Investigation Notes
                </div>
                <div className="text-xs text-[#1E293B] bg-[#2563EB]/10 p-2.5 rounded-lg border border-[#2563EB]/20 italic">
                  "{details.officerNotes}"
                </div>
              </div>
            )}

            {/* Timeline */}
            {details.timeline && details.timeline.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  <Clock className="h-3.5 w-3.5 text-[#2563EB]" /> Known Timeline
                </div>
                <div className="space-y-2 pl-2 border-l border-[#2563EB] ml-2">
                  {details.timeline.map((ev, i) => (
                    <div key={i} className="relative pl-4">
                      <div className="absolute w-2 h-2 bg-[#2563EB] rounded-full -left-[17px] top-1 border-2 border-white"></div>
                      <div className="text-[10px] text-[#2563EB] font-bold font-mono mb-0.5">{ev.date}</div>
                      <div className="text-xs text-[#1E293B]">{ev.event}</div>
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
