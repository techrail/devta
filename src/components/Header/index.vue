<script setup>
import {ref, onMounted, onUnmounted} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
defineProps(['elements']);

const store = useStore('global');
const route = useRoute();
const isMobile = ref(window.innerWidth < 800);

function resize(){
    isMobile.value = window.innerWidth < 800;
}

onMounted(() => {
    window.addEventListener('resize', resize);
});

onUnmounted(() => {
    window.removeEventListener('resize', resize);
});

const currSlug = route.params.slug;

const modules = store.getters.getModules();

</script>
<template>
    <ui-top-app-bar content-selector="#content-main" nav-id="demo-menu" v-show="isMobile" class="app-bar">Devta</ui-top-app-bar>
    <ui-drawer nav-id="demo-menu" :type="isMobile ? 'modal' : 'permanent'" class="nav-parent">
    <ui-drawer-header>
        <ui-drawer-title style="color: #fff">Devta</ui-drawer-title>
        <ui-drawer-subtitle style="color: #fff">Developer tools that are supposed to help you.</ui-drawer-subtitle>
    </ui-drawer-header>
    <ui-drawer-content>
        <ui-nav>
            <ui-nav-item active :href="currSlug !== element ? '/'+element : '#'" icon="time" :class="{ 'nav-item': true, 'active': element === currSlug }" v-for="element in Object.keys(modules)">
                <ui-icon style="padding-right: 10px" v-if="modules[element].icon">{{ modules[element].icon}}</ui-icon>
                {{ modules[element].name }}
            </ui-nav-item>
        </ui-nav>
    </ui-drawer-content>
    </ui-drawer>
</template>
<style scoped src="./styles.css">
</style>