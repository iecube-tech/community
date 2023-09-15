import httpInstance from "@/utils/http";
export function deleteTaskTemplate(taskTemplateId) {
    return httpInstance({
        url: '/task_template/delete',
        method: 'GET',
        params: { taskTemplateId: taskTemplateId }
    })
}