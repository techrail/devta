<script setup>
import PageHeader from "@/Pageheader/index.vue";
import {ref} from "vue";
import {copyToClipboard} from "@/utils/UnixDateTime.js";

const imageInput = ref("");
const renderedImage = ref("");
const showWarning = ref(false);
const RGB = ref("0, 0, 0");
const HEX = ref("#000000");
const HSL = ref("0, 0%, 0%");

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.name.endsWith(".jpg") || file.name.endsWith(".jpeg") || file.name.endsWith(".png")) {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          renderedImage.value = reader.result;
        } catch (error) {
          console.error("Error parsing image", error);
        }
      };
      reader.readAsDataURL(file);
    } else {
      window.alert("Please select a .jpg, .jpeg or .png file under 1 MB.");
    }
  }
};

const handleImageFromLink = (event) => {
  try {
    const image = new Image();
    image.src = event.target.value;
    image.onload = function () {
      if (this.width > 0) {
        renderedImage.value = event.target.value;
      } else {
        renderedImage.value = "";
      }
    }
  } catch (error) {
    console.error("Error loading image from link", error);
  }
};

const hexToRgb = (hex) => {
  let RGB = [];
  for (let i = 1; i < hex.length; i += 2) {
    RGB.push(parseInt(hex[i] + hex[i + 1], 16));
  }
  return RGB;
};

const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin;
  let h, s, l;
  if (delta === 0)
    h = 0;
  else if (cmax === r)
    h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0)
    h += 360;
  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return h + ", " + s + "%, " + l + "%";
};

const selectPicker = async () => {
  if (!'EyeDropper' in window) {
    window.alert("Eyedropper is not supported by your browser.");
  } else {
    let eyeDropper = new EyeDropper();

    try {
      showWarning.value = true;
      let pickedColor = await eyeDropper.open();
      HEX.value = pickedColor.sRGBHex;
      let [r, g, b] = hexToRgb(pickedColor.sRGBHex);
      RGB.value = r + ", " + g + ", " + b;
      HSL.value = rgbToHsl(r, g, b);
    } catch (error) {
      console.log(error);
    } finally {
      showWarning.value = false;
    }
  }
};

const refreshOutput = (event) => {
  const hex = event.target.value;
  HEX.value = hex;
  let [r, g, b] = hexToRgb(hex);
  RGB.value = r + ", " + g + ", " + b;
  HSL.value = rgbToHsl(r, g, b);
}

const copyParsedData = (value) => {
  copyToClipboard(value);
}

</script>

<template>
  <main class="p-0 m-0 w-100">
    <div class="w-100 mt-3">
      <PageHeader/>
    </div>
    <div class="grid mt-1">
      <div class="block card block1">
        <div class="p-3">
          <div class="overflow-auto">
            <div class="">
              <p class="muted">Upload an image for the eyedropper</p>
              <input
                  id="imageInput"
                  accept=".jpg,.jpeg,.png"
                  autofocus
                  class="form-control mono-font"
                  placeholder="Upload Image"
                  size="1048576"
                  type="file"
                  @input="handleImageChange"
              />
            </div>
            <div class="">
              <p class="muted pd-2 mt-3">Paste image link</p>
              <input
                  id="imageLink"
                  v-model="imageInput"
                  autofocus
                  class="form-control mono-font"
                  placeholder="Paste Image Link"
                  type="text"
                  @input="handleImageFromLink"
              />
            </div>
          </div>
          <div class="card p-4 mt-3">
            <img v-if="renderedImage !==''" :src="renderedImage" alt="mag">
            <i v-else class="bi bi-box-arrow-in-down text-center" style="font-size: 30px"></i>
          </div>
          <div class="d-flex justify-content-start">
            <button class="btn btn-secondary p-2 m-2" @click="selectPicker">
              <i class="bi bi-eyedropper"></i>
            </button>
          </div>
          <div v-show=showWarning class="alert alert-warning mt-1" role="alert">
            <small>
              Do not click anywhere. Eyedropper takes a moment to load.
              Press ESC to exit the operation.
            </small>
          </div>
        </div>

      </div>
      <div class="block card block2 overflow-auto">
        <div class="p-3">
          <ul class="p-0">
            <li class="list-group-item"><h5 class="text-muted"><strong>Picker</strong></h5></li>
            <li class="input-group p-1">
              <input :value=HEX class="form-control" type="color" @input=refreshOutput>
            </li>
            <li class="list-group-item"><h5 class="text-muted mt-2"><strong>Values</strong></h5></li>
            <li class="input-group p-1">
              <span class="input-group-text">RGB</span>
              <input :value="RGB" class="form-control" disabled readonly type="text">
              <span class="input-group-text" @click="copyParsedData(RGB)">
                <i class="bi bi-clipboard"></i>
              </span>
            </li>
            <li class="input-group p-1">
              <span class="input-group-text">HEX</span>
              <input :value="HEX" class="form-control" disabled readonly type="text">
              <span class="input-group-text" @click="copyParsedData(HEX)">
                <i class="bi bi-clipboard"></i>
              </span>
            </li>
            <li class="input-group p-1">
              <span class="input-group-text">HSL</span>
              <input :value="HSL" class="form-control" disabled readonly type="text">
              <span class="input-group-text" @click="copyParsedData(HSL)">
                <i class="bi bi-clipboard"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="./style.css"/>