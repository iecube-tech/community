<template>
    <div id="pane-fourth" class="pane" key="3">
        <div style="margin: 20px 0px;">
            <span>
                本节需要明确案例目标和对应知识点的匹配关系
            </span>
        </div>
        <div style="margin: 30px 0px;">
            <el-table :data="caseDesign" :border="true" style="width: 100%">
                <el-table-column prop="targetName" label="案例目标" />
                <el-table-column label="对应知识点">
                    <template #default="scope">
                        <!-- <span>{{ scope.$index}}</span> -->
                        <!-- <span>{{ scope.row }}</span> -->
                        <div v-if="caseDesign.length > 0 && caseDesign[0] != null">
                            <li v-for="i in scope.row.knowledgePoints.length">
                                {{ scope.row.knowledgePoints[i - 1].point }}
                            </li>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" width="100px">
                    <template #default="scope">
                        <el-popconfirm title="确定删除吗?" @confirm="deleteCaseDesignSubmit(scope.row.id)">
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
                        <span>添加案例目标和对应知识点匹配关系</span>
                    </div>
                </template>
                <div>
                    <el-form label-width="160px" ref="designFormRef" :model="newDesignForm" :rules="designFormRules">
                        <el-form-item label="案例目标：" prop="targetName">
                            <el-input v-model="newDesignForm.targetName"></el-input>
                        </el-form-item>
                        <el-form-item label="添加对应知识点：" prop="knowledgePoints">
                            <div
                                v-if="newDesignForm.knowledgePoints.length > 0 && newDesignForm.knowledgePoints[0].point != ''">
                                <el-tag v-for="i in newDesignForm.knowledgePoints.length" :key="i" class="mx-1" closable
                                    @close="removePointFromNewDesignForm(i - 1)">
                                    {{ newDesignForm.knowledgePoints[i - 1].point }}
                                </el-tag>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-input style="max-width: 400px; margin-right: 20px;" v-model="point"></el-input>
                            <el-button type="primary" circle size="small" :icon="Check"
                                @click="pointAddtoNewDesignForm()"></el-button>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" size="small"
                                @click="caseAddDesignSubmit(designFormRef)">添加</el-button>
                            <el-button size="small" @click="designFormReset()">清除内容</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
        <el-row class="bottom-row">
            <!-- <el-button @click="">上一步</el-button> -->
            <el-button type="primary" @click="caseDesignNext()">完成</el-button>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import router from '@/router';
import { onBeforeMount, ref, reactive, onMounted, shallowRef, onBeforeUnmount } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { Delete, Check } from '@element-plus/icons-vue';

import { caseAddDesign } from "@/apis/contents/teacherContent/caseAddDesign.js";
import { deleteCaseDesign } from "@/apis/contents/teacherContent/deleteCaseDesign.js";
import { updateCaseDesigns } from "@/apis/contents/teacherContent/updateCaseDesign.js";
import { GetCaseDesigns } from "@/apis/contents/teacherContent/getCaseDesign.js";

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

const designFormRef = ref<FormInstance>()
interface knowledgePoint {
    id: number
    targetId: number
    point: string
}
interface design {
    id: number
    targetName: string
    knowledgePoints: Array<knowledgePoint>
}

const newDesignForm = ref<design>({
    id: 0,
    targetName: '',
    knowledgePoints: [
        {
            id: 0,
            targetId: 0,
            point: '',
        }
    ]
})
const point = ref('')
const designFormRules = reactive<FormRules<design>>({
    targetName: [{ required: true, message: '请输入案例目标', trigger: 'blur' }],
    knowledgePoints: [{
        required: true,
        validator: function (rule, value, callback) {
            if (value[0].point == '') {
                callback(new Error('没有对应知识点'));
            } else {
                callback()
            }
        }, trigger: 'change'
    }]
})

const caseDesign = ref<Array<design>>([])
const pointAddtoNewDesignForm = () => {
    if (point.value == '') {
        return
    }
    if (newDesignForm.value.knowledgePoints.length > 0 && newDesignForm.value.knowledgePoints[0].point == '') {
        newDesignForm.value.knowledgePoints[0].point = point.value
        point.value = ''
    } else {
        let knowledgePoint = ref<knowledgePoint>({
            id: 0,
            targetId: 0,
            point: point.value
        })
        newDesignForm.value.knowledgePoints.push(knowledgePoint.value)
        point.value = ''
    }
}

const removePointFromNewDesignForm = (index) => {
    newDesignForm.value.knowledgePoints.splice(index, 1)
}

const caseAddDesignSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
            console.log(newDesignForm.value)
            let data = Object.assign({}, newDesignForm.value)
            //提交表单
            caseAddDesign(CaseId.value, data).then(res => {
                if (res.state == 200) {
                    caseDesign.value = res.data.designs
                    //清空表单
                    newDesignForm.value.targetName = ''
                    newDesignForm.value.knowledgePoints.splice(0, newDesignForm.value.knowledgePoints.length)
                } else {
                    ElMessage.error(res.message)
                }
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}
const designFormReset = () => {
    newDesignForm.value.targetName = ''
    newDesignForm.value.knowledgePoints.splice(0, newDesignForm.value.knowledgePoints.length)
}
const deleteCaseDesignSubmit = (id) => {
    deleteCaseDesign(CaseId.value, id).then(res => {
        if (res.state == 200) {
            caseDesign.value = res.data.designs
            ElMessage({
                type: 'success',
                message: '删除成功'
            })
        } else {
            ElMessage.error(res.message)
        }
    })
}
const caseDesignNext = () => {
    updateCaseDesigns(CaseId.value).then(res => {
        if (res.state == 200) {
            contentForm.value == res.data
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
const getDesigns = (id) => {
    GetCaseDesigns(id).then(res => {
        if (res.state == 200) {
            caseDesign.value = res.data.designs
        } else {
            ElMessage.error("获取案例教学设计点异常")
        }
    })
}

onBeforeMount(() => {
    CaseId.value = <any>route.params.contentId
    getDesigns(CaseId.value)
})
</script>
<style scoped>
.bottom-row {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}
</style>
