<script setup>
import { useRoute } from 'vue-router';
import TopBarButtons from '../TopBarButtons/TopBarButtons.vue';

const route = useRoute()
const IS_ELECTRON = window.IS_ELECTRON || false;
</script>

<template>
    <div class="top_header ">
        <div class="heading w-auto">
            <strong>
                {{ route.name }}
            </strong>
        </div>
        <div class="d-flex gap-2">
            <TopBarButtons v-if="!IS_ELECTRON" />
        </div>
    </div>
</template>

<style scoped>
.top_header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
}

.heading {
    font-size: x-large;
}
</style>

