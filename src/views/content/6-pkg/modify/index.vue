<template>
    <div style="display: flex; flex-direction: column;">
        <div style="padding: 20px;">
            <el-upload class="upload-demo" drag multiple action="/dev-api/files/upfile" :before-upload="beforeUploadFile"
                :on-success="fileSuccess">
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
            </el-row>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { Download, UploadFilled } from '@element-plus/icons-vue'
import { ElMessage, UploadProps } from 'element-plus'
import { GetPackages } from '@/apis/pkg/getPackages.js'
const route = useRoute();

const pkgs = ref([])

const contentId = route.params.contentId

//文件上传
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
    console.log(response);
    getContentPkgs()
}

const getContentPkgs = async () => {
    await GetPackages(contentId).then(res => {
        console.log(res)
        if (res.state == 200) {
            pkgs.value = res.data
        } else {
            ElMessage.error('获取资源包失败' + res.message)
        }
    })
}

onBeforeMount(() => {
    getContentPkgs()
})

</script>
<style scoped></style>