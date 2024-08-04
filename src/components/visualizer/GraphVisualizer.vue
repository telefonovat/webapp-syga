<script setup lang="ts">
import GraphNode from '@/components/visualizer/graph/GraphNode.vue';
import GraphEdge from '@/components/visualizer/graph/GraphEdge.vue';
import Zoomable from '@/utils/Zoomable.vue';
import { useSimpleGraph } from '@/utils/test-data/graphTestData.ts';

import { computed } from "vue";

//Default values
const viewboxSize = () => 400;

const { nodes, edges } = useSimpleGraph();
console.log(nodes);
console.log(edges);
const positions = computed(() => {
  const pos: { [key: number]: { x: number, y: number } } = {};
  nodes.forEach((node, index) => {
    const rads = Math.PI * 2 * (index / nodes.length - 0.25);
    pos[node] = {
      x: Math.cos(rads) * viewboxSize() * 0.4 + viewboxSize() / 2,
      y: Math.sin(rads) * viewboxSize() * 0.4 + viewboxSize() / 2,
    };
  });
  return pos;
});
console.log(positions.value);
</script>

<template>
  <div id="visualizer-panel">
    <zoomable>
      <svg viewBox="0 0 400 400" height="100%" width="100%">
        <graph-edge v-for="(edge, index) in edges" :x1="positions[edge[0]].x" :y1="positions[edge[0]].y"
          :x2="positions[edge[1]].x" :y2="positions[edge[1]].y" />
        <graph-node v-for="(node, index) in positions" :x="node.x" :y="node.y" :label="index" />
      </svg>
    </zoomable>
  </div>
</template>

<style scoped></style>
