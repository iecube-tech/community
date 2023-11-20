<template>
    <div style="display:flex; flex-wrap:wrap; margin-left:10px; margin-bottom:20px">
        <el-card v-for="i in modules.length" key="i" shadow="hover"
            style="width:250px; height:300px;margin-left:20px; margin-bottom:20px">
            <template #header>
                <div class="card-header">
                    <span>{{ modules[i - 1].name }}</span>
                    <div>
                        <el-button type="primary" :icon="Edit" link @click="toEdit(modules[i - 1].id)"></el-button>
                        <el-popconfirm title="删除并不会删除基础概念，确定删除吗">
                            <template #reference>
                                <el-button type="danger" :icon="Delete" link></el-button>
                            </template>
                        </el-popconfirm>
                    </div>
                </div>
            </template>
            <li v-for="j in modules[i - 1].children">
                {{ j.name }}
            </li>
        </el-card>
    </div>
    <div>
        <el-row style="display: flex; flex-direction: row; justify-content: start; margin-top: 30px; margin-bottom: 30px;">
            <span>添加功能模块</span>
        </el-row>

    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { useRoute } from 'vue-router';
import { computed, onBeforeMount, ref } from 'vue';
import { GetAllModuleConcepts } from '@/apis/npoints/moduleTree.js';
import { Edit, Delete } from '@element-plus/icons-vue';
const route = useRoute();

const routeName = route.name
const modules = ref([])

const toEdit = (id) => {
    router.push({
        name: 'npointModuleEdit',
        params: { moduleId: id }
    })
}

onBeforeMount(() => {
    GetAllModuleConcepts().then(res => {
        if (res.state == 200) {
            modules.value = res.data
        }
    })
})

</script>
<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>