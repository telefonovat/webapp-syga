<script setup lang="ts">
import LogInDialog from '@/components/user/LogInDialog.vue';
import RegisterAccountDialog from './user/RegisterAccountDialog.vue';
import { router } from '@/router';
import { ref } from 'vue';

const isCollapsed = ref(
  localStorage.getItem('isCollapsed') === 'true' ? true : false
);

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

  localStorage.setItem(
    'isCollapsed',
    isCollapsed.value ? 'true' : 'false'
  );

  emit(isCollapsed.value ? 'collapseSidebar' : 'expandSidebar');
}
</script>

<template>
  <div class="navigation-header app-navigation-sidebar">
    <v-btn @click="toggleCollapse">
      <v-icon
        :icon="
          isCollapsed
            ? 'mdi-chevron-triple-right'
            : 'mdi-chevron-triple-left'
        "
      />
    </v-btn>
    <div class="app-navigation-menu" v-if="!isCollapsed">
      <v-btn title="Home" @click="goToHome()">
        <v-icon icon="mdi-home" />
      </v-btn>
      <LogInDialog />
      <RegisterAccountDialog />
      <v-btn title="Files">
        <v-icon icon="mdi-file" />
      </v-btn>
      <v-btn title="Favourites">
        <v-icon icon="mdi-star-outline" />
      </v-btn>
      <v-btn title="Settings" @click="goToSettings()">
        <v-icon icon="mdi-cog-outline" />
      </v-btn>
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
