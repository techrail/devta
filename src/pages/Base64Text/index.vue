<script setup>
import { ref } from 'vue';
// import { useGlobalStore } from "@stores/index.mjs";
import MultiLineCopy from '../../components/CopyContainer/MultiLineCopy.vue';

// const store = useGlobalStore();
const input = ref('');
const b64 = ref('');

function handleChange() {
    console.log(input.value)
    b64.value = btoa(input.value);
    // clearTimeout(timeout);
    // timeout = setTimeout(() => {
    //     outputs.value = Object.keys(algos).map(e => algos[e](value.value).toString());
    // }, 1000);
}


// async function copyContent(idx) {
//     await navigator.clipboard.writeText(outputs.value[idx]);
//     store.showSnackbar('Contents copied to clipboard');
// }
</script>


<template>
    <div class="grid bg-light">
        <div class="block card block1">
            <div class="p-3">
                <h4>
                    <strong>
                        Base64 converter
                    </strong>
                </h4>
                <div class="p-2 ">
                    <textarea type="text" rows="10" autofocus v-model="input" class="form-control"
                        placeholder="Enter text to convert into base64" />
                    <button type="button" class="btn btn-primary mt-2" @click="handleChange">Convert to Base64</button>
                </div>
            </div>
        </div>
        <div class="block card overflow-auto block2">
            <div v-if="b64" class="mt-3">
                <div class="p-2">
                    <MultiLineCopy title="Base64" :value="b64" />
                </div>

            </div>
            <!-- <div class="warning">
                {{ b64 }}
            </div> -->
        </div>
    </div>
</template>

<style scoped src="./style.css"></style>
