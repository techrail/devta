<script setup>
import { reactive, ref } from "vue";
import jsonToPrettyYaml from "json-to-pretty-yaml";
import PageHeader from "../../components/Pageheader/index.vue";
import hljs from "highlight.js";
import json from "highlight.js/lib/languages/json";
const unformattedJson = ref("");
const formattedVal = ref("");
const selectedvalue = ref("none");
const alert = reactive({
  invalid: null,
  iscopy: null,
  notcopy: null,
});
hljs.registerLanguage("json", json);

function convert() {
  console.log(selectedvalue.value);
  if (selectedvalue.value == "none") {
    return;
  }
  if (selectedvalue.value == "yaml") {
    console.log("yaml is selected");
    format();
  }
}

function format() {
  alert.invalid = null;
  try {
    formattedVal.value = jsonToPrettyYaml.stringify(
      JSON.parse(unformattedJson.value),
      (alert.invalid = false)
    );
  } catch (error) {
    alert.invalid = true;
  }
}

function copy() {
  alert.iscopy = null;
  if (unformattedJson.value != "") {
    navigator.clipboard.writeText(formattedVal.value);
    alert.iscopy = true;
  } else {
    alert.notcopy = true;
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
              class="form-control"
              id="textAreaExample2 mono-font"
              v-model="unformattedJson"
              rows="10"
              cols="60"
              placeholder="enter your json"
            ></textarea>
            <br />

            <br />
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="selectedvalue"
            >
              <option value="none">Convert to...</option>
              <option value="yaml">YAML</option>
            </select>
            <div class="d-flex flex-row justify-content-center gap-5 mt-5">
              <div class="contain flex-column">
                <button class="btn btn-primary" @click="convert()">
                  convert
                </button>
                <p v-show="alert.invalid" class="text text-danger">
                  <strong>! Invalid Json</strong>
                </p>
              </div>

              <button class="btn btn-primary ml-5" @click="reset()">
                reset
              </button>
            </div>

            <div
              class="d-flex flex-row justify-content-center gap-5 border-primary"
            ></div>
          </div>
        </div>
      </div>
      <div class="block card block2 overflow-auto">
        <!-- output -->
        <!-- <div v-if="formattedVal">
          <div class="form-outline" style="padding-top: 20px">
            <textarea
              :value="formattedVal"
              class="form-control"
              id="textAreaExample2"
              rows="20"
              cols="60"
              disabled
            ></textarea>

            <div class="contain">
              <button class="btn btn-primary mt-2" @click="copy()">
                <i class="bi bi-clipboard"></i>
              </button>

              <i v-show="alert.iscopy" class="copy bi bi-check-all"></i>
            </div>
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
    </div>
  </main>
</template>

<style scoped src="./style.css" />
