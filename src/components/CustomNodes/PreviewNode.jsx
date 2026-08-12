import { memo } from "react"
import { Handle, Position } from "@xyflow/react"
export default function PreviewNode() {
    const isConnectable = false;
    return(
        <>
        <Handle
            type="target"
            position={Position.Top}
            // isConnectable = {isConnectable}
        />
        <div className="text-white p-3 border-1 md:border-dashed bg-slate-900 hover:bg-slate-800">
            Add Ancestor
        </div>
        </>
    )
}