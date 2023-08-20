<script setup>
import { ref } from 'vue';
// import { useGlobalStore } from "@stores/index.mjs";

// const store = useGlobalStore();
const value = ref('Hello World');

function handleChange(newVal) {
    value.value = newVal;
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
    <div class="grid">
        <div class="block block1">
            <label for="input">Input:</label>
            <ui-textfield inputId="input" outlined input-type="textarea" v-model="value" fullwidth class="input fullWidth"
                placeholder="Enter text to reflect..." @update:model-value="handleChange"></ui-textfield>
        </div>
        <div class="block block2">
            <div class="element">
                {{ value }}
            </div>
        </div>
    </div>
</template>

<style scoped src="./style.css"></style>
