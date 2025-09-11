<script setup lang="ts">
  import { algorithmsUrl, buildHeaders } from "@/api";
  import { useEditorStore } from "@/store/editor/editorStore";
  import {
    isAddAlgorithmsSuccessBody,
    AddAlgorithmsRequestBody,
  } from "@telefonovat/syga--contract";
  import { ref } from "vue";

  const algorithmName = ref("Anonymous");

  function trySaveCode() {
    const editorStore = useEditorStore();
    const body: AddAlgorithmsRequestBody = {
      algorithms: [
        {
          name: algorithmName.value,
          code: editorStore.code,
        },
      ],
    };
    fetch(algorithmsUrl, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(body),
    }).then(async (response) => {
      const body = await response.json();

      if (!body.success) {
        console.log("[LOG] Could not add algorithms");
        return;
      }
      if (!body.payload) {
        console.log("[ERROR] Missing payload");
        return;
      }
      if (
        isAddAlgorithmsSuccessBody(body) &&
        body.payload.length === 1
      ) {
        editorStore.isAnonymous = false;
        editorStore.algorithmData = body.payload[0];
      }
    });
  }
</script>

<template>

  <div class="algorithm-manager-panel__sub-panel">

    <button @click="trySaveCode()">Save</button>

    <input type="text" v-model="algorithmName" />

  </div>

</template>

<style scoped>
  .algorithm-manager-panel__sub-panel{
  display:flex;
  flex-direction: row;
}
</style>

