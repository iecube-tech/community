<template>
    <div class="card-container">
        <div v-for="  content   in   contents  " :key="content.id" class="content">
            <el-card shadow="hover" class="resource_card" :body-style="{ padding: '0px' }"
                @click="jumpToDetail(content.id)">
                <img class="card_img" :src="'/local-resource/image/' + content.cover" alt="">
                <div class="card_title">{{ content.name }}</div>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { onBeforeMount, ref } from 'vue'
import { All } from "@/apis/contents/all"
const contents = ref([])
const getContent = async () => {
    await All().then(res => {
        console.log(res);
        if (res.state == 200) {
            contents.value = res.data
        }
    })
}

onBeforeMount(() => {
    getContent();
})

const jumpToDetail = (contentId) => {
    router.push({
        name: 'CaseDataAnalysisDetail',
        params: { contentId: contentId }
    })
}
</script>
<style scoped>
.card-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 30px
}

.content {
    margin-top: 20px;
    padding-bottom: 20px;
}

.resource_card {
    /* width: 310px; */
    height: 320px;
    width: 400px;
    margin-top: 30px;
    margin-left: 30px;
    border-radius: 22px;
}

.card_img {
    width: 400px;
    height: 240px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

}

.card_title {
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: 600;
    color: #33b8b9;
    line-height: 30px;
    height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 20px;
}
</style>