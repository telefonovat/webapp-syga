import { defineStore } from "pinia";
import { useSimpleFrame } from "@/utils/test-data/mockFrames"
import { computed } from "vue";
const useVisualizerStore = defineStore("visualizer-store",
  () => {
    const frames = [useSimpleFrame];
    const currentIndex = 0;

    const currentFrame = computed(() => frames[currentIndex]);

    return {
      currentFrame,
    }
  })
export default useVisualizerStore;
