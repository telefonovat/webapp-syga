<script setup lang="ts">
  import HomeLayoutFooter from "./HomeLayoutFooter.vue";
  import AppSidebar from "./AppSidebar.vue";
</script>

<template>

  <div class="home-layout">

    <div class="main-container">

      <AppSidebar />

      <!-- Necessary to wrap RouterView in flexbox. Otherwise, CSS goes crazy -->

      <div
        class="main-view"
        style="display: flex; flex-direction: row">

        <RouterView name="extra" class="main-view-extra" />

        <RouterView name="main" class="main-view-main" />

      </div>

    </div>

    <HomeLayoutFooter class="home-layout__footer" />

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
  border-left: 1px solid #444;
}

.main-view-main{
    flex-grow: 10;
  }
.main-view-extra{
    flex-grow: 1;
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

