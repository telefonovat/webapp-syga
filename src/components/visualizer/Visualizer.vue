
<template>

  <SplitterGroup class="visualizer" direction="vertical">

    <SplitterPanel
      class="relative grid place-items-center h-full"
      :min-size="20">

      <div
        class="absolute top-8 left-8 bg-(--color-secondary) flex border border-black p-3">

        <label
          class="text-stone-700 dark:text-white text-sm leading-none pl-[15px]">
           {{ visualizerInfo.text }}
        </label>

        <div
          class="w-3 h-3 ml-5 pl-3"
          :style="{
            backgroundColor: visualizerInfo.color,
          }" />

      </div>

      <LoadingCard v-if="buildStatus === 'building'" />

      <Grift
        v-else-if="componentToDisplay"
        :edge-color-choices="[]"
        class="h-full"
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
  import { usePersistentTabSettings } from "../settings/usePersistentTabSettings";
  import { router } from "@/router";
  import { useBuildStatus } from "../editor/useBuildStatus";

  const visualizerStore = useVisualizerStore();
  const { currentFrame } = storeToRefs(visualizerStore);

  const componentToDisplay = computed(() => {
    return currentFrame.value
      ? currentFrame.value.graphComponents[0]
      : undefined;
  });

  interface VisualizerInfo {
    text: string;
    color: string;
  }
  const { buildStatus } = useBuildStatus();
  const { isCodeDirty } = usePersistentTabSettings(
    router.currentRoute.value.fullPath,
  );

  const visualizerInfo = computed<VisualizerInfo>(function () {
    if (isCodeDirty.value) {
      return { text: "Out of sync", color: "yellow" };
    } else if (buildStatus.value === "failure")
      return { text: "Build failed", color: "red" };
    else if (buildStatus.value === "building")
      return { text: "Building", color: "MediumBlue" };
    else if (buildStatus.value === "success") {
      return { text: "Synced", color: "Lime" };
    } else {
      return { text: "Unknown status", color: "red" };
    }
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

