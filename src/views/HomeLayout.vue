<script setup lang="ts">
import { ref } from 'vue';

const isSidebarTransparent = ref(false);
</script>

<template>
  <div class="home-layout">
    <aside
      class="home-layout__sidebar"
      :class="{ 'transparent-overlay': isSidebarTransparent }"
    >
      <RouterView
        @collapseSidebar="() => (isSidebarTransparent = true)"
        @expandSidebar="() => (isSidebarTransparent = false)"
        name="sidebar"
      />
    </aside>
    <main class="home-layout__main mock">
      <RouterView name="main" />
    </main>
  </div>
</template>

<style scoped>
.home-layout{
  display: flex;
}


.home-layout__main{
  flex-grow: 1;
}
</style>
