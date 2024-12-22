import { defineStore } from 'pinia';
import { ref } from 'vue';

const useUserStore = defineStore('User Store', () => {
  const isAuthenticated = ref<boolean>(false);
  const username = ref<string | null>(null);
  const token = ref<string | null>(null);

  if (
    localStorage.getItem('username') &&
    localStorage.getItem('token')
  ) {
    isAuthenticated.value = true;
    username.value = localStorage.getItem('username');
    token.value = localStorage.getItem('token');
  }

  function setAuthenticationInfo(
    authenticatedUsername: string,
    authenticatedToken: string
  ) {
    isAuthenticated.value = true;
    username.value = authenticatedUsername;
    token.value = authenticatedToken;

    localStorage.setItem('username', username.value);
    localStorage.setItem('token', token.value);
  }

  function $reset() {
    isAuthenticated.value = false;
    username.value = null;
    token.value = null;

    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }

  return {
    isAuthenticated,
    username,
    token,
    setAuthenticationInfo,
    $reset,
  };
});

export { useUserStore };
