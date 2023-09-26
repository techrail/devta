<script setup>
import dependencies from "./dependencies";
</script>

<template>
    <div class="d-flex align-items-center flex-column w-100 mt-5 text-center">
        <h3>Thanks to these awesome packages!</h3>
        <p>The following packages are used in the project to help deliver awesome tools to you!</p>
        <div class="packages">
            <div class="package card text-start" v-for="item in dependencies">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">{{ item.name }}</h5>
                    <p class="card-text flex-grow-1">{{ item.description }}</p>
                    <div class="btn-group" role="group">
                        <a :href="item.link" class="btn btn-primary" target="_blank"><i class="bi bi-box-arrow-up-right"
                                style="margin-right: 5px;"></i>Checkout on NPM</a>
                        <a :href="item.homepage" class="btn btn-primary" target="_blank"
                            v-if="item.homepage !== undefined"><i class="bi bi-box-arrow-up-right"
                                style="margin-right: 5px;"></i>Homepage</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="./style.css"></style>