<script setup>
import {ref, onMounted} from "vue";
import { copyToClipboard } from "../../components/utils/UnixDateTime";
import PageHeader from "../../components/Pageheader/index.vue";


const b64 = ref("");
const input = ref("");
const error = ref(false);
const imageInput = ref("");

//convert image to base64
const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        if (file.name.endsWith(".jpg") || file.name.endsWith(".jpeg") || file.name.endsWith(".png")) {
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    b64.value = reader.result;
                } catch (error) {
                    console.error("Error parsing image", error);
                }
            };
            reader.readAsDataURL(file);
            
        } else {
            window.alert("Please select a .jpg, .jpeg or .png file under 1 MB.");
        }
    }
};

const handleImageFromLink = async (link) => {
  try {
    const response = await fetch(link);
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const blob = await response.blob();
    const reader = new FileReader();

    reader.onload = () => {
      // Set the result as Base64
      b64.value = reader.result;
    };

    reader.readAsDataURL(blob);
  } catch (error) {
    console.error("Error loading image from link", error);
    // Handle the error, for example, display an error message
    b64.value = "";
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
    document.getElementById("imageLink").value = "";
    b64.value = "";
    b64.value = "";
};

const handleDownload = () => {
    // download the base64 string as html file
  const blob = new Blob([`<html><body>${b64.value}</body></html>`], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "base64_string.html";
  a.click();
  URL.revokeObjectURL(url);
};

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
                        <div class="p-2">
                            <p class="muted">Paste image link</p>
                            <input
                              @input="handleImageFromLink"
                              v-model="imageInput"
                              autofocus
                              type="text"
                              id="imageLink"
                              class="form-control mono-font"
                              placeholder="Paste Image Link"
                            />
                          </div>
                    </div>
                    
                    <div class="d-flex p-2 justify-content-end">
                        <!-- <button class="btn btn-primary w-50" @click="handleConvert" type="reset" data-toggle="tooltip" data-placement="top" title="Clear text">
                            Convert
                        </button> -->
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
                            <label for="baseOutput">Encoded Base64 Image</label>
                        </div>
                    </div>
                    <div class="d-flex gap-2 p-2 justify-content-between">
                        <button class="btn btn-primary" @click="handleCopy(b64)" data-placement="top" title="Copy to clipboard">
                          <i class="bi bi-clipboard"></i>
                        </button>
                        <button class="btn btn-secondary" @click="handleDownload(b64)" data-placement="top" title="Copy to clipboard">
                            <i class="bi bi-download"></i>
                          </button>
                      </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped src="./style.css"></style>