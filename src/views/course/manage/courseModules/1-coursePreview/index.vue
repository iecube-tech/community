<template>
    <div id="pane-first" class="pane" key="0">
        <el-form ref="contentFormRef" :model="contentForm" :rules="contentFormRules" label-width="120px"
            class="contentForm">
            <el-form-item label="案例名称" prop="name">
                <el-input v-model="contentForm.name" />
            </el-form-item>
            <el-form-item label="案例简介" prop="introduction">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" v-model="contentForm.introduction" />
            </el-form-item>
            <el-form-item label="案例介绍" prop="introduce">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" v-model="contentForm.introduce" />
            </el-form-item>
            <el-form-item label="案例目标" prop="target">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" v-model="contentForm.target" />
            </el-form-item>
        </el-form>

        <el-row class="bottom-row">
            <el-button type="primary" @click="submitForm(contentFormRef)">完成</el-button>
        </el-row>


    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { useRoute } from 'vue-router';

import { onBeforeMount, ref, reactive, onMounted, shallowRef, onBeforeUnmount } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'

import { Add } from "@/apis/contents/createContent/add.js";
import { UpdateContent } from "@/apis/contents/teacherContent/updateContent.js";
import { getContent } from "@/apis/contents/getContentByid.js";
const route = useRoute()

const CaseId = ref(0)
interface content {
    id: number
    name: string
    introduction: string   //简介
    introduce: string //项目案例介绍
    target: string //项目终极目标
    cover: string
    completion: number
    guidance: string
    third: number
}
const contentFormRef = ref<FormInstance>()
const contentForm = ref<content>({
    id: null,
    name: '',
    introduction: '',
    introduce: '',
    target: '',
    cover: '',
    completion: null,
    guidance: '',
    third: 1
})

const contentFormRules = reactive<FormRules<content>>({
    name: [{ required: true, message: '请输入案例名称', trigger: 'blur' }],
    introduction: [{ required: true, message: '请输入案例简介', trigger: 'blur' }],
    introduce: [{ required: true, message: '请输入案例详细介绍', trigger: 'blur' }],
    target: [{ required: true, message: '请输入案例目标', trigger: 'blur' }]
})
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid, fields) => {
        if (valid) {
            //提交请求
            if (CaseId.value == 0) {
                // 新增
                Add(Object.assign({}, contentForm.value)).then(res => {
                    console.log(res)
                    if (res.state == 200) {
                        CaseId.value = res.data
                        contentForm.value.id = res.data
                        ElMessage({
                            type: 'success',
                            message: '案例创建成功',
                        })
                        router.push({
                            name: 'contentModulesList',
                            params: { contentId: CaseId.value }
                        })
                    } else {
                        ElMessage.error(res.message)
                    }
                })
            } else {
                contentForm.value.id = CaseId.value
                let data = Object.assign({}, contentForm.value)
                console.log(data)
                UpdateContent(data).then(res => {
                    if (res.state == 200) {
                        contentForm.value = res.data
                        ElMessage({
                            type: 'success',
                            message: '更新成功'
                        })
                        goback();
                    } else {
                        ElMessage.error(res.message)
                    }
                })
            }
        } else {
            return
        }
    })
}

const toCover = () => {
    router.push({
        name: 'contentSetCover',
        params: { contentId: <any>CaseId.value }
    })
}
const goback = () => {
    router.push({
        name: <any>route.meta.parentName,
        params: { contentId: CaseId.value }
    })
}

const getConten = (id) => {
    getContent(id).then(res => {
        if (res.state == 200) {
            contentForm.value = res.data
        } else {
            ElMessage.error(res.message)
        }
    })
}
onBeforeMount(() => {
    console.log(route.params.contentId)
    if (route.params.contentId) {
        CaseId.value = <any>route.params.contentId
        getConten(CaseId.value)
    }
})
</script>
<style scoped>
.bottom-row {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}
</style>
