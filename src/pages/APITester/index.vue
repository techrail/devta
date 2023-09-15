<script setup>
import { ref, toRaw, nextTick } from "vue";
import { onMounted } from "vue";
import PageHeader from "../../components/Pageheader/index.vue";
import RepFormField from "@/RepFormField/index.vue";
import { TabsWrapper, Tab } from "../../components/Tabs/index.vue";
import { beautifyJSON } from "../../components/utils/jsonBeautifier";
import { makeRequest, BODY_TYPE, METHOD_TYPE } from "../../components/utils/apiTester";

const SUPPORTED_METHODS = [METHOD_TYPE.GET, METHOD_TYPE.POST, METHOD_TYPE.PUT, METHOD_TYPE.DELETE, METHOD_TYPE.PATCH];

const isClicked = ref(false);
const focusInput = ref(null);
const req = ref({
  headers: [["", ""]],
  type: BODY_TYPE.JSON,
  form: [["", ""]],
  json: "",
  jsonInvalid: false,
});
const isSending = ref(false);
const res = ref({
  json: "",
  isError: false,
  msg: "",
  status: "",
  size: "",
  time: "",
});
const url = ref("https://jsonplaceholder.typicode.com/posts");
const methodType = ref(METHOD_TYPE.GET);

// Lifecycle
onMounted(() => {
  focusInput.value.focus();
  focusInput.value.select();
  if (document.querySelector("#res-json-div pre > .hljs")) {
    document.querySelector("#res-json-div pre > .hljs").style.height = "100%";
  }
});

// Functions
const handleAdd = (key) => req.value[key].push(["", ""]);
const handleRemove = (key, index) => req.value[key].splice(index, 1);
const onJsonBlur = () => {
  if (req.value.json === "") return;
  const beautifiedJSON = beautifyJSON(req.value.json);
  req.value.jsonInvalid = beautifiedJSON === null;
  if (!req.value.jsonInvalid) req.value.json = beautifiedJSON;
};
const handleSend = async () => {
  if (url.value === "") {
    focusInput.value.focus();
    return;
  }
  isSending.value = true;
  const response = await makeRequest({
    methodType: methodType.value,
    url: url.value,
    headers: toRaw(req.value.headers),
    form: toRaw(req.value.form),
    json: req.value.json,
    type: req.value.type,
  });
  res.value = response;
  nextTick(() => {
    if (document.querySelector("#res-json-div pre > .hljs")) {
      document.querySelector("#res-json-div pre > .hljs").style.height = "100%";
    }
  });
  isSending.value = false;
};
const handleCopy = async () => {
  if (res.value.json == "") return;
  isClicked.value = true;
  await navigator.clipboard.writeText(res.value.json.replace("\n", "\r\n"));
  setTimeout(() => (isClicked.value = false), 1500);
};
</script>

<template>
  <main class="p-0 m-0 w-100 bg-body overflow-auto">
    <div class="w-100 mt-3">
      <PageHeader />
    </div>

    <div class="grid mt-1">
      <div class="card p-3 h-100">
        <div class="row g-2">
          <div class="order-2 order-sm-1 col-xl-1 col-sm-auto col-4">
            <div class="form-floating">
              <select v-model="methodType" :value="METHOD_TYPE.GET" class="form-control mono-font" id="methodType">
                <option v-for="method in SUPPORTED_METHODS" :value="method" :key="method">
                  {{ method }}
                </option>
              </select>
              <label for="methodType">Method</label>
            </div>
          </div>
          <div class="order-1 order-sm-2 col-xl-9 col-sm col-12">
            <div class="form-floating">
              <input ref="focusInput" v-model="url" type="text" class="form-control mono-font" id="urlInput" placeholder="http://example.com" />
              <label for="urlInput">URL</label>
            </div>
          </div>
          <div class="order-3 order-sm-3 col-xl-2 col-sm-auto col-8">
            <button class="btn btn-success btn-lg w-100 h-100" @click="handleSend" :disabled="isSending" title="Send Request">
              <span class="spinner-border spinner-border-sm" v-show="isSending" aria-hidden="true"></span>
              {{ isSending ? "Sending" : "Send" }}
            </button>
          </div>
        </div>

        <!-- TABS_START -->
        <TabsWrapper>
          <Tab title="Headers" class="p-3">
            <RepFormField @removeEvent="handleRemove" :fields="req.headers" objectKey="headers" @addEvent="handleAdd" />
          </Tab>
          <Tab title="Body" class="p-3">
            <div class="d-flex gap-3 mb-2 radios">
              <div class="form-check">
                <input class="form-check-input" type="radio" :value="BODY_TYPE.FORM_ENCODED" v-model="req.type" name="type" id="form" checked />
                <label class="form-check-label" for="form"> form </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" :value="BODY_TYPE.JSON" v-model="req.type" name="type" id="json" />
                <label class="form-check-label" for="json"> json </label>
              </div>
            </div>
            <RepFormField
              @removeEvent="handleRemove"
              v-if="req.type == BODY_TYPE.FORM_ENCODED"
              :fields="req.form"
              objectKey="form"
              @addEvent="handleAdd"
            />
            <div v-else>
              <textarea
                rows="5"
                class="form-control rounded"
                @blur="onJsonBlur"
                :class="{ 'is-invalid': req.jsonInvalid }"
                v-model="req.json"
              ></textarea>
            </div>
          </Tab>
        </TabsWrapper>
        <!-- TABS_END -->

        <div class="mt-3 d-flex flex-column w-100 h-100 overflow-hidden">
          <div class="d-flex justify-content-center justify-content-lg-between flex-wrap">
            <div class="d-flex gap-2 fs-6 flex-wrap">
              <div class="px-2 py-1 border rounded">
                Status :
                <span class="fw-bold" :class="{ 'text-danger': res.isError, 'text-success': !res.isError }">{{
                  res.isError ? "ERROR" : res.status
                }}</span>
              </div>
              <div class="px-2 py-1 border rounded">
                Size :
                <span class="fw-bold" :class="{ 'text-danger': res.isError, 'text-success': !res.isError }">{{
                  res.isError ? "0 B" : res.size
                }}</span>
              </div>
              <div class="px-2 py-1 border rounded">
                Reponse Time :
                <span class="fw-bold" :class="{ 'text-danger': res.isError, 'text-success': !res.isError }">{{
                  res.isError ? "0 ms" : res.time
                }}</span>
              </div>
            </div>
            <div v-if="res.isError" class="alert alert-danger py-1 m-0 mt-2 mt-lg-0" role="alert">{{ res.msg }}</div>
          </div>
          <div class="mt-2 rounded res-div border d-flex w-100 h-100 position-relative">
            <button
              class="btn btn-primary rounded m-2 position-absolute top-0 end-0"
              @click="handleCopy"
              v-show="!res.isError && res.json != ''"
              data-placement="top"
              title="Copy to clipboard"
            >
              <i :class="isClicked ? 'bi bi-check-circle-fill' : 'bi bi-clipboard'"></i>
            </button>
            <div v-if="!res.isError && res.json != ''" id="res-json-div" class="w-100 h-100">
              <highlightjs language="json" :code="res.json || '{}'" />
            </div>
            <div v-else class="text-muted fs-5 d-flex w-100 align-items-center justify-content-center">
              <span>Make a Request </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="./styles.css"></style>
