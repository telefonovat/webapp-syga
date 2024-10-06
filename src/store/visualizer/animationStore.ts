
// Responsible for keeping track of Animation frames, updating and returning correct ones
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Frame } from "@/shared/Frame";

const useAnimationStore_ = defineStore("Animation Store",
  () => {

    const frames_ = ref<Frame[]>([]);
    const activeFrame = ref<number>(0);

    const nFrames = computed(() => frames_.value.length);

    const currentFrame = computed(() =>
      activeFrame.value >= 0 && activeFrame.value < nFrames.value ?
        frames_.value[activeFrame.value] : null
    );

    // API for player
    function nextFrame() {
      activeFrame.value = (activeFrame.value + 1) % nFrames.value;
    }
    function prevFrame() {
      activeFrame.value = (activeFrame.value - 1) % nFrames.value;
    }

    //
    function setFrames(newFrames: Frame[]) {
      frames_.value = newFrames;
    }

    return {
      frames_, activeFrame,

      nFrames,
      currentFrame,

      nextFrame, prevFrame,

      setFrames,
    }
  })

export { useAnimationStore_ };
