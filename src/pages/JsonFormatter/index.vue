<script setup>
import { ref } from "vue";

const unformattedJson = ref("");

const formattedVal = ref("");
var indent = 2;

function format() {
  console.log(indent);
  var spacer = "";
  for (let i = 0; i < indent; i++) {
    spacer += " ";
  }

  try {
    formattedVal.value = JSON.stringify(
      JSON.parse(unformattedJson.value),
      null,
      spacer
    );
    console.log("spacer-value:", spacer);
    console.log("formattedval-value:", formattedVal.value);
  } catch (error) {
    window.alert("Invalid JSON input.");
    console.error("Error while formatting JSON:", error);
  }
}

function minify() {
  try {
    formattedVal.value = JSON.stringify(
      JSON.parse(unformattedJson.value),
      null,
      0
    );

    console.log("coming from minify function");
  } catch (er) {
    window.alert(er, "enter a valid json");
    console.log("coming from minify function");
    console.log(er);
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
          <strong> Json Formatter </strong>
        </h4>
        <div class="p-2">
          <!-- input -->
          <textarea
            v-model="unformattedJson"
            rows="10"
            cols="60"
            placeholder="enter your json"
          ></textarea>
          <div class="d-flex flex-row justify-content-center gap-5">
            <button class="btn btn-primary" @click="format()">beautify</button>
            <button class="btn btn-primary" @click="copy()">copy</button>
            <button class="btn btn-primary" @click="reset()">reset</button>
          </div>
          <br />
          <div class="d-flex flex-row justify-content-center gap-5">
            <select class="btn btn-primary" v-model="indent">
              <option value="2">2 Tab space</option>
              <option value="3">3 Tab space</option>
              <option value="4">4 Tab space</option>
            </select>
            <button class="btn btn-primary" @click="minify()">
              minify/compact
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="block card block2 overflow-auto">
      <!-- output -->
      <div class="output" style="padding-top: 60px">
        <textarea :value="formattedVal" rows="70" cols="70" disabled></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped src="./style.css" />
