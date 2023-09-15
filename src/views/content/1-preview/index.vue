<template>
    <!-- <main v-if="route.name === 'resource'"> -->
    <!-- <pageHeader :route=route /> -->
    <div class="contents">
        <div v-for="  content   in   contents  " :key="content.id" class="content">
            <el-card shadow="hover" class="resource_card" :body-style="{ padding: '0px' }"
                @click="jumpToDetail(content.id)">
                <img class="card_img" :src="'/local-resource/image/' + content.cover" alt="">
                <div class="card_title">{{ content.name }}</div>
                <div class="card-introduction">
                    {{ content.introduction }}
                </div>
            </el-card>
        </div>
    </div>
    <!-- </main> -->
    <RouterView />
</template>

<script setup lang="ts">
import router from '@/router';
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import { All } from "@/apis/contents/all"
// import cassSearch from '@/components/casesearch.vue'


const route = useRoute()
const jumpToDetail = async (id) => {
    await router.push({
        name: 'ResourceDetail',
        params: {
            resourceId: id,
        }
    })
}

const contents = ref([])
const getContent = () => {
    All().then(res => {
        console.log(res);

        if (res.state == 200) {
            contents.value = res.data
        }
    })
}

onBeforeMount(() => {
    getContent();
})

onMounted(() => {
    // getContent()
})

</script>

<style scoped>
.main {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.contents {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.content {
    margin-top: 20px;
    padding-bottom: 20px;
}

.resource_card {
    /* width: 310px; */
    height: 400px;
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

.card-introduction {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 24px;
    height: 72px;
    margin: 0 20px;
    overflow: hidden;
    word-break: normal;
}
</style>