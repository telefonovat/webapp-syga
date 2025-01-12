<script setup lang="ts">
interface Props {
  message: string;
  timeout?: number;
  isVisible: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  timeout: 300,
});
</script>
<template>
  <v-snackbar v-model="props.isVisible" :timeout="props.timeout">
    {{ message }}
  </v-snackbar>
</template>

<style scoped></style>
