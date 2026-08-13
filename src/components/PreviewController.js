import { ConnectionLineType, useReactFlow } from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";

export function usePreviewNodeClick() {
  const { setNodes, getNodes, addEdges, getEdges, updateEdge, updateNode } =
    useReactFlow();
  //node - The Current Clicked Node
  return (event, node) => {
    if (!node) return;
    const preview = createPreview(node);
    if (!node.type) {
      //console.log(node)
      if (isPreviewExist() && getExistingPreviewNode().source !== node.id) {
        editPreviewNodePosition(preview);
        editPreviewEdgesConnection(node, preview); // OPTIMIZE SO IT WONT RUN GETEXISTINGPREVIEWNODE twice in the same func
      } else {
        createNode(preview);
        addPreviewEdges(node, preview);
      }
    } else {
      const ancestor = createAncestor(node);
      editPreviewNodePosition(ancestor);
      editPreviewEdgesConnection(node, ancestor);
    }

    function createPreview(node) {
      return {
        id: "preview",
        type: "previewNode",
        position: {
          x: node.position.x + 13.5,
          y: node.position.y + 100,
        },
        data: {
          label: "+",
        },
        selectable: false,
        draggable: false,
      };
    }

    function editPreviewNodePosition(node) {
      // origin - original connection of a node and preview
      // source - new origin/source of the preview
      // target - preview Node

      if (!node.type) {
        updateNode("preview", node);
      } else {
        updateNode("preview", {
          position: {
            x: node.position.x,
            y: node.position.y,
          },
        });
      }
    }

    function createNode(node) {
      setNodes((nodes) => [...nodes.filter((n) => n.id !== "preview"), node]); //change to preview or ancestor node
    }

    function createAncestor(node) {
      return {
        id: uuidv4(),
        type: undefined,
        position: {
          x: node.position.x - 13.5, // revert to 13.5 due to preview is smaller than ancestor
          y: node.position.y,
        },
        data: {
          label: "Ancestor",
        },
        selectable: true,
        draggable: true,
      };
    }

    function getExistingPreviewNode() {
      return getEdges().find((edge) => edge.target === "preview");
    }
    function isPreviewExist() {
      return getEdges().some((e) => e.target.includes("preview"));
    }

    function editPreviewEdgesConnection(source, preview) {
      const previewEdge = getExistingPreviewNode()

      if (!preview.type) {
          if(!previewEdge) return
          updateEdge(previewEdge.id,{
            id: `${previewEdge.source}-${preview.id}`,
            source: previewEdge.source,
            target: preview.id
          })
      } else {
        if (!previewEdge) return;
        updateEdge(previewEdge.id, {
          id: `${source.id}-${preview.id}`,
          source: source.id,
          target: preview.id,
        });
      }
    }

    function addPreviewEdges(source, preview) {
      addEdges({
        id: `${source.id}-${preview.id}`,
        source: source.id,
        target: preview.id,
        type: ConnectionLineType.SmoothStep,
        animated: true,
      });
    }
  };
}
