<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useGlobalStore } from "@stores/index.mjs";
defineProps(['elements']);

const store = useGlobalStore();
const route = useRoute();
const isMobile = ref(window.innerWidth < 800);

function resize() {
    isMobile.value = window.innerWidth < 800;
}

onMounted(() => {
    window.addEventListener('resize', resize);
});

onUnmounted(() => {
    window.removeEventListener('resize', resize);
});

const currSlug = route.params.slug;

const routes = store.getRoutes();

</script>
<template>
    <!-- <main class="d-flex flex-nowrap"> -->
    <div class="flex-shrink-0 p-3" style="width: 280px;">
    <a href="/" class="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
      <span class="fs-5 fw-semibold">⚡️ Devta</span>
    </a>
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
          Text Transformations
        </button>
        <div class="collapse show" id="home-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="/hash_generator" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Hash Generator</a></li>
            <li><a href="/base64" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Base64</a></li>
            <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Reports</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
          Work in Progress
        </button>
        <div class="collapse" id="dashboard-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="/reflect" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Reflection</a></li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
          Orders
        </button>
        <div class="collapse" id="orders-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">New</a></li>
            <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Processed</a></li>
            <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Shipped</a></li>
            <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Returned</a></li>
          </ul>
        </div>
      </li>
      <li class="border-top my-3"></li>
      <li class="mb-1">
        <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
          Account
        </button>
        <div class="collapse" id="account-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">New...</a></li>
            <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Profile</a></li>
            <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Settings</a></li>
            <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Sign out</a></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
<!-- </main> -->


















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