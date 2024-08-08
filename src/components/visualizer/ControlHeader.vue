<script setup lang="ts">
import IconButton from '../buttons/IconButton.vue';

const iconSize = 15;
</script>

<template>
  <div class="button-box">
    <icon-button icon="feather-play" :iconSize="iconSize" />
    <icon-button icon="feather-play" :iconSize="iconSize" />
    <icon-button icon="feather-play" :iconSize="iconSize" />
  </div>
</template>

<style scoped>
.button-box {
  display: flex;
  align-items: stretch;
  height: 10%;
}

.button-box>button {
  flex: 1;
}
</style>
