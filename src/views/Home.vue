<script setup lang="ts">
import Test from '../components/test/Test.vue';
import Split from '../utils/Split.vue';
import GraphVisualizer from '../components/visualizer/GraphVisualizer.vue';
</script>

<template>
  <div class="home-page">
    <split :initialSizes="[50, 50]">
      <test />
      <split :initialSizes="[50, 50]" direction="vertical">
        <graph-visualizer />
        <test />
      </split>
    </split>
  </div>
</template>

<style scoped></style>
