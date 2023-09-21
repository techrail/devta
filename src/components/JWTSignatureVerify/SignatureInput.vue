<script setup>
import { ref } from "vue"
const emit = defineEmits(['keyChange'])
import { useKeyStore } from "../../stores/jwtKeys";

const signature = ref()
const props = defineProps({
    algoType: String
})
const store = useKeyStore()

const handleChange = () => {
    if (!signature.value) return
    store.updateKeys(signature, ' ')
    emit('keyChange')
}
</script>

<template>
    <div>
        <div class="alert alert-primary" role="alert">
            <small>
                {{ algoType }}(
                <div v-if="algoType[0].toLowerCase() == 'h'">
                    <strong>
                        base64UrlEncode(header) + "." +
                        base64UrlEncode(payload),
                    </strong>
                    <input v-model="signature" @input="handleChange" autofocus type="text"
                        class="form-control mono-font input-sm p-2" placeholder="your secret key" />
                </div>
                )
            </small>
        </div>
    </div>
</template>