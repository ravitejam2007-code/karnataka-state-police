import { useMemo } from "react";
import { Network } from "lucide-react";
import { motion } from "framer-motion";
import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface Props {
  data: {
    nodes: Array<{ id: string; label: string; type: string }>;
    edges: Array<{ source: string; target: string }>;
  };
}

export function RelationshipGraphWidget({ data }: Props) {
  const initialNodes = useMemo(() => {
    return data.nodes.map((n, i) => {
      const angle = (i / data.nodes.length) * 2 * Math.PI;
      const radius = 120;
      return {
        id: n.id,
        position: {
          x: 200 + radius * Math.cos(angle),
          y: 200 + radius * Math.sin(angle)
        },
        data: { label: n.label },
        style: {
          background: n.type === 'Person' ? '#2563EB' : '#DC2626',
          color: '#ffffff',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          padding: '8px',
          fontSize: '12px',
          fontWeight: 'bold'
        }
      };
    });
  }, [data.nodes]);

  const initialEdges = useMemo(() => {
    return data.edges.map((e) => ({
      id: `e-${e.source}-${e.target}`,
      source: e.source,
      target: e.target,
      animated: true,
      style: { stroke: '#2563EB', strokeWidth: 2 }
    }));
  }, [data.edges]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden mb-4 shadow-2xs font-sans"
    >
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 py-2.5 flex items-center gap-2">
        <Network className="h-4 w-4 text-[#2563EB]" />
        <h3 className="text-xs font-bold text-[#1E293B] tracking-wider uppercase">Relationship Graph</h3>
      </div>
      <div className="h-[350px] w-full bg-[#F8FAFC]">
        <ReactFlow 
          nodes={nodes} 
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Background color="#E2E8F0" gap={16} />
          <Controls className="bg-white border-[#E2E8F0]" />
          <MiniMap 
            className="bg-white border-[#E2E8F0]"
            maskColor="rgba(248, 250, 252, 0.7)"
          />
        </ReactFlow>
      </div>
    </motion.div>
  );
}
