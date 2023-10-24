<template>
    <div id="pane-third" class="pane" key="2">
        <div>
            <el-row style="margin: 20px 0px">
                <span>本案例的功能模块</span>
            </el-row>
            <div class="card-list" v-if="addModules.length < 1 || addModules[0] != null" style="min-height: 260px;">
                <el-card v-for="j in addModules.length" :key="j"
                    style="width: 280px; height: 220px; margin-right: 30px; margin-bottom: 30px;" shadow="hover">
                    <template #header>
                        <div class="card-header">
                            <div>
                                <span>{{ addModules[j - 1].name }}</span>
                            </div>
                            <div>
                                <el-button type="danger" link :icon="Delete"
                                    @click="removeModuleFromAddModules(j - 1)"></el-button>
                            </div>
                        </div>
                    </template>
                    <div>
                        <li v-for="i in addModules[j - 1].children.length" :key="i">
                            {{ addModules[j - 1].children[i - 1].name }}
                        </li>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="all-modules">
            <el-row style="margin: 20px 0px">
                <span>请从下面选择功能模块添加到本案例</span>
            </el-row>
            <div class="card-list">
                <el-tooltip v-for="i in modules.length" :content="getToolTipContent(i - 1)" raw-content>
                    <el-button type="primary" round size="small" @click="addModuletoContent(i - 1)">{{ modules[i -
                        1].name }}</el-button>
                </el-tooltip>
            </div>
        </div>
        <el-row class="bottom-row">
            <!-- <el-button @click="">上一步</el-button> -->
            <el-button type="primary" @click="submitAddModules()">完成</el-button>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import router from '@/router';
import { onBeforeMount, ref } from 'vue';
import { ElMessage, type FormInstance } from 'element-plus'
import { Delete } from '@element-plus/icons-vue';
import '@wangeditor/editor/dist/css/style.css'


import { updateCaseModules } from "@/apis/contents/teacherContent/updateCaseModules.js";
import { OldModules } from "@/apis/contents/teacherContent/getOldModules.js";
import { AllModules } from "@/apis/contents/teacherContent/getAllModule.js";

const route = useRoute()
const CaseId = ref(0)
const active = ref(0)

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
    id: null,
    name: '',
    introduction: '',
    introduce: '',
    target: '',
    cover: '',
    completion: null,
    guidance: ''
})
interface concept {
    id: number
    name: string
}

interface model {
    id: number
    name: string
    children: Array<concept>
}

const modules = ref<Array<model>>([])

const addModules = ref<Array<model>>([])
const getToolTipContent = (index) => {
    let str = '基础知识：'
    for (let i = 0; i < modules.value[index].children.length; i++) {
        str = str + modules.value[index].children[i].name + "；"
    }
    return str
}

const addModuletoContent = (index) => {
    if (addModules.value[0] == null) {
        addModules.value.splice(0, 1)
    }
    let conceptLength = 0
    if (addModules.value.length > 1) {
        for (let i = 0; i < addModules.value.length; i++) {
            conceptLength = conceptLength + addModules.value[i].children.length
        }

    }
    conceptLength = conceptLength + modules.value[index].children.length
    if (conceptLength <= 8) {
        addModules.value.push(modules.value[index])
        modules.value.splice(index, 1)
    } else {
        ElMessage.warning("案例添加的基础知识点条目超过8个")
        return
    }

}

const removeModuleFromAddModules = (index) => {
    modules.value.push(addModules.value[index])
    addModules.value.splice(index, 1)
}

const submitAddModules = () => {
    let newModels = []
    for (let i = 0; i < addModules.value.length; i++) {
        newModels.push(addModules.value[i].id)
    }
    console.log(newModels)
    updateCaseModules(CaseId.value, newModels).then(res => {
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

const getOldModiles = (id) => {
    OldModules(id).then(res => {
        if (res.state == 200) {
            addModules.value = res.data
        } else {
            ElMessage.error("获取案例知识模块异常")
        }
    })
}
const getAllModule = () => {
    AllModules().then(res => {
        if (res.state == 200) {
            modules.value = res.data
        } else {
            ElMessage.error("获取知识模块异常")
        }
    })
}

onBeforeMount(() => {
    CaseId.value = <any>route.params.contentId
    getOldModiles(CaseId.value)
    getAllModule()
})
</script>
<style scoped>
.bottom-row {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

.card-list {
    display: flex;
    flex-wrap: wrap;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>