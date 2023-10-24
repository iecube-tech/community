<template>
    <div id="pane-fiveth" class="pane" key="4">
        <div style="margin: 30px 0px;">
            <span>本节需要完善该案例的任务模版</span>
        </div>
        <div style="margin: 30px 0px;">
            <el-table :data="caseTaskTemplates" :border="true" style="width: 100%">
                <el-table-column prop="num" label="任务序号" width="60px" />
                <el-table-column prop="taskName" label="任务名称" />
                <el-table-column label="任务要求">
                    <template #default="scope">
                        <ol>
                            <li v-for="i in scope.row.requirementList.length" :key="i">
                                {{ scope.row.requirementList[i - 1].name }}
                            </li>
                        </ol>
                    </template>
                </el-table-column>
                <el-table-column label="任务交付物要求">
                    <template #default="scope">
                        <ol>
                            <li v-for="i in scope.row.deliverableRequirementList.length" :key="i">
                                {{ scope.row.deliverableRequirementList[i - 1].name }}
                            </li>
                        </ol>
                    </template>
                </el-table-column>
                <el-table-column label="任务参考链接">
                    <template #default="scope">
                        <ol>
                            <li v-for="i in scope.row.referenceLinkList.length" :key="i">
                                {{ scope.row.referenceLinkList[i - 1].name + "：" +
                                    scope.row.referenceLinkList[i - 1].url }}
                            </li>
                        </ol>
                    </template>
                </el-table-column>
                <el-table-column label="任务参考资料">
                    <template #default="scope">
                        <div>
                            <ol>
                                <li v-for="i in scope.row.referenceFileList.length" :key="i">
                                    {{ scope.row.referenceFileList[i - 1].originFilename }}
                                </li>
                            </ol>
                        </div>
                        <div style="display:flex; justify-content:center">
                            <el-upload class="upload-demo"
                                :action="'/dev-api/task_template/task_template_add_resource/' + CaseId + '/' + scope.row.id"
                                :on-success="uploadFileSuccess" :show-file-list="false">
                                <el-button type="primary" size="small">上传</el-button>
                            </el-upload>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" width="100px">
                    <template #default="scope">
                        <el-popconfirm title="确定删除吗?" @confirm="deleteCaseTaskTemplateSubmit(scope.row.id)">
                            <template #reference>
                                <el-button link type="danger" size="small" :icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="margin: 30px 0px;">
            <el-card style="min-height:280px;" shadow="never">
                <template #header>
                    <div>
                        <span>添加任务</span>
                    </div>
                </template>
                <div>
                    <el-form label-width="160px" ref="addTaskFormRef" :model="newTaskForm" :rules="taskFormRules">
                        <el-form-item label="任务名称：" prop="taskName">
                            <el-input style="max-width: 400px; margin-right: 20px;" v-model="newTaskForm.taskName"
                                placeholder="请输入任务名称">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="任务序号：" prop="num">
                            <el-input-number :min="1" :max="10" v-model="newTaskForm.num"></el-input-number>
                        </el-form-item>
                        <el-form-item label="任务要求：" prop="requirementList">
                            <div v-if="newTaskForm.requirementList.length > 0">
                                <el-tag closable v-for="i in newTaskForm.requirementList.length" :key="i" class="mx-1"
                                    @close="removeRequirement(i - 1)">
                                    {{ newTaskForm.requirementList[i - 1].name }}
                                </el-tag>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-input style="max-width: 400px; margin-right: 20px;" v-model="requirement"
                                placeholder="请分条输入任务要求，每一条完成后点击右侧保存">
                            </el-input>
                            <el-button type="primary" circle size="small" :icon="Check"
                                @click="addRequirement()"></el-button>
                        </el-form-item>
                        <el-form-item label="任务交付物要求：" prop="deliverableRequirementList">
                            <div v-if="newTaskForm.deliverableRequirementList.length > 0">
                                <el-tag closable v-for="i in newTaskForm.deliverableRequirementList.length" class="mx-1"
                                    :key="i" @close="removeDeliverableRequirement(i - 1)">
                                    {{ newTaskForm.deliverableRequirementList[i - 1].name }}
                                </el-tag>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-input style="max-width: 400px; margin-right: 20px;" v-model="deliverableRequirement"
                                placeholder="请分条输入任务交付物要求，每一条完成后点击右侧保存">
                            </el-input>
                            <el-button type="primary" circle size="small" :icon="Check"
                                @click="addDeliverableRequirement()"></el-button>
                        </el-form-item>

                        <el-form-item label="任务参考链接：" prop="referenceLinkList">
                            <div v-if="newTaskForm.referenceLinkList.length > 0">
                                <el-tag closable v-for="i in newTaskForm.referenceLinkList.length" class="mx-1" :key="i"
                                    @close="removeReferenceLink(i - 1)">
                                    {{ newTaskForm.referenceLinkList[i - 1].name + '：' +
                                        newTaskForm.referenceLinkList[i - 1].url }}
                                </el-tag>
                            </div>
                        </el-form-item>

                        <div style="margin-left: 160px;">
                            <el-form label-width="80px" ref="addReferenceLinkRef" :model="newReferenceLinkForm"
                                :rules="newReferenceLinkFormRules">
                                <el-form-item label="名称：" prop="name">
                                    <el-input style="max-width: 320px; margin-right: 20px;"
                                        v-model="newReferenceLinkForm.name" placeholder="请分条输入任务参考链接的名称和URL">
                                    </el-input>
                                </el-form-item>

                                <el-form-item label="url：" prop="url">
                                    <el-input style="max-width: 320px; margin-right: 20px;"
                                        v-model="newReferenceLinkForm.url" placeholder="输入完成点击右侧保存">
                                    </el-input>
                                    <el-button type="primary" circle size="small" :icon="Check"
                                        @click="addReferenceLinkSubmit(addReferenceLinkRef)"></el-button>
                                </el-form-item>
                            </el-form>
                        </div>


                        <el-form-item style="margin-top: 50px;">
                            <el-button type="primary" size="small"
                                @click="addTaskTemplateSubmit(addTaskFormRef)">添加任务</el-button>
                            <el-button size="small" @click="newTaskFormReset()">清除内容</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
        <el-row class="bottom-row">
            <!-- <el-button @click="">上一步</el-button> -->
            <el-button type="primary" @click="addTaskTemplateNext()">完成</el-button>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import router from '@/router';
import { onBeforeMount, ref, reactive, onMounted, shallowRef, onBeforeUnmount } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { Delete, Check } from '@element-plus/icons-vue';
import type { UploadProps } from 'element-plus';
import { addTaskTemplate } from "@/apis/contents/teacherContent/addTaskTemplates.js";
import { contentTaskTemplates } from "@/apis/contents/teacherContent/getTaskTemplates.js";
import { deleteTaskTemplate } from "@/apis/contents/teacherContent/deletTaskTemplates.js";
import { updateCaseTaskTemplate } from "@/apis/contents/teacherContent/updateCaseTaskTemplate.js";

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
}
const contentFormRef = ref<FormInstance>()
const contentForm = ref<content>({
    id: 0,
    name: '',
    introduction: '',
    introduce: '',
    target: '',
    cover: '',
    completion: 0,
    guidance: ''
})

interface Requirement {
    id: number
    name: string
}
interface DeliverableRequirement {
    id: number
    name: string
}
interface ReferenceLink {
    id: number
    name: string
    url: string
}
interface Resource {
    id: number
    name: string
    filename: string
    originFilename: string
    type: string
}

interface taskTemplate {
    id: number
    contentId: number
    num: number
    taskName: string
    taskCover: string
    requirementList: Array<Requirement>
    deliverableRequirementList: Array<DeliverableRequirement>
    referenceLinkList: Array<ReferenceLink>
    referenceFileList: Array<Resource>
}

const caseTaskTemplates = ref<Array<taskTemplate>>([])

const addReferenceLinkRef = ref<FormInstance>()
const newReferenceLinkForm = ref<ReferenceLink>({
    id: 0,
    name: '',
    url: '',
})
const newReferenceLinkFormRules = reactive<FormRules<ReferenceLink>>({
    name: [{ required: true, message: '请输入参考链接名称', trigger: 'blur' }],
    url: [{ required: true, message: '请输入参考链接URL', trigger: 'blur' }],

})

const addReferenceLinkSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            let newReferenceLink = Object.assign({}, newReferenceLinkForm.value)
            newTaskForm.value.referenceLinkList.push(newReferenceLink)
            newReferenceLinkForm.value.name = ''
            newReferenceLinkForm.value.url = ''
            console.log(newTaskForm.value)
        } else {
            console.log('error submit!', fields)
        }
    })
}
const removeReferenceLink = (index) => {
    newTaskForm.value.referenceLinkList.splice(index, 1)
}

const requirement = ref('')
const addRequirement = () => {
    if (requirement.value != '') {
        let newRequirement = ref<Requirement>({
            id: 0,
            name: requirement.value
        })
        if (newTaskForm.value.requirementList.length > 0 && newTaskForm.value.requirementList[0] == null) {
            newTaskForm.value.requirementList[0] = newRequirement.value
        } else {
            newTaskForm.value.requirementList.push(newRequirement.value)
        }
        requirement.value = ''
    }
    console.log(newTaskForm.value)
}

const removeRequirement = (index) => {
    newTaskForm.value.requirementList.splice(index, 1)
}
const deliverableRequirement = ref('')

const addDeliverableRequirement = () => {
    if (deliverableRequirement.value != '') {
        let newDeliverableRequirement = ref<DeliverableRequirement>({
            id: 0,
            name: deliverableRequirement.value
        })
        if (newTaskForm.value.deliverableRequirementList.length > 0 && newTaskForm.value.deliverableRequirementList[0] == null) {
            newTaskForm.value.deliverableRequirementList[0] = newDeliverableRequirement.value
        } else {
            newTaskForm.value.deliverableRequirementList.push(newDeliverableRequirement.value)
        }
        deliverableRequirement.value = ''
    }
    console.log(newTaskForm.value)
}
const removeDeliverableRequirement = (index) => {
    newTaskForm.value.deliverableRequirementList.splice(index, 1)
}

const addTaskFormRef = ref<FormInstance>()
const newTaskForm = ref<taskTemplate>({
    id: 0,
    contentId: CaseId.value,
    num: 0,
    taskName: '',
    taskCover: '',
    requirementList: [],
    deliverableRequirementList: [],
    referenceLinkList: [],
    referenceFileList: [],
})

const taskFormRules = reactive<FormRules<taskTemplate>>({
    taskName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
    num: [{ required: true, message: '请输入任务序号', trigger: 'blur' }],
    requirementList: [{
        required: true,
        validator: function (rule, value, callback) {
            if (value[0].point == '') {
                callback(new Error('没有任务要求'));
            } else {
                callback()
            }
        }, trigger: 'change'
    }],
    deliverableRequirementList: [{
        required: true,
        validator: function (rule, value, callback) {
            if (value[0].point == '') {
                callback(new Error('没有任务交付物要求'));
            } else {
                callback()
            }
        }, trigger: 'change'
    }]
})

const addTaskTemplateSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            if (caseTaskTemplates.value.length >= 5) {
                ElMessage.warning("当前最多支持5个任务")
                return
            }
            newTaskForm.value.contentId = CaseId.value
            console.log(newTaskForm.value)
            let data = Object.assign({}, newTaskForm.value)
            addTaskTemplate(data).then(res => {
                if (res.state == 200) {
                    caseTaskTemplates.value = res.data
                    ElMessage({
                        type: 'success',
                        message: '添加成功'
                    })
                    newTaskFormReset()
                } else {
                    ElMessage.error(res.message)
                }
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}

const newTaskFormReset = () => {
    newTaskForm.value.taskName = ''
    newTaskForm.value.num = 0
    newTaskForm.value.taskCover = ''
    newTaskForm.value.deliverableRequirementList = []
    newTaskForm.value.requirementList = []
    newTaskForm.value.referenceLinkList = []
}

const uploadFileSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    if (response.state == 200) {
        caseTaskTemplates.value = response.data
        ElMessage({
            type: 'success',
            message: '上传成功'
        })
    }
}

const deleteCaseTaskTemplateSubmit = (taskTemplateId) => {
    deleteTaskTemplate(CaseId.value, taskTemplateId).then(res => {
        if (res.state == 200) {
            caseTaskTemplates.value = res.data
            ElMessage({
                type: 'success',
                message: '删除成功'
            })
        } else {
            ElMessage.error(res.message)
        }
    })
}

const addTaskTemplateNext = () => {
    updateCaseTaskTemplate(CaseId.value).then(res => {
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

const goback = () => {
    router.push({
        name: <any>route.meta.parentName,
        params: { contentId: CaseId.value }
    })
}

const getCaseTaskTemplates = (id) => {
    contentTaskTemplates(id).then(res => {
        if (res.state == 200) {
            caseTaskTemplates.value = res.data
        } else {
            ElMessage.error("获取案例任务列表异常")
        }
    })
}

onBeforeMount(() => {
    CaseId.value = <any>route.params.contentId
    getCaseTaskTemplates(CaseId.value)
})
</script>
<style scoped>
.bottom-row {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}
</style>

