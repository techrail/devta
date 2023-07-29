<script setup>
import { ref } from 'vue';
const props = defineProps(['module','outputs','initialValue']);
const emit = defineEmits(['change','copy']);

const value = ref(props.initialValue);

let timeout = undefined;
const INPUT_DELAY = 500; // 0.5 sec, in ms



function handleChange(newVal) {
    value.value = newVal;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
        emit('change', value.value);
    }, INPUT_DELAY);
}

function copyContent(idx){
    emit('copy',props.outputs[idx]?.value);
}
</script>

<template>
    <div class="block">
        <template v-if="outputs === '$input'">
            <label for="input">Input:</label>
            <ui-textfield outlined inputId="input" :input-type="module.input.type || 'text'" v-model="value" fullwidth class="input fullWidth" :placeholder="module.input.placeholder || ''" @update:model-value="handleChange" v-if="module.input.type !== 'file'"></ui-textfield>
            <ui-file :text="module.input.label" :accept="module.input.accept" v-else-if="module.input.type === 'file'"></ui-file>
        </template>
        <template v-if="(outputs instanceof Array)">
            <template v-for="(element, index) in outputs">
                <div v-if="element === '$input' && module.input.type !== 'file'" class="element">
                    <label for="input">Input:</label>
                    <ui-textfield inputId="input" outlined :input-type="module.input.type || 'text'" v-model="value" fullwidth class="input" :placeholder="module.input.placeholder || ''" @update:model-value="handleChange" ></ui-textfield>
                </div>
                <div v-else-if="element === '$input' && module.input.type === 'file'">
                    <ui-file :text="module.input.label" :accept="module.input.accept"></ui-file>
                </div>
                <div v-else class="element">
                    <ui-textfield outlined disabled fullwidth class="input" v-model="element.value">
                        {{ element.label }}
                        <template #after>
                            <ui-textfield-icon @click="copyContent(index)" class="copy-icon">content_copy</ui-textfield-icon>
                        </template>
                    </ui-textfield>
                </div>
                <br/>
            </template>
        </template>
    </div>
</template>

<style scoped src="./SingleGrid.css"></style>