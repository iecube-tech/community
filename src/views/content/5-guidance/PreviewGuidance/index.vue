<template>
    <div class="container">
        <div v-html="guidance">

        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { GetGuidance } from '@/apis/contents/getGuidanceByid.js'
import { useRoute } from 'vue-router';

const route = useRoute();

const contentId = route.params.contentId
const guidance = ref()

const getGuidance = async () => {
    await GetGuidance(contentId).then(res => {
        if (res.state == 200) {
            guidance.value = res.data
        }
    })
}

onBeforeMount(() => {
    getGuidance()
})

</script>
<style scoped>
.container {
    padding: 30px calc(4.8vw + 160px);
    /* background-color: #f2faff; */
}
</style>