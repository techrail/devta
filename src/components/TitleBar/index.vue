<script setup>
import { DevtaLogo } from "../../assets";
import TopBarButtons from '../TopBarButtons/TopBarButtons.vue';

function minimize() {
    window.actions.minimize();
}

function close() {
    window.actions.close();
}
</script>
<template>
    <div class="title-bar d-md-flex flex-md-row flex-sm-column pt-2 pb-2">
        <div id="top_header" class="d-flex align-items-center text-decoration-none flex-grow-1">
            <router-link to="/" class="d-flex fs-4 text-white ml-0 text-decoration-none link">
                <img :src="DevtaLogo" alt="" class="img" />
                <strong> Devta </strong>
            </router-link>
        </div>
        <div class="d-flex gap-2">
            <TopBarButtons />
            <button data-toggle="tooltip" data-placement="top" title="Minimize" class="btn btn-secondary" @click="minimize">
                <i class="bi bi-dash-lg"></i>
            </button>
            <button data-toggle="tooltip" data-placement="top" title="close" class="btn btn-secondary" @click="close">
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
    </div>
</template>

<style>
.title-bar {
    position: sticky;
    top: 0;
    -webkit-app-region: drag;
    --bs-bg-opacity: 1;
    background-color: rgba(var(--bs-dark-rgb), var(--bs-bg-opacity)) !important;
}

.title-bar #top_header {
    -webkit-app-region: drag;
}

.title-bar .link,
.title-bar button {
    -webkit-app-region: no-drag;
}

.img {
    height: 35px;
    width: 35px;
    display: block;
    margin: 0%;
    padding: 0%;
}
</style>