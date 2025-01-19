<script setup lang="ts">
import { useUserStore } from '@/store/user/userStore';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();

const { isAuthenticated } = storeToRefs(userStore);
</script>

<template>
  <v-chip label>
    <v-icon icon="mdi-account-circle-outline" start />

    {{ isAuthenticated ? userStore.username : 'Anonymous' }}
  </v-chip>
</template>

<style scoped></style>
