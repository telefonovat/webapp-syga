import { defineStore } from "pinia";
import { ref } from "vue";

import { PlayerState } from "@/interfaces/visualizer/PlayerState";

const DEFAULT_TICK_PERIOD = 800;
const usePlayerStore_ = defineStore("player-store",
  () => {
    const state = ref<PlayerState>({
      isInitialized: false,
      isPlaying: false,
      lastTick: null,
      timeStamp: null,

      TICK_PERIOD: DEFAULT_TICK_PERIOD,
    });

    function shouldDoTick(timestamp: number) {
      return state.value.lastTick ?? performance.now() + state.value.TICK_PERIOD <= timestamp;
    }
    return { state, shouldDoTick };
  }
)

export { usePlayerStore_ };
