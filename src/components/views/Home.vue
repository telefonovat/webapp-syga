<script setup lang="ts">
import Test from '../test/Test.vue';
import Split from '../utils/Split.vue';
</script>

<template>
  <div class="home-page">
    <split :initialSizes="[50, 50]">
      <test />
      <split :initialSizes="[50, 50]" direction="vertical">
        <test />
        <test />
      </split>
    </split>
  </div>
</template>

<style scoped></style>
