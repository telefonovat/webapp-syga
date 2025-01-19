<script setup lang="ts">
import { useUserStore } from '@/store/user/userStore';
import LogInDialog from './LogInDialog.vue';
import RegisterAccountDialog from './RegisterAccountDialog.vue';
import LogoutButton from './LogoutButton.vue';
import MiniUserProfileChip from './MiniUserProfileChip.vue';
const userStore = useUserStore();
</script>

<template>
  <v-container class="d-flex flex-row align-center">
    <v-col>
      <MiniUserProfileChip />
    </v-col>
    <v-col v-if="userStore.isAuthenticated">
      <LogoutButton />
    </v-col>
    <v-container v-else>
      <LogInDialog>Log In</LogInDialog>
      <RegisterAccountDialog>Register</RegisterAccountDialog>
    </v-container>
  </v-container>
</template>

<style scoped></style>
