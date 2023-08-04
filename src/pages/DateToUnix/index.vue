<script setup>
import { ref, watch } from 'vue';
import { dateToUnixTimestamp, formatDates, labelFormatter } from '../../components/utils/UnixDateTimeFunctions';
import { copyToClipboard } from '../../components/utils/UnixDateTimeFunctions';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import CopyContainer from '../../components/CopyContainer/CopyContainer.vue';


const date = ref()
const unix = ref()
const formatteddates = ref()

watch(date, (newDate, oldDate) => {
    if (newDate !== "") {
        try {
            const val = dateToUnixTimestamp(date.value)
            unix.value = val
            getFormatteddates(val)
        } catch (error) {
            unix.value = "Error"
        }
    }
})


const getFormatteddates = (date) => formatteddates.value = formatDates(date)

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
                        Date to unix converter
                    </strong>
                </h4>
                <p class="muted">Enter a valid Date format or choose from the datepicker below</p>
                <div class="p-2">
                    <input v-model="date" type="text" class="form-control mb-2" placeholder="Enter Date">
                    <div class="text-muted w-100 text-center mt-1 mb-1">or</div>
                    <VueDatePicker v-model="date"></VueDatePicker>
                </div>
            </div>
        </div>
        <div class="block card block2 overflow-auto">
            <div v-if="date" class="mt-3">
                <div class="p-1">
                    <div role="button" @click="handleClick(unix)" class="flex flex-row">
                        <CopyContainer title="unix" :value="unix" />
                    </div>
                </div>
                <div v-for="(value, key) in formatteddates" class="p-1 d-flex flex-column gap-1" :key="key">
                    <div role="button" @click="handleClick(value)" class=" flex flex-row">
                        <CopyContainer :title=key :value=value />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped src="./style.css" />