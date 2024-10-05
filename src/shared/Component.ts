import Edge from "./Edge";
import Node from "./Node";

export default interface Component {
  nodes: Node[],
  edges: Edge[],
}
