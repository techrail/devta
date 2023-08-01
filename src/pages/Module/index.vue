<script setup>
import ErrorPage from "@pages/Error/index.vue";
import { useGlobalStore } from "@stores/index.mjs";
import { useRoute } from "vue-router";
import Header from "@/Header/index.vue";
import Snackbar from "@/Snackbar/index.vue";
import LoadModule from "./LoadModule.vue";

const store = useGlobalStore();
const route = useRoute();

const componentInfo = store.getRoute(route.params.slug);
const validRoute = Boolean(store.getRoute(route.params.slug));

</script>

<template>
    <ErrorPage v-if="!validRoute" />
    <template v-if="validRoute">
        <div class="main">
            <Header />
            <div class="content">
                <Suspense>
                    <LoadModule :dir="componentInfo['dir']" />
                    <template #fallback>
                        <div class="loading">
                            <ui-spinner active fourColored></ui-spinner>
                            <p>Loading Module...</p>
                        </div>
                    </template>
                </Suspense>
            </div>
        </div>
        <Snackbar v-model="store.snackbar.visible" :message="store.snackbar.msg" />
        <!-- <ui-snackbar v-model="store.snackbar.visible" :message="store.snackbar.msg" :action-type="1"></ui-snackbar> -->
    </template>
</template>

<style scoped src="./styles.css"></style>