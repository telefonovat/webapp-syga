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
  import { buildCodeNew } from "@/components/editor/buildCode";

  import { storeToRefs } from "pinia";
  import { computed, onMounted } from "vue";
  import { usePersistentTabSettings } from "@/components/settings/usePersistentTabSettings";
  import { router } from "@/router";
  import { useBuildStatus } from "@/components/editor/useBuildStatus";

  interface Props {
    code?: string;
  }
  const props = defineProps<Props>();

  const visualizerStore = useVisualizerStore();

  const { currentFrame } = storeToRefs(visualizerStore);

  const { code, markClean } = usePersistentTabSettings(
    router.currentRoute.value.fullPath,
  );
  const { buildStatus } = useBuildStatus();
  onMounted(async () => {
    if (props.code) code.value = props.code;

    const visualizerStore = useVisualizerStore();
    const frames = await buildCodeNew(code.value);
    visualizerStore.frames = frames;
    if (buildStatus.value === "success") markClean();
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

