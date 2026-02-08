<template>

  <SplitterGroup class="page" id="test" direction="horizontal">

    <SplitterPanel :min-size="20">

      <CodeEditor
        :style="{ height: '100%' }"
        :linesToHighlight="currentLineNos"
        v-model:code="code" />

    </SplitterPanel>

    <SplitterResizeHandle class="horizontal-splitter" />

    <SplitterPanel :min-size="20">

      <Visualizer class="" />

    </SplitterPanel>

  </SplitterGroup>

</template>

<script setup lang="ts">
  import CodeEditor from "@/components/editor/CodeEditor.vue";
  import Visualizer from "@/components/visualizer/Visualizer.vue";
  import { useEditorStore } from "@/store/editor/editorStore";
  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import { storeToRefs } from "pinia";
  import { computed } from "vue";

  import {
    SplitterGroup,
    SplitterPanel,
    SplitterResizeHandle,
  } from "reka-ui";

  const editorStore = useEditorStore();
  const visualizerStore = useVisualizerStore();

  const { code } = storeToRefs(editorStore);

  const currentLineNos = computed(
    () => visualizerStore.currentFrame?.lineNo ?? [],
  );
</script>

<style scoped>
  .page{

  min-height: 0px;
  height: 100%;

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

}
</style>

