<script setup lang="ts">
import RegisterAccountDialog from './user/authentication/RegisterAccountDialog.vue';
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
  <div>
    <v-snackbar v-model="notLoggedInSnackBar">
      Please log in first
    </v-snackbar>
    <v-navigation-drawer v-model="props.isCollapsed" temporary>
      <v-list nav>
        <v-list-item
          title="Home"
          value="Home"
          prepend-icon="mdi-home"
          @click="goToHome()"
        ></v-list-item>
        <v-list-item
          title="Dashboard"
          value="Dashboard"
          prepend-icon="mdi-code-tags"
          @click="goToProfile()"
        ></v-list-item>
        <v-list-item
          title="Settings"
          value="Settings"
          prepend-icon="mdi-cog-outline"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
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
