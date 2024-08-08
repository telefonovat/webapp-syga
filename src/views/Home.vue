<script setup lang="ts">
import Test from '@/components/test/Test.vue';
import Split from '@/utils/Split.vue';
import VisualizerPanel from "@/components/panels/VisualizerPanel.vue";
</script>

<template>
  <div class="home-page">
    <split :initialSizes="[50, 50]">
      <test />
      <visualizer-panel />
    </split>
  </div>
</template>

<style scoped>
.home-page {}
</style>
