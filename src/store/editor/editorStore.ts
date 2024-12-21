import { defineStore } from 'pinia';
import { ref } from 'vue';

const useEditorStore = defineStore('Editor Store', () => {
  const code = ref('');
  const isInDatabase = ref<boolean>(false);

  function $reset() {
    code.value = '';
    isInDatabase.value = false;
  }

  return {
    code,
    isInDatabase,
    $reset,
  };
});

export { useEditorStore };
