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

const navigationDrawer = ref(false);

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
      <v-list>
        <v-list-item-icon>
          <v-btn title="Home" @click="goToHome()">
            <v-icon icon="mdi-home" />
          </v-btn>
        </v-list-item-icon>
        <v-list-item-icon>
          <v-btn title="Go to profile" @click="goToProfile()">
            <v-icon icon="mdi-account-badge" />
          </v-btn>
        </v-list-item-icon>
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
