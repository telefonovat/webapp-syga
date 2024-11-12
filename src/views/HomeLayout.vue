<script setup lang="ts"></script>

<template>
  <div class="home-layout">
    <aside class="home-layout__sidebar">
      <RouterView
        @collapseSidebar="console.log('Collapsing')"
        @expandSidebar="console.log('Expanding')"
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
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: 
  'sidebar main'
  'sidebar main';
}

.home-layout__sidebar{ 
  grid-area: sidebar;
}
.home-layout__main{
  grid-area: main;
}
</style>
