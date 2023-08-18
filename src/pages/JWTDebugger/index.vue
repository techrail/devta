<script setup>
import { ref } from 'vue';
import { copyToClipboard } from '../../components/utils/UnixDateTimeFunctions';
import { marked } from 'marked';

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
    <div class="grid bg-light">
        <div class="block card block1">
            <div class="p-3">
                <h4>
                    <strong>
                        JWT Debugger
                    </strong>
                </h4>
                <div class="markdown-editor">
                    <textarea v-model="markdown" autofocus type="text" class="form-control" rows="15"
                        placeholder="Enter markdown">
                    </textarea>

                    <div class="d-flex flex-row mt-2 justify-content-between align-items-center gap-2">
                        <div>
                            <!-- file input that only accpets markdown files lesser than 1mb -->
                            <input type="file" @change="handleFileChange" size="1048576" class="form-control mt-1"
                                accept=".md" name="Upload markdown file" id="check">
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-primary mt-1" type="button" @click="handleClick(markdown)">
                                <i class="bi bi-clipboard"></i>
                            </button>
                            <button class="btn btn-danger mt-1" type="reset" @click="handleClear">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="block card block2 overflow-auto">
            <div v-if="markdown" class="mt-3">
                <div v-html="marked.parse(markdown)" />
            </div>
        </div>
    </div>
</template>

<style scoped src="./style.css" />