<script setup>
import { ref } from 'vue';
import { copyToClipboard } from '../../components/utils/UnixDateTimeFunctions';
import { marked } from 'marked';
import PageHeader from '../../components/Pageheader/index.vue'


const markdown = ref()

const handleClick = (value) => {
    copyToClipboard(value)
}

const handleClear = () => {
    markdown.value = ""
}

const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
        if (file.name.endsWith(".md")) {
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    markdown.value = reader.result;
                } catch (error) {
                    console.error("Error parsing Markdown:", error);
                }
            };
            reader.readAsText(file);
        } else {
            window.alert("Please select a .md file under 1 MB.");
        }
    }
}

</script>

<template>
    <main class="bg-light p-0 m-0 w-100">
        <div class="w-100 mt-3">
            <PageHeader />
        </div>
        <div class="grid bg-light mt-1">
            <div class="block card block1">
                <div class="p-3">
                    <div class="form-floating">
                        <div class="markdown-editor">
                            <div class="form-floating">
                                <textarea v-model="markdown" autofocus type="text" class="form-control mono-font"
                                    id="tokenInput" placeholder="Enter the token">
                    </textarea>
                                <label for="tokenInput">Enter markdown</label>
                            </div>
                            <!-- <textarea v-model="markdown" autofocus type="text" class="form-control mono-font"
                                style="height: 400px;" id="markdown" placeholder="Enter markdown">
                    </textarea>
                            <label for="markdown">Enter the token</label> -->
                        </div>

                        <div class="d-flex flex-row mt-2 justify-content-between align-items-center gap-2">
                            <!-- <div>
                                <input type="file" @change="handleFileChange" size="1048576" class="form-control mt-1"
                                    accept=".md" name="Upload markdown file" id="check">
                            </div> -->
                            <div class="mt-1 d-flex align-items-center gap-1">
                                <!-- file input that only accpets markdown files lesser than 1mb -->
                                <input type="file" @change="handleFileChange" size="1048576" class="form-control"
                                    accept=".md" name="Upload markdown file" id="markdownInput">
                                <label for="markdownInput">
                                    <div role="button" data-toggle="tooltip" data-placement="top" title="Upload local file"
                                        class="btn btn-secondary">
                                        <i class="bi bi-upload"></i>
                                    </div>
                                </label>
                                <div class="text-muted">
                                    Upload file
                                </div>
                            </div>

                            <div class="d-flex gap-2">
                                <button class="btn btn-primary mt-1" type="button" @click="handleClick(markdown)"
                                    data-toggle="tooltip" data-placement="top" title="Copy to clipboard">
                                    <i class="bi bi-clipboard"></i>
                                </button>
                                <button class="btn btn-danger mt-1" type="reset" @click="handleClear" data-toggle="tooltip"
                                    data-placement="top" title="Clear text">
                                    <i class="bi bi-x-lg"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="block card block2 overflow-auto">
                <div v-if="markdown" class="mt-3 overflow-scroll">
                    <div v-html="marked.parse(markdown)" />
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped src="./style.css" />

