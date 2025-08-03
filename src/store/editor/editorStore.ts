import { defineStore } from "pinia";

export const useEditorStore = defineStore(
  "Editor read, write, change state, etc",
  {
    state: () => ({
      code: "",

      // UI Logic depends on these
      isCodeBuilding: false,
    }),
    getters: {},
    actions: {},
  },
);

// const useEditorStore = defineStore("Editor Store", () => {
//   const code = ref("");
//   const isInDatabase = ref<boolean>(false);
//   const uuid = ref<string | null>(null);
//   const title = ref<string | null>(null);
//   const isStarred = ref(false);
//
//   const isCodeBuilding = ref(false);
//
//   function $reset() {
//     code.value = "";
//     isInDatabase.value = false;
//     uuid.value = null;
//     title.value = null;
//     isStarred.value = false;
//   }
//
//   return {
//     code,
//     isInDatabase,
//     uuid,
//     title,
//     isStarred,
//
//     isCodeBuilding,
//     $reset,
//   };
// });

// export {useEditorStore };
