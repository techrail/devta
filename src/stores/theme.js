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

// const addDarkThemeStylesheet = () => {
//   let existingDarkTheme = document.getElementById("dark-theme-style");
//   if (!existingDarkTheme) {
//     const darkThemeStylesheet = document.createElement("link");
//     darkThemeStylesheet.rel = "stylesheet";
//     darkThemeStylesheet.id = "dark-theme-style";
//     darkThemeStylesheet.href = "../../src/highlightJs/atom-one-dark.css";
//     document.head.appendChild(darkThemeStylesheet);
//   }
// };

// const removeDarkThemeStylesheet = () => {
//   const existingDarkTheme = document.getElementById("dark-theme-style");
//   if (existingDarkTheme) {
//     document.head.removeChild(existingDarkTheme);
//   }
// };

const setTheme = () => {
  try {
    const localStorageTheme = localStorage.getItem("dark-theme");
    if (localStorageTheme !== null) {
      const isDark = JSON.parse(localStorageTheme);
      // isDark ? addDarkThemeStylesheet() : removeDarkThemeStylesheet();
      return isDark;
    }
    const isDark = darkThemePreference();
    // if (isDark) {
    //   addDarkThemeStylesheet();
    // }
    return isDark;
  } catch (error) {
    console.error("Error setting theme:", error);
    // defaults to lightmode in case of error
    return false;
  }
};

export const updateTheme = (theme) => {
  // if (theme) {
  //   addDarkThemeStylesheet();
  // } else {
  //   removeDarkThemeStylesheet();
  // }
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
