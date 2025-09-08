import { defineStore } from "pinia";

type AnonymousUsername = { kind: "anonymous" };
type Username = AnonymousUsername | string;

type jwtToken = null | string;

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export const useAuthStore = defineStore("Auth Store", {
  state: () => ({
    isAuthenticated: false as boolean,
    username: { kind: "anonymous" } as Username,

    accessToken: null as jwtToken,
    refreshToken: null as jwtToken,
  }),
  getters: {
    isAuthenticatedValue(state) {
      return state.isAuthenticated;
    },
  },
  actions: {
    setAuthToken(authTokens: AuthTokens) {
      this.accessToken = authTokens.accessToken;
      this.refreshToken = authTokens.refreshToken;
    },
    setIsAuthenticated(isAuthenticated: boolean) {
      this.isAuthenticated = isAuthenticated;
    },
  },
});
