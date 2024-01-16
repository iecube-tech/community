import httpInstance from "@/utils/http";

export function getQuestionList(taskTemplateId) {
    return httpInstance({
        url: 'qb/questions',
        method: 'GET',
        params: { taskTemplateId: taskTemplateId }
    })
}