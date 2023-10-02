<script setup>
import { onMounted } from "vue"
import { setTextInputSize } from "../utils/resizableInput"
import { copyToClipboard } from "../utils/UnixDateTime"
const props = defineProps({
    title: String,
    value: String | Number,
    height: String,
    key: Number
})


const handleClick = () => {
    copyToClipboard(props.value)
}

// // generates a randomised id for the resizable form to work
// const generateRandom = (length = 10) => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
//     for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * characters.length);
//         result += characters.charAt(randomIndex);
//     }
//     return result;
// }

// onMounted(() => {
//     const randomId = "resizable-input-" + generateRandom()
//     const targetDiv = document.getElementById('resizable-form')
//     targetDiv.id = randomId
//     setTextInputSize([randomId])
// })

const style = {
    height: props.height
}


</script>

<template>
    <form class="form-floating d-flex gap-1 w-full" id="resizable-form">
        <textarea type="text" class="form-control" :style="style" readonly id="floatingInputValue" :value="value" />
        <label for="floatingInputValue">{{ title }}</label>
        <button @click="handleClick" class="btn btn-outline-secondary" type="button" id="copyButton">
            <i class="bi bi-clipboard"></i>
        </button>
    </form>
</template>