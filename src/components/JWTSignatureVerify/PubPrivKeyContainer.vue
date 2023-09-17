<script setup>
import { onMounted, ref, watchEffect } from "vue"
const emit = defineEmits(['keyChange'])
const props = defineProps({
    algoType: String,
    publicKey: String,
    privateKey: String,
})

const privKey = ref(props.privateKey)
const pubKey = ref(props.publicKey)

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

                <div class="d-flex flex-column gap-2 mt-2">
                    <textarea :v-model="privKey" :value="privateKey" rows="5" @input="handleChange"
                        class="form-control mono-font" id="sig1" />
                    <textarea :v-model="privKey" :value="publicKey" rows="5" @input="handleChange"
                        class="form-control mono-font" id="sig2" />
                    )

                </div>
            </small>
        </div>
    </div>
</template>