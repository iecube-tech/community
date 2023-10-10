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
                        <!-- <el-button type="primary" link @click="">基础概念管理</el-button> -->
                        <el-button v-if="routeName !== 'contentList'" type="primary" link @click="goBack">返回</el-button>
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

onBeforeMount(() => {

})
</script>
<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>