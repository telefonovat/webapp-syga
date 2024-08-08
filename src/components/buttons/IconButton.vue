<script setup lang="ts">

interface Props {
  text: string,
  icon?: string,
  iconSize: number,
}
const props = withDefaults(defineProps<Props>(), {

});


function click() {
  console.log("Button clicked!");
}
</script>t

<template>
  <button class="icon-button">
    {{ text }}
  </button>
</template>

<style scoped>
.icon-button {
  min-width: 50px;
  min-height: 50px;
}
</style>
