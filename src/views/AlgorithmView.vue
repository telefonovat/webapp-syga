<script setup lang="ts">
import Visualizer from '@/components/visualizer/Visualizer.vue';
import MockFooter from '@/components/mock/sfc/MockFooter.vue';
import CodeEditor from '@/components/editor/CodeEditor.vue';
import AlgorithmControlPanel from './AlgorithmControlPanel.vue';
</script>

<template>
  <div class="algrithm-view">
    <AlgorithmControlPanel class="algorithm-view-header" />
    <CodeEditor class="editor" />
    <Visualizer class="visualizer" />
    <MockFooter class="app-footer" />
  </div>
</template>

<style scoped>
.algrithm-view {
  display: grid;
  grid-template-areas:
    '. . algorithm-view-header algorithm-view-header'
    'editor editor visualizer visualizer'
    'app-footer app-footer app-footer app-footer';
  grid-template-rows: auto 3fr auto;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  
}

.algrithm-view > .featured-list{
  grid-area: featured-list;
}
.algrithm-view > .algorithm-view-header{
  grid-area: algorithm-view-header;
}
.algrithm-view > .editor {
  grid-area: editor;
}
.algrithm-view > .visualizer{
  grid-area: visualizer;
}


.algrithm-view > .app-footer {
  grid-area: app-footer;
}
</style>
