<template>

  <ToolbarRoot class="container">

    <ToolbarButton
      class="btn-primary"
      :disabled="!canVisualizerPlay"
      @click="togglePlay()">
       {{ store.isPlaying ? "Pause" : "Play" }}
    </ToolbarButton>

    <ToolbarButton
      class="btn-primary"
      :disabled="!canVisualizerPlay"
      @click="sliderModel.value = 1">
       <<
    </ToolbarButton>

    <ToolbarButton
      class="btn-primary"
      :disabled="!canVisualizerPlay"
      @click="
        sliderModel.value = Math.max(
          sliderModel.min,
          modulo(sliderModel.value - 1, sliderModel.max),
        )
      ">
       <
    </ToolbarButton>

    <AwesomeSlider
      :disabled="!canVisualizerPlay"
      data-testid="visualizer-frame-slider"
      class="container__frames-slider"
      v-model="sliderModel" />

    <ToolbarButton
      class="btn-primary"
      :disabled="!canVisualizerPlay"
      @click="
        sliderModel.value = Math.min(
          sliderModel.max,
          sliderModel.value + 1,
        )
      ">
       >
    </ToolbarButton>

    <ToolbarButton
      class="btn-primary"
      :disabled="!canVisualizerPlay"
      @click="sliderModel.value = sliderModel.max">
       >>
    </ToolbarButton>

  </ToolbarRoot>

</template>

<script setup lang="ts">
  import AwesomeSlider from "@/components/utility/slider/AwesomeSlider.vue";
  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import { computed, ref } from "vue";
  import { AwesomeSliderModel } from "../utility/slider";
  import { useVisualizerCommands } from "./useVisualizerCommands";

  import { ToolbarButton, ToolbarRoot } from "reka-ui";
  import { storeToRefs } from "pinia";

  const store = useVisualizerStore();
  const { activeFrameNumber, numberOfFrames } = storeToRefs(store);
  const { togglePlay } = useVisualizerCommands();

  const canVisualizerPlay = computed(
    () => numberOfFrames.value !== 0,
  );

  function modulo(a: number, n: number): number {
    return ((a % n) + n) % n;
  }

  // WARN: The store is 0-indexed but the sliderModel is 1-indexed
  const sliderModel = ref<AwesomeSliderModel>({
    get value() {
      return activeFrameNumber.value + 1;
    },
    set value(v) {
      activeFrameNumber.value = v - 1;
    },
    min: 1,
    get max() {
      return numberOfFrames.value;
    },
  });
</script>

<style scoped>
  .container{
  display: flex;

  > * {
    padding: 8px;
  }
}

.container__frames-slider{
  @apply text-(--color-text);
  min-width: 200px;
  align-self: center;

  cursor: grab;
}

.container__frames-slider:active:hover{
  cursor: grabbing;
}
</style>

