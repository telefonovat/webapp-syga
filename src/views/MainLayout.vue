<script setup lang="ts">
import HomeView from "./HomeView.vue";
</script>

<template>
  <div class="main-layout">
    <header class="header">
      <div>
        <placeholder-button />
        <placeholder-button />
        <placeholder-button />
      </div>
    </header>
    <main class="main">
      <home-view />
    </main>
    <div class="sidebar">
      <placeholder-button />
      <placeholder-button />
      <placeholder-button />
    </div>
    <footer class="footer">
      <div>
        <placeholder-button />
        <placeholder-button />
        <placeholder-button />
      </div>
    </footer>
  </div>
</template>

<style scoped>
.main-layout {
  height: 100%;
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  /* Set the sidebar width explicitly */
  grid-template-rows: 100px 1fr 60px;
  grid-template-areas:
    "sidebar header header"
    "sidebar content content"
    "footer footer footer";
}

.header {
  height: 100px;
  grid-area: header;
}

.main {
  display: display;
  height: auto;
  grid-area: content;
}

.footer {
  height: 60px;
  grid-area: footer;
}

.sidebar {
  width: auto;
  grid-area: sidebar;
}
</style>
