<script setup>
import { copyToClipboard, labelFormatter } from '../utils/UnixDateTimeFunctions';

const props = defineProps({
    key: String,
    value: String
})

const handleClick = (value) => {
    copyToClipboard(value)
}
</script>


<template>
    <div role="button" @click="handleClick(value)" class="p-1 bg-light flex flex-row">
        <!-- <ui-textfield input-type="text" outlined disabled fullwidth class="input" v-model="key">
            {{ element }}
            <template #after>
                <ui-textfield-icon @click="copyContent(index)" class="copy-icon">content_copy</ui-textfield-icon>
            </template>
        </ui-textfield> -->
        <strong> {{ labelFormatter(key) }} </strong> : {{ value }}
    </div>
</template>