<template>

  <div class="page">

    <CodeEditor
      :linesToHighlight="currentLineNos"
      v-model:code="code" />

    <Visualizer class="" />

  </div>

</template>

<script setup lang="ts">
  import CodeEditor from "@/components/editor/CodeEditor.vue";
  import Visualizer from "@/components/visualizer/Visualizer.vue";
  import { useEditorStore } from "@/store/editor/editorStore";
  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import { storeToRefs } from "pinia";
  import { computed } from "vue";

  const editorStore = useEditorStore();
  const visualizerStore = useVisualizerStore();

  const { code } = storeToRefs(editorStore);

  const currentLineNos = computed(
    () => visualizerStore.currentFrame?.lineNo ?? [],
  );
</script>

<style scoped>
  .page{
  height: 100%;

  min-height: 0px;
  display: flex;
  height: 100%;

  & > *{
    flex-grow: 1;
  }
}
  .algorithm-visualization-page{
  min-height: 0px;
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

