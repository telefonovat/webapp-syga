<script setup lang="ts">
interface Props {
  title: string;
  tags: string[];
}

defineProps<Props>();
</script>

<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-actions>
      <v-btn>Open</v-btn>
      <v-btn>Delete</v-btn>
      <v-btn>Share</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
