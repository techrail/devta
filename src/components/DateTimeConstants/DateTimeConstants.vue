<script setup>
import { ref } from 'vue'
import { getCurrentDate, getUnixTime } from '../utils/UnixDateTimeFunctions';
import CopyContainer from '../CopyContainer/CopyContainer.vue';

const epochTime = ref(getUnixTime())
const data = getCurrentDate()
const localeTime = ref(data.loc)
const gmTime = ref(data.gmt)
</script>


<template>
    <div class="d-flex flex-column align-items-start  gap-4 justify-content-center">
        <div class="w-100">
            <CopyContainer title="UNIX" :value="epochTime" />
        </div>
        <div class="w-100">
            <CopyContainer title="Current Locale time" :value="localeTime" />
        </div>
        <div class="w-100">
            <CopyContainer title="curent GMT" :value="gmTime" />
        </div>
    </div>
</template>