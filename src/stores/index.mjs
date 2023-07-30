import { defineStore } from "pinia";
import modules from "@src/modules.mjs";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    modules,
  }),
  getters: {
    getModule: (state) => (slug) => {
      return state.modules[slug];
    },
    getModules: (state) => () => {
      return state.modules;
    },
  },
});
