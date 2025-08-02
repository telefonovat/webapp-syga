<script setup lang="ts">
  import { router } from "@/router";
  import { useEditorStore } from "@/store/editor/editorStore";

  import SaveAlgorithmPopup from "./SaveAlgorithmPopup.vue";
  import DeleteAlgorithmPopUp from "./DeleteAlgorithmPopUp.vue";
  import MarkFavouriteButton from "./MarkFavouriteButton.vue";
  import { useUserStore } from "@/store/user/userStore";
  import { useVisualizerStore } from "@/store/visualizer/visualizerStore";
  import { storeToRefs } from "pinia";

  const editorStore = useEditorStore();
  const userStore = useUserStore();
  const visualizerStore = useVisualizerStore();

  const { title } = storeToRefs(editorStore);

  function closeAlgorithm() {
    //Closes current algorithm and reroutes to an empty sheet
    // Clears visualizer
    editorStore.$reset();
    visualizerStore.$reset();
    router.replace("/");
  }
</script>

<template>

  <div
    v-if="editorStore.isInDatabase"
    class="algorithm-manager-panel__sub-panel">

    <!-- <v-card> -->

    <!--   <v-card-text> -->

    <!--     {{ editorStore.title }} -->

    <!--   </v-card-text> -->

    <!-- </v-card> -->

    <v-responsive min-width="200px">

      <v-text-field
        style="margin: auto"
        v-model="title"></v-text-field>

    </v-responsive>

    <SaveAlgorithmPopup>

      <v-icon icon="mdi-content-save" />

    </SaveAlgorithmPopup>

    <SaveAlgorithmPopup
      :default-title="`${editorStore.title}-duplicate`"
      :duplicate="true">

      <v-icon icon="mdi-content-copy" />

    </SaveAlgorithmPopup>

    <DeleteAlgorithmPopUp
      :title="editorStore.title!"
      :uuid="editorStore.uuid!">

      <v-icon icon="mdi-delete-outline" />

    </DeleteAlgorithmPopUp>

    <MarkFavouriteButton
      :uuid="editorStore.uuid!"
      :is-starred="
        userStore.algorithms.find(
          (algorithm) => algorithm.uuid === editorStore.uuid!,
        )!.isStarred
      " />

    <v-btn icon="mdi-close" @click="closeAlgorithm()"></v-btn>

  </div>

  <div v-else class="algorithm-manager-panel__sub-panel">

    <button>Save</button>

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

