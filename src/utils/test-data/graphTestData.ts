import Graph from "../../interfaces/visualizer/Graph";

function useSimpleGraph(): Graph {
  return {
    nodes: Array.from(Array(5).keys()),
    edges: [],
  }
}

export { useSimpleGraph };
