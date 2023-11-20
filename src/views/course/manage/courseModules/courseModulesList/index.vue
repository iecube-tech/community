<template>
    <div>
        <el-button type="primary" link @click="toPreview">课程基本信息</el-button>
    </div>
    <div>
        <el-button v-if="completion >= 0" type="primary" link @click="toCover">课程封面图片</el-button>
    </div>
    <div>
        <el-button v-if="completion >= 1" type="primary" link @click="toNpoints">课程知识点</el-button>
    </div>
    <div>
        <el-button v-if="completion >= 2" type="primary" link @click="toDesign">课程教学设计</el-button>
    </div>
    <div>
        <el-button v-if="completion >= 3" type="primary" link @click="toTask">课程实验设计</el-button>
    </div>
    <div>
        <el-button v-if="completion >= 4" type="primary" link @click="toGuidance">课程指导</el-button>
    </div>
    <div>
        <el-button v-if="completion >= 5" type="primary" link @click="toPkgs">课程资料</el-button>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { useRoute } from 'vue-router';
import { ref, onBeforeMount } from 'vue';
import { getContent } from '@/apis/contents/getContentByid.js'
const route = useRoute()

const contentId = ref(0)
const completion = ref(0)
const toPreview = () => {
    router.push({
        name: 'coursePreview',
        params: { contentId: contentId.value }
    })
}

const toCover = () => {
    router.push({
        name: 'courseSetCover',
        params: { contentId: contentId.value }
    })
}
const toNpoints = () => {
    router.push({
        name: 'coursePoints',
        params: { contentId: contentId.value }
    })
}

const toDesign = () => {
    router.push({
        name: 'courseDesign',
        params: { contentId: contentId.value }
    })
}

const toTask = () => {
    router.push({
        name: 'courseTask',
        params: { contentId: contentId.value }
    })
}

const toGuidance = () => {
    router.push({
        name: 'courseGuidance',
        params: { contentId: contentId.value }
    })
}

const toPkgs = () => {
    router.push({
        name: 'coursePkgs',
        params: { contentId: contentId.value }
    })
}

onBeforeMount(() => {
    if (route.params.contentId) {
        contentId.value = <any>route.params.contentId
        getContent(contentId.value).then(res => {
            if (res.state == 200) {
                completion.value = res.data.completion
            }
        })
    }
})


</script>
<style scoped></style>
