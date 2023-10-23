<template>
    <div>
        <el-table :data="teachers" style="width: 100%" stripe @row-click="toTeacherProject">
            <el-table-column prop="teacherName" label="姓名" />
            <el-table-column prop="teacherEmail" label="邮箱" />
            <el-table-column prop="schoolName" label="学校" />
            <el-table-column prop="collageName" label="学院" />
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { teacherList } from '@/apis/teacher/teacherList.js'
import { ref } from 'vue';
import router from '@/router';
import { TeacherDisable } from '@/apis/teacher/disable.js'
import { TeacherEnable } from '@/apis/teacher/enable.js'
import { ElMessage } from 'element-plus';

const teachers = ref([])

const toTeacherProject = (row) => {
    router.push({
        name: 'AnalysisTeacherProjects',
        params: { teacherId: row.teacherId }
    })
}

onBeforeMount(async () => {
    await teacherList().then(res => {
        if (res.state == 200) {
            teachers.value = res.data
            console.log(teachers)
        }
    })
})

</script>
<style scoped></style>
