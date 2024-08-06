import EdgeColors from "./EdgeColor";

export default interface ComponentStyle {
  nodeColors: { [key: number]: string | null },
  edgeColors: { [key: number]: EdgeColors },
}

