<script setup>
import { ref } from 'vue';
import { formatDates, labelFormatter } from '../../components/utils/UnixDateTimeFunctions';
import DateTimeConstants from '../../components/DateTimeConstants/DateTimeConstants.vue';
import { copyToClipboard } from '../../components/utils/UnixDateTimeFunctions';

const unix = ref()
const data = ref()

const handleChange = () => {
    data.value = formatDates(unix.value)
}

const handleClick = (value) => {
    copyToClipboard(value)
}


</script>

<template>
    <div class="grid bg-light">
        <div class="block card block1">
            <div class="p-3">
                <h2>
                    <strong>
                        Unix to Date converter
                    </strong>
                </h2>
                <input v-model="unix" @input="handleChange" type="text" class="form-control"
                    placeholder="Enter unix timestamp">

                <div class="mt-2 p-2">
                    <DateTimeConstants />
                </div>
            </div>
        </div>
        <div class="block card block2 overflow-auto">
            <div v-if="unix" class="mt-3">
                <div v-for="(value, key) in data" class="p-1 d-flex flex-column gap-2" :key="key">
                    <div role="button" @click="handleClick(value)" class="card p-1 flex flex-row">
                        <strong> {{ labelFormatter(key) }} </strong> : {{ value }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped src="./style.css" />