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
import { CustomNode } from './CustomNodes';
import type { NetworkData, NetworkNode } from '../types';

const nodeTypes = {
  customNode: CustomNode,
};

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
    <div className="w-full h-full bg-[#F8FAFC]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        fitView
        minZoom={0.2}
        maxZoom={4}
      >
        <Background color="#E2E8F0" gap={16} size={1} />
        <Controls className="bg-white border-[#E2E8F0] fill-[#1E293B] shadow-2xs" />
        <MiniMap 
          className="bg-white border-[#E2E8F0] shadow-md rounded-lg"
          maskColor="rgba(248, 250, 252, 0.7)"
          nodeColor={(node) => {
            const type = node.data?.type as string;
            switch(type) {
              case 'Accused': return '#dc2626';
              case 'Victim': return '#16a34a';
              case 'PoliceStation': return '#2563eb';
              default: return '#64748b';
            }
          }}
        />
      </ReactFlow>
    </div>
  );
}
