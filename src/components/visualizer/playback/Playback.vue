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

</template>

<script setup lang="ts">
  import VueZoomable from "vue-zoomable";

  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import { storeToRefs } from "pinia";
  import { computed } from "vue";

  const visualizerStore = useVisualizerStore();
  const { currentFrame } = storeToRefs(visualizerStore);

  const componentToDisplay = computed(() =>
    currentFrame.value
      ? currentFrame.value.graphComponents[0]
      : undefined,
  );
</script>

