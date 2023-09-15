<script setup>
import { ref } from "vue"
const emit = defineEmits(['keyChange'])
const props = defineProps({
    algoType: String,
    twoKeys: Boolean,
    s1: {
        type: String,
        default: ""
    },
    s2: {
        type: String,
        default: null
    }
})

const signature = ref(props.s1)
const signature2 = ref(props.s2)

const handleChange = () => {
    if (!props.twoKeys) {
        if (!signature.value) return
        emit('keyChange', signature.value, null)
    } else {
        if (!signature.value || !signature2.value) return
        emit('keyChange', signature.value, signature2.value)
    }
}
</script>

<template>
    <div>
        <div class="alert alert-primary" role="alert">
            <small>
                {{ algoType }}(
                <strong>
                    base64UrlEncode(header) + "." +
                    base64UrlEncode(payload),
                </strong>
                <div v-if="!twoKeys">
                    <input v-model="signature" @input="handleChange" autofocus type="text"
                        class="form-control mono-font input-sm p-2 mt-2" placeholder="your secret key" />
                </div>
                <div v-else class="d-flex flex-column gap-2 mt-2">
                    <textarea v-model="signature" @input="handleChange" placeholder="Public key"
                        class="form-control mono-font" id="payloadInput" />
                    <textarea v-model="signature2" @input="handleChange"
                        placeholder="Private key. This key never leaves the browser" class="form-control mono-font"
                        id="payloadInput" />
                </div>
                )
            </small>
        </div>
    </div>
</template>