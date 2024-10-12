<script setup lang="ts">
import MockButton from "@/components/mock/sfc/MockButton.vue"
import { buildCode } from "@/api/connector";
function build() {
  console.log("Building");
  buildCode({ code: "" });
}
</script>

<template>
  <div class="navigation-header mock">
    <MockButton text="Build" @click="build()" />
  </div>
</template>

<style scoped></style>
