<script setup>
import { ref, watch, onMounted, watchEffect } from "vue";
import { copyToClipboard } from "../../components/utils/UnixDateTime";
import { algorithms, getHeader } from "../../components/utils/JwtDebugger";
import { getPayload } from "../../components/utils/JwtDebugger";
import PageHeader from "../../components/Pageheader/index.vue";
import SignatureInput from "../../components/JWTSignatureVerify/SignatureInput.vue";

onMounted(() => document.querySelector("[autofocus]")?.focus());

const jwtoken = ref('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
const decodedPayload = ref();
const decodedHeader = ref();
const validSig = ref(true)
const selectedAlgorithm = ref(algorithms[0])

// watch(jwtoken, (newjwtoken, oldjwtoken) => {
//   if (!newjwtoken | (newjwtoken === oldjwtoken)) return;
//   decodedHeader.value = getHeader(newjwtoken);
//   decodedPayload.value = getPayload(newjwtoken);
// });


watchEffect(() => {
  if (!jwtoken.value) return
  decodedHeader.value = getHeader(jwtoken.value);
  decodedPayload.value = getPayload(jwtoken.value);
  const header = JSON.parse(decodedHeader.value)
  selectedAlgorithm.value = header.alg
})

const handleClick = async (text) => {
  try {
    await copyToClipboard(text);
  } catch (error) {
    console.log(error);
  }
};

const handleChange = (value) => {

}


</script>

<template>
  <main class="p-0 m-0 w-100">
    <div class="w-100 mt-3">
      <PageHeader />
    </div>
    <div class="grid mt-1">
      <div class="block card block1">
        <div class="p-3">
          <div class="alert alert-warning" role="alert">
            <small>
              Warning: JWTs are credentials, which can grant access to resources. Be careful where you paste them! We do
              not record tokens, all
              validation and debugging is done on the client side.
            </small>
          </div>
          <div class="overflow-auto">
            <div class="form-floating">
              <textarea v-model="jwtoken" autofocus type="text" class="form-control mono-font" id="tokenInput"
                placeholder="Enter the token">
              </textarea>
              <label for="tokenInput">Enter the token</label>
            </div>
          </div>

        </div>
      </div>
      <div class="block card block2 overflow-auto">
        <div class="p-2">

          <!-- algorithm dropdown -->
          <div class="form-floating mt-2">
            <select class="form-select" name="algorithm-select" id="algorithm-select" v-model="selectedAlgorithm">
              <option :value="algorithms[0]">{{ algorithms[0] }}</option>
              <option v-for="algo in algorithms.slice(1)" :value="algo" :key="algo">{{ algo }}</option>
            </select>
            <label for="algorithm-select">Algorithm</label>
          </div>
        </div>

        <div v-if="jwtoken && decodedHeader && decodedPayload">
          <div class="p-2 overflow-auto">
            <div class="">
              <h5 class="text-muted"><strong>Header</strong></h5>
              <highlightjs :code="decodedHeader" />
            </div>
            <div class="">
              <h5 class="text-muted"><strong>Payload</strong></h5>
              <highlightjs :code="decodedPayload" />
            </div>
            <!-- signature verification component -->
            <div>
              <h5 class="text-muted"><strong>Verify Signature</strong></h5>
              <SignatureInput :algo-type="selectedAlgorithm" @key-change="(value) => handleChange(value)" />
            </div>

          </div>


        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="./style.css" />
