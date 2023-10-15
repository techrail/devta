<script setup>
import { copyToClipboard } from "../utils/UnixDateTime";
import { formatToID } from "../utils/common";
const props = defineProps({
  title: String,
  value: String | Number,
  height: String,
  key: Number,
  id: String,
});

const handleClick = () => {
  copyToClipboard(props.value);
};
const id = props.id || formatToID(props.title);
const style = {
  height: props.height,
};
</script>

<template>
  <div class="form-floating d-flex gap-1 w-full">
    <textarea type="text" class="form-control" :style="style" readonly :id="id" :value="value" />
    <label :for="id">{{ title }}</label>
    <button @click="handleClick" class="btn btn-outline-secondary" type="button">
      <i class="bi bi-clipboard"></i>
    </button>
  </div>
</template>
