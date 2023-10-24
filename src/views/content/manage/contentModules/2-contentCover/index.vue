<template>
    <div id="pane-second" class="pane" key="1">
        <div class="cover-upload">
            <el-upload class="cover-uploader" :action="'/dev-api' + '/content/add_cover/' + CaseId" :show-file-list="false"
                :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="contentForm.cover" :src="'/local-resource/image/' + contentForm.cover" class="cover" />
                <el-icon v-else class="cover-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
        </div>
        <el-row class="bottom-row">
            <!-- <el-button @click="">上一步</el-button> -->
            <el-button type="primary" @click="complateUploadCover()">完成</el-button>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import router from '@/router';
import { onBeforeMount, ref, reactive, onMounted, shallowRef, onBeforeUnmount } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { getContent } from "@/apis/contents/getContentByid.js";
import { changeContentCompletion } from "@/apis/contents/teacherContent/changeConetentCompletion.js";


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

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    if (response.state == 200) {
        contentForm.value.cover = response.data.filename
    }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (CaseId.value == 0) {
        ElMessage.error("请先完成上一步")
    }
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}

const complateUploadCover = () => {
    if (contentForm.value.cover == '') {
        ElMessage.error("请先上传图片")
        return
    }
    changeContentCompletion(CaseId.value, 1).then(res => {
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

const getConten = (id) => {
    getContent(id).then(res => {
        if (res.state == 200) {
            contentForm.value = res.data
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
onBeforeMount(() => {
    CaseId.value = <any>route.params.contentId
    getConten(CaseId.value)

})
</script>
<style scoped>
.bottom-row {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

.cover-upload {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}

.cover-uploader .avatar {
    width: 400px;
    height: 240px;
    display: block;
}
</style>

<style>
.cover-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.cover-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.cover-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 400px;
    height: 240px;
    text-align: center;
}

img {
    max-height: 300px;
    width: auto;
}
</style>