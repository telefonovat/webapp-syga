import { defineStore, storeToRefs } from 'pinia';
import { useAnimationStore_ } from './animationStore';
import { computed } from 'vue';
import { useTicker } from './ticker';
import { Frame } from '@/shared-types/visualization/Frame';

const useVisualizerStore = defineStore('Visualizer Store', () => {
  const animationStore_ = useAnimationStore_();
  const ticker_ = useTicker();

  const {
    isInitialized: isPlayerInitialized,
    isPlaying,
    lastTick,
  } = storeToRefs(ticker_);

  const { numberOfFrames, frames_, activeFrameNumber } =
    storeToRefs(animationStore_);

  const currentFrame = computed(() => animationStore_.currentFrame);

  function initialize() {
    isPlayerInitialized.value = true;
  }
  function mainLoop(timestamp: DOMHighResTimeStamp) {
    if (
      lastTick.value !== null &&
      isPlaying.value &&
      ticker_.shouldDoTick(timestamp)
    ) {
      animationStore_.nextFrame();
      lastTick.value = timestamp;
    }
    window.requestAnimationFrame((timestamp) => mainLoop(timestamp));
  }

  //User commands
  function play() {
    if (!isPlayerInitialized.value) {
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
    if (!(frameNumber >= 0 && frameNumber < numberOfFrames.value)) {
      console.warn(`Frame number ${frameNumber} does not exist`);
      return;
    }
    activeFrameNumber.value = frameNumber;
  }
  function setFrames(frames: Frame[]) {
    frames_.value = frames;
  }

  function $reset() {
    animationStore_.$reset();
    ticker_.$reset();
  }

  return {
    currentFrame,
    activeFrameNumber,
    numberOfFrames,
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
