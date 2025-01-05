<script setup lang="ts">
import { useUserStore } from '@/store/user/userStore';
import LogInDialog from './LogInDialog.vue';
import RegisterAccountDialog from './RegisterAccountDialog.vue';
import LogoutButton from './LogoutButton.vue';
const userStore = useUserStore();
</script>

<template>
  <v-container v-if="userStore.isAuthenticated">
    <LogoutButton />
  </v-container>
  <v-container v-else>
    <LogInDialog>Log In</LogInDialog>
    <RegisterAccountDialog>Register</RegisterAccountDialog>
  </v-container>
</template>

<style scoped></style>
