
<template>

  <SplitterGroup class="visualizer" direction="vertical">

    <SplitterPanel :min-size="20">

      <Grift
        v-if="componentToDisplay"
        :component="componentToDisplay"
        prefix="visualizer"
        :view-box-size="400"
        :vertexOptions="{}"
        :edgeOptions="{}" />

    </SplitterPanel>

    <SplitterResizeHandle class="vertical-splitter" />

    <SplitterPanel :min-size="20">

      <VisualizerConsole />

    </SplitterPanel>

  </SplitterGroup>

</template>

<script setup lang="ts">
  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import Grift from "./grift/Grift.vue";
  import VisualizerConsole from "./VisualizerConsole.vue";

  import {
    SplitterGroup,
    SplitterPanel,
    SplitterResizeHandle,
  } from "radix-vue";
  import { computed } from "vue";
  import { storeToRefs } from "pinia";

  const visualizerStore = useVisualizerStore();
  const { currentFrame } = storeToRefs(visualizerStore);

  const componentToDisplay = computed(() =>
    currentFrame.value
      ? currentFrame.value.graphComponents[0]
      : undefined,
  );
</script>

<style scoped>
  .visualizer{

    height: 100%;
}
</style>

