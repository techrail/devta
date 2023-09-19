import { defineStore } from "pinia";

export const useKeyStore = defineStore("keys", {
  state: () => ({ privateKey: " ", publicKey: " " }),
  getters: {
    getKeys: (state) => {
      state.privateKey, state.publicKey;
    },
  },
  actions: {
    updateKeys(priv, pub) {
      this.privateKey = priv;
      this.publicKey = pub;
    },
    clearKeys() {
      this.privateKey = " ";
      this.publicKey = " ";
    },
  },
});
