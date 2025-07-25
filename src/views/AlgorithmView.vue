<script setup lang="ts">
  import Visualizer from "@/components/visualizer/Visualizer.vue";
  import CodeEditor from "@/components/editor/CodeEditor.vue";
  import AlgorithmControlPanel from "./AlgorithmControlPanel.vue";
</script>

<template>

  <div class="container">

    <AlgorithmControlPanel class="control-panel" />

    <div class="view-container">

      <CodeEditor class="code-editor" />

      <Visualizer />

    </div>

  </div>

</template>

<style scoped>
  .container{
  /* HACK: This is perfect height for my local machine. The whole CSS section needs rethinking*/
  height: 90%;
}

.control-panel{
  border-bottom: 1px solid #444;
}

.view-container{
  height: 100%;
  width: 100%;
  display: flex;
}

.code-editor{
  height: 100%;
  /* HACK: Also needed so that the editor expands */
  width: 100%;

  border-right: 1px solid #444;
}
</style>

