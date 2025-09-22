
<script setup lang="ts">
  import UserAlgorithmsPanel from "./community/UserAlgorithmsPanel.vue";

  interface Props {
    targetUsername: string;
  }
  defineProps<Props>();
</script>

<template>

  <div class="user-page-view">

    <div class="left">Some profile stuff</div>

    <UserAlgorithmsPanel
      class="right"
      :targetUsername="targetUsername" />

  </div>

</template>

<style scoped>
  .user-page-view{
    display: flex;
    align-items: stretch;
}
  .left{
    flex-grow: 2;
    border-right: 1px solid #444;
  }
  .right{
    flex-grow: 4;
  }
</style>

