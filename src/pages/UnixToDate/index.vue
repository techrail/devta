<script setup>
import { ref } from 'vue';
import { formatDates } from '../../components/utils/UnixDateTime';
import DateTimeConstants from '../../components/DateTimeConstants/DateTimeConstants.vue';
import { copyToClipboard } from '../../components/utils/UnixDateTime';
import CopyContainer from '../../components/CopyContainer/SingleLineCopy.vue';
import { covertCamelCase } from '../../components/utils/jsonBeautifier'
import PageHeader from '../../components/Pageheader/index.vue';

const unix = ref()
const data = ref()

const handleChange = () => {
    const res = formatDates(unix.value)
    data.value = covertCamelCase(res)
}

const handleClick = (value) => {
    copyToClipboard(value)
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
                    <input v-model="unix" @input="handleChange" autofocus type="text" class="form-control mono-font"
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
    </main>
</template>

<style scoped src="./style.css" />