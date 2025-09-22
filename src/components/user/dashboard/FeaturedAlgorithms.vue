<script setup lang="ts">
  import AlgorithmSimpleViewCard from "../algorithm/AlgorithmSimpleViewCard.vue";
</script>

<template>

  <ul class="featured-algorithms">

    <h4>Featured</h4>

    <li v-for="index in 10" :key="index">

      <AlgorithmSimpleViewCard :name="`generic-algorithm-${index}`" />

    </li>

  </ul>

</template>

<style scoped>
  .featured-algorithms{
  margin-left: 5px;
  list-style: none;
  overflow-y: scroll;
}
</style>

