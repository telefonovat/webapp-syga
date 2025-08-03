import { defineStore, storeToRefs } from "pinia";
import { useAnimationStore_ } from "./animationStore";
import { computed, ref } from "vue";
import { VisualizationFrame } from "@telefonovat/syga--contract";

const TICK_PERIOD_MS = 750;

export const useVisualizerStore = defineStore("Visualizer state", {
  state: () => ({
    frames: [] as VisualizationFrame[],
    activeFrameNumber: 0,

    isPlaying: false,

    // internal ticker
    lastTick: performance.now(),
    intervalId: -1, // from window.setInterval
  }),
  getters: {
    numberOfFrames(state) {
      return state.frames.length;
    },

    currentFrame(state) {
      if (
        state.activeFrameNumber < 0 ||
        state.activeFrameNumber >= this.numberOfFrames
      ) {
        return null;
      }
      return state.frames[state.activeFrameNumber];
    },

    shouldTick(state) {
      return performance.now() - state.lastTick >= TICK_PERIOD_MS;
    },
  },
  actions: {
    nextFrame() {
      if (this.numberOfFrames === 0) {
        throw new Error("Primitive error: there are no frames");
      }
      this.activeFrameNumber =
        (this.activeFrameNumber + 1) % this.numberOfFrames;
    },
    prevFrame() {
      if (this.numberOfFrames === 0) {
        throw new Error("Primitive error: there are no frames");
      }
      this.activeFrameNumber =
        (this.activeFrameNumber - 1) % this.numberOfFrames;
    },

    tryTick() {
      if (!this.isPlaying) {
        return;
      }

      this.nextFrame();

      window.clearInterval(this.intervalId);
      this.intervalId = window.setInterval(
        () => window.requestAnimationFrame(this.tryTick),
        TICK_PERIOD_MS,
      );
    },

    play() {
      this.intervalId = window.setInterval(
        this.tryTick,
        TICK_PERIOD_MS,
      );
    },
    pause() {
      window.clearInterval(this.intervalId);
      this.intervalId = -1;
    },
  },
});
