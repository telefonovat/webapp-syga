<script setup lang="ts"></script>

<template>
  <div class="home-layout">
    <aside>
      <RouterView name="sidebar" class="home-layout__sidebar" />
    </aside>
    <main>
      <RouterView name="main" class="home-layout__main" />
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
  width: 10%;
}
</style>
