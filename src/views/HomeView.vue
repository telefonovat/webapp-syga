<script setup lang="ts">
import Split from "@/utils/Split.vue";
import EditorPanel from "@/components/panels/EditorPanel.vue";
</script>

<template>
  <div class="home-view">
    <split :initialSizes="[50, 50]" direction="horizontal">
      <editor-panel />
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
