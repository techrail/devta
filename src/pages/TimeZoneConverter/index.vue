<script setup>
import { ref, watch } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { convertedFormatDates, convertTimezone, timezones, getCurrentLocaleTimezone } from '../../components/utils/TimeZoneFunctions';
import CopyContainer from '../../components/CopyContainer/CopyContainer.vue';

const date = ref(null);
const timezone = ref();
const reqTimezone = ref()
const convertedTime = ref()
const localTimezone = ref(getCurrentLocaleTimezone())
const localTimeCheck = ref(false)

const convert = () => {
    if (!date.value | reqTimezone.value | timezone.value) return
    const updDate = new Date(date.value)
    const val = convertTimezone(updDate, timezone.value, reqTimezone.value)
    const prettyDates = convertedFormatDates(val)
    convertedTime.value = prettyDates
}

const handleCheckbox = () => {
    try {
        if (localTimeCheck) timezone.value = localTimezone.value
    } catch (error) {
        alert("Timezone not available, Please choose a timezone from the select")
    }
}

const handleSelectChange = () => {
    localTimeCheck.value = timezone.value === localTimezone.value
}


</script>

<template>
    <div class="grid bg-light">
        <div class="block card block1">
            <div class="p-3">
                <h4>
                    <strong>
                        Time zone converter
                    </strong>
                </h4>
                <div class="d-flex flex-column gap-2">
                    <div class="mt-2"><strong>Select date and time </strong></div>
                    <VueDatePicker v-model="date" />
                    <div><strong> Select current timezone </strong></div>
                    <select class="form-select" @change="handleSelectChange" name="timezone-select" id="timezone-select"
                        v-model="timezone">
                        <option :value="undefined">Select source timezone</option>
                        <option v-for="zone in timezones" :value="zone" :key="zone">{{ zone }}</option>
                    </select>
                    <div class="d-flex gap-1">
                        <input class="form-check-input" @input="handleCheckbox" v-model="localTimeCheck" type="checkbox"
                            id="flexCheckChecked">
                        <label class="form-check-label" for="flexCheckChecked">
                            Choose my current timezone
                        </label>
                    </div>
                    <div><strong>Destination timezone </strong></div>
                    <div class="text-muted">Timezone to convert the source time into</div>
                    <select class="form-select" name="timezone-select" id="timezone-select" v-model="reqTimezone">
                        <option :value="undefined">Select destination timezone</option>
                        <option v-for="zone in timezones" :value="zone" :key="zone">{{ zone }}</option>
                    </select>

                    <button :disabled="date === null || timezone === undefined || reqTimezone === undefined"
                        @click="convert" class="btn btn-primary">
                        Convert
                    </button>

                </div>
            </div>
        </div>
        <div class="block card block2 overflow-auto">
            <div v-if="convertedTime" class="mt-3">
                <div v-for="(value, key) in convertedTime" class="p-1 d-flex flex-column gap-1" :key="key">
                    <CopyContainer :title=key :value=value />
                </div>
            </div>


        </div>
    </div>
</template>

<style scoped src="./style.css" />