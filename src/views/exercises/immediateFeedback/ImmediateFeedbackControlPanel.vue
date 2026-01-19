<template>

  <div class="if-control-panel">

    <button :disabled="currentIndex === 0" @click="prevStage()">
      Back
    </button>

    <button
      :disabled="currentIndex === stages.length - 1"
      @click="nextStage()">
      Next
    </button>

    <button @click="restart()">Restart</button>

  </div>

</template>

<script setup lang="ts">
  import { computed } from "vue";

  interface Props {
    stages: string[];
  }
  const props = defineProps<Props>();

  const stage = defineModel<string>();
  const currentIndex = computed(() => {
    if (!stage.value) return 0;
    return props.stages.indexOf(stage.value);
  });

  function nextStage() {
    if (!stage.value) return;

    if (currentIndex.value === props.stages.length - 1) return;
    stage.value =
      props.stages[(currentIndex.value + 1) % props.stages.length];
  }

  function prevStage() {
    if (!stage.value) return;

    if (currentIndex.value === 0) return;
    stage.value =
      props.stages[(currentIndex.value - 1) % props.stages.length];
  }

  function restart() {
    stage.value = props.stages[0];
  }
</script>

<style scoped>
  .if-control-panel{
  display: flex;
  justify-content: stretch;
}
</style>

