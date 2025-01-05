<script setup lang="ts">
import { router } from '@/router';
import { useEditorStore } from '@/store/editor/editorStore';
import { useUserStore } from '@/store/user/userStore';
import { computed } from 'vue';
import LogoutButton from '../LogoutButton.vue';

const editorStore = useEditorStore();
const userStore = useUserStore();
const username = computed(() => userStore.username);
</script>

<template>
  <div class="user-profile">
    <v-card>
      <div class="text-overline mb-1">Welcome {{ username }}</div>
    </v-card>
    <v-card>
      <v-btn text="Settings" />
      <LogoutButton />
    </v-card>
  </div>
</template>

<style scoped>
.user-profile{
  height: 100%;
}
</style>
