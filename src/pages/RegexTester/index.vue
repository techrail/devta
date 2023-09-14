<script setup>
import PageHeader from '../../components/Pageheader/index.vue'
import { watchEffect, ref } from 'vue';
import { copyToClipboard } from '../../components/utils/UnixDateTime';


const regexPattern = ref('/Lorem/gi');
const testString = ref('Lorem duis elit sit labore ipsum sunt aute qui dolore nostrud pariatur excepteur quis.Deserunt aute aute cupidatat enim reprehenderit consequat dolore et excepteur labore dolor.Proident consectetur Lorem duis reprehenderit non irure dolore cillum culpa excepteur.Proident ex duis excepteur ut dolor reprehenderit ad excepteur sunt sit.');
const error = ref(false);
const matchResults = ref(null);

const testRegex = () => {
    try {
        let pattern = regexPattern.value;
        let flags = 'g';


        if (pattern.startsWith('/') && pattern.lastIndexOf('/') > 0) {
            flags = pattern.slice(pattern.lastIndexOf('/') + 1);
            pattern = pattern.slice(1, pattern.lastIndexOf('/'));
        }


        if (!flags.includes('g')) {
            flags += 'g';
        }

        const regex = new RegExp(pattern, flags);
        const matches = [...testString.value.matchAll(regex)];

        if (matches && matches.length) {
            matchResults.value = matches;
            error.value = false;
        } else {
            matchResults.value = null;
            error.value = true;
        }
    } catch (e) {
        error.value = true;
        matchResults.value = null;
    }
};


watchEffect(() => {
    testRegex();
});

const clearInputs = () => {
    regexPattern.value = '';
    testString.value = '';
    error.value = false;
    matchResults.value = null;
};


const handleClick = (value) => {
    copyToClipboard(value)
}



</script>


<template>
    <main class="p-0 m-0 w-100">
        <div class="w-100 mt-3">
            <PageHeader />
        </div>
        <div class="grid mt-1">
            <div class="block card block1">
                <div class="inner_block">
                    <div class="p-2 overflow-auto">
                        <div class="form-floating h-100">
                            <input v-model="regexPattern" @input="handleChange" spellcheck="false" autofocus type="text"
                                :class="error ? 'form-control mono-font is-invalid' : 'form-control mono-font'"
                                placeholder="Enter Regular Expression" />
                            <label for="regexInput">Enter Regular Expression</label>
                        </div>
                        <div class="mt-2">
                            <div class="form-floating inpcard">
                                <textarea v-model="testString" spellcheck="false" type="text"
                                    :class="error ? 'form-control mono-font is-invalid custom-height' : 'form-control mono-font custom-height'"
                                    id="testInput" placeholder="Enter Test String"></textarea>
                                <label for="testInput">Enter Test String</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="block card block2 overflow-auto">
                <div class="d-flex flex-column h-100 justify-content-between">
                    <div class="p-2 overflow-auto">
                        <div v-if="error">
                            <div class="alert alert-danger" role="alert">
                                Invalid Regular Expression
                            </div>
                        </div>
                        <div v-if="matchResults">
                            <strong>Matches:</strong>
                            <div v-for="match in matchResults" :key="match.index">
                                {{ match[0] }} at position {{ match.index }}
                            </div>
                        </div>
                    </div>
                    <div class="d-flex gap-2 p-2">
                        <button class="btn btn-primary" type="button" @click="handleClick(regexPattern)"
                            data-toggle="tooltip" data-placement="top" title="Copy Regular Expression">
                            <i class="bi bi-clipboard"></i>
                        </button>
                        <button class="btn btn-danger" type="reset" @click="clearInputs" data-toggle="tooltip"
                            data-placement="top" title="Clear text">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped src="./style.css" />