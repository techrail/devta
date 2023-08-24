<script setup>
import { copyToClipboard } from "../utils/UnixDateTime"
const props = defineProps({
    title: String,
    value: String | Number,
    height: String
})


const handleClick = () => {
    copyToClipboard(props.value)
}

const style = {
    height: props.height
}

</script>

<template>
    <form class="form-floating d-flex gap-1 w-full">
        <textarea type="text" rows="10" class="form-control" :style="style" readonly id="floatingInputValue"
            :value="value" />
        <label for="floatingInputValue">{{ title }}</label>
        <button @click="handleClick" class="btn btn-outline-secondary" type="button" id="copyButton">
            <i class="bi bi-clipboard"></i>
        </button>
    </form>
</template>