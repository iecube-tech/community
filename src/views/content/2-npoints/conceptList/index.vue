<template>
    <div style=" display: flex; flex-direction: row; flex-wrap: wrap; flex-grow: 1; justify-content: start;">
        <el-card v-for="i in concepts.length" :key="i" shadow="hover"
            style="width: 200px; margin-right: 10px; margin-bottom: 10px;">
            <div>
                <span>
                    {{ concepts[i - 1].name }}
                </span>
            </div>
        </el-card>

        <!-- <el-card shadow="hover" style="width: 200px; margin-right: 10px; margin-bottom: 10px;">
            <div style="display: flex; flex-direction: row; justify-content: center;">
                <el-icon class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </div>
        </el-card> -->
    </div>
    <el-divider />
    <div>
        <el-row style="display: flex; flex-direction: row; justify-content: start; margin-top: 30px; margin-bottom: 30px;">
            <span>添加基础概念</span>
        </el-row>
        <el-form ref="formRef" :model="conceptForm" label-width="100px" style="max-width: 460px">
            <el-form-item label="基础概念：" prop="name" :rules="[
                { required: true, message: '请输入内容' },
            ]">
                <el-input v-model="conceptForm.name"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" size="small" @click="submitForm(formRef)">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { GetAllConcepts } from '@/apis/npoints/allConcepts.js';
import { ElMessage } from 'element-plus';
import type { FormInstance } from 'element-plus'
import { AddConcept } from '@/apis/npoints/addConcept.js';

const formRef = ref<FormInstance>()
interface concept {
    id: number
    name: string
}

const conceptForm = ref<concept>({
    id: null,
    name: '',
})

const concepts = ref([])

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            AddConcept(Object.assign({}, conceptForm.value)).then(res => {
                if (res.state == 200) {
                    concepts.value = res.data
                    ElMessage({
                        type: 'success',
                        message: '添加成功'
                    })
                } else {
                    ElMessage.error(res.message)
                }
            })
            resetForm(formRef.value)
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

onBeforeMount(() => {
    GetAllConcepts().then(res => {
        if (res.state == 200) {
            concepts.value = res.data
        } else {
            ElMessage.error(res.error)
        }
    })
})
</script>
<style scoped>
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: auto;
    height: auto;
    text-align: center;
}
</style>
