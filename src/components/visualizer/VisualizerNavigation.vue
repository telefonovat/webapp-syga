<script setup lang="ts">
  import AwesomeSlider from "@/components/utility/slider/AwesomeSlider.vue";
  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import { storeToRefs } from "pinia";

  import { computed, reactive, ref, watch } from "vue";
  import { AwesomeSliderModel } from "../utility/slider";
  const store = useVisualizerStore();

  const numberOfFrames = computed(() => store.numberOfFrames);

  const { activeFrameNumber } = storeToRefs(store);

  const isPlaying = computed(() => store.isPlaying);
  function togglePlay() {
    if (isPlaying.value) {
      store.pause();
    } else {
      store.play();
    }
  }

  function jumpToStart() {
    store.setActiveFrame(0);
  }
  function jumpToEnd() {
    store.setActiveFrame(numberOfFrames.value - 1);
  }

  function prevFrame() {
    store.setActiveFrame(activeFrameNumber.value - 1);
  }

  function nextFrame() {
    store.setActiveFrame(activeFrameNumber.value + 1);
  }

  const sliderModel = ref<AwesomeSliderModel>({
    get value() {
      return activeFrameNumber.value;
    },
    set value(v) {
      activeFrameNumber.value = v;
    },
    min: 0,
    get max() {
      return numberOfFrames.value - 1;
    },
  });

  watch(
    () => sliderModel.value.value,
    (newValue) => {
      activeFrameNumber.value = newValue;
    },
  );
</script>

<template>

  <div class="container">

    <Button @click="togglePlay()">Toggle play</Button>

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

  </div>

</template>

<style scoped>
  .container{
  display: flex;
  align-items: stretch;

  /* WARN: might grow obsolete with vuetify removed */
  flex-grow: 1;

  > * {
    padding: 8px;
  }
}
.container__frames-slider{
  min-width: 300px;
}
</style>

