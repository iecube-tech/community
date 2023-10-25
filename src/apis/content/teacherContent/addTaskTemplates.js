import httpInstance from "@/utils/http";
export function addTaskTemplate(taskTemplateDto) {
    return httpInstance({
        url: '/task_template/add',
        method: 'POST',
        data: taskTemplateDto,
    })
}