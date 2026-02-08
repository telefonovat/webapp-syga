<script setup lang="ts">
  import AlgorithmControlPanel from "@/views/AlgorithmControlPanel.vue";
  import AlgorithmVisualizationPage from "../pages/AlgorithmVisualizationPage.vue";
</script>

<template>

  <div class="h-full">

    <AlgorithmControlPanel class="control-panel" />

    <AlgorithmVisualizationPage />

  </div>

</template>

<style scoped>
  .control-panel{
  border-bottom: 1px solid #444;
  min-height: 2.5rem;
  max-height: 2.75rem;
}
</style>

