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

<template>
  <main class="p-0 m-0 w-100 bg-body">
    <div class="w-100 mt-3">
      <PageHeader />
    </div>

    <div class="grid mt-1">
      <div class="block card block1">
        <div class="p-3">
          <div class="overflow-auto">
            <input
              v-model="cronExpression"
              @input="parseCronExpression"
              type="text"
              class="form-control mono-font"
              placeholder="Enter CRON expression"
            />
          </div>
        </div>
      </div>
      <div class="block card block2">
        <div class="p-3">
          <div class="d-flex flex-column gap-2 p-2">
            <p>{{ parsedResult }}</p>
          </div>
        </div>
      </div>
      <div class="block card block3">
        <div class="p-3">
          <h3>CRON Expression Syntax</h3>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Field</th>
                <th>Description</th>
                <th>Allowed Values</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Minute</td>
                <td>Minutes within the hour</td>
                <td>0-59</td>
              </tr>
              <tr>
                <td>Hour</td>
                <td>Hours within the day</td>
                <td>0-23</td>
              </tr>
              <tr>
                <td>Day of Month</td>
                <td>Day of the month</td>
                <td>1-31</td>
              </tr>
              <tr>
                <td>Month</td>
                <td>Months of the year</td>
                <td>1-12 or JAN-DEC</td>
              </tr>
              <tr>
                <td>Day of Week</td>
                <td>Days of the week</td>
                <td>0-6 or SUN-SAT (0 and 7 represent Sunday)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="./style.css"></style>
