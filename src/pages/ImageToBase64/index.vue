<script setup>
import {ref, onMounted} from "vue";
import { copyToClipboard } from "../../components/utils/UnixDateTime";
import PageHeader from "../../components/Pageheader/index.vue";

// on clicking convert button convert image file in imageInput into base64 and display in baseOutput
const convert = () => {
    if (b64.value) {
        b64.value = "";
    }
    b64.value = document.getElementById("imageInput").files[0];
    console.log(b64.value);
};
const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        if (file.name.endsWith(".jpg") || file.name.endsWith(".jpeg") || file.name.endsWith(".png")) {
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    b64.value = reader.result;
                } catch (error) {
                    console.error("Error parsing Markdown:", error);
                }
            };
            reader.readAsDataURL(file);
        } else {
            window.alert("Please select a .jpg, .jpeg or .png file under 1 MB.");
        }
    }
};

const handleb64Change = () => {
    error.value = false;
    try {
        input.value = atob(b64.value);
    } catch (e) {
        error.value = true;
        console.log(e.message);
    }
};



const handleCopy = (value) => {
    copyToClipboard(value);
};
const handleClear = () => {
    document.getElementById("imageInput").value = "";
    b64.value = "";
}

</script>

<template>
    <main class="p-0 m-0 w-100">
        <div class="w-100 mt-3">
            <PageHeader />
        </div>
        <div class="grid mt-1">
            <div class="block card block1">
                <div class="p-3">
                    <div class="overflow-auto">
                        <!-- upload image -->
                        <div class="p-2">
                            <p class="muted">Upload image for Base64 encoding</p>
                            <input  
                            @input="handleImageChange"
                            autofocus
                            type="file"
                            size="1048576"
                            accept=".jpg,.jpeg,.png"
                            class="form-control mono-font"
                            id="imageInput"
                            placeholder="Upload Image"
                            />
                        </div>
                    </div>
                    
                    <div class="d-flex p-2 justify-content-between">
                        <button class="btn btn-primary w-50" @click="convert" type="reset" data-toggle="tooltip" data-placement="top" title="Clear text">
                            Convert
                        </button>
                        <button class="btn btn-danger " @click="handleClear" type="reset" data-toggle="tooltip" data-placement="top" title="Clear text">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    
                </div>
            </div>
            <div class="block card overflow-auto block2">
                <div class="p-3">
                    <div class="overflow-auto">
                        <div class="form-floating">
                            <textarea
                                v-model="b64"
                                @input="handleb64Change"
                                autofocus
                                type="text"
                                :class="error ? 'form-control mono-font is-invalid' : 'form-control mono-font'"
                                id="baseOutput"
                                 placeholder="Enter the token"
                                >
                                </textarea>
                            <label for="baseOutput">Encoded Base64</label>
                        </div>
                    </div>
                    <div class="d-flex gap-2 p-2">
                        <button class="btn btn-primary" @click="handleCopy(b64)" data-placement="top" title="Copy to clipboard">
                          <i class="bi bi-clipboard"></i>
                        </button>
                      </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped src="./style.css"></style>