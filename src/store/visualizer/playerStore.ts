import { defineStore } from 'pinia';
import { ref } from 'vue';

const DEFAULT_TICK_PERIOD = 750;

//REMINDER: Maybe this store is better named as ticker
const usePlayerStore_ = defineStore('Player Store', () => {
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

  return {
    isInitialized,
    isPlaying,
    lastTick,
    tickPeriod_,

    shouldDoTick,
  };
});

export { usePlayerStore_ };
