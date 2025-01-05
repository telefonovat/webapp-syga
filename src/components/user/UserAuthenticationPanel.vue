<script setup lang="ts">
import { useUserStore } from '@/store/user/userStore';
import LogInDialog from './LogInDialog.vue';
const userStore = useUserStore();
</script>

<template>
  <v-container v-if="userStore.isAuthenticated">
    <v-btn icon="mdi-dots-vertical" />
    <v-btn icon="mdi-dots-vertical" />
  </v-container>
  <v-container v-else>
    <LogInDialog />
    <v-btn icon="mdi-dots-vertical" />

    <v-btn icon="mdi-dots-vertical" />
    <v-btn icon="mdi-dots-vertical" />
  </v-container>
</template>

<style scoped></style>
