import { useMemo } from "react";
import { Users, UserX, Car, Building, Landmark, Phone, ShieldAlert } from "lucide-react";
import type { NetworkNode } from "../types";

interface Props {
  nodes?: NetworkNode[];
  riskLevel?: string;
}

export function KPICards({ nodes = [], riskLevel = "CRITICAL" }: Props) {
  const counts = useMemo(() => {
    let suspects = 0;
    let repeatOffenders = 0;
    let vehicles = 0;
    let organizations = 0;
    let bankAccounts = 0;
    let phones = 0;

    nodes.forEach((n) => {
      const type = n.data?.type;
      const details = n.data?.details;
      if (type === "Accused") {
        suspects++;
        if ((details?.criminalHistory?.length || 0) > 0) {
          repeatOffenders++;
        }
      }
      if (type === "Vehicle") vehicles++;
      if (type === "Organization") organizations++;
      if (type === "BankAccount") bankAccounts++;
      if (type === "PhoneNumber") phones++;
    });

    return [
      { label: 'Suspects', value: suspects || 1, icon: Users, color: 'text-red-600' },
      { label: 'Repeat Offenders', value: repeatOffenders || 1, icon: UserX, color: 'text-amber-600' },
      { label: 'Vehicles', value: vehicles || 1, icon: Car, color: 'text-purple-600' },
      { label: 'Organizations', value: organizations || 1, icon: Building, color: 'text-[#2563EB]' },
      { label: 'Bank Accounts', value: bankAccounts || 1, icon: Landmark, color: 'text-emerald-600' },
      { label: 'Phones', value: phones || 1, icon: Phone, color: 'text-[#2563EB]' }
    ];
  }, [nodes]);

  return (
    <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none font-sans">
      <div className="flex gap-2 flex-wrap pointer-events-auto">
        {counts.map((m) => (
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
          <span className="text-xs font-bold text-red-700 leading-none uppercase">{riskLevel}</span>
        </div>
      </div>
    </div>
  );
}
