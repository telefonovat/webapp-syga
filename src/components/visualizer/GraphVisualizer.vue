<script setup lang="ts">
import GraphNode from '@/components/visualizer/graph/GraphNode.vue';
import GraphEdge from '@/components/visualizer/graph/GraphEdge.vue';
import Zoomable from '@/utils/Zoomable.vue';

import Frame from '@/interfaces/backend/Frame';

import { computed } from "vue";
import useVisualizerStore from "@/stores/visualizerStore.ts";
import { onMounted } from 'vue';
//Default values
const VIEWBOX_SIZE = () => 400;

//State access
const store = useVisualizerStore();
const frame: Frame = store.currentFrame();
const component = frame.components[0];

const { nodes, edges } = component;
const nodeColors = component.style.nodeColors;
const edgeColors = component.style.edgeColors;

const positions = computed(() => {
  const pos: { [key: number]: { x: number, y: number } } = {};
  nodes.forEach((node, index) => {
    const rads = Math.PI * 2 * (index / nodes.length - 0.25);
    pos[node] = {
      x: Math.cos(rads) * VIEWBOX_SIZE() * 0.4 + VIEWBOX_SIZE() / 2,
      y: Math.sin(rads) * VIEWBOX_SIZE() * 0.4 + VIEWBOX_SIZE() / 2,
    };
  });
  return pos;
});

onMounted(() => {
  store.startPlaying();
});
</script>

<template>
  <div id="visualizer-panel">
    <zoomable>
      <svg :viewBox="`0 0 ${VIEWBOX_SIZE()} ${VIEWBOX_SIZE()}`" height="100%" width="100%">
        <graph-edge v-for="(edge) in edges" :x1="positions[edge[0]].x" :y1="positions[edge[0]].y"
          :x2="positions[edge[1]].x" :y2="positions[edge[1]].y" :color="edgeColors[edge[0]][edge[1]] ?? 'red'" />
        <graph-node v-for="(node, index) in positions" :x="node.x" :y="node.y" :label="index"
          :color="nodeColors[index] ?? 'red'" />
      </svg>
    </zoomable>
  </div>
</template>

<style scoped></style>
