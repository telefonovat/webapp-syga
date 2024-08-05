import Graph from "@/interfaces/visualizer/Graph.ts";

function useSimpleGraph(): Graph {
  return {
    nodes: Array.from(Array(5).keys()),
    edges: [],
  }
}

export { useSimpleGraph };
