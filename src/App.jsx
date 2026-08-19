import { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import NodeContextMenu from "./components/ContextMenu/ContextMenu";
import PreviewNode from "./components/CustomNodes/PreviewNode";
import { nodeTypes } from "./constant/nodeTypes";
import initialNodes from "./data/initialElements";
import { usePreviewNodeClick } from "./components/PreviewController";
import { useFamilyTree } from "./hooks/useFamilyTree";

const layoutedNodes = initialNodes;
const layoutedEdges = [];
//////////////////////////////

export default function App() {

  const [nodes, setNodes] = useNodesState(layoutedNodes);
  const [edges, setEdges] = useEdgesState(layoutedEdges);
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);

  const { onNodesChange, onEdgesChange, onConnect } = useFamilyTree(setNodes, setEdges);
  const onPreviewNodeClick = usePreviewNodeClick()
  const onNodeClick = useCallback(
    (event, node) => onPreviewNodeClick(event, node),
    [setNodes,setEdges],
  );

  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();

      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu],
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

  return (
    <div ref={ref} style={{ width: "100vw", height: "100vh" }}>
  <ReactFlow
    nodeTypes={nodeTypes}
    nodes={nodes}
    edges={edges}
    onNodeClick={onNodeClick}
    onNodesChange={onNodesChange}
    onNodeContextMenu={onNodeContextMenu}
    onEdgesChange={onEdgesChange}
    onConnect={onConnect}
    onPaneClick={onPaneClick}
    connectionLineType={ConnectionLineType.SmoothStep}
    fitView
    colorMode="system"
  >
    <Background />
    {menu && (
      <NodeContextMenu onClick={onPaneClick} {...menu}></NodeContextMenu>
    )}
  </ReactFlow>
</div>
  );
}
