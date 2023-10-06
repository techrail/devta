<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import Sidebar from "./components/Sidebar/index.vue";
import TitleBar from "./components/TitleBar/index.vue";
import { useThemeStore } from "./stores/theme";

const store = useThemeStore();
const IS_ELECTRON = window.IS_ELECTRON || false;

onMounted(() => {
  document.querySelector("body")?.setAttribute("data-bs-theme", store.darkTheme ? "dark" : "light");
});
</script>

<template>
  <TitleBar v-if="IS_ELECTRON" />
  <main class="d-md-flex flex-md-row flex-sm-column m-0 p-0 w-100">
    <!-- <div class="container w-100"> -->
    <Sidebar />
    <RouterView />
    <!-- </div> -->
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 0%;
  padding: 0%;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}
</style>
