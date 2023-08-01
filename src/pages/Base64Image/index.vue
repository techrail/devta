<script setup>
import { ref } from 'vue';
import { useGlobalStore } from "@stores/index.mjs";

const store = useGlobalStore();
const value = ref('');
const output = ref(undefined);
const fileType = ref(undefined);
const timeout = undefined;

function handleChange(e) {
    value.value = e.target.value;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        output.value = value.value;
    }, 1000);
}

function handleFileChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        fileType.value = reader.result.match(/\/([\w\W]*)\;/g)[0].slice(1, -1);
        value.value = reader.result;
        output.value = reader.result;
    }
    reader.readAsDataURL(file);
}

async function copyContent() {
    await navigator.clipboard.writeText(value.value);
    store.showSnackbar('Contents copied to clipboard');
}

function download() {
    let tempFileType = fileType.value.split('+')[0]; // in case of svg it's svg+xml

    const a = document.createElement('a');
    a.href = output.value;
    a.download = 'download.' + tempFileType;
    a.style.display = 'none';

    document.querySelector('body').appendChild(a);

    a.click();
    a.remove();

}

function openFileSelector(e) {
    e.target.parentElement.parentElement.querySelector("input[type=file]").click();
}
</script>

<template>
    <div class="grid">
        <div class="block block1">
            <div class="options">
                <label for="input">Input:</label>
                <button class="btn" @click="copyContent" v-if="value">
                    <i class="icon material-icons">content_copy</i>Copy</button>
            </div>
            <textarea id="input" class="form-control input fullWidth" v-model="value" placeholder="Enter text to hash..."
                @keyup="handleChange"></textarea>
        </div>
        <div class="block block2">
            <div class="options">
                <label for="fileInput">Output:</label>
                <button class="btn" @click="openFileSelector" v-if="output !== undefined">
                    <i class="icon material-icons">file_upload</i>Load</button>
                <button class="btn" @click="download" v-if="output !== undefined">
                    <i class="icon material-icons">file_download</i>Save</button>
            </div>
            <input class="form-control" v-show="!output" @change="handleFileChange" type="file" id="formFile"
                accept="image/*">
            <img :src="output" v-if="output !== undefined" alt="Image Output" class="fullWidth" />
        </div>
    </div>
</template>

<style scoped src="./style.css"></style>