import {
  defaultNodeSettings,
  defaultEdgeSettings,
} from "@/components/visualizer/graph/defaults";
import {
  GraphComponent,
  GraphComponentStyle,
} from "@telefonovat/syga--contract";

export function bleachGraph(graph: GraphComponent): GraphComponent {
  const bleachedStyle: GraphComponentStyle = {
    vertexLabels: graph.style.vertexLabels,
    edgeLabels: graph.style.edgeLabels,

    //TODO: Shapes must be bleached as well
    vertexShapes: graph.style.vertexShapes,
    edgeShapes: graph.style.edgeShapes,

    vertexColors: Object.fromEntries(
      Object.keys(graph.style.vertexColors).map((k) => [
        k,
        defaultNodeSettings.color as string,
      ]),
    ),
    edgeColors: Object.fromEntries(
      Object.entries(graph.style.edgeColors).map(([from, toObj]) => [
        from,
        Object.fromEntries(
          Object.keys(toObj).map((to) => [
            to,
            defaultEdgeSettings.color as string,
          ]),
        ),
      ]),
    ),
  };
  return {
    type: graph.type,
    vertices: graph.vertices,
    edges: graph.edges,
    style: bleachedStyle,
  };
}
