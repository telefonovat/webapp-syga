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

  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import {
    SplitterGroup,
    SplitterPanel,
    SplitterResizeHandle,
  } from "reka-ui";
  import { buildCode } from "@/components/editor/buildCode";

  import { storeToRefs } from "pinia";
  import { computed, onMounted, watch } from "vue";
  import { usePersistentTabSettings } from "@/components/settings/usePersistentTabSettings";
  import { router } from "@/router";

  interface Props {
    code?: string;
  }
  const props = defineProps<Props>();

  const visualizerStore = useVisualizerStore();

  const { currentFrame } = storeToRefs(visualizerStore);

  const { code } = usePersistentTabSettings(
    router.currentRoute.value.fullPath,
  );
  onMounted(() => {
    if (props.code) code.value = props.code;
    buildCode(code.value);
  });
  watch(code, (newVal) => {
    code.value = newVal;
  });

  const currentLineNos = computed(() => {
    return currentFrame.value?.lineNo ?? [];
  });
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
</style>

