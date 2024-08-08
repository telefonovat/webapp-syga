import { defineStore, storeToRefs } from "pinia";
import { useSimpleFrame } from "@/utils/test-data/mockFrames"
import { computed, ref, reactive } from "vue";
import { shouldDoTick } from "./utils";
import Frame from "@/interfaces/backend/Frame";

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
interface AnimationState {
  frames: Frame[],
  activeFrame: number,
}
const usePlayerStore = defineStore("store-player", () => {
  const playerState = reactive<PlayerState>({
    isInitialized: false,
    isPlaying: false,
    lastTick: null,
    timeStamp: null,

    TICK_PERIOD: DEFAULT_TICK_PERIOD,
  });

  //State mutations

  return { playerState };
});

const useAnimationStore = defineStore("store-graph", () => {
  const animationState = reactive<AnimationState>({
    frames: [],
    activeFrame: 0,
  });
  return { animationState };
})
const useVisualizerStore = defineStore("visualizer-store",
  () => {
    const { playerState } = storeToRefs(usePlayerStore());
    const { animationState } = storeToRefs(useAnimationStore());
    // Constants
    const frames = [useSimpleFrame];
    const currentIndex = 0;
    const lastTick = ref<DOMHighResTimeStamp | null>(null);
    let i = 0;
    const currentFrame = computed(() => frames[currentIndex]);

    // Player actions
    function initialize() {
      if (!playerState.value.isInitialized) {
        playerState.value.isInitialized = true;
        mainLoop(performance.now());
      }
    }
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
      initialize, play, pause
    }
  })
export default useVisualizerStore;
