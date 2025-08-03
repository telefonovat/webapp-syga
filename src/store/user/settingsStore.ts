import { defineStore } from "pinia";

export const useSettingsStore = defineStore("User settings", {
  state: () => ({ fontSizePx: 14 }),
  getters: {},
  actions: {},
});
