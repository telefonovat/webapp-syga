<template>

  <div class="h-full">

    <Grift
      class="h-full"
      :component="componentToDisplay"
      prefix="visualizer"
      :view-box-size="400"
      :vertexOptions="{}"
      :edgeOptions="{}" />

  </div>

</template>

<script setup lang="ts">
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

