<script setup lang="ts">
import GraphVisualizer from '@/components/visualizer/GraphVisualizer.vue';
import { useVisualizerStore } from '@/stores/visualizer';

const store = useVisualizerStore();
function play() {
  store.play();
}
</script>

<template>
  <div class="visualizer-panel">
    <div class="visualizer-header">
      <icon-button icon="feather-play" @click="play()">Play</icon-button>
    </div>
    <graph-visualizer />
  </div>
</template>

<style scoped></style>
