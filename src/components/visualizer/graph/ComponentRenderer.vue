<script setup lang="ts">
import GraphNode from "./GraphNode.vue";

const testNode = {
  x: 200, y: 200,
  label: "test",
}
</script>

<template>
  <svg class="component-renderer" :viewBox="`0 0 400 400`">
    <GraphNode v-bind="testNode" />
  </svg>
</template>

<style scoped></style>
