<script setup>
const props = defineProps(['dir']);

const { default: component } = await import(`../${props.dir}/index.vue`);
</script >

<template>
  <component />
</template>

