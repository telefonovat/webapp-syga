<script setup lang="ts">
import { reactive } from 'vue';
import { ref } from 'vue';

import { LogInFormData } from '@/shared-types/user/Authentication';
import { apiClient } from '@/api/connector';
import { toRaw } from 'vue';

const dialog = ref(false);

const loginSuccessSnackBar = ref(false);
const loginFailedSnackBar = ref(false);

const logInFormData = reactive<LogInFormData>({
  username: '',
  password: '',
});

const onSubmit = () => {
  apiClient
    .loginUser(toRaw(logInFormData))
    .then((token) => {
      //Savid JWT token to storage
      localStorage.setItem('token', token);
      localStorage.setItem('username', logInFormData.username);
      console.log('Set');
      loginSuccessSnackBar.value = true;

      //Close dialog
      dialog.value = false;
    })
    .catch((error) => {
      console.warn(error);
      loginFailedSnackBar.value = true;
    });
};
</script>

<template>
  <v-snackbar v-model="loginSuccessSnackBar">
    Log in successful
  </v-snackbar>
  <v-snackbar v-model="loginFailedSnackBar">Log in failed</v-snackbar>

  <v-dialog v-model="dialog">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn title="Log in" v-bind="activatorProps">
        <v-icon icon="mdi-login" />
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
