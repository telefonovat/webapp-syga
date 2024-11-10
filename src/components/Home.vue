<script setup lang="ts">
import Visualizer from '@/components/visualizer/Visualizer.vue';
import MockFooter from './mock/sfc/MockFooter.vue';
import VisualizerNavigation from './visualizer/control/VisualizerNavigation.vue';
import CodeEditor from './editor/CodeEditor.vue';
import CodeEditorNavigation from '@/components/editor/control/CodeEditorNavigation.vue';
import MockComponent from './mock/sfc/MockComponent.vue';
</script>

<template>
  <div id="home">
    <MockComponent id="featured-list" />
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
    'editor-header editor-header visualizer-header visualizer-header'
    'featured-list editor visualizer  visualizer '
    'app-footer app-footer app-footer app-footer';
  grid-template-rows: auto 3fr auto;
  grid-template-columns: 1fr 2fr 1fr 1fr;
}

#home > #featured-list{
  grid-area: featured-list;
}
#home > #visualizer-header {
  grid-area: visualizer-header;
}

#home > #editor-header {
  grid-area: editor-header;
}

#home > #editor {
  grid-area: editor;
}
#home > #visualizer{
  grid-area: visualizer;
}


#home > #app-footer {
  grid-area: app-footer;
}
</style>
