<script setup lang="ts">
import Split from "@/utils/Split.vue";
import CodeEditor from "@/components/editor/CodeEditor.vue";
</script>

<template>
  <div class="home-view">
    <split :initialSizes="[50, 50]" direction="horizontal">
      <code-editor />
      <placeholder-div />
    </split>
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  min-height: 500px;
}
</style>
