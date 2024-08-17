import Node from "@/interfaces/backend/Node";
import ComponentStyle from "./ComponentStyle";
import Edge from "@/interfaces/backend/Edge";
export default interface Component {
  type: "Graph",
  nodes: Node[],
  edges: Edge[],
  style: ComponentStyle,
}
