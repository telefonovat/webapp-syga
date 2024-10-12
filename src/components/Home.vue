<script setup lang="ts">
import Visualizer from '@/components/visualizer/Visualizer.vue';
import MockFooter from "./mock/sfc/MockFooter.vue"
import VisualizerNavigation from './visualizer/control/VisualizerNavigation.vue';
import CodeEditor from './editor/CodeEditor.vue';
import CodeEditorNavigation from "@/components/editor/control/CodeEditorNavigation.vue"
</script>

<template>
  <div id="home">
    <VisualizerNavigation id="visualizer-header" />
    <CodeEditorNavigation id="editor-header" />
    <CodeEditor id="editor" />
    <Visualizer id="visualizer" />
    <MockFooter id="app-footer" />

  </div>
</template>

<style scoped>
#home {
  display: grid;
  grid-template-areas:
    "editor-header visualizer-header visualizer-header"
    ". editor  visualizer"
    ". editor  visualizer"
    "app-footer app-footer app-footer";
  grid-template-rows: auto 3fr auto;
}

#home>#visualizer-header {
  grid-area: visualizer-header;
}

#home>#editor-header {
  grid-area: editor-header;
}

#home>#editor {
  grid-area: editor;
}

#home>#app-footer {
  grid-area: app-footer;
}
</style>
