<template>
    <div class="container">
        <div class="item">
            <span style="width: 140px;">
                任务名称：
            </span>
            <el-input style="max-width: 400px;" v-model="taskTemplate.taskName"></el-input>
        </div>
        <div class="item">
            <span style="width: 140px;">
                任务序号：
            </span>
            <el-input-number :min="1" :max="5" v-model="taskTemplate.num"></el-input-number>
        </div>
        <div class="item">
            <span style="width: 140px;">
                任务要求：
            </span>
            <el-button type="primary" link @click="AddRequirementDialog = true">新增</el-button>
        </div>

        <div v-if="taskTemplate.requirementList.length > 0">
            <el-row v-for="i in taskTemplate.requirementList.length" class="row-item">
                <el-tag :key="i" size="large" closable @close="requirementClose(i - 1)">
                    {{ taskTemplate.requirementList[i - 1].name }}
                </el-tag>
            </el-row>
        </div>

        <div class="item">
            <span style="width: 140px;">
                任务交付物要求：
            </span>
            <el-button type="primary" link @click="AddDeliverableRequirementDialog = true">新增</el-button>
        </div>

        <div v-if="taskTemplate.deliverableRequirementList.length > 0">
            <el-row v-for="i in taskTemplate.deliverableRequirementList.length" class="row-item">
                <el-tag :key="i" size="large" closable @close="deliverableRequirementClose(i - 1)">
                    {{ taskTemplate.deliverableRequirementList[i - 1].name }}
                </el-tag>
            </el-row>
        </div>

        <div class="item">
            <span style="width: 140px;">
                参考链接：
            </span>
            <el-button type="primary" link @click="AddReferenceLinkDialog = true">新增</el-button>
        </div>

        <div v-if="taskTemplate.referenceLinkList.length > 0">
            <el-row v-for="i in taskTemplate.referenceLinkList.length" class="row-item">
                <el-tag :key="i" size="large" closable @close="referenceLinkClose(i - 1)">
                    {{ taskTemplate.referenceLinkList[i - 1].name + ":" + taskTemplate.referenceLinkList[i - 1].url }}
                </el-tag>
            </el-row>
        </div>

        <div class="item">
            <span style="width: 140px;">
                参考资料：
            </span>
            <el-upload class="upload" action="/local-resource/upfile" multiple :on-success="uploadSuccess"
                :show-file-list="false">
                <el-button type="primary" link>上传</el-button>
            </el-upload>
        </div>

        <div v-if="taskTemplate.referenceFileList.length > 0">
            <el-row v-for="i in taskTemplate.referenceFileList.length" class="row-item">
                <el-tag :key="i" size="large" closable @close="referenceFileClose(i - 1)">
                    <el-link @click="clickFile(taskTemplate.referenceFileList[i - 1])">
                        {{ taskTemplate.referenceFileList[i - 1].originFilename }}
                    </el-link>
                </el-tag>
            </el-row>
        </div>

        <div style="margin-top: 30px;">
            <el-button @click="save">保存</el-button>
        </div>
    </div>


    <el-dialog v-model="AddRequirementDialog" title="新增任务要求" width="30%">
        <div class="item">
            <span style="width: 140px;">任务要求：</span>
            <el-input v-model="requirementName"></el-input>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="AddRequirementDialog = false">取消</el-button>
                <el-button type="primary" @click="AddRequirement()">
                    添加
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="AddDeliverableRequirementDialog" title="新增交付物要求" width="30%">
        <div class="item">
            <span style="width: 140px;">交付物要求：</span>
            <el-input v-model="deliverableRequirementName"></el-input>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="AddDeliverableRequirementDialog = false">取消</el-button>
                <el-button type="primary" @click="AddDeliverableRequirement()">
                    添加
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="AddReferenceLinkDialog" title="新增参考链接" width="30%">
        <div class="item">
            <span style="width: 140px;">名称：</span>
            <el-input v-model="referenceLinkName"></el-input>
        </div>
        <div class="item">
            <span style="width: 140px;">参考链接URL：</span>
            <el-input v-model="referenceLinkUrl"></el-input>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="AddReferenceLinkDialog = false">取消</el-button>
                <el-button type="primary" @click="AddReferenceLink()">
                    添加
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { addTaskTemplate } from '@/apis/contents/addTaskTemplates.js';
import { ElMessage } from 'element-plus'
import router from '@/router';

const route = useRoute()
const contentId = route.params.contentId

const taskTemplate = ref({
    contentId: contentId,
    taskName: '',
    num: null,
    requirementList: [],
    deliverableRequirementList: [],
    referenceLinkList: [],
    referenceFileList: [],
})

const requirementName = ref('')
const deliverableRequirementName = ref('')
const referenceLinkName = ref('')
const referenceLinkUrl = ref('')

const AddRequirementDialog = ref(false)
const AddDeliverableRequirementDialog = ref(false)
const AddReferenceLinkDialog = ref(false)


const AddRequirement = () => {
    if (requirementName.value != '') {
        let requirement = { name: requirementName.value }
        taskTemplate.value.requirementList.push(requirement)
        requirementName.value = ''
        AddRequirementDialog.value = false
    }

}

const requirementClose = (index) => {
    taskTemplate.value.requirementList.splice(index, 1)
}

const AddDeliverableRequirement = () => {
    if (deliverableRequirementName.value != '') {
        let deliverableRequirement = { name: deliverableRequirementName.value }
        taskTemplate.value.deliverableRequirementList.push(deliverableRequirement)
        deliverableRequirementName.value = ''
        AddDeliverableRequirementDialog.value = false
    }
}
const deliverableRequirementClose = (index) => {
    taskTemplate.value.deliverableRequirementList.splice(index, 1)
}

const AddReferenceLink = () => {
    if (referenceLinkName.value != '' && referenceLinkUrl.value != '') {
        let referenceLink = { name: referenceLinkName.value, url: referenceLinkUrl.value }
        taskTemplate.value.referenceLinkList.push(referenceLink)
        referenceLinkName.value = ''
        referenceLinkUrl.value = ''
        AddReferenceLinkDialog.value = false
    }
}
const referenceLinkClose = (index) => {
    taskTemplate.value.referenceLinkList.splice(index, 1)
}

interface resource {
    id: number,
    name: string,
    filename: string,
    originFilename: string,
    type: string,
}

const clickFile = (resource: resource) => {
    downloadFile(resource.filename)
}

const downloadFile = (filename) => {
    let fileUrl = '/local-resource/file/' + filename
    window.open(fileUrl)
}

const referenceFileClose = (index) => {
    console.log(taskTemplate.value.referenceFileList[index])
    taskTemplate.value.referenceFileList.splice(index, 1)
}

const uploadSuccess = (res) => {
    if (res.state = 200) {
        taskTemplate.value.referenceFileList.push(res.data)
    } else {
        ElMessage.error("上传失败" + res.message)
    }
    // console.log(res);

}

const goBack = () => {
    router.push({
        name: <string>route.meta.parentName
    })
}

const save = () => {
    console.log(taskTemplate.value.taskName)
    console.log(taskTemplate.value.num)
    if (taskTemplate.value.taskName != '' && taskTemplate.value.num != null) {
        const data = Object.assign({}, taskTemplate.value)
        addTaskTemplate(data).then(res => {
            if (res.state = 200) {
                ElMessage({
                    message: '添加成功',
                    type: 'success',
                })
                goBack()
            } else {
                ElMessage.error("添加失败" + res.message)
            }
        })
    } else {
        console.log("22222");

        ElMessage({
            message: '请完善必要字段',
            type: 'warning',
        })
    }
}
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
}

.item {
    display: flex;
    flex-direction: row;
    justify-self: start;
    align-items: center;
    margin-top: 20px;
}

.row-item {
    padding-left: 140px;
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
    margin-left: 10px;
}
</style>