<template>
    <div id="pane-seventh" class="pane" key="6">
        <div style="display: flex; flex-direction: column;">
            <div style="padding: 20px;">
                <el-upload class="upload-demo" drag multiple :action="'/dev-api/content/upload_pkg/' + CaseId"
                    :before-upload="beforeUploadFile" :on-success="fileSuccess">
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        Drop file here or <em>click to upload</em>
                    </div>
                    <template #tip>
                        <div class="el-upload__tip">
                            单个文件最大不超过1GB。
                        </div>
                    </template>
                </el-upload>
            </div>
            <div>
                <el-row v-for="i in pkgs.length" style="text-align: left;">
                    <el-button type="primary" :icon="Download" link>{{ pkgs[i - 1].originFilename }}</el-button>
                    <el-popconfirm title="确定删除吗?" @confirm="contentDeletePkgSubmit(pkgs[i - 1].id)">
                        <template #reference>
                            <el-button link type="danger" size="small" :icon="Delete"></el-button>
                        </template>
                    </el-popconfirm>
                </el-row>
            </div>
        </div>
        <el-row class="bottom-row">
            <el-button type="primary" @click="done">完成</el-button>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import router from '@/router';
import { onBeforeMount, ref, reactive, onMounted, shallowRef, onBeforeUnmount } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { Plus, Check, Delete, Download } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

import { GetPackages } from "@/apis/contents/teacherContent/getPackages.js";
import { contentDeletePkg } from "@/apis/contents/teacherContent/contentDeletePkg.js";
import { updateContentDone } from "@/apis/contents/teacherContent/updateConentDone.js";
const route = useRoute()
const CaseId = ref(0)

const pkgs = ref([])
const beforeUploadFile: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 / 1024 > 1) {
        console.log('文件最大不能超过1GB')
        ElMessage({
            showClose: true,
            message: '文件最大不能超过1GB',
            type: 'success',
        })
        return false
    }
    return true
}

const fileSuccess: UploadProps['onSuccess'] = (response) => {
    if (response.state == 200) {
        pkgs.value = response.data
        ElMessage({
            type: 'success',
            message: '上传成功'
        })
    }
}

const getContentPkgs = async (id) => {
    await GetPackages(id).then(res => {
        console.log(res)
        if (res.state == 200) {
            pkgs.value = res.data
        } else {
            ElMessage.error('获取资源包失败' + res.message)
        }
    })
}

const contentDeletePkgSubmit = (pkgId) => {
    contentDeletePkg(CaseId.value, pkgId).then(res => {
        if (res.state == 200) {
            pkgs.value = res.data
            ElMessage({
                type: 'success',
                message: '删除成功'
            })
        } else {
            ElMessage.error(res.message)
        }
    })
    console.log(pkgId)
}

const done = () => {
    updateContentDone(CaseId.value).then(res => {
        if (res.state == 200) {
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

onBeforeMount(() => {
    CaseId.value = <any>route.params.contentId
    getContentPkgs(CaseId.value)
})

</script>
<style scoped>
.bottom-row {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}
</style>