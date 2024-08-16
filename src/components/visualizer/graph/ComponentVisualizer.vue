<script setup lang="ts">

import GraphNode from "./GraphNode.vue";
import GraphEdge from "./GraphEdge.vue";

import { useVisualizerStore } from "@/stores/visualizer";
import type Component from "@/interfaces/backend/Component";
import { computed } from "vue";
const VIEW_BOX_SIZE = 400;

interface Props {
  componentIndex: number,
  viewBoxSize?: number,
}

const props = withDefaults(defineProps<Props>(), {
  viewBoxSize: VIEW_BOX_SIZE,
})

const store = useVisualizerStore();
const component = computed<Component>(() => store.currentFrame.components[props.componentIndex]);
const nodes = computed(() => component.value.nodes);
const edges = computed(() => component.value.edges);
const nodeColors = computed(() => component.value.style.node_colors);

const nodePositions = computed(() => {
  const positions: { [key: number]: { x: number, y: number } } = {};

  nodes.value.forEach((node, index) => {
    const rads = Math.PI * 2 * (index / nodes.value.length - 0.25);
    positions[node] = {
      x: Math.cos(rads) * props.viewBoxSize * 0.4 + props.viewBoxSize / 2,
      y: Math.sin(rads) * props.viewBoxSize * 0.4 + props.viewBoxSize / 2,
    }
  });

  return positions;
})
</script>

<template>
  <svg class="component-visualizer" :viewBox="`0 0 ${props.viewBoxSize} ${props.viewBoxSize}`">
    <template v-for="(edge) in edges">
      <graph-edge :x1="nodePositions[edge[0]].x" :y1="nodePositions[edge[0]].y" :x2="nodePositions[edge[1]].x"
        :y2="nodePositions[edge[1]].y" />
    </template>
    <template v-for="(node) in nodes">
      <graph-node :x="nodePositions[node].x" :y="nodePositions[node].y" :label="node" :color="nodeColors[node]" />

    </template>
  </svg>
</template>

<style scoped></style>
