<script setup lang="ts">
  import NavSidebar from "@/components/NavSidebar.vue";
  import UserAuthenticationPanel from "@/components/user/authentication/UserAuthenticationPanel.vue";
  import { ref } from "vue";

  const isSidebarCollapsed = ref(false);
</script>

<template>

  <div class="h-100">

    <div class="top-panel">

      <button @click.stop="isSidebarCollapsed = !isSidebarCollapsed">
         Toggle collapse
      </button>

      <UserAuthenticationPanel />

    </div>

    <div class="home-layout__main">

      <RouterView name="main" />

    </div>

  </div>

</template>

<style scoped>
  .home-layout{
  display: flex;
  height: 100%;
}

.top-panel{
  display: flex;
  border-bottom: 1px solid #444;
}
.home-layout__main{
  flex-grow: 1;
  height: 100%;
}
</style>

