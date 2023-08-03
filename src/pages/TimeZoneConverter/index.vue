<script setup>
import { ref, watch } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { formatDates, labelFormatter } from '../../components/utils/UnixDateTimeFunctions';
import DateTimeConstants from '../../components/DateTimeConstants/DateTimeConstants.vue';
import { copyToClipboard } from '../../components/utils/UnixDateTimeFunctions';
import { convertTimezone, timezones } from '../../components/utils/TimeZoneFunctions';

const date = ref();
const timezone = ref();
const reqTimezone = ref()
const convertedTime = ref()
// const handleChange = () => {
//     data.value = formatDates(unix.value)
// }


const convert = () => {
    if (!date.value | reqTimezone.value | timezone.value) return
    const val = convertTimezone(date.value, timezone.value, reqTimezone.value)
    console.log(val)
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
                        Time zone converter
                    </strong>
                </h2>
                <div class="d-flex flex-column gap-2">
                    <VueDatePicker v-model="date" />
                    <select class="form-select" name="timezone-select" id="timezone-select" v-model="timezone">
                        <option :value="undefined">Select current timezone</option>
                        <option v-for="zone in timezones" :value="zone" :key="zone">{{ zone }}</option>
                    </select>

                    <select class="form-select" name="timezone-select" id="timezone-select" v-model="reqTimezone">
                        <option :value="undefined">Required timezone</option>
                        <option v-for="zone in timezones" :value="zone" :key="zone">{{ zone }}</option>
                    </select>

                    <button @click="convert" class="btn btn-primary">
                        Convert
                    </button>
                </div>
            </div>
        </div>
        <div class="block card block2 overflow-auto">
            {{ date }}
            {{ convertedTime }}
        </div>
    </div>
</template>

<style scoped src="./style.css" />