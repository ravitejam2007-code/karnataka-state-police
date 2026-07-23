import { Network } from "lucide-react";
import { motion } from "framer-motion";
import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect } from "react";

interface Props {
  data: {
    nodes: Array<{ id: string; label: string; type: string }>;
    edges: Array<{ source: string; target: string }>;
  };
}

export function RelationshipGraphWidget({ data }: Props) {
  const initialNodes = data.nodes.map((n) => ({
    id: n.id,
    position: { x: Math.random() * 300, y: Math.random() * 300 }, // Using random layout for dummy
    data: { label: n.label },
    style: {
      background: n.type === 'Person' ? '#1e293b' : '#7f1d1d',
      color: '#f8fafc',
      border: '1px solid #475569',
      borderRadius: '8px',
      padding: '10px'
    }
  }));

  const initialEdges = data.edges.map((e) => ({
    id: `e-${e.source}-${e.target}`,
    source: e.source,
    target: e.target,
    animated: true,
    style: { stroke: '#3b82f6', strokeWidth: 2 }
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // Simple layout logic for the dummy
  useEffect(() => {
    const layoutNodes = initialNodes.map((node, i) => {
      const angle = (i / initialNodes.length) * 2 * Math.PI;
      const radius = 120;
      return {
        ...node,
        position: {
          x: 200 + radius * Math.cos(angle),
          y: 200 + radius * Math.sin(angle)
        }
      };
    });
    setNodes(layoutNodes);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-800 border border-slate-700 rounded-md overflow-hidden mb-4"
    >
      <div className="bg-slate-900/50 border-b border-slate-700 px-4 py-2 flex items-center gap-2">
        <Network className="h-4 w-4 text-purple-400" />
        <h3 className="text-sm font-semibold text-slate-200 tracking-wide uppercase">Relationship Graph</h3>
      </div>
      <div className="h-[400px] w-full bg-slate-950/50">
        <ReactFlow 
          nodes={nodes} 
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          className="dark"
        >
          <Background color="#334155" gap={16} />
          <Controls />
          <MiniMap 
            nodeColor={(node) => {
              return node.style?.background as string || '#eee';
            }}
            maskColor="rgba(15, 23, 42, 0.7)"
          />
        </ReactFlow>
      </div>
    </motion.div>
  );
}
