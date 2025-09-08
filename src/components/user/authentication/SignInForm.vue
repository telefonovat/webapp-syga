<script setup lang="ts">
  import { signinUrl } from "@/api/endpoints";
  import { router } from "@/router";
  import { useAuthStore } from "@/store/user/authStore";
  import {
    AuthenticateRequest,
    isAuthenticateSuccessResponse,
  } from "@telefonovat/syga--contract";
  import { ref } from "vue";

  const username = ref("");
  const password = ref("");

  function trySignIn() {
    const authStore = useAuthStore();
    const body: AuthenticateRequest = {
      username: username.value,
      password: password.value,
    };
    fetch(signinUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(async (response) => {
      const body = await response.json();

      //TODO: Check if response is deformed

      if (!body.success) {
        console.log("Log in failed...");
        return;
      }
      if (!body.payload) {
        console.log("Missing payload");
        return;
      }

      if (isAuthenticateSuccessResponse(body.payload)) {
        authStore.setAuthToken({
          accessToken: body.payload.accessToken,
          refreshToken: body.payload.refreshToken,
        });
        authStore.setIsAuthenticated(true);

        router.replace({ path: "/" });
      }
    });
  }
</script>

<template>

  <div class="sign-in-form">

    <h1>Sign in</h1>

    <label>
       username
      <input v-model="username" type="text" />

    </label>

    <label>
       password
      <input v-model="password" type="text" />

    </label>

    <button @click="trySignIn()">Sign in</button>

  </div>

</template>

<style scoped>
  .sign-in-form{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>

