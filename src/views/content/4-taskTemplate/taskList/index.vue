<template>
    <div>
        <div class="tasks" v-if="taskTemplates.length > 0">
            <div v-for="task in taskTemplates" class="task">
                <el-card v-if="task.id != null">
                    <template #header>
                        <div class="card-header">
                            <span>任务{{ task.num }}: {{ task.taskName }}</span>
                            <div>
                                <el-button class="button" type="primary" link @click="toTaskTag(task.num)">任务标签</el-button>
                                <el-button class="button" type="primary" link @click="toModify(task.id)">编辑任务</el-button>
                                <el-button class="button" type="primary" link @click="deleteTask(task.id)">删除任务</el-button>
                            </div>
                        </div>
                    </template>
                    <div class="title">
                    </div>
                    <div class="title">
                        <span>任务要求</span>
                    </div>
                    <div>
                        <li v-for="item in task.requirementList">
                            {{ item.name }}
                            <br />
                        </li>
                    </div>
                    <div class="title">
                        <span>任务交付物要求</span>
                    </div>
                    <div>
                        <li v-for="item in task.deliverableRequirementList">
                            {{ item.name }}
                            <br />
                        </li>
                    </div>
                    <div class="title">
                        <span>参考链接</span>
                    </div>
                    <div>
                        <li v-for="item in task.referenceLinkList">
                            <span>
                                {{ item.name }}: <a :href="item.url">{{ item.url }}</a>
                                <br />
                            </span>
                        </li>
                    </div>
                    <div class="title">
                        <span>参考资料</span>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: flex-start;">
                        <li v-for="item in task.referenceFileList">
                            <el-link>
                                {{ item.originFilename }}
                            </el-link>
                        </li>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { contentTaskTemplates } from '@/apis/contents/getTaskTemplates.js';
import { deleteTaskTemplate } from '@/apis/contents/deletTaskTemplates.js';
import { ElMessage } from 'element-plus';
import router from '@/router';

const route = useRoute()
const contentId = route.params.contentId

const taskTemplates = ref<[task]>([
    {
        id: null,
        contentId: null,
        taskName: '',
        num: null,
        taskCover: '',
        requirementList: [{ name: '' }],
        deliverableRequirementList: [{ name: '' }],
        referenceLinkList: [{ name: '', url: '' }],
        referenceFileList: [{ id: null, name: '', filename: '', originFilename: '' }]
    }
])

const req = ref<requirement>({ name: '' })

interface requirement {
    name: string
}
interface deliverableRequirement {
    name: string
}
interface referenceLink {
    name: string
    url: string
}
interface referenceFile {
    id: number
    name: string
    filename: string
    originFilename: string
}

interface task {
    id: number
    contentId: number
    taskName: string
    num: number
    taskCover: string
    requirementList: [requirement]
    deliverableRequirementList: [deliverableRequirement]
    referenceLinkList: [referenceLink]
    referenceFileList: [referenceFile]
}

const requirement = ref<requirement>({ name: '' })
const deliverableRequirement = ref<deliverableRequirement>({ name: '' })
const referenceLink = ref<referenceLink>({ name: '', url: '' })
const referenceFile = ref<referenceFile>({ id: null, name: '', filename: '', originFilename: '' })
const task = ref<task>({
    id: null,
    contentId: null,
    taskName: '',
    num: null,
    taskCover: '',
    requirementList: [{ name: '' }],
    deliverableRequirementList: [{ name: '' }],
    referenceLinkList: [{ name: '', url: '' }],
    referenceFileList: [{ id: null, name: '', filename: '', originFilename: '' }]
})

const toModify = (taskTemplateId) => {
    router.push({
        name: 'taskModify',
        params: { taskTemplateId: taskTemplateId }
    })
}

const toTaskTag = (taskNum) => {
    router.push({
        name: 'addTagTemplates',
        params: { num: taskNum }
    })
}

const deleteTask = (taskTemplateId) => {
    deleteTaskTemplate(taskTemplateId).then(res => {
        if (res.state == 200) {
            ElMessage.success("已删除")
            getContentTaskTemplates()
        } else {
            ElMessage.error("删除失败" + res.message)
        }
    })
}

const getContentTaskTemplates = () => {
    contentTaskTemplates(contentId).then(res => {
        if (res.state == 200) {
            taskTemplates.value = res.data
            console.log(taskTemplates.value)
        } else {
            ElMessage.error(res.message)
        }
    })
}

onBeforeMount(() => {
    getContentTaskTemplates()
})
</script>
<style scoped>
.tasks {
    display: flex;
    flex-direction: column;
}

.task {
    margin: 20px 0px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title {
    font-size: 18px;
    color: #33b8b9;
}
</style>