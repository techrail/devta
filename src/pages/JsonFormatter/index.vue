<script setup>
import { reactive, ref } from "vue";
import PageHeader from "../../components/Pageheader/index.vue";
import hljs from "highlight.js";
import json from "highlight.js/lib/languages/json";

const unformattedJson = ref("");

const formattedVal = ref("");
var indent = 2;
const alert = reactive({
  iscopy: null,
  invalid: null,
});

hljs.registerLanguage("json", json);

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
    alert.invalid = false;
  } catch (error) {
    alert.invalid = true;
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
  alert.iscopy = null;
  if (unformattedJson.value != "") {
    navigator.clipboard.writeText(formattedVal.value);
    alert.iscopy = true;
  } else {
    window.alert("please enter a json ");
  }
}
function reset() {
  (formattedVal.value = ""), (unformattedJson.value = "");
}
</script>

<template>
  <main class="bg-light p-0 m-0 w-100">
    <div class="w-100 mt-3">
      <PageHeader />
    </div>
    <div class="grid bg-light">
      <div class="block card block1 overflow-auto">
        <div class="p-3">
          <div class="form-outline">
            <!-- input -->
            <textarea
              class="form-control mono-font"
              id="textAreaExample2"
              v-model="unformattedJson"
              rows="10"
              cols="60"
              placeholder="enter your json"
            ></textarea>
            <br />
            <div class="d-flex flex-row justify-content-center gap-5">
              <div class="d-flex flex-column justify-content-center">
                <button class="btn btn-primary" @click="format()">
                  beautify
                </button>
                <p v-show="alert.invalid" class="text text-danger">
                  <strong>! Invalid Json</strong>
                </p>
              </div>

              <button class="btn btn-primary" @click="reset()">reset</button>

              <button class="btn btn-primary" @click="minify()">minify</button>
            </div>
            <br />
            <br /><br />
            <div
              class="d-flex flex-row justify-content-center gap-5 border-primary postition-absolute"
            >
              <select
                class="form-select form-select-sm"
                aria-label=".form-select-sm example"
                v-model="indent"
              >
                <option selected value="2">2 Tab Space</option>
                <option value="3">3 Tab Space</option>
                <option value="4">4 Tab Space</option>
                <option value="5">5 Tab Space</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="block card block2 overflow-auto">
       
        <div class="form-outline" style="padding-top: 60px">
          <textarea
            :value="formattedVal"
            class="form-control"
            id="textAreaExample2"
            rows="20"
            cols="70"
            disabled
          ></textarea>
          <button class="btn btn-primary mt-2" @click="copy()">
                <i class="bi bi-clipboard"></i>
              </button>
        </div>
      </div> -->
      <div class="p-2 overflow-auto">
        <div v-if="formattedVal">
          <highlightjs :code="formattedVal" />
          <button class="btn btn-primary mt-2" @click="copy()">
            <i class="bi bi-clipboard"></i>
          </button>
          <i v-show="alert.iscopy" class="copy bi bi-check-all"></i>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="./style.css" />
