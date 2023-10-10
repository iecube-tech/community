<template>
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" style="width: 100%;"></ckeditor>
    <div v-html="editorData">

    </div>
</template>

<script setup>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";
import { onMounted, ref } from "vue";
const ckeditor = CKEditor.component;
onMounted(() => { });

const editor = ClassicEditor;
const editorData = ref("");

const editorConfig = {
    licenseKey: 'OFdJK2dPeGlXQzFOd0hIQ09qYkxvYUZFK0VsbVdWVWFJOCtmbTlnaUNIVmtpdmpyWm1mN055RlJlU3FlLU1qQXlNekV3TVRVPQ==',
};
</script>
<style scoped></style>