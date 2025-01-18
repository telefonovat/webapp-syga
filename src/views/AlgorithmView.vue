<script setup lang="ts">
import Visualizer from '@/components/visualizer/Visualizer.vue';
import CodeEditor from '@/components/editor/CodeEditor.vue';
import AlgorithmControlPanel from './AlgorithmControlPanel.vue';
</script>

<template>
  <!-- Hack: 88% of ancestor height is the sweet spot -->
  <v-container class="ma-0 pa-0" style="height: 88%" fluid>
    <v-row class="ma-0 pa-0">
      <AlgorithmControlPanel />
    </v-row>
    <v-row class="ma-0 pa-0 h-100">
      <v-col
        cols="6"
        class="ma-0 pa-0 h-100"
        style="overflow-y: scroll"
      >
        <CodeEditor />
      </v-col>
      <v-divider vertical />
      <v-col cols="6" class="ma-0 pa-0 h-100">
        <!-- <v-row> -->
        <Visualizer />
        <!-- </v-row> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
