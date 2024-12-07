import { defineStore } from 'pinia';
import { ref } from 'vue';

const useUserStore = defineStore('User Store', () => {
  const isLoggedIn = ref<boolean>(false);

  return {
    isLoggedIn,
  };
});

export { useUserStore };
