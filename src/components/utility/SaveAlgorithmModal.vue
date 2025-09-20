<script setup lang="ts">
  import AwesomePopup from "./AwesomePopup.vue";

  interface Props {
    isDisplayed: boolean;
  }

  defineProps<Props>();
</script>

<template>

  <AwesomePopup :is-displayed="isDisplayed">

    <div> Hi</div>

  </AwesomePopup>

</template>

<style scoped></style>

