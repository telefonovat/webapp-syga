import {
  GraphComponent,
  GraphComponentStyle,
  GraphVertex,
  GraphEdge as GraphEdgeType,
  GraphType,
} from "@telefonovat/syga--contract";
import GraphEdge from "../graph/GraphEdge.vue";
import GraphNode from "../graph/GraphNode.vue";

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
  edgesProps: EdgePropsPartial[];
  verticesProps: VertexProps[];
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
  const vertices = graph.vertices;
  const vertexLabels = graph.style.vertexLabels;
  const vertexColors = graph.style.vertexColors;
  const vertexShapes = graph.style.vertexShapes;

  const vertexPositions = getVertexPositions(vertices, viewBoxSize);
  const verticesProps = vertices.map(({ id }) =>
    getVertexProps(id, vertexPositions, {
      vertexLabels,
      vertexColors,
      vertexShapes,
    }),
  );

  const edges = graph.edges;
  const isGraphDirected = graph.type === GraphType.DIRECTED;
  const edgeLabels = graph.style.edgeLabels;
  const edgeColors = graph.style.edgeColors;
  const edgeShapes = graph.style.edgeShapes;
  const edgesProps = edges.map(({ start, end }) =>
    getEdgePropsPartial(
      { start: start.id, end: end.id },
      vertexPositions,
      isGraphDirected,
      { edgeColors, edgeLabels, edgeShapes },
    ),
  );

  return { verticesProps, edgesProps };
}
