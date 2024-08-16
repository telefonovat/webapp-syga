<script setup lang="ts">
import { useVisualizerStore } from '@/stores/visualizer';
import ComponentVisualizer from './graph/ComponentVisualizer.vue';

import { storeToRefs } from 'pinia';

const store = useVisualizerStore();

const { currentFrame } = storeToRefs(store);

</script>

<template>
  <div class="graph-visualizer">
    <div class="component-container">
      <component-visualizer v-if="currentFrame" :componentIndex="0" />
    </div>

  </div>
</template>

<style scoped></style>
