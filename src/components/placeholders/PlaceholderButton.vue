<script setup lang="ts">
interface Props {
  text?: string,
}

const props = withDefaults(defineProps<Props>(), {
  text: "Placeholder button",
})
</script>

<template>
  <button class="placeholder-button" @click="console.log('Click click click...')">
    <slot />
    {{ props.text }}
  </button>
</template>

<style scoped>
.placeholder-button {
  min-width: 50px;
  min-height: 50px;
}
</style>
