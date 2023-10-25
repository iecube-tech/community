<template>
    <div>
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>
                        {{ route.meta.title }}
                    </span>
                    <div>
                        <!-- <el-button v-if="routeName == 'contentCheckDetail'" type="warning" link>不通过</el-button> -->
                        <el-button v-if="routeName == 'contentCheckDetail'" type="warning" link
                            @click="check()">通过</el-button>
                        <el-divider v-if="routeName == 'contentCheckDetail'" direction="vertical" />
                        <el-button type="primary" link @click="goBack">返回</el-button>
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
import { Check } from '@/apis/contents/check.js';
import { ElMessage } from 'element-plus';

const route = useRoute();
const routeName = route.name
const contentId = route.params.contentId


const key = computed(() => {
    return route.path + Math.random();
});
const content = ref({
    name: ''
})
const goBack = () => {
    router.push({
        name: <string>route.meta.parentName,
    })
}

const check = () => {
    Check(contentId).then(res => {
        if (res.state == 200) {
            ElMessage({
                type: 'success',
                message: '审核通过',
            })
            router.push({
                name: <any>route.meta.parentName
            })
        } else {
            ElMessage.error("res.error")
        }
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
