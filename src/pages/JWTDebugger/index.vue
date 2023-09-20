<script setup>
import { ref, watch, onMounted, watchEffect } from "vue";
import { copyToClipboard } from "../../components/utils/UnixDateTime";
import { algorithms, getHeader, getPayload, validateSignature, signToken } from "../../components/utils/JwtDebugger";
import PageHeader from "../../components/Pageheader/index.vue";
import SignatureInput from "../../components/JWTSignatureVerify/SignatureInput.vue";
import { jsonValidator } from "../../components/utils/jsonConverter";
import PubPrivKeyContainer from "../../components/JWTSignatureVerify/PubPrivKeyContainer.vue";
import { useKeyStore } from "../../stores/jwtKeys";


const store = useKeyStore()

onMounted(() => {
  document.querySelector("[autofocus]")?.focus()
});

const jwtoken = ref('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
const decodedPayload = ref();
const decodedHeader = ref();
const validSig = ref(true)
const selectedAlgorithm = ref(algorithms[0])
const error = ref(false)


const generateKeys = () => { return { publicKey: store.publicKey, privateKey: store.privateKey } }

const verifyTokenSignature = async () => {
  try {
    validSig.value = await validateSignature(jwtoken.value, selectedAlgorithm.value, generateKeys())
  } catch (error) {
    console.log(error)
  }
}

const createToken = async () => {
  try {
    // checks if the payload json is valid
    error.value = !jsonValidator(decodedPayload.value)
    if (error.value == true) return

    // check for h-algorithms
    if (selectedAlgorithm.value.toLowerCase().startsWith("h")) {
      jwtoken.value = await signToken(decodedPayload.value, selectedAlgorithm.value, generateKeys())
    } else {
      const { token, privateKey, publicKey } = await signToken(decodedPayload.value, selectedAlgorithm.value, generateKeys())
      jwtoken.value = token
      // updates the generated keys
      store.updateKeys(privateKey, publicKey)
    }
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

// handles the emitted signature value and changes in the payload
const handleChange = async () => {
  createToken()
}

watchEffect(() => {
  if (!jwtoken.value) return
  decodedHeader.value = getHeader(jwtoken.value);
  decodedPayload.value = getPayload(jwtoken.value);
  const header = JSON.parse(decodedHeader.value)
  selectedAlgorithm.value = header.alg
})

watch(jwtoken, async () => {
  if (!jwtoken.value) return
  verifyTokenSignature()
})

watch(selectedAlgorithm, async () => {
  store.clearKeys()
  createToken()
})

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
              <textarea v-model="decodedPayload" rows="5" @input="handleChange"
                :class="error ? 'form-control mono-font is-invalid' : 'form-control mono-font'"
                id="payloadInput"></textarea>
            </div>

            <!-- signature verification component -->
            <div>
              <h5 class="text-muted mt-3"><strong>Verify Signature</strong></h5>
              <div v-if="selectedAlgorithm.toLowerCase().startsWith('h')">
                <SignatureInput :algo-type="selectedAlgorithm" @key-change="() => handleChange()" />
              </div>
              <div v-else>
                <div>
                  <PubPrivKeyContainer :algo-type="selectedAlgorithm" @key-change="() => handleChange()"
                    :private-key="store.privateKey" :public-key="store.publicKey" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="./style.css" />