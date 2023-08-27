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

// checks for localstorage for theme preference
// Defaults to system theme
const setTheme = () => {
  try {
    const localStorageTheme = localStorage.getItem("dark-theme");
    if (localStorageTheme === null) {
      const isDark = darkThemePreference();
      localStorage.setItem("dark-theme", isDark);
      return isDark;
    }
    return JSON.parse(localStorageTheme);
  } catch (error) {
    // defaults to lightmode in case of error
    return false;
  }
};

// updates the theme
export const updateTheme = (theme) => {
  console.log("updateTheme", theme);
  try {
    document
      .querySelector("body")
      ?.setAttribute("data-bs-theme", theme ? "dark" : "light");
    localStorage.setItem("dark-theme", JSON.stringify(theme));
  } catch (error) {
    console.log(error.message);
  }
};

export const useThemeStore = defineStore("theme", {
  state: () => ({ darkTheme: setTheme() }),
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
