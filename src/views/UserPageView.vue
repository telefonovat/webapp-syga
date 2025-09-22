
<script setup lang="ts">
  import UserAlgorithmsPanel from "./community/UserAlgorithmsPanel.vue";

  interface Props {
    targetUsername: string;
  }
  defineProps<Props>();
</script>

<template>

  <div>

    <UserAlgorithmsPanel :targetUsername="targetUsername" />

  </div>

</template>

