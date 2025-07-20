<script setup lang="ts">
  import AwesomeSlider from "@/components/utility/slider/AwesomeSlider.vue";
  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import { ref } from "vue";
  import { AwesomeSliderModel } from "../utility/slider";
  import { useVisualizerCommands } from "./useVisualizerCommands";
  const store = useVisualizerStore();

  const { togglePlay } = useVisualizerCommands();

  const sliderModel = ref<AwesomeSliderModel>({
    get value() {
      return store.activeFrameNumber;
    },
    set value(v) {
      store.activeFrameNumber = v;
    },
    min: 0,
    get max() {
      return store.numberOfFrames - 1;
    },
  });
</script>

<template>

  <div class="container">

    <Button @click="togglePlay()">Toggle play</Button>

    <Button @click="sliderModel.value = 0">Start</Button>

    <Button
      @click="
        sliderModel.value = (sliderModel.value - 1) % sliderModel.max
      ">
       Prev
    </Button>

    <AwesomeSlider
      class="container__frames-slider"
      v-model="sliderModel" />

    <Button
      @click="
        sliderModel.value = (sliderModel.value + 1) % sliderModel.max
      ">
       Next
    </Button>

    <Button @click="sliderModel.value = sliderModel.max - 1">
       End
    </Button>

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

