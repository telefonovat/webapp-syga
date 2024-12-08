import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const useUserStore = defineStore('User Store', () => {
  const isAuthenticated = computed<boolean>(
    () => localStorage.getItem('username') !== null
  );

  return {
    isAuthenticated,
  };
});

export { useUserStore };
