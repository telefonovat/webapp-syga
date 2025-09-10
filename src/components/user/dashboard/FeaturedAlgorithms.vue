<script setup lang="ts">
  import AlgorithmCard from "./AlgorithmCard.vue";
</script>

<template>

  <ul class="featured-algorithms">

    <h4>Featured</h4>

    <AlgorithmCard
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

