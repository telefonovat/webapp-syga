<script setup lang="ts">
  import ComponentRenderer from "./graph/ComponentRenderer.vue";
  import VisualizerConsole from "./VisualizerConsole.vue";

  import {
    SplitterGroup,
    SplitterPanel,
    SplitterResizeHandle,
  } from "radix-vue";
</script>

<template>

  <SplitterGroup class="visualizer" direction="vertical">

    <SplitterPanel :min-size="20">

      <ComponentRenderer :componentIndex="0" />

    </SplitterPanel>

    <SplitterResizeHandle class="vertical-splitter" />

    <SplitterPanel :min-size="20">

      <VisualizerConsole />

    </SplitterPanel>

  </SplitterGroup>

</template>

<style scoped>
  .visualizer{

    height: 100%;
    background-color: #282c34;
}
</style>

