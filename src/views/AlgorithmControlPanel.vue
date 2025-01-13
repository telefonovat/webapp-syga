<script setup lang="ts">
import VisualizerNavigation from '@/components/visualizer/VisualizerNavigation.vue';
import CodeEditorNavigation from '@/components/editor/CodeEditorNavigation.vue';
import AlgorithmManager from '@/components/user/algorithm/AlgorithmManager.vue';
</script>

<template>
  <v-toolbar dark>
    <AlgorithmManager />
    <v-spacer />

    <CodeEditorNavigation />
    <VisualizerNavigation />
  </v-toolbar>
</template>

<style scoped>
.algorithm-control-panel{
  display: flex;
  flex-direction: row-reverse;
}
.algorithm-control-panel__last-item{
  margin-right: auto;
}
</style>
