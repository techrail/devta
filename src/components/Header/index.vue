<script setup>
import {ref, onMounted, onUnmounted} from "vue";
defineProps(['elements']);

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

</script>drawerType: isMobile
<template>
    <ui-top-app-bar content-selector="#content-main" nav-id="demo-menu" v-show="isMobile">Devta</ui-top-app-bar>
    <ui-drawer nav-id="demo-menu" :type="isMobile ? 'modal' : 'permanent'" class="nav-parent">
    <ui-drawer-header>
        <ui-drawer-title style="color: #fff">Devta</ui-drawer-title>
        <ui-drawer-subtitle style="color: #fff">Developer tools that are supposed to help you.</ui-drawer-subtitle>
    </ui-drawer-header>
    <ui-drawer-content>
        <ui-nav>
        <ui-nav-item active href="/" icon="time" :class="{'nav-item': true,'active':element.active}" v-for="element in elements">
            <ui-icon style="padding-right: 10px">{{element.icon}}</ui-icon>
            {{element.title}}
        </ui-nav-item>
        </ui-nav>
    </ui-drawer-content>
    </ui-drawer>
</template>
<style scoped src="./styles.css">
</style>