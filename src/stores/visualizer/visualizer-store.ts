import { defineStore, storeToRefs } from "pinia";
import { useSimpleAnimation } from "@/utils/test-data/mockFrames"
import { computed, reactive } from "vue";
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
  const nFrames = computed(() => animationState.frames.length);
  const currentFrame = computed(() => animationState.frames[animationState.activeFrame]);
  function initializeTestState() {
    animationState.frames = useSimpleAnimation();
    animationState.activeFrame = 0;
  }
  function nextFrame() {
    animationState.activeFrame =
      animationState.activeFrame >= nFrames.value - 1 ?
        animationState.activeFrame : animationState.activeFrame + 1;
  }
  return {
    animationState,
    nFrames, currentFrame,
    initializeTestState, nextFrame,
  };
})
const useVisualizerStore = defineStore("visualizer-store",
  () => {
    // const playerStore = usePlayerStore();
    const animationStore = useAnimationStore();
    const { playerState } = storeToRefs(usePlayerStore());
    const { animationState,
      nFrames, currentFrame } = storeToRefs(useAnimationStore());

    const frame = computed(() => currentFrame.value);
    // Player actions
    function initialize() {
      animationStore.initializeTestState();
      console.log("Initializing");
      if (!playerState.value.isInitialized) {
        playerState.value.isInitialized = true;
        play();
      }
    }
    function play() {
      playerState.value.isPlaying = true;
      playerState.value.lastTick = performance.now();
      mainLoop(playerState.value.lastTick);
    }
    function pause() {
      playerState.value.isPlaying = false;

    }
    function mainLoop(timestamp: DOMHighResTimeStamp) {
      if (playerState.value.lastTick !== null &&
        shouldDoTick(playerState.value.TICK_PERIOD, playerState.value.lastTick, timestamp)) {
        animationStore.nextFrame();
        console.log(animationState.value.activeFrame);
        playerState.value.lastTick = timestamp;
      }
      window.requestAnimationFrame((timestamp) => mainLoop(timestamp));
    }

    return {
      frame,
      initialize, play, pause,
      mainLoop,
    }
  })
export default useVisualizerStore;
