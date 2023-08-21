<script setup>
import { buttonData } from './buttonData';
</script>

<template>
    <div id="root" v-for="(item, index) in buttonData" :key="index">
        <a :href="item.url" target="_blank" rel="noopener noreferrer">
            <button data-toggle="tooltip" data-placement="top" :title="item.tooltipTitle" class="btn btn-outline-dark">
                <i :class="item.iconClass"></i>
            </button>
        </a>
    </div>
</template>


<style scoped>
#root {
    display: flex;
    flex-direction: row;
}

a {
    text-decoration: none;
    color: black;
}

button:hover>a {
    color: white;
}
</style>