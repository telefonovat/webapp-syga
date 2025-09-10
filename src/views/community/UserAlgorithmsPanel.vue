<script setup lang="ts">
  import { buildHeaders, getUserAlgorithmsUrl } from "@/api";
  import AlgorithmCard from "@/components/user/dashboard/AlgorithmCard.vue";
  import { useAuthStore } from "@/store/user/authStore";
  import {
    isGetUserAlgorithmsSuccessResponse,
    SygaAlgorithmIdentifier,
  } from "@telefonovat/syga--contract";
  import { onMounted, ref } from "vue";

  interface Props {
    targetUsername: string;
  }
  const props = defineProps<Props>();

  const algorithmIdentifiers = ref<SygaAlgorithmIdentifier[]>([]);

  function fetchAlgorithms() {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated) {
      return;
    }
    console.log("?");
    fetch(getUserAlgorithmsUrl(props.targetUsername), {
      method: "GET",
      headers: buildHeaders(),
    }).then(async (response) => {
      const body = await response.json();

      console.log("[LOG] Done");
      if (!body.success) {
        console.log("Could not get user algorithms");
        return;
      }
      if (!body.payload) {
        console.log("Missing payload");
        return;
      }

      console.log(`[LOG] ${body.payload}`);
      if (isGetUserAlgorithmsSuccessResponse(body.payload)) {
        algorithmIdentifiers.value = body.payload;
      }
    });
  }

  onMounted(() => {
    fetchAlgorithms();
  });
</script>

<template>

  <div class="user-algorithms-panel">

    <div class="mini-profile">Mini profile</div>

    <ul class="algorithms-list">

      <AlgorithmCard
        v-for="algorithm in algorithmIdentifiers"
        :key="algorithm.uuid"
        :name="algorithm.name" />

    </ul>

  </div>

</template>

<style scoped>
  .user-algorithms-panel{
    display: flex;
  }

  .mini-profile{
    flex-grow: 5;
    text-align: center;
  }
  
  .algorithms-list{
    list-style: none;
    flex-grow: 20;
  }
</style>

