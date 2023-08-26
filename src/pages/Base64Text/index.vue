<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
// import MultiLineCopy from '../../components/CopyContainer/MultiLineCopy.vue';
import PageHeader from '../../components/Pageheader/index.vue';
import { copyToClipboard } from '../../components/utils/UnixDateTime';
import { useRouter } from 'vue-router';

const input = ref('hello world');
const b64 = ref(btoa(input.value));
const error = ref(false)
const router = useRouter()

// b64 encoder
const handleChange = () => {
    // dynamicRouteUpdater('encode', input.value)
    b64.value = btoa(input.value);
}

// b64 decoder
const handleb64Change = () => {
    error.value = false
    try {
        input.value = atob(b64.value)
        // dynamicRouteUpdater('decode', b64.value)
    } catch (e) {
        error.value = true
        console.log(e.message)
    }
}

// Updates the route dynamically based on textinput 
// Changes when there is a change in either of the text areas
// Updates the route dynamically based on textinput 
// Changes when there is a change in either of the text areas
const dynamicRouteUpdater = (action, value) => {
    try {
        router.push({
            name: router.name,
            query: { action: action, input: value },
            silent: true
        })
    } catch (error) {
        console.log(error.message)
    }
}

onMounted(() => {
    let action = ''

    const urlParams = new URLSearchParams(location.search);
    for (const [key, value] of urlParams) {
        console.log("key=", key, "||| value=", value)
        if (key === "action") {
            action = value
        }
        if (key === "input") {
            input.value = value
        }
    }

    switch (action) {
        case 'encode':
            handleChange()
            break;
        case 'decode':
            handleb64Change()
        case '':
            break
        default:
            console.log("")
    }
})

const handleClear = () => {
    error.value = false
    input.value = null
    b64.value = null
}

const handleCopy = (value) => {
    copyToClipboard(value)
}

</script>


<template>
    <main class="bg-light p-0 m-0 w-100">
        <div class="w-100 mt-3">
            <PageHeader />
        </div>

        <div class="grid bg-light">
            <div class="block card block1">
                <div class="p-3">
                    <div class="overflow-auto">
                        <div class="form-floating">
                            <textarea v-model="input" @input="handleChange" autofocus type="text"
                                class="form-control mono-font" id="baseInput" placeholder="Enter the token">
                    </textarea>
                            <label for="baseInput">Encoded Base64</label>
                        </div>

                    </div>
                    <div class="d-flex gap-2 p-2">
                        <button class="btn btn-primary" @click="handleCopy(input)" data-placement="top"
                            title="Copy to clipboard">
                            <i class="bi bi-clipboard"></i>
                        </button>
                        <button class="btn btn-danger" @click="handleClear" type="reset" data-toggle="tooltip"
                            data-placement="top" title="Clear text">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="block card overflow-auto block2">
                <div class="p-3">
                    <div class="overflow-auto">
                        <div class="form-floating">
                            <textarea v-model="b64" @input="handleb64Change" autofocus type="text"
                                :class="error ? 'form-control mono-font is-invalid' : 'form-control mono-font'"
                                id="baseInput" placeholder="Enter the token">
                        </textarea>
                            <label for="baseInput">Decoded Base64</label>
                        </div>
                    </div>
                    <div class="d-flex gap-2 p-2">
                        <button class="btn btn-primary" @click="handleCopy(b64)" data-placement="top"
                            title="Copy to clipboard">
                            <i class="bi bi-clipboard"></i>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </main>
</template>

<style scoped src="./style.css"></style>


