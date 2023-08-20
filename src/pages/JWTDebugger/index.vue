<script setup>
import { ref, watch } from 'vue';
import { copyToClipboard } from '../../components/utils/UnixDateTimeFunctions';
import { getHeader } from '../../components/utils/JwtHelpers';
import { getPayload } from '../../components/utils/JwtHelpers';


const jwtoken = ref()
const decodedPayload = ref()
const decodedHeader = ref()

watch(jwtoken, (newjwtoken, oldjwtoken) => {
    if (!newjwtoken | newjwtoken === oldjwtoken) return
    decodedHeader.value = getHeader(newjwtoken)
    decodedPayload.value = getPayload(newjwtoken)
})

const handleClick = async (text) => {
    try {
        await copyToClipboard(text)
    } catch (error) {
        console.log(error)
    }
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
                <!-- <div class="d-flex mt-2 gap-2 ">
                    <button type="button" class="btn btn-primary" @click="handleClick(decodedToken)">
                        Copy JSON
                    </button>
                    <button type="button" class="btn btn-primary" @click="handleClick(jwtoken)">
                        Copy token
                    </button>
                </div> -->
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
            <div v-if="jwtoken">
                <div class="p-2 overflow-auto">
                    <div class="form-floating">
                        <textarea class="form-control" v-model="decodedHeader" disabled placeholder="Header"
                            id="headingFloat" style="height:120px" />
                        <label for="headingFloat">Decoded Header</label>
                    </div>
                </div>
                <div class="p-2 overflow-auto">
                    <div class="form-floating">
                        <textarea class="form-control" style="height: 200px;" v-model="decodedPayload" disabled
                            placeholder="payload" id="payload" />
                        <label for="payload">Decoded Payload</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped src="./style.css" />