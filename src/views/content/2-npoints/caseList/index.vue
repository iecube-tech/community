<template>
    <div>
        <el-tree :data="data" node-key="id" :expand-on-click-node="false" :render-content="renderContent"
            :props="{ label: 'name' }" />
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { GetAllCaseModules } from '@/apis/npoints/caseTree.js';

const data = ref({})

onBeforeMount(() => {
    GetAllCaseModules().then(res => {
        console.log(res)
        if (res.state == 200) {
            data.value = res.data
        }
    })
})
</script>
<style scoped></style>