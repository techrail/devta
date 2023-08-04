<script setup>
import ErrorPage from "@pages/Error/index.vue";
import { useGlobalStore } from "@stores/index.mjs";
import { useRoute } from "vue-router";
import Sidebar from "@/Sidebar/index.vue";
import LoadModule from "./LoadModule.vue";
import { ref } from "vue";

const store = useGlobalStore();
const route = useRoute();

const componentInfo = store.getRoute(route.params.slug);
const validRoute = Boolean(store.getRoute(route.params.slug));

</script>

<template>
    <ErrorPage v-if="!validRoute" />
    <template v-if="validRoute">
        <div class="main m-0 p-0  min-vh-100">
            <div id="side-bar" class="m-0 p-0 bg-black ">
                <Sidebar />
            </div>
            <div id="content" class="w-100">
                <!-- <div class=" content"> -->
                <Suspense>
                    <LoadModule :dir="componentInfo['dir']" />
                    <template #fallback>
                        <div class="loading">
                            <ui-spinner active fourColored></ui-spinner>
                            <p>Loading Module...</p>
                        </div>
                    </template>
                </Suspense>
                <!-- </div> -->
            </div>
        </div>
        <ui-snackbar v-model="store.snackbar.visible" :message="store.snackbar.msg" :action-type="1"></ui-snackbar>
    </template>
</template>

<style scoped src="./styles.css"></style>