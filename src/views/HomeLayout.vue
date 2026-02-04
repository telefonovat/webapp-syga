<script setup lang="ts">
  import HomeLayoutFooter from "./HomeLayoutFooter.vue";
</script>

<template>

  <div class="layout">

    <div class="primary-viewport">

      <RouterView name="main" />

    </div>

    <HomeLayoutFooter class="home-layout__footer" />

  </div>

</template>

<style scoped>
  .layout{
    display: grid;
    grid-template-rows: 1fr auto;
    height: 100vh;
}

.primary-viewport{
  overflow-y: auto;
}
</style>

