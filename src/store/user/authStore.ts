import { defineStore } from "pinia";
import { refreshAuth } from "./refreshAuth";

type AnonymousUsername = { kind: "anonymous" };
type Username = AnonymousUsername | string;

type jwtToken = null | string;

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface UserInfo {
  username: string;
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
    setUserInfo({ username }: UserInfo) {
      this.username = username;
    },
    signOut() {
      this.isAuthenticated = false;
      this.username = { kind: "anonymous" };
    },
    async verifyAuth() {
      const auth = await refreshAuth();
      if (auth) {
        this.username = auth.payload.username;
        this.isAuthenticated = true;
      } else {
        this.username = { kind: "anonymous" };
        this.isAuthenticated = false;
      }
    },
  },
});
