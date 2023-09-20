import { defineStore } from "pinia";

export const useKeyStore = defineStore("keys", {
  state: () => ({ privateKey: " ", publicKey: " " }),
  getters: {
    getKeys: () => {
      return {
        publicKey: this.publicKey,
        privateKey: this.privateKey,
      };
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
