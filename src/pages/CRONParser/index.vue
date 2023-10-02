<template>
  <main class="p-0 m-0 w-100 bg-body">
    <div class="w-100 mt-3">
      <PageHeader />
    </div>

    <div class="grid mt-1">
      <div class="block card block1">
        <div class="p-3">
          <div class="overflow-auto">
            <input v-model="cronExpression" @input="parseCronExpression" type="text" class="form-control mono-font" placeholder="Enter CRON expression" />
          </div>
        </div>
      </div>
      <div class="block card block2">
        <div class="p-3">
          <div class="d-flex gap-2 p-2">
            <p>{{ parsedResult }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from "vue";
import PageHeader from "../../components/Pageheader/index.vue";
import cronstrue from "cronstrue";

const cronExpression = ref("");
const parsedResult = ref("");

const parseCronExpression = () => {
  try {
    parsedResult.value = cronstrue.toString(cronExpression.value);
  } catch (error) {
    parsedResult.value = "Invalid CRON expression";
  }
};

watch(cronExpression, () => {
  parseCronExpression();
});
</script>

<style scoped>

</style>
