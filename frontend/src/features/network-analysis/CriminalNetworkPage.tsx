import { useState, useMemo, useEffect } from "react";
import { NetworkInvestigationHeader } from "./components/NetworkInvestigationHeader";
import { AIInsightsPanel } from "./components/AIInsightsPanel";
import { KPICards } from "./components/KPICards";
import { FiltersPanel } from "./components/FiltersPanel";
import { GraphLegend } from "./components/GraphLegend";
import { NetworkGraph } from "./components/NetworkGraph";
import { EntityDrawer } from "./components/EntityDrawer";
import { ContextualLoader } from "@/components/ui/contextual-loader";
import { Network } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { networkTemplates } from "./data/mockNetworkData";
import type { NetworkNode } from "./types";

export function CriminalNetworkPage() {
  const [activeTemplateId, setActiveTemplateId] = useState(networkTemplates[0].id);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate analyzing relationships
    const t = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  const activeTemplate = useMemo(() => {
    return networkTemplates.find(t => t.id === activeTemplateId) || networkTemplates[0];
  }, [activeTemplateId]);

  const handleSelectTemplate = (id: string) => {
    setActiveTemplateId(id);
    setSelectedNode(null); // Clear selection on switch
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] text-[#1E293B] overflow-hidden font-sans">
      <NetworkInvestigationHeader 
        totalEntities={activeTemplate.data.nodes.length}
        totalRelationships={activeTemplate.data.edges.length}
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        <AIInsightsPanel 
          templates={networkTemplates}
          activeTemplateId={activeTemplateId}
          onSelectTemplate={handleSelectTemplate}
        />
        
        <div className="flex-1 relative flex overflow-hidden bg-white">
          
          {/* Top KPI Layer */}
          <KPICards />
          
          {/* Main Canvas */}
          <div className="flex-1 bg-[#F8FAFC] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-white z-10"
              >
                <ContextualLoader icon={Network} message="Building Criminal Network & Finding Relationships..." />
              </motion.div>
            ) : (
              <motion.div
                key="network"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="h-full w-full"
              >
                <NetworkGraph 
                  data={activeTemplate.data} 
                  onNodeClick={setSelectedNode} 
                />
              </motion.div>
            )}
          </AnimatePresence>
          </div>

          {/* Floating UI Overlays */}
          <FiltersPanel />
          <GraphLegend />

          {/* Right Sliding Drawer */}
          <EntityDrawer 
            node={selectedNode} 
            onClose={() => setSelectedNode(null)} 
          />

        </div>
      </div>
    </div>
  );
}
