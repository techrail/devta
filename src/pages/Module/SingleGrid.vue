<script setup>
import { ref } from 'vue';
const props = defineProps(['module', 'outputs', 'initialValue']);
const emit = defineEmits(['change', 'copy']);

const uploads = ref([]);
const value = ref(props.initialValue);

let timeout = undefined;
const INPUT_DELAY = 500; // 0.5 sec, in ms



function handleChange(newVal) {
    value.value = newVal;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
        if (value.value) {
            emit('change', value.value);
        }
    }, INPUT_DELAY);
}

function handleUploadChange(newVal, idx) {
    if (newVal) {
        const reader = new FileReader();

        reader.onload = function (e) {
            uploads.value[idx] = e.target.result;
        }

        reader.readAsDataURL(newVal[0].sourceFile);
        handleChange(newVal);
    }
}

function copyContent(idx) {
    emit('copy', props.outputs[idx]?.value);
}

function downloadImage(e, idx) {
    const src = e.target.parentElement.parentElement.parentElement.querySelector("img").src;

    const a = document.createElement('a');
    a.href = src;
    a.download = props.outputs[idx].download || 'download';

    a.style.display = "none";

    document.querySelector('body').appendChild(a);

    a.click();

    a.remove();
}

</script>

<template>
    <div class="block">
        <template v-if="outputs === '$input'">
            <label for="input" style="display: block">Input:</label>
            <ui-textfield outlined inputId="input" :input-type="module.input.type || 'text'" v-model="value" fullwidth
                class="input fullWidth" :placeholder="module.input.placeholder || ''" @update:model-value="handleChange"
                v-if="module.input.type !== 'file'"></ui-textfield>
            <ui-file class="input" :text="module.input.label" :accept="module.input.accept" inputId="input"
                @change="handleUploadChange($event, 0)" v-else-if="module.input.type === 'file'">
                <ui-icon class="file-icon" v-if="!uploads[0]">add</ui-icon>
                <img :src="uploads[0]" style="cursor: pointer" v-else class="img" />
            </ui-file>
        </template>
        <template v-if="(outputs instanceof Array)">
            <template v-for="(element, index) in outputs">
                <div v-if="element === '$input' && module.input.type !== 'file'" class="element">
                    <label for="input">Input:</label>
                    <ui-textfield inputId="input" outlined :input-type="module.input.type || 'text'" v-model="value"
                        fullwidth class="input" :placeholder="module.input.placeholder || ''"
                        @update:model-value="handleChange"></ui-textfield>
                </div>
                <div v-else-if="element === '$input' && module.input.type === 'file'">
                    <ui-file class="input" :text="module.input.label" :accept="module.input.accept"
                        @change="handleUploadChange($event, index + 1)">
                        <ui-icon class="file-icon" v-if="!uploads[index + 1]">add</ui-icon>
                        <img :src="uploads[index + 1]" style="cursor: pointer" v-else class="img" />
                    </ui-file>
                </div>
                <div v-else class="element">
                    <div v-if="element.type === 'file' && !element.value">
                        <ui-file :text="element.label" inputId="fileUpload" :accept="element.accept" class="input"
                            @change="handleUploadChange($event, index + 1)">
                            <label for="fileUpload">{{ element.label }}:</label>
                            <ui-icon class="file-icon" v-if="!uploads[index + 1]">add</ui-icon>
                            <img :src="uploads[index + 1]" v-else style="cursor: pointer" class="img" />
                        </ui-file>
                    </div>
                    <div v-else-if="element.type === 'file' && element.value">
                        <div class="file-options">
                            <label>{{ element.label }}:</label>
                            <ui-file :disabled="element.disabled" v-show="!element.disabled" inputId="fileUpload"
                                :accept="element.accept" class="btn" @change="handleUploadChange($event, index)">
                                <ui-button outlined for="fileUpload" icon="file_upload">Upload</ui-button>
                            </ui-file>
                            <ui-button outlined icon="file_download" class="btn" @click="downloadImage($event, index)">
                                Save
                            </ui-button>
                        </div>
                        <img :src="element.value" class="img" />
                    </div>
                    <ui-textfield :input-type="element.type || 'text'" outlined disabled fullwidth v-else class="input"
                        v-model="element.value">
                        {{ element.label }}
                        <template #after>
                            <ui-textfield-icon @click="copyContent(index)"
                                :class="{ 'copy-icon': true, 'textarea-icon': element.type === 'textarea' }">content_copy</ui-textfield-icon>
                        </template>
                    </ui-textfield>
                </div>
                <br />
            </template>
        </template>
    </div>
</template>

<style scoped src="./SingleGrid.css"></style>