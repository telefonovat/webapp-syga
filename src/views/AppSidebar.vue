<script setup lang="ts">
  import { router } from "@/router";
  import { useAuthStore } from "@/store/user/authStore";

  const authStore = useAuthStore();
</script>

<template>

  <div class="sidebar">

    <button @click="router.replace('/')">Home</button>

    <button @click="router.replace('/featured')">Featured</button>

    <button>Save</button>

    <button>Favourites</button>

    <button @click="router.push('/settings')">Settings</button>

    <button>
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

