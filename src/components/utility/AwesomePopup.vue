<script setup lang="ts">
  interface Props {
    isDisplayed: boolean;
  }

  defineProps<Props>();
</script>

<template>

  <Teleport to="body">

    <div v-if="isDisplayed" class="awesome-popup">

      <slot />

    </div>

  </Teleport>

</template>

<style scoped>
  .awesome-popup{
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;

  min-height: 40%;

  background-color: #242424;
}
</style>

