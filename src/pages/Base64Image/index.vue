<script setup>
import { ref } from 'vue';
import { useGlobalStore } from "@stores/index.mjs";

// const store = useGlobalStore();
const value = ref('');
const output = ref(undefined);
const fileType = ref(undefined);
const timeout = undefined;

function handleChange(newVal) {
    value.value = newVal;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        output.value = value.value;
    }, 1000);
}

function handleFileChange(files) {
    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
        fileType.value = reader.result.match(/\/([\w\W]*)\;/g)[0].slice(1, -1);
        value.value = reader.result;
        output.value = reader.result;
    }

    reader.readAsDataURL(file.sourceFile);
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
</script>

<template>
    <div class="grid">
        <div class="block block1">
            <div class="options">
                <label for="input">Input:</label>
                <ui-button icon="content_copy" @click="copyContent">Copy</ui-button>
            </div>
            <ui-textfield inputId="input" outlined input-type="textarea" v-model="value" fullwidth class="input fullWidth"
                placeholder="Enter base64 image content..." @update:model-value="handleChange"></ui-textfield>
        </div>
        <div class="block block2">
            <div class="options">
                <label for="fileInput">Output:</label>
                <ui-file inputId="fileInput" outlined v-if="output !== undefined" @change="handleFileChange"
                    accept="image/*">
                    <ui-button icon="file_upload">Load</ui-button>
                </ui-file>
                <ui-button icon="file_download" v-if="output !== undefined" @click="download">Save</ui-button>
            </div>
            <ui-file inputId="fileInput" outlined @change="handleFileChange" class="fullWidth" accept="image/*">
                <img :src="output" v-if="output !== undefined" alt="Image Output" class="fullWidth" />
                <ui-button icon="file_upload" class="fullWidth" v-else>Upload</ui-button>
            </ui-file>
        </div>
    </div>
</template>

<style scoped src="./style.css"></style>