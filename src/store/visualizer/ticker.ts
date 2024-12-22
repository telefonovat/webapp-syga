import { defineStore } from 'pinia';
import { ref } from 'vue';

const DEFAULT_TICK_PERIOD = 750;

//REMINDER: Maybe this store is better named as ticker
const useTicker = defineStore('Player Store', () => {
  const isInitialized = ref(false);
  const isPlaying = ref(false);

  const lastTick = ref<null | number>(null);
  const tickPeriod_ = ref(DEFAULT_TICK_PERIOD);

  function shouldDoTick(timestamp: DOMHighResTimeStamp): boolean {
    if (!lastTick.value) {
      return false;
    }
    return lastTick.value + tickPeriod_.value <= timestamp;
  }

  function $reset() {
    isInitialized.value = false;
    isPlaying.value = false;
    lastTick.value = null;
    tickPeriod_.value = DEFAULT_TICK_PERIOD;
  }

  return {
    isInitialized,
    isPlaying,
    lastTick,
    tickPeriod_,

    shouldDoTick,

    $reset,
  };
});

export { useTicker };
