<script setup lang="ts">
import { useVisualizerStore } from '@/stores/visualizer';
import ComponentVisualizer from './graph/ComponentVisualizer.vue';

import { storeToRefs } from 'pinia';

const store = useVisualizerStore();

const { currentFrame } = storeToRefs(store);

</script>

<template>
  <div class="graph-visualizer">
    <div v-if="currentFrame" class="component-container">
      <component-visualizer v-for="(_component, index) in currentFrame.components" :componentIndex="index" />
    </div>

  </div>
</template>

<style scoped></style>
