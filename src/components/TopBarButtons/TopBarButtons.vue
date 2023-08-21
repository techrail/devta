<script setup>
import { buttonData } from './buttonData';
</script>

<template>
    <div id="root" v-for="(item, index) in buttonData" :key="index">
        <button data-toggle="tooltip" data-placement="top" :title="item.tooltipTitle" class="btn btn-outline-dark">
            <a :href="item.url" target="_blank" rel="noopener noreferrer">
                <i :class="item.iconClass"></i>
            </a>
        </button>
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