import { Users, UserX, Car, Building, Landmark, Phone, ShieldAlert } from "lucide-react";

export function KPICards() {
  const metrics = [
    { label: 'Suspects', value: 12, icon: Users, color: 'text-red-600' },
    { label: 'Repeat Offenders', value: 4, icon: UserX, color: 'text-amber-600' },
    { label: 'Vehicles', value: 3, icon: Car, color: 'text-purple-600' },
    { label: 'Organizations', value: 2, icon: Building, color: 'text-[#2563EB]' },
    { label: 'Bank Accounts', value: 5, icon: Landmark, color: 'text-emerald-600' },
    { label: 'Phones', value: 8, icon: Phone, color: 'text-[#2563EB]' }
  ];

  return (
    <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none font-sans">
      <div className="flex gap-2 flex-wrap pointer-events-auto">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white/95 border border-[#E2E8F0] rounded-xl px-3 py-1.5 flex items-center gap-2.5 shadow-2xs">
            <m.icon className={`h-4 w-4 ${m.color}`} />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider">{m.label}</span>
              <span className="text-xs font-bold text-[#1E293B]">{m.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-red-50 border border-red-200 rounded-xl px-3.5 py-1.5 flex items-center gap-2.5 shadow-2xs pointer-events-auto">
        <ShieldAlert className="h-5 w-5 text-red-600" />
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-red-700 uppercase tracking-wider">Overall Risk</span>
          <span className="text-xs font-bold text-red-700 leading-none">CRITICAL</span>
        </div>
      </div>
    </div>
  );
}
