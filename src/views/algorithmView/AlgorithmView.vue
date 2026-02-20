
<template>

  <div class="h-full flex flex-col">

    <AlgorithmControlPanel
      :class="{
        'border-bottom': !isPlaybackMode,
        'control-panel': !isPlaybackMode,
        'control-panel__floating': isPlaybackMode,
      }"
      class="h-15 h-1/5"
      @switch-mode="onPlaybackModeSwitch" />

    <div v-if="isPlaybackMode" class="h-full">

      <Playback />

    </div>

    <div v-else class="h-4/5 grow-1">

      <AlgorithmVisualizationPage />

    </div>

  </div>

</template>

<script setup lang="ts">
  import AlgorithmControlPanel from "@/views/AlgorithmControlPanel.vue";
  import AlgorithmVisualizationPage from "../pages/AlgorithmVisualizationPage.vue";
  import Playback from "@/components/visualizer/playback/Playback.vue";

  import { ref } from "vue";

  const isPlaybackMode = ref(false);
  function onPlaybackModeSwitch(mode: any) {
    isPlaybackMode.value = mode === "playback";
  }
</script>

<style scoped>
  .control-panel{
  min-height: 2.5rem;
}

  .control-panel__floating{
    @apply fixed top-[20%] left-[25%] z-50 rounded-full w-1/2;
    background-color: var(--color-muted);

  }
</style>

