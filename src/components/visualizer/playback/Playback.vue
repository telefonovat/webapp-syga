<template>

  <VueZoomable :min-zoom="0.8" :max-zoom="3" class="h-full">

    <Grift
      class="h-full"
      :component="componentToDisplay"
      prefix="visualizer"
      :view-box-size="400"
      :vertexOptions="{}"
      :edgeOptions="{}" />

  </VueZoomable>

  <ToastProvider>

    <ToastRoot
      v-model:open="consoleLogExists"
      class="bg-white rounded-lg shadow-sm border p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--reka-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut">

      <ToastTitle
        class="[grid-area:_title] mb-[5px] font-medium text-slate12 text-sm">
         Console Logs
      </ToastTitle>

      <ToastDescription v-for="log in consoleLogs">
         {{ log }}
      </ToastDescription>

    </ToastRoot>

    <ToastViewport
      class="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />

  </ToastProvider>

</template>

<script setup lang="ts">
  import VueZoomable from "vue-zoomable";
  import {
    ToastDescription,
    ToastProvider,
    ToastRoot,
    ToastTitle,
    ToastViewport,
  } from "reka-ui";

  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import { storeToRefs } from "pinia";
  import { computed, ref, watch } from "vue";

  const visualizerStore = useVisualizerStore();
  const { currentFrame } = storeToRefs(visualizerStore);

  const componentToDisplay = computed(() =>
    currentFrame.value
      ? currentFrame.value.graphComponents[0]
      : undefined,
  );

  const consoleLogExists = ref(false);
  const consoleLogs = ref<string[]>([]);
  watch(currentFrame, (newVal) => {
    if (
      newVal?.consoleLogs?.length &&
      newVal.consoleLogs.length > 0
    ) {
      consoleLogs.value = newVal.consoleLogs.filter(
        (log) => log !== "",
      );
      consoleLogExists.value = consoleLogs.value.length > 0;
    }
  });
</script>

