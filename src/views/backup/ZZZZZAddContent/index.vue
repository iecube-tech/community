<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>{{ title.meta.title }}</span>
            </div>
        </template>
        <el-form :model="content" label-width="120px">
            <el-row :gutter="20" style="margin-bottom: 20px; display: flex;">
                <el-col :span="12">
                    <el-card style="min-height: 465px; margin-bottom: 20px; overflow-y: auto">
                        <span class="title_one">产业项目案例基本信息</span>
                        <div style="padding: 20px">
                            <el-form-item label="项目名称：" prop="name">
                                <el-input v-model="content.name" placeholder="项目名称">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="产业方向：" prop="Direction">
                                <el-select placeholder="选择方向" disabled>
                                    <el-option label="Zone one" value="shanghai" />
                                    <el-option label="Zone two" value="beijing" />
                                </el-select>
                            </el-form-item>

                            <el-form-item label="专业分类：" prop="Direction">
                                <el-select placeholder="选择分类" disabled>

                                </el-select>
                            </el-form-item>

                            <el-form-item label="内容封面：" prop="">
                                <el-upload class="avatar-uploader" action="dev-api/files/upimage" :show-file-list="false"
                                    :on-success="ImageSuccess">
                                    <img v-if="content.cover" :src="'local-resource/image/' + content.cover"
                                        class="avatar" />
                                    <el-icon v-else class="avatar-uploader-icon">
                                        <Plus />
                                    </el-icon>
                                </el-upload>
                            </el-form-item>
                        </div>
                    </el-card>
                </el-col>

                <el-col :span="12">
                    <el-card style="margin-bottom: 20px; min-height: 465px; overflow-y: auto">
                        <span class="title_one">产业项目案例资源包</span>
                        <div style="padding: 20px;">
                            <el-upload class="upload-demo" drag multiple action="dev-api/files/upfile"
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
                    </el-card>
                </el-col>

                <el-col :span="24">
                    <el-card style="min-height: 200px; margin-bottom: 20px; overflow-y: auto">
                        <span class="title_one">产业项目案例简介</span>
                        <div style="padding:20px">
                            <el-input v-model="content.introduction" type="textarea" :autosize="{ minRows: 5 }"> </el-input>
                        </div>
                    </el-card>
                </el-col>

                <el-col :span="24">
                    <el-card style="min-height: 200px; margin-bottom: 20px; overflow-y: auto">
                        <span class="title_one">产业项目案例介绍</span>
                        <div style="padding:20px">
                            <el-input v-model="content.introduce" type="textarea" :autosize="{ minRows: 5 }"> </el-input>
                        </div>
                    </el-card>
                </el-col>

                <el-col :span="24">
                    <el-card style="margin-bottom: 20px; min-height: 200px; overflow-y: auto">
                        <span class="title_one">产品模块</span>
                    </el-card>

                </el-col>

                <el-col :span="24">
                    <el-card style="margin-bottom: 20px; min-height: 200px; overflow-y: auto">
                        <span class="title_one">项目案例对应知识点</span>
                    </el-card>

                </el-col>

                <el-col :span="24">
                    <el-card style="min-height: 600px; margin-bottom: 20px; overflow-y: auto">
                        <span class="title_one">产业项目案例指导</span>
                        <div style="padding:20px">
                            <div style="border: 1px solid #ccc">
                                <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef"
                                    :defaultConfig="toolbarConfig" :mode="mode" />
                                <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml"
                                    :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
                            </div>
                        </div>
                    </el-card>
                </el-col>

                <el-col :span="24">
                    <el-card>
                        <el-button type="primary" @click="saveContent">保存</el-button>
                    </el-card>
                </el-col>
            </el-row>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted, shallowRef, onBeforeUnmount } from 'vue';
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { UploadFilled } from '@element-plus/icons-vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { uploadImages } from '@/apis/resource/uploadImages'
import { GetAllDirection } from '@/apis/direction/getAllDirection'
import type { UploadProps } from 'element-plus'
import { SaveContent } from '@/apis/contents/saveContent'
// import qs from qs;
const route = useRoute()
const title = route.matched.at(-1)
const editorRef = shallowRef()
const valueHtml = ref('')

// 工具栏配置
const toolbarConfig = {}
// 编辑器配置
const editorConfig = { placeholder: '请输入内容...' }

const mode = ref('default')

// 表单
const content = ref({
    name: '',
    // direction: '',
    // classification: '',
    cover: '',
    introduction: '',
    introduce: '',
    guidance: '',
    parentId: 1,
    pkgs: [],
})
const files = ref([])

//封面图片上传

const ImageSuccess: UploadProps['onSuccess'] = (response) => {
    console.log(response);
    content.value.cover = response.data.filename
}
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
    content.value.pkgs.push(response.data.filename)
    console.log(content.value.pkgs);
}
const saveContent = () => {
    content.value.guidance = editorRef.value.getHtml()
    const params = Object.assign({}, content.value)
    console.log(params);
    SaveContent(params).then(res => {
        console.log(res);

    })

}

onMounted(() => {
    GetAllDirection().then(res => {
        console.log(res)
    })

})

onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}


</script>
<style scoped>
.title_one {
    font-size: 16px;
    font-weight: bold;

}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>