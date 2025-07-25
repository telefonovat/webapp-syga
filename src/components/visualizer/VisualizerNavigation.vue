<script setup lang="ts">
  import AwesomeSlider from "@/components/utility/slider/AwesomeSlider.vue";
  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import { ref } from "vue";
  import { AwesomeSliderModel } from "../utility/slider";
  import { useVisualizerCommands } from "./useVisualizerCommands";
  const store = useVisualizerStore();

  const { togglePlay } = useVisualizerCommands();

  function modulo(a: number, n: number): number {
    return ((a % n) + n) % n;
  }

  // WARN: The store is 0-indexed but the sliderModel is 1-indexed
  const sliderModel = ref<AwesomeSliderModel>({
    get value() {
      return store.activeFrameNumber + 1;
    },
    set value(v) {
      store.setActiveFrame(v - 1);
    },
    min: 0,
    get max() {
      return store.numberOfFrames;
    },
  });
</script>

<template>

  <div class="container">

    <Button @click="togglePlay()">Toggle play</Button>

    <Button @click="sliderModel.value = 1"><<</Button>

    <Button
      @click="
        sliderModel.value = modulo(
          sliderModel.value - 1,
          sliderModel.max + 1,
        )
      ">
       <
    </Button>

    <AwesomeSlider
      class="container__frames-slider"
      v-model="sliderModel" />

    <Button
      @click="
        sliderModel.value = modulo(
          sliderModel.value + 1,
          sliderModel.max + 1,
        )
      ">
       >
    </Button>

    <Button @click="sliderModel.value = sliderModel.max"> >> </Button>

  </div>

</template>

<style scoped>
  .container{
  display: flex;

  > * {
    padding: 8px;
  }
}
.container__frames-slider{
  min-width: 200px;
}
</style>

