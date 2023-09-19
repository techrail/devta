<script setup>
import { ref, watch, onMounted, watchEffect } from "vue";
import { copyToClipboard } from "../../components/utils/UnixDateTime";
import { algorithms, getHeader, getPayload } from "../../components/utils/JwtDebugger";
import PageHeader from "../../components/Pageheader/index.vue";
import SignatureInput from "../../components/JWTSignatureVerify/SignatureInput.vue";
import { jsonValidator } from "../../components/utils/jsonConverter";
import PubPrivKeyContainer from "../../components/JWTSignatureVerify/PubPrivKeyContainer.vue";
import { useKeyStore } from "../../stores/jwtKeys";
import {
  jwtVerify,
  SignJWT,
  generateKeyPair,
  importPKCS8,
  importSPKI,
  exportPKCS8,
  exportSPKI,
} from "jose";

const store = useKeyStore()

onMounted(() => {
  document.querySelector("[autofocus]")?.focus()
});

const jwtoken = ref('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
const decodedPayload = ref();
const decodedHeader = ref();
const validSig = ref(true)
const key1 = ref(' ')
const key2 = ref(' ')
const selectedAlgorithm = ref(algorithms[0])
const error = ref(false)
const twoKeys = ref(false)

const verifyTokenSignature = async () => {
  try {
    validSig.value = await validateSignature(jwtoken.value, selectedAlgorithm.value, key1.value, key2.value)
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
const handleChange = async () => {
  error.value = false
  error.value = !jsonValidator(decodedPayload.value)
  if (error.value == true) return
  try {
    // key1.value = value
    // key2.value = value2
    // store.updateKeys(value, value2)
    jwtoken.value = await signToken(decodedPayload.value, selectedAlgorithm.value)
  } catch (error) {
    console.log(error)
  }
}

const handlePayloadChange = async () => {
  try {
    error.value = !jsonValidator(decodedPayload.value)
    if (error.value == true) return
    jwtoken.value = await signToken(decodedPayload.value, selectedAlgorithm.value)
  } catch (error) {
    console.log(error)
  }
}


const validateSignature = async (jwtToken, algorithm) => {
  try {
    if (algorithm.toLowerCase().startsWith("h")) {
      const privateKey = new TextEncoder().encode(store.privateKey ? store.privateKey : " ");
      await jwtVerify(jwtToken, privateKey);
      return true;
    } else {
      if (!store.privateKey || !store.publicKey) return false;
      const publicKey = await importSPKI(store.publicKey, algorithm);
      await jwtVerify(jwtToken, publicKey);
      return true;
    }
  } catch (error) {
    return false;
  }
};

const signToken = async (data, algorithm) => {
  try {
    if (algorithm.toLowerCase().startsWith("h")) {
      const key = new TextEncoder().encode(store.privateKey ? store.privateKey : " ");
      return new SignJWT(JSON.parse(data))
        .setProtectedHeader({
          alg: algorithm,
          typ: "JWT",
        })
        .sign(key);
    } else {
      let keys = await generateKeyPair(algorithm, {
        extractable: true,
      });

      if (store.privateKey && store.privateKey !== " ") {
        keys.privateKey = await importPKCS8(store.privateKey, algorithm, {
          extractable: true
        });
      }
      if (store.publicKey && store.privateKey !== " ") {
        keys.publicKey = await importPKCS8(store.publicKey, algorithm, {
          extractable: true
        });
      }
      // Create a JWT object
      const jwt = new SignJWT(JSON.parse(data)).setProtectedHeader({
        typ: "JWT",
        alg: algorithm,
      });
      // Sign the JWT using the private key
      const token = await jwt.sign(keys.privateKey);
      console.log("token->", token)
      // Export the private and public keys
      const privateKeyExported = await exportPKCS8(keys.privateKey);
      const publicKeyExported = await exportSPKI(keys.publicKey);

      // Return the token and keys
      return {
        token,
        privateKey: privateKeyExported,
        publicKey: publicKeyExported,
      };
    }
  } catch (error) {
    console.log(error);
  }
};


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
  const check = !selectedAlgorithm.value.toLowerCase().startsWith("h")
  twoKeys.value = check
  if (error.value) return
  if (!check) {
    jwtoken.value = await signToken(decodedPayload.value, selectedAlgorithm.value, key1.value, key2.value, decodedHeader.value)
  } else {
    const tokData = await signToken(decodedPayload.value, selectedAlgorithm.value, key1.value, key2.value, decodedHeader.value)
    jwtoken.value = tokData?.token
    store.updateKeys(tokData.privateKey, tokData.publicKey)
    // key1.value = tokData?.privateKey
    // key2.value = tokData?.publicKey
  }
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
              <textarea v-model="decodedPayload" rows="5" @input="handlePayloadChange"
                :class="error ? 'form-control mono-font is-invalid' : 'form-control mono-font'"
                id="payloadInput"></textarea>
            </div>

            <!-- signature verification component -->
            <div>
              <h5 class="text-muted mt-3"><strong>Verify Signature</strong></h5>
              <div v-if="!twoKeys">
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