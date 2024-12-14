<script setup lang="ts">
import Visualizer from '@/components/visualizer/Visualizer.vue';
import MockFooter from '@/components/mock/sfc/MockFooter.vue';
import CodeEditor from '@/components/editor/CodeEditor.vue';
import AlgorithmControlPanel from './AlgorithmControlPanel.vue';
</script>

<template>
  <div class="algrithm-view">
    <AlgorithmControlPanel class="algrithm-view__header" />
    <CodeEditor class="algrithm-view__editor" />
    <Visualizer class="algrithm-view__visualizer" />
    <MockFooter class="algrithm-view__footer" />
  </div>
</template>

<style scoped>
.algrithm-view {
  display: grid;
  grid-template-areas:
    '. . header header'
    'editor editor visualizer visualizer'
    'footer footer footer footer';
  grid-template-rows: auto 3fr auto;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  
}

.algrithm-view__header{
  grid-area: header;
}
.algrithm-view__editor {
  grid-area: editor;
  border-right: 1px solid black;
}
.algrithm-view__visualizer{
  grid-area: visualizer;
}


.algrithm-view__footer {
  grid-area: footer;
}
</style>
