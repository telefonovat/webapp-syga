<script setup lang="ts">
import { apiClient } from '@/api/connector';
import { RegisterFormData } from '@/shared-types/user/Authentication';
import { toRaw } from 'vue';

import { reactive, ref } from 'vue';

const dialog = ref(false);

const registerFormData = reactive<RegisterFormData>({
  username: '',
  email: '',
  password: '',
});

const onSubmit = () => {
  apiClient.registerUser(toRaw(registerFormData)).catch((error) => {
    console.warn(error);
  });
};
</script>

<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn title="Register" v-bind="activatorProps">
        <v-icon icon="mdi-account-plus" />
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
      </v-card>
    </v-sheet>
  </v-dialog>
</template>

<style scoped></style>
