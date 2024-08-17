import { defineStore, storeToRefs } from "pinia";

import { useAnimationStore_ } from "./animation-store";
import { usePlayerStore_ } from "./player-store";
import Frame from "@/interfaces/backend/Frame";
import { computed } from "vue";

const useVisualizerStore = defineStore("visualizer-store", () => {
  const playerStore_ = usePlayerStore_();
  const animationStore_ = useAnimationStore_();
  const { state: playerState } = storeToRefs(playerStore_);
  const { state: animationState } = storeToRefs(animationStore_);

  const currentFrame = computed(() => animationStore_.currentFrame);
  const activeLines = computed(() => {
    if (animationStore_.nFrames === 0) {
      return [];
    }
    return animationStore_.currentFrame.lineno;
  });
  const isPlaying = computed(() => playerState.value.isPlaying);
  function setFrames(frames: Frame[]) {
    animationState.value.frames = frames;
  }

  function initialize() {
    //Nothing here for now

    animationState.value.isInitialized = true;
    playerState.value.isInitialized = true;
  }
  function play() {
    if (!animationState.value.isInitialized || !playerState.value.isInitialized) {
      initialize();
    }
    playerState.value.lastTick = performance.now();
    playerState.value.isPlaying = true;
    mainLoop(playerState.value.lastTick);
  }
  function pause() {
    playerState.value.isPlaying = !playerState.value.isPlaying;
  }
  function mainLoop(timestamp: DOMHighResTimeStamp) {
    if (playerState.value.lastTick !== null &&
      playerState.value.isPlaying &&
      playerStore_.shouldDoTick(timestamp)) {
      if (activeLines.value !== undefined) {
        console.log(activeLines.value);
      }
      animationStore_.goToNextFrame();
      playerState.value.lastTick = timestamp;
    }
    window.requestAnimationFrame((timestamp) => mainLoop(timestamp));
  }
  return {
    currentFrame, activeLines,
    isPlaying,
    setFrames,
    initialize,
    play, pause, mainLoop,
  }
})

export { useVisualizerStore };
