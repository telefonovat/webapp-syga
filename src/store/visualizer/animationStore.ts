
// Responsible for keeping track of Animation frames, updating and returning correct ones
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Frame } from "@/shared/Frame";

const useAnimationStore = defineStore("Animation Store",
  () => {

    const frames = ref<Frame[]>([]);
    const activeFrame = ref<number>(0);

    const nFrames = computed(() => frames.value.length);

    const currentFrame = computed(() =>
      activeFrame.value >= 0 && activeFrame.value < nFrames.value ?
        frames.value[activeFrame.value] : null
    );

    function setFrames(newFrames: Frame[]) {
      frames.value = newFrames;
    }

    return {
      frames, activeFrame,

      nFrames,
      currentFrame,

      setFrames,
    }
  })

export { useAnimationStore };
