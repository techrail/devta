<script setup>
import { ref } from 'vue';
import { useGlobalStore } from "@stores/index.mjs";

const store = useGlobalStore();
const input = ref('');
const b64 = ref('');

function handleChange() {
    b64.value = btoa(input.value);
    // clearTimeout(timeout);
    // timeout = setTimeout(() => {
    //     outputs.value = Object.keys(algos).map(e => algos[e](value.value).toString());
    // }, 1000);
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
            <ui-textfield inputId="input" outlined input-type="textarea" v-model="input" fullwidth class="input fullWidth"
                placeholder="Enter text to convert to base64"></ui-textfield>
        </div>
        <button type="button" class="btn btn-warning" @click="handleChange">Convert to Base64</button>
        <div class="block block2">
            <div class="warning">
              {{ b64 }}
            </div>
        </div>
    </div>
</template>

<style scoped src="./style.css"></style>
