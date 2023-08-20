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
  reflect: {
    // slug
    name: "Reflects Text", // name
    dir: "Reflect", // page dir inside pages
    icon: "image",
  },
  base64: {
    // slug
    name: "Base64 converter for Text", // name
    dir: "Base64Text", // page dir inside pages
    icon: "image",
  },
  unixToDate: {
    name: "Unix to Date",
    dir: "UnixToDate",
    icon: "image",
  },
  dateToUnix: {
    name: "Date to unix",
    dir: "DateToUnix",
    icon: "image",
  },
  markdownPreview: {
    name: "Markdown Preview",
    dir: "MarkdownPreview",
    icon: "image",
  },
  timeZoneConverter: {
    name: "Time zone converter",
    dir: "TimeZoneConverter",
    icon: "image",
  },
  jsonFormatter: {
    name: "json-formatter",
    dir: "JsonFormatter",
    icon: "image",
  },
  JSONToYAML: {
    name: "JSON-To-YAML",
    dir: "JSONToYAML",
    icon: "image",
  },
  jwtDebugger: {
    name: "JWT Debugger",
    dir: "JWTDebugger",
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
