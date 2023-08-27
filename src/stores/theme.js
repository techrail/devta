import { defineStore } from "pinia";

// Returns the default system theme
// Dark theme ? true
// Light theme ? false
const darkThemePreference = () => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return true;
  } else {
    return false;
  }
};

// updates the theme
export const updateTheme = (theme) => {
  try {
    document
      .querySelector("body")
      ?.setAttribute("data-bs-theme", theme ? "dark" : "light");
  } catch (error) {
    console.log(error.message);
  }
};

export const useThemeStore = defineStore("theme", {
  state: () => ({ darkTheme: darkThemePreference() }),
  getters: {
    getTheme: (state) => state.theme,
  },
  actions: {
    toggleTheme() {
      this.darkTheme = !this.darkTheme;
      updateTheme(this.darkTheme);
    },
  },
});
