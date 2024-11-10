// Responsible for keeping track of Animation frames, updating and returning correct ones
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { Frame } from '@/shared-types/visualization/Frame';

const useAnimationStore_ = defineStore('Animation Store', () => {
  const frames_ = ref<Frame[]>([]);
  const activeFrameNumber = ref<number>(0);

  const numberOfFrames = computed(() => frames_.value.length ?? 0);

  const currentFrame = computed(() =>
    //Check if within bounds
    activeFrameNumber.value >= 0 &&
    activeFrameNumber.value < numberOfFrames.value
      ? frames_.value[activeFrameNumber.value]
      : null
  );

  // API for player
  function nextFrame() {
    if (numberOfFrames.value === 0) {
      throw new Error('There are no frames');
    }
    activeFrameNumber.value =
      (activeFrameNumber.value + 1) % numberOfFrames.value;
  }
  function prevFrame() {
    if (numberOfFrames.value === 0) {
      throw new Error('There are no frames');
    }
    activeFrameNumber.value =
      (activeFrameNumber.value - 1) % numberOfFrames.value;
  }

  function setFrames(newFrames: Frame[]) {
    frames_.value = newFrames;
  }

  return {
    frames_,
    activeFrameNumber,

    numberOfFrames,
    currentFrame,

    nextFrame,
    prevFrame,

    setFrames,
  };
});

export { useAnimationStore_ };
