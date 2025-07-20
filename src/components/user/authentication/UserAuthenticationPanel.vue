<script setup lang="ts">
  import { useUserStore } from "@/store/user/userStore";
  import LogInDialog from "./LogInDialog.vue";
  import RegisterAccountDialog from "./RegisterAccountDialog.vue";
  import LogoutButton from "./LogoutButton.vue";
  import MiniUserProfileChip from "./MiniUserProfileChip.vue";
  const userStore = useUserStore();
</script>

<template>

  <div class="d-flex flex-row align-center">

    <div>

      <MiniUserProfileChip />

    </div>

    <div v-if="userStore.isAuthenticated">

      <LogoutButton />

    </div>

    <div v-else>

      <LogInDialog>Log In</LogInDialog>

      <RegisterAccountDialog>Register</RegisterAccountDialog>

    </div>

  </div>

</template>

<style scoped></style>

