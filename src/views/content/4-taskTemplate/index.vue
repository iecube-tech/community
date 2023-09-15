<template>
    <div>
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>
                        {{ route.meta.title }}
                        <el-divider v-if="route.params.contentId" direction="vertical" />
                        <span v-if="route.params.contentId"> {{ content }}</span>
                        <el-divider v-if="route.name == 'addTagTemplates'" direction="vertical" />
                        <span v-if="route.name == 'addTagTemplates'"> 任务{{ route.params.num }}</span>

                    </span>
                    <div>
                        <el-button v-if="routeName === 'taskList'" type="primary" link @click="toADD">添加任务</el-button>
                        <el-button v-if="routeName !== 'contentList'" type="primary" link @click="goBack">返回</el-button>
                    </div>
                </div>
            </template>
            <RouterView :key="key" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getContent } from '@/apis/contents/getContentByid.js'
import { computed, ref } from 'vue';
import router from '@/router';
const route = useRoute()
const routeName = route.name
const content = ref()

const key = computed(() => {
    return route.path + Math.random();
});


if (route.params.contentId) {
    getContent(route.params.contentId).then(res => {
        if (res.state == 200) {
            content.value = res.data.name
            console.log(content)
        }
    })
}


const goBack = () => {
    router.push({
        name: <string>route.meta.parentName
    })
}

const toADD = () => {
    router.push({
        name: 'addTaskTemplates',
        params: { contentId: route.params.contentId }
    })
}

</script>
<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>