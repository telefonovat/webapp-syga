import { defineStore } from "pinia";
import { useAnimationStore } from "./animationStore";
import { computed } from "vue";

const useVisualizerStore = defineStore("Visualizer Store",
  () => {
    const animationStore_ = useAnimationStore();

    const currentFrame = computed(() => animationStore_.currentFrame);

    return {
      currentFrame
    }
  });

export { useVisualizerStore };
