import httpInstance from "@/utils/http";

export function updateQuestionVo(questionVo) {
    return httpInstance({
        url: 'qb/update_qs',
        method: 'POST',
        data: questionVo,
    })
}