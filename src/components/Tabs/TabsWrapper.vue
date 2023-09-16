<script setup>
import { provide, ref, useSlots } from "vue";

const slots = useSlots();
const tabTitles = ref(slots.default().map((tab) => tab.props.title));
const activeTabTitle = ref(tabTitles.value[0]);
provide("activeTabTitle", activeTabTitle);
</script>
<template>
  <div class="tabs">
    <ul class="nav nav-tabs mt-3" style="border-bottom: none">
      <li class="nav-item" v-for="title in tabTitles" @click="activeTabTitle = title" :key="title">
        <a class="nav-link" :class="{ active: activeTabTitle == title }">{{ title }}</a>
      </li>
    </ul>
    <slot></slot>
  </div>
</template>
<style scoped>
* {
  --tab-color: #f0f0f0 !important;
}
[data-bs-theme="dark"] * {
  --tab-color: #272c30 !important;
}
.nav-tabs .nav-link.active {
  background-color: var(--tab-color);
  border-bottom-color: var(--tab-color);
}
.nav-tabs {
  border-bottom: none !important;
}
.nav-item {
  user-select: none;
  cursor: pointer;
}
</style>
