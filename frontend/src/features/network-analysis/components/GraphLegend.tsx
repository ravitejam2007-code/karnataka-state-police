import { Info } from "lucide-react";

export function GraphLegend() {
  const nodes = [
    { label: 'Accused', color: 'bg-red-600' },
    { label: 'Victim', color: 'bg-emerald-600' },
    { label: 'Witness', color: 'bg-amber-500' },
    { label: 'Police Station', color: 'bg-[#2563EB]' },
    { label: 'Location', color: 'bg-orange-500' },
    { label: 'Phone Number', color: 'bg-[#2563EB]' },
    { label: 'Vehicle', color: 'bg-purple-600' },
    { label: 'Bank Account', color: 'bg-emerald-600' },
    { label: 'Organization', color: 'bg-slate-600' },
  ];

  return (
    <div className="absolute right-4 bottom-4 z-10 w-48 bg-white/95 border border-[#E2E8F0] rounded-xl shadow-lg overflow-hidden pointer-events-auto font-sans text-xs text-[#1E293B]">
      <div className="bg-[#F8FAFC] px-3 py-2 border-b border-[#E2E8F0] flex items-center gap-2">
        <Info className="h-4 w-4 text-[#2563EB]" />
        <span className="text-[10px] font-bold text-[#1E293B] uppercase tracking-wider">Node Symbology</span>
      </div>
      
      <div className="p-3 grid grid-cols-2 gap-y-2 gap-x-1">
        {nodes.map(n => (
          <div key={n.label} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${n.color} shadow-xs shrink-0`}></span>
            <span className="text-[9px] font-semibold text-[#475569] uppercase tracking-wide truncate">{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
