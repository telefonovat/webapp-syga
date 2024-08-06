<script setup lang="ts">

interface Props {
  icon: string,
  iconSize: number,
}
const props = withDefaults(defineProps<Props>(), {

});


function click() {
  console.log("Button clicked!");
}
</script>

<template>
  <button @click="click">
    <icon :icon="icon" :iconSize="iconSize"></icon>

  </button>
</template>

<style scoped></style>
