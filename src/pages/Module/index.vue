<script setup>
import ErrorPage from "@pages/Error/index.vue";
import SingleGrid from "./SingleGrid.vue";
import { useGlobalStore } from "@stores/index.mjs";
import { useRoute } from "vue-router";
import Header from "@/Header/index.vue";
import { ref } from "vue";

const store = useGlobalStore();
const route = useRoute();

const module = store.getModule(route.params.slug);
const validRoute = Boolean(module);

const initialValue = module?.input?.default || '';
const outputs = ref(module.module.process(initialValue));
const snackbarOpen = ref(false);
const snackbarMsg = ref('');

function showSnackbar(msg) {
    snackbarMsg.value = msg;
    snackbarOpen.value = true;
}

function handleChange(newVal) {
    outputs.value = module.module.process(newVal);
}

async function handleCopy(msg) {
    await navigator.clipboard.writeText(msg);
    showSnackbar('Contents copied to clipboard');
}

</script>

<template>
    <ErrorPage v-if="!validRoute" />
    <template v-if="validRoute">
        <div class="main">
            <Header />
            <div class="content">
                <SingleGrid :module="module" :outputs="outputs['1']" :initialValue="initialValue" @change="handleChange"
                    @copy="handleCopy" />
                <SingleGrid :module="module" :outputs="outputs['2']" :initialValue="initialValue" @change="handleChange"
                    @copy="handleCopy" />
            </div>
        </div>
        <ui-snackbar v-model="snackbarOpen" :message="snackbarMsg" :action-type="1"></ui-snackbar>
    </template>
</template>

<style scoped src="./styles.css"></style>