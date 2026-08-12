import { useCallback } from "react";
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  ConnectionLineType,
} from "@xyflow/react";

export function useFamilyTree(setNodes, setEdges) {
  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nodes) =>
        applyNodeChanges(changes, nodes)
      );
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((edges) =>
        applyEdgeChanges(changes, edges)
      );
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => {
      setEdges((edges) =>
        addEdge(
          {
            ...params,
            type: ConnectionLineType.SmoothStep,
            animated: false,
          },
          edges
        )
      );
    },
    [setEdges]
  );

  // const onNodeClick = useCallback(
  //   (event, node) => {
  //     // Normal node
  //     if (!node.type) {
  //       const previewNode = {
  //         id: "preview",
  //         type: "previewNode",
  //         position: {
  //           x: node.position.x,
  //           y: node.position.y + 100,
  //         },
  //         data: {
  //           label: "+",
  //         },
  //         selectable: false,
  //         draggable: false,
  //       };

  //       setNodes((nodes) => [
  //         ...nodes.filter((n) => n.id !== "preview"),
  //         previewNode,
  //       ]);

  //       return;
  //     }

  //     // Preview node clicked
  //     if (node.type === "previewNode") {
  //       console.log("Add family member");
  //     }
  //   },
  //   [setNodes]
  // );

  return {
    onNodesChange,
    onEdgesChange,
    onConnect,
    //onNodeClick,
  };
}