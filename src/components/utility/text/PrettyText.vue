<template>

  <div class="pretty-text">

    <div v-if="type === 'markdown'" v-html="content"></div>

  </div>

</template>

<script setup lang="ts">
  import md from "markdown-it";
  import { computed } from "vue";

  interface Props {
    type: "markdown" | "plaintext";
    input: string;
  }
  const props = defineProps<Props>();

  const content = computed(() => {
    if (props.type === "markdown") return markdownToHtml(props.input);

    return props.input;
  });

  function markdownToHtml(input: string): string {
    const mdInstance = md();
    return mdInstance.render(input);
  }
</script>

<style scoped>
  .pretty-text{
    padding: 1rem;
}
</style>

