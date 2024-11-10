<script setup lang="ts">
import Visualizer from '@/components/visualizer/Visualizer.vue';
import MockFooter from '@/components/mock/sfc/MockFooter.vue';
import VisualizerNavigation from '@/components/visualizer/control/VisualizerNavigation.vue';
import CodeEditor from '@/components/editor/CodeEditor.vue';
import CodeEditorNavigation from '@/components/editor/control/CodeEditorNavigation.vue';
</script>

<template>
  <div id="algrithm-view">
    <VisualizerNavigation id="visualizer-header" />
    <CodeEditorNavigation id="editor-header" />
    <CodeEditor id="editor" />
    <Visualizer id="visualizer" />
    <MockFooter id="app-footer" />
  </div>
</template>

<style scoped>
#algrithm-view {
  display: grid;
  grid-template-areas:
    'editor-header editor-header visualizer-header visualizer-header'
    'featured-list editor visualizer  visualizer '
    'app-footer app-footer app-footer app-footer';
  grid-template-rows: auto 3fr auto;
  grid-template-columns: 1fr 2fr 1fr 1fr;
}

#algrithm-view > #featured-list{
  grid-area: featured-list;
}
#algrithm-view > #visualizer-header {
  grid-area: visualizer-header;
}

#algrithm-view > #editor-header {
  grid-area: editor-header;
}

#algrithm-view > #editor {
  grid-area: editor;
}
#algrithm-view > #visualizer{
  grid-area: visualizer;
}


#algrithm-view > #app-footer {
  grid-area: app-footer;
}
</style>
