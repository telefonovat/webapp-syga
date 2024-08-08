<script setup lang="ts">
import GraphVisualizer from '../visualizer/GraphVisualizer.vue';
import ControlHeader from '../visualizer/ControlHeader.vue';
import Split from '@/utils/Split.vue';
import Test from '@/components/test/Test.vue';

</script>

<template>
  <div>
    <control-header />
    <split :initialSizes="[50, 50]" direction="vertical">
      <graph-visualizer />
      <test />
    </split>
  </div>
</template>

<style scoped></style>
