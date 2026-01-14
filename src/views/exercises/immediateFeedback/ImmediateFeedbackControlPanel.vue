<template>

  <div class="if-control-panel">

    <button @click="prevStage()">Back</button>

    <button @click="nextStage()">Next</button>

    <button @click="restart()">Restart</button>

  </div>

</template>

<script setup lang="ts">
  interface Props {
    stages: string[];
  }
  const props = defineProps<Props>();

  const stage = defineModel<string>();

  function nextStage() {
    if (!stage.value) return;

    const index = props.stages.indexOf(stage.value);
    if (index === props.stages.length - 1) return;
    stage.value = props.stages[(index + 1) % props.stages.length];
  }

  function prevStage() {
    if (!stage.value) return;

    const index = props.stages.indexOf(stage.value);
    if (index === 0) return;
    stage.value = props.stages[(index - 1) % props.stages.length];
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

