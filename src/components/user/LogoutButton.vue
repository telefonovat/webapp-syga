<script setup lang="ts">
import { router } from '@/router';
import { useEditorStore } from '@/store/editor/editorStore';
import { useUserStore } from '@/store/user/userStore';

const editorStore = useEditorStore();
const userStore = useUserStore();

function logout() {
  editorStore.$reset();
  userStore.$reset();
  router.replace('/');
}
</script>

<template>
  <v-btn text="Log out" @click="logout()" />
</template>

<style scoped></style>
