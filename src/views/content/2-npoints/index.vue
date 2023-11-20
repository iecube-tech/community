<template>
    <div>
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>
                        {{ route.meta.title }}
                        <el-divider v-if="route.params.contentId" direction="vertical" />
                        <el-divider v-if="route.name == 'addTagTemplates'" direction="vertical" />
                        <span v-if="route.name == 'addTagTemplates'"> 任务{{ route.params.num }}</span>
                    </span>
                    <div>
                        <!-- <el-button v-if="routeName == 'npointModuleList'" type="primary" link
                            @click="toAdd()">添加</el-button>
                        <el-divider v-if="routeName == 'npointModuleList'" direction="vertical" /> -->
                        <el-button v-if="routeName !== 'npointModuleList'" type="primary" link
                            @click="toNodules()">功能模块管理</el-button>
                        <el-button v-if="routeName !== 'npointConcepteList'" type="primary" link
                            @click="toConcepts()">基础概念管理</el-button>
                        <el-button v-if="routeName !== 'npointsCaseList'" type="primary" link @click="goBack">返回</el-button>
                    </div>
                </div>
            </template>
            <RouterView :key="key" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { useRoute } from 'vue-router';
import { computed, onBeforeMount, ref } from 'vue';
import { GetAllCases } from '@/apis/npoints/allCases.js';
import { GetAllConcepts } from '@/apis/npoints/allConcepts.js';
import { GetAllModules } from '@/apis/npoints/allModules.js';

const route = useRoute();

const routeName = route.name

const key = computed(() => {
    return route.path + Math.random();
});

const goBack = () => {
    router.push({
        name: <string>route.meta.parentName
    })
}

const toNodules = () => {
    router.push({
        name: 'npointModuleList'
    })
}

const toConcepts = () => {
    router.push({
        name: 'npointConcepteList'
    })
}

const toAdd = () => {
    if (routeName == 'npointModuleList') {
        router.push({
            name: 'npointModuleEdit',
            params: { moduleId: 0 }
        })
    }
    if (routeName == 'npointConcepteList') {

    }
}

onBeforeMount(() => {
    GetAllConcepts().then(res => {
        console.log(res)
    })

    GetAllModules().then(res => {
        console.log(res)
    })

    GetAllCases().then(res => {
        console.log(res)
    })

})
</script>
<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
