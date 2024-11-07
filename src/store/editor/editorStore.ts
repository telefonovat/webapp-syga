import { defineStore } from 'pinia';
import { ref } from 'vue';

const useEditorStore = defineStore('Editor Store', () => {
  const code = ref('');

  return {
    code,
  };
});

export { useEditorStore };
