<script setup lang="ts">
import MockButton from '@/components/mock/sfc/MockButton.vue';
import { router } from '@/router';
import { ref } from 'vue';

const isCollapsed = ref(false);

const emit = defineEmits(['collapseSidebar', 'expandSidebar']);

/*
 * Navigation
 */
function goToHome() {
  router.replace('/');
}

function goToSettings() {
  router.replace('/settings');
}

/*
 * User experience
 */

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value;

  emit(isCollapsed.value ? 'collapseSidebar' : 'expandSidebar');
}
</script>

<template>
  <div class="navigation-header app-navigation-sidebar">
    <MockButton
      :text="isCollapsed ? '>>' : '<<'"
      @click="toggleCollapse()"
    />
    <div class="app-navigation-menu" v-if="!isCollapsed">
      <MockButton text="Home" @click="goToHome()" />
      <MockButton text="Files" />
      <MockButton text="Favourites" />
      <MockButton text="Settings" @click="goToSettings()" />
    </div>
  </div>
</template>

<style scoped>
.app-navigation-sidebar{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 150px;
}
.app-navigation-menu{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 75%;

  *{
    min-height: 50px;
    min-width: 50px;
    margin: 3px;
  }

}
</style>
