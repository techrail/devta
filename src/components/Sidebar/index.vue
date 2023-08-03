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










    <div class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style="width: 280px;">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <span class="fs-4">Devta</span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <a href="/hash_generator" class="nav-link link-body-emphasis" aria-current="page">
                    <i class="bi bi-hash"></i> Hash Generator
                </a>
            </li>
            <li>
                <a href="/reflect" class="nav-link link-body-emphasis active">
                    <i class="bi bi-symmetry-vertical"></i> Reflect
                </a>
            </li>
            <li>
                <a href="/base64" class="nav-link link-body-emphasis">
                    <i class="bi bi-journal-text"></i> Base64
                </a>
            </li>
            <li>
                <a href="#" class="nav-link link-body-emphasis">
                    <svg class="bi pe-none me-2" width="16" height="16">
                        <use xlink:href="#grid"></use>
                    </svg>
                    Products
                </a>
            </li>
            <li>
                <a href="#" class="nav-link link-body-emphasis">
                    <svg class="bi pe-none me-2" width="16" height="16">
                        <use xlink:href="#people-circle"></use>
                    </svg>
                    Customers
                </a>
            </li>
        </ul>
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
    </div>






























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
    </ui-drawer> --></template>
<style scoped src="./styles.css"></style>