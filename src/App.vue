<script setup>
import {ref} from "vue";
import Header from "@/Header/index.vue";

const elements = ref([
  {
    title: "Unix Time Convertor",
    icon: "watch_later",
    active: true,
  },
  {
    title: "HTML Preview",
    icon: "code",
  }
])

</script>

<template>
  <Header :elements="elements"/>
</template>



<style scoped></style>
