//Renders a single component of the graph
<script setup lang="ts">
import GraphNode from "./GraphNode.vue";
import GraphEdge from "./GraphEdge.vue";

import { useRenderData } from "./renderData";
import { defaultRendererSettings } from "./defaults";
import { Node } from "@/shared/Node";
import { onMounted } from "vue";
import { useAnimationStore } from "@/store/visualizer/animationStore";
import { simpleGraph } from "@/store/mock/frames";
import { Edge } from "@/shared/Edge";



interface Props {
  componentIndex: number,
  viewBoxSize?: number,
}

const props_ = withDefaults(defineProps<Props>(), {
  viewBoxSize: defaultRendererSettings["viewBoxSize"] as number,
});

onMounted(() => {
  const store_ = useAnimationStore();

  store_.setFrames(simpleGraph);
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
  const data: nodeProps = {
    x: nodePositions.value[node].x,
    y: nodePositions.value[node].y,
    label: node,
    //TODO: Solve compiler error
    ...(node in nodeColors.value && { color: nodeColors.value[node] })
  }
  return data;

}

//Edges
function getEdgeData(edge: Edge) {
  function isEdgeValid(edge: Edge) {
    return edges.value.includes(edge) &&
      nodes.value.includes(edge[0]) &&
      nodes.value.includes(edge[1]);
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
  console.log(edgeColors);
  console.log(u);
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
