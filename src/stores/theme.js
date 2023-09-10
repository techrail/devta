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

const setTheme = () => {
  try {
    // checks the local storage for theme preference
    const localStorageTheme = localStorage.getItem("dark-theme");
    if (localStorageTheme !== null) {
      const isDark = JSON.parse(localStorageTheme);
      return isDark;
    }
    const isDark = darkThemePreference();
    return isDark;
  } catch (error) {
    console.error("Error setting theme:", error);
    // defaults to lightmode in case of error
    return false;
  }
};

export const updateTheme = (theme) => {
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
    getTheme: (state) => state.darkTheme,
  },
  actions: {
    toggleTheme() {
      this.darkTheme = !this.darkTheme;
      updateTheme(this.darkTheme);
    },
  },
});
