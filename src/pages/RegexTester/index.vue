<script setup>
import PageHeader from '../../components/Pageheader/index.vue';
import { ref, watch } from 'vue';

const regex = ref('');
const string = ref('');
const isMatch = ref(false);

const handleTextareaChange = () => {
  // Perform the matching logic here and update the isMatch variable
  isMatch.value = checkMatching();
}

// Watch for changes in regex and string and trigger the matching logic
watch([regex, string], () => {
  handleTextareaChange();
});

// Function to check if the regex matches the string
const checkMatching = () => {
  try {
    const regexInput = new RegExp(regex.value);
    const result = regexInput.test(string.value);
    return result;
  } catch (error) {
    // Handle any invalid regular expressions
    return false;
  }
}
</script>

<template>
  <main class="p-0 m-0 w-100">
    <div class="w-100 mt-3">
      <PageHeader />
    </div>
    <div class="grid mt-1">
      <div class="block card block1 ">
        <div class="p-3">
          <div class="overflow-auto">
            <div class="form-floating">
              <textarea v-model="regex" autofocus type="text" class="form-control mono-font fixed-textarea"
                id="regexInput" placeholder="Enter the Regex">
                    </textarea>
              <label for="tokenInput">Enter the Regex</label>
            </div>
          </div>
        </div>
        <div class="p-3">
          <div class="overflow-auto">
            <div class="form-floating">
              <textarea v-model="string" autofocus type="text" class="form-control mono-font fixed-textarea"
                id="stringInput" placeholder="Enter the String">
                    </textarea>
              <label for="stringInput">Enter the String</label>
            </div>
          </div>
        </div>
      </div>
      <div class="block card block1 ">
        <div class="p-3">
          <div class="overflow-auto">
            <div class="form-floating">
              <div class="heading w-auto">
                <strong>
                  Match information
                </strong>
                <hr>
                <div class="">
                  <div class="overflow-auto">
                    <div class="form-floating" :class="isMatch ? 'match-found' : 'match-not-found'">
                      {{ isMatch ? 'Match found' : 'Your regular expression does not match the subject string.' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<style scoped src="./style.css"></style>
