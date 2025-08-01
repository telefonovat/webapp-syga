<script setup lang="ts">
  import Visualizer from "@/components/visualizer/Visualizer.vue";
  import CodeEditor from "@/components/editor/CodeEditor.vue";
  import AlgorithmControlPanel from "./AlgorithmControlPanel.vue";
</script>

<template>

  <AlgorithmControlPanel class="control-panel" />

  <div class="view-container">

    <!-- <div class="placeholder">Hi</div> -->

    <CodeEditor />

    <Visualizer class="visualizer" />

  </div>

</template>

<style scoped>
  .control-panel{
  border-bottom: 1px solid #444;
}

.view-container{
  display: flex;
  max-height: 80%;

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

