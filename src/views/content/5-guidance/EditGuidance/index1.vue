<!-- <template>
    <div>
        <div style="min-height: 500px;">
            <ckeditor style="height: 100%;" :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        </div>

        <div>
            <div v-html="editorData">

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ref } from 'vue';

const editor = ClassicEditor
const editorData = ref('<p>Content of the editor.</p>')
const editorConfig = {
    // The configuration of the editor.
}
</script>
<style scoped></style> -->
<template>
    <div id="ckeditor">
        <ckeditor ref="editorRef" v-model="editorDesign" :editor="editor" :config="editorConfig" :disabled="disabled"
            @ready="onEditorReady" @focus="onEditorFocus" @blur="onEditorBlur" @input="onEditorInput"
            @destroy="onEditorDestroy"></ckeditor>
    </div>

    <div v-html="editorDesign">

    </div>
</template>
  
<script setup>
import { ref, reactive } from 'vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js' //引入中文包
// import { FullPage } from '@ckeditor/ckeditor5-html-support';
const props = defineProps({
    disabled: {
        type: Boolean,
        default: false, //是否禁用
    },
})
const editor = ClassicEditor
const editorDesign = ref('') //默认内容

// editor.builtinPlugins = [
//     // FullPage,
// ]

const editorConfig = reactive({
    language: 'zh-cn',
    toolbar: {
        items: ['heading', 'fullPage', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo'],
    },
    image: {
        toolbar: ['imageTextAlternative', 'toggleImageCaption', 'imageStyle:inline', 'imageStyle:block', 'imageStyle:side'],
    },
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    ckfinder: {
        uploadUrl: `/local-resource/upimage`, // 上传图片接口
        options: {
            resourceType: 'Images',
        },
    },
})

const emit = defineEmits(['ready', 'focus', 'blur', 'input', 'destroy'])

const editorRef = ref(null)
const onEditorReady = () => {
    console.log('准备好了')
    emit('ready')
}

const onEditorFocus = () => {
    console.log('聚焦')
    emit('focus')
}
const onEditorBlur = () => {
    console.log('失去焦点')
    emit('blur')
}

const onEditorInput = () => {
    console.log('正在录入')
    emit('input')
}

const onEditorDestroy = () => {
    console.log('销毁')
    emit('destroy')
}
</script>
  
<style lang="scss">
#ckeditor {
    .ck-editor__editable {
        min-height: 500px;
        max-height: 1000px;
    }
}
</style>
  
  
