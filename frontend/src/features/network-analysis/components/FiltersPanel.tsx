import { Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function FiltersPanel() {
  const filters = [
    { category: 'District', active: 'Central', options: ['All', 'Central', 'South', 'North'] },
    { category: 'Crime Type', active: 'Robbery', options: ['All', 'Robbery', 'Cyber', 'Financial'] },
    { category: 'Risk Level', active: 'High', options: ['All', 'High', 'Medium', 'Low'] },
  ];

  const toggles = ['Show Victims', 'Show Bank Accounts', 'Show Vehicles'];

  return (
    <div className="absolute left-4 bottom-4 z-10 w-64 bg-slate-900/90 backdrop-blur border border-slate-700/50 rounded-lg shadow-xl overflow-hidden pointer-events-auto">
      <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700/50 flex items-center gap-2">
        <Filter className="h-4 w-4 text-slate-400" />
        <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Network Filters</span>
      </div>
      
      <div className="p-4 space-y-4">
        {filters.map(f => (
          <div key={f.category} className="space-y-1.5">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">{f.category}</div>
            <div className="flex flex-wrap gap-1.5">
              {f.options.map(opt => (
                <Badge 
                  key={opt} 
                  variant={opt === f.active ? 'default' : 'outline'}
                  className={`text-[10px] cursor-pointer transition-colors ${opt === f.active ? 'bg-indigo-600 hover:bg-indigo-500 text-white border-transparent' : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'}`}
                >
                  {opt}
                </Badge>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-2 border-t border-slate-700/50 space-y-2">
          {toggles.map(t => (
            <label key={t} className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" defaultChecked className="rounded border-slate-600 bg-slate-800 text-indigo-600 focus:ring-indigo-500/20" />
              <span className="text-xs text-slate-300 group-hover:text-slate-100">{t}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
