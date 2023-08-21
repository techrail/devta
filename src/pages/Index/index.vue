<script setup>
import TopBarButtons from '../../components/TopBarButtons/TopBarButtons.vue';
</script>

<template>
    <div class="m-0 p-0 w-100">
        <!-- <Sidebar /> -->
        <div class="container">

            <h1><strong>Devta</strong><img class="img" src="src/assets/vajra2.svg"></h1>
            <p class="p-1 text-muted lead ">
                Choose an option from the left to start working

            <h1><strong>Devta⚡️</strong></h1>
            <p class="p-1 text-muted lead text-center">
                Elevate your development experience with Devta, the ultimate tool for simplifying and enhancing your daily
                tasks. Choose an option from the menu start working.

            </p>
            <div class="d-flex w-100 gap-2 justify-content-center align-items-center">
                <TopBarButtons />
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
}
.img{
  height: 80px;
  width: 60px;
  
  margin-bottom: 5px;
 
  transform: rotate(35deg);

  
  
  
}
</style>
