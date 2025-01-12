<script setup lang="ts">
import { User } from '@/shared-types/user/Authentication';
import SearchResultCard from './SearchResultsListCard.vue';

interface Props {
  usernames: User['username'][];
}

defineProps<Props>();
</script>

<template>
  <div>
    <SearchResultCard
      v-for="username in usernames"
      :username="username"
    />
  </div>
</template>

<style scoped></style>
