<script setup lang="ts">
  import NavSidebar from "@/components/NavSidebar.vue";
  import UserAuthenticationPanel from "@/components/user/authentication/UserAuthenticationPanel.vue";
  import { ref } from "vue";

  const isSidebarCollapsed = ref(false);
</script>

<template>

  <div class="home-layout">

    <RouterView name="main" />

    <footer class="home-layout__footer"></footer>

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
  min-height: 0.6rem;
  max-height: 1.3rem;
  background-color: #1e1e1e;
  margin: 0;
}
</style>

