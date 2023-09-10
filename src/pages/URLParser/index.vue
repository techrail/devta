<script setup>
import { ref, watch } from 'vue';
import { parseUrl } from '../../components/utils/urlParser';
import PageHeader from '../../components/Pageheader/index.vue';
import CopyContainer from '../../components/CopyContainer/SingleLineCopy.vue';
import { copyToClipboard } from '../../components/utils/UnixDateTime';

const urlInput = ref('https://devta.techrail.in:8080/index.html?search=Tools&name=Base64#foo&bar=10')

let result = parseUrl(urlInput.value);

const parsedURL = ref(result)
const params = ref(result.get("Query String"))
const error = ref(false)

watch(urlInput, (newUrlInput, oldUrlInput) => {
    if (!newUrlInput | newUrlInput === oldUrlInput) return
    result = parseUrl(newUrlInput);
    if(result != null){
        error.value=false;
        parsedURL.value = result;
        params.value = result.get("Query String");
    } else {
        error.value=true;
        parsedURL.value = null;
        params.value = null;
    }
})

const handleClear = () => {
    urlInput.value = null
}

const handleCopy = (value) => {
    copyToClipboard(value)
}

</script>

<template>
    <main class="p-0 m-0 w-100">
        <div class="w-100 mt-3">
            <PageHeader />
        </div>
        <div class="grid mt-1">
            <div class="block card block1 ">
                <div class="p-3">
                    <div class="overflow-auto">
                        <div class="form-floating">
                            <textarea v-model="urlInput" autofocus type="text" class="form-control mono-font h-100" rows="4" id="urlInput" placeholder="Enter the URL">
                    </textarea>
                            <label for="urlInput">Enter the URL</label>
                        </div>
                    </div>
                    <div class="d-flex gap-2 p-2">
                        <button class="btn btn-primary" @click="handleCopy(urlInput)" data-placement="top"
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
            <div class="block card block2 overflow-auto ">
                <div v-if="urlInput">
                    <div v-if="error">
                        <div class="alert alert-danger" role="alert">
                            Invalid URL
                        </div>
                    </div>
                    <div v-if="parsedURL">
                        <div class="p-2 overflow-auto">
                            <h3 class="text-muted">URL Details: </h3>
                        </div>
                        <div class="block card block2 overflow-auto">
                            <div v-for="[key, value] in parsedURL" class="p-1 d-flex flex-column gap-2" :key="value">
                                <CopyContainer :title="key" :value="value" v-if="value != ''"/>
                            </div>
                        </div> 
                    </div>
                    
                    <div v-if="params && params != ''">
                        <div class="p-2 overflow-auto">
                            <h3 class="text-muted">Query Parameters: </h3>
                        </div>
                        <div class="block card block2 overflow-auto">
                            <div v-for="[paramName, paramValue] in params" class="p-1 d-flex flex-column gap-2" :key="paramName">
                                <CopyContainer :title="paramName" :value="paramValue" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>