<script setup>
import Sidebar from "@/Sidebar/index.vue";
</script>

<template>
    <div class="d-md-flex flex-md-row flex-sm-column m-0 p-0">
        <Sidebar />
        <div class="container">
            <h1><strong>Devta⚡️</strong></h1>
            <p class="p-1 text-muted lead ">
                Choose an option from the left to start working
            </p>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
</style>
