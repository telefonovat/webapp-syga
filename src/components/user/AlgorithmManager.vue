<script setup lang="ts">
import { router } from '@/router';
import { useEditorStore } from '@/store/editor/editorStore';

import SaveAlgorithmPopup from './algorithm/SaveAlgorithmPopup.vue';

const editorStore = useEditorStore();

function closeAlgorithm() {
  //Closes current algorithm and reroutes to an empty sheet
  editorStore.$reset();
  router.replace('/');
}
</script>

<template>
  <div class="algorithm-manager-panel">
    <div class="algorithm-manager-panel__sub-panel">
      <SaveAlgorithmPopup>Save</SaveAlgorithmPopup>
    </div>
    <div
      v-if="editorStore.isInDatabase"
      class="algorithm-manager-panel__sub-panel"
    >
      <v-card>
        <v-card-text>
          {{ editorStore.title }}
        </v-card-text>
      </v-card>
      <SaveAlgorithmPopup
        :default-title="`${editorStore.title}-duplicate`"
        :duplicate="true"
      >
        Duplicate
      </SaveAlgorithmPopup>
      <v-btn>Delete</v-btn>
      <v-btn @click="closeAlgorithm()">Close</v-btn>
      <v-btn>Mark as favourite</v-btn>
    </div>
  </div>
</template>

<style scoped>
.algorithm-manager-panel{
  display:flex;
  flex-direction: row;
}

.algorithm-manager-panel__sub-panel{

  display:flex;
  flex-direction: row;
}
</style>
