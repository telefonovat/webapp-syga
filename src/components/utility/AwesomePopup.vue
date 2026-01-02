<script setup lang="ts">
  interface Props {
    isDisplayed: boolean;
  }

  defineProps<Props>();
  defineEmits<{
    (e: "closed"): void;
  }>();
</script>

<template>

  <Teleport to="body">

    <div v-if="isDisplayed" class="awesome-popup">

      <button class="close-btn" @click="$emit('closed')"> × </button>

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

.close-btn {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background: none;
  border: solid #444;
  cursor: pointer;
}
</style>

