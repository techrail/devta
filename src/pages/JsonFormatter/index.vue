<script setup>
import { reactive, ref, onMounted, watchEffect } from "vue";
import PageHeader from "../../components/Pageheader/index.vue";
import { jsonValidator } from "../../components/utils/jsonConverter";


onMounted(() => document.querySelector("[autofocus]")?.focus());

const unformattedJson = ref(`{
  "id": 12345,
  "first_name": "John",
  "last_name": "Doe",
  "age": 30,
  "email": "john.doe@example.com",
  "address": {
    "street": "123 Main Street",
    "city": "Anytown",
    "state": "CA",
    "postal_code": "12345"
  }
}`);
const formattedVal = ref("");
const indent = ref(2)
const error = ref(false)

function format() {
  if (indent.value == "") indent.value = 2
  var spacer = "";
  for (let i = 0; i < indent.value; i++) {
    spacer += " ";
  }

  try {
    formattedVal.value = JSON.stringify(JSON.parse(unformattedJson.value), null, spacer);
    alert.invalid = false;
  } catch (error) {
    alert.invalid = true;
  }
}

function minify() {
  try {
    formattedVal.value = JSON.stringify(JSON.parse(unformattedJson.value), null, 0);
  } catch (er) {
    console.log(er);
  }
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

const handleInput = () => {
  if (unformattedJson.value == '') return
  error.value = !jsonValidator(unformattedJson.value)
  console.log(error.value)
}

watchEffect(() => {
  if (indent.value > 10 || indent.value < 0) return
  if (!error.value && unformattedJson.value !== "") format()
})


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
            <div class="form-floating">
              <textarea v-model="unformattedJson" @input="handleInput" autofocus type="text"
                :class="error ? 'form-control mono-font is-invalid' : 'form-control mono-font'" id="inputTextArea"
                placeholder="Enter JSON" spellcheck="false">
              </textarea>
              <label for="inputTextArea">Enter JSON</label>
            </div>
            <!-- <textarea class="form-control mono-font" id="textAreaExample2" v-model="unformattedJson" autofocus
              placeholder="Enter JSON" spellcheck="false"></textarea> -->
          </div>
          <div class="form-floating mt-2">
            <input type="number" v-model="indent" id="indentSpacing" class="form-control" max="10" min="1" />
            <label for="indentSpacing" class="form-label font-muted">Enter tab spacing</label>
          </div>
          <div class="d-flex gap-2 mt-2">
            <div class="d-flex flex-row justify-content-end w-100 gap-2">
              <button :disabled="error === true || unformattedJson.length === 0" class="btn btn-warning" @click="format()"
                data-placement="top" title="Beautify">
                <i class="bi bi-magic"></i>
              </button>
              <button :disabled="error === true || unformattedJson.length === 0" class="btn btn-warning" @click="minify()"
                data-placement="top" title="Minify">
                <i class="bi bi-file-earmark-zip"></i>
              </button>
              <button :disabled="error === true || unformattedJson.length === 0" class="btn btn-primary" @click="copy"
                data-placement="top" title="Copy to clipboard">
                <i class='bi bi-clipboard'></i>
              </button>
              <button class="btn btn-danger" @click="reset" type="reset" data-toggle="tooltip" data-placement="top"
                title="Clear text">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
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
          <!-- <div class="d-flex gap-2 p-2">
            <button class="btn btn-primary" @click="copy" data-placement="top" title="Copy to clipboard">
              <i :class="alert.isClicked ? 'bi bi-check-circle-fill' : 'bi bi-clipboard'"></i>
            </button>
            <button class="btn btn-danger" @click="reset" type="reset" data-toggle="tooltip" data-placement="top"
              title="Clear text">
              <i class="bi bi-x-lg"></i>
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="./style.css" />
