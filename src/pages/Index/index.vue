<script setup>
import TopBarButtons from "../../components/TopBarButtons/TopBarButtons.vue";
</script>

<template>
  <div class="m-0 p-0 w-100">
    <!-- <Sidebar /> -->
    <div class="container">
      <div class="h1">
        <img class="img" src="src/assets/vajra2.svg" /><strong>Devta</strong>
      </div>

      <p class="p-1 text-muted lead text-center">
        Elevate your development experience with Devta, the ultimate tool for
        simplifying and enhancing your daily tasks. Choose an option from the
        menu start working.
      </p>
      <div class="d-flex w-100 gap-2 justify-content-center align-items-center">
        <TopBarButtons />
      </div>
    </div>
  </div>
</template>

<style scoped src="./style.css"></style>
