<script setup lang="ts">
import MockHeader from './mock/sfc/MockHeader.vue';
import MockComponent from './mock/sfc/MockComponent.vue';
import MockFooter from "./mock/sfc/MockFooter.vue"
</script>

<template>
  <div id="home">
    <MockHeader id="header" />
    <MockComponent id="editor" />
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
