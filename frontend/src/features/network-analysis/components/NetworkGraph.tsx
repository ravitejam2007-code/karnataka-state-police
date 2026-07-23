import { useCallback } from 'react';
import { 
  ReactFlow, 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState
} from '@xyflow/react';
import type { NodeMouseHandler } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeTypes } from './CustomNodes';
import type { NetworkData, NetworkNode } from '../types';

interface Props {
  data: NetworkData;
  onNodeClick: (node: NetworkNode) => void;
}

export function NetworkGraph({ data, onNodeClick }: Props) {
  const [nodes, , onNodesChange] = useNodesState(data.nodes);
  const [edges, , onEdgesChange] = useEdgesState(data.edges);

  const handleNodeClick: NodeMouseHandler = useCallback((_, node) => {
    onNodeClick(node as NetworkNode);
  }, [onNodeClick]);

  return (
    <div className="w-full h-full bg-slate-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        fitView
        className="dark"
        minZoom={0.2}
        maxZoom={4}
      >
        <Background color="#334155" gap={16} size={1} />
        <Controls className="bg-slate-900 border-slate-700 fill-slate-300" />
        <MiniMap 
          className="bg-slate-900 border-slate-700"
          maskColor="rgba(15, 23, 42, 0.7)"
          nodeColor={(node) => {
            // Rough mapping for minimap colors based on type
            const type = node.data?.type as string;
            switch(type) {
              case 'Accused': return '#ef4444';
              case 'Victim': return '#10b981';
              case 'PoliceStation': return '#3b82f6';
              default: return '#64748b';
            }
          }}
        />
      </ReactFlow>
    </div>
  );
}
