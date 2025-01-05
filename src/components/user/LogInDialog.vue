<script setup lang="ts">
import { reactive } from 'vue';
import { ref } from 'vue';

import { LogInFormData } from '@/shared-types/user/Authentication';
import { loginUser } from '@/api/connector';
import { toRaw } from 'vue';
import { useUserStore } from '@/store/user/userStore';

const userStore = useUserStore();

const dialog = ref(false);

const loginSuccessSnackBar = ref(false);
const loginFailedSnackBar = ref(false);

const logInFormData = reactive<LogInFormData>({
  username: '',
  password: '',
});

const onSubmit = () => {
  loginUser(toRaw(logInFormData))
    .then(() => {
      loginSuccessSnackBar.value = true;

      //Close dialog
      dialog.value = false;

      userStore.isAuthenticated = true;
    })
    .catch((error) => {
      console.warn(error);
      loginFailedSnackBar.value = true;
    });
};
</script>

<template>
  <!-- Snack bars for feedback on log in status -->
  <v-snackbar v-model="loginSuccessSnackBar">
    Log in successful
  </v-snackbar>
  <v-snackbar v-model="loginFailedSnackBar">Log in failed</v-snackbar>

  <v-dialog v-model="dialog">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn title="Log in" v-bind="activatorProps">
        <v-icon icon="mdi-login" />
        <slot />
      </v-btn>
    </template>
    <v-sheet class="mx-auto" width="300">
      <v-card
        prepend-icon="mdi-account"
        title="Log Into Your Account"
      >
        <v-form @submit.prevent="onSubmit">
          <v-text-field
            v-model="logInFormData.username"
            label="Username*"
            required
          />

          <v-text-field
            v-model="logInFormData.password"
            label="Password*"
            type="password"
            required
          />
          <v-btn class="mt-2" type="submit" block>Log in</v-btn>
        </v-form>

        <v-btn text="Close" @click="dialog = false" />
      </v-card>
    </v-sheet>
  </v-dialog>
</template>

<style scoped></style>
