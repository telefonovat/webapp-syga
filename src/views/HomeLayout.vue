<script setup lang="ts">
  import AlgorithmViewFooter from "./AlgorithmViewFooter.vue";
  import AppSidebar from "./AppSidebar.vue";
</script>

<template>

  <div class="home-layout">

    <div class="main-container">

      <AppSidebar />

      <!-- Necessary to wrap RouterView in flexbox. Otherwise, CSS goes crazy -->

      <div
        class="main-view"
        style="display: flex; flex-direction: column">

        <RouterView name="main" />

      </div>

    </div>

    <AlgorithmViewFooter class="home-layout__footer" />

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

.main-container{
  display: flex;
  height: 100%;
}

.main-view{
  flex: 1 1 90%;
}

.sidebar{
  flex: 1 1 0%;
  min-width: 1.5rem;
}


.home-layout__footer{
  min-height: 1rem;
  max-height: 1.5rem;
  background-color: #1e1e1e;
  margin: 0;
}
</style>

