<script setup>
import { reactive, ref } from "vue";
import jsonToPrettyYaml from "json-to-pretty-yaml";
import PageHeader from "../../components/Pageheader/index.vue";
import MultiLineCopy from "../../components/CopyContainer/MultiLineCopy.vue";

const unformattedJson = ref("");
const formattedVal = ref("");
const selectedvalue = ref("none");
const alert = reactive({
  invalid: null,
  iscopy:null,
  notcopy:null
});

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
  alert.iscopy=null;
  if (unformattedJson.value != "") {
    navigator.clipboard.writeText(formattedVal.value);
    alert.iscopy=true;
  } else {
    alert.notcopy=true;
    console.log(alert.iscopy)
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
            <div class="d-flex flex-row justify-content-center gap-5">
              <!-- <button class="btn btn-primary" @click="format()">convert</button> -->
              <button class="btn btn-primary" @click="reset()">reset</button>
              <button class="btn btn-primary" @click="copy()">
                <i class="bi bi-clipboard"></i>
              </button>
            </div>
            <br />
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="selectedvalue"
            >
              <option value="none">Convert to...</option>
              <option value="yaml">YAML</option>
            </select>
            <div style="margin-top: 10px">
              <button class="btn btn-primary" @click="convert()">
                convert
              </button>
            </div>
            <div
              v-show="alert.invalid"
              class="alert alert-danger alert-dismissible fade show mt-5"
              role="alert"
            >
              <strong>Invalid Json</strong>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
             <div
              v-show="alert.notcopy"
              class="alert alert-danger alert-dismissible fade show mt-5"
              role="alert"
            >
              <strong>There is nothing to Copy</strong>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
             <div
              v-show="alert.iscopy"
              class="alert alert-success alert-dismissible fade show mt-5"
              role="alert"
            >
              <strong> Copied</strong>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>



            <div
              class="d-flex flex-row justify-content-center gap-5 border-primary"
            ></div>
          </div>
        </div>
      </div>
      <div class="block card block2 overflow-auto">
        <!-- output -->
        <div v-if="formattedVal">
          <div class="form-outline" style="padding-top: 60px">
           
            <textarea 
            :value="formattedVal"
            class="form-control"
            id="textAreaExample2"
            rows="20"
            cols="60"
            disabled
          ></textarea>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="./style.css" />
