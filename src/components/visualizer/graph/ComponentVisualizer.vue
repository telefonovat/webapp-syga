<script setup lang="ts">

import GraphNode from "./GraphNode.vue";
import GraphEdge from "./GraphEdge.vue";
import { useRenderData } from "./render-data";
const DEFAULT_VIEW_BOX_SIZE = 400;

interface Props {
  componentIndex: number,
  viewBoxSize?: number,
}

const props = withDefaults(defineProps<Props>(), {
  viewBoxSize: DEFAULT_VIEW_BOX_SIZE,
});

const { nodes, edges,
  nodeColors, edgeColors,
  nodePositions } = useRenderData(props.componentIndex, props.viewBoxSize);


</script>

<template>
  <svg class="component-visualizer" :viewBox="`0 0 ${props.viewBoxSize} ${props.viewBoxSize}`">
    <template v-for="(edge) in edges">
      <graph-edge :x1="nodePositions[edge[0]].x" :y1="nodePositions[edge[0]].y" :x2="nodePositions[edge[1]].x"
        :y2="nodePositions[edge[1]].y" :color="edgeColors[edge[0]][edge[1]]" />
    </template>
    <template v-for="(node) in nodes">
      <graph-node :x="nodePositions[node].x" :y="nodePositions[node].y" :label="node" :color="nodeColors[node]" />

    </template>
  </svg>
</template>

<style scoped></style>
