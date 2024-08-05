import ComponentStyle from "./ComponentStyle";
export default interface Component {
  type: "Graph",
  nodes: number[],
  edges: [number, number][],
  style: ComponentStyle,
}
