<script setup>
import { ref, onMounted } from "vue";
import { copyToClipboard } from "../../components/utils/UnixDateTime";
import { marked } from "marked";
import PageHeader from "../../components/Pageheader/index.vue";
// import { MarkdownPlaceHolder } from "../../components/utils/MarkdownPreviewer"
import { SampleMarkdown, cssOverrides } from "../../components/utils/MarkdownPreviewer";

onMounted(() => document.querySelector("[autofocus]")?.focus());

const markdown = ref(SampleMarkdown);

const handleClick = (value) => {
  copyToClipboard(value);
};

const handleClear = () => {
  markdown.value = "";
};

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.name.endsWith(".md")) {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          markdown.value = reader.result;
        } catch (error) {
          console.error("Error parsing Markdown:", error);
        }
      };
      reader.readAsText(file);
    } else {
      window.alert("Please select a .md file under 1 MB.");
    }
  }
};

const downloadMarkdown = () => {
  // Get the content of the Markdown 
  const markdownContent = markdown.value
  // Create a Blob with the Markdown content
  const blob = new Blob([markdownContent], { type: 'text/markdown' });

  // Create a download link
  const link = document.createElement('a');
  link.download = 'markdownFile.md';
  link.href = window.URL.createObjectURL(blob);
  link.click();
}

</script>

<template>
  <main class="p-0 m-0 w-100">
    <div class="w-100 mt-3">
      <PageHeader />
    </div>
    <div class="grid mt-1">
      <div class="block card block1">
        <div class="p-3">
          <div class="form-floating">
            <div class="markdown-editor">
              <div class="form-floating">
                <textarea v-model="markdown" autofocus type="text" class="form-control mono-font" id="tokenInput"
                  placeholder="Enter the token">
                </textarea>
                <label for="tokenInput">Enter markdown</label>
              </div>
              <!-- <textarea v-model="markdown" autofocus type="text" class="form-control mono-font"
                                style="height: 400px;" id="markdown" placeholder="Enter markdown">
                    </textarea>
                            <label for="markdown">Enter the token</label> -->
            </div>

            <div class="d-flex flex-row mt-2 justify-content-between align-items-center gap-2">
              <!-- <div>
                                <input type="file" @change="handleFileChange" size="1048576" class="form-control mt-1"
                                    accept=".md" name="Upload markdown file" id="check">
                            </div> -->
              <div class="mt-1 d-flex align-items-center gap-1">
                <!-- file input that only accpets markdown files lesser than 1mb -->
                <input type="file" @change="handleFileChange" size="1048576" class="form-control" accept=".md"
                  name="Upload markdown file" id="markdownInput" />
                <label for="markdownInput">
                  <div role="button" data-toggle="tooltip" data-placement="top" title="Upload local file"
                    class="btn btn-secondary">
                    <i class="bi bi-upload"></i>
                  </div>
                </label>
                <div class="text-muted">Upload file</div>
              </div>

              <div class="d-flex gap-2">
                <button class="btn btn-warning mt-1" :disabled="markdown === ''" type="button" @click="downloadMarkdown"
                  data-toggle="tooltip" data-placement="top" title="Download .md">
                  <i class="bi bi-download"></i>
                </button>
                <button class="btn btn-primary mt-1" :disabled="markdown === ''" type="button"
                  @click="handleClick(markdown)" data-toggle="tooltip" data-placement="top" title="Copy to clipboard">
                  <i class="bi bi-clipboard"></i>
                </button>
                <button class="btn btn-danger mt-1" type="reset" @click="handleClear" data-toggle="tooltip"
                  data-placement="top" title="Clear text">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="block card block2 overflow-auto">
        <div v-if="markdown" class="mt-3 overflow-auto p-1">
          <div v-html="cssOverrides + marked.parse(markdown)" id="markdown_styles" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="./style.css" />
