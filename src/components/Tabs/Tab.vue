<script setup>
import { inject } from "vue";
const { title } = defineProps(["title"]);

const activeTabTitle = inject("activeTabTitle");
</script>
<template>
  <div class="tab-content border rounded overflow-auto" v-bind="$attrs" v-show="activeTabTitle == title">
    <slot></slot>
  </div>
</template>
<style scoped>
.tab-content {
  background-color: var(--tab-color);
  width: 100%;
}
.tab-content:first-of-type {
  border-top-left-radius: 0 !important;
}
</style>
