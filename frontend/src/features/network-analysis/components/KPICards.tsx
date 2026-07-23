import { Users, UserX, Car, Building, Landmark, Phone, ShieldAlert } from "lucide-react";

export function KPICards() {
  const metrics = [
    { label: 'Suspects', value: 12, icon: Users, color: 'text-red-400' },
    { label: 'Repeat Offenders', value: 4, icon: UserX, color: 'text-amber-500' },
    { label: 'Vehicles', value: 3, icon: Car, color: 'text-purple-400' },
    { label: 'Organizations', value: 2, icon: Building, color: 'text-slate-300' },
    { label: 'Bank Accounts', value: 5, icon: Landmark, color: 'text-emerald-400' },
    { label: 'Phones', value: 8, icon: Phone, color: 'text-cyan-400' }
  ];

  return (
    <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
      <div className="flex gap-2 pointer-events-auto">
        {metrics.map((m) => (
          <div key={m.label} className="bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-lg px-3 py-2 flex items-center gap-3 shadow-lg">
            <m.icon className={`h-4 w-4 ${m.color}`} />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">{m.label}</span>
              <span className="text-sm font-bold text-slate-200">{m.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-red-950/80 backdrop-blur border border-red-900/50 rounded-lg px-4 py-2 flex items-center gap-3 shadow-[0_0_15px_rgba(239,68,68,0.2)] pointer-events-auto">
        <ShieldAlert className="h-6 w-6 text-red-500" />
        <div className="flex flex-col">
          <span className="text-[10px] text-red-400/80 uppercase tracking-wider">Overall Network Risk</span>
          <span className="text-lg font-bold text-red-400 leading-none tracking-tight">CRITICAL</span>
        </div>
      </div>
    </div>
  );
}
