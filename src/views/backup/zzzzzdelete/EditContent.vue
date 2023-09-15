<template>
    <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
            @onCreated="handleCreated" />
    </div>
    <el-button @click="GetContent(editorRef)">获取</el-button>
    <div v-html="content"> </div>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef, onBeforeUnmount } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const editorRef = shallowRef()
const valueHtml = ref('<p>hello</p>')

// 工具栏配置
const toolbarConfig = {}
// 编辑器配置
const editorConfig = { placeholder: '请输入内容...' }

const mode = ref('default')

const content = ref('')



const GetContent = (editorRef) => {
    console.log('111111')
    console.log(editorRef)
    console.log(editorRef.getHtml());
    content.value = editorRef.getHtml()
}


onMounted(() => {
    setTimeout(() => {
        valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
    }, 1500)
    console.log(editorRef.value);

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
<style scoped></style>