export function getLayoutedElements(nodes, edges = []) {
  // Dagre removed — return nodes/edges unchanged so React Flow uses provided positions.
  return {
    nodes,
    edges,
  };
}
