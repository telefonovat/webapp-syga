
<script setup lang="ts">
  import { useAuthStore } from "@/store/user/authStore";
  import UserAlgorithmsPanel from "./community/UserAlgorithmsPanel.vue";

  interface Props {
    targetUsername: string;
  }
  defineProps<Props>();
</script>

<template>

  <div>

    <UserAlgorithmsPanel :targetUsername="targetUsername" />

  </div>

</template>

