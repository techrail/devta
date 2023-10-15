<script setup>
import { computed, onMounted, onUnmounted, ref, shallowRef, watch } from "vue";

import { copyToClipboard } from "@/utils/UnixDateTime.js";
import { localStorageRef } from "@/utils/common";

import PageHeader from "@/Pageheader/index.vue";
import SingleLineCopy from "@/CopyContainer/SingleLineCopy.vue";

const INTERVAL = 1000;
const LEVELS = ["Panic", "Alert", "Error", "Warning", "Notice", "Info", "Debug"];
const settings = localStorageRef("lmid-settings", {
  encoding: 36,
  showDiffLogLevels: false,
  autoCopy: false,
});
const tickerRef = shallowRef(null);
const utcTime = ref(new Date());
const getUtcTimeString = () => utcTime.value.toUTCString();
const getUtcTimestamp = () => (utcTime.value.getTime() / 1000) | 0; // use bitwise or to round to a int, instead of using math.floor
const lmid = ref("");
const delta = ref(16 * 10 ** 8);

const getLMID = (timestamp) => {
  if (settings.value.encoding == 64) {
    return btoa(timestamp - delta.value)
      .toUpperCase()
      .replaceAll("=", "");
  }
  // use 36 as the default base
  return (timestamp - delta.value).toString(36).toUpperCase();
};

const isInvalidDelta = computed(() => {
  return delta.value > getUtcTimestamp();
});
const tickHandler = () => {
  utcTime.value = new Date();
  if (isInvalidDelta.value) return;

  lmid.value = getLMID(getUtcTimestamp());
  if (settings.value.autoCopy) copyToClipboard(lmid.value);
};
// watch delta and encoding changes, if changed instanly generate a new LMID and not wait till the next tick
watch([() => settings.value.encoding, delta], (a) => {
  tickHandler();
});
onMounted(() => {
  tickHandler();
  tickerRef.value = setInterval(() => tickHandler(), INTERVAL);
});
onUnmounted(() => {
  clearInterval(tickerRef.value);
});
</script>

<template>
  <main class="p-0 m-0 w-100">
    <div class="w-100 mt-3">
      <PageHeader />
    </div>
    <div class="grid mt-1">
      <div class="block card block1">
        <div class="p-3">
          <div class="overflow-auto gap-3">
            <SingleLineCopy title="UTC Time" :value="getUtcTimeString()" />
            <SingleLineCopy title="UTC Timestamp" class="mt-2" aria-disabled="true" :value="getUtcTimestamp()" />

            <div class="form-floating mt-4">
              <input
                :max="getUtcTimestamp()"
                v-model="delta"
                type="number"
                class="form-control mono-font"
                :class="{ 'is-invalid': isInvalidDelta }"
                id="deltaInput"
                placeholder="Amount you want to minus"
              />
              <label for="deltaInput">Delta / Amount to substract</label>
              <div class="invalid-feedback">Delta cannot be greater than current timestamp.</div>
            </div>

            <div class="text-muted mt-4 mb-2">Settings</div>
            <div class="px-2">
              <div class="d-flex gap-3 mb-2 radios">
                <div class="form-check">
                  <input class="form-check-input" type="radio" value="64" v-model="settings.encoding" name="encoding" id="base64" checked />
                  <label class="form-check-label" for="base64"> Base 64 </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" value="36" v-model="settings.encoding" name="encoding" id="base36" />
                  <label class="form-check-label" for="base36"> Base 36</label>
                </div>
              </div>

              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="settings.showDiffLogLevels" id="showLogLevels" />
                <label class="form-check-label" for="showLogLevels" style="user-select: none; cursor: pointer"> Show log levels</label>
              </div>
            </div>
            <h5 class="mt-5"><b>What is LMID</b></h5>
            <div>
              The problem with logging in software development arises when code is copied and log messages are left unchanged. This results in
              unmanageable logs that lack clear origins. To address this, the concept of a Log Message Identifier (LMID) is introduced. The LMID is a
              short, unique code attached to each log message, ensuring traceability, containing a log level, and providing error trace information
              without extensive details.
            </div>
            See the detailed writeup
            <a href="https://techrail.in/knowledge-base/logging-errors-properly" class="d-inline-block mt-2">here</a>
          </div>
        </div>
      </div>
      <div class="block card overflow-auto block2" style="font-family: monospace">
        <div class="p-3">
          <div class="overflow-auto">
            <SingleLineCopy title="LMID" :value="lmid" />
            <div v-if="settings.showDiffLogLevels">
              <h6 class="mt-4 mb-3 text-muted">With different log levels</h6>
              <SingleLineCopy class="mb-2" v-for="l in LEVELS" :title="l" :value="`${l.substring(0, 1)}#${lmid}`" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="./style.css" />
