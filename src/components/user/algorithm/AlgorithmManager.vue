<script setup lang="ts">
  import {
    algorithmsUrl,
    buildHeaders,
    getAlgorithmResourceUrl,
  } from "@/api";
  import AwesomePopup from "@/components/utility/AwesomePopup.vue";
  import { useEditorStore } from "@/store/editor/editorStore";
  import { getAlgorithmDetail } from "@/store/editor/getAlgorithmDetail";
  import {
    isAddAlgorithmsSuccessBody,
    AddAlgorithmsRequestBody,
    UpdateAlgorithmRequestBody,
  } from "@telefonovat/syga--contract";
  import { ref } from "vue";

  const editorStore = useEditorStore();
  const algorithmName = ref(editorStore.algorithmData?.name || "");
  //TODO: Sync with editor store
  const isAlgorithmPublic = ref(
    editorStore.algorithmData?.isPublic || false,
  );

  const isSaveModalDisplayed = ref(false);

  function trySaveCode() {
    const body: AddAlgorithmsRequestBody = {
      algorithms: [
        {
          name: algorithmName.value,
          code: editorStore.code,
          isPublic: isAlgorithmPublic.value,
        },
      ],
    };
    if (editorStore.algorithmData) {
      console.log("[bog]");
      const algorithm = body.algorithms[0];
      editorStore.algorithmData.name = algorithm.name;
      editorStore.algorithmData.isPublic = algorithm.isPublic;

      const updateBody: UpdateAlgorithmRequestBody = {
        ...algorithm,
      };
      fetch(getAlgorithmResourceUrl(editorStore.algorithmData.uuid), {
        method: "PATCH",
        headers: buildHeaders(),
        body: JSON.stringify(updateBody),
        credentials: "include",
      })
        .then((response) => {
          if (response.status !== 200) {
            alert("There was a problem modifying the algorithm");
          } else {
            alert("Algorithm modified successfully");
          }
        })
        .finally(() => {
          isSaveModalDisplayed.value = false;
        });
    } else {
      fetch(algorithmsUrl, {
        method: "POST",
        headers: buildHeaders(),
        body: JSON.stringify(body),
        credentials: "include",
      })
        .then(async (response) => {
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

          alert("Algorithm saved successfully");
        })
        .finally(() => {
          isSaveModalDisplayed.value = false;
        });
    }
  }
</script>

<template>

  <div class="algorithm-manager-panel__sub-panel">

    <button @click="isSaveModalDisplayed = true">Save</button>

    <input type="text" v-model="algorithmName" />

    <AwesomePopup :is-displayed="isSaveModalDisplayed">

      <div class="save-modal">

        <label class="save-model-field">
           Algorithm name:
          <input v-model="algorithmName" />

        </label>

        <label>
           Make public?
          <input v-model="isAlgorithmPublic" type="checkbox" />

        </label>

        <button @click="trySaveCode()">Proceed</button>

        <button @click="isSaveModalDisplayed = false">
           Cancel
        </button>

      </div>

    </AwesomePopup>

  </div>

</template>

<style scoped>
  .algorithm-manager-panel__sub-panel{
  display:flex;
  flex-direction: row;
}

  .save-modal{
    display:flex;
    flex-direction: column;
    align-items: center;

    margin: 1rem;
  }
  .save-model-field{
    display: flex;
    gap: 1rem;
    & input{
      max-width: 50%;
    }
  }
</style>

