<script setup lang="ts">
import Split from "@/utils/Split.vue";
</script>

<template>
  <div class="home-view">
    <split :initialSizes="[50, 50]" direction="horizontal">
      <placeholder-div />
      <placeholder-div />
    </split>
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  min-height: 500px;
}
</style>
