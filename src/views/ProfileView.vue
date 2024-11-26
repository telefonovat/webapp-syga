<script setup lang="ts">
import { router } from '@/router';

function logout() {
  localStorage.clear();
  router.replace('/');
}
</script>

<template>
  <div
    class="d-flex flex-column justify-center align-center"
    style="height: 100vh"
  >
    <v-card>
      Here lies all the user info you wanted to see. Unfortunately, we
      have not implemented the views yet.
    </v-card>
    <v-btn @click="logout()" class="mt-3">Log out</v-btn>
  </div>
</template>
<style scoped></style>
