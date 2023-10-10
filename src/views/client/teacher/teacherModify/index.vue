<template>
    <div>
        <el-form ref="teacherRef" :model="teacher" :rules="rules" label-width="120px" class="demo-teacher" status-icon
            style="width: 460px">
            <el-form-item label="姓名" prop="username">
                <el-input v-model="teacher.username" />
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
                <el-input v-model="teacher.email" />
            </el-form-item>

            <el-form-item label="学校/学院" prop="collageId">
                <el-cascader style="width: 460px;" v-model="teacher.collageId" :options="schoolList" :props="props"
                    placeholder="请选择学校/学院">
                </el-cascader>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(teacherRef)">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { onBeforeMount } from 'vue';
import { reactive, ref } from 'vue';
import { CollageListofSchools } from '@/apis/major/collageListOfSchools.js';
import { useRoute } from 'vue-router';
import { TeacherInfo } from '@/apis/teacher/teacherInfo.js'

const route = useRoute()
const teacherId = route.params.teacherId


interface teacherForm {
    username: string
    email: string
    collageId: number
}
const teacherRef = ref<FormInstance>()
const teacher = reactive<teacherForm>({
    username: null,
    email: null,
    collageId: null
})

const props = {
    expandTrigger: 'click' as const,
    value: 'id',
    label: 'name',
    children: 'collageList',
    emitPath: false
}

const schoolList = ref([
    {
        id: null,
        name: null,
        collageList: [{ name: null, id: null }]
    }
])

const rules = reactive<FormRules<teacherForm>>({
    username: [
        { required: true, message: '请输入教师姓名', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入邮箱账号', trigger: 'blur' },
        {
            validator: function (rule, value, callback) {
                const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                // if (/^1[34578]\d{9}$/.test(value) == false) {
                if (regEmail.test(value) == false) {
                    callback(new Error("请输入正确的邮箱号"));
                } else {
                    callback();
                }
            }, trigger: 'blur'
        },
    ],
    collageId: [{ required: true, message: '请选择教师所在学校学院', trigger: 'blur' }]
})


const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            // let t = teacher.collageId
            // teacher.collageId = t[1]
            console.log(teacher)
        } else {
            console.log('error submit!', fields)
        }
    })
}

onBeforeMount(async () => {
    TeacherInfo(teacherId).then(res => {
        if (res.state == 200) {
            teacher.collageId = res.data.collageId
            teacher.email = res.data.teacherEmail
            teacher.username = res.data.teacherName
        } else {
            ElMessage.error("获取数据错误")
        }
    })

    await CollageListofSchools().then(res => {
        if (res.state == 200) {
            schoolList.value = res.data
        }
    })
})

</script>
<style scoped>
el-cascader {
    width: 460px;
}
</style>