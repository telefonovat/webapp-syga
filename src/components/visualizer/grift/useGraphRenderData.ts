import {
  GraphComponent,
  GraphComponentStyle,
  GraphVertex,
  GraphType,
} from "@telefonovat/syga--contract";
import GraphEdge from "../graph/GraphEdge.vue";
import GraphNode from "../graph/GraphNode.vue";
import { computed, reactive } from "vue";

type EdgePropsPartial = Omit<
  InstanceType<typeof GraphEdge>["$props"],
  "index"
>;
type VertexProps = InstanceType<typeof GraphNode>["$props"];

type GraphVertexId = GraphVertex["id"];
type GraphEdgeId = { start: GraphVertexId; end: GraphVertexId };
type VertexPositions = {
  [key: GraphVertexId]: { x: number; y: number };
};
type VertexStyle = Pick<
  GraphComponentStyle,
  "vertexLabels" | "vertexColors" | "vertexShapes"
>;
type EdgeStyle = Pick<
  GraphComponentStyle,
  "edgeLabels" | "edgeColors" | "edgeShapes"
>;

interface GraphRenderData {
  edgesPropsPartial: { [key: string]: EdgePropsPartial };
  verticesProps: { [key: string]: VertexProps };
}

function getVertexPositions(
  vertices: GraphVertex[],
  viewBoxSize: number,
) {
  const positions: VertexPositions = {};

  vertices.forEach((vertex, index) => {
    const rads = Math.PI * 2 * (index / vertices.length - 0.25);
    positions[vertex.id] = {
      x: Math.cos(rads) * viewBoxSize * 0.4 + viewBoxSize / 2,
      y: Math.sin(rads) * viewBoxSize * 0.4 + viewBoxSize / 2,
    };
  });
  return positions;
}

function getVertexProps(
  id: GraphVertexId,
  positions: VertexPositions,
  { vertexLabels, vertexColors, vertexShapes }: VertexStyle,
): VertexProps {
  return {
    x: positions[id].x,
    y: positions[id].y,
    label: vertexLabels[id] || id,
    ...(vertexColors[id] && { color: vertexColors[id] }),
    ...(vertexLabels[id] && { label: vertexLabels[id] }),
  };
}

function getEdgePropsPartial(
  { start, end }: GraphEdgeId,
  positions: VertexPositions,
  isDirectedGraph: boolean,
  { edgeColors, edgeLabels, edgeShapes }: EdgeStyle,
): EdgePropsPartial {
  const edgeHasColor =
    start in edgeColors && end in edgeColors[start];
  const edgeHasLabel =
    start in edgeLabels && end in edgeLabels[start];
  const edgeHasShape =
    start in edgeShapes && end in edgeShapes[start];
  return {
    x1: positions[start].x,
    y1: positions[start].y,
    x2: positions[end].x,
    y2: positions[end].y,

    isDirected: isDirectedGraph,
    ...(edgeHasColor && { color: edgeColors[start][end] }),
    ...(edgeHasLabel && { label: edgeLabels[start][end] }),
    ...(edgeHasShape && { shape: edgeShapes[start][end] }),
  };
}

export function useGraphRenderData(
  graph: GraphComponent,
  viewBoxSize: number,
): GraphRenderData {
  console.log("Render run");

  const vertexPositions = computed(() => {
    const vertices = graph.vertices;
    return getVertexPositions(vertices, viewBoxSize);
  });
  const verticesProps = computed(() => {
    const vertices = graph.vertices;
    const vertexLabels = graph.style.vertexLabels;
    const vertexColors = graph.style.vertexColors;
    const vertexShapes = graph.style.vertexShapes;
    const props: Record<string, VertexProps> = {};
    vertices.forEach(
      ({ id }) =>
        (props[id] = getVertexProps(id, vertexPositions.value, {
          vertexLabels,
          vertexColors,
          vertexShapes,
        })),
    );
    return props;
  });

  const edgesPropsPartial = computed(() => {
    const propsPartial: Record<string, EdgePropsPartial> = {};

    const edges = graph.edges;
    const isGraphDirected = graph.type === GraphType.DIRECTED;
    const edgeLabels = graph.style.edgeLabels;
    const edgeColors = graph.style.edgeColors;
    const edgeShapes = graph.style.edgeShapes;
    edges.forEach(
      ({ start, end }) =>
        (propsPartial[`${start.id}->${end.id}`] = getEdgePropsPartial(
          { start: start.id, end: end.id },
          vertexPositions.value,
          isGraphDirected,
          { edgeColors, edgeLabels, edgeShapes },
        )),
    );
    return propsPartial;
  });
  return reactive({ verticesProps, edgesPropsPartial });
}
