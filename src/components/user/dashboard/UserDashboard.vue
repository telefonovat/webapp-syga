<script setup lang="ts">
import Searchbar from './Searchbar.vue';
import AlgorithmMenu from './AlgorithmMenu.vue';
import MyProfile from './MyProfile.vue';
import SearchResultsList from './SearchResultsList.vue';

import { searchForUser } from '@/api/connector';
import { User } from '@/shared-types/user/Authentication';
import { ref } from 'vue';
import { useUserStore } from '@/store/user/userStore';

type DashboardBody = 'algorithm-menu' | 'search-results';

const userStore = useUserStore();

const displayedBody = ref<DashboardBody>('algorithm-menu');

const searchResults = ref<User['username'][]>([]);

const searchForUsername = (username: string) => {
  searchForUser(username).then((usernames) => {
    searchResults.value = usernames.filter(
      (username) => username !== userStore.username
    );
  });

  displayedBody.value = 'search-results';
};
</script>

<template>
  <v-container style="border-color: blue" class="ma-0 pa-0">
    <v-row class="ma-0 pa-0">
      <v-col class="ma-0 pa-0">
        <Searchbar
          @search-for-user="(username) => searchForUsername(username)"
        />
      </v-col>
      <v-col>
        <MyProfile />
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-0">
      <v-col class="ma-0 pa-0">
        <AlgorithmMenu
          v-if="displayedBody === 'algorithm-menu'"
          class="ma-0 pa-0"
        />

        <SearchResultsList
          v-else-if="displayedBody === 'search-results'"
          :usernames="searchResults"
          class="ma-0 pa-0"
        />
      </v-col>
    </v-row>
  </v-container>
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
