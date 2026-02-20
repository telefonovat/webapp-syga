<script setup lang="ts">

</script>

<template>

  <div class="layout">

    <div class="primary-viewport">

      <RouterView name="main" />

    </div>

  </div>

</template>

<style scoped>
  .layout{
    height: 100%;
}

.primary-viewport{
  height: 100%;
  overflow-y: auto;
  }
</style>

