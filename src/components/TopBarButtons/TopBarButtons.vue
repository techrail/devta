<script setup>
import { useThemeStore } from '../../stores/theme';
// import { switchTheme } from '../utils/themeSwitch';
import { buttonData } from './buttonData';

const store = useThemeStore()

</script>

<template>
    <div id="root" v-for="(item, index) in buttonData" :key="index">
        <a :href="item.url" target="_blank" rel="noopener noreferrer">
            <button data-toggle="tooltip" data-placement="top" :title="item.tooltipTitle" class="btn btn-secondary">
                <i :class="item.iconClass"></i>
            </button>
        </a>
    </div>
    <button class="btn btn-secondary" @click="store.toggleTheme" data-placement="top"
        :title="store.darkTheme ? 'switch to light' : 'switch to dark'">
        <div v-if="store.darkTheme">
            <i class="bi bi-brightness-high-fill"></i>
        </div>
        <div v-else>
            <i class="bi bi-moon-fill"></i>
        </div>
    </button>
</template>


<style></style>


