<script setup>
import { ref, onMounted, watchEffect } from "vue";
import PageHeader from "../../components/Pageheader/index.vue";
import { toCamelCase, toSnakeCase, toKebabCase, toPascalCase, toMacroCase, toTrainCase, sampleInput, ifNull } from "../../components/utils/stringCaseConverter.js";
import { copyToClipboard } from "../../components/utils/UnixDateTime";

onMounted(() => {
  document.querySelector("[autofocus]")?.focus();
});

const converterOptions = ["Camel", "Snake", "Kebab", "Pascal", "Macro", "Train"];
const selectedvalue = ref(converterOptions[0]);
const input = ref(sampleInput);
const formattedVal = ref();
const error = ref(false);
const isClicked = ref(false);

const convertToCamelCase = () => {
  try {
    if (ifNull(input.value)) {
      formattedVal.value = ' '
    }
    else {
      formattedVal.value = toCamelCase(input.value)
    }
  } catch (error) {
    console.log(error);
  }
};

const convertToSnakeCase = () => {
  try {
    if (ifNull(input.value)) {
      formattedVal.value = ' '
    }
    else {
      formattedVal.value = toSnakeCase(input.value)
    }
  } catch (error) {
    console.log(error);
  }
};

const convertToKebabCase = () => {
  try {
    if (ifNull(input.value)) {
      formattedVal.value = ' '
    }
    else {
      formattedVal.value = toKebabCase(input.value)
    }
  } catch (error) {
    console.log(error);
  }
};

const convertToPascalCase = () => {
  try {
    if (ifNull(input.value)) {
      formattedVal.value = ' '
    }
    else {
      formattedVal.value = toPascalCase(input.value)
    }
  } catch (error) {
    console.log(error);
  }
};

const convertToMacroCase = () => {
  try {
    if (ifNull(input.value)) {
      formattedVal.value = ' '
    }
    else {
      formattedVal.value = toMacroCase(input.value)
    }
  } catch (error) {
    console.log(error);
  }
};

const convertToTrainCase = () => {
  try {
    if (ifNull(input.value)) {
      formattedVal.value = ' '
    }
    else {
      formattedVal.value = toTrainCase(input.value)
    }
  } catch (error) {
    console.log(error);
  }
};

const convert = () => {
  switch (selectedvalue.value) {
    case "Camel":
    convertToCamelCase();
      break;

    case "Snake":
    convertToSnakeCase();
      break;
    
    case "Kebab":
    convertToKebabCase();
      break;

    case "Pascal":
    convertToPascalCase();
      break;

      case "Macro":
    convertToMacroCase();
      break;

      case "Train":
    convertToTrainCase();
      break;

    default:
      break;
  }
};

const handleChange = () => {
  console.log(input)
  if (!input.value) {
    error.value = false;
    return;
  }
};

const handleClear = () => {
  input.value = null;
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

watchEffect(() => {
  convert();
});
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
              v-model="input"
              @input="handleChange"
              autofocus
              type="text"
              :class="error ? 'form-control mono-font is-invalid' : 'form-control mono-font'"
              id="tokenInput"
              placeholder="Enter Ascii"
              spellcheck="false"
            >
            </textarea>
            <label for="tokenInput">Enter Input</label>
            <div class="form-floating w-100">
              <select class="form-select" name="timezone-select" id="dropdown" v-model="selectedvalue" :disabled="error">
                <option :value="converterOptions[0]">
                  {{ converterOptions[0] }}
                </option>
                <option v-for="zone in converterOptions.slice(1)" :value="zone" :key="zone">
                  {{ zone }}
                </option>
              </select>
              <label for="dropdown">Convert to</label>
            </div>
          </div>
        </div>
      </div>

      <div class="block card block2">
        <div class="d-flex flex-column h-100 justify-content-between">
          <div class="p-2 overflow-auto">
            <div v-if="error">
              <div class="alert alert-danger" role="alert">Invalid Ascii</div>
            </div>
            <div v-if="formattedVal">
              <p>{{formattedVal}}</p>
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
