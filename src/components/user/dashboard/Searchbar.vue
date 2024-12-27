<script setup lang="ts">
import { ref } from 'vue';

defineEmits(['search-for-user']);

const searchBarValue = ref('');
</script>

<template>
  <div class="user-searchbar">
    <v-card title="Searchbar">
      <v-card-text>
        <v-text-field
          label="Search"
          v-model="searchBarValue"
          variant="filled"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="$emit('search-for-user', searchBarValue)">
          Go
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped></style>
