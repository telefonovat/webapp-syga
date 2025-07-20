import { useVisualizerStore } from "@/store/visualizer/visualizerStore";

export function useVisualizerCommands() {
  const store = useVisualizerStore();

  function togglePlay() {
    if (store.isPlaying) {
      store.pause();
    } else {
      store.play();
    }
  }

  function jumpToStart() {
    store.setActiveFrame(0);
  }
  function jumpToEnd() {
    store.setActiveFrame(store.numberOfFrames - 1);
  }

  function prevFrame() {
    store.setActiveFrame(store.activeFrameNumber - 1);
  }
  function nextFrame() {
    store.setActiveFrame(store.activeFrameNumber + 1);
  }

  return {
    togglePlay,
    jumpToStart,
    jumpToEnd,
    prevFrame,
    nextFrame,
  };
}
