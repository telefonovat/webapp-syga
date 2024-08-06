import { defineStore } from "pinia";
import { useSimpleFrame } from "@/utils/test-data/mockFrames"
import { computed, ref } from "vue";
const useVisualizerStore = defineStore("visualizer-store",
  () => {
    // Constants
    const TICK_PERIOD = 2000;
    const frames = [useSimpleFrame];
    const currentIndex = 0;
    const lastTick = ref<DOMHighResTimeStamp | null>(null);
    let i = 0;
    const currentFrame = computed(() => frames[currentIndex]);

    function startPlaying() {
      lastTick.value = performance.now();
      mainLoop(lastTick.value);
    }
    function mainLoop(timestamp: DOMHighResTimeStamp) {
      if (lastTick.value! + TICK_PERIOD <= timestamp) {
        console.log(`i is ${i}`);
        i++;
        lastTick.value = timestamp;
      }
      window.requestAnimationFrame((timestamp) => mainLoop(timestamp));
    }

    return {
      currentFrame,
      startPlaying,
    }
  })
export default useVisualizerStore;
