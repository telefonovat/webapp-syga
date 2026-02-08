
<template>

  <div class="h-full">

    <AlgorithmControlPanel class="control-panel border-bottom" />

    <AlgorithmVisualizationPage />

  </div>

</template>

<script setup lang="ts">
  import AlgorithmControlPanel from "@/views/AlgorithmControlPanel.vue";
  import AlgorithmVisualizationPage from "../pages/AlgorithmVisualizationPage.vue";
  import { onMounted } from "vue";
  import { usePrepareInitCode } from "./usePrepareInitCode";

  onMounted(async () => usePrepareInitCode());
</script>

<style scoped>
  .control-panel{
  min-height: 2.5rem;
  max-height: 2.75rem;
}
</style>

