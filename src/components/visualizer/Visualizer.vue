<script setup lang="ts">
import { onMounted } from "vue";
import ComponentRenderer from "./graph/ComponentRenderer.vue"
import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
import { simpleGraph } from "@test/mock/testFrames";
onMounted(() => {

  const store_ = useVisualizerStore();
  store_.setFrames(simpleGraph);
});
</script>
<template>
  <ComponentRenderer :componentIndex="0" />
</template>

<style scoped></style>
