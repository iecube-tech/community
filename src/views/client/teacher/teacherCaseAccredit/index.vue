<template>
    <el-transfer style="width: 600px; text-align: center;" v-model="value" :data="contents" :props="props"
        :titles="['未授权案例', '已授权案例']" />

    <div style="width: 600px; text-align: center; margin-top: 30px;">
        <el-button type="primary" @click="submit">确定</el-button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeMount } from 'vue';
import { All } from '@/apis/contents/all.js'
import { getContentByTeacher } from '@/apis/contents/getContentByTeacher.js'
import { useRoute } from 'vue-router';
import { CaseAccredit } from '@/apis/contents/accredit.js'
import { ElMessage } from 'element-plus';

const route = useRoute()

interface Option {
    id: number
    name: string
}

const contents = ref<Option[]>([])

const teacherContents = ref<Option[]>([])

const props = {
    key: 'id',
    label: 'name',
}
const value = ref([])

const caseAccreditQo = ref({
    teacherId: route.params.teacherId,
    contentIds: [],
})

const submit = async () => {
    caseAccreditQo.value.contentIds = value.value
    const data = Object.assign({}, caseAccreditQo.value)
    await CaseAccredit(data).then(res => {
        if (res.state == 200) {
            ElMessage({
                type: 'success',
                message: '操作成功',
            })
            // getContents();
            // getTeacherContents();
        } else {
            ElMessage.error('操作失败')
        }
    })
}

const getContents = async () => {
    await All().then(res => {
        if (res.state == 200) {
            console.log(res.data);
            contents.value = res.data
        }
    })
}

const getTeacherContents = async () => {
    await getContentByTeacher(route.params.teacherId).then(res => {
        if (res.state == 200) {
            teacherContents.value = res.data
            for (let i = 0; i < teacherContents.value.length; i++) {
                value.value.push(teacherContents.value[i].id)
            }
        }
    })
}


onBeforeMount(() => {
    getContents();
    getTeacherContents();
})


</script>
<style scoped></style>