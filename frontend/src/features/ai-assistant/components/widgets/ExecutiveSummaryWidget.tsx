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
      className="bg-slate-800 border border-slate-700 rounded-md overflow-hidden mb-4"
    >
      <div className="bg-slate-900/50 border-b border-slate-700 px-4 py-2 flex items-center gap-2">
        <FileText className="h-4 w-4 text-blue-400" />
        <h3 className="text-sm font-semibold text-slate-200 tracking-wide uppercase">Executive Summary</h3>
      </div>
      <div className="p-4">
        <h4 className="text-lg font-medium text-slate-100 mb-2">{data.title}</h4>
        <p className="text-slate-300 text-sm leading-relaxed">
          {data.summary}
        </p>
      </div>
    </motion.div>
  );
}
