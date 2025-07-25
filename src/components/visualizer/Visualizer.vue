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
  width: 100%;
  height:100%; 
}

.renderer{
  height: 75%;
  border-bottom: 1px solid grey;
}
.console{
height: 25%;
}
</style>

