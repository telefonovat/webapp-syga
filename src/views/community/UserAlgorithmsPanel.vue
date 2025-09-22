<script setup lang="ts">
  import { buildHeaders, getUserAlgorithmsUrl } from "@/api";
  import { handleUnauthorized } from "@/api/auth";
  import AlgorithmFullViewCard from "@/components/user/algorithm/AlgorithmFullViewCard.vue";
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
    fetch(getUserAlgorithmsUrl(props.targetUsername), {
      method: "GET",
      headers: buildHeaders(),
      credentials: "include",
    }).then(async (response) => {
      if (response.status === 401) {
        handleUnauthorized();
      }
      const body = await response.json();

      if (!body.success) {
        console.log("Could not get user algorithms");
        return;
      }
      if (!body.payload) {
        console.log("Missing payload");
        return;
      }

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

    <ul class="algorithms-list">

      <AlgorithmFullViewCard
        v-for="algorithm in algorithmIdentifiers"
        :key="algorithm.uuid"
        :uuid="algorithm.uuid"
        :name="algorithm.name" />

    </ul>

  </div>

</template>

<style scoped>
  .user-algorithms-panel{
    display: flex;
  }

  .algorithms-list{
    list-style: none;
    flex-grow: 20;
  }
</style>

