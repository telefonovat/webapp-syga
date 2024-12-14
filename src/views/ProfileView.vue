<script setup lang="ts">
import { router } from '@/router';

import { useUserStore } from '@/store/user/userStore';
import { storeToRefs } from 'pinia';
import UserDashboard from '@/components/user/dashboard/UserDashboard.vue';
import MockFooter from '@/components/mock/sfc/MockFooter.vue';

const userStore = useUserStore();
const { isAuthenticated } = storeToRefs(userStore);
function logout() {
  localStorage.clear();
  router.replace('/');
}
</script>

<template>
  <UserDashboard />
  <v-btn @click="logout()" class="mt-3">Log out</v-btn>

  <MockFooter />
</template>
<style scoped></style>
