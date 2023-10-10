<template>
    <div>
        <el-card style="width: 200px; text-align: center;" v-for="i in schools.length" key="i">
            <div>{{ schools[i - 1].name }}</div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { schoolList } from '@/apis/major/schoolList.js'
import { onBeforeMount, ref } from 'vue';

const schools = ref([])

onBeforeMount(async () => {
    await schoolList().then(res => {
        if (res.state == 200) {
            schools.value = res.data
        }
    })
})
</script>
<style scoped></style>