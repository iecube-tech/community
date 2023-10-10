<template>
    <div class="layout">
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px" style="padding-left: 20px;">
                <Aside />
            </el-aside>
            <el-container class="main-container">
                <el-header style="height: 50px; ">
                    <BreadCrumb />
                    <!-- 顶栏右侧 -->
                    <div></div>
                </el-header>
                <el-main>
                    <RouterView />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import Aside from './aside.vue';
import BreadCrumb from './BreadCrumb.vue'
import { computed } from 'vue';


const route = useRoute()

const key = computed(() => {
    return route.path + Math.random();
});
</script>

<style>
.layout,
.el-header,
.el-aside,
.el-main,
.el-container {
    height: 100%;
}

.el-header {
    height: 100px;
    display: flex;
    text-align: center;
    align-items: center;
    border-bottom: 1px solid var(--el-border-color);

}

.el-menu {
    /* background-color: #f2faff; */
    height: 100%;
}
</style>