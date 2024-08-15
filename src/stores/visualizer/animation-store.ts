import { defineStore } from "pinia";

import { AnimationState } from "@/interfaces/visualizer/AnimationState";
import { computed, ref } from "vue";
const useAnimationStore_ = defineStore("animation-store", () => {
  const state = ref<AnimationState>({
    isInitialized: false,
    frames: [],
    activeFrame: 0,
  });

  const nFrames = computed(() => state.value.frames.length);

  //TODO: Unsafe and lazy solution!
  const currentFrame = computed(() => state.value.frames[state.value.activeFrame]);
  function goToNextFrame() {
    state.value.activeFrame =
      (state.value.activeFrame + 1) % nFrames.value;
  }
  return {
    state,
    nFrames, currentFrame,
    goToNextFrame,
  }
})

export { useAnimationStore_ };
