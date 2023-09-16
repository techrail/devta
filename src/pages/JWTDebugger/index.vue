<script setup>
import { ref, watch, onMounted, watchEffect } from "vue";
import { copyToClipboard } from "../../components/utils/UnixDateTime";
import { algorithms, getHeader, signToken, validateSignature } from "../../components/utils/JwtDebugger";
import { getPayload } from "../../components/utils/JwtDebugger";
import PageHeader from "../../components/Pageheader/index.vue";
import SignatureInput from "../../components/JWTSignatureVerify/SignatureInput.vue";
import { jsonValidator } from "../../components/utils/jsonConverter";
import { setTextInputSize } from '../../components/utils/resizableInput'

onMounted(() => {
  document.querySelector("[autofocus]")?.focus()
  // setTextInputSize(['tokenInput', 'payloadInput'])
});

const jwtoken = ref('');
const decodedPayload = ref(`{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}`);
const decodedHeader = ref('');
const validSig = ref(true)
const key1 = ref('')
const key2 = ref('')
const selectedAlgorithm = ref(algorithms[0])
const error = ref(false)
const twoKeys = ref(false)


watchEffect(async () => {
  // check if the algorithm requires two keys, public and private
  twoKeys.value = !selectedAlgorithm.value.toLowerCase().startsWith("h")
  if (!twoKeys.value)
    jwtoken.value = await signToken(decodedPayload.value, selectedAlgorithm.value, key1)
})





// watchEffect(() => {
//   decodedHeader.value = getHeader(jwtoken.value);
//   decodedPayload.value = getPayload(jwtoken.value);
//   const header = JSON.parse(decodedHeader.value)
//   selectedAlgorithm.value = header.alg
// })


// watch(jwtoken, async () => {
//   if (!jwtoken.value) return
//   verifyTokenSignature()
// })

// watch(selectedAlgorithm, () => {
//   if (!selectedAlgorithm.value) return
//   twoKeys.value = !selectedAlgorithm.value.toLowerCase().startsWith("h")
//   jwtoken.value = signToken(decodedPayload.value, selectedAlgorithm.value, "", "", decodedHeader.value)
// })

const verifyTokenSignature = async () => {
  try {
    validSig.value = await validateSignature(jwtoken.value, selectedAlgorithm.value, key1.value)
  } catch (error) {
    console.log(error)
  }
}

const handleClick = async (text) => {
  try {
    await copyToClipboard(text);
  } catch (error) {
    console.log(error);
  }
};


// handles the emitted signature value
const handleChange = async (value1) => {
  error.value = false
  error.value = !jsonValidator(decodedPayload.value)
  // setTextInputSize(['payloadInput'])

  if (error.value == true) return
  try {
    // todo make changes based on the input values
    key1.value = value1
    if (!twoKeys.value) {
      jwtoken.value = await signToken(decodedPayload.value, selectedAlgorithm.value, value1, null, decodedHeader.value)
    } else {

    }
  } catch (error) {
    console.log(error)
  }
}

const handleCleanup = () => {
  error.value = false
  validSig.value = true
  key1.value = ('')
  key2.value = (null)
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
          <!-- jwt warning -->
          <div class="alert alert-warning" role="alert">
            <small>
              Warning: JWTs are credentials, which can grant access to resources. Be careful where you paste them! We do
              not record tokens, all
              validation and debugging is done on the client side.
            </small>
          </div>
          <!-- input for jwt -->
          <div class="overflow-auto">
            <div class="form-floating">
              <textarea v-model="jwtoken" autofocus type="text" class="form-control mono-font" id="tokenInput"
                placeholder="Enter the token">
              </textarea>
              <label for="tokenInput">Enter the token</label>
            </div>
          </div>
          <!-- validator -->
          <div v-if="jwtoken" class="mt-2">
            <!-- validator alert -->
            <div :class="validSig ? 'alert alert-success' : 'alert alert-danger'" role="alert">
              <small>
                <strong>
                  {{
                    validSig ? 'Valid token!' : 'Invalid token!'
                  }}
                </strong>
              </small>
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

        <!-- JWT decode -->
        <div v-if="jwtoken">
          <div class="p-2 overflow-auto">
            <div class="">
              <h5 class="text-muted"><strong>Header</strong></h5>
              <highlightjs :code="decodedHeader" />
            </div>
            <div class="">
              <h5 class="text-muted"><strong>Payload</strong></h5>
              <!-- <highlightjs :code="decodedPayload" /> -->
              <textarea v-model="decodedPayload" @input="handleChange" rows="5"
                :class="error ? 'form-control mono-font is-invalid' : 'form-control mono-font'"
                id="payloadInput"></textarea>
            </div>

            <!-- signature verification component -->
            <div>
              <h5 class="text-muted"><strong>Verify Signature</strong></h5>
              <div v-if="!twoKeys">
                <SignatureInput :algo-type="selectedAlgorithm" @key-change="(k1) => handleChange(k1)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="./style.css" />