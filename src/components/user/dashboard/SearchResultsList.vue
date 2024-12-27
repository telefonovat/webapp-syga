<script setup lang="ts">
import { User } from '@/shared-types/user/Authentication';
import SearchResultCard from './SearchResultCard.vue';

interface Props {
  usernames: User['username'][];
}

defineProps<Props>();
</script>

<template>
  <SearchResultCard
    v-for="username in usernames"
    :username="username"
  />
</template>

<style scoped></style>
