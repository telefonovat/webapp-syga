<script setup lang="ts">
  import ComponentRenderer from "./graph/ComponentRenderer.vue";
  import VisualizerConsole from "./VisualizerConsole.vue";
</script>

<template>

  <div class="visualizer">

    <ComponentRenderer :componentIndex="0" class="renderer" />

    <VisualizerConsole />

  </div>

</template>

<style scoped>
  .visualizer{
    display: grid;
    grid-template-rows: 3fr 1fr;

    height: 100%;
    background-color: #282c34;
}

.renderer{
  border-bottom: 1px solid #444;
}
</style>

