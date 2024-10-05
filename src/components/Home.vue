<script setup lang="ts">
import MockHeader from './mock/sfc/MockHeader.vue';
import Visualizer from '@/components/visualizer/Visualizer.vue';
import MockFooter from "./mock/sfc/MockFooter.vue"
</script>

<template>
  <div id="home">
    <MockHeader id="header" />
    <Visualizer id="editor" />
    <MockFooter id="footer" />

  </div>
</template>

<style scoped>
#home {
  display: grid;
  grid-template-areas:
    "header header header"
    ". editor editor"
    ". editor editor"
    "footer footer footer";
  grid-template-rows: auto 3fr auto;
}

#home>#header {
  grid-area: header;
}

#home>#editor {
  grid-area: editor;
}

#home>#footer {
  grid-area: footer;
}
</style>
