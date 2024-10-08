<script setup lang="ts">
import Visualizer from '@/components/visualizer/Visualizer.vue';
import MockFooter from "./mock/sfc/MockFooter.vue"
import VisualizerNavigation from './visualizer/control/VisualizerNavigation.vue';
import CodeEditor from './editor/CodeEditor.vue';
</script>

<template>
  <div id="home">
    <VisualizerNavigation id="app-header" />
    <CodeEditor id="editor" />
    <Visualizer id="visualizer" />
    <MockFooter id="app-footer" />

  </div>
</template>

<style scoped>
#home {
  display: grid;
  grid-template-areas:
    "app-header app-header app-header"
    ". editor  visualizer"
    ". editor  visualizer"
    "app-footer app-footer app-footer";
  grid-template-rows: auto 3fr auto;
}

#home>#app-header {
  grid-area: app-header;
}

#home>#editor {
  grid-area: editor;
}

#home>#app-footer {
  grid-area: app-footer;
}
</style>
