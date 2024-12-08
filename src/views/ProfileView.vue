<script setup lang="ts">
import { router } from '@/router';

import { useUserStore } from '@/store/user/userStore';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { isAuthenticated } = storeToRefs(userStore);
function logout() {
  localStorage.clear();
  router.replace('/');
}
</script>

<template>
  <div
    v-if="isAuthenticated"
    class="d-flex flex-column justify-center align-center"
    style="height: 100vh"
  >
    <v-card>
      Here lies all the user info you wanted to see. Unfortunately, we
      have not implemented the views yet.
    </v-card>
    <v-btn @click="logout()" class="mt-3">Log out</v-btn>
  </div>
  <div v-else>
    <v-card>Please log in first</v-card>
  </div>
</template>
<style scoped></style>
