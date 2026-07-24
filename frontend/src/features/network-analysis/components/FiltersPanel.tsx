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
    <div className="absolute left-4 bottom-4 z-10 w-64 bg-white/95 border border-[#E2E8F0] rounded-xl shadow-lg overflow-hidden pointer-events-auto font-sans text-xs text-[#1E293B]">
      <div className="bg-[#F8FAFC] px-4 py-2 border-b border-[#E2E8F0] flex items-center gap-2">
        <Filter className="h-4 w-4 text-[#2563EB]" />
        <span className="text-[10px] font-bold text-[#1E293B] uppercase tracking-wider">Network Filters</span>
      </div>
      
      <div className="p-3.5 space-y-3">
        {filters.map(f => (
          <div key={f.category} className="space-y-1">
            <div className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider">{f.category}</div>
            <div className="flex flex-wrap gap-1">
              {f.options.map(opt => (
                <Badge 
                  key={opt} 
                  className={`text-[10px] cursor-pointer font-medium px-2 py-0.5 rounded-md ${
                    opt === f.active 
                      ? 'bg-[#2563EB] text-white border-transparent' 
                      : 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:bg-white'
                  }`}
                >
                  {opt}
                </Badge>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-2 border-t border-[#E2E8F0] space-y-1.5">
          {toggles.map(t => (
            <label key={t} className="flex items-center gap-2 cursor-pointer text-xs text-[#475569]">
              <input type="checkbox" defaultChecked className="rounded border-[#E2E8F0] text-[#2563EB] accent-[#2563EB]" />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
