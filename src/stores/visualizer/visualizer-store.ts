import { defineStore, storeToRefs } from "pinia";
import { useSimpleAnimation } from "@/utils/test-data/mockFrames"
import { ref, computed, reactive } from "vue";
import { shouldDoTick } from "./utils";

import { AnimationState } from "@/interfaces/visualizer/AnimationState.ts";
import { PlayerState } from "@/interfaces/visualizer/PlayerState.ts";
import { useSimpleWelcomeCode } from "@/utils/test-data/mockCode.ts";
//Defaults
const DEFAULT_TICK_PERIOD = 800;

//Private store to represent state of the player component
const usePlayerStore = defineStore("store-player", () => {
  const playerState = reactive<PlayerState>({
    isInitialized: false,
    isPlaying: false,
    lastTick: null,
    timeStamp: null,

    TICK_PERIOD: DEFAULT_TICK_PERIOD,
  });

  //State mutation
  function initialize() {
    if (!playerState.isInitialized) {
      /* Some intialization here
       */
      playerState.isInitialized = true;
    }
  }
  return {
    playerState,
    initialize,
  };
});

//Private store for state of the animation
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
        animationState.activeFrame
        : (animationState.activeFrame + 1) % nFrames.value;
  }
  return {
    animationState,
    nFrames, currentFrame,
    initializeTestState, nextFrame,
  };
})
const useVisualizerStore = defineStore("visualizer-store",
  () => {
    const playerStore = usePlayerStore();
    const animationStore = useAnimationStore();
    const { playerState } = storeToRefs(usePlayerStore());
    const { currentFrame } = storeToRefs(useAnimationStore());

    const frame = computed(() => currentFrame.value);
    // Player actions
    function initialize() {
      animationStore.initializeTestState();
      if (!playerState.value.isInitialized) {
        playerStore.initialize();
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
        playerState.value.lastTick = timestamp;
      }
      window.requestAnimationFrame((timestamp) => mainLoop(timestamp));
    }

    //Backend interactions
    const code = ref(useSimpleWelcomeCode());
    function visualizeAlgorithm() {
      try {
        //TODO: Reset, start loading and set visualized code

        //TODO: Handle case if code is changed before response is received

      }
      finally {

      }
    }
    return {
      frame,
      initialize, play, pause,
      mainLoop,
    }
  })
export default useVisualizerStore;
