<template>
    <div>
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>
                        {{ '案例设计' }}
                        <el-divider direction="vertical" />
                        <span> {{ route.matched[route.matched.length - 2].meta.title }}</span>
                        <el-divider v-if="routeName != 'contentAdd'" direction="vertical" />
                        <span v-if="routeName != 'contentAdd'">{{ content.name }}</span>
                        <el-divider v-if="route.name != 'contentModulesList'" direction="vertical" />
                        <span v-if="route.name != 'contentModulesList'">{{ route.meta.title }}</span>
                    </span>
                    <div>
                        <el-button v-if="routeName == 'contentPoints'" type="primary" link>知识模块管理</el-button>
                        <el-divider v-if="routeName == 'contentPoints'" direction="vertical" />
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
import { getContent } from '@/apis/contents/getContentByid.js'

const route = useRoute();

const routeName = route.name
const contentId = ref(0)

const key = computed(() => {
    return route.path + Math.random();
});
const content = ref({
    name: ''
})
const goBack = () => {
    router.push({
        name: <string>route.meta.parentName,
        params: { contentId: <any>contentId }
    })
}


onBeforeMount(() => {
    if (route.params.contentId) {
        contentId.value = <any>route.params.contentId
        getContent(contentId.value).then(res => {
            if (res.state == 200) {
                content.value = res.data
            }
        })
    }
})
</script>
<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
