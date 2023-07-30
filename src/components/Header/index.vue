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

const modules = store.getModules();

</script>
<template>
    <ui-top-app-bar content-selector="#content-main" nav-id="demo-menu" v-show="isMobile"
        class="app-bar">Devta</ui-top-app-bar>
    <ui-drawer nav-id="demo-menu" :type="isMobile ? 'modal' : 'permanent'" class="nav-parent">
        <ui-drawer-header>
            <ui-drawer-title style="color: #fff">Devta</ui-drawer-title>
            <ui-drawer-subtitle style="color: #fff">Developer tools that are supposed to help you.</ui-drawer-subtitle>
        </ui-drawer-header>
        <ui-drawer-content>
            <ui-nav>
                <ui-nav-item :active="currSlug === element" :href="currSlug !== element ? '#/' + element : '#'" icon="time"
                    :class="{ 'nav-item': true, 'active': element === currSlug }" v-for="element in Object.keys(modules)">
                    <ui-icon style="padding-right: 10px" v-if="modules[element].icon">{{ modules[element].icon }}</ui-icon>
                    <img style="padding-right: 10px; width: 35px;" :src="modules[element].image"
                        :alt="modules[element].name + '\'s icon'" v-if="modules[element].image" />
                    {{ modules[element].name }}
                </ui-nav-item>
            </ui-nav>
        </ui-drawer-content>
    </ui-drawer>
</template>
<style scoped src="./styles.css"></style>