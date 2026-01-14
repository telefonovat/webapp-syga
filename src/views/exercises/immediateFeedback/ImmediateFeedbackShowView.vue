<template>

  <AlgorithmView />

</template>

<script setup lang="ts">
  import AlgorithmView from "@/views/algorithmView/AlgorithmView.vue";

  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import { VisualizationFrame } from "@telefonovat/syga--contract";
  import { onBeforeMount, onMounted } from "vue";
  import { useEditorStore } from "@/store/editor/editorStore";

  interface Props {
    frames: VisualizationFrame[];
    algorithm: string;
  }
  const props = defineProps<Props>();

  function prepareVisualization(frames: VisualizationFrame[]) {
    const visualizerStore = useVisualizerStore();
    const editorStore = useEditorStore();

    visualizerStore.frames = frames;
    visualizerStore.activeFrameNumber = 0;

    editorStore.code = props.algorithm;
  }
  onBeforeMount(() => {
    prepareVisualization(props.frames);
  });
</script>

