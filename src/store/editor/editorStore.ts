import { defineStore } from "pinia";
import { ref } from "vue";

const useEditorStore = defineStore("Editor Store", () => {
  const code = ref("");
  const isInDatabase = ref<boolean>(false);
  const uuid = ref<string | null>(null);
  const title = ref<string | null>(null);
  const isStarred = ref(false);

  function $reset() {
    code.value = "";
    isInDatabase.value = false;
    uuid.value = null;
    title.value = null;
    isStarred.value = false;
  }

  return {
    code,
    isInDatabase,
    uuid,
    title,
    isStarred,
    $reset,
  };
});

export { useEditorStore };
