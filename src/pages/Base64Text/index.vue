<script setup>
import { ref } from 'vue';
import MultiLineCopy from '../../components/CopyContainer/MultiLineCopy.vue';
import PageHeader from '../../components/Pageheader/index.vue';

const input = ref('');
const b64 = ref('');

function handleChange() {
    console.log(input.value)
    b64.value = btoa(input.value);
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
                    <div class="p-2 ">
                        <textarea type="text" rows="10" autofocus v-model="input" class="form-control mono-font"
                            placeholder="Enter text to convert into base64" />
                        <button type="button" class="btn btn-primary mt-2" @click="handleChange">Convert to Base64</button>
                    </div>
                </div>
            </div>
            <div class="block card overflow-auto block2">
                <div v-if="b64" class="mt-3">
                    <div class="p-2">
                        <MultiLineCopy title="Base64" :value="b64" />
                    </div>

                </div>
            </div>
        </div>
    </main>
</template>

<style scoped src="./style.css"></style>
