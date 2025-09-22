<script setup lang="ts">
  import { router } from "@/router";
  import AlgorithmSimpleViewCard from "./AlgorithmSimpleViewCard.vue";

  interface Props {
    name: string;
    uuid: string;
  }
  defineProps<Props>();
</script>

<template>

  <div>

    <AlgorithmSimpleViewCard
      @click="router.replace(`/algorithm/${uuid}`)"
      :name="name" />

    <button>share</button>

    <button>edit</button>

    <button>delete</button>

  </div>

</template>

<style scoped></style>

