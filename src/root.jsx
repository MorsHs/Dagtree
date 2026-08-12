import { ReactFlowProvider } from "@xyflow/react";
import App from "./App.jsx";

export default function Root() {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
}