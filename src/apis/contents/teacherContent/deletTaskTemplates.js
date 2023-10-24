import httpInstance from "@/utils/http";
export function deleteTaskTemplate(caseId, taskTemplateId) {
    return httpInstance({
        url: '/task_template/delete/' + caseId,
        method: 'GET',
        params: { taskTemplateId: taskTemplateId }
    })
}