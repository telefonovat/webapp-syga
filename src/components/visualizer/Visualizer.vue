
<template>

  <SplitterGroup class="visualizer" direction="vertical">

    <SplitterPanel
      class="grid place-items-center h-full"
      :min-size="20">

      <Grift
        class="component-renderer"
        v-if="componentToDisplay"
        :component="componentToDisplay"
        prefix="visualizer"
        :view-box-size="400"
        :vertexOptions="{}"
        :edgeOptions="{}" />

      <LoadingCard v-else />

    </SplitterPanel>

    <SplitterResizeHandle class="vertical-splitter" />

    <SplitterPanel :min-size="20">

      <VisualizerConsole />

    </SplitterPanel>

  </SplitterGroup>

</template>

<script setup lang="ts">
  import Grift from "./grift/Grift.vue";
  import VisualizerConsole from "./VisualizerConsole.vue";
  import LoadingCard from "./grift/LoadingCard.vue";

  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";

  import {
    SplitterGroup,
    SplitterPanel,
    SplitterResizeHandle,
  } from "reka-ui";
  import { computed } from "vue";
  import { storeToRefs } from "pinia";

  const visualizerStore = useVisualizerStore();
  const { currentFrame } = storeToRefs(visualizerStore);

  const componentToDisplay = computed(() => {
    return currentFrame.value
      ? currentFrame.value.graphComponents[0]
      : undefined;
  });
</script>

<style scoped>
  .visualizer{
    height: 100%;
}

  .component-renderer{
  height: 100%;
  }
</style>

