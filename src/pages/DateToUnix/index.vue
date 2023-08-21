<script setup>
import { ref, watch } from 'vue';
import { dateToUnixTimestamp, formatDates } from '../../components/utils/UnixDateTimeFunctions';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import CopyContainer from '../../components/CopyContainer/CopyContainer.vue';
import { useRoute } from "vue-router";

// import DateTimeConstants from '../../components/DateTimeConstants/DateTimeConstants.vue';
import { covertCamelCase } from '../../components/utils/jsonBeautifier'


const date = ref()
const unix = ref()
const formatteddates = ref()
const route = useRoute();


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

const getFormatteddates = (date) => {
    const val = formatDates(date)
    formatteddates.value = covertCamelCase(val)
}


</script>

<template>
    <main class="bg-light p-0 m-0 w-100">
        <div class="w-100 mt-3">
            <div class="top_header">
                <div class="heading">
                    <!-- <h5> -->
                    <strong>
                        {{ route.name }}
                    </strong>
                    <!-- </h5> -->
                </div>
                <!-- <div>route links</div> -->
            </div>
        </div>
        <div class="grid mt-1 bg-light">
            <div class="block card block1">
                <div class="p-3">
                    <div class="p-2">
                        <p class="muted">Choose a date and time from the datepicker</p>
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
                        <CopyContainer :title=key :value=value />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped src="./style.css" />