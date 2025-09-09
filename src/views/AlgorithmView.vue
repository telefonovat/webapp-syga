<script setup lang="ts">
  import Visualizer from "@/components/visualizer/Visualizer.vue";
  import CodeEditor from "@/components/editor/CodeEditor.vue";
  import AlgorithmControlPanel from "./AlgorithmControlPanel.vue";
</script>

<template>

  <div class="algorithm-view">

    <AlgorithmControlPanel class="control-panel" />

    <div class="view-container">

      <CodeEditor />

      <Visualizer class="visualizer" />

    </div>

  </div>

</template>

<style scoped>
  .algorithm-view{
  display: flex;
  flex-direction: column;
}

  .control-panel{
  border-bottom: 1px solid #444;
  min-height: 2rem;
  max-height: 2.75rem;
}

.view-container{
  display: flex;
  height: 100%;

  & > *{
    flex-grow: 1;
  }
}

.placeholder{
  flex-grow: 1;
}

.visualizer{

  border-left: 1px solid #444;
}
</style>

