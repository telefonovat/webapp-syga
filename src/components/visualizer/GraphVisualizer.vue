<script setup lang="ts">
import { useVisualizerStore } from '@/stores/visualizer';
import ComponentVisualizer from './graph/ComponentVisualizer.vue';

import { storeToRefs } from 'pinia';
import { watch } from 'vue';

const store = useVisualizerStore();

const { currentFrame } = storeToRefs(store);

watch(currentFrame, (newFrame, oldFrame) => {
  console.log("Frame changed!");
  console.log(currentFrame.value.components[0]);
});
</script>

<template>
  <div class="graph-visualizer">
    <div class="component-container">
      <component-visualizer v-if="currentFrame" :componentIndex="0" />
    </div>

  </div>
</template>

<style scoped></style>
