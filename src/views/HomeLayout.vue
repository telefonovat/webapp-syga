<script setup lang="ts">
import NavSidebar from '@/components/NavSidebar.vue';
import { watch } from 'vue';
import { ref } from 'vue';

const isSidebarCollapsed = ref(false);
</script>

<template>
  <div class="home-layout">
    <aside
      class="home-layout__sidebar"
      :class="{ 'transparent-overlay': isSidebarCollapsed }"
    >
      <NavSidebar
        :is-collapsed="isSidebarCollapsed"
        @collapseSidebar="() => (isSidebarCollapsed = true)"
        @expandSidebar="() => (isSidebarCollapsed = false)"
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
