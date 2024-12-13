<script setup lang="ts">
import { computed } from 'vue';
const username = computed(
  () => localStorage.getItem('username') || 'null'
);
</script>

<template>
  <div class="user-profile">
    <v-card>
      <div class="text-overline mb-1">Welcome {{ username }}</div>
    </v-card>
    <v-card>
      <v-btn text="Settings" />
      <v-btn text="Log out" />
    </v-card>
  </div>
</template>

<style scoped>
.user-profile{
  height: 100%;
}
</style>
