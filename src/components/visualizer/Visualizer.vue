<script setup lang="ts">
  import ComponentRenderer from "./graph/ComponentRenderer.vue";
  import VisualizerConsole from "./VisualizerConsole.vue";
</script>

<template>

  <div class="visualizer">

    <ComponentRenderer :componentIndex="0" class="renderer" />

    <VisualizerConsole class="console" />

  </div>

</template>

<style scoped>
  .visualizer{
  display: flex;
  flex-direction: column;
  background-color: #282c34;
  flex-grow: 1;
}

.renderer{
  flex: 3;
  border-bottom: 1px solid #444;
}
.console{
  flex: 1;
}
</style>

