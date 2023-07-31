<script setup>
import CryptoJS from 'crypto-js';
import { ref } from 'vue';
import { useGlobalStore } from "@stores/index.mjs";

const store = useGlobalStore();
const value = ref('Hello World');

const algos = {
    MD5: CryptoJS.MD5,
    SHA1: CryptoJS.SHA1,
    SHA3: CryptoJS.SHA3,
    SHA224: CryptoJS.SHA224,
    SHA256: CryptoJS.SHA256,
    SHA384: CryptoJS.SHA384,
    SHA512: CryptoJS.SHA512,
}

const outputs = ref(Object.keys(algos).map(e => algos[e](value.value).toString()));
const timeout = undefined;

function handleChange(newVal) {
    value.value = newVal;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        outputs.value = Object.keys(algos).map(e => algos[e](value.value).toString());
    }, 1000);
}


async function copyContent(idx) {
    await navigator.clipboard.writeText(outputs.value[idx]);
    store.showSnackbar('Contents copied to clipboard');
}
</script>


<template>
    <div class="grid">
        <div class="block block1">
            <label for="input">Input:</label>
            <ui-textfield inputId="input" outlined input-type="textarea" v-model="value" fullwidth class="input fullWidth"
                placeholder="Enter text to hash..." @update:model-value="handleChange"></ui-textfield>
        </div>
        <div class="block block2">
            <div class="element" v-for="(element, index) in Object.keys(algos)">
                <ui-textfield input-type="text" outlined disabled fullwidth class="input" v-model="outputs[index]">
                    {{ element }}
                    <template #after>
                        <ui-textfield-icon @click="copyContent(index)" class="copy-icon">content_copy</ui-textfield-icon>
                    </template>
                </ui-textfield>
            </div>
        </div>
    </div>
</template>

<style scoped src="./style.css"></style>