<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useGlobalStore } from "@stores/index.mjs";
import { sideBarList } from "./sidebarLists";
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

// Gets the active route slug
const currSlug = route.params.slug;

const routes = store.getRoutes();

const isCollapsed = ref(true)

const toggleClick = () => {
    console.log(isCollapsed.value)
    isCollapsed.value = !isCollapsed.value
}

</script>
<template>
    <!-- <div class="col-sm-3"> -->
    <div id="large-devices"
        class="d-sm-flex d-none flex-column justify-content-between flex-shrink-0 p-3 bg-dark p-0 m-0 vh-100 w-full">
        <!-- header -->
        <div>
            <a href=" /" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <span class="fs-4 text-white"><strong>⚡️ Devta</strong></span>
            </a>
            <hr>
        </div>

        <!-- body -->
        <div class="overflow-auto flex-grow-1">
            <ul class="nav nav-pills flex-column gap-1">
                <div v-for="(item, index) in sideBarList" :key="index">
                    <li class="nav-item ">
                        <a :href=item.route
                            :class="currSlug === item.route.slice(1) ? 'text-white nav-link active' : 'text-white nav-link '"
                            aria-current="page">
                            <i :class="item.iconClass"></i> {{ item.name }}
                        </a>
                    </li>
                </div>
            </ul>
        </div>

        <!-- footer -->
        <div class="text-white">
            <hr>
            <small>
                Developer tools that are supposed to help you 🚀
            </small>
        </div>

    </div>
    <div id="small-devices" class="d-flex flex-column d-sm-none">
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <div class="container">
                <a class="navbar-brand" href="/">⚡️ Devta</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"
                    @click="isCollapsed = !isCollapsed">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" :class="{ show: !isCollapsed }" id="navbarNav">
                    <ul class="navbar-nav">
                        <div v-for="(item, index) in sideBarList" :key="index">
                            <li class="nav-item">
                                <a :href=item.route
                                    :class="currSlug === item.route.slice(1) ? 'nav-link text-white active' : 'nav-link text-white'"
                                    aria-current="page">
                                    <i :class="item.iconClass"></i> {{ item.name }}
                                </a>
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