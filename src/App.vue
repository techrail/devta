<script setup>
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar/index.vue'
</script>


<template>

    <main class="d-md-flex flex-md-row  flex-sm-column m-0 p-0 w-100">
        <Sidebar />
        <div class="container  w-100">
            <RouterView />
        </div>

    <main class="d-md-flex flex-md-row flex-sm-column m-0 p-0 w-100">
        <!-- <div class="container w-100"> -->
        <Sidebar />
        <RouterView />
        <!-- </div> -->

    </main>
</template>


<style scoped>
.container {
    display: flex;
    flex-direction: column;
    margin: 0%;
    padding: 0%;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
}
</style>