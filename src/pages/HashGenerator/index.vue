<script setup>
import CryptoJS from "crypto-js";
import { ref, onMounted } from "vue";
import "bootstrap-icons/font/bootstrap-icons.css";
import PageHeader from "../../components/Pageheader/index.vue";
import SingleLineCopy from "../../components/CopyContainer/SingleLineCopy.vue";
import MultiLineCopy from "../../components/CopyContainer/MultiLineCopy.vue"

// const store = useGlobalStore();
onMounted(() => document.querySelector("[autofocus]")?.focus());

const value = ref("Hello World");

const algos = {
  MD5: CryptoJS.MD5,
  SHA1: CryptoJS.SHA1,
  SHA3: CryptoJS.SHA3,
  SHA224: CryptoJS.SHA224,
  SHA256: CryptoJS.SHA256,
  SHA384: CryptoJS.SHA384,
  SHA512: CryptoJS.SHA512,
};

const outputs = ref(Object.keys(algos).map((e) => algos[e](value.value).toString()));
let timeout = undefined;

function handleChange() {
  // console.log(value.value)
  // value.value = value;
  outputs.value = Object.keys(algos).map((e) => algos[e](value.value).toString());
  return;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    outputs.value = Object.keys(algos).map((e) => algos[e](value.value).toString());
  }, 1000);
}

async function copyContent(idx) {
  await navigator.clipboard.writeText(outputs.value[idx]);
  store.showSnackbar("Contents copied to clipboard");
}
</script>

<template>
  <main class="p-0 m-0 w-100">
    <div class="w-100 mt-3">
      <PageHeader />
    </div>

    <div class="grid mt-1">
      <div class="block card block1">
        <div class="w-100 p-3">
          <div class="overflow-auto">
            <div class="form-floating">
              <textarea v-model="value" autofocus type="text" class="form-control mono-font" id="textInput"
                placeholder="Enter text"> </textarea>
              <label for="textInput">Enter text</label>
            </div>
          </div>
        </div>
        <div class="p-2">
          <div class="w-50">
            <button class="btn btn-warning" @click="handleChange">Compute hash</button>
          </div>
        </div>
      </div>

      <div class="block card block2 overflow-auto">
        <div v-for="(element, index) in Object.keys(algos)" class="d-flex flex-column p-2">
          <div v-if="index <= 1">
            <SingleLineCopy :title="element" :value="outputs[index]" />
          </div>
          <div v-else>
            <MultiLineCopy :title="element" :value="outputs[index]" height="100px" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="./style.css"></style>
