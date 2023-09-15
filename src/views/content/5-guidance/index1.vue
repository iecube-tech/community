<template>
    <div class="guidanc-header">
        <el-row style="display: flex; justify-content: flex-start; align-items: center;">
            <span>项目案例：</span>
            <el-select v-model="contentId" placeholder="选择项目案例" :change="onChange()">
                <el-option v-for="item in contents" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>

            <el-button v-if="contentId" type="primary" @click="toEdit"> 编辑/修改</el-button>
        </el-row>
    </div>
    <RouterView :key="key" />
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue';
import { All } from "@/apis/contents/all";
import { useRoute } from 'vue-router';
import router from '@/router';
const route = useRoute()

const contentId = ref(null)

const contents = ref([])

const key = computed(() => {
    return route.path + Math.random();
});

const getContent = async () => {
    await All().then(res => {
        console.log(res);
        if (res.state == 200) {
            contents.value = res.data
        }
    })
}
const toEdit = () => {
    router.push({
        name: 'guidanceEdit',
        // params: { contentId: route.params.contentId }
    })
    console.log(route)
}

const onChange = () => {
    if (contentId.value != null) {
        router.push({
            name: 'guidancePreview',
            params: { contentId: contentId.value }
        })
    }
}

onBeforeMount(() => {
    getContent()
})
</script>
<style scoped>
.guidanc-header {
    padding: 0 calc(4.8vw + 160px);
}
</style>
