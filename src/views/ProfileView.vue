<script setup lang="ts">
import { useUserStore } from '@/store/user/userStore';
import { storeToRefs } from 'pinia';
import UserDashboard from '@/components/user/dashboard/UserDashboard.vue';

const userStore = useUserStore();
const { isAuthenticated } = storeToRefs(userStore);
</script>

<template>
  <v-container>
    <UserDashboard class="mock" />
  </v-container>
</template>
<style scoped></style>
