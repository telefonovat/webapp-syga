import { defineStore, storeToRefs } from "pinia";
import { useSimpleFrame } from "@/utils/test-data/mockFrames"
import { computed, ref, reactive } from "vue";
import { shouldDoTick } from "./utils";

//Defaults
const DEFAULT_TICK_PERIOD = 2000;
interface PlayerState {
  isInitialized: boolean,
  isPlaying: boolean,
  lastTick: DOMHighResTimeStamp | null,
  timeStamp: number | null,
  //Constants
  TICK_PERIOD: number,
}
const usePlayerStore = defineStore("store-private", () => {
  const playerState: PlayerState = reactive({
    isInitialized: false,
    isPlaying: false,
    lastTick: null,
    timeStamp: null,

    TICK_PERIOD: DEFAULT_TICK_PERIOD,
  });

  return { playerState };
});
const useVisualizerStore = defineStore("visualizer-store",
  () => {
    const { playerState } = storeToRefs(usePlayerStore());
    // Constants
    const frames = [useSimpleFrame];
    const currentIndex = 0;
    const lastTick = ref<DOMHighResTimeStamp | null>(null);
    let i = 0;
    const currentFrame = computed(() => frames[currentIndex]);

    // Player actions

    function play() {
      playerState.value.isPlaying = true;
      lastTick.value = performance.now();
      mainLoop(lastTick.value);
    }
    function pause() {
      playerState.value.isPlaying = false;

    }
    function mainLoop(timestamp: DOMHighResTimeStamp) {
      if (lastTick.value !== null &&
        shouldDoTick(playerState.value.TICK_PERIOD, lastTick.value, timestamp)) {
        lastTick.value = timestamp;
      }
      window.requestAnimationFrame((timestamp) => mainLoop(timestamp));
    }

    return {
      currentFrame,
      play, pause
    }
  })
export default useVisualizerStore;
