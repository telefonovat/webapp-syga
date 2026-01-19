import {
  defaultNodeSettings,
  defaultEdgeSettings,
} from "@/components/visualizer/graph/defaults";
import {
  GraphComponent,
  GraphComponentStyle,
} from "@telefonovat/syga--contract";

export type Style = "vertexLabel" | "vertexColors";

export function bleachGraph(
  graph: GraphComponent,
  stylesToBleach: Style[],
): GraphComponent {
  const bleachedStyle: GraphComponentStyle = {
    vertexLabels: stylesToBleach.includes("vertexLabel")
      ? Object.fromEntries(
          Object.keys(graph.style.vertexLabels).map((k) => [k, k]),
        )
      : graph.style.vertexLabels,
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
