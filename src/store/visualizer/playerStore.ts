import { defineStore } from "pinia";
import { ref } from "vue";
const DEFAULT_TICK_PERIOD = 1500;
const usePlayerStore_ = defineStore("Player Store", () => {
  const isInitialized = ref(false);
  const isPlaying = ref(false);
  const lastTick = ref<null | number>(null);
  const tickPeriod_ = ref(DEFAULT_TICK_PERIOD);

  function shouldDoTick(timestamp: DOMHighResTimeStamp) {
    if (!lastTick.value) {
      return false;
    }
    return lastTick.value + tickPeriod_.value <= timestamp;
  }

  return {
    isInitialized, isPlaying,
    lastTick, tickPeriod_,

    shouldDoTick,
  }

});

export { usePlayerStore_ };
