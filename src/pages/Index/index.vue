<script setup>
import { DevtaLogo, hf10_banner_1032x600 } from "../../assets";
import TopBarButtons from "../../components/TopBarButtons/TopBarButtons.vue";

const IS_ELECTRON = window.IS_ELECTRON || false;
</script>

<template>
  <div class="m-0 p-0 w-100">
    <!-- <Sidebar /> -->
    <div class="container py-3 py-md-5 justify-content-start justify-content-xl-center" :style="IS_ELECTRON && 'height: calc(100vh - 54px) !important'">
      <div class="h1">
        <img class="img" :src="DevtaLogo" />
        <strong>Devta</strong>
      </div>
      <p class="p-1 text-muted lead text-center">
        Elevate your development experience with Devta, the ultimate tool for simplifying and enhancing your daily tasks. <br />
        Choose an option from the menu to start working. <br />
        <strong>We do not send any data you submit to any server.</strong> <br />
        <strong>
          <em><u>All data validation, processing and formatting is done in your browser.</u></em>
        </strong>
        <br />
        <em>You may check out the source code on our Github Repo!</em>
      </p>
      <div class="d-flex w-100 gap-2 justify-content-center align-items-center">
        <TopBarButtons />
      </div>

      <br />
      <div class="row align-items-center mx-auto mt-4 pb-5 pb-lg-0">
        <div class="col"></div>
        <div class="col-12 col-lg-5">
          <img :src="hf10_banner_1032x600" alt="Hacktoberfest 2023 Banner" class="w-100 rounded" />
        </div>
        <div style="font-family: monospace" class="col-12 col-lg-5 p-4 text-lg-start text-center">
          <span class="fs-5"
            >We're excited to announce that we are participating in <b>Hacktoberfest 2023</b>, a month-long celebration of open source.
          </span>
          <hr />
          <span>It's a fantastic opportunity for you to get involved and make a difference!</span>
          <span class="pt-2">
            So why wait ? Head over to our <a href="https://github.com/techrail/devta">GitHub</a> page now and start making your mark on the open
            source world. Join us in this global celebration of open source and let's make Hacktoberfest 2023 the best one yet!
          </span>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<style scoped src="./style.css"></style>
