<template>
    <div>
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>
                        {{ route.meta.title }}
                        <el-divider v-if="route.params.schoolId" direction="vertical" />
                        <span v-if="route.params.schoolId"> {{ }}</span>
                    </span>
                    <div>
                        <el-button v-if="routeName == 'TeacherList'" type="primary" link
                            @click="toAddTeacher">添加教师</el-button>
                        <el-button v-if="routeName !== 'TeacherList'" type="primary" link @click="goBack">返回</el-button>
                    </div>
                </div>
            </template>

            <RouterView :key="key" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute()
const routeName = route.name

const key = computed(() => {
    return route.path + Math.random();
});


const goBack = () => {
    router.push({
        name: <string>route.meta.parentName
    })
}

const toAddTeacher = () => {
    router.push({
        name: 'TeacherAdd'
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