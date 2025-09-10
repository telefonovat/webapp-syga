<script setup lang="ts">
  import { router } from "@/router";
  import { useAuthStore } from "@/store/user/authStore";
  import {
    faFontAwesome,
    faHouse,
    faFloppyDisk,
    faHeart,
    faSun,
  } from "@fortawesome/free-regular-svg-icons";

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

    <button title="Save">

      <FontAwesomeIcon :icon="faFloppyDisk" />

    </button>

    <button>

      <FontAwesomeIcon :icon="faHeart" />

    </button>

    <button @click="router.push('/settings')">

      <FontAwesomeIcon :icon="faSun" />

    </button>

    <button @click="router.push(`/${authStore.username}/algorithms`)">
       {{
        authStore.isAuthenticated ? authStore.username : "Anonymous"
      }}
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

