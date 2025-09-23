<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import AlgorithmSimpleViewCard from "../algorithm/AlgorithmSimpleViewCard.vue";

  import {
    isGetUserAlgorithmsSuccessResponse,
    SygaAlgorithmIdentifier,
  } from "@telefonovat/syga--contract";
  import { getUserAlgorithmsUrl, buildHeaders } from "@/api";
  import { handleUnauthorized } from "@/api/auth";
  import { useAuthStore } from "@/store/user/authStore";
  const featuredAlgorithms = ref<SygaAlgorithmIdentifier[]>([]);

  async function fetchAlgorithms() {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated) {
      return;
    }
    await fetch(getUserAlgorithmsUrl("syga_admin"), {
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
        featuredAlgorithms.value = body.payload;
      }
    });
  }
  onMounted(async () => {
    await fetchAlgorithms();
  });
</script>

<template>

  <ul class="featured-algorithms">

    <h4>Featured</h4>

    <li v-for="(algorithm, index) in featuredAlgorithms" :key="index">

      <AlgorithmSimpleViewCard :name="algorithm.name" />

    </li>

  </ul>

</template>

<style scoped>
  .featured-algorithms{
  margin-left: 5px;
  list-style: none;
  overflow-y: scroll;
}
</style>

