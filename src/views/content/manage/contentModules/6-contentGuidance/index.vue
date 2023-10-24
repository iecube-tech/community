<template>
    <div>
        <div id="pane-sixth" class="pane" key="5">
            <div style="border: 1px solid #ccc">
                <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                    :mode="mode" />
                <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
                    :mode="mode" @onCreated="handleCreated" @onChange="onChange" />
            </div>
            <el-row class="bottom-row">
                <!-- <el-button @click="GetKeys">上一步</el-button> -->
                <el-button type="primary" @click="updateGuidance()">完成</el-button>
            </el-row>


            <div style="display: flex; flex-direction: column; align-items: center;">
                <div>
                    <div id="editor-content-view" class="editor-content-view clearfix"></div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import router from '@/router';
import { onBeforeMount, ref, reactive, onMounted, shallowRef, onBeforeUnmount } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { DomEditor } from '@wangeditor/editor'

import { GetGuidance } from "@/apis/contents/getGuidanceByid.js";
import { UpdateGuidance } from "@/apis/contents/teacherContent/updateGuidance.js";
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
    id: null,
    name: '',
    introduction: '',
    introduce: '',
    target: '',
    cover: '',
    completion: null,
    guidance: ''
})

const mode = ref('default')
const editorRef = shallowRef()
const valueHtml = ref('')

// 工具栏配置
const toolbarConfig = {
    excludeKeys: [
        "bold",
        "group-video",
        "fullScreen",
        "fontSize",
        "fontFamily",
        "todo",
        "emotion"
    ]
}
// 编辑器配置
const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {},
}
const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
editorConfig.MENU_CONF['uploadImage'] = {
    // 上传图片的配置
    server: '/dev-api/files/wdupimage',
    timeout: 5 * 1000, // 5s

    fieldName: 'file',
    metaWithUrl: true,
    maxFileSize: 10 * 1024 * 1024,
    base64LimitSize: 5 * 1024,
    onBeforeUpload(file) {
        console.log('onBeforeUpload', file)

        return file // will upload this file
        // return false // prevent upload
    },
    onProgress(progress) {
        console.log('onProgress', progress)
    },
    onSuccess(file, res) {
        console.log('onSuccess', file, res)
    },
    onFailed(file, res) {
        alert(res.message)
        console.log('onFailed', file, res)
    },
    onError(file, err, res) {
        alert(err.message)
        console.error('onError', file, err, res)
    },
}
const onChange = () => {
    document.getElementById('editor-content-view').innerHTML = valueHtml.value
}

const GetKeys = () => {
    const toolbar = DomEditor.getToolbar(editorRef.value)
    const curToolbarConfig = toolbar.getConfig()
    console.log(curToolbarConfig.toolbarKeys) // 当前菜单排序和分组
}

const updateGuidance = () => {
    contentForm.value.guidance = valueHtml.value
    let data = Object.assign({}, contentForm.value)
    UpdateGuidance(CaseId.value, data).then(res => {
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
// const saveContent = () => {
//     content.value.guidance = editorRef.value.getHtml()
//     const params = Object.assign({}, content.value)
//     console.log(params);
//     SaveContent(params).then(res => {
//         console.log(res);

//     })

// }
const goback = () => {
    router.push({
        name: <any>route.meta.parentName,
        params: { contentId: CaseId.value }
    })
}
const getGuidance = (id) => {
    GetGuidance(id).then(res => {
        if (res.state == 200) {
            valueHtml.value = res.data
        } else {
            ElMessage.error("获取案例指导异常")
        }
    })
}
onBeforeMount(() => {
    CaseId.value = <any>route.params.contentId
    getGuidance(CaseId.value)
})

onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
</script>
<style scoped>
.bottom-row {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
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

.mx-1 {
    margin-right: 10px;
    margin-bottom: 10px;
}

.vhtml h1 {
    font-size: 30px;
}

.vhtml h2 {
    font-size: 28px;
}

.vhtml h3 {
    font-size: 26px;
}

.vhtml h4 {
    font-size: 22px;
}

.vhtml h5 {
    font-size: 18px;
}

.editor-content-view {
    padding: 0 10px;
    margin-top: 20px;
    overflow-x: auto;
}

.editor-content-view p,
.editor-content-view li {
    white-space: pre-wrap;
    /* 保留空格 */
}

.editor-content-view blockquote {
    border-left: 8px solid #d0e5f2;
    padding: 10px 10px;
    margin: 10px 0;
    background-color: #f1f1f1;
}

.editor-content-view code {
    font-family: monospace;
    background-color: #eee;
    padding: 3px;
    border-radius: 3px;
}

.editor-content-view pre>code {
    display: block;
    padding: 10px;
}

.editor-content-view table {
    border-collapse: collapse;
}

.editor-content-view td,
.editor-content-view th {
    border: 1px solid #ccc;
    min-width: 50px;
    height: 20px;
}

.editor-content-view th {
    background-color: #f1f1f1;
}

.editor-content-view ul,
.editor-content-view ol {
    padding-left: 20px;
}

.editor-content-view input[type="checkbox"] {
    margin-right: 5px;
}

.editor-content-view img {
    max-width: 100%;
    height: auto;
    margin: 0px 20px;
    float: right;
}


.editor-content-view strong {
    font-weight: bold;
}

.clearfix::after {
    content: "";
    clear: both;
    display: table;
}

.clearfix {
    margin-top: 80px;
    width: 1100px;
}
</style>