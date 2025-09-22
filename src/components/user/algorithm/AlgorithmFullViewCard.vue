<script setup lang="ts">
  import { router } from "@/router";
  import AlgorithmSimpleViewCard from "./AlgorithmSimpleViewCard.vue";
  import { useClipboard } from "@vueuse/core";
  import { getGlobalUrl } from "@/api";
  import { deleteAlgorithm } from "@/store/editor/deleteAlgorithm";

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

    <button
      @click="
        () => {
          useClipboard({
            source: getGlobalUrl(`/algorithm/${uuid}`),
          }).copy();
        }
      ">
       copy link
    </button>

    <button>edit</button>

    <button @click="() => deleteAlgorithm(uuid)"> delete </button>

  </div>

</template>

<style scoped></style>

