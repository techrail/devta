<script setup>
import { ref, watch } from 'vue';
import { copyToClipboard } from '../../components/utils/UnixDateTime';
import { getHeader } from '../../components/utils/JwtDebugger';
import { getPayload } from '../../components/utils/JwtDebugger';
import PageHeader from '../../components/Pageheader/index.vue';

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
    <main class="bg-light p-0 m-0 w-100">
        <div class="w-100 mt-3">
            <PageHeader />
        </div>
        <div class="grid bg-light">
            <div class="block card block1 ">
                <div class="p-3">
                    <div class="overflow-auto">
                        <div class="form-floating">
                            <textarea v-model="jwtoken" autofocus type="text" class="form-control mono-font" id="tokenInput"
                                placeholder="Enter the token">
                    </textarea>
                            <label for="tokenInput">Enter the token</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="block card block2 overflow-auto ">
                <div class=" p-2">
                    <div class="alert alert-warning" role="alert">
                        <small>
                            Warning: JWTs are credentials, which can grant access to resources. Be careful where you paste
                            them!
                            We
                            do not record tokens, all validation and debugging is done on the client side.
                        </small>
                    </div>
                </div>
                <div v-if="jwtoken">

                    <div class="p-2 overflow-auto">
                        <h5 class="text-muted">Header</h5>
                        <highlightjs :code=decodedHeader />
                    </div>
                    <div class="p-2 overflow-auto">
                        <h5 class="text-muted">Payload</h5>
                        <highlightjs :code=decodedPayload />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped src="./style.css" />