<script setup lang="ts">
import { signinUrl } from "@/api/endpoints";
  import { router } from "@/router";
  import { useAuthStore } from "@/store/user/authStore";
  import {
    AuthenticateRequestBody,
    AuthenticationSuccessBodySchema,
  } from "@telefonovat/syga--contract";
  import { ref } from "vue";

  const authStore = useAuthStore();

  const username = ref("");
  const password = ref("");

  const isSignInSuccessful = ref(false);

  function trySignIn() {
    const body: AuthenticateRequestBody = {
      username: username.value,
      password: password.value,
    };
    fetch(signinUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    }).then(async (response) => {
      const body = await response.json();

      const successBody = AuthenticationSuccessBodySchema.parse(body)
      const {username} = successBody.payload

      authStore.setIsAuthenticated(true);
      authStore.setUserInfo({ username });

      isSignInSuccessful.value = true;
      setTimeout(
        () => router.replace({ name: "algorithm-view" }),
        1500,
      );
    });
  }
</script>

<template>

  <div class="sign-in-form">

    <h2>Sign in</h2>

    <label class="sign-in-field">
       username
      <input v-model="username" type="text" />

    </label>

    <label class="sign-in-field">
       password
      <input v-model="password" type="password" />

    </label class="sign-in-field">

    <button class="popping-button" @click="trySignIn()">Sign in</button>

    <div v-if="isSignInSuccessful">
       Sign in was successful. Welcome {{ authStore.username }}
    </div>

  </div>

</template>

<style scoped>
  .sign-in-form{
    min-height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 2rem;
    background-color: #121417;
    gap: 3px;
}

    .sign-in-field{
      min-height: 2rem;
    }
</style>

