import { defineStore, storeToRefs } from "pinia";
import { useAnimationStore_ } from "./animationStore";
import { computed } from "vue";
import { usePlayerStore_ } from "./playerStore";
import { Frame } from "@/shared/Frame";

const useVisualizerStore = defineStore("Visualizer Store",
  () => {
    const animationStore_ = useAnimationStore_();
    const playerStore_ = usePlayerStore_();

    const { isInitialized: isPlayerInitialized,
      isPlaying, lastTick } = storeToRefs(playerStore_);

    const currentFrame = computed(() => animationStore_.currentFrame);

    function initialize() {
      isPlayerInitialized.value = true;
    }
    function mainLoop(timestamp: DOMHighResTimeStamp) {
      if (lastTick.value !== null &&
        isPlaying.value &&
        playerStore_.shouldDoTick(timestamp)) {
        console.log("Next!");
        animationStore_.nextFrame();
        lastTick.value = timestamp;
      }
      window.requestAnimationFrame((timestamp) => mainLoop(timestamp));
    }
    //User commands
    function play() {
      if (!isPlayerInitialized.value) {
        initialize();
      }
      lastTick.value = performance.now();
      isPlaying.value = true;
      mainLoop(lastTick.value);
    }
    function pause() {
      isPlaying.value = false;
    }

    //Axios can do this
    function setFrames(frames: Frame[]) {
      animationStore_.setFrames(frames);
    }

    return {
      currentFrame,
      play, pause,

      setFrames,

      mainLoop,
    }
  });

export { useVisualizerStore };
