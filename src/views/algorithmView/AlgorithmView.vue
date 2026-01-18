<script setup lang="ts">
  import AlgorithmControlPanel from "@/views/AlgorithmControlPanel.vue";
  import AlgorithmVisualizationPage from "../pages/AlgorithmVisualizationPage.vue";
</script>

<template>

  <div class="algorithm-view">

    <AlgorithmControlPanel class="control-panel" />

    <AlgorithmVisualizationPage />

  </div>

</template>

<style scoped>
  .algorithm-view{
  display: flex;
  flex-direction: column;
}

  .control-panel{
  border-bottom: 1px solid #444;
  min-height: 2rem;
  max-height: 2.75rem;
}

.view-container{
  display: flex;
  height: 100%;

  & > *{
    flex-grow: 1;
  }
}

.placeholder{
  flex-grow: 1;
}

.visualizer{

  border-left: 1px solid #444;
}
</style>

