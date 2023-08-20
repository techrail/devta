<script setup>
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar/index.vue'
</script>


<template>
    <main class="d-flex">
        <div class="w-100">
            <RouterView />
        </div>
    </main>
</template>