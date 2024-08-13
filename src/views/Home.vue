<script setup lang="ts">
import Split from '@/utils/Split.vue';
import VisualizerPanel from "@/components/panels/VisualizerPanel.vue";
import CodeEditor from "@/components/editor/CodeEditor.vue";
</script>

<template>
  <div class="home-page">
    <split :initialSizes="[50, 50]">
      <code-editor />
      <visualizer-panel />
    </split>
  </div>
</template>

<style scoped></style>
