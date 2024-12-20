<script setup lang="ts">
import Searchbar from './Searchbar.vue';
import AlgorithmMenu from './AlgorithmMenu.vue';
import UserProfile from './UserProfile.vue';
</script>

<template>
  <div class="user-dashboard mock">
    <Searchbar class="user-dashboard__searchbar" />
    <UserProfile class="user-dashboard__profile" />
    <AlgorithmMenu class="user-dashboard__body" />
  </div>
</template>

<style scoped>
.user-dashboard{
  display: grid;
  grid-template-areas: 
    'searchbar profile'
    'body body';
  grid-template-rows: 1fr 4fr;
  grid-template-columns: auto auto;

}

.user-dashboard__searchbar{
  grid-area: searchbar;
}

.user-dashboard__body{
  grid-area: body;
}

.user-dashboard__profile{
  grid-area: profile;
}
</style>
