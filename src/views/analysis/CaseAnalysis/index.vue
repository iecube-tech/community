<template>
    <div>
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>
                        {{ route.meta.title }}
                        <el-divider v-if="route.params.contentId" direction="vertical" />
                        <span v-if="route.params.contentId"> {{ content }}</span>
                    </span>
                    <div>
                        <el-button v-if="routeName !== 'CaseDataAnalysisList'" type="primary" link
                            @click="goBack">返回</el-button>
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
const content = ref('')

if (route.params.contentId) {
    getContent(route.params.contentId).then(res => {
        if (res.state == 200) {
            content.value = res.data.name
            console.log(content)
        }
    })
}
const key = computed(() => {
    return route.path + Math.random();
});

const goBack = () => {
    router.push({
        name: <string>route.meta.parentName
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
