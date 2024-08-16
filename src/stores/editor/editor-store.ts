import { defineStore } from "pinia";
import { ref } from "vue";

const useEditorStore = defineStore("editor-store", () => {
  const code = ref<string>("");
  return {
    code,
  }
})

export { useEditorStore };
