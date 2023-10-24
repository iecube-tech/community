<template>
    <div>
        <el-button type="primary" link @click="toPreview">基本信息</el-button>
    </div>
    <div>
        <el-button v-if="completion >= 0" type="primary" link @click="toCover">封面图片</el-button>
    </div>
    <div>
        <el-button v-if="completion >= 1" type="primary" link @click="toNpoints">知识点设计</el-button>
    </div>
    <div>
        <el-button v-if="completion >= 2" type="primary" link @click="toDesign">教学设计</el-button>
    </div>
    <div>
        <el-button v-if="completion >= 3" type="primary" link @click="toTask">任务设计</el-button>
    </div>
    <div>
        <el-button v-if="completion >= 4" type="primary" link @click="toGuidance">案例指导</el-button>
    </div>
    <div>
        <el-button v-if="completion >= 5" type="primary" link @click="toPkgs">指导资料</el-button>
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
        name: 'contentPreview',
        params: { contentId: contentId.value }
    })
}

const toCover = () => {
    router.push({
        name: 'contentSetCover',
        params: { contentId: contentId.value }
    })
}
const toNpoints = () => {
    router.push({
        name: 'contentPoints',
        params: { contentId: contentId.value }
    })
}

const toDesign = () => {
    router.push({
        name: 'contentDesign',
        params: { contentId: contentId.value }
    })
}

const toTask = () => {
    router.push({
        name: 'congtentTask',
        params: { contentId: contentId.value }
    })
}

const toGuidance = () => {
    router.push({
        name: 'contentGuidance',
        params: { contentId: contentId.value }
    })
}

const toPkgs = () => {
    router.push({
        name: 'contentPkgs',
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
