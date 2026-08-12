import { useCallback } from "react"
import { useReactFlow } from "@xyflow/react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function NodeContextMenu({ id, top, left, right, bottom, onClick }) {
  const { setNodes, setEdges } = useReactFlow();

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
    onClick?.();
  }, [id, setNodes, setEdges, onClick]);

  return (
    <div
    className="absolute bg-white rounded-sm z-10 p-3"
    style={{
      top:top || undefined,
      bottom:bottom || undefined,
      left: left || undefined,
      right: right || undefined
    }}
    >
      <button
        onClick={deleteNode}
        //add style on button
      >
        Delete
      </button>
    </div>
  );
}