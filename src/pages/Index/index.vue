<script setup>
import { useGlobalStore } from "@stores/index.mjs";

const store = useGlobalStore();

const routes = store.getRoutes();

const tools = Object.keys(routes).map(slug => ({
    url: '/' + slug,
    name: routes[slug].name,
    icon: routes[slug].icon,
    image: routes[slug].image
}));

</script>

<template>
    <div class="home">
        <h1 class="title">Devta</h1>
        <h3 class="motto">Developer tools that are supposed to help you.</h3>
        <div class="tools">
            <a class="btn tool" v-for="tool in tools" :href="tool.url">
                <span v-if="tool.icon" class="material-icons icon">{{ tool.icon }}</span>
                <img v-if="tool.image" :src="tool.image" class="image" />
                <h4>{{ tool.name }}</h4>
            </a>
        </div>
    </div>
</template>

<style scoped src="./style.css"></style>