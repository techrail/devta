<script setup>
const props = defineProps(['dir']);

const componentPath = '../' + props.dir + '/index.vue';

const { default: page } = await import(componentPath);
</script>

<template>
    <page />
</template>
