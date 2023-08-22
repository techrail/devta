<script setup>
import { copyToClipboard } from "../utils/UnixDateTimeFunctions"
const props = defineProps({
    title: String,
    value: String | Number
})


const handleClick = () => {
    copyToClipboard(props.value)
}

</script>

<template>
    <form class="form-floating d-flex gap-1 w-full">
        <input type="text" class="form-control" readonly id="floatingInputValue" :value="value">
        <label for="floatingInputValue">{{ title }}</label>
        <button @click="handleClick" class="btn btn-outline-secondary" type="button" id="copyButton">
            <i class="bi bi-clipboard"></i>
        </button>
    </form>
</template>