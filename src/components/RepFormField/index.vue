<script setup>
import { ref } from "vue";

const props = defineProps({
  fields: [][(String, Number)],
  objectKey: String, // for creating unqiue ID in for loop
  useFloating: Boolean,
});

const addBtnRef = ref();
const emit = defineEmits(["addEvent", "removeEvent"]);

const handleAdd = () => {
  emit("addEvent", props.objectKey);
  if (addBtnRef.value) {
    setTimeout(() => {
      const selNextInputEl = `#${props.objectKey}${props.fields.length - 1}key`;
      document.querySelector(selNextInputEl)?.focus();
      addBtnRef.value.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }
};
const handleEnter = (index) => {
  if (index == props.fields.length - 1) {
    handleAdd();
    return;
  }
  const selNextInputEl = `#${props.objectKey}${index + 1}key`;
  document.querySelector(selNextInputEl).focus();
};
</script>

<template>
  <div class="rep-row row g-2 mb-lg-2 mb-3" v-for="(row, i) in fields">
    <div class="col">
      <div class="row g-2">
        <div class="col-12 col-lg">
          <div :class="{ 'form-floating': useFloating }">
            <input
              v-model="row[0]"
              type="text"
              class="form-control mono-font"
              :class="{ 'py-2': !useFloating }"
              :id="objectKey + i + 'key'"
              placeholder="Key..."
            />
            <label v-if="useFloating" :for="objectKey + i + 'key'">Key</label>
          </div>
        </div>
        <div class="col-12 col-lg">
          <div :class="{ 'form-floating': useFloating }">
            <input
              v-model="row[1]"
              type="text"
              class="form-control mono-font"
              :class="{ 'py-2': !useFloating }"
              :id="objectKey + i + 'val'"
              placeholder="Value..."
              @keyup.enter="handleEnter(i)"
            />
            <label v-if="useFloating" :for="objectKey + i + 'val'">Value</label>
          </div>
        </div>
      </div>
    </div>
    <div
      class="col-auto close text-center text-danger rounded d-flex justify-content-center align-items-center"
      @click="emit('removeEvent', props.objectKey, i)"
    >
      <i class="bi bi-x"></i>
    </div>
  </div>
  <div class="d-flex gap-2 mt-3 mt-sm-2 justify-content-md-end justify-content-center align-items-center">
    <div class="text-muted" v-if="fields.length == 0">Add 'Key/Value' Pair ></div>
    <button class="btn btn-primary add-btn" @click="handleAdd" ref="addBtnRef" title="Add New Key/Value Pair">
      <i class="bi bi-plus-circle-fill"></i>
      <span class="ps-2">Add</span>
    </button>
  </div>
</template>

<style src="./style.css" scoped />
