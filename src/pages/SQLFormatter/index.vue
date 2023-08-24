<script setup>
import PageHeader from '../../components/Pageheader/index.vue'
import { ref, watch, reactive } from 'vue';
import { format } from 'sql-formatter';
import { dialectOptions, keywordCaseOptions, logicalOperatorNewlineOptions, indentStyleOptions } from '../../components/utils/SQLFormatterHelpers';
import { copyToClipboard } from '../../components/utils/UnixDateTimeFunctions';
// import MultiLineCopy from '../../components/CopyContainer/MultiLineCopy.vue';
import { identify } from 'sql-query-identifier';

const sqlPlaceholder = "select supplier_name,city from (select * from suppliers join addresses on suppliers.address_id = addresses.id) as suppliers where supplier_id > 500 order by supplier_name asc, city desc; "
const inputSQL = ref(sqlPlaceholder)
const error = ref(false)

const params = reactive({
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

const handleClick = (value) => {
    copyToClipboard(value)
}

const handleClear = () => {
    inputSQL.value = ""
    formattedSQL.value = ""
}

watch([inputSQL, params], () => {
    updateQuery()
})

const validateQuery = (inputSQL) => {
    try {
        formattedSQL.value = null
        identify(inputSQL)
        return true
    } catch (error) {
        return false
    }
}


const updateQuery = () => {
    if (!inputSQL.value) {
        error.value = false
        formattedSQL.value = null
        return
    }
    error.value = false
    const res = validateQuery(inputSQL.value)
    if (res) {
        formattedSQL.value = format(inputSQL.value, {
            tabWidth: params.tabWidth,
            useTabs: params.useTabs,
            denseOperators: params.denseOperators,
            language: params.language,
            newlineBeforeSemicolon: params.newlineBeforeSemicolon,
            keywordCase: params.keywordCase,
            indentStyle: params.indentStyle,
            logicalOperatorNewline: params.logicalOperatorNewline
        })
    } else {
        error.value = true
    }
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
                            <textarea v-model="inputSQL" autofocus type="text" class="form-control mono-font"
                                id="queryInput" style="height: 250px;" placeholder="Enter SQL query">
                        </textarea>
                            <label for="queryInput">Enter SQL Query</label>
                        </div>
                        <div class="p-2">
                            <strong>
                                Options
                            </strong>
                            <div class="d-flex inner_input_group mt-1">
                                <!-- tab spacing selector -->
                                <div class="inner_input_group">
                                    <div class="form-floating">
                                        <input type="number" v-model="params.tabWidth" id="indentSpacing"
                                            class="form-control" max="10" min="1">
                                        <label for="indentSpacing" class="form-label font-muted">Enter tab spacing</label>
                                    </div>

                                    <!-- <label for="indentSpacing font-muted">Enter tab spacing</label>
                                    <input type="number" v-model="params.tabWidth" id="indentSpacing"
                                        class="form form-control" max="10" min="1"> -->
                                </div>

                                <!-- dialect/language selector -->
                                <div class="form-floating">
                                    <select class="form-select" name="timezone-select" id="timezone-select"
                                        v-model="params.dialect">
                                        <option :value="dialectOptions[0]">{{ dialectOptions[0] }}</option>
                                        <option v-for="zone in dialectOptions.slice(1)" :value="zone" :key="zone">{{
                                            zone }}</option>
                                    </select>
                                    <label for="timezone-select">Language</label>
                                </div>
                                <!-- case selector -->
                                <div class="form-floating">
                                    <select class="form-select" name="timezone-select" id="timezone-select"
                                        v-model="params.keywordCase">
                                        <option :value="keywordCaseOptions[0]">{{ keywordCaseOptions[0] }}</option>
                                        <option v-for="zone in keywordCaseOptions.slice(1)" :value="zone" :key="zone">{{
                                            zone }}</option>
                                    </select>
                                    <label for="timezone-select">Case</label>
                                </div>
                                <!-- indent style selector -->
                                <div class="form-floating">
                                    <select class="form-select" name="timezone-select" id="timezone-select"
                                        v-model="params.indentStyle">
                                        <option :value="indentStyleOptions[0]">{{ indentStyleOptions[0] }}</option>
                                        <option v-for="zone in indentStyleOptions.slice(1)" :value="zone" :key="zone">{{
                                            zone }}</option>
                                    </select>
                                    <label for="timezone-select">Indentation style</label>
                                </div>

                                <!-- New Line logical operator -->
                                <div>
                                    <div class="form-floating">
                                        <select class="form-select" name="timezone-select" id="timezone-select"
                                            v-model="params.logicalOperatorNewline">
                                            <option :value="logicalOperatorNewlineOptions[0]">{{
                                                logicalOperatorNewlineOptions[0] }}</option>
                                            <option v-for="zone in logicalOperatorNewlineOptions.slice(1)" :value="zone"
                                                :key="zone">{{ zone }}</option>
                                        </select>
                                        <label for="timezone-select">AND/OR newlines</label>
                                    </div>
                                </div>

                                <!-- checkboxes -->
                                <div class="d-flex flex-row gap-4 justify-content-center w-100 flex-wrap">
                                    <div class="form-check form-switch toggler">
                                        <input @change="params.useTabs = !params.useTabs" class="form-check-input"
                                            role="switch" :checked="params.useTabs" type="checkbox" id="flexCheckChecked">
                                        <label class="form-check-label" for="flexCheckChecked">
                                            Use tabs
                                        </label>
                                    </div>
                                    <div class="form-check form-switch toggler">
                                        <input @change="params.newlineBeforeSemicolon = !params.newlineBeforeSemicolon"
                                            role="switch" class="form-check-input" :v-model="params.newlineBeforeSemicolon"
                                            :checked="params.newlineBeforeSemicolon" type="checkbox" id="newLine">
                                        <label class="form-check-label" for="newLine">
                                            New line before ;
                                        </label>
                                    </div>
                                    <div class="form-check form-switch toggler">
                                        <input @change="params.denseOperators = !params.denseOperators" role="switch"
                                            class="form-check-input" :v-model="params.denseOperators"
                                            :checked="params.denseOperators" type="checkbox" id="dense">
                                        <label class="form-check-label" for="dense">
                                            Dense operators
                                        </label>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="block card block2 ">
                <div class="d-flex flex-column overflow-hidden h-100 justify-content-between">
                    <div class="p-2 overflow-auto">
                        <div v-if="error">
                            <div class="alert alert-danger" role="alert">
                                Invalid SQL
                            </div>
                        </div>
                        <div v-if="formattedSQL">
                            <highlightjs :code=formattedSQL />
                        </div>
                        <!-- <MultiLineCopy title="Formatted SQL" :value="formattedSQL" height="500px" /> -->
                    </div>
                    <div class="d-flex gap-2 p-2">
                        <button class="btn btn-primary" type="button" @click="handleClick(formattedSQL)"
                            data-toggle="tooltip" data-placement="top" title="Copy to clipboard">
                            <i class="bi bi-clipboard"></i>
                        </button>
                        <button class="btn btn-danger" type="reset" @click="handleClear" data-toggle="tooltip"
                            data-placement="top" title="Clear text">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>


<style scoped src="./style.css" />