<template>

  <div class="algorithm-visualization-page">

    <CodeEditor />

    <Visualizer class="algorithm-visualization-page-visualizer" />

  </div>

</template>

<script setup lang="ts">
  import CodeEditor from "@/components/editor/CodeEditor.vue";
  import Visualizer from "@/components/visualizer/Visualizer.vue";
</script>

<style scoped>
  .algorithm-visualization-page{
  display: flex;
  height: 100%;

  & > *{
    flex-grow: 1;
  }
}

.algorithm-visualization-page-visualizer{

  border-left: 1px solid #444;
}
</style>

