<template>
    <div>
        <el-table :data="teachers" style="width: 100%" stripe>
            <el-table-column prop="teacherName" label="姓名" />
            <el-table-column prop="teacherEmail" label="邮箱" />
            <el-table-column prop="schoolName" label="学校" />
            <el-table-column prop="collageName" label="学院" />
            <el-table-column label="案例授权">
                <template #default="scope">
                    <el-button size="small" @click="handleCaseAccredit(scope.$index, scope.row)" type="primary" link>
                        案例
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)" type="primary" link>编辑</el-button>
                    <el-button v-if="scope.row.isDelete == 0" size="small" type="danger"
                        @click="handleDisable(scope.$index, scope.row)" link>
                        禁用
                    </el-button>
                    <el-button v-else size="small" type="warning" @click="handleEnable(scope.$index, scope.row)" link>
                        启用
                    </el-button>
                </template>
            </el-table-column>

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

onBeforeMount(async () => {
    await teacherList().then(res => {
        if (res.state == 200) {
            teachers.value = res.data
            console.log(teachers)
        }
    })
})

const handleCaseAccredit = (index, row) => {
    router.push({
        name: 'TeacherCaseAccredit',
        params: { teacherId: row.teacherId }
    })
}

const handleEdit = (index, row) => {
    router.push({
        name: 'TeacherModify',
        params: { teacherId: row.teacherId }
    })
}

const handleDisable = (index, row) => {
    TeacherDisable(row.teacherId).then(res => {
        if (res.state == 200) {
            ElMessage({
                type: 'success',
                message: '操作成功',
            })
            row.isDelete = 1
        } else {
            ElMessage.error('操作失败')
        }
    })
}

const handleEnable = (index, row) => {
    TeacherEnable(row.teacherId).then(res => {
        if (res.state == 200) {
            ElMessage({
                type: 'success',
                message: '操作成功',
            })
            row.isDelete = 0
        } else {
            ElMessage.error('操作失败')
        }
    })
}
</script>
<style scoped></style>
