<script setup>
import { ref } from 'vue';
import { formatDates, labelFormatter } from '../../components/utils/UnixDateTimeFunctions';
import DateTimeConstants from '../../components/DateTimeConstants/DateTimeConstants.vue';
import { copyToClipboard } from '../../components/utils/UnixDateTimeFunctions';
import CopyContainer from '../../components/CopyContainer/CopyContainer.vue';

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
                <h4>
                    <strong>
                        Unix to Date converter
                    </strong>
                </h4>
                <input v-model="unix" @input="handleChange" autofocus type="text" class="form-control"
                    placeholder="Enter unix timestamp">

                <div class="mt-2 p-2">
                    <DateTimeConstants />
                </div>
            </div>
        </div>
        <div class="block card block2 overflow-auto">
            <div v-if="unix" class="mt-3">
                <div v-for="(value, key) in data" class="p-1 d-flex flex-column gap-2" :key="key">
                    <CopyContainer :title="key" :value="value" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped src="./style.css" />