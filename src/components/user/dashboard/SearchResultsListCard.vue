<script setup lang="ts">
import { router } from '@/router';
import { User } from '@/shared-types/user/Authentication';
interface Props {
  username: User['username'];
}

defineProps<Props>();
</script>

<template>
  <v-card>
    <v-card-text>
      {{ username }}
    </v-card-text>

    <v-card-actions>
      <v-btn @click="router.replace(`/users/view/${username}`)">
        View
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
