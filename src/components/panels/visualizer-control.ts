import { useVisualizerStore } from "@/stores/visualizer";
import { storeToRefs } from "pinia";

export function useVisualizerControl() {
  const store = useVisualizerStore();

  const { isPlaying } = storeToRefs(store);

  function togglePlay() {
    if (isPlaying.value) {
      store.pause();
    }
    else {
      store.play();
    }
  }

  return { isPlaying, togglePlay };
}
