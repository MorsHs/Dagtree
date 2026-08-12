import { v4 as uuidv4 } from "uuid";

const uuidAncestor1 = uuidv4();
const uuidAncestor2 = uuidv4();

const initialNodes = [
  {
    id: uuidAncestor1,
    position: { x: -100, y: 0 },
    data: { label: "Ancestor 1" },
  },
  {
    id: uuidAncestor2,
    position: { x: 100, y: 0 },
    data: { label: "Ancestor 2" },
  },
];

export default initialNodes;