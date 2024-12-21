import { defineStore } from 'pinia';
import { ref } from 'vue';

const useEditorStore = defineStore('Editor Store', () => {
  const code = ref('');
  const isInDatabase = ref<boolean>(false);

  return {
    code,
    isInDatabase,
  };
});

export { useEditorStore };
