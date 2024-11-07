import { defineStore, storeToRefs } from 'pinia';
import { useAnimationStore_ } from './animationStore';
import { computed } from 'vue';
import { usePlayerStore_ } from './playerStore';
import { Frame } from '@/shared-types/visualization/Frame';

const useVisualizerStore = defineStore('Visualizer Store', () => {
  const animationStore_ = useAnimationStore_();
  const playerStore_ = usePlayerStore_();

  const {
    isInitialized: isPlayerInitialized,
    isPlaying,
    lastTick,
  } = storeToRefs(playerStore_);

  const { frames_, activeFrame } = storeToRefs(animationStore_);

  const currentFrame = computed(() => animationStore_.currentFrame);

  function initialize() {
    isPlayerInitialized.value = true;
  }
  function mainLoop(timestamp: DOMHighResTimeStamp) {
    if (
      lastTick.value !== null &&
      isPlaying.value &&
      playerStore_.shouldDoTick(timestamp)
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
    activeFrame.value = frameNumber;
  }
  function setFrames(frames: Frame[]) {
    frames_.value = frames;
  }

  return {
    currentFrame,
    isPlaying,
    play,
    pause,

    setActiveFrame,
    setFrames,

    mainLoop,
  };
});

export { useVisualizerStore };
