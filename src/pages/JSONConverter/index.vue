<script setup>
import { ref, onMounted } from "vue";
import PageHeader from "../../components/Pageheader/index.vue";
import { converterOptions, sampleJson, formatYAML, formatXML, jsonValidator, formatCSV } from "../../components/utils/jsonConverter";
import { copyToClipboard } from "../../components/utils/UnixDateTime";

onMounted(() => document.querySelector("[autofocus]")?.focus());

const unformattedJson = ref(sampleJson);
const formattedVal = ref();
const selectedvalue = ref(converterOptions[0]);
const error = ref(false);
const isClicked = ref(false);

const convert = () => {
  switch (selectedvalue.value) {
    case "yaml":
      convertToYaml();
      break;

    case "xml":
      convertToXML();
      break;

    case "csv":
      convertToCSV();
      break;
    default:
      break;
  }
};

const convertToYaml = () => {
  try {
    formattedVal.value = formatYAML(unformattedJson.value);
  } catch (error) {
    console.log(error);
  }
};

const convertToXML = () => {
  try {
    formattedVal.value = formatXML(unformattedJson.value);
  } catch (error) {
    console.log(error);
  }
};

const convertToCSV = () => {
  try {
    formattedVal.value = formatCSV(unformattedJson.value);
  } catch (error) {
    console.log(error);
  }
};

const handleChange = () => {
  if (!unformattedJson.value) {
    error.value = false;
    return;
  }
  error.value = !jsonValidator(unformattedJson.value);
};

const handleClear = () => {
  unformattedJson.value = "";
  formattedVal.value = "";
  error.value = false;
};

const handleCopy = () => {
  if (!formattedVal.value) return;
  copyToClipboard(formattedVal.value);
  isClicked.value = true;
  function change() {
    isClicked.value = false;
  }
  setTimeout(change, 3000);
};
</script>

<template>
  <main class="p-0 m-0 w-100">
    <div class="w-100 mt-3">
      <PageHeader />
    </div>
    <div class="grid mt-1">
      <div class="block card block1">
        <div class="p-3 overflow-auto">
          <div class="form-floating">
            <textarea
              v-model="unformattedJson"
              @input="handleChange"
              autofocus
              type="text"
              :class="error ? 'form-control mono-font is-invalid' : 'form-control mono-font'"
              id="tokenInput"
              placeholder="Enter Json"
              spellcheck="false"
            >
            </textarea>
            <label for="tokenInput">Enter Json</label>
          </div>
          <div class="d-flex flex-column mt-2 justify-content-between align-items-center gap-2">
            <!-- format dropdown -->
            <div class="form-floating w-100">
              <select class="form-select" name="timezone-select" id="dropdown" v-model="selectedvalue">
                <option :value="converterOptions[0]">
                  {{ converterOptions[0] }}
                </option>
                <option v-for="zone in converterOptions.slice(1)" :value="zone" :key="zone">
                  {{ zone }}
                </option>
              </select>
              <label for="dropdown">choose format</label>
            </div>
            <!-- convert button -->
            <button type="button" :disabled="error === true || unformattedJson.length === 0" @click="convert" class="btn btn-primary w-100">
              Convert
            </button>
          </div>
        </div>
      </div>

      <div class="block card block2">
        <div class="d-flex flex-column h-100 justify-content-between">
          <div class="p-2 overflow-auto">
            <div v-if="error">
              <div class="alert alert-danger" role="alert">Invalid JSON</div>
            </div>
            <div v-if="formattedVal">
              <highlightjs :code="formattedVal" />
            </div>
          </div>
          <div class="d-flex gap-2 p-2">
            <button class="btn btn-primary" @click="handleCopy" data-placement="top" title="Copy to clipboard">
              <i :class="isClicked ? 'bi bi-check-circle-fill' : 'bi bi-clipboard'"></i>
            </button>
            <button class="btn btn-danger" @click="handleClear" type="reset" data-toggle="tooltip" data-placement="top" title="Clear text">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="./style.css" />
