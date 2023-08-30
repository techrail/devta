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
  isClicked: false,
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
function change() {
  alert.isClicked = false;
}

function copy() {
  navigator.clipboard.writeText(formattedVal.value);
  alert.isClicked = true;
  function change() {
    alert.isClicked = false;
  }
  setTimeout(change, 3000);
}
function reset() {
  (formattedVal.value = ""), (unformattedJson.value = "");
}
</script>

<template>
  <main class="p-0 m-0 w-100">
    <div class="w-100 mt-3">
      <PageHeader />
    </div>
    <div class="grid mt-1">
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
              spellcheck="false"
            ></textarea>
            <br />
            <div class="d-flex flex-row justify-content-center gap-5">
              <div class="d-flex flex-column justify-content-center">
                <button class="btn btn-primary" @click="format()">
                  beautify
                </button>
              </div>

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

      <div class="block card block2">
        <div class="d-flex flex-column h-100 justify-content-between">
          <div class="p-2 overflow-auto">
            <div v-if="alert.invalid">
              <div class="alert alert-danger" role="alert">Invalid JSON</div>
            </div>

            <div v-if="formattedVal">
              <highlightjs :code="formattedVal" />
            </div>
          </div>
          <div class="d-flex gap-2 p-2">
            <button
              class="btn btn-primary"
              @click="copy"
              data-placement="top"
              title="Copy to clipboard"
            >
              <i
                :class="
                  alert.isClicked
                    ? 'bi bi-check-circle-fill'
                    : 'bi bi-clipboard'
                "
              ></i>
            </button>
            <button
              class="btn btn-danger"
              @click="reset"
              type="reset"
              data-toggle="tooltip"
              data-placement="top"
              title="Clear text"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="./style.css" />
