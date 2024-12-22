import { defineStore } from 'pinia';
import { ref } from 'vue';

const useEditorStore = defineStore('Editor Store', () => {
  const code = ref('');
  const isInDatabase = ref<boolean>(false);
  const uuid = ref<string | null>(null);
  const title = ref<string | null>(null);

  function $reset() {
    code.value = '';
    isInDatabase.value = false;
    uuid.value = null;
    title.value = null;
  }

  return {
    code,
    isInDatabase,
    uuid,
    title,
    $reset,
  };
});

export { useEditorStore };
