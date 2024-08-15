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
    mainLoop(playerState.value.lastTick);
  }
  function mainLoop(timestamp: DOMHighResTimeStamp) {
    if (playerState.value.lastTick !== null &&
      playerStore_.shouldDoTick(timestamp)) {
      animationStore_.goToNextFrame();
      playerState.value.lastTick = timestamp;
    }
    window.requestAnimationFrame((timestamp) => mainLoop(timestamp));
  }
  return {
    currentFrame,
    setFrames,
    initialize,
    play, mainLoop,
  }
})

export { useVisualizerStore };
