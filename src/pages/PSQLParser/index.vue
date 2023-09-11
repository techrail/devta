<script setup>
import PageHeader from '../../components/Pageheader/index.vue'
import { watchEffect, ref } from 'vue';
import { copyToClipboard } from '../../components/utils/UnixDateTime';

const postgresUrl = ref('postgres://myuser:mypassword@localhost:5432/mydatabase?sslmode=require');
const parsedData = ref(null);
const formattedData = ref({});  // To store formatted data for different platforms

const parsePostgresURL = (url) => {
    const regex = /^postgres:\/\/([^:@]+):([^@]+)@([^:\/]+)(?::(\d+))?\/([^?]+)(?:\?sslmode=(\w+))?$/;
    const match = url.match(regex);

    if (!match) {
        return null;
    }

    return {
        user: match[1],
        password: match[2],
        host: match[3],
        port: match[4] || 5432,
        database: match[5],
        sslmode: match[6] || null
    };
}

const formatToPHPDSN = (data) => {
    return `pgsql:host=${data.host};port=${data.port};dbname=${data.database};user=${data.user};password=${data.password}`;
}

const formatToNodeJSObject = (data) => {
    return {
        user: data.user,
        host: data.host,
        database: data.database,
        password: data.password,
        port: data.port
    };
}

const handleClear = () => {
    postgresUrl.value = ""
    parsedData.value = ""
    formattedData.value = {}
}

const formatToJavaJDBC = (data) => {
    let jdbc = `jdbc:postgresql://${data.host}:${data.port}/${data.database}?user=${data.user}&password=${data.password}`;
    if (data.sslmode) {
        jdbc += `&sslmode=${data.sslmode}`;
    }
    return jdbc;
}

watchEffect(() => {
    const parsed = parsePostgresURL(postgresUrl.value);
    parsedData.value = parsed;

    if (parsed) {
        formattedData.value = {
            phpDSN: formatToPHPDSN(parsed),
            nodeJS: formatToNodeJSObject(parsed),
            javaJDBC: formatToJavaJDBC(parsed)
        };
    }
});

const copyParsedData = () => {
    copyToClipboard(JSON.stringify(parsedData.value));
}

const convertBackToURL = () => {
    if (parsedData.value) {
        postgresUrl.value = formatPostgresURL(parsedData.value);
    }
}

const formatPostgresURL = (data) => {
    let url = 'postgres://';
    url += data.user;
    if (data.password) {
        url += ':' + data.password;
    }
    url += '@' + data.host;
    if (data.port && data.port !== 5432) {
        url += ':' + data.port;
    }
    url += '/' + data.database;
    if (data.sslmode) {
        url += '?sslmode=' + data.sslmode;
    }
    return url;
}
const formatterType = ref('phpDSN');

const copySpecificContent = (type) => {
    let dataToCopy = '';
    switch (type) {
        case 'phpDSN':
            dataToCopy = formattedData.value.phpDSN;
            break;
        case 'nodeJS':
            dataToCopy = JSON.stringify(formattedData.value.nodeJS, null, 2);
            break;
        case 'javaJDBC':
            dataToCopy = formattedData.value.javaJDBC;
            break;
    }
    if (dataToCopy) {
        copyToClipboard(dataToCopy);
    }
}


</script>



<template>
    <main class="p-0 m-0 w-100">
        <div class="w-100 mt-3">
            <PageHeader />
        </div>
        <div class="grid mt-1">
            <div class="block card block1">
                <div class="inner_block">
                    <div class="p-2">
                        <div class="form-floating">
                            <textarea v-model="postgresUrl" spellcheck="false" autofocus type="text" class="form-control"
                                id="postgresInput" style="height: 150px;" placeholder="Enter PostgreSQL URL"></textarea>
                            <label for="postgresInput">Enter PostgreSQL URL</label>
                        </div>
                    </div>
                </div>




            </div>
            <div class="block card block2">
                <div class="d-flex flex-column h-100 justify-content-between">
                    <div class="p-2 overflow-auto">
                        <div v-if="parsedData">
                            <strong>Parsed Data:</strong>
                            <ul>
                                <li>User: {{ parsedData.user }}</li>
                                <li>Password: {{ parsedData.password }}</li>
                                <li>Host: {{ parsedData.host }}</li>
                                <li>Port: {{ parsedData.port }}</li>
                                <li>Database: {{ parsedData.database }}</li>
                                <li>SSL Mode: {{ parsedData.sslmode }}</li>
                            </ul>
                        </div>

                        <div class="block card block2 overflow-auto">
                            <div class="input-group p-1" v-if="formattedData.phpDSN">
                                <span class="input-group-text">PHP PDO:</span>
                                <input type="text" class="form-control" :value="formattedData.phpDSN" disabled readonly>
                                <span class="input-group-text" @click="copySpecificContent('phpDSN')"><i
                                        class="bi bi-clipboard"></i></span>
                            </div>

                            <div class="input-group p-1" v-if="formattedData.nodeJS">
                                <span class="input-group-text">Node.js:</span>
                                <input type="text" class="form-control"
                                    :value="JSON.stringify(formattedData.nodeJS, null, 2)" disabled readonly>
                                <span class="input-group-text" @click="copySpecificContent('nodeJS')"><i
                                        class="bi bi-clipboard"></i></span>
                            </div>

                            <div class="input-group p-1" v-if="formattedData.javaJDBC">
                                <span class="input-group-text">Java JDBC:</span>
                                <input type="text" class="form-control" :value="formattedData.javaJDBC" disabled readonly>
                                <span class="input-group-text" @click="copySpecificContent('javaJDBC')"><i
                                        class="bi bi-clipboard"></i></span>
                            </div>
                        </div>


                    </div>
                    <div class="d-flex gap-2 p-2">
                        <button class="btn btn-primary" type="button" @click="copyParsedData" data-toggle="tooltip"
                            data-placement="top" title="Copy Parsed Data">
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

