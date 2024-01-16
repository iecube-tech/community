import httpInstance from "@/utils/http";

export function addQuestionVo(questionVo) {
    return httpInstance({
        url: 'qb/add_qs',
        method: 'POST',
        data: questionVo,
    })
}