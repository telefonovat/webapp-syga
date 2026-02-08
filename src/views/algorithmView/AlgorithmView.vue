
<template>

  <AlgorithmControlPanel
    :class="{
      'border-bottom': !isPlaybackMode,
      'control-panel': !isPlaybackMode,
      'control-panel__floating': isPlaybackMode,
    }"
    @switch-mode="onPlaybackModeSwitch" />

  <div v-if="isPlaybackMode" class="h-full">

    <Playback />

  </div>

  <div v-else class="h-full">

    <AlgorithmVisualizationPage />

  </div>

</template>

<script setup lang="ts">
  import AlgorithmControlPanel from "@/views/AlgorithmControlPanel.vue";
  import AlgorithmVisualizationPage from "../pages/AlgorithmVisualizationPage.vue";
  import Playback from "@/components/visualizer/playback/Playback.vue";

  import { onMounted, ref } from "vue";
  import { usePrepareInitCode } from "./usePrepareInitCode";

  const isPlaybackMode = ref(false);
  function onPlaybackModeSwitch(mode: any) {
    isPlaybackMode.value = mode === "playback";
  }

  onMounted(async () => usePrepareInitCode());
</script>

<style scoped>
  .control-panel{
  min-height: 2.5rem;
  max-height: 2.75rem;
}

  .control-panel__floating{
    @apply fixed top-[20%] left-[25%] z-50 rounded-full w-1/2;
    background-color: var(--color-muted);

  }
</style>

