<script setup>
import PageHeader from '../../components/Pageheader/index.vue'
import { ref, watch } from 'vue';
import { format } from 'sql-formatter';
import { dialectOptions, keywordCaseOptions, logicalOperatorNewlineOptions, indentStyleOptions } from '../../components/utils/SQLFormatterHelpers';
import MultiLineCopy from '../../components/CopyContainer/MultiLineCopy.vue';

const sqlPlaceholder = "select supplier_name,city from (select * from suppliers join addresses on suppliers.address_id = addresses.id) as suppliers where supplier_id > 500 order by supplier_name asc, city desc; "
const inputSQL = ref(sqlPlaceholder)

const params = ref({
    denseOperators: false,
    dialect: dialectOptions[0],
    tabWidth: "2",
    expressionWidth: "50",
    indentStyle: indentStyleOptions[0],
    keywordCase: keywordCaseOptions[0],
    logicalOperatorNewline: logicalOperatorNewlineOptions[0],
    newlineBeforeSemicolon: false,
    useTabs: false,
})

const formattedSQL = ref(format(inputSQL.value, params.value))



watch(inputSQL, () => {
    updateQuery()
})

const handleChange = (e) => {
    updateQuery()
}

const updateQuery = () => {
    if (!inputSQL.value) return
    formattedSQL.value = format(inputSQL.value, params.value)
    console.log(formattedSQL.value)
}


</script>

<template>
    <main class="bg-light p-0 m-0 w-100">
        <div class="w-100 mt-3">
            <PageHeader />
        </div>
        <div class="grid bg-light mt-1">
            <div class="block card block1">
                <div class="inner_block">
                    <div class="p-2">
                        <div class="form-floating">
                            <textarea @change="handleChange" v-model="inputSQL" autofocus type="text"
                                class="form-control mono-font" id="queryInput" style="height: 200px;"
                                placeholder="Enter SQL query">
                        </textarea>
                            <label for="queryInput">Enter SQL Query</label>
                        </div>
                        <div class="p-2">
                            <strong>
                                Options
                            </strong>
                            <div class="d-flex inner_input_group mt-3">
                                <!-- tab spacing selector -->
                                <div class="inner_input_group">
                                    <label for="indentSpacing font-muted">Enter tab spacing</label>
                                    <input @change="handleChange" type="number" :value="params.tabWidth"
                                        :v-model="params.tabWidth" id="indentSpacing" class="form form-control" max="10"
                                        min="1">
                                </div>
                                <!-- checkboxes -->
                                <div class="d-flex flex-row gap-4 justify-content-center w-100">
                                    <div>
                                        <input @change="handleChange" class="form-check-input" :v-model="params.useTabs"
                                            :checked="params.useTabs" type="checkbox" id="flexCheckChecked">
                                        <label class="form-check-label" for="flexCheckChecked">
                                            Use tabs
                                        </label>
                                    </div>
                                    <div>
                                        <input @change="handleChange" class="form-check-input"
                                            :v-model="params.newlineBeforeSemicolon"
                                            :checked="params.newlineBeforeSemicolon" type="checkbox" id="flexCheckChecked">
                                        <label class="form-check-label" for="flexCheckChecked">
                                            New line before ;
                                        </label>
                                    </div>
                                    <div>
                                        <input @change="handleChange" class="form-check-input"
                                            :v-model="params.denseOperators" :checked="params.denseOperators"
                                            type="checkbox" id="flexCheckChecked">
                                        <label class="form-check-label" for="flexCheckChecked">
                                            Dense operators
                                        </label>
                                    </div>
                                </div>
                                <!-- dialect/language selector -->
                                <div class="form-floating">
                                    <select @change="handleChange" class="form-select" name="timezone-select"
                                        id="timezone-select" v-model="params.dialect">
                                        <option :value="dialectOptions[0]">{{ dialectOptions[0] }}</option>
                                        <option v-for="zone in dialectOptions.slice(1)" :value="zone" :key="zone">{{
                                            zone }}</option>
                                    </select>
                                    <label for="timezone-select">Language</label>
                                </div>
                                <!-- case selector -->
                                <div class="form-floating">
                                    <select @change="handleChange" class="form-select" name="timezone-select"
                                        id="timezone-select" v-model="params.keywordCase">
                                        <option :value="keywordCaseOptions[0]">{{ keywordCaseOptions[0] }}</option>
                                        <option v-for="zone in keywordCaseOptions.slice(1)" :value="zone" :key="zone">{{
                                            zone }}</option>
                                    </select>
                                    <label for="timezone-select">Case</label>
                                </div>
                                <!-- indent style selector -->
                                <div class="form-floating">
                                    <select @change="handleChange" class="form-select" name="timezone-select"
                                        id="timezone-select" v-model="params.indentStyle">
                                        <option :value="indentStyleOptions[0]">{{ indentStyleOptions[0] }}</option>
                                        <option v-for="zone in indentStyleOptions.slice(1)" :value="zone" :key="zone">{{
                                            zone }}</option>
                                    </select>
                                    <label for="timezone-select">Indentation style</label>
                                </div>

                                <!-- New Line logical operator -->
                                <div>
                                    <div class="form-floating">
                                        <select @change="handleChange" class="form-select" name="timezone-select"
                                            id="timezone-select" v-model="params.logicalOperatorNewline">
                                            <option :value="logicalOperatorNewlineOptions[0]">{{
                                                logicalOperatorNewlineOptions[0] }}</option>
                                            <option v-for="zone in logicalOperatorNewlineOptions.slice(1)" :value="zone"
                                                :key="zone">{{ zone }}</option>
                                        </select>
                                        <label for="timezone-select">AND/OR newlines</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="block card block2 overflow-auto">
                <div v-if="formattedSQL" class="p-2">
                    <MultiLineCopy title="Formatted SQL" :value="formattedSQL" height="500px" />
                </div>
            </div>
        </div>
    </main>
</template>


<style scoped src="./style.css" />