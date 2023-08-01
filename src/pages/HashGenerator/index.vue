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

function handleChange(e) {
    value.value = e.target.value;
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
            <label for="input" class="form-label">Input:</label>
            <textarea id="input" class="form-control input fullWidth" v-model="value" placeholder="Enter text to hash..."
                @keyup="handleChange"></textarea>
        </div>
        <div class="block block2">
            <div class="element input-group" v-for="(element, index) in Object.keys(algos)">
                <span class="input-group-text">{{ element }}</span>
                <input type="text" class="form-control input" v-model="outputs[index]" disabled :aria-label="element">
                <button class="input-group-text material-icons" @click="copyContent(index)">
                    content_copy
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped src="./style.css"></style>