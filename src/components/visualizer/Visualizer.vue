
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

      <template v-else-if="componentToDisplay">

        <Grift
          :edge-color-choices="[]"
          class="h-full"
          :component="componentToDisplay"
          prefix="visualizer"
          :view-box-width="500"
          :view-box-height="400"
          :vertexOptions="{}"
          :edgeOptions="{}" />

        <ToolbarRoot
          class="absolute top-8 right-8 flex bg-(--color-secondary) border border-black">

          <ToolbarButton
            @click="console.log('Clicked')"
            class="btn-primary flex items-center">

          </ToolbarButton>

        </ToolbarRoot>

        <PopoverRoot>

          <PopoverTrigger
            class="btn-primary flex items-center absolute top-8 right-8 bg-(--color-secondary) border border-black"
            aria-label="Download code">

            <Icon icon="tdesign:file-download" />

          </PopoverTrigger>

          <PopoverPortal>

            <PopoverContent
              side="bottom"
              :side-offset="5"
              class="rounded-lg p-4 w-[260px] bg-(--color-muted) shadow-sm border border-black will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade">

              <PopoverClose
                class="h-[25px] w-[25px] inline-flex items-center justify-center text-grass11 absolute top-[8px] right-[8px] hover:bg-green4 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-default"
                aria-label="Close">

                <Icon icon="radix-icons:cross-2" />

              </PopoverClose>

              <div class="flex flex-col gap-2.5">

                <fieldset class="flex gap-5 items-center">

                  <label
                    class="text-xs text-grass11 w-[75px]"
                    for="width">
                     File name
                  </label>

                  <input
                    id="width"
                    v-model="fileName"
                    class="w-full inline-flex bg-stone-50 items-center justify-center flex-1 rounded px-2.5 text-xs leading-none text-black shadow-[0_0_0_1px] shadow-green7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-green8 outline-none" />

                </fieldset>

                <PopoverClose
                  class="btn-primary flex gap-5 items-center"
                  @click="downloadFile(fileName)"
                  aria-label="Close">
                   Download code
                </PopoverClose>

              </div>

              <PopoverArrow class="fill-white stroke-gray-200" />

            </PopoverContent>

          </PopoverPortal>

        </PopoverRoot>

      </template>

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

  import {
    PopoverArrow,
    PopoverClose,
    PopoverContent,
    PopoverPortal,
    PopoverRoot,
    PopoverTrigger,
  } from "reka-ui";
  import {
    SplitterGroup,
    SplitterPanel,
    SplitterResizeHandle,
  } from "reka-ui";
  import { Icon } from "@iconify/vue";

  import { computed, ref } from "vue";
  import { storeToRefs } from "pinia";
  import { usePersistentTabSettings } from "../settings/usePersistentTabSettings";
  import { router } from "@/router";
  import { useBuildStatus } from "../editor/useBuildStatus";
  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import { useDownloadCode } from "./download/useDownloadCode";

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
      return { text: "Synced", color: "LimeGreen" };
    } else {
      return { text: "Unknown status", color: "red" };
    }
  });

  // Downloads
  const fileName = ref("my_awesome_code.py");
  const { downloadFile } = useDownloadCode(
    router.currentRoute.value.fullPath,
  );
</script>

<style scoped>
  .visualizer{
    height: 100%;
}

  .component-renderer{
  height: 100%;
  }
</style>

