<script setup lang="ts">
import VisualizerNavigation from '@/components/visualizer/control/VisualizerNavigation.vue';
import CodeEditorNavigation from '@/components/editor/control/CodeEditorNavigation.vue';
import AlgorithmManager from '@/components/user/AlgorithmManager.vue';
</script>

<template>
  <div class="algorithm-control-panel">
    <VisualizerNavigation />
    <CodeEditorNavigation />

    <AlgorithmManager />
  </div>
</template>

<style scoped>
.algorithm-control-panel{
  display: flex;
  flex-direction: row-reverse;
}
</style>
