<template>
    <div>
        <el-table :data="tableData" style="width: 100%" :border="true">
            <el-table-column type="index" label="序号" width="80" />
            <el-table-column prop="name" label="名称" width="300" />
            <el-table-column prop="suggestion" label="改进建议" />
            <el-table-column align="center" width="200">
                <template #header>
                    <el-button type="primary" link @click="handleEdit">添加</el-button>
                </template>
                <template #default="scope">
                    <el-button size="small" type="primary" :icon="Edit" link @click="handleEdit(scope.row)"></el-button>

                    <el-popconfirm width="220" confirm-button-text="确定" cancel-button-text="取消" :icon="InfoFilled"
                        icon-color="#33b8b9" title="确定删除该条目吗?" @confirm="confirmEvent(scope.row)">
                        <template #reference>
                            <el-button size="small" type="danger" :icon="Delete" link></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <el-dialog v-model="editDialog" title="编辑" width="70%">
        <div>
            <el-form ref="formRef" status-icon :model="tagTemplate" :rules="tagTemplateRules" label-width="120px">
                <el-form-item label="名称" prop="name">
                    <el-input placeholder="请输入名称" v-model="tagTemplate.name">
                    </el-input>
                </el-form-item>
                <el-form-item label="改进建议">
                    <el-input placeholder="改进建议" v-model="tagTemplate.suggestion">
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editDialog = false">取消</el-button>
                <el-button type="primary" @click="submit(formRef)">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onBeforeMount, ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ContentTaskTag } from '@/apis/tag/getTagTemplate.js';
import { ElMessage } from 'element-plus';
import { Edit, Delete, InfoFilled } from '@element-plus/icons-vue';
import { addTagTemplate } from '@/apis/tag/addTagTemplate.js';
import { deleteTagtemplate } from '@/apis/tag/deleteTagTemplate.js';
import { modifyTagTemplate } from '@/apis/tag/modifyTagTemplate.js';
const editDialog = ref(false)

const isModify = ref(false)

const route = useRoute()
const contentId = route.params.contentId
const taskNum = route.params.num
const tableData = ref()

const formRef = ref<FormInstance>()
const tagTemplate = reactive({
    id: null,
    name: '',
    suggestion: '',
    caseId: contentId,
    taskNum: taskNum,
})

const tagTemplateRules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入tag名称', trigger: 'blur' },
    ],
})

const confirmEvent = async (row) => {
    await deleteTagtemplate(row.id).then(res => {
        if (res.state == 200) {
            ElMessage({
                message: '删除成功',
                type: 'success',
            })
            getTaskTag()
        } else {
            ElMessage.error('删除失败：' + res.message)
        }
    })
}

const handleEdit = (row) => {
    editDialog.value = true
    if (row) {
        tagTemplate.id = row.id
        tagTemplate.name = row.name
        tagTemplate.suggestion = row.suggestion
        tagTemplate.caseId = row.caseId
        tagTemplate.taskNum = row.taskNum
        isModify.value = true
    }
}

const submit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            if (isModify) {
                modifyTagTemplates()
                isModify.value = false
            } else {
                addTagTemplates()
            }

        } else {
            console.log('error submit!', fields)
        }
    })
}

const addTagTemplates = async () => {
    const data = Object.assign({}, tagTemplate)
    await addTagTemplate(data).then(res => {
        if (res.state == 200) {
            ElMessage({
                message: '添加成功',
                type: 'success',
            })
            tagTemplate.name = ''
            tagTemplate.suggestion = ''
            editDialog.value = false
            getTaskTag()
        } else {
            ElMessage.error("添加失败：" + res.data)
        }
    })
}

const modifyTagTemplates = async () => {
    const data = Object.assign({}, tagTemplate)
    await modifyTagTemplate(data).then(res => {
        if (res.state == 200) {
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
            tagTemplate.name = ''
            tagTemplate.suggestion = ''
            editDialog.value = false
            getTaskTag()
        } else {
            ElMessage.error("修改失败：" + res.data)
        }
    })
}


const getTaskTag = async () => {
    await ContentTaskTag(contentId, taskNum).then(res => {
        if (res.state == 200) {
            tableData.value = res.data
            console.log(tableData)
        } else {
            ElMessage.error(res.ElMessage)
        }
    })
}

onBeforeMount(() => {
    getTaskTag()
})
</script>
<style scoped></style>