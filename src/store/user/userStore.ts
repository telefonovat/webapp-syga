import { defineStore } from 'pinia';
import { ref } from 'vue';

const useUserStore = defineStore('User Store', () => {
  const isAuthenticated = ref<boolean>(false);

  return {
    isAuthenticated,
  };
});

export { useUserStore };
