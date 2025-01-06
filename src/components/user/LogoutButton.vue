<script setup lang="ts">
import { router } from '@/router';
import { useEditorStore } from '@/store/editor/editorStore';
import { useUserStore } from '@/store/user/userStore';
import { useVisualizerStore } from '@/store/visualizer/visualizerStore';

const editorStore = useEditorStore();
const userStore = useUserStore();
const visualizerStore = useVisualizerStore();

function logout() {
  editorStore.$reset();
  userStore.$reset();
  visualizerStore.$reset();
  router.replace('/');
}
</script>

<template>
  <v-btn text="Log out" @click="logout()" />
</template>

<style scoped></style>
