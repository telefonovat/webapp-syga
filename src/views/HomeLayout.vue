<script setup lang="ts">
  import { ref } from "vue";
  import AlgorithmViewFooter from "./AlgorithmViewFooter.vue";

  const isSidebarCollapsed = ref(false);
</script>

<template>

  <div class="home-layout">

    <RouterView name="main" />

    <AlgorithmViewFooter
      class="home-layout__footer"></AlgorithmViewFooter>

  </div>

</template>

<style scoped>
  .home-layout{
  display: flex;
  flex-direction: column;
  height: 100%;

  & > *{
    flex-grow: 1;
  }
}

.top-panel{
  display: hidden;
  display: flex;
  border-bottom: 1px solid #444;
}

.home-layout__footer{
  min-height: 1rem;
  max-height: 2rem;
  background-color: #1e1e1e;
  margin: 0;
}
</style>

