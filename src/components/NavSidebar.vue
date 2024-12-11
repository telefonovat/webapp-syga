<script setup lang="ts">
import LogInDialog from '@/components/user/LogInDialog.vue';
import RegisterAccountDialog from './user/RegisterAccountDialog.vue';
import { router } from '@/router';
import { ref } from 'vue';

interface Props {
  isCollapsed: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['collapseSidebar', 'expandSidebar']);

const notLoggedInSnackBar = ref(false);

/*
 * Navigation
 */
function goToHome() {
  router.replace('/');
}

function goToSettings() {
  router.replace('/settings');
}

function goToProfile() {
  if (!localStorage.getItem('username')) {
    notLoggedInSnackBar.value = true;
    return;
  }

  router.replace(`/users/${localStorage.getItem('username')}`);
}

/*
 * User experience
 */

function toggleCollapse() {
  emit(props.isCollapsed ? 'expandSidebar' : 'collapseSidebar');
}
</script>

<template>
  <div class="navigation-header app-navigation-sidebar">
    <v-snackbar v-model="notLoggedInSnackBar">
      Please log in first
    </v-snackbar>
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
      <v-btn title="Go to profile" @click="goToProfile()">
        <v-icon icon="mdi-account-badge" />
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
