import EdgeColors from "./EdgeColor";

export default interface ComponentStyle {
  node_colors: { [key: number]: string | null },
  edge_colors: { [key: number]: EdgeColors },
}

