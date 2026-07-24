import { memo } from 'react';
import type { NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import { 
  UserX, 
  UserCheck, 
  Eye, 
  Building2, 
  MapPin, 
  Phone, 
  Car, 
  Landmark, 
  Building 
} from 'lucide-react';
import type { EntityType, NetworkNode } from '../types';

const getEntityConfig = (type: EntityType) => {
  switch (type) {
    case 'Accused': return { icon: UserX, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
    case 'Victim': return { icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
    case 'Witness': return { icon: Eye, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
    case 'PoliceStation': return { icon: Building2, color: 'text-[#2563EB]', bg: 'bg-blue-50', border: 'border-blue-200' };
    case 'Location': return { icon: MapPin, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
    case 'PhoneNumber': return { icon: Phone, color: 'text-[#2563EB]', bg: 'bg-blue-50', border: 'border-blue-200' };
    case 'Vehicle': return { icon: Car, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' };
    case 'BankAccount': return { icon: Landmark, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
    case 'Organization': return { icon: Building, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' };
    default: return { icon: UserX, color: 'text-slate-600', bg: 'bg-white', border: 'border-[#E2E8F0]' };
  }
};

export const CustomNode = memo(({ data, selected }: NodeProps<NetworkNode>) => {
  const config = getEntityConfig(data.type);
  const Icon = config.icon;

  return (
    <div className={`relative flex items-center gap-2.5 px-3 py-2 rounded-xl border bg-white shadow-2xs transition-all duration-200 font-sans
      ${selected ? 'ring-2 ring-[#2563EB] border-[#2563EB] scale-105 z-50' : 'border-[#E2E8F0] hover:border-[#2563EB]'}`}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-[#2563EB] !border-white" />
      
      <div className={`flex items-center justify-center p-1.5 rounded-lg ${config.bg} ${config.border} border ${config.color}`}>
        <Icon size={16} strokeWidth={2.5} />
      </div>
      
      <div className="flex flex-col pr-1 leading-tight">
        <span className="text-xs font-bold text-[#1E293B]">{data.label}</span>
        <span className="text-[9px] text-[#64748B] uppercase tracking-wider font-semibold">{data.type}</span>
      </div>

      {data.details.riskScore && data.details.riskScore > 80 && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-pulse border-2 border-white" />
      )}

      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-[#2563EB] !border-white" />
    </div>
  );
});

CustomNode.displayName = "CustomNode";
