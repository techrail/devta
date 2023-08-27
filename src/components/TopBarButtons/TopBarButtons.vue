<script setup>
import { switchTheme } from '../utils/themeSwitch';
import { buttonData } from './buttonData';

</script>

<template>
    <div id="root" v-for="(item, index) in buttonData" :key="index">
        <a :href="item.url" target="_blank" rel="noopener noreferrer">
            <button data-toggle="tooltip" data-placement="top" :title="item.tooltipTitle" class="btn btn-secondary">
                <i :class="item.iconClass"></i>
            </button>
        </a>
    </div>
    <button class="btn btn-secondary" @click="switchTheme">
        <i class="bi bi-brightness-high-fill"></i>
    </button>
</template>


