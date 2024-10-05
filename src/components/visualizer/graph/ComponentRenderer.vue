<script setup lang="ts">
import GraphNode from "./GraphNode.vue";
import GraphEdge from "./GraphEdge.vue";

const testNode = {
  x: 200, y: 200,
  label: "test",
}

const testEdge = {
  x1: 200, y1: 200,
  x2: 300, y2: 200,
}
</script>

<template>
  <svg class="component-renderer mock" :viewBox="`0 0 400 400`">
    <GraphNode v-bind="testNode" />
    <GraphEdge v-bind="testEdge" />
  </svg>
</template>

<style scoped></style>
