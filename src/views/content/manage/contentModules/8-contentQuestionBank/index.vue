<template>
    <div>
        <el-row style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
            <el-select v-model="taskTemplateId" placeholder="请选择任务/实验" @change="taskTemplateIdChanged">
                <el-option v-for="item in taskTemplates" :key="item.id" :value="item.id"
                    :label="item.num + '：' + item.taskName"></el-option>
            </el-select>

            <div>
                <el-button v-if="taskTemplateId" link type="primary" @click="addQestionDialog = true">添加题目</el-button>
                <el-button v-if="questionVoList.length > 0" link type="primary" @click="allDisabled = !allDisabled"><span
                        v-if="allDisabled == false">修改答案</span><span v-else>修改完成</span></el-button>
            </div>
        </el-row>
        <div>
            <el-table :data="questionVoList">
                <el-table-column prop="name" label="题目">
                </el-table-column>

                <el-table-column prop="solve" label="解析">
                </el-table-column>

                <el-table-column label="选项">
                    <template #default="scoped">
                        <div style="display: flex; align-items: center;" v-for="i in scoped.row.solutions.length">
                            <!-- <el-checkbox v-model="scoped.row.solutions[i - 1].isSolution"
                                :label="scoped.row.solutions[i - 1].name"
                                @change="changeIsSolution(scoped.row.solutions[i - 1])" :disabled="allDisabled" /> -->

                            <span v-if="scoped.row.solutions[i - 1].isSolution" style="color:var(--el-color-primary)">{{
                                scoped.row.solutions[i - 1].name }}</span>
                            <span v-else>{{ scoped.row.solutions[i - 1].name }}</span>

                            <el-button v-if="allDisabled" type="success" :icon="EditPen" link style="margin-left: 10px;"
                                @click="updateThisSolution(scoped.$index, i - 1)"></el-button>

                            <el-popconfirm v-if="allDisabled" title="确定删除该选项？" confirm-button-text="确认"
                                cancel-button-text="取消" @confirm="DeleteSolution(scoped.$index, i - 1)">
                                <template #reference>
                                    <el-button type="danger" :icon="Close" link></el-button>
                                </template>
                            </el-popconfirm>

                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="120">
                    <template #default="scoped">
                        <el-button type="primary" link :icon="Edit" @click="editQ(scoped.row)"></el-button>

                        <el-button type="primary" :icon="Plus" link @click="addSolutionToThisQuestion(scoped.$index)">
                        </el-button>

                        <el-popconfirm title="确定删除该题目？" confirm-button-text="确认" cancel-button-text="取消"
                            @confirm="DeleteQ(scoped.$index)">
                            <template #reference>
                                <el-button type="danger" link :icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>

    <el-dialog v-model="addQestionDialog" title="添加题目">
        <el-form :model="questionVo" ref="ruleFormRef" :rules="rules" label-width="120px">
            <el-form-item label="题目：" prop="name">
                <el-input v-model="questionVo.name" type="textarea" :rows="2" />
            </el-form-item>
            <el-form-item label="题目解析：">
                <el-input v-model="questionVo.solve" type="textarea" :rows="2" />
            </el-form-item>
            <el-form-item label="题目选项：" prop="solutions">
                <div>
                    <div v-for="i in questionVo.solutions.length"
                        style="margin-right: 20px; display: flex; align-items: center;">
                        <el-checkbox v-model="questionVo.solutions[i - 1].isSolution"
                            :label="questionVo.solutions[i - 1].name" />
                        <el-button :icon="Delete" link type="danger"
                            @click="questionVo.solutions.splice(i - 1, 1)"></el-button>
                    </div>

                    <span v-if="questionVo.solutions.length > 0" type="warning">Tip：“勾选选项代表该选项为一正确选项”</span>
                </div>
            </el-form-item>

            <el-form-item label="添加选项：">
                <div>
                    <el-row style="display: flex; align-items: center;">
                        <el-input v-model="solution.name" type="textarea" :rows="1"
                            style="width: 400px;margin-right: 20px;">
                        </el-input>
                        <el-button type="primary" size="small" @click="addSolution">添加</el-button>
                        <el-button type="primary" size="small" @click="addTrueOrFalse">添加对/错选项</el-button>
                    </el-row>
                    <el-row style="margin-top: 20px;">

                    </el-row>
                </div>

            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addQestionDialog = false">取消</el-button>
                <el-button type="primary" @click="submitAddQuestionVo(ruleFormRef)">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>


    <el-dialog v-model="editQestionDialog" title="编辑题目">
        <el-form :model="editQuestionVo" ref="ruleFormRef" :rules="rules" label-width="120px">
            <el-form-item label="题目：" prop="name">
                <el-input v-model="editQuestionVo.name" type="textarea" :rows="2" />
            </el-form-item>
            <el-form-item label="题目解析：">
                <el-input v-model="editQuestionVo.solve" type="textarea" :rows="2" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editQestionDialog = false">取消</el-button>
                <el-button type="primary" @click="submitEditQuestionVo(ruleFormRef)">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>


    <el-dialog v-model="editSolutionDialog" title="编辑选项">
        <el-form :model="editSolution" label-width="120px">
            <el-form-item label="选项：">
                <el-input v-model="editSolution.name" type="textarea" :rows="1" />
            </el-form-item>

            <el-form-item label="是否答案：">
                <el-checkbox v-model="editSolution.isSolution" :label="editSolution.name" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editSolutionDialog = false">取消</el-button>
                <el-button type="primary" @click="submitUpdateSolution()">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>


    <el-dialog v-model="addSolutionDialog" title="添加选项">
        <el-form :model="addSolutionTo" label-width="120px">
            <el-form-item label="选项：">
                <el-input v-model="addSolutionTo.name" type="textarea" :rows="1" />
            </el-form-item>

            <el-form-item label="是否答案：">
                <el-checkbox v-model="addSolutionTo.isSolution" :label="addSolutionTo.name" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addSolutionDialog = false">取消</el-button>
                <el-button type="primary" @click="submitAddSolution()">
                    提交
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { Delete, Edit, Plus, Close, EditPen } from '@element-plus/icons-vue'

import { contentTaskTemplates } from '@/apis/content/teacherContent/getTaskTemplates.js';
import { getQuestionList } from '@/apis/questionBank/getQuestionList.js';
import { addQuestionVo } from '@/apis/questionBank/addQuestionVo.js';
import { updateSolution } from '@/apis/questionBank/updateSolution.js';
import { updateQuestionVo } from '@/apis/questionBank/updateQustionVo.js';
import { deleteSolution } from '@/apis/questionBank/deleteSolution.js';
import { deleteQuestion } from '@/apis/questionBank/deleteQuestion.js';
import { addSolutionToQuestion } from '@/apis/questionBank/addSolution.js';
interface taskTemplate {
    id: number
    num: number
    taskName: string
}

interface question {
    id: number
    taskTemplateId: number
    name: string
    solve: string
    difficulty: number
}

interface solution {
    id: number
    questionId: number
    name: string
    isSolution: number
}

interface questionVo {
    id: number
    taskTemplateId: number
    name: string
    solve: string
    difficulty: number
    solutions: Array<solution>
}

const route = useRoute();
const caseId = <any>route.params.caseId

const addQestionDialog = ref(false)
const editQestionDialog = ref(false)
const editSolutionDialog = ref(false)
const addSolutionDialog = ref(false)
const allDisabled = ref(false)

const taskTemplateId = ref<number>(undefined)

const taskTemplateIdChanged = () => {
    getQuestionList(taskTemplateId.value).then(res => {
        if (res.state == 200) {
            questionVoList.value = res.data
        }
    })
}

const taskTemplates = ref<Array<taskTemplate>>([])

const questionVoList = ref([])

const ruleFormRef = ref<FormInstance>()

const questionVo = ref<questionVo>({
    id: null,
    taskTemplateId: taskTemplateId.value,
    name: '',
    solve: '',
    difficulty: null,
    solutions: []
})

const solution = ref<solution>({
    id: undefined,
    questionId: undefined,
    name: '',
    isSolution: 0
})

const editSolution = ref<solution>({
    id: undefined,
    questionId: undefined,
    name: '',
    isSolution: 0
})

const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入题目', trigger: 'blur' },
    ],
    solutions: [
        {
            required: true,
            validator: function (rule, value, callback) {
                if (value.length > 1) {
                    let solve = 0
                    for (let i = 0; i < value.length; i++) {
                        if (value[i].isSolution) {
                            solve += 1
                        }
                    }
                    if (solve > 0) {
                        callback();
                    } else {
                        callback(new Error('至少保证有一正确选项'))
                    }
                } else {
                    callback(new Error('至少保证有两选项'))
                }
            }, trigger: 'blur'
        }
    ]
})


const editQuestionVo = ref<questionVo | null>(null)

const editQ = (row) => {
    console.log(row)
    editQuestionVo.value = row
    editQestionDialog.value = true
}

const DeleteQ = (index) => {
    deleteQuestion(questionVoList.value[index].id).then(res => {
        if (res.state == 200) {
            questionVoList.value.splice(index, 1)
        }
        else {
            ElMessage.error(res.message)
        }
    })

}

const DeleteSolution = (index, index2) => {
    console.log(index, index2)
    console.log()
    deleteSolution(questionVoList.value[index].solutions[index2].id).then(res => {
        if (res.state == 200) {
            questionVoList.value[index].solutions.splice(index2, 1)
        } else {
            ElMessage.error(res.message)
        }
    })
}

const submitEditQuestionVo = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            updateQuestionVo(editQuestionVo.value).then(res => {
                if (res.state == 200) {
                    questionVoList.value = res.data
                    editQestionDialog.value = false
                } else {
                    ElMessage.error(res.message)
                }
            })
        } else {
            // ElMessage.error("表单校验未通过")
        }
    })
}

const addSolution = () => {
    if (solution.value.name == '') {
        return
    }
    questionVo.value.solutions.push(Object.assign({}, solution.value))
    solution.value.name = ''
}

const addTrueOrFalse = () => {
    let dui = {
        id: undefined,
        questionId: undefined,
        name: '对',
        isSolution: 0
    }

    let cuo = {
        id: undefined,
        questionId: undefined,
        name: '错',
        isSolution: 0
    }
    questionVo.value.solutions.push(Object.assign({}, dui))
    questionVo.value.solutions.push(Object.assign({}, cuo))
}

const submitAddQuestionVo = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            questionVo.value.taskTemplateId = taskTemplateId.value
            console.log(questionVo.value)
            addQuestionVo(questionVo.value).then(res => {
                if (res.state == 200) {
                    questionVoList.value = res.data
                    questionVo.value.name = ''
                    questionVo.value.solve = ''
                    questionVo.value.solutions = []
                    addQestionDialog.value = false
                } else {
                    ElMessage.error(res.message)
                }
            })
        } else {
            // ElMessage.error("表单校验未通过")
        }
    })
}


const updateWhichSolution = ref([0, 0])
const updateThisSolution = (index, index2) => {
    updateWhichSolution.value[0] = index
    updateWhichSolution.value[1] = index2
    editSolution.value = Object.assign({}, questionVoList.value[index].solutions[index2])
    editSolutionDialog.value = true
}

const addSolutionToThisQuestion = (index) => {
    addSolutionToWhich.value = index
    addSolutionDialog.value = true
    addSolutionTo.value.id = null
    addSolutionTo.value.questionId = questionVoList.value[index].id
    addSolutionTo.value.name = ''
    addSolutionTo.value.isSolution = 0
}


const addSolutionTo = ref({
    id: undefined,
    questionId: undefined,
    name: '',
    isSolution: 0
})

const addSolutionToWhich = ref(0)

const submitUpdateSolution = () => {
    let obj = Object.assign({}, editSolution.value)
    updateSolution(obj).then(res => {
        if (res.state == 200) {
            questionVoList.value[updateWhichSolution.value[0]].solutions[updateWhichSolution.value[1]] = obj
            editSolutionDialog.value = false
        }
        else {
            ElMessage.error(res.message)
        }
    })
}


const submitAddSolution = () => {
    if (addSolutionTo.value.name == '') {
        return
    }
    let obj = Object.assign({}, addSolutionTo.value)
    addSolutionToQuestion(obj).then(res => {
        if (res.state == 200) {
            questionVoList.value[addSolutionToWhich.value].solutions.push(obj)
            addSolutionDialog.value = false
        } else {
            ElMessage.error(res.message)
        }
    })
}

const changeIsSolution = (item) => {
    updateSolution(item).then(res => {
        if (res.state != 200) {
            ElMessage.error("更新失败_" + res.message)
        }
    })
}

const getTaskTemplates = (id) => {
    contentTaskTemplates(id).then(res => {
        if (res.state == 200) {
            taskTemplates.value = res.data
            if (taskTemplates.value.length > 0) {
                taskTemplateId.value = taskTemplates.value[0].id
                taskTemplateIdChanged()
            }
        }
    })
}

onBeforeMount(() => {
    getTaskTemplates(caseId)

})
</script>
<style scoped></style>