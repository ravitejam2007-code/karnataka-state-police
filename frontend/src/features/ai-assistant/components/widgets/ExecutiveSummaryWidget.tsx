import { FileText } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  data: {
    title: string;
    summary: string;
  };
}

export function ExecutiveSummaryWidget({ data }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden mb-4 shadow-2xs font-sans"
    >
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 py-2.5 flex items-center gap-2">
        <FileText className="h-4 w-4 text-[#2563EB]" />
        <h3 className="text-xs font-bold text-[#1E293B] tracking-wider uppercase">Executive Summary</h3>
      </div>
      <div className="p-4">
        <h4 className="text-sm font-bold text-[#1E293B] mb-1.5">{data.title}</h4>
        <p className="text-[#475569] text-xs leading-relaxed">
          {data.summary}
        </p>
      </div>
    </motion.div>
  );
}
