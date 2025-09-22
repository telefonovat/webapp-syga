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

  <div class="algorithm-full-view-card">

    <AlgorithmSimpleViewCard
      class="simple-view"
      @click="router.replace(`/algorithm/${uuid}`)"
      :name="name" />

    <div class="button-group">

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

  </div>

</template>

<style scoped>
  .algorithm-full-view-card{
    display: flex;
    justify-content: space-between;

    background-color: #0d1117;
    border: 1px solid #444;
    border-radius: 0.5rem;

    margin: 0.5rem;
    padding: 0.5rem;


    & .button-group{
      display:flex;
      justify-content: space-between;

      gap: 0.5rem;
    }

    & button{
      border: 1px solid #444;
      border-radius: 0.3rem;

      background-color: #444;
      padding: 0.25rem;
    }

    & button:active{
      background-color: #666;
    }
}
</style>

