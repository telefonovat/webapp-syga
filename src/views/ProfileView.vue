<script setup lang="ts">
  import UserDashboard from "@/components/user/dashboard/UserDashboard.vue";

  import { ref } from "vue";

  const currentTab = ref<string>("overview");
</script>

<template>

  <v-card>

    <v-tabs v-model="currentTab">

      <v-tab value="overview">Overview</v-tab>

      <v-tab value="algorithms">Algorithms</v-tab>

      <v-tab value="users">Users</v-tab>

    </v-tabs>

    <v-tabs-window v-model="currentTab">

      <v-tabs-window-item value="overview">

        <UserDashboard />

      </v-tabs-window-item>

      <v-tabs-window-item value="algorithms">

        <div>Algorithms</div>

      </v-tabs-window-item>

      <v-tabs-window-item value="users">

        <div>Users</div>

      </v-tabs-window-item>

    </v-tabs-window>

  </v-card>

</template>

<style scoped></style>

