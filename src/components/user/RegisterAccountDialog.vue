<script setup lang="ts">
import { registerUser, loginUser } from '@/api/connector';
import { RegisterFormData } from '@/shared-types/user/Authentication';
import { toRaw } from 'vue';

import { reactive, ref } from 'vue';

const dialog = ref(false);
const registerSuccessSnackBar = ref(false);
const registerFailedSnackBar = ref(false);

const registerFormData = reactive<RegisterFormData>({
  username: '',
  email: '',
  password: '',
});

const onSubmit = async () => {
  try {
    await registerUser(toRaw(registerFormData));

    const token = await loginUser({
      username: registerFormData.username,
      password: registerFormData.password,
    });

    localStorage.setItem('token', token);
    localStorage.setItem('username', registerFormData.username);

    registerSuccessSnackBar.value = true;

    dialog.value = false;
  } catch (error: any) {
    registerFailedSnackBar.value = true;
  }
};
</script>

<template>
  <v-dialog v-model="dialog">
    <v-snackbar v-model="registerSuccessSnackBar">
      We automatically logged in for you. Enjoy!
    </v-snackbar>
    <v-snackbar v-model="registerFailedSnackBar">
      Registration failed!
    </v-snackbar>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn title="Register" v-bind="activatorProps">
        <v-icon icon="mdi-account-plus" />
        <slot />
      </v-btn>
    </template>
    <v-sheet class="mx-auto" width="300">
      <v-card
        prepend-icon="mdi-account"
        title="Register your account"
      >
        <v-form @submit.prevent="onSubmit">
          <v-text-field
            v-model="registerFormData.username"
            label="Username*"
            required
          />

          <v-text-field
            v-model="registerFormData.email"
            label="Email"
            required
          />
          <v-text-field
            v-model="registerFormData.password"
            label="Password*"
            type="password"
            required
          />
          <v-btn class="mt-2" type="submit" block>Register</v-btn>
        </v-form>

        <v-btn text="Close" @click="dialog = false" />
      </v-card>
    </v-sheet>
  </v-dialog>
</template>

<style scoped></style>
