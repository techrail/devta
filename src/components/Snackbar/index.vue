<script setup>
import { watchEffect } from 'vue';
const props = defineProps(['modelValue', 'message', 'timeout']);
const emit = defineEmits(['update:modelValue'])

watchEffect(() => {
    if (props.modelValue)
        setTimeout(() => {
            emit('update:modelValue', false);
        }, props.timeout || 5000);
});
</script>

<template>
    <div class="snackbar" :class="{
        'show': modelValue
    }">
        <p>
            {{ message }}
        </p>
        <button class="btn material-icons" @click="$emit('update:modelValue', false)">close</button>
    </div>
</template>
<style scoped src="./style.css"></style>