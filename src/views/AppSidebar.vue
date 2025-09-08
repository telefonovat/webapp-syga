<script setup lang="ts">
  import { router } from "@/router";
</script>

<template>

  <div class="sidebar">

    <button @click="router.replace('/')">Home</button>

    <button>Featured</button>

    <button>Save</button>

    <button>Favourites</button>

    <button @click="router.push('/settings')">Settings</button>

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

