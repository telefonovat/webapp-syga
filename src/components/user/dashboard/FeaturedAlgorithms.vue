<script setup lang="ts">
  import FeaturedAlgorithmCard from "./FeaturedAlgorithmCard.vue";
</script>

<template>

  <ul class="featured-algorithms">

    <figcaption>Featured</figcaption>

    <FeaturedAlgorithmCard
      v-for="index in 10"
      :key="index"
      :name="`generic-algorithm-${index}`" />

  </ul>

</template>

<style scoped>
  .featured-algorithms{
  margin-left: 5px;
  list-style: none;
  overflow-y: scroll;
}
</style>

