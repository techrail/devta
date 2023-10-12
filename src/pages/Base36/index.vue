<script setup>
import {ref} from "vue";
import {copyToClipboard} from "@/utils/UnixDateTime.js";

const input = ref("123");
const b36 = ref(parseInt(input.value).toString(36));
const error = ref(false);

const handleChange = () => {
  const val = input.value.substring(input.value.length - 1).charCodeAt(0);

  if (val >= 48 && val <= 57)
    b36.value = parseInt(input.value).toString(36);
  else
    input.value = input.value.substring(0, input.value.length - 1);
};

const handleB36Change = () => {
  error.value = false;
  try {
    input.value = parseInt(b36.value, 36).toString();
  } catch (e) {
    error.value = true;
    console.log(e.message);
  }
};

const handleClear = () => {
  error.value = false;
  input.value = null;
  b36.value = null;
};

const handleCopy = (value) => {
  copyToClipboard(value);
};
</script>

<template>
  <main class="p-0 m-0 w-100">
    <div class="w-100 mt-3">
      <PageHeader/>
    </div>
    <div class="grid mt-1">
      <div class="block card block1">
        <div class="p-3">
          <div class="overflow-auto">
            <div class="form-floating">
              <textarea
                  id="baseInput"
                  v-model="input"
                  autofocus
                  class="form-control mono-font"
                  placeholder="Enter the token"
                  type="text"
                  @input="handleChange"
              >
              </textarea>
              <label for="baseInput">Base10</label>
            </div>
          </div>
          <div class="d-flex gap-2 p-2">
            <button class="btn btn-primary" data-placement="top" title="Copy to clipboard" @click="handleCopy(input)">
              <i class="bi bi-clipboard"></i>
            </button>
            <button class="btn btn-danger" data-placement="top" data-toggle="tooltip" title="Clear text" type="reset"
                    @click="handleClear">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="block card overflow-auto block2">
        <div class="p-3">
          <div class="overflow-auto">
            <div class="form-floating">
              <textarea
                  id="baseInput"
                  v-model="b36"
                  :class="error ? 'form-control mono-font is-invalid' : 'form-control mono-font'"
                  autofocus
                  placeholder="Enter the token"
                  type="text"
                  @input="handleB36Change"
              >
              </textarea>
              <label for="baseInput">Base36</label>
            </div>
          </div>
          <div class="d-flex gap-2 p-2">
            <button class="btn btn-primary" data-placement="top" title="Copy to clipboard" @click="handleCopy(b36)">
              <i class="bi bi-clipboard"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="./style.css"/>
