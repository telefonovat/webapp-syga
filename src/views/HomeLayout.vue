<script setup lang="ts">
import NavSidebar from '@/components/NavSidebar.vue';
import UserAuthenticationPanel from '@/components/user/authentication/UserAuthenticationPanel.vue';
import { watch } from 'vue';
import { ref } from 'vue';

const isSidebarCollapsed = ref(false);
</script>

<template>
  <v-app>
    <v-layout>
      <v-app-bar density="compact" title="Syga">
        <template v-slot:prepend>
          <v-app-bar-nav-icon
            @click.stop="isSidebarCollapsed = !isSidebarCollapsed"
          ></v-app-bar-nav-icon>
        </template>

        <template v-slot:append>
          <UserAuthenticationPanel />
        </template>
      </v-app-bar>
      <v-main>
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
      </v-main>
    </v-layout>
  </v-app>
</template>

<style scoped>
.home-layout{
  display: flex;
  height: 100%;
}


.home-layout__main{
  flex-grow: 1;
  height: 100%;
  overflow-y: scroll;
}
</style>
