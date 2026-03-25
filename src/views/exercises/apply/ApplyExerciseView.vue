
<template>

  <div class="h-full flex flex-col">

    <AlgorithmControlPanel class="h-15 h-1/5" />

    <div class="h-4/5 grow-1">

      <AlgorithmVisualizationPage :code="code" />

    </div>

  </div>

</template>

<script setup lang="ts">
  import AlgorithmControlPanel from "@/views/AlgorithmControlPanel.vue";
  import AlgorithmVisualizationPage from "@/views/pages/AlgorithmVisualizationPage.vue";
  import { getApplyExercise } from "./getApplyExercise";

  interface Props {
    exerciseUrl: string;
  }

  const props = defineProps<Props>();

  const { code } = getApplyExercise(props.exerciseUrl);
</script>

