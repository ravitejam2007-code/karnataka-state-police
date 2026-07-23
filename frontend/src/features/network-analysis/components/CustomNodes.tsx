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
    case 'Accused': return { icon: UserX, color: 'text-red-400', bg: 'bg-red-950/40', border: 'border-red-500/50', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]' };
    case 'Victim': return { icon: UserCheck, color: 'text-emerald-400', bg: 'bg-emerald-950/40', border: 'border-emerald-500/50', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]' };
    case 'Witness': return { icon: Eye, color: 'text-amber-400', bg: 'bg-amber-950/40', border: 'border-amber-500/50', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]' };
    case 'PoliceStation': return { icon: Building2, color: 'text-blue-400', bg: 'bg-blue-950/40', border: 'border-blue-500/50', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]' };
    case 'Location': return { icon: MapPin, color: 'text-orange-400', bg: 'bg-orange-950/40', border: 'border-orange-500/50', glow: 'shadow-[0_0_15px_rgba(249,115,22,0.3)]' };
    case 'PhoneNumber': return { icon: Phone, color: 'text-cyan-400', bg: 'bg-cyan-950/40', border: 'border-cyan-500/50', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]' };
    case 'Vehicle': return { icon: Car, color: 'text-purple-400', bg: 'bg-purple-950/40', border: 'border-purple-500/50', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.3)]' };
    case 'BankAccount': return { icon: Landmark, color: 'text-green-400', bg: 'bg-green-950/40', border: 'border-green-500/50', glow: 'shadow-[0_0_15px_rgba(34,197,94,0.3)]' };
    case 'Organization': return { icon: Building, color: 'text-slate-300', bg: 'bg-slate-800/80', border: 'border-slate-500/50', glow: 'shadow-[0_0_15px_rgba(100,116,139,0.3)]' };
    default: return { icon: UserX, color: 'text-slate-400', bg: 'bg-slate-800', border: 'border-slate-600', glow: '' };
  }
};

const CustomNode = ({ data, selected }: NodeProps<NetworkNode>) => {
  const config = getEntityConfig(data.type);
  const Icon = config.icon;

  return (
    <div className={`relative flex items-center gap-3 px-3 py-2 rounded-lg border backdrop-blur-sm transition-all duration-200
      ${config.bg} ${config.border} ${selected ? config.glow + ' scale-110 border-opacity-100 z-50' : 'hover:scale-105'}`}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-slate-500 !border-slate-800" />
      
      <div className={`flex items-center justify-center p-2 rounded-md bg-slate-900/50 border border-slate-700/50 ${config.color}`}>
        <Icon size={18} strokeWidth={2.5} />
      </div>
      
      <div className="flex flex-col pr-2">
        <span className="text-xs font-semibold text-slate-200 tracking-wide">{data.label}</span>
        <span className="text-[10px] text-slate-400 uppercase tracking-wider">{data.type}</span>
      </div>

      {data.details.riskScore && data.details.riskScore > 80 && (
        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-slate-900" />
      )}

      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-slate-500 !border-slate-800" />
    </div>
  );
};

export const nodeTypes = {
  customNode: memo(CustomNode),
};
