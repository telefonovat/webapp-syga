import { defineStore, storeToRefs } from "pinia";
import { useAnimationStore_ } from "./animationStore";
import { computed, ref } from "vue";
import { VisualizationFrame } from "@telefonovat/syga--contract";

const useVisualizerStore = defineStore("Visualizer Store", () => {
  const animationStore = useAnimationStore_();

  // Ticker
  const lastTick = ref(performance.now());
  const isPlaying = ref(false);
  const isInitialized = ref(false);
  const tickPeriod = ref(750);

  // Re-exporting animationStore.frames does not work
  const { frames, numberOfFrames, activeFrameNumber } =
    storeToRefs(animationStore);

  const currentFrame = computed(() => animationStore.currentFrame);

  function initialize() {
    isInitialized.value = true;
  }
  function mainLoop(timestamp: DOMHighResTimeStamp) {
    if (
      lastTick.value !== null &&
      isPlaying.value &&
      lastTick.value + tickPeriod.value <= timestamp
    ) {
      animationStore.nextFrame();
      lastTick.value = timestamp;
    }
    window.requestAnimationFrame((timestamp) => mainLoop(timestamp));
  }

  // Frame navigation commands
  function play() {
    if (!isInitialized.value) {
      initialize();
    }
    lastTick.value = performance.now();
    isPlaying.value = true;
    mainLoop(lastTick.value);
  }
  function pause() {
    isPlaying.value = false;
  }
  function setActiveFrame(frameNumber: number) {
    if (
      !(
        frameNumber >= 0 &&
        frameNumber < animationStore.numberOfFrames
      )
    ) {
      console.warn(`Frame number ${frameNumber} does not exist`);
      return;
    }
    animationStore.activeFrameNumber = frameNumber;
  }
  function setFrames(newFrames: VisualizationFrame[]) {
    animationStore.setFrames(newFrames);
  }

  // reset functions
  function resetTicker() {
    lastTick.value = performance.now();
    isPlaying.value = false;
    isInitialized.value = false;
    tickPeriod.value = 750;
  }
  function $reset() {
    animationStore.$reset();
    resetTicker();
  }

  return {
    frames,
    activeFrameNumber,
    numberOfFrames,
    currentFrame,
    isPlaying,
    play,
    pause,

    setActiveFrame,
    setFrames,

    mainLoop,

    $reset,
  };
});

export { useVisualizerStore };
