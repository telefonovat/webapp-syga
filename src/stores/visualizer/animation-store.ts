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
  function goToFrame(index: number): void {
    if (index < 0 || index >= nFrames.value) {
      //Log misuse
      return;
    }

    state.value.activeFrame = index;
  }
  return {
    state,
    nFrames, currentFrame,
    goToNextFrame,
    goToFrame,
  }
})

export { useAnimationStore_ };
