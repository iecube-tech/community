<template>
    <el-menu :default-active="'/' + route.fullPath.split('/')[1]" class="el-menu" router>
        <el-menu-item index="/">
            <img src="@/assets/images/产业案例教学资源库和过程评价系统LOGO.svg" alt="">
        </el-menu-item>
        <el-sub-menu index="/">
            <template #title>
                <el-icon>
                    <Document />
                </el-icon>
                <span>案例管理</span>
            </template>
            <!-- <el-menu-item index="/">内容预览</el-menu-item> -->
            <!-- <el-menu-item index="/">案例管理</el-menu-item>
            <el-menu-item index="/npoints">知识点管理</el-menu-item>
            <el-menu-item index="/design">教学设计</el-menu-item>
            <el-menu-item index="/task">任务管理</el-menu-item>
            <el-menu-item index="/guidance">案例指导</el-menu-item>
            <el-menu-item index="/pkg">案例资源包</el-menu-item> -->
            <el-menu-item index="/add">新建案例</el-menu-item>
            <el-menu-item index="/">案例设计</el-menu-item>
            <el-menu-item index="/check">案例审核</el-menu-item>
            <!-- <el-menu-item index="/npoints/cases">nPoints</el-menu-item> -->
        </el-sub-menu>
        <el-sub-menu index="/course">
            <template #title>
                <el-icon>
                    <Collection />
                </el-icon>
                <span>课程管理</span>
            </template>
            <el-menu-item index="/course">课程设计</el-menu-item>
            <el-menu-item index="/course/add">新建课程</el-menu-item>
            <!-- <el-menu-item index="/course/check">课程审核</el-menu-item> -->
        </el-sub-menu>

        <el-sub-menu index="/client">
            <template #title>
                <el-icon>
                    <Avatar />
                </el-icon>
                <span>客户管理</span>
            </template>
            <el-menu-item index="/client">学校管理</el-menu-item>
            <el-menu-item index="/client/teacher">教师管理</el-menu-item>

        </el-sub-menu>

        <el-sub-menu index="/system">
            <template #title>
                <el-icon>
                    <Menu />
                </el-icon>
                <span>系统管理</span>
            </template>
            <el-menu-item index="/direction">方向分类</el-menu-item>

        </el-sub-menu>
        <el-sub-menu index="/user">
            <template #title>
                <el-icon>
                    <UserFilled />
                </el-icon>
                <span>用户管理</span>
            </template>
            <el-menu-item index="/index">用户管理</el-menu-item>

        </el-sub-menu>



        <el-sub-menu index="/analysis">
            <template #title>
                <el-icon>
                    <Histogram />
                </el-icon>
                <span>项目数据</span>
            </template>
            <el-menu-item index="/analysis">案例数据</el-menu-item>
            <el-menu-item index="/analysis/teacher">教师项目</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute();

console.log(route)

console.log('/' + route.fullPath.split('/')[1])

</script>
<style scoped lang="less"></style>