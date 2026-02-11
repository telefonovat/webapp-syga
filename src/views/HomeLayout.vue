<script setup lang="ts">

</script>

<template>

  <div class="layout">

    <div class="primary-viewport">

      <RouterView name="main" />

    </div>

    <!-- <HomeLayoutFooter class="footer border-top" /> -->

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

  .footer{
    width: 100%;
  }
</style>

