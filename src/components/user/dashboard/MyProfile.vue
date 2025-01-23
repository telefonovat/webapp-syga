<script setup lang="ts">
import { useUserStore } from '@/store/user/userStore';
import { computed } from 'vue';
import LogoutButton from '../authentication/LogoutButton.vue';

const userStore = useUserStore();
const username = computed(() => userStore.username);
</script>

<template>
  <v-container class="ma-0 pa-0">
    <v-card>
      <div class="text-overline mb-1">Welcome {{ username }}</div>
    </v-card>
    <v-card>
      <v-btn text="Settings" />
      <LogoutButton />
    </v-card>
  </v-container>
</template>

<style scoped>
.user-profile{
  height: 100%;
}
</style>
