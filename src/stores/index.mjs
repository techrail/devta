import { defineStore } from "pinia";

const routes = {
  hash_generator: {
    // slug
    name: "Hash Generator", // name
    dir: "HashGenerator", // page dir inside pages
    icon: "tag",
  },
  base64_image_convertor: {
    // slug
    name: "Base 64 Image Convertor", // name
    dir: "Base64Image", // page dir inside pages
    icon: "image",
  },
};

export const useGlobalStore = defineStore("global", {
  state: () => ({
    routes,
    snackbar: {
      visible: false,
      msg: "",
    },
  }),
  getters: {
    getRoute: (state) => (slug) => {
      return state.routes[slug];
    },
    getRoutes: (state) => () => {
      return state.routes;
    },
  },
  actions: {
    showSnackbar(msg) {
      this.snackbar.visible = true;
      this.snackbar.msg = msg;
    },
    hideSnackbar() {
      this.snackbar.visible = false;
    },
  },
});
