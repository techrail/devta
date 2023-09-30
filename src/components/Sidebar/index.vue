<script setup>
defineProps(["elements"]);

import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { sideBarList } from "./sidebarLists";
import { DevtaLogo } from "../../assets";

const route = useRoute();
const isMobile = ref(window.innerWidth < 900);
const isCollapsed = ref(true);
const currentPath = ref(route.path);

function resize() {
  isMobile.value = window.innerWidth < 800;
}

// alphabetically sort the sidebar options
const sortedSideBarLists = sideBarList.sort((a, b) => a.name.localeCompare(b.name));

let searchInput = ref("");

const filteredList = () => {
  return sortedSideBarLists.filter((sideBarItem) =>
    containsWordsInAnyOrder(sideBarItem.name.toLowerCase() + sideBarItem.tags.toLowerCase(), searchInput.value.toLowerCase())
  );
};

function containsWordsInAnyOrder(listItem, searchInput) {
  // Create a regex pattern that matches all words in searchInput
  const pattern = new RegExp(
    searchInput
      .split(" ")
      .map((word) => `(?=.*${word})`)
      .join("")
  );
  return pattern.test(listItem);
}

const toggleClick = () => {
  // console.log(isCollapsed.value);
  isCollapsed.value = !isCollapsed.value;
};

onMounted(() => {
  window.addEventListener("resize", resize);
});

onUnmounted(() => {
  window.removeEventListener("resize", resize);
});

watch(route, () => {
  currentPath.value = route.path;
  if (route.fullPath == "/") {
    document.getElementById("desktopSearchBar")?.focus();
  }
});
</script>
<template>
  <!-- <div class="col-sm-3"> -->
  <div
    id="large-devices"
    style="width: 280px; position: sticky; top: 0"
    v-if="!isMobile"
    class="d-flex flex-column justify-content-between flex-shrink-0 p-3 bg-dark p-0 m-0 vh-100 w-full"
  >
    <!-- header -->
    <div>
      <router-link to="/" class="d-flex align-items-center text-decoration-none">
        <div id="top_header" class="fs-4 text-white ml-0">
          <img :src="DevtaLogo" alt="" class="img" />
          <!-- <img class="img" src="../../assets/vajra2.svg"> -->
          <strong> Devta </strong>
        </div>
      </router-link>
      <hr />
    </div>

    <!-- body -->
    <div class="overflow-auto flex-grow-1">
      <input
        type="text"
        id="desktopSearchBar"
        v-model="searchInput"
        placeholder="Search..."
        class="form-control mono-font my-2"
        data-bs-theme="dark"
      />
      <ul class="nav nav-pills flex-column gap-1">
        <div v-for="(item, index) in filteredList()" :key="index">
          <li class="nav-item">
            <router-link
              :to="item.route"
              :class="currentPath === item.route ? 'text-white nav-link active' : 'text-white nav-link '"
              aria-current="page"
            >
              <i :class="item.iconClass"></i> {{ item.name }}
            </router-link>
          </li>
        </div>
      </ul>
    </div>

    <!-- footer -->
    <div class="text-white">
      <hr />
      <small> Developer tools that are supposed to help you 🚀 </small>
    </div>
  </div>
  <div id="small-devices" v-if="isMobile" class="d-flex flex-column">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container d-flex">
        <router-link class="navbar-brand d-flex align-items-center" to="/"><img class="img" :src="DevtaLogo" /><strong>Devta</strong></router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="isCollapsed = !isCollapsed"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" :class="{ show: !isCollapsed }" id="navbarNav">
          <input
            type="text"
            id="mobileSearchBar"
            v-model="searchInput"
            placeholder="Search..."
            class="form-control mono-font my-2"
            data-bs-theme="dark"
          />
          <ul class="navbar-nav">
            <div v-for="(item, index) in filteredList()" :key="index">
              <li class="nav-item">
                <router-link
                  :to="item.route"
                  @click="isCollapsed = !isCollapsed"
                  :class="currentPath === item.route ? 'nav-link text-white active' : 'nav-link text-white'"
                  aria-current="page"
                >
                  <i :class="item.iconClass"></i> {{ item.name }}
                </router-link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <!-- <hr> -->
  <!-- <div class="dropdown">
            <a href="#" class="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://github.com/mdo.png" alt="" class="rounded-circle me-2" width="32" height="32">
                <strong>mdo</strong>
            </a>
            <ul class="dropdown-menu text-small shadow" style="">
                <li><a class="dropdown-item" href="#">New project...</a></li>
                <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><a class="dropdown-item" href="#">Profile</a></li>
                <li>
                    <hr class="dropdown-divider">
                </li>
                <li><a class="dropdown-item" href="#">Sign out</a></li>
            </ul>
        </div> -->
  <!-- </div> -->
  <!-- </div> -->

  <!-- <ui-top-app-bar content-selector="#content-main" nav-id="demo-menu" v-show="isMobile"
        class="app-bar">Devta</ui-top-app-bar>
    <ui-drawer nav-id="demo-menu" :type="isMobile ? 'modal' : 'permanent'" class="nav-parent">
        <ui-drawer-header>
            <ui-drawer-title style="color: #fff">Devta</ui-drawer-title>
            <ui-drawer-subtitle style="color: #fff">Developer tools that are supposed to help you.</ui-drawer-subtitle>
        </ui-drawer-header>
        <ui-drawer-content>
            <ui-nav>
                <ui-nav-item :active="currSlug === element" :href="currSlug !== element ? '/' + element : '#'" icon="time"
                    :class="{ 'nav-item': true, 'active': element === currSlug }" v-for="element in Object.keys(routes)">
                    <ui-icon style="padding-right: 10px" v-if="routes[element].icon">{{ routes[element].icon }}</ui-icon>
                    <img style="padding-right: 10px; width: 35px;" :src="routes[element].image"
                        :alt="routes[element].name + '\'s icon'" v-if="routes[element].image" />
                    {{ routes[element].name }}
                </ui-nav-item>
            </ui-nav>
        </ui-drawer-content>
    </ui-drawer> -->
</template>
<style scoped src="./styles.css"></style>
