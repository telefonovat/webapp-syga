<script setup lang="ts">
  interface Props {
    name: string;
  }
  defineProps<Props>();
</script>

<template>

  <li>

    <button>{{ name }} </button>

  </li>

</template>

