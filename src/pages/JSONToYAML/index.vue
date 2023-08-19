<script setup>
import { ref } from "vue";
import jsonToPrettyYaml from "json-to-pretty-yaml";

const unformattedJson = ref("");

const formattedVal = ref("");

function format() {
  try {
    formattedVal.value = jsonToPrettyYaml.stringify(
      JSON.parse(unformattedJson.value)
    );
  } catch (error) {
    window.alert("Invalid JSON input.");
    console.error("Error while formatting JSON:", error);
  }
}

function copy() {
  if (unformattedJson.value != "") {
    navigator.clipboard.writeText(formattedVal.value);
    window.alert("copied to clipboard");
  } else {
    window.alert("please enter a json ");
  }
}
function reset() {
  (formattedVal.value = ""), (unformattedJson.value = "");
}
</script>

<template>
  <div class="grid bg-light">
    <div class="block card block1 overflow-auto">
      <div class="p-3">
        <h4>
          <strong> Json To YAML </strong>
        </h4>
        <div class="form-outline">
          <!-- input -->
          <textarea
            class="form-control"
            id="textAreaExample2"
            v-model="unformattedJson"
            rows="10"
            cols="60"
            placeholder="enter your json"
          ></textarea>
          <br />
          <div class="d-flex flex-row justify-content-center gap-5">
            <button class="btn btn-primary" @click="format()">convert</button>
            <button class="btn btn-primary" @click="reset()">reset</button>
            <button class="btn btn-primary" @click="copy()">
              <i class="bi bi-clipboard"></i>
            </button>
          </div>
          <br />
          <div
            class="d-flex flex-row justify-content-center gap-5 border-primary"
          ></div>
        </div>
      </div>
    </div>
    <div class="block card block2 overflow-auto">
      <!-- output -->
      <div class="form-outline" style="padding-top: 60px">
        <textarea
          :value="formattedVal"
          class="form-control"
          id="textAreaExample2"
          rows="20"
          cols="70"
          disabled
        ></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped src="./style.css" />
