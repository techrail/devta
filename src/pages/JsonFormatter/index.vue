<script setup>
import { ref } from "vue";

const value = ref("");

const formattedVal = ref("");
var indent = 2;

function format(e) {
  try {
    formattedVal.value = JSON.stringify(
      JSON.parse(e.target.value),
      null,
      indent
    );
    value.value = e.target.value;
  } catch (er) {
    window.alert(er, "enter a valid json");
  }
}

function copy() {
  if (value.value != "") {
    navigator.clipboard.writeText(formattedVal);
    window.alert("copied to clipboard");
  } else {
    window.alert("please enter a json ");
  }
}
function reset() {
  (formattedVal.value = ""), (value.value = "");
}
// function newindent(event){
//   var selectedValue = event.target.value;
//   indent.value = selectedValue.value;

// }
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
            v-model="value"
            @change="format"
            rows="10"
            cols="60"
            placeholder="enter your json"
          ></textarea>
          <div class="d-flex flex-row justify-content-center gap-5">
            <button class="btn btn-primary " @Click="format(e)">beautify</button>
            <button class="btn btn-primary" @click="copy()">copy</button>
            <button class="btn btn-primary" @click="reset()">reset</button>
          </div>
        </div>
      </div>
    </div>
    <div class="block card block2 overflow-auto">
      <!-- output -->
      <div class="output" style="padding-top: 60px">
        <textarea v-model="formattedVal" rows="10" cols="70" disabled>
        </textarea>
      </div>
    </div>
  </div>
</template>

<style scoped src="./style.css" />
