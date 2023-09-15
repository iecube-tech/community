<template>
    <el-breadcrumb separator=">">
        <el-breadcrumb-item v-for="BreadCrumbItem in BreadCrumbList" :key="BreadCrumbItem.path"
            :to="{ path: BreadCrumbItem.path }">
            <span v-if="BreadCrumbItem.meta.title != ''">{{ BreadCrumbItem.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()
const BreadCrumbList = computed(() => {
    return route.matched
})

onMounted(() => {
    console.log(route);

})
</script>
<style scoped lang="less"></style>