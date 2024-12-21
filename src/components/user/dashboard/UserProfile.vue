<script setup lang="ts">
import { router } from '@/router';
import { useEditorStore } from '@/store/editor/editorStore';
import { computed } from 'vue';

const editorStore = useEditorStore();
const username = computed(
  () => localStorage.getItem('username') || 'null'
);

function logout() {
  editorStore.$reset();
  localStorage.clear();
  router.replace('/');
}
</script>

<template>
  <div class="user-profile">
    <v-card>
      <div class="text-overline mb-1">Welcome {{ username }}</div>
    </v-card>
    <v-card>
      <v-btn text="Settings" />
      <v-btn text="Log out" @click="logout()" />
    </v-card>
  </div>
</template>

<style scoped>
.user-profile{
  height: 100%;
}
</style>
