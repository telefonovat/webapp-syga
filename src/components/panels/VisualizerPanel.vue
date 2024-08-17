<script setup lang="ts">
import GraphVisualizer from '@/components/visualizer/GraphVisualizer.vue';
import VisualizerHeader from './VisualizerHeader.vue';
import { useVisualizerStore } from '@/stores/visualizer';

const store = useVisualizerStore();
function play() {
  store.play();
}
</script>

<template>
  <div class="visualizer-panel">
    <visualizer-header />
    <graph-visualizer />
  </div>
</template>

<style scoped></style>
