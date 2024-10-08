<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { python } from "@codemirror/lang-python"

import { ref } from "vue";
const code = ref("print('Hello World')");
const extensions = [python()];
</script>

<template>
  <Codemirror v-model="code" :extensions="extensions" />
</template>

<style scoped></style>
