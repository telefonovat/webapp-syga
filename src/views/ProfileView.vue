<script setup lang="ts">
import { router } from '@/router';

import { useUserStore } from '@/store/user/userStore';
import { storeToRefs } from 'pinia';
import UserDashboard from '@/components/user/dashboard/UserDashboard.vue';
import MockFooter from '@/components/mock/sfc/MockFooter.vue';

const userStore = useUserStore();
const { isAuthenticated } = storeToRefs(userStore);
</script>

<template>
  <UserDashboard />

  <MockFooter />
</template>
<style scoped></style>
