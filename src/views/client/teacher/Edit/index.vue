<template>
    <el-dialog v-model="editTeacherDialog" title="Tips" width="30%">
        <span>This is a message</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editTeacherDialog = false">Cancel</el-button>
                <el-button type="primary" @click="editTeacherDialog = false">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue';


const editTeacherDialog = ref(false)
</script>