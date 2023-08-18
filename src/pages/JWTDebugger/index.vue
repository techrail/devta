<script setup>
import { ref } from 'vue';
import { copyToClipboard } from '../../components/utils/UnixDateTimeFunctions';


const jwtoken = ref()

const handleClick = (value) => {
    copyToClipboard(value)
}



</script>

<template>
    <div class="grid bg-light">
        <div class="block card block1 ">
            <div class="p-3">
                <h4>
                    <strong>
                        JWT Debugger
                    </strong>
                </h4>

                <div class="overflow-auto">
                    <textarea v-model="jwtoken" autofocus type="text" class="form-control" rows="15"
                        placeholder="Enter the token">
                    </textarea>

                    <!-- <div class="d-flex flex-row mt-2 justify-content-between align-items-center gap-2">
                        <div class="d-flex gap-2">
                            <button class="btn btn-primary mt-1" type="button" @click="handleClick(markdown)">
                                Debug
                            </button>
                            <button class="btn btn-danger mt-1" type="reset" @click="handleClear">
                                Clear
                            </button>
                        </div>
                    </div> -->

                </div>
            </div>
        </div>
        <div class="block card block2 overflow-auto ">
            <div class=" p-2">
                <div class="alert alert-warning" role="alert">
                    <small>
                        Warning: JWTs are credentials, which can grant access to resources. Be careful where you paste them!
                        We
                        do not record tokens, all validation and debugging is done on the client side.
                    </small>
                </div>
            </div>
            <div v-if="jwtoken" class="mt-3">
                {{ JSON.parse(Buffer.from(jwtoken.split('.')[1], 'base64').toString()) }}
            </div>
        </div>
    </div>
</template>

<style scoped src="./style.css" />