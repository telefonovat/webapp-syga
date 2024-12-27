<script setup lang="ts">
import Searchbar from './Searchbar.vue';
import AlgorithmMenu from './AlgorithmMenu.vue';
import UserProfile from './UserProfile.vue';
import SearchResultsList from './SearchResultsList.vue';

import { searchForUser } from '@/api/connector';
import { User } from '@/shared-types/user/Authentication';
import { ref } from 'vue';

type DashboardBody = 'algorithm-menu' | 'search-results';

const displayedBody = ref<DashboardBody>('algorithm-menu');

const searchResults = ref<User['username'][]>([]);

const searchForUsername = (username: string) => {
  searchForUser(username).then((usernames) => {
    console.log(usernames);
    searchResults.value = usernames;
  });

  displayedBody.value = 'search-results';
};
</script>

<template>
  <div class="user-dashboard mock">
    <Searchbar
      @search-for-user="(username) => searchForUsername(username)"
      class="user-dashboard__searchbar"
    />
    <UserProfile class="user-dashboard__profile" />
    <AlgorithmMenu
      v-if="displayedBody === 'algorithm-menu'"
      class="user-dashboard__body"
    />
    <SearchResultsList
      v-else-if="displayedBody === 'search-results'"
      class="user-dashboard__body"
      :usernames="searchResults"
    />
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
