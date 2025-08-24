<script setup lang="ts">
  import HomeSharpIcon from "@mui/icons-material/HomeSharp";
</script>

<template>

  <div class="sidebar">

    <button>Home</button>

    <button>Save</button>

    <button>Favourites</button>

    <button>Settings</button>

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

