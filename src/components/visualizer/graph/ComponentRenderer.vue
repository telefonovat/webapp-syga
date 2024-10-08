//Renders a single component of the graph
<script setup lang="ts">
import GraphNode from "./GraphNode.vue";
import GraphEdge from "./GraphEdge.vue";

import { useRenderData } from "./renderData";
import { defaultRendererSettings } from "./defaults";
import { Node } from "@/shared/Node";
import { Edge } from "@/shared/Edge";



interface Props {
  componentIndex: number,
  viewBoxSize?: number,
}

const props_ = withDefaults(defineProps<Props>(), {
  viewBoxSize: defaultRendererSettings["viewBoxSize"] as number,
});



//Nodes
const { nodes, nodeColors, nodePositions, edges, edgeColors } =
  useRenderData(props_.componentIndex, props_.viewBoxSize);

function getNodeData(node: Node) {
  function nodeIsValid(node: Node): boolean {
    return nodes.value.includes(node) &&
      !!nodePositions.value[node];
  }
  if (!nodeIsValid) {
    throw new Error("Attempt render invalid node : " + node);
  }
  type nodeProps = {
    x: number, y: number,
    label: Node, color?: string, shape?: string,
  }
  let nodeHasColor = node in nodeColors.value;
  const data: nodeProps = {
    x: nodePositions.value[node].x,
    y: nodePositions.value[node].y,
    label: node,
    //TODO: Solve compiler error
    ...(nodeHasColor && { color: nodeColors.value[node] })
  }
  return data;

}

//Edges
function getEdgeData(edge: Edge) {
  function isEdgeValid([u, v]: Edge) {
    return edges.value.includes(edge) &&
      nodes.value.includes(u) &&
      nodes.value.includes(v);
  }
  if (!isEdgeValid(edge)) {
    throw new Error("Attempt to render invalid edge : " + edge);
  }
  type edgeProps = {
    x1: number, y1: number,
    x2: number, y2: number,
    color?: string, shape?: string,
    width?: number,
  }
  const [u, v] = edge
  let edgeHasColour = u in edgeColors.value &&
    v in edgeColors.value[u];
  const data: edgeProps = {
    x1: nodePositions.value[u].x,
    y1: nodePositions.value[u].y,
    x2: nodePositions.value[v].x,
    y2: nodePositions.value[v].y,
    ...(edgeHasColour && { color: edgeColors.value[u][v] })
  }
  return data;
}

</script>

<template>
  <svg class="component-renderer mock" :viewBox="`0 0 ${props_.viewBoxSize} ${props_.viewBoxSize}`">
    <template v-for="(edge) in edges">
      <GraphEdge v-bind="getEdgeData(edge)" />
    </template>
    <template v-for="(node) in nodes">
      <GraphNode v-bind="getNodeData(node)" />
    </template>
  </svg>
</template>

<style scoped></style>
