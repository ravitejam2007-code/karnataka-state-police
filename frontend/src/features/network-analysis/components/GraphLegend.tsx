import { Info } from "lucide-react";

export function GraphLegend() {
  const nodes = [
    { label: 'Accused', color: 'bg-red-400' },
    { label: 'Victim', color: 'bg-emerald-400' },
    { label: 'Witness', color: 'bg-amber-400' },
    { label: 'Police Station', color: 'bg-blue-400' },
    { label: 'Location', color: 'bg-orange-400' },
    { label: 'Phone Number', color: 'bg-cyan-400' },
    { label: 'Vehicle', color: 'bg-purple-400' },
    { label: 'Bank Account', color: 'bg-green-400' },
    { label: 'Organization', color: 'bg-slate-400' },
  ];

  return (
    <div className="absolute right-4 bottom-4 z-10 w-48 bg-slate-900/90 backdrop-blur border border-slate-700/50 rounded-lg shadow-xl overflow-hidden pointer-events-auto">
      <div className="bg-slate-800/80 px-3 py-2 border-b border-slate-700/50 flex items-center gap-2">
        <Info className="h-4 w-4 text-slate-400" />
        <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Legend</span>
      </div>
      
      <div className="p-3 grid grid-cols-2 gap-y-2 gap-x-1">
        {nodes.map(n => (
          <div key={n.label} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${n.color} shadow-sm`}></span>
            <span className="text-[9px] text-slate-300 uppercase tracking-wide truncate">{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
