<script setup>
import TopBarButtons from "../../components/TopBarButtons/TopBarButtons.vue";
import { DevtaLogo } from "../../assets";
</script>

<template>
  <div class="m-0 p-0 w-100">
    <!-- <Sidebar /> -->
    <div class="container">
      <div class="h1">
        <img class="img" :src="DevtaLogo" /><strong>Devta</strong>
      </div>

      <p class="p-1 text-muted lead text-center">
        Elevate your development experience with Devta, the ultimate tool for
        simplifying and enhancing your daily tasks. <br />
        Choose an option from the menu to start working. <br />
        <strong>We do not send any data you submit to any server.</strong> <br />
        <strong><em><u>All data validation, processing and formatting is done in your browser.</u></em></strong><br />
        <em>You may check out the source code on our Github Repo!</em>
      </p>
      <div class="d-flex w-100 gap-2 justify-content-center align-items-center">
        <TopBarButtons />
      </div>
    </div>
  </div>
</template>

<style scoped src="./style.css"></style>
