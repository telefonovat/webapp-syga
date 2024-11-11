<script setup lang="ts">
import MockButton from '@/components/mock/sfc/MockButton.vue';
import { router } from '@/router';

function goToHome() {
  router.replace('/');
}

function goToSettings() {
  router.replace('/settings');
}
</script>

<template>
  <div class="primary-sidebar">
    <MockButton text="Home" @click="goToHome()" />
    <MockButton text="Files" />
    <MockButton text="Favourites" />
    <MockButton text="Settings" @click="goToSettings()" />
  </div>
</template>

<style scoped>
.primary-sidebar{
  width: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100vh;
}
</style>
