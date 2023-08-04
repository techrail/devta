<script setup>
import Sidebar from "@/Sidebar/index.vue";
</script>

<template>
    <div class="d-flex m-0 p-0">
        <Sidebar />
        <div class="container">
            <h1>Devta</h1>
            <p class="p-1">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, inventore earum, porro perferendis
                eius,
                aut quidem minus quas ratione id doloribus tempore optio recusandae delectus et. Minima doloribus
                praesentium
                qui!
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
