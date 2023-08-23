<script setup>
import PageHeader from '../../components/Pageheader/index.vue'
import { ref } from 'vue';

const sqlPlaceholder = "select supplier_name,city from (select * from suppliers join addresses on suppliers.address_id = addresses.id) as suppliers where supplier_id > 500 order by supplier_name asc, city desc; "
const inputSQL = ref(sqlPlaceholder)


</script>

<template>
    <main class="bg-light p-0 m-0 w-100">
        <div class="w-100 mt-3">
            <PageHeader />
        </div>
        <div class="grid bg-light mt-1">
            <div class="block card block1">
                <div class="p-2">
                    <div class="form-floating">
                        <textarea v-model="inputSQL" autofocus type="text" class="form-control mono-font" id="queryInput"
                            style="height: 250px;" placeholder="Enter SQL query">
                        </textarea>
                        <label for="queryInput">Enter SQL Query</label>
                    </div>
                </div>
            </div>
            <div class="block card block2 overflow-auto">

                {{ inputSQL }}
            </div>
        </div>
    </main>
</template>


<style scoped src="./style.css" />