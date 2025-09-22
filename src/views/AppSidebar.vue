<script setup lang="ts">
  import { router } from "@/router";
  import { useAuthStore } from "@/store/user/authStore";

  import {
    faFontAwesome,
    faHouse,
    faHeart,
    faSun,
    faUserTie,
    faUserSecret,
  } from "@fortawesome/free-solid-svg-icons";

  const authStore = useAuthStore();

  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>

<template>

  <div class="sidebar">

    <button title="Home" @click="router.replace('/')">

      <FontAwesomeIcon :icon="faHouse" />

    </button>

    <button title="Featured" @click="router.replace('/featured')">

      <FontAwesomeIcon :icon="faFontAwesome" />

    </button>

    <button title="Favourites">

      <FontAwesomeIcon :icon="faHeart" />

    </button>

    <button title="Settings" @click="router.push('/settings')">

      <FontAwesomeIcon :icon="faSun" />

    </button>

    <button
      title="Your page"
      @click="router.push(`/${authStore.username}/algorithms`)">

      <FontAwesomeIcon
        :icon="
          authStore.isAuthenticated ? faUserTie : faUserSecret
        " />

    </button>

  </div>

</template>

<style scoped>
  .sidebar{
  display: flex;
  flex-direction: column;

  & *{
    min-height: 4rem;
    text-align: center;
}
}
</style>

