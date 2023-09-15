<template>
    <el-form label-position="left" label-width="100">
        <el-row class="top_crad" style="display: flex;">
            <el-col :span="12" style=" height: 370px; padding: 20px;">
                <el-card style="height: 330px; padding: 20px">

                    <el-form-item label="标题" prop="">
                        <el-input style="width: 300px" />
                    </el-form-item>
                    <el-form-item label="产品方向" prop="region">
                        <el-select placeholder="Activity zone">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内容分类" prop="region">
                        <el-select placeholder="Activity zone">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="内容简介">
                        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4 }" />
                    </el-form-item>

                </el-card>
            </el-col>

            <el-col :span="12" style="height: 370px; padding: 20px;">
                <el-card style="height: 330px; padding: 20px">

                </el-card>
            </el-col>
        </el-row>
        <el-row>
            <h2>内容</h2>
        </el-row>
        <div style="margin-top: 20px;">
            <Edit />
        </div>
    </el-form>
</template>

<script setup lang="ts">
import Edit from './EditContent.vue'
</script>
<style scoped>
.top_crad {
    height: 410px;
    padding: 20px;
    /* background-color: antiquewhite; */
}
</style>