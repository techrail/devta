<script setup>
import { ref } from "vue"
const emit = defineEmits(['keyChange'])
const props = defineProps({
    algoType: String,
    publicKey: String,
    privateKey: String,
})

const pubKey = ref(props.publicKey)
const privKey = ref(props.privateKey)





const handleChange = () => {
    if (!pubKey.value || !privKey.value) return
    emit('keyChange', pubKey.value, privKey.value)
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
                <textarea :v-model="pubKey" rows="5" @input="handleChange" class="form-control mono-font" id="sig1" />
                <textarea :v-model="privKey" rows="5" @input="handleChange" class="form-control mono-font" id="sig2" />
                )
            </small>
        </div>
    </div>
</template>