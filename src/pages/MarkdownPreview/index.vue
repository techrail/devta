<script setup>
import { ref } from 'vue';
import { copyToClipboard } from '../../components/utils/UnixDateTimeFunctions';
import { marked } from 'marked';

const markdown = ref()
const handleClick = (value) => {
    copyToClipboard(value)
}
</script>

<template>
    <div class="grid bg-light">
        <div class="block card block1">
            <div class="p-3">
                <h4>
                    <strong>
                        Markdown Previewer
                    </strong>
                </h4>
                <div class="markdown-editor">
                    <textarea v-model="markdown" autofocus type="text" class="form-control" rows="15"
                        placeholder="Enter markdown">
                    </textarea>
                    <button class="btn btn-primary mt-2" type="button" @click="handleClick(markdown)">
                        Copy markdown
                    </button>
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